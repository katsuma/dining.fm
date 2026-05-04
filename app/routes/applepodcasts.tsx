import { redirect } from "react-router";
import type { Route } from "./+types/applepodcasts";

export function loader(_args: Route.LoaderArgs) {
  return redirect(
    "https://podcasts.apple.com/jp/podcast/dining-fm/id1668849655"
  );
}
