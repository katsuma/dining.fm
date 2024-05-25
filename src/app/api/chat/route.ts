import { Message, StreamingTextResponse } from 'ai';
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { formatDocumentsAsString } from "langchain/util/document";
import { LangChainStreamCustom } from './LangChainCustom';

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
  const model = new ChatOpenAI({ model: 'gpt-4o', streaming: true });

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
