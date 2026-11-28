# dining.fm

https://dining.fm/

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

The build reads the database (`POSTGRES_PRISMA_URL`) and prerenders every
page that uses it (home, episode list, episode detail, sp pages,
`sitemap.xml`) to static files. At runtime these pages never query the
database; paths that were not prerendered (unknown episode ids, etc.) get a
404 without touching it.

## Publishing a new episode

Because pages are generated at build time, database changes reach the site
only after a new deployment. After importing an episode and running the
transcribe / summarize / embedding scripts, trigger a deployment:

```bash
./scripts/redeploy
```

It calls the Vercel Deploy Hook in `VERCEL_DEPLOY_HOOK_URL` (`.env`).

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
