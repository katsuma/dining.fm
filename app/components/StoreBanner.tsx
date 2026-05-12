import { href } from "react-router";
import { ShoppingCart, ExternalLink } from "lucide-react";

export const StoreBanner = () => (
  <a
    href={href("/store")}
    target="_blank"
    rel="noopener noreferrer"
    className="block border-b-0 no-underline"
  >
    <div className="group flex items-center gap-4 border-2 border-black rounded-(--card-radius) p-4 transition-all duration-200 hover:bg-episode-hover-bg hover:shadow-(--card-shadow) hover:mt-[-5px] hover:mb-[5px]">
      <ShoppingCart
        className="shrink-0 size-8 fill-yellow-green stroke-black"
        strokeWidth={2}
      />
      <div className="flex-1">
        <p className="font-bold text-[16px] text-black-primary tracking-[-0.45px]">
          dining.fm ストア
        </p>
        <p className="text-[14px] text-black-secondary tracking-[-0.42px]">
          オリジナルグッズ販売中！
        </p>
      </div>
      <div className="shrink-0 flex items-center justify-center size-9 rounded-full border-2 border-black group-hover:bg-orange transition-colors">
        <ExternalLink className="size-4 text-black group-hover:text-white transition-colors" />
      </div>
    </div>
  </a>
);
