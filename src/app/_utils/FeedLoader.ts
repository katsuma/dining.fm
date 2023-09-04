import Parser from 'rss-parser';
import { Episode } from '../_components/types/Episode';
import { EpisodeFeed } from '../_components/types/EpisodeFeed';

export class FeedLoader {
  private static url = 'https://anchor.fm/s/d89790f4/podcast/rss'

  static async loadAsEpisodes() {
    const parser = new Parser();
    const feedUrl = `${FeedLoader.url}?dt=${FeedLoader.getDateTimeQueryString()}`
    console.log(`[FeedURL] ${feedUrl}`);
    const feed = await parser.parseURL(feedUrl);
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

  private static getDateTimeQueryString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();

    return `${year}${month}${hour}`;
  }
}
