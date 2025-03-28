export class PublishedDate {
  static parse(date: string): string {
    return new Date(date).toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }

  static toLocalDate(date: Date): string {
    return date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }
}
