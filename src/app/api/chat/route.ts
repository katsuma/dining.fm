import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { LangChainAdapter } from "ai";

export const dynamic = 'force-dynamic';

const embeddingModel = new OpenAIEmbeddings({ model: 'text-embedding-3-small' })

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const pineconeIndex = pinecone.Index("episodes")

const systemPrompt = SystemMessagePromptTemplate.fromTemplate(`
  contextで渡される情報をもとに、次の質問に答えてください。その際は以下の条件を考慮してください。

  ## 条件
  1. 情報にurlとidが含まれていることに注意して、出力の際には、参考にした情報の情報を含めたものにして、文章の末尾に「(参考)」のテキストにリンクを付与してください。
  2. 段落が複数になるときは、段落ごとに改行を入れ、見出しをつけることを検討してください。
  3. できるだけ簡潔に、かつ正確に回答を行ってください。特に、contextのsummaryをそのまま利用することは避けてください。
`);
const humanPrompt = HumanMessagePromptTemplate.fromTemplate(`
  <context>
  {context}
  </context>

  質問: {input}
`);
const prompt = ChatPromptTemplate.fromMessages([systemPrompt, humanPrompt]);

export async function POST(req: Request) {
  const { messages } = await req.json();
  const currentMessageContent = messages[messages.length - 1].content;

  const outputParser = new StringOutputParser();
  const model = new ChatOpenAI({ model: 'gpt-4o-mini', streaming: true, maxTokens: 10000 });

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(embeddingModel), { pineconeIndex }
  );

  const docs = await vectorStore.similaritySearch(currentMessageContent, 4);
  const context = JSON.stringify(
    docs.map(doc => {
      return {
        summary: doc.pageContent,
        url: `https://dining.fm/episodes/${doc.id}`,
        id: doc.id,
      };
    })
  );

  const chain = prompt.pipe(model).pipe(outputParser);
  const stream = await chain.stream({
    input: currentMessageContent,
    context: context,
  });
  return LangChainAdapter.toDataStreamResponse(stream);
}
