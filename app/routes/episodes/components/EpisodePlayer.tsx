import { useState, useEffect } from 'react';
import { CgNotes } from "react-icons/cg";
import DOMPurify from 'dompurify';

import type { Episode } from '@prisma/client';
import styles from './EpisodePlayer.module.css';

export function EpisodePlayer({ episode }:{ episode: Episode }) {
  const [sanitizedDescription, setSanitizedDescription] = useState('');

  useEffect(() => {
    if (episode.description) {
      setSanitizedDescription(DOMPurify.sanitize(episode.description));
    }
  }, [episode.description]);

  return(<>
    {
      episode.spotifyId !== null ?
      <iframe
        src={`https://open.spotify.com/embed/episode/${episode.spotifyId}`}
        width="330"
        height="80"
        allow="encrypted-media"
        title="Spotify Player"
        className="w-full h-52 my-8"
      ></iframe>
      :
      <audio className="w-full my-8" controls={true} src={episode.enclosureUrl}>
        <a href={episode.enclosureUrl}>ダウンロード</a>
      </audio>
    }

    <section className="my-16 text-center">
      <div className="grid grid-cols-2 gap-4 md:flex md:justify-center md:space-x-4 md:mx-auto">
        {
          episode.spotifyId !== null &&
          <a href={`https://open.spotify.com/episode/${episode.spotifyId}`} target="_blank" rel="noopener noreferrer">
            <img src={'/listen-on/spotify.svg'} alt={'Listen on Spotify'} width={160} height={40}/>
          </a>
        }
        {
          episode.applePodcastId !== null &&
          <a href={`https://podcasts.apple.com/us/podcast/id1668849655?i=${episode.applePodcastId}`} target="_blank" rel="noopener noreferrer">
            <img src={'/listen-on/apple.svg'} alt={'Listen on Apple Podcasts'} width={160} height={40}/>
          </a>
        }
        {
          episode.youtubeId !== null &&
          <a href={`https://www.youtube.com/watch?v=${episode.youtubeId}`} target="_blank" rel="noopener noreferrer">
            <img src={'/listen-on/youtube.svg'} alt={'Listen on YouTube'} width={160} height={40}/>
          </a>
        }
      </div>
    </section>

    {
      episode.summary !== null &&
      <section className={styles.summary}>
        <h3>
          <CgNotes className="inline-block pt-1 mr-1" />
          <span className="align-middle">ざっくりまとめ</span>
        </h3>
        <p>{episode.summary}</p>
      </section>
    }

    <div
      className={styles['episode-description']}
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
    />
  </>);
}
