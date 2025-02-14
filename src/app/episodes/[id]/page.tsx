import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import striptags from 'striptags';
import React from 'react';

import '@/app/layout.css'
import prisma from '@/utils/prisma';
import { Player } from '@/app/episodes/[id]/Player';
import { PublishedDate } from '@/utils/PublishedDate';

type Props = {
  params: Promise<{ id: string }>
}

async function fetchEpisode(episodeId: number) {
  return await prisma.episode.findUnique({
    where: {
      id: episodeId
    }
  });
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const episodeId = await params.id;
  const episode = await fetchEpisode(Number(episodeId));

  if (!episode) {
    notFound()
  }

  const description = episode.summary || striptags(episode.description).replace(/\s+/g, "、");

  return episode && {
    title: episode.title,
    description: description,
    openGraph: {
      title: episode.title,
      description: description,
      images: [episode.imageUrl],
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

export default async function EpisodeDetail(props: Props) {
  const params = await props.params;
  const episodeId = await params.id;
  const episode = await fetchEpisode(Number(episodeId));

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
    dateModified: episode.publishedAt.toISOString(),
    datePublished: episode.publishedAt.toISOString(),
    headline: episode.title,
    image: episode.imageUrl,
  }

  return (
    <>
      <Player
        id={episode.id}
        title={episode.title}
        description={episode.description}
        pubDate={PublishedDate.toLocalDate(episode.publishedAt)}
        duration={episode.duration}
        enclosureUrl={episode.enclosureUrl}
        spotifyEpisodeId={episode.spotifyId!}
        applePodcastEpisodeId={episode.applePodcastId!}
        summary={episode.summary}
      />

      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    </>
  )
}
