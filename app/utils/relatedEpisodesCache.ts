import { LRUCache } from "lru-cache";

type RelatedEpisode = {
  id: number;
  title: string;
  publishedAt: Date;
  duration: string;
  imageUrl: string;
};

declare global {
  var relatedEpisodesCache: LRUCache<number, RelatedEpisode[]> | undefined;
}

const globalForCache = global as unknown as {
  relatedEpisodesCache: LRUCache<number, RelatedEpisode[]>;
};

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export const relatedEpisodesCache =
  globalForCache.relatedEpisodesCache ||
  new LRUCache<number, RelatedEpisode[]>({
    max: 500,
    ttl: CACHE_TTL_MS,
  });

// In production the module is evaluated once per process lifetime, so the
// module-scoped variable above acts as a singleton on its own.
// In development, HMR re-evaluates modules on every change, which would create
// a fresh LRUCache instance and lose cached data. Storing the instance on
// `global` makes it survive HMR reloads.
if (process.env.NODE_ENV === "development") {
  globalForCache.relatedEpisodesCache = relatedEpisodesCache;
}
