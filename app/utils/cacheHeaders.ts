// Cache profiles for Vercel's edge CDN. While s-maxage has not expired the
// CDN serves the cached response without invoking the route (or the
// database); stale-while-revalidate lets it keep serving the previous
// response while refreshing in the background.
export const CACHE_CONTROL_SHORT =
  "public, s-maxage=3600, stale-while-revalidate=86400";
export const CACHE_CONTROL_LONG =
  "public, s-maxage=86400, stale-while-revalidate=604800";

// Builds the cache headers for a route's document response, to be returned
// from the route's `headers` export. When the loader threw (errorHeaders is
// set), no cache headers are returned so error responses such as 404 are
// never stored on the CDN. Tags set by the loader itself through `data()`
// (for example "episode-123" on the episode detail route) arrive in
// loaderHeaders and are merged into Vercel-Cache-Tag.
export function buildCacheHeaders({
  cacheControl,
  tags,
  loaderHeaders,
  errorHeaders,
}: {
  cacheControl: string;
  tags: string[];
  loaderHeaders: Headers;
  errorHeaders: Headers | undefined;
}): Record<string, string> {
  if (errorHeaders) {
    return {};
  }

  const allTags = [...tags];
  const loaderTag = loaderHeaders.get("Vercel-Cache-Tag");
  if (loaderTag) {
    allTags.push(loaderTag);
  }

  return {
    "Cache-Control": cacheControl,
    "Vercel-Cache-Tag": allTags.join(","),
  };
}
