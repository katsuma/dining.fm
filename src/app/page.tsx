import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { FaMicrophone } from "react-icons/fa";
import { LiaRobotSolid } from "react-icons/lia";

import '@/app/layout.css'
import prisma from '@/utils/prisma';
import styles from '@/app/page.module.css'
import EpisodeEntry from '@/components/EpisodeEntry';
import { PublishedDate } from '@/utils/PublishedDate';

export const revalidate = 3600;

export default async function Home() {
  const currentPage = 1;
  const episodeVisibleSize = 5;
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
  )

  return (
    <>
      <section className='section'>
        <h2 className='title'>最新エピソード</h2>
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
            )
          })
        }
        <p className='link-more'><Link href={`/episodes/page/${currentPage}`}>エピソードをもっと見る</Link></p>
      </section>

      <section className='section'>
        <h2 className='title'>ポッドキャストの収録・編集環境</h2>
        <Link href='/podcasting-guide'>
          <Image src={'/podcasting-guide/banner.jpg'} alt={'ポッドキャストの収録・編集環境'} width={1200} height={340} priority={true} className={styles.banner} />
        </Link>
        <p className={styles.description}>マイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてまとめてみました。</p>
        <p className={styles['screen-reader-only']}><Link href='/podcasting-guide'><FaMicrophone />ポッドキャストの収録・編集環境を見る</Link></p>
      </section>

      <section className='section'>
        <h2 className='title'>ロボットADへの質問</h2>
        <Link href='/question'>
          <Image src={'/question/banner.jpg'} alt={'ロボットADへの質問'} width={1200} height={340} priority={true} className={styles.banner} />
        </Link>
        <p className={styles.description}>ロボットADが番組でこれまで話したエピソードをもとに質問に答えます。ADは見習いなので、たまにポンコツな回答もしますがご容赦ください。</p>
        <p className={styles['screen-reader-only']}><Link href='/question'><LiaRobotSolid />ロボットADへ質問してみる</Link></p>
      </section>

      <section className='section'>
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
      </section>

      <section className={styles.section}>
        <div className={styles.listens_on}>
          <a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5" target="_blank" rel="noopener noreferrer">
            <Image src={'/listen-on/spotify.svg'} alt={'Listen on Spotify'} width={160} height={40} priority={false} />
          </a>

          <a href="https://podcasts.apple.com/jp/podcast/id1668849655" target="_blank" rel="noopener noreferrer">
            <Image src={'/listen-on/apple.svg'} alt={'Listen on Apple Podcasts'} width={160} height={40} priority={false} />
          </a>
        </div>

        <div className={styles.icons}>
          <Image src={'/icons.svg'} alt={'dining.fm'} width={260} height={100} priority={true} />
        </div>
      </section>
    </>
  )
}
