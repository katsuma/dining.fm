import { redirect } from "react-router";
import type { Route } from "./+types/store";

export function loader(_args: Route.LoaderArgs) {
  return redirect("https://diningfm.square.site/");
}
