export type SpContent = {
  title: string;
  description: string;
  mp3Url: string;
  relatedEpisodeIds: number[];
};

export const SP_CONTENT: Record<string, SpContent> = {
  pcwe2026: {
    title: "Podcast Weekend 2026 スペシャルエピソード",
    description:
      "※このエピソードはPodcast Weekend 2026 来場者の方向けのスペシャルエピソードです。\n通常回では語られないkatsuma, daikokuのプロフィールや、番組紹介を含む過去のエピソードの中からおすすめエピソードを紹介します。",
    mp3Url: "/sp/pcwe2026.mp3",
    relatedEpisodeIds: [111, 163, 174, 141, 145, 120, 28, 173],
  },
};

// Used by react-router.config.ts to prerender every special page.
export const SP_CONTENT_IDS = Object.keys(SP_CONTENT);
