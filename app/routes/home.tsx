import { type LoaderFunction, useLoaderData } from "react-router-dom";
import { type Episode } from "@prisma/client";
import type { Route } from "./+types/home";

import prisma from "@/utils/prisma";
import { buildMeta } from "@/utils/meta";
import { EpisodeCard } from "@/components/EpisodeCard";
import { LinkButton } from "@/components/LinkButton";
import { Heading } from "@/components/Heading";
import { LabelBadge } from "@/components/LabelBadge";
import { Paragraph } from "@/components/Paragraph";

export const loader: LoaderFunction = async () => {
  const episodes = await prisma.episode.findMany({
    orderBy: [{ id: "desc" }],
    take: 5,
    select: {
      id: true,
      title: true,
      description: true,
      publishedAt: true,
      imageUrl: true,
      enclosureUrl: true,
      duration: true,
    },
  });
  return { episodes };
};

export function meta({}: Route.MetaArgs) {
  return buildMeta([]);
}


const Home = () => {
  const { episodes } = useLoaderData();

  return (
    <div className="container">
      {/* Hero */}
      <section className="flex justify-center mt-4 mb-8">
        <img
          src="/speakers.png"
          alt="dining.fm"
          className="w-[280px] h-[200px] object-cover"
        />
      </section>

      {/* 番組紹介 */}
      <section className="relative mb-10">
        <LabelBadge text="番組紹介" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) p-6">
          <Paragraph>
            <span className="font-bold">dining.fm</span>
            は、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京２人暮らし夫婦が、ゆるゆると話す雑談Podcast。
          </Paragraph>
          <Paragraph>
            ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠
          </Paragraph>
        </div>
      </section>

      {/* 最新エピソード */}
      <section className="mb-8">
        <Heading title="最新エピソード" dotClassName="bg-orange" />
        <div className="flex flex-col gap-3">
          {episodes.map((episode: Episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <LinkButton to="/episodes/page/1">すべて見る</LinkButton>
        </div>
      </section>


    </div>
  );
};

export default Home;
