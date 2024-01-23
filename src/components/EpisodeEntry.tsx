import Image from "next/image";
import styles from './EpisodeEntry.module.css';
import { Episode } from "./types/Episode";
import { PublishedDate } from "../app/_utils/PublishedDate";

export default function EpisodeEntry(props: Episode) {
  return (
    <div className={styles.episode}>
      <div className={styles.episode_image}>
        <Image src={props.image} alt={props.title} width={80} height={80} priority={false} />
      </div>

      <div className={styles.episode_content}>
        <h3 className={styles.episode_title}>{props.title}</h3>
        <p className={styles.episode_publishedon}>{PublishedDate.parse(props.pubDate)}</p>
      </div>
    </div>
  );

}
