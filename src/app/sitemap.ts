import { MetadataRoute } from "next"
import { FeedLoader } from '../utils/FeedLoader';
import { Episode } from "../components/types/Episode";

const BASE_URL = process.env.BASE_URL || '';

function getStaticPaths(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly' },
    { url: `${BASE_URL}/podcasting-guide`, lastModified: new Date() },
  ];
};

async function getEpisodePaths(): Promise<MetadataRoute.Sitemap> {
  const episodes = await FeedLoader.loadAsEpisodes() as unknown as Episode[];
  return episodes.map((episode) => ({
    url: `${BASE_URL}/episodes/${episode.guid}`,
    lastModified: new Date(episode.pubDate),
  }));
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  return [...getStaticPaths(), ...await getEpisodePaths()];
}
