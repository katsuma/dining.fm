import { MetadataRoute } from "next"
import prisma from '@/utils/prisma';


const BASE_URL = process.env.BASE_URL || '';

function getStaticPaths(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly' },
    { url: `${BASE_URL}/podcasting-guide`, lastModified: new Date() },
  ];
};

async function getEpisodePaths(): Promise<MetadataRoute.Sitemap> {
  const episodes = await prisma.episode.findMany(
    {
      orderBy: [{ id: 'desc' }],
      select: {
        id: true,
        publishedAt: true,
      }
    }
  );
  return episodes.map((episode) => ({
    url: `${BASE_URL}/episodes/${episode.id}`,
    lastModified: episode.publishedAt,
  }));
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  return [...getStaticPaths(), ...await getEpisodePaths()];
}
