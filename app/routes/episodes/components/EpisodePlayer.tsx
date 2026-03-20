import type { Episode } from '@prisma/client';

export function EpisodePlayer({ episode }:{ episode: Episode }) {
  return(<>
    {
      episode.spotifyId !== null ?
      <iframe
        src={`https://open.spotify.com/embed/episode/${episode.spotifyId}`}
        width="330"
        height="70"
        allow="encrypted-media"
        title="Spotify Player"
        className="w-full h-46"
      ></iframe>
      :
      <audio className="w-full my-8" controls={true} src={episode.enclosureUrl}>
        <a href={episode.enclosureUrl}>ダウンロード</a>
      </audio>
    }

    <section className="mb-8 text-center">
      <div className="grid grid-cols-2 gap-2 md:flex md:justify-center md:space-x-4 md:mx-auto">
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
  </>);
}
