import { redirect } from "react-router";
import type { Route } from "./+types/spotify";

export function loader(_args: Route.LoaderArgs) {
  return redirect("https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5");
}
