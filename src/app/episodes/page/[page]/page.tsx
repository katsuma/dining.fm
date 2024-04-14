import Link from 'next/link';
import React from 'react';

import '@/app/layout.css'
import prisma from '@/utils/prisma';
import EpisodeEntry from '@/components/EpisodeEntry';
import { PublishedDate } from '@/utils/PublishedDate';

export default async function Episodes({ params }: { params: { page: number } }) {
  const episodeVisibleSize = 20;
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
  const maxPage = Math.ceil(episodeCount / episodeVisibleSize);

  return (
    <>
      <section className='section'>
        <h2 className='title'>エピソード一覧 ({currentPage}/{maxPage})</h2>
        {
          episodes.map((episode) => {
            return (
              <Link href={`/episodes/${episode.id}`} key={episode.id}>
                <EpisodeEntry
                  key={episode.id}
                  id={episode.id}
                  title={episode.title}
                  description={episode.description}
                  pubDate={PublishedDate.toLocalDate(episode.publishedAt)}
                  imageUrl={episode.imageUrl}
                  enclosureUrl={episode.enclosureUrl}
                  duration={episode.duration}
                />
              </Link>
            );
          })
        }

      </section>
      <section className='pagination'>
        {
          (currentPage - 1 > 0) && (
            <p className='link-prev'><Link href={`/episodes/page/${currentPage - 1}`}>前へ</Link></p>
          )
        }

        {
          (currentPage + 1 <= maxPage) && (
            <p className='link-more'><Link href={`/episodes/page/${currentPage + 1}`}>次へ</Link></p>
          )
        }
      </section>
    </>
  )
}
