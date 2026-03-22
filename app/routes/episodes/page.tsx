// provides type safety/inference
import type { Route } from "./+types/page";
import { useLoaderData } from "react-router-dom";
import { type Episode } from "@prisma/client";

import prisma from "@/utils/prisma";
import { defaultTitle, defaultHost, buildMeta } from "@/utils/meta";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Heading } from "@/components/Heading";
import { LinkButton } from "@/components/LinkButton";

const episodeVisibleSize = 20;

export async function loader({ params }: Route.LoaderArgs) {
  const currentPage = Number(params.page);
  const slicedIndex = episodeVisibleSize * (currentPage - 1);

  const episodes = await prisma.episode.findMany({
    orderBy: [{ id: "desc" }],
    skip: slicedIndex,
    take: episodeVisibleSize,
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
  const episodeCount = await prisma.episode.count();
  return { currentPage, episodes, episodeCount };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return buildMeta([]);
  }

  const maxPage = Math.ceil(data.episodeCount / episodeVisibleSize);
  const title = `最新エピソード (${data.currentPage}/${maxPage}) | ${defaultTitle}`;

  return buildMeta([
    { title },

    {
      property: "og:url",
      content: `${defaultHost}/episodes/page/${data.currentPage}`,
    },
    { property: "og:title", content: title },

    {
      property: "twitter:url",
      content: `${defaultHost}/episodes/page/${data.currentPage}`,
    },
    { property: "twitter:title", content: title },
  ]);
}

function EpisodesPage() {
  const { currentPage, episodes, episodeCount } = useLoaderData();

  const maxPage = Math.ceil(episodeCount / episodeVisibleSize);

  return (
    <div className="container">
      <section className="mb-8">
        <Heading
          title={`最新エピソード (${currentPage}/${maxPage})`}
          dotClassName="bg-orange"
        />
        <div className="flex flex-col gap-3">
          {episodes.map((episode: Episode) => (
            <EpisodeCard episode={episode} key={episode.id} />
          ))}
        </div>
      </section>
      <section className="flex justify-center space-x-4 mt-6 mb-10">
        {currentPage - 1 > 0 && (
          <LinkButton to={`/episodes/page/${currentPage - 1}`}>
            « 前へ
          </LinkButton>
        )}
        {currentPage + 1 <= maxPage && (
          <LinkButton to={`/episodes/page/${currentPage + 1}`}>
            次へ »
          </LinkButton>
        )}
      </section>
    </div>
  );
}

export default EpisodesPage;
