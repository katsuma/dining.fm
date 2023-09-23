import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next'

import '../../layout.css'
import styles from './page.module.css'
import { FeedLoader } from '../../_utils/FeedLoader';
import { Episode } from '../../_components/types/Episode';
import { PublishedDate } from '../../_utils/PublishedDate';

import sanitizeHtml from 'sanitize-html';
import striptags from 'striptags';
import { parseStringPromise } from 'xml2js';

type Props = {
  params: { guid: string }
}

async function fetchEpisode({ params }: Props) {
  const episodes = await FeedLoader.loadAsEpisodes() as Episode[];
  return episodes.find((episode) => episode.guid === params.guid) as Episode;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const episode = await fetchEpisode({ params });
  const feedDescription = await parseStringPromise(episode.description, { explicitArray: false }) as { p: string };
  const description = striptags(feedDescription.p);

  return episode && {
    title: episode.title,
    description: description,
    openGraph: {
      title: episode.title,
      description: description,
      images: [episode.image],
      url: `/episodes/${episode.guid}`,
    },
    twitter: {
      title: episode.title,
      description: description,
    }
  }
}

export default async function EpisodeDetail({ params }: { params: { guid: string }}) {
  const episode = await fetchEpisode({ params });

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
        <audio className={styles.audio} controls={true} src={episode.url}>
          <a href={episode.url}>Download audio</a>
        </audio>
        <div className={styles.description} dangerouslySetInnerHTML={{__html: sanitizeHtml(episode.description)}} />
        <p className={styles.publishedon}>公開: {PublishedDate.parse(episode.pubDate)}</p>
      </section>
      <section>
        <p className='link-more'>
          <Link href={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </main>
  )
}
