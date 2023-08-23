import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content_wrapper}>
        <div className={styles.footer_content}>
          <p className={styles.caption}>購読</p>
          <ul className={styles.list_links}>
            <li><a href="https://podcasts.apple.com/us/podcast/dining-fm/id1668849655">Apple Podcasts</a></li>
            <li><a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5">Spotify</a></li>
            <li><a href="https://music.amazon.co.jp/podcasts/2a16e7f2-2c99-4d85-8ee7-0916a6c1f56d/dining-fm">Amazon Music</a></li>
            <li><a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9kODk3OTBmNC9wb2RjYXN0L3Jzcw">Google Podcasts</a></li>
            <li><a href="https://overcast.fm/itunes1668849655/dining-fm">Overcast</a></li>
          </ul>
        </div>

        <div className={styles.footer_content}>
          <p className={styles.caption}>お便り</p>
          <ul className={styles.list_links}>
            <li><a href="https://x.com/diningfm">X(@diningfm)</a></li>
            <li><a href="https://forms.gle/HPnTPjFGgTwzFjGn9">Google Form</a></li>
          </ul>
        </div>
      </div>

      <p>Copyright (c) dining.fm</p>
    </footer>
  );
}
