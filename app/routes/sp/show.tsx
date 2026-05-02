import type { Route } from "./+types/show";

import { Link, useLoaderData } from "react-router-dom";

import { LabelBadge } from "@/components/LabelBadge";
import { proseStyles, Paragraph } from "@/components/Paragraph";
import { defaultTitle, defaultHost, buildMeta } from "@/utils/meta";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Heading } from "@/components/Heading";
import { LinkButton } from "@/components/LinkButton";
import prisma from "@/utils/prisma";
import type { Episode } from "@prisma/client";

type SpContent = {
  title: string;
  description: string;
  mp3Url: string;
  relatedEpisodeIds: number[];
};

const SP_CONTENT: Record<string, SpContent> = {
  pcwe2026: {
    title: "Podcast Weekend 2026 スペシャルエピソード",
    description:
      "※このエピソードはPodcast Weekend 2026 来場者の方向けのスペシャルエピソードです。\n通常回では語られないkatsuma, daikokuのプロフィールや、番組紹介を含む過去のエピソードの中からおすすめエピソードを紹介します。",
    mp3Url: "/sp/pcwe2026.mp3",
    relatedEpisodeIds: [174, 141, 145, 120, 28, 163, 173],
  },
};

const NOT_FOUND_MESSAGE = "指定したコンテンツは見つかりませんでした";

export async function loader({ params }: Route.LoaderArgs) {
  const content = SP_CONTENT[params.id];

  if (!content) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }

  const episodesUnordered = await prisma.episode.findMany({
    where: { id: { in: content.relatedEpisodeIds } },
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

  const episodeMap = new Map(episodesUnordered.map((e) => [e.id, e]));
  const relatedEpisodes = content.relatedEpisodeIds
    .map((id) => episodeMap.get(id))
    .filter((e) => e !== undefined);

  return { id: params.id, content, relatedEpisodes };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return buildMeta([]);
  }

  const title = `${data.content.title} | ${defaultTitle}`;
  const description = data.content.description;
  const url = `${defaultHost}/sp/${data.id}`;

  return buildMeta([
    { title },
    { name: "robots", content: "noindex" },

    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${defaultHost}/opengraph-image.png` },

    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    {
      property: "twitter:image",
      content: `${defaultHost}/opengraph-image.png`,
    },
  ]);
}

function SpShow() {
  const { content, relatedEpisodes } = useLoaderData();

  return (
    <div className="container">
      <section className="mb-8">
        <h2 className="font-heading text-[22px] font-bold tracking-[-0.66px] text-black-primary leading-snug mb-2">
          {content.title}
        </h2>
        <div className="h-[5px] rounded-full bg-orange border border-black mb-4" />
      </section>

      <audio className="w-full my-8" controls src={content.mp3Url}>
        <a href={content.mp3Url}>ダウンロード</a>
      </audio>

      <section className="relative mb-10">
        <LabelBadge text="SP" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) p-6 pt-8">
          <p className={`${proseStyles} whitespace-pre-wrap`}>
            {content.description}
          </p>
          <hr className="border-t border-gray-300 border-dashed my-6" />
          <Paragraph>
            感想はX(Twitter)のハッシュタグ
            <Link to="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">
              #diningfm
            </Link>{" "}
            や<Link to="https://twitter.com/diningfm">@diningfm</Link>{" "}
            へのリプライ、
            <Link to="/letter">GoogleForm</Link>
            でのお便りなどからお待ちしています📮
          </Paragraph>
        </div>
      </section>

      <section className="mb-8">
        <Heading title="関連エピソード" dotClassName="bg-orange" />
        <div className="flex flex-col gap-3">
          {relatedEpisodes.map((episode: Episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <LinkButton to="/episodes/page/1">
            すべてのエピソードを見る
          </LinkButton>
        </div>
      </section>
    </div>
  );
}

export default SpShow;
