import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { kv } from "@vercel/kv";

import '@/app/layout.css'
import { FeedLoader } from '@/utils/FeedLoader';
import { Episode } from '@/components/types/Episode';
import { Player } from '@/app/episodes/[guid]/Player';

import striptags from 'striptags';
import React from 'react';

type Props = {
  params: { guid: string }
}

async function fetchEpisode({ params }: Props) {
  const episodes = await FeedLoader.loadAsEpisodes() as Episode[];
  return episodes.find((episode) => episode.guid === params.guid) as Episode;
}

async function fetchSpotifyId(idKey: string) {
  return kv.get(`${idKey}-spotify`);
}

async function fetchApplePodcastId(idKey: string) {
  return kv.get(`${idKey}-apple`);
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const episode = await fetchEpisode({ params });

  if (!episode) {
    notFound()
  }

  const description = striptags(episode.description).replace(/\s+/g, "、");

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
      site: '@diningfm',
      creator: '@diningfm',
    }
  }
}

export default async function EpisodeDetail({ params }: Props) {
  const episode = await fetchEpisode({ params });

  if (!episode) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'author': [
      {
        '@type': 'Person',
        name: 'Ryo Katsuma',
        url: 'https://katsuma.tv',
      },
      {
        '@type': 'Person',
        name: 'Yoko Daikoku',
      }
    ],
    dateModified: (new Date(episode.pubDate)).toISOString(),
    datePublished: (new Date(episode.pubDate)).toISOString(),
    headline: episode.title,
    image: episode.image,
  }

  const spotifyEpisodeId = await fetchSpotifyId(episode.guid);
  const applePodcastEpisodeId = await fetchApplePodcastId(episode.guid);

  return (
    <>
      <Player
        title={episode.title}
        description={episode.description}
        pubDate={episode.pubDate}
        duration={episode.duration}
        spotifyEpisodeId={String(spotifyEpisodeId)}
        applePodcastEpisodeId={String(applePodcastEpisodeId)}
      />

      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    </>
  )
}
