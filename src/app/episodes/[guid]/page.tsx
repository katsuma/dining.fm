import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { kv } from "@vercel/kv";

import '../../layout.css'
import { FeedLoader } from '../../../utils/FeedLoader';
import { Episode } from '../../../components/types/Episode';
import { Player } from './Player';

import striptags from 'striptags';
import { parseStringPromise } from 'xml2js';
import React from 'react';

type Props = {
  params: { guid: string }
}

async function fetchEpisode({ params }: Props) {
  const episodes = await FeedLoader.loadAsEpisodes() as Episode[];
  return episodes.find((episode) => episode.guid === params.guid) as Episode;
}

async function fetchSpotifyId(idKey: string) {
  return kv.get(idKey);
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

  const spotifyEpisodeId = await fetchSpotifyId(episode.guid);

  return (
    <Player
      title={episode.title}
      image={episode.image}
      description={episode.description}
      pubDate={episode.pubDate}
      spotifyEpisodeId={String(spotifyEpisodeId)}
    />
  )
}
