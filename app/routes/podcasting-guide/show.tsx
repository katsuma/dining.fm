import type { Route } from "./+types/show";
import Guide from "./components/Guide.mdx";
import { buildMeta, defaultHost, defaultTitle } from "@/utils/meta";

export function meta({}:Route.MetaArgs) {
  const title = `ポッドキャストの収録・編集環境 | ${defaultTitle}`;
  const description = "2024年1月時点でのdining.fmのマイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてのまとめです。";
  const url = `${defaultHost}/podcasting-guide`;
  const imageUrl = `${defaultHost}//podcasting-guide/opengraph-image.jpg`;

  const metas = buildMeta([
    { title: title },

    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },

    { property: "twitter:url", content: url },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
  ]);
  return metas;
}

function PodcastingGuide() {
  return (<Guide />);
}
export default PodcastingGuide;
