interface MetaTag {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}

export const defaultTitle = "dining.fm";
export const defaultDescription =
  "dining.fmは、ギャルソン好きの夫katsumaと、お菓子好きの妻daikokuの東京2人暮らし夫婦が、ゆるゆると話す雑談Podcast。TVや映画などのコンテンツの感想を中心に、ファッション、スイーツ、ホテルなどを中心に、我が家のダイニングテーブルから家庭内で話題のトピックをお届けします🏠";
export const defaultHost =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://dining.fm";

const defaultMeta: MetaTag[] = [
  { title: defaultTitle },
  { name: "description", content: defaultDescription },

  { property: "og:title", content: defaultTitle },
  { property: "og:type", content: "website" },
  { property: "og:url", content: defaultHost },
  { property: "og:image", content: `${defaultHost}/opengraph-image.png` },
  { property: "og:site_name", content: defaultTitle },
  { property: "og:locale", content: "ja_JP" },
  { property: "og:description", content: defaultDescription },

  { property: "twitter:card", content: "summary_large_image" },
  { property: "twitter:title", content: defaultTitle },
  { property: "twitter:description", content: defaultDescription },
  { property: "twitter:image", content: `${defaultHost}/opengraph-image.png` },
  { property: "twitter:url", content: defaultHost },
];

export function buildMeta(pageMeta: MetaTag[]): MetaTag[] {
  const mergedMeta: MetaTag[] = [];

  [...defaultMeta, ...pageMeta].forEach((meta) => {
    const index = mergedMeta.findIndex(
      (existingMeta) =>
        (meta.title && existingMeta.title) ||
        (meta.name && existingMeta.name === meta.name) ||
        (meta.property && existingMeta.property === meta.property)
    );

    if (index !== -1) {
      mergedMeta[index] = { ...mergedMeta[index], ...meta };
    } else {
      mergedMeta.push(meta);
    }
  });

  return mergedMeta;
}
