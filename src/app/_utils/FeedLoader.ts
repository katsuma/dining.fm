import { parseStringPromise } from 'xml2js';
import { Episode } from '../_components/types/Episode';
import { EpisodeFeed } from '../_components/types/EpisodeFeed';

export class FeedLoader {
  private static url = 'https://anchor.fm/s/d89790f4/podcast/rss'

  static async loadAsEpisodes() {
    const response = await fetch(FeedLoader.url, { next: { revalidate: 3600 }});
    const xml = await response.text();

    type FeedType = { rss: { channel: { item: EpisodeFeed[] } }};
    const feed = await parseStringPromise(xml, { explicitArray: false }) as unknown as FeedType;
    const entries = feed.rss.channel.item as EpisodeFeed[];

    if (!entries) {
      throw new Error('Feed items not found');
    }
    return entries.map((entry) => {
      return new Episode(
        entry.guid._,
        entry.title,
        entry.description,
        entry.pubDate,
        entry['itunes:image'].$.href,
        entry.enclosure.$.url,
        entry['itunes:duration'],
      );
    });
  }
}
