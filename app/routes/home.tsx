import { Link, type LoaderFunction, useLoaderData } from 'react-router-dom';
import { type Episode } from '@prisma/client';
import type { Route } from "./+types/home";

import prisma from '@/utils/prisma';
import { buildMeta } from '@/utils/meta';
import { EpisodeListItem } from '@/components/EpisodeListItem';
import { LinkButton } from "@/components/LinkButton";

export const loader: LoaderFunction = async () => {
  const episodes = await prisma.episode.findMany({
    orderBy: [{ id: 'desc' }],
    take: 5,
    select: {
      id: true,
      title: true,
      description: true,
      publishedAt: true,
      imageUrl: true,
      enclosureUrl: true,
      duration: true,
    },
  });
  return { episodes };
};

export function meta({}: Route.MetaArgs) {
  return buildMeta([]);
}

const Home = () => {
  const { episodes } = useLoaderData();

  return (
    <div className="container">
      <section className="my-8">
        <h2 className="title">最新エピソード</h2>
        {episodes.map((episode: Episode) => (
          <EpisodeListItem episode={episode} key={episode.id} />
        ))}
        <div className="flex justify-around mx-auto mt-6 mb-16 text-xl">
          <LinkButton to="/episodes/page/1">エピソードをもっと見る »</LinkButton>
        </div>
      </section>

      <section className="my-8">
        <h2 className="title">ポッドキャストの収録・編集環境</h2>
        <Link to="/podcasting-guide">
          <img src="/podcasting-guide/banner.jpg" alt="ポッドキャストの収録・編集環境" className="w-full rounded" />
        </Link>
        <p className="mt-2 text-xl">マイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてまとめてみました。</p>
      </section>

      <section className="my-8">
        <h2 className="title">番組紹介</h2>
        <p className="text-xl leading-[2.4rem] mb-4">dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。</p>
        <p className="text-xl leading-[2.4rem] mb-4">ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠</p>
        <p className="text-xl leading-[2.4rem] mb-4">感想はX(Twitter)のハッシュタグ <a href="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top">#diningfm</a> や <a href="https://twitter.com/diningfm">@diningfm</a> へのリプライ、<a href="https://bit.ly/3Kq3zf2">GoogleForm</a> でのお便りなどからお待ちしています📮</p>
      </section>

      <section className="my-16 text-center">
        <div className="grid grid-cols-2 gap-4 md:flex md:justify-center md:space-x-4 md:mx-auto">

          <a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5" target="_blank" rel="noopener noreferrer">
            <img src="/listen-on/spotify.svg" alt="Listen on Spotify" height={40} />
          </a>
          <a href="https://podcasts.apple.com/jp/podcast/id1668849655" target="_blank" rel="noopener noreferrer">
            <img src="/listen-on/apple.svg" alt="Listen on Apple Podcasts" height={40} />
          </a>

          <a href={`https://www.youtube.com/@diningfm`} target="_blank" rel="noopener noreferrer">
            <img src={'/listen-on/youtube.svg'} alt={'Listen on YouTube'} height={40}/>
          </a>

        </div>
      </section>

      <section className="text-center my-16">
        <div className="flex justify-center space-x-4">
          <img src={'/icons.svg'} alt={'dining.fm'} width={260} height={100} />
        </div>
      </section>

    </div>
  );
};

export default Home;
