import { redirect } from "react-router";
import type { Route } from "./+types/letter";

export function loader(_args: Route.LoaderArgs) {
  return redirect("https://forms.gle/HPnTPjFGgTwzFjGn9");
}
