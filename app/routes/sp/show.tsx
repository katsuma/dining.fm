import type { Route } from "./+types/show";

import { Link, useLoaderData } from "react-router-dom";

import { LabelBadge } from "@/components/LabelBadge";
import { proseStyles, Paragraph } from "@/components/Paragraph";
import { defaultTitle, defaultDescription, defaultHost, buildMeta } from "@/utils/meta";

type SpContent = {
  title: string;
  description: string;
  mp3Url: string;
};

const SP_CONTENT: Record<string, SpContent> = {
  pcwe2026: {
    title: "Podcast Weekend 2026 スペシャルエピソード",
    description:
      "※このエピソードはPodcast Weekend 2026 来場者の方向けのスペシャルエピソードです。通常回では語られないkatsuma, daikokuのプロフィールや、これまでの中からおすすめエピソードを紹介します。",
    mp3Url:
      "https://diningfm.s3.us-east-1.amazonaws.com/public/sp/pcwe2026.mp3",
  },
};

const NOT_FOUND_MESSAGE = "指定したコンテンツは見つかりませんでした";

export function loader({ params }: Route.LoaderArgs) {
  const content = SP_CONTENT[params.id];

  if (!content) {
    throw new Response(NOT_FOUND_MESSAGE, { status: 404 });
  }

  return { id: params.id, content };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data) {
    return buildMeta([]);
  }

  const title = `${data.content.title} | ${defaultTitle}`;
  const description = data.content.description;
  const url = `${defaultHost}/sp/${data.id}`;

  return buildMeta([
    { title },

    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${defaultHost}/opengraph-image.png` },

    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: `${defaultHost}/opengraph-image.png` },
  ]);
}

function SpShow() {
  const { content } = useLoaderData();

  return (
    <div className="container">
      <section className="mb-8">
        <h2 className="font-heading text-[22px] font-bold tracking-[-0.66px] text-black-primary leading-snug mb-2">
          {content.title}
        </h2>
        <div className="h-[5px] rounded-full bg-orange border border-black mb-4" />
      </section>

      <audio className="w-full my-8" controls src={content.mp3Url}>
        <a href={content.mp3Url}>ダウンロード</a>
      </audio>

      <section className="relative mb-10">
        <LabelBadge text="SP" />
        <div className="bg-white border-2 border-black rounded-(--card-radius) shadow-(--card-shadow) p-6 pt-8">
          <p className={`${proseStyles} whitespace-pre-wrap`}>
            {content.description}
          </p>
          <hr className="border-t border-gray-300 border-dashed my-6" />
          <Paragraph>
            感想はX(Twitter)のハッシュタグ
            <Link to="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">
              #diningfm
            </Link>{" "}
            や<Link to="https://twitter.com/diningfm">@diningfm</Link>{" "}
            へのリプライ、
            <Link to="/letter">GoogleForm</Link>
            でのお便りなどからお待ちしています📮
          </Paragraph>
        </div>
      </section>
    </div>
  );
}

export default SpShow;
