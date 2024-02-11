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
  applePodcastEpisodeId: string,
}

export function Player({ title, image, description, pubDate, spotifyEpisodeId, applePodcastEpisodeId }: Props) {
  return (
    <>
      <section className='section'>
        <h2 className='title'>{title}</h2>

        {
          spotifyEpisodeId != '' &&
          <div className={styles.player_container}>
            <Spotify link={`https://open.spotify.com/episode/` + spotifyEpisodeId} width={330} />
          </div>
        }

        <div className={styles.listens_on}>
          {
            spotifyEpisodeId != '' &&
            <a href={`https://open.spotify.com/episode/` + spotifyEpisodeId} target="_blank" rel="noopener noreferrer">
              <Image src={'/listen-on/spotify.svg'} alt={'Listen on Spotify'} width={160} height={40} priority={false} />
            </a>
          }
          {
            applePodcastEpisodeId != '' &&
            <a href={`https://podcasts.apple.com/us/podcast/id1668849655?i=` + applePodcastEpisodeId} target="_blank" rel="noopener noreferrer">
              <Image src={'/listen-on/apple.svg'} alt={'Listen on Apple Podcasts'} width={160} height={40} priority={false} />
            </a>
          }
        </div>

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

