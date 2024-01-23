export class Episode {
  constructor(
    public readonly guid: string,
    public readonly title: string,
    public readonly description: string,
    public readonly pubDate: string,
    public readonly image: string,
    public readonly url: string,
    public readonly duration: string,
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
