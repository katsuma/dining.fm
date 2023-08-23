import Parser from 'rss-parser';

export async function fetchFeed() {
  const parser = new Parser();
  const feed_url = 'https://anchor.fm/s/d89790f4/podcast/rss';
  return await parser.parseURL(feed_url);
}
