'use client'

import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';

import '../../layout.css'
import styles from './page.module.css'
import { FeedLoader } from '../../_utils/FeedLoader';

import sanitizeHtml from 'sanitize-html';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default async function Episode({ params }: { params: { guid: string }}) {
  const episodes = await FeedLoader.loadAsEpisodes() as any[];
  const episode = episodes.find((episode) => episode.guid === params.guid) as any;

  if (!episode) {
    notFound()
  }

  return (
    <main className='main'>
      <section className='section'>
        <h2 className='title'>{episode.title}</h2>
        <div className={styles['cover-image']}>
          <Image
            src={episode.image}
            alt={episode.title}
            width={600}
            height={600}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={false}
          />
        </div>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: sanitizeHtml(episode.content)}} />
        <AudioPlayer
          src={episode.url}
          defaultCurrentTime={'00:00'}
          defaultDuration={episode.duration}
          customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
          layout={'horizontal-reverse'}
        />
      </section>
      <section>
        <p className='link-more'>
          <Link href={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </main>
  )
}
