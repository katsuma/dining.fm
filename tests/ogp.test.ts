import { describe, expect, it } from "vitest";
import { meta as homeMeta } from "@/routes/home";
import { meta as episodesPageMeta } from "@/routes/episodes/page";
import { meta as episodeShowMeta } from "@/routes/episodes/show";
import { meta as podcastingGuideMeta } from "@/routes/podcasting-guide/show";
import { meta as spShowMeta } from "@/routes/sp/show";
import { defaultDescription, defaultHost, defaultTitle } from "@/utils/meta";

type MetaTag = {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
};

function callMeta<T extends (args: never) => MetaTag[]>(
  metaFn: T,
  loaderData?: unknown
) {
  return metaFn({ loaderData } as never);
}

function contentByProperty(tags: MetaTag[], property: string) {
  return tags.find((tag) => tag.property === property)?.content;
}

function expectCommonOg(
  tags: MetaTag[],
  expected: {
    title: string;
    description: string;
    url: string;
    image: string;
  }
) {
  expect(contentByProperty(tags, "og:title")).toBe(expected.title);
  expect(contentByProperty(tags, "og:description")).toBe(expected.description);
  expect(contentByProperty(tags, "og:url")).toBe(expected.url);
  expect(contentByProperty(tags, "og:image")).toBe(expected.image);
  expect(contentByProperty(tags, "og:type")).toBe("website");
  expect(contentByProperty(tags, "twitter:card")).toBe("summary_large_image");
}

const defaultImage = `${defaultHost}/opengraph-image.png?v=202603`;

describe("route Open Graph metadata", () => {
  it("uses site defaults on the home page", () => {
    const tags = callMeta(homeMeta);

    expectCommonOg(tags, {
      title: defaultTitle,
      description: defaultDescription,
      url: defaultHost,
      image: defaultImage,
    });
  });

  it("uses the current listing page in the title and URL", () => {
    const tags = callMeta(episodesPageMeta, {
      currentPage: 1,
      episodeCount: 20,
      episodes: [],
    });
    const title = `最新エピソード (1/1) | ${defaultTitle}`;

    expectCommonOg(tags, {
      title,
      description: defaultDescription,
      url: `${defaultHost}/episodes/page/1`,
      image: defaultImage,
    });
  });

  it("falls back to site defaults when episode listing data is missing", () => {
    const tags = callMeta(episodesPageMeta);

    expectCommonOg(tags, {
      title: defaultTitle,
      description: defaultDescription,
      url: defaultHost,
      image: defaultImage,
    });
  });

  it("uses the episode title, stripped description, and artwork", () => {
    const tags = callMeta(episodeShowMeta, {
      episode: {
        id: 42,
        title: "テスト回",
        description:
          "<p>美味しい話。</p><p>■ チャプター</p><ul><li>00:00 導入</li></ul>",
        imageUrl: "https://example.com/episode.png",
      },
    });
    const title = `42. テスト回 | ${defaultTitle}`;

    expectCommonOg(tags, {
      title,
      description: "美味しい話。",
      url: `${defaultHost}/episodes/42`,
      image: "https://example.com/episode.png",
    });
  });

  it("uses the default image when an episode has no artwork", () => {
    const tags = callMeta(episodeShowMeta, {
      episode: {
        id: 42,
        title: "テスト回",
        description: "<p>美味しい話。</p>",
        imageUrl: "",
      },
    });

    expect(contentByProperty(tags, "og:image")).toBe(
      `${defaultHost}/opengraph-image.png`
    );
  });

  it("falls back to site defaults when episode data is missing", () => {
    const tags = callMeta(episodeShowMeta);

    expectCommonOg(tags, {
      title: defaultTitle,
      description: defaultDescription,
      url: defaultHost,
      image: defaultImage,
    });
  });

  it("uses the recording guide title, description, and image", () => {
    const tags = callMeta(podcastingGuideMeta);
    const title = `ポッドキャストの収録・編集環境 | ${defaultTitle}`;

    expectCommonOg(tags, {
      title,
      description:
        "2024年1月時点でのdining.fmのマイクやオーディオインターフェースなどの収録環境や、DAWやプラグインなど編集環境についてのまとめです。",
      url: `${defaultHost}/podcasting-guide`,
      image: `${defaultHost}/podcasting-guide/opengraph-image.jpg`,
    });
  });

  it("marks the special episode as noindex and uses the default image", () => {
    const tags = callMeta(spShowMeta, {
      id: "pcwe2026",
      content: {
        title: "Podcast Weekend 2026 スペシャルエピソード",
        description: "来場者向けのスペシャルエピソードです。",
      },
    });
    const title = `Podcast Weekend 2026 スペシャルエピソード | ${defaultTitle}`;

    expectCommonOg(tags, {
      title,
      description: "来場者向けのスペシャルエピソードです。",
      url: `${defaultHost}/sp/pcwe2026`,
      image: `${defaultHost}/opengraph-image.png`,
    });
    expect(tags.find((tag) => tag.name === "robots")?.content).toBe("noindex");
  });

  it("falls back to site defaults when special episode data is missing", () => {
    const tags = callMeta(spShowMeta);

    expectCommonOg(tags, {
      title: defaultTitle,
      description: defaultDescription,
      url: defaultHost,
      image: defaultImage,
    });
  });
});
