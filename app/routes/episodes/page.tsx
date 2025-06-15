// provides type safety/inference
import type { Route } from "./+types/page";
import { Link, useLoaderData } from 'react-router-dom';
import { type Episode } from '@prisma/client';

import prisma from '@/utils/prisma';
import { defaultTitle, defaultHost, buildMeta } from '@/utils/meta';
import { EpisodeListItem } from "@/components/EpisodeListItem";
import { LinkButton } from "@/components/LinkButton";

const episodeVisibleSize = 20;

export async function loader({ params }: Route.LoaderArgs) {
  const currentPage = Number(params.page);
  const slicedIndex = episodeVisibleSize * (currentPage - 1);

  const episodes = await prisma.episode.findMany(
    {
      orderBy: [{ id: 'desc' }],
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
      }
    }
  );
  const episodeCount = await prisma.episode.count();
  return { currentPage, episodes, episodeCount };
}

export function meta({data}: Route.MetaArgs) {
  if (!data) {
    return buildMeta([]);
  }

  const maxPage = Math.ceil(data.episodeCount / episodeVisibleSize);
  const title = `最新エピソード (${data.currentPage}/${maxPage}) | ${defaultTitle}`;

  return buildMeta([
    { title },

    { property: "og:url", content: `${defaultHost}/episodes/page/${data.currentPage}` },
    { property: "og:title", content: title },

    { property: "twitter:url", content: `${defaultHost}/episodes/page/${data.currentPage}` },
    { property: "twitter:title", content: title },
  ]);
}

function EpisodesPage() {
  const { currentPage, episodes, episodeCount } = useLoaderData();

  const maxPage = Math.ceil(episodeCount / episodeVisibleSize);

  return (
    <div className="container">
      <section className="my-8">
        <h2 className="title">最新エピソード ({currentPage}/{maxPage})</h2>
        {episodes.map((episode: Episode) => (
          <EpisodeListItem episode={episode} key={episode.id} />
        ))}
      </section>
      <section className="text-center mt-6 mb-16">
        <div className="flex justify-center space-x-4">
          {
            (currentPage - 1 > 0) && (
              <div className="text-xl">
                <LinkButton to={`/episodes/page/${currentPage - 1}`}>« 前へ</LinkButton>
              </div>
            )
          }
          {
            (currentPage + 1 <= maxPage) && (
              <div className="text-xl">
                <LinkButton to={`/episodes/page/${currentPage + 1}`}>次へ »</LinkButton>
              </div>
            )
          }
        </div>
      </section>
    </div>
  );
}

export default EpisodesPage;
