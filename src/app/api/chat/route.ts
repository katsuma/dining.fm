import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { LangChainAdapter } from "ai";

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

  const outputParser = new StringOutputParser();
  const model = new ChatOpenAI({ model: 'gpt-4o', streaming: true });

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(embeddingModel), { pineconeIndex }
  );

  const context = await vectorStore.similaritySearch(currentMessageContent, 3);
  for (const doc of context) {
    console.log(`context doc: ${doc.pageContent} ${doc.id} [${JSON.stringify(doc.metadata, null)}]`);
  }

  const chain = prompt.pipe(model).pipe(outputParser);
  const stream = await chain.stream({
    input: currentMessageContent,
    context: context,
  });
  return LangChainAdapter.toDataStreamResponse(stream);
}
