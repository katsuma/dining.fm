import Image from "next/image";
import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegClock } from "react-icons/fa";

import styles from '@/components/EpisodeEntry.module.css';
import { Episode } from "@/components/types/Episode";
import { PublishedDate } from "@/utils/PublishedDate";
import { Duration } from "@/utils/Duration";

export default function EpisodeEntry(props: Episode) {
  return (
    <div className={styles.episode}>
      <div className={styles.episode_image}>
        <Image src={props.imageUrl} alt={props.title} width={80} height={80} priority={false} />
      </div>

      <div className={styles.episode_content}>
        <h3 className={styles.episode_title}>{props.id}. {props.title}</h3>
        <div className={styles.episode_meta}>
          <p>
            <span className={styles.meta_icon}><IoCalendarOutline /></span>
            <span>{PublishedDate.parse(props.pubDate)}
            </span>
          </p>
          <p>
            <span className={styles.meta_icon}><FaRegClock /></span>
            <span>{Duration.parse(props.duration)}</span>
          </p>
        </div>
      </div>
    </div>
  );

}
