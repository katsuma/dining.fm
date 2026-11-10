import type { Route } from "./+types/show";

import { Link, data, href, useLoaderData } from "react-router";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

import { LinkButton } from "@/components/LinkButton";
import { LabelBadge } from "@/components/LabelBadge";
import { proseStyles } from "@/components/Paragraph";
import { EpisodeCard } from "@/components/EpisodeCard";
import { Heading } from "@/components/Heading";
import { Duration } from "@/utils/Duration";
import {
  defaultTitle,
  defaultDescription,
  defaultHost,
  buildMeta,
} from "@/utils/meta";
import prisma from "@/utils/prisma";
import { buildCacheHeaders, CACHE_CONTROL_LONG } from "@/utils/cacheHeaders";
import { relatedEpisodesCache } from "@/utils/relatedEpisodesCache";
import { PublishedDate } from "@/utils/PublishedDate";
import { EpisodePlayer } from "./components/EpisodePlayer";
import { Paragraph } from "@/components/Paragraph";

const NOT_FOUND_MESSAGE = "指定したエピソードは見つかりませんでした";

function stripChapterAndLinkSections(html: string): string {
  return html.replace(
    /<p[^>]*>\s*■\s*(?:チャプター|参考リンク|関連リンク)\s*<\/p>\s*(?:<p[^>]*>\s*<br\s*\/?\s*>\s*<\/p>\s*)*(?:<ul[\s\S]*?<\/ul>\s*(?:<p[^>]*>\s*<br\s*\/?\s*>\s*<\/p>\s*)*)+/gi,
    ""
  );
}

function toPlainText(html: string): string {
  const withoutSections = stripChapterAndLinkSections(html);
  const withBreaks = withoutSections
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/(p|li|div)>/gi, " ");

  return sanitizeHtml(withBreaks, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, " ")
    .trim();
}

const episodeSelect = {
  id: true,
  title: true,
  publishedAt: true,
  duration: true,
  imageUrl: true,
  description: true,
  spotifyId: true,
  applePodcastId: true,
  youtubeId: true,
  enclosureUrl: true,
} as const;

const relatedEpisodeSelect = {
  id: true,
  title: true,
  publishedAt: true,
  duration: true,
  imageUrl: true,
} as const;

export async function loader({ params }: Route.LoaderArgs) {
  const episodeId = Number(params.id);

  if (isNaN(episodeId)) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }

  const episode = await prisma.episode.findUnique({
    where: {
      id: episodeId,
    },
    select: episodeSelect,
  });

  if (!episode) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }

  const sanitizedDescription = episode.description
    ? sanitizeHtml(episode.description)
    : "";

  const cached = relatedEpisodesCache.get(episodeId);
  let relatedEpisodes: {
    id: number;
    title: string;
    publishedAt: Date;
    duration: string;
    imageUrl: string;
  }[] = cached ?? [];

  if (cached) {
    console.log("cached related episodes hit (episodeId: ", episodeId, ")");
  } else {
    console.log("cached related episodes miss (episodeId: ", episodeId, ")");

    const relatedIds = await prisma.$transaction(async (tx) => {
      // pg_vector operators require public schema in search_path
      await tx.$executeRaw`SET LOCAL search_path TO diningfm, public`;
      return tx.$queryRaw<{ id: number }[]>`
        SELECT id FROM diningfm.episodes
        WHERE id != ${episodeId}
          AND embedding IS NOT NULL
          AND (SELECT embedding FROM diningfm.episodes WHERE id = ${episodeId}) IS NOT NULL
        ORDER BY embedding <=> (
          SELECT embedding FROM diningfm.episodes WHERE id = ${episodeId}
        )
        LIMIT 5
      `;
    });

    if (relatedIds.length > 0) {
      const idOrder = relatedIds.map((r) => r.id);
      const fetched = await prisma.episode.findMany({
        where: { id: { in: idOrder } },
        select: relatedEpisodeSelect,
      });
      relatedEpisodes = fetched.sort(
        (a, b) => idOrder.indexOf(a.id) - idOrder.indexOf(b.id)
      );
    }

    relatedEpisodesCache.set(episodeId, relatedEpisodes);
  }

  // The episode specific cache tag lets scripts/purge-cache invalidate
  // this page on its own; the route's headers export merges it with the
  // shared tags.
  return data(
    { episode, sanitizedDescription, relatedEpisodes },
    {
      headers: {
        "Vercel-Cache-Tag": `episode-${episodeId}`,
      },
    }
  );
}

export function headers({ loaderHeaders, errorHeaders }: Route.HeadersArgs) {
  return buildCacheHeaders({
    cacheControl: CACHE_CONTROL_LONG,
    tags: ["diningfm", "episodes"],
    loaderHeaders,
    errorHeaders,
  });
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta([]);
  }

  const title = `${loaderData.episode.id}. ${loaderData.episode.title} | ${defaultTitle}`;
  const description =
    toPlainText(loaderData.episode.description ?? "") || defaultDescription;
  const url = `${defaultHost}/episodes/${loaderData.episode.id}`;
  const imageUrl =
    loaderData.episode.imageUrl || `${defaultHost}/opengraph-image.png`;

  return buildMeta([
    { title },
    { name: "description", content: description },

    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },

    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
  ]);
}

function EpisodeDetail() {
  const { episode, sanitizedDescription, relatedEpisodes } =
    useLoaderData<typeof loader>();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: [
      {
        "@type": "Person",
        name: "Ryo Katsuma",
        url: "https://katsuma.tv",
      },
      {
        "@type": "Person",
        name: "Yoko Daikoku",
      },
    ],
    dateModified: episode.publishedAt.toISOString(),
    datePublished: episode.publishedAt.toISOString(),
    headline: episode.title,
    image: episode.imageUrl,
  };

  return (
    <div className="container">
      <section className="mb-8">
        <h2 className="font-heading text-[22px] font-bold tracking-[-0.66px] text-black-primary leading-snug mb-2">
          <span className="font-numeric">{episode.id}.</span> {episode.title}
        </h2>
        <div className="h-[5px] rounded-full bg-orange border border-black mb-4" />
        <div className="flex items-center space-x-4">
          <p className="flex items-center gap-1 font-numeric text-[14px] text-black tracking-[-0.42px]">
            <IoCalendarOutline className="size-4" />
            {PublishedDate.parse(episode.publishedAt.toISOString())}
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
          <EpisodeDescription sanitizedDescription={sanitizedDescription} />
          <hr className="border-t border-gray-300 border-dashed my-6" />
          <Paragraph>
            感想はX(Twitter)のハッシュタグ
            <Link to="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">
              #diningfm
            </Link>{" "}
            や<Link to="https://twitter.com/diningfm">@diningfm</Link>{" "}
            へのリプライ、
            <Link to={href("/letter")}>GoogleForm</Link>
            でのお便りなどからお待ちしています📮
          </Paragraph>
        </div>
      </section>

      {relatedEpisodes.length > 0 && (
        <section className="mb-8">
          <Heading title="関連エピソード" dotClassName="bg-orange" />
          <div className="flex flex-col gap-3">
            {relatedEpisodes.map((episode) => (
              <EpisodeCard episode={episode} key={episode.id} />
            ))}
          </div>
        </section>
      )}

      <section className="flex justify-center my-10">
        <LinkButton to={href("/episodes/page/:page", { page: "1" })}>一覧へ戻る</LinkButton>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
function EpisodeDescription({
  sanitizedDescription,
}: {
  sanitizedDescription: string;
}) {
  return (
    <div
      className={`${proseStyles} break-all [&_p]:mb-4 [&_p:empty]:hidden [&_p:has(>br:only-child)]:hidden [&_p:has(+ul)]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:ml-3 [&_ul_li]:mb-2`}
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
    />
  );
}

export default EpisodeDetail;
