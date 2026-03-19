import type { Route } from "./+types/show";

import { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegClock } from "react-icons/fa";
import DOMPurify from 'dompurify';
import type { Episode } from '@prisma/client';

import { LinkButton } from "@/components/LinkButton";
import { LabelBadge } from "@/components/LabelBadge";
import { proseStyles } from "@/components/Paragraph";
import { Duration } from '@/utils/Duration';
import { defaultTitle, defaultDescription, defaultHost, buildMeta } from '@/utils/meta';
import prisma from '@/utils/prisma';
import { PublishedDate } from '@/utils/PublishedDate';
import { EpisodePlayer } from "./components/EpisodePlayer";
import { Paragraph } from "@/components/Paragraph";

const NOT_FOUND_MESSAGE = "指定したエピソードは見つかりませんでした";

export async function loader({ params }: Route.LoaderArgs) {
  const episodeId = Number(params.id);

  if (isNaN(episodeId)) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }

  const episode = await prisma.episode.findUnique({
    where: {
      id: episodeId
    }
  });

  if (!episode) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }
  return { episode };
}

export function meta({data}: Route.MetaArgs) {
  if (!data || data.episode === null) {
    return buildMeta([]);
  }

  const title = `${data.episode.id}. ${data.episode.title} | ${defaultTitle}`;
  const description = data.episode.summary || defaultDescription;
  const url = `${defaultHost}/episodes/${data.episode.id}`;
  const imageUrl = data.episode.imageUrl || `${defaultHost}/opengraph-image.png`;

  return buildMeta([
    { title },

    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: data.episode.imageUrl || `${defaultHost}/opengraph-image.png` },

    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
  ]);
}


function EpisodeDetail() {
  const { episode } = useLoaderData();

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
    <div className="container">
      <section className="mb-8">
        <h2 className="text-[22px] font-bold tracking-[-0.66px] text-black-primary leading-snug mb-2">
          <span className="font-numeric">{episode.id}.</span> {episode.title}
        </h2>
        <div className="h-[5px] rounded-full bg-orange border border-black mb-4" />
        <div className="flex items-center space-x-4">
          <p className="flex items-center gap-1 font-numeric text-[14px] text-black tracking-[-0.42px]">
            <IoCalendarOutline className="size-4" />
            {PublishedDate.parse(episode.publishedAt)}
          </p>
          <p className="flex items-center gap-1 font-numeric text-[14px] text-black tracking-[-0.42px]">
            <FaRegClock className="size-4" />
            {Duration.parse(episode.duration)}
          </p>
        </div>
      </section>

      <EpisodePlayer episode={episode} />

      <section className="relative mb-10">
          <LabelBadge text="EP" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) p-6 pt-8">
          <EpisodeDescription episode={episode} />
          <hr className="border-t border-gray-300 border-dashed my-6" />
          <Paragraph>
            感想はX(Twitter)のハッシュタグ<Link to="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">#diningfm</Link> や
            <Link to="https://twitter.com/diningfm">@diningfm</Link> へのリプライ、
            <Link to="/letter">GoogleForm</Link>でのお便りなどからお待ちしています📮
          </Paragraph>
        </div>
      </section>

      <section className="flex justify-center my-10">
        <LinkButton to={'/episodes/page/1'}>一覧へ戻る</LinkButton>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
function EpisodeDescription({ episode }: { episode: Episode }) {
  const [sanitizedDescription, setSanitizedDescription] = useState('');

  useEffect(() => {
    if (episode.description) {
      setSanitizedDescription(DOMPurify.sanitize(episode.description));
    }
  }, [episode.description]);

  return (
    <div
      className={`${proseStyles} break-all [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:ml-3 [&_ul_li]:mb-2`}
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
    />
  );
}

export default EpisodeDetail;
