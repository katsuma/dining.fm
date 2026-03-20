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
import { ArticleCard } from "@/components/ArticleCard";
import { ExternalLink, Link2 } from "lucide-react";

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

const announcements: { publishedAt: string; title: string, linkUrl?: string }[] = [
  {
    publishedAt: "2026/3/20 12:00",
    title: "サイトデザインをリニューアルしました",
  },
  {
    publishedAt: "2026/02/16 12:00",
    title: "Podcast Weekend 2026への出店が決定しました",
    linkUrl: "https://podcastexpo.jp/booth/pcwe-029/",
  },
];

const Home = () => {
  const { episodes } = useLoaderData();

  return (
    <div className="container">
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

      <section className="mb-8">
        <Heading title="読みもの" dotClassName="bg-yellow" />
        <div className="flex flex-col gap-3">
          <ArticleCard
            thumbnailUrl="/podcasting-guide/mic.jpg"
            title="収録・編集環境"
            linkUrl="/podcasting-guide"
            description="マイクやオーディオインターフェースなど収録環境や、編集環境についてのまとめです。"
          />
        </div>
      </section>

      <section className="mb-8">
        <Heading title="お知らせ" dotClassName="bg-light-green" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) py-2 px-4">
          <ul className="flex flex-col">
            {announcements.map((item, index) => (
              <li
                key={`${item.publishedAt}-${item.title}`}
                className={`py-3 ${
                  index < announcements.length - 1
                    ? "border-b border-dashed border-gray-300"
                    : ""
                }`}
              >
                <p className="font-numeric text-[14px] text-black-secondary tracking-[-0.42px]">
                  {item.publishedAt}
                </p>
                {item.linkUrl && (
                  <p className="mt-1 text-[15px] font-bold tracking-[-0.45px] text-black-primary">
                    <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-orange">
                      {item.title}
                      {item.linkUrl.startsWith("http") && (
                        <ExternalLink className="size-4 inline-block ml-1" />
                      )}
                      {!item.linkUrl.startsWith("http") && (
                        <Link2 className="size-4 inline-block ml-1" />
                      )}
                    </a>
                  </p>
                )}
                {!item.linkUrl && (
                  <p className="mt-1 text-[15px] font-bold tracking-[-0.45px] text-black-primary">
                    {item.title}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hero */}
      <section className="flex justify-center mt-16 mb-4">
        <img
          src="/speakers.png"
          alt="dining.fm"
          className="w-[336px] h-[240px] object-cover"
        />
      </section>

      {/* 番組紹介 */}
      <section className="relative mb-10">
        <LabelBadge text="番組紹介" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) p-6">
          <Paragraph>
            <span className="font-bold">dining.fm</span>
            は、ギャルソン好きの夫<span className="font-bold">katsuma</span>と、
            お菓子好きの妻<span className="font-bold">daikoku</span>の東京２人暮らし夫婦が、ゆるゆると話す雑談Podcast。
          </Paragraph>
          <Paragraph>
            ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠
          </Paragraph>
        </div>
      </section>
    </div>
  );
};

export default Home;
