import './layout.css'
import styles from './page.module.css'
import { Episode } from '../components/types/Episode';
import EpisodeEntry from '../components/EpisodeEntry';
import { FeedLoader } from '../utils/FeedLoader';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default async function Home() {
  const episodes = await FeedLoader.loadAsEpisodes() as unknown as Episode[];

  const episodeVisibleSize = 5;
  const currentPage = 0;
  const currentEpisodes = episodes.slice(0, episodeVisibleSize);

  return (
    <>
      <section className='section'>
        <h2 className='title'>最新エピソード</h2>
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
            )
          })
        }

        <p className='link-more'><Link href={`/episodes/page/${currentPage + 1}`}>もっと見る</Link></p>
      </section>

      <section>
        <h2 className='title'>収録・編集環境</h2>
        <p className={styles.description}>マイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてまとめてみました。</p>
        <p className='link-more'><Link href='/podcasting-guide'>収録・編集環境を見る</Link></p>
      </section>

      <section>
        <h2 className='title'>番組紹介</h2>
        <p className={styles.description}>
          dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。
        </p>

        <p className={styles.description}>
          ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠
        </p>

        <p className={styles.description}>
          感想はX(Twitter)のハッシュタグ<a href="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">#diningfm</a> や
          <a href="https://twitter.com/diningfm">@diningfm</a>へのリプライ、
          <a href="https://bit.ly/3Kq3zf2">GoogleForm</a>でのお便りなどからお待ちしています📮
        </p>

        <div className={styles.icons}>
          <Image src={'/icons.svg'} alt={'dining.fm'} width={260} height={100} priority={false} />
        </div>
      </section>
    </>
  )
}
