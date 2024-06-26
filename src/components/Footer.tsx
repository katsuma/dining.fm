import styles from '@/components/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content_wrapper}>
        <div className={styles.footer_content}>
          <p className={styles.caption}>購読</p>
          <ul className={styles.list_links}>
            <li><a href="https://open.spotify.com/show/3wSB2J20uqON5nPhCmMia5">Spotify</a></li>
            <li><a href="https://podcasts.apple.com/us/podcast/dining-fm/id1668849655">Apple Podcasts</a></li>
            <li><a href="https://listen.style/p/diningfm">LISTEN</a></li>
            <li><a href="https://overcast.fm/itunes1668849655/dining-fm">Overcast</a></li>
            <li><a href="https://music.amazon.co.jp/podcasts/2a16e7f2-2c99-4d85-8ee7-0916a6c1f56d/dining-fm">Amazon Music</a></li>
          </ul>
        </div>

        <div className={styles.footer_content}>
          <p className={styles.caption}>SNS</p>
          <ul className={styles.list_links}>
            <li><a href="https://x.com/diningfm">X</a></li>
            <li><a href="https://threads.net/diningfm">Threads</a></li>
            <li><a href="https://instagram.com/diningfm">Instagram</a></li>
            <li><a href="https://youtube.com/@diningfm">YouTube</a></li>
          </ul>
        </div>
      </div>

      <p className={styles.copyright}>Copyright (c) dining.fm</p>
    </footer>
  );
}
