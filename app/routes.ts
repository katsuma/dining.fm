import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("sitemap.xml", "routes/sitemap.tsx"),
  route("letter", "routes/letter.tsx"),
  route("store", "routes/store.tsx"),
  route("spotify", "routes/spotify.tsx"),
  route("youtube", "routes/youtube.tsx"),
  route("applepodcasts", "routes/applepodcasts.tsx"),
  route("feed", "routes/feed.tsx"),
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("episodes/page/:page", "routes/episodes/page.tsx"),
    route("episodes/:id", "routes/episodes/show.tsx"),
    route("podcasting-guide", "routes/podcasting-guide/show.tsx"),
    route("sp/:id", "routes/sp/show.tsx"),
  ]),
] satisfies RouteConfig;
