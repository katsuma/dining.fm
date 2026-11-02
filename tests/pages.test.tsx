import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import Home from "@/routes/home";
import EpisodesPage from "@/routes/episodes/page";
import EpisodeDetail from "@/routes/episodes/show";
import PodcastingGuide from "@/routes/podcasting-guide/show";
import SpShow from "@/routes/sp/show";

const episode = {
  id: 42,
  title: "テスト回",
  publishedAt: new Date("2026-03-01T00:00:00.000Z"),
  duration: "00:12:34",
  imageUrl: "https://example.com/episode.png",
  description: "美味しい話。",
  enclosureUrl: "https://example.com/episode.mp3",
};

function renderRoute({
  path,
  url,
  Component,
  loader,
}: {
  path: string;
  url: string;
  Component:
    | typeof Home
    | typeof EpisodesPage
    | typeof EpisodeDetail
    | typeof PodcastingGuide
    | typeof SpShow;
  loader: () => unknown;
}) {
  const Stub = createRoutesStub([
    {
      path,
      // These route modules take no Route.ComponentProps, so stub types align.
      Component,
      loader,
    },
  ]);

  return render(<Stub initialEntries={[url]} />);
}

describe("main page rendering", () => {
  it("shows the latest episodes heading and episode title on the home page", async () => {
    renderRoute({
      path: "/",
      url: "/",
      Component: Home,
      loader: () => ({ episodes: [episode] }),
    });

    expect(
      await screen.findByRole("heading", { name: "最新エピソード" })
    ).toBeTruthy();
    expect(screen.getByText("テスト回")).toBeTruthy();
  });

  it("shows the current listing page heading", async () => {
    renderRoute({
      path: "/episodes/page/:page",
      url: "/episodes/page/1",
      Component: EpisodesPage,
      loader: () => ({
        currentPage: 1,
        episodeCount: 20,
        episodes: [episode],
      }),
    });

    expect(
      await screen.findByRole("heading", { name: "最新エピソード (1/1)" })
    ).toBeTruthy();
  });

  it("shows the episode number and title on the detail page", async () => {
    renderRoute({
      path: "/episodes/:id",
      url: "/episodes/42",
      Component: EpisodeDetail,
      loader: () => ({
        episode: {
          ...episode,
          spotifyId: null,
          applePodcastId: null,
          youtubeId: null,
        },
        sanitizedDescription: "<p>美味しい話。</p>",
        relatedEpisodes: [],
      }),
    });

    expect(
      await screen.findByRole("heading", { name: "42. テスト回" })
    ).toBeTruthy();
  });

  it("shows the share button on the recording guide", async () => {
    renderRoute({
      path: "/podcasting-guide",
      url: "/podcasting-guide",
      Component: PodcastingGuide,
      loader: () => null,
    });

    expect(
      await screen.findByRole("button", { name: "この記事をシェアする" })
    ).toBeTruthy();
  });

  it("shows the special episode title", async () => {
    renderRoute({
      path: "/sp/:id",
      url: "/sp/pcwe2026",
      Component: SpShow,
      loader: () => ({
        id: "pcwe2026",
        content: {
          title: "Podcast Weekend 2026 スペシャルエピソード",
          description: "来場者向けのスペシャルエピソードです。",
          mp3Url: "/sp/pcwe2026.mp3",
        },
        relatedEpisodes: [],
      }),
    });

    expect(
      await screen.findByRole("heading", {
        name: "Podcast Weekend 2026 スペシャルエピソード",
      })
    ).toBeTruthy();
  });
});
