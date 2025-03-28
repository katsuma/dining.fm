// provides type safety/inference
import type { Route } from "./+types/page";
import { Link, useLoaderData } from 'react-router-dom';
import { type Episode } from '@prisma/client';

import prisma from '@/utils/prisma';
import { EpisodeListItem } from "@/components/EpisodeListItem";

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
              <p className="text-xl">
                <Link to={`/episodes/page/${currentPage - 1}`}>« 前へ</Link>
              </p>
            )
          }
          {
            (currentPage + 1 <= maxPage) && (
              <p className="text-xl">
                <Link to={`/episodes/page/${currentPage + 1}`}>次へ »</Link>
              </p>
            )
          }
        </div>
      </section>
    </div>
  );
}

export default EpisodesPage;
