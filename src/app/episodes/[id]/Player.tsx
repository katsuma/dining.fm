"use client";

import Link from 'next/link';
import Image from 'next/image';

import sanitizeHtml from 'sanitize-html';
import { Spotify } from 'react-spotify-embed';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegClock } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";

import styles from '@/app/episodes/[id]/page.module.css'
import { PublishedDate } from '@/utils/PublishedDate';
import { Duration } from '@/utils/Duration';

type Props = {
  id: number,
  title: string,
  description: string,
  pubDate: string,
  duration: string,
  enclosureUrl: string,
  spotifyEpisodeId: string,
  applePodcastEpisodeId: string,
  summary: string | null,
}

export function Player({ id, title, description, pubDate, duration, enclosureUrl, spotifyEpisodeId, applePodcastEpisodeId, summary }: Props) {
  return (
    <>
      <section className='section'>
        <h2 className='title'>{id}. {title}</h2>
        <div className={styles.episode_meta}>
          <p>
            <span className={styles.meta_icon}><IoCalendarOutline /></span>
            <span className={styles.meta_text}>{PublishedDate.parse(pubDate)}</span>
          </p>
          <p>
            <span className={styles.meta_icon}><FaRegClock /></span>
            <span className={styles.meta_text}>{Duration.parse(duration)}</span>
          </p>
        </div>

        {
          spotifyEpisodeId !== null ?
          <div className={styles.player_container}>
            <Spotify link={`https://open.spotify.com/episode/` + spotifyEpisodeId} width={330} />
          </div>
          :
          <audio className={styles.audio} controls={true} src={enclosureUrl}>
            <a href={enclosureUrl}>ダウンロード</a>
          </audio>
        }

        <div className={styles.listens_on}>
          {
            spotifyEpisodeId !== null &&
            <a href={`https://open.spotify.com/episode/` + spotifyEpisodeId} target="_blank" rel="noopener noreferrer">
              <Image src={'/listen-on/spotify.svg'} alt={'Listen on Spotify'} width={160} height={40} priority={false} />
            </a>
          }
          {
            applePodcastEpisodeId !== null &&
            <a href={`https://podcasts.apple.com/us/podcast/id1668849655?i=` + applePodcastEpisodeId} target="_blank" rel="noopener noreferrer">
              <Image src={'/listen-on/apple.svg'} alt={'Listen on Apple Podcasts'} width={160} height={40} priority={false} />
            </a>
          }
        </div>

        {
          summary !== null &&
          <section className={styles.summary}>
            <h3><CgNotes /> ざっくりまとめ</h3>
            <p>{summary}</p>
          </section>
        }

        <div className={styles.description} dangerouslySetInnerHTML={{__html: sanitizeHtml(description)}} />
      </section>

      <section className='section'>
        <p className={styles.contact}>
          感想はX(Twitter)のハッシュタグ<a href="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">#diningfm</a> や
          <a href="https://twitter.com/diningfm">@diningfm</a>へのリプライ、
          <a href="https://bit.ly/3Kq3zf2">GoogleForm</a>でのお便りなどからお待ちしています📮
        </p>

      </section>

      <section>
        <p className='link-more'>
          <Link href={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </>
  );
}

