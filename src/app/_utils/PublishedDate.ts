export class PublishedDate {
  static parse(date: string): string {
    return new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }
}
