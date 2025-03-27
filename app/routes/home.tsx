import { Link, type LoaderFunction, useLoaderData } from 'react-router-dom';
import prisma from '../../src/utils/prisma';

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

const Home = () => {
  const { episodes } = useLoaderData();

  return (
    <div className="container mx-auto px-4">
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">最新エピソード</h2>
        {episodes.map((episode: any) => (
          <Link to={`/episodes/${episode.id}`} key={episode.id} className="block mb-4">
            <div className="p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{episode.title}</h3>
              <p className="text-gray-600">{episode.description}</p>
              <p className="text-sm text-gray-500">公開日: {new Date(episode.publishedAt).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
        <p className="text-blue-500 mt-4"><Link to="/episodes/page/1">エピソードをもっと見る</Link></p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">ポッドキャストの収録・編集環境</h2>
        <Link to="/podcasting-guide">
          <img src="/podcasting-guide/banner.jpg" alt="ポッドキャストの収録・編集環境" className="w-full rounded" />
        </Link>
        <p className="text-gray-600 mt-2">マイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてまとめてみました。</p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">ロボットADへの質問</h2>
        <Link to="/question">
          <img src="/question/banner.jpg" alt="ロボットADへの質問" className="w-full rounded" />
        </Link>
        <p className="text-gray-600 mt-2">ロボットADが番組でこれまで話したエピソードをもとに質問に答えます。</p>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">番組紹介</h2>
        <p className="text-gray-600">dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。</p>
        <p className="text-gray-600">感想はX(Twitter)のハッシュタグ <a href="https://twitter.com/search?q=%23diningfm&src=typed_query&f=top" className="text-blue-500">#diningfm</a> や <a href="https://twitter.com/diningfm" className="text-blue-500">@diningfm</a> へのリプライ、<a href="https://bit.ly/3Kq3zf2" className="text-blue-500">GoogleForm</a> でのお便りなどからお待ちしています。</p>
      </section>

      <section className="my-8">
        <div className="flex space-x-4">
          <a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5" target="_blank" rel="noopener noreferrer">
            <img src="/listen-on/spotify.svg" alt="Listen on Spotify" className="h-10" />
          </a>
          <a href="https://podcasts.apple.com/jp/podcast/id1668849655" target="_blank" rel="noopener noreferrer">
            <img src="/listen-on/apple.svg" alt="Listen on Apple Podcasts" className="h-10" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
