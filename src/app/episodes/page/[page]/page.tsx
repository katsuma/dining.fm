import '../../../layout.css'
import EpisodeEntry from '../../../../components/EpisodeEntry';
import { Episode } from '../../../../components/types/Episode';
import { FeedLoader } from '../../../_utils/FeedLoader';
import Link from 'next/link';
import React from 'react';

export default async function Episodes({ params }: { params: { page: number } }) {
  const episodes = await FeedLoader.loadAsEpisodes() as unknown as Episode[];

  const episodeVisibleSize = 20;
  const currentPage = Number(params.page);
  const maxPage = Math.ceil(episodes.length / episodeVisibleSize);
  const slicedIndex = episodeVisibleSize * (currentPage - 1);
  const currentEpisodes = episodes.slice(slicedIndex, slicedIndex + episodeVisibleSize);

  return (
    <>
      <section className='section'>
        <h2 className='title'>エピソード一覧 ({currentPage}/{maxPage})</h2>
        {
          currentEpisodes.map((episode) => {
            return (
              <Link href={`/episodes/${episode.guid}`} key={episode.guid}>
                <EpisodeEntry
                  key={episode.guid}
                  title={episode.title}
                  description={episode.description}
                  pubDate={episode.pubDate}
                  image={episode.image}
                  guid={episode.guid}
                  url={episode.url}
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
