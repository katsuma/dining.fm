"use client";

import Link from 'next/link';
import Image from 'next/image';

import sanitizeHtml from 'sanitize-html';
import { Spotify } from 'react-spotify-embed';

import styles from '@/app/episodes/[guid]/page.module.css'
import { PublishedDate } from '@/utils/PublishedDate';

type Props = {
  title: string,
  image: string,
  description: string,
  pubDate: string,
  spotifyEpisodeId: string,
}

export function Player({ title, image, description, pubDate, spotifyEpisodeId }: Props) {
  return (
    <>
      <section className='section'>
        <h2 className='title'>{title}</h2>

        <div className={styles['cover-image']}>
          <Image
            src={image}
            alt={title}
            width={600}
            height={600}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority={true}
          />
        </div>

        <Spotify link={`https://open.spotify.com/episode/` + spotifyEpisodeId} wide={true} />

        <div className={styles.description} dangerouslySetInnerHTML={{__html: sanitizeHtml(description)}} />

        <p className={styles.publishedon}>公開: {PublishedDate.parse(pubDate)}</p>
      </section>

      <section>
        <p className='link-more'>
          <Link href={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </>
  );
}

