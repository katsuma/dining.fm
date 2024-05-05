import { streamText, StreamingTextResponse } from 'ai';
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PineconeStore } from "@langchain/pinecone";
import { formatDocumentsAsString } from "langchain/util/document";

export const dynamic = 'force-dynamic';

const model = new ChatOpenAI({ model: 'gpt-3.5-turbo' });
const embeddingModel = new OpenAIEmbeddings({ model: 'text-embedding-3-small' })

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const pineconeIndex = pinecone.Index("episodes")

export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessage = messages[messages.length - 1];
  console.log("Current message:", currentMessage.content);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(embeddingModel),
    { pineconeIndex }
  );
  const retriever = vectorStore.asRetriever();

  const prompt = PromptTemplate.fromTemplate(`
    Answer the question based only on the following context:
    {context}

    Question: {question}
  `);

  const chain = RunnableSequence.from([
    {
      context: retriever.pipe(formatDocumentsAsString),
      question: new RunnablePassthrough(),
    },
    prompt,
    model,
    new StringOutputParser(),
  ]);

  const stream = await chain.stream(currentMessage.content);
  return new StreamingTextResponse(stream);
}
