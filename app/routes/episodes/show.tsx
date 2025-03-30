import type { Route } from "./+types/show";

import { Link, useLoaderData } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegClock } from "react-icons/fa";

import { Duration } from '@/utils/Duration';
import { defaultTitle, defaultHost, buildMeta } from '@/utils/meta';
import prisma from '@/utils/prisma';
import { PublishedDate } from '@/utils/PublishedDate';
import { EpisodePlayer } from "./components/EpisodePlayer";

export async function loader({ params }: Route.LoaderArgs) {
  const episode = await prisma.episode.findUnique({
    where: {
      id: Number(params.id)
    }
  });
  return { episode };
}

export function meta({data}: Route.MetaArgs) {
  if (!data || data.episode === null) {
    return buildMeta([]);
  }

  const title = `${data.episode.title} | ${defaultTitle}`;
  const description = data.episode.summary || defaultTitle;
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

  return (
    <div className="container">
      <section className="my-8">
        <h2 className="title">{episode.id}. {episode.title}</h2>
        <div className="flex space-x-4 episode-meta">
          <p className="text-gray-500 mb-1">
            <IoCalendarOutline className="inline-block mr-1" />
            <span className="align-middle">{PublishedDate.parse(episode.publishedAt)}</span>
          </p>
          <p className="text-gray-500 mb-1">
            <FaRegClock className="inline-block mr-1" />
            <span className="align-middle">{Duration.parse(episode.duration)}</span>
          </p>
        </div>
        <EpisodePlayer episode={episode} />
      </section>

      <section>
        <p className="text-xl leading-[2.4rem] mb-4">
          感想はX(Twitter)のハッシュタグ<a href="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">#diningfm</a> や
          <a href="https://twitter.com/diningfm">@diningfm</a>へのリプライ、
          <a href="https://bit.ly/3Kq3zf2">GoogleForm</a>でのお便りなどからお待ちしています📮
        </p>
      </section>

      <section className="text-center my-16">
        <p className="text-xl leading-[2.4rem] mb-4">
          <Link to={'/episodes/page/1'}>エピソード一覧</Link>
        </p>
      </section>
    </div>
  );
}
export default EpisodeDetail;
