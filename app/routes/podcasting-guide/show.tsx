import type { Route } from "./+types/show";
import { Share } from "lucide-react";
import Guide from "./components/Guide.mdx";
import { buildMeta, defaultHost, defaultTitle } from "@/utils/meta";
import styles from "./components/Guide.module.css";

const pageTitle = "ポッドキャストの収録・編集環境";
const pageUrl = `${defaultHost}/podcasting-guide`;

export function meta({}:Route.MetaArgs) {
  const title = `${pageTitle} | ${defaultTitle}`;
  const description = "2024年1月時点でのdining.fmのマイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてのまとめです。";
  const imageUrl = `${defaultHost}/podcasting-guide/opengraph-image.jpg`;

  const metas = buildMeta([
    { title: title },

    { property: "og:url", content: pageUrl },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },

    { property: "twitter:url", content: pageUrl },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
  ]);
  return metas;
}

function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: pageTitle,
        url: pageUrl,
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-[15px] font-bold tracking-[-0.45px] text-black-primary bg-white border-2 border-black rounded-(--button-radius) px-8 py-3 transition-all duration-200 hover:bg-orange hover:text-white hover:shadow-(--card-shadow) hover:mt-[-5px] hover:mb-[5px] cursor-pointer"
    >
      この記事をシェアする
      <Share className="size-4" />
    </button>
  );
}

function PodcastingGuide() {
  return (
    <div className={styles['podcasting-guide']}>
      <Guide />
      <div className="flex justify-center my-12">
        <ShareButton />
      </div>
    </div>
  );
}
export default PodcastingGuide;
