export class Duration {
  static parse(duration: string): string {
    let durations = duration.split(':');
    return `${durations[1]}:${durations[2]}`
  }
}
