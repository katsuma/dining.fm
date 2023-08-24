import './layout.css'
import styles from './page.module.css'
import { fetchFeed } from './_utils/feedLoader';
import EpisodeEntry from './_components/EpisodeEntry';
import { EpisodeFeed } from './_components/types/EpisodeFeed';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const feed = await fetchFeed();
  const entries = feed.items as unknown as EpisodeFeed[];

  const episodeVisibleSize = 6;
  const currentPage = 0;
  const currentEpisodes = entries.slice(0, episodeVisibleSize);

  return (
    <main className='main'>
      <section className='section'>
        <h2 className='title'>最新エピソード</h2>
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

        <p className='link-more'><Link href={`/episodes/${currentPage + 1}`}>もっと見る</Link></p>
      </section>

      <section>
        <h2 className='title'>番組紹介</h2>
        <p className={styles.description}>
          dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。
        </p>

        <p className={styles.description}>
          ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠
        </p>

        <div className={styles.icons}>
          <Image src={'/icons.svg'} alt={'dining.fm'} width={260} height={100} priority={false} />
        </div>
      </section>
    </main>
  )
}
