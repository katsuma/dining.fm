import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  route("sitemap.xml", "routes/sitemap.tsx"),
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("episodes/page/:page", "routes/episodes/page.tsx"),
    route("episodes/:id", "routes/episodes/show.tsx"),
    route("podcasting-guide", "routes/podcasting-guide/show.tsx"),
  ]),
] satisfies RouteConfig;
