import { parseStringPromise } from 'xml2js';

import { Episode } from '@/components/types/Episode';
import { EpisodeFeed } from '@/components/types/EpisodeFeed';

const URL = 'https://anchor.fm/s/d89790f4/podcast/rss'

export class FeedLoader {
  static async loadAsEpisodes() {
    const response = await fetch(URL, { next: { revalidate: 3600 }});
    const xml = await response.text();

    type FeedType = { rss: { channel: { item: EpisodeFeed[] } }};
    const feed = await parseStringPromise(xml, { explicitArray: false }) as FeedType;
    const entries = feed.rss.channel.item as EpisodeFeed[];

    if (!entries) {
      throw new Error('Feed items not found');
    }
    return entries.map((entry) => {
      return {
        guid: entry['itunes:episode'],
        title: entry.title,
        description: entry.description,
        pubDate: entry.pubDate,
        image: entry['itunes:image'].$.href,
        url: entry.enclosure.$.url,
        duration: entry['itunes:duration'],
      } as Episode
    });
  }
}
