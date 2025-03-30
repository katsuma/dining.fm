import prisma from "@/utils/prisma";
import { defaultHost } from "@/utils/meta";

export async function loader() {
  const staticPaths = [
    { url: `${defaultHost}/`, lastModified: new Date().toISOString() },
    { url: `${defaultHost}/podcasting-guide`, lastModified: new Date().toISOString() },
  ];

  const episodes = await prisma.episode.findMany({
    select: { id: true, publishedAt: true },
    orderBy: { id: "desc" },
  });

  const episodePaths = episodes.map((episode) => ({
    url: `${defaultHost}/episodes/${episode.id}`,
    lastModified: episode.publishedAt.toISOString(),
  }));

  const allPaths = [...staticPaths, ...episodePaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map(
          (path) => `
        <url>
          <loc>${path.url}</loc>
          <lastmod>${path.lastModified}</lastmod>
        </url>`
        )
        .join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
