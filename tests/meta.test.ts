import { describe, expect, it } from "vitest";
import {
  buildMeta,
  defaultDescription,
  defaultHost,
  defaultTitle,
} from "@/utils/meta";

function findByProperty(tags: ReturnType<typeof buildMeta>, property: string) {
  return tags.find((tag) => tag.property === property);
}

describe("buildMeta", () => {
  it("overrides matching tags and keeps unspecified defaults", () => {
    const title = "Custom title";
    const tags = buildMeta([
      { title },
      { property: "og:title", content: title },
    ]);

    expect(tags.find((tag) => tag.title)?.title).toBe(title);
    expect(findByProperty(tags, "og:title")?.content).toBe(title);
    expect(findByProperty(tags, "og:type")?.content).toBe("website");
    expect(findByProperty(tags, "og:locale")?.content).toBe("ja_JP");
    expect(findByProperty(tags, "og:description")?.content).toBe(
      defaultDescription
    );
    expect(findByProperty(tags, "og:url")?.content).toBe(defaultHost);
    expect(findByProperty(tags, "og:image")?.content).toBe(
      `${defaultHost}/opengraph-image.png?v=202603`
    );
    expect(findByProperty(tags, "twitter:card")?.content).toBe(
      "summary_large_image"
    );
    expect(findByProperty(tags, "twitter:title")?.content).toBe(defaultTitle);
  });

  it("appends tags that do not exist in the defaults", () => {
    const tags = buildMeta([{ name: "robots", content: "noindex" }]);
    expect(tags.find((tag) => tag.name === "robots")?.content).toBe("noindex");
  });
});
