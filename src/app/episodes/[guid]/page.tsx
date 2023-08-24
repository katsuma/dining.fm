//'use client'

import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next'

import '../../layout.css'
import styles from './page.module.css'
import { FeedLoader } from '../../_utils/FeedLoader';
import { Episode } from '../../_components/types/Episode';

import sanitizeHtml from 'sanitize-html';

type Props = {
  params: { guid: string }
}

async function fetchEpisode({ params }: Props) {
  const episodes = await FeedLoader.loadAsEpisodes() as Episode[];
  return episodes.find((episode) => episode.guid === params.guid) as Episode;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const episode = await fetchEpisode({ params });

  return episode && {
    title: episode.title,
    description: episode.contentSnippet,
    openGraph: {
      title: episode.title,
      description: episode.contentSnippet,
      images: [episode.image],
      url: `/episodes/${episode.guid}`,
    },
    twitter: {
      title: episode.title,
      description: episode.contentSnippet,
    }
  }
}

export default async function EpisodeDetail({ params }: { params: { guid: string }}) {
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
        <audio controls={true} src={episode.url}>
          <a href={episode.url}>Download audio</a>
        </audio>
      </section>
      <section>
        <p className='link-more'>
          <Link href={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </main>
  )
}
