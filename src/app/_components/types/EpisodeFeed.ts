export type EpisodeFeed = {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    url: string;
    length: string;
    type: string;
  };
  content: string;
  contentSnipet: string;
  guid: string;
  isoDate: string;
  itunes: {
    image: string;
    duration: string;
    episode: string;
    season: string;
  };
}
