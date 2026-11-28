import type { Config } from "@react-router/dev/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { EPISODES_PER_PAGE } from "./app/utils/pagination";
import { SP_CONTENT_IDS } from "./app/routes/sp/content";
import { PRERENDER_ENV_KEY } from "./app/utils/prerender.server";

// Every page that reads the database is rendered to static HTML (plus the
// `.data` file used by client side navigation) at build time, so serving
// them never invokes a function or wakes the Neon database. New episodes
// show up after a redeploy (see scripts/redeploy).
async function buildPrerenderPaths(): Promise<string[]> {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.POSTGRES_PRISMA_URL!,
    }),
  });

  try {
    const episodes = await prisma.episode.findMany({
      select: { id: true },
      orderBy: { id: "desc" },
    });
    const pageCount = Math.max(
      1,
      Math.ceil(episodes.length / EPISODES_PER_PAGE)
    );

    return [
      "/",
      "/podcasting-guide",
      "/sitemap.xml",
      ...Array.from({ length: pageCount }, (_, i) => `/episodes/page/${i + 1}`),
      ...episodes.map((episode) => `/episodes/${episode.id}`),
      ...SP_CONTENT_IDS.map((id) => `/sp/${id}`),
    ];
  } finally {
    await prisma.$disconnect();
  }
}

export default {
  ssr: true,
  prerender: {
    async paths() {
      // Lets the route loaders know they are running at build time; at
      // runtime they answer 404 without touching the database.
      process.env[PRERENDER_ENV_KEY] = "1";
      return buildPrerenderPaths();
    },
    concurrency: 8,
  },
} satisfies Config;
