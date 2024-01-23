export type EpisodeFeed = {
  title: string;
  link: string;
  pubDate: string;
  enclosure: {
    $: {
      url: string;
      length: string;
      type: string;
    }
  };
  description: string;
  guid: { _: string };
  isoDate: string;
  'itunes:image': { $: { href: string }};
  'itunes:duration': string;
  'itunes:episode': string;
  'itunes:season': string;
}
