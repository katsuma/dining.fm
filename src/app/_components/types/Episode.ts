export class Episode {
  guid: string;
  title: string;
  content: string;
  contentSnippet: string;
  pubDate: string;
  image: string;
  url: string;
  duration: string;

  constructor(
    guid: string,
    title: string,
    content: string,
    contentSnippet: string,
    pubDate: string,
    image: string,
    url: string,
    duration: string,
  ) {
    this.guid = guid;
    this.title = title;
    this.content = content;
    this.contentSnippet = contentSnippet;
    this.pubDate = pubDate;
    this.image = image;
    this.url = url;
    this.duration = duration;
  }
}
