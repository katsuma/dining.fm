// Set by the `prerender` hook in react-router.config.ts while the build
// renders pages to static files.
export const PRERENDER_ENV_KEY = "DININGFM_PRERENDER";

function isDatabaseAccessAllowed(): boolean {
  return import.meta.env.DEV || process.env[PRERENDER_ENV_KEY] === "1";
}

// Called at the top of every loader that reads the database.
//
// Each known page is prerendered at build time and served as a static file
// by the CDN, so a loader only runs at runtime for paths that were not
// prerendered: unknown episode ids, out of range page numbers and the like.
// Those get a 404 straight away instead of a database query, which would
// wake the Neon database for every bot probing random URLs.
export function assertPrerendering(notFoundMessage = "Not Found"): void {
  if (!isDatabaseAccessAllowed()) {
    throw new Response(notFoundMessage, { status: 404 });
  }
}
