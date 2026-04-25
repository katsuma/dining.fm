import { redirect } from "react-router";
import type { Route } from "./+types/feed";

export function loader(_args: Route.LoaderArgs) {
  return redirect("https://anchor.fm/s/d89790f4/podcast/rss");
}
