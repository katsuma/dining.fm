export class Episode {
  guid: string;
  title: string;
  description: string;
  pubDate: string;
  image: string;
  url: string;
  duration: string;

  constructor(
    guid: string,
    title: string,
    description: string,
    pubDate: string,
    image: string,
    url: string,
    duration: string,
  ) {
    this.guid = guid;
    this.title = title;
    this.description = description;
    this.pubDate = pubDate;
    this.image = image;
    this.url = url;
    this.duration = duration;
  }
}
