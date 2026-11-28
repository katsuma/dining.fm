# AGENTS.md

## Pull requests

- Write PR titles, descriptions, and PR comments in English.
- After opening or updating a PR, smoke-check the Vercel Preview deployment. A green CI (typecheck / lint / test / build) does not catch runtime failures such as SSR returning 500.
  1. Wait for the Vercel Preview deployment to finish. The preview URL is in the Vercel bot comment on the PR or in `gh pr checks`.
  2. Request these pages on the preview URL with `curl` and confirm each returns HTTP 200 with a non-error body: `/`, an episode page `/episodes/<id>`, `/episodes/page/2`, `/sitemap.xml`. `/feed` is an intentional 302 redirect to the RSS feed; confirm it still redirects.
  3. If any page returns 5xx, treat the PR as failing and fix it before asking for review.
- Optionally, run `npm run build && npm run start` locally and check the same pages before pushing.
