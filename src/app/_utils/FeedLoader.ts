import Parser from 'rss-parser';
import { Episode } from '../_components/types/Episode';
import { EpisodeFeed } from '../_components/types/EpisodeFeed';

export class FeedLoader {
  static url = 'https://anchor.fm/s/d89790f4/podcast/rss';

  static async loadAsEpisodes() {
    const parser = new Parser();
    const feed = await parser.parseURL(FeedLoader.url);
    const entries = feed.items as unknown as EpisodeFeed[];

    if (!entries) {
      throw new Error('Feed items not found');
    }

    return entries.map((entry) => {
      return new Episode(
        entry.guid,
        entry.title,
        entry.content,
        entry.contentSnippet,
        entry.pubDate,
        entry.itunes.image,
        entry.enclosure.url,
        entry.itunes.duration,
      );
    });
  }
}
