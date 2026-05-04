import { redirect } from "react-router";
import type { Route } from "./+types/youtube";

export function loader(_args: Route.LoaderArgs) {
  return redirect("https://youtube.com/@diningfm");
}
