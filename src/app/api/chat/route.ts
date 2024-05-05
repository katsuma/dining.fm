import { Message, StreamingTextResponse, createStreamDataTransformer } from 'ai';

import { Pinecone } from "@pinecone-database/pinecone";

import { OpenAIEmbeddings } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { formatDocumentsAsString } from "langchain/util/document";

export const LangChainStreamCustom = (
  stream: any,
  { onCompletion }: { onCompletion: (completion: string) => Promise<void> }
): ReadableStream => {
  let completion = ''
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      completion += new TextDecoder('utf-8').decode(chunk)
      controller.enqueue(chunk)
    },
    async flush(controller) {
      await onCompletion(completion)
        .then(() => {
          controller.terminate()
        })
        .catch((e: any) => {
          console.error('Error', e)
          controller.terminate()
        })
    }
  })
  stream.pipeThrough(transformStream)
  return transformStream.readable.pipeThrough(createStreamDataTransformer())
}

const formatMessage = (message: Message) => {
  return `${message.role}: ${message.content}`;
};

export const dynamic = 'force-dynamic';

const embeddingModel = new OpenAIEmbeddings({ model: 'text-embedding-3-small' })

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const pineconeIndex = pinecone.Index("episodes")

const prompt = PromptTemplate.fromTemplate(`
  Answer the question based only on the following context:
  <context>
  {context}
  </context>

  Question: {input}
`);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content;

  const outputParser = new BytesOutputParser();
  const model = new ChatOpenAI({ model: 'gpt-3.5-turbo', streaming: true });

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(embeddingModel), { pineconeIndex }
  );
  const retriever = vectorStore.asRetriever();

  const chain = RunnableSequence.from(
    [
      {
        context: retriever.pipe(formatDocumentsAsString),
        input: new RunnablePassthrough(),
      },
      prompt,
      model,
      outputParser,
    ]
  );

  const response = await chain.stream(currentMessageContent);
  const stream = LangChainStreamCustom(response, {
    onCompletion: async (completion: string) => {
      console.log('COMPLETE!', completion)
    }
  });
  return new StreamingTextResponse(stream);
}
