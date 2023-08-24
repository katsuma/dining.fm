import '../../../layout.css'
import { fetchFeed } from '../../../_utils/feedLoader';
import EpisodeEntry from '../../../_components/EpisodeEntry';
import { EpisodeFeed } from '../../../_components/types/EpisodeFeed';
import Link from 'next/link';

export default async function Episodes({ params }: { params: { page: number } }) {
  const feed = await fetchFeed();
  const entries = feed.items as unknown as EpisodeFeed[];

  const episodeVisibleSize = 20;
  const currentPage = Number(params.page);
  const maxPage = Math.ceil(entries.length / episodeVisibleSize);
  const slicedIndex = episodeVisibleSize * (currentPage - 1);
  const currentEpisodes = entries.slice(slicedIndex, slicedIndex + episodeVisibleSize);

  return (
    <main className='main'>
      <section className='section'>
        <h2 className='title'>エピソード一覧 ({currentPage}/{maxPage})</h2>
        {
          currentEpisodes.map((episode) => {
            return (<EpisodeEntry
              key={episode.guid}
              title={episode.title}
              content={episode.content}
              pubDate={episode.pubDate}
              image={episode.itunes.image}
              guid={episode.guid}
              contentSnipet={episode.contentSnipet}
            />);
          })
        }

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
    </main>
  )
}
