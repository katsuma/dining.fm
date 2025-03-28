import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layout.tsx", [
    index("routes/home.tsx"),
    route("episodes/page/:page", "routes/episodes/page.tsx"),
  ]),
] satisfies RouteConfig;
