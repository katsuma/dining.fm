import { IoCalendarOutline } from 'react-icons/io5';
import { FaRegClock } from "react-icons/fa";
import { Duration } from "@/utils/Duration";
import { type Episode } from "@prisma/client";

export const EpisodeListItem = ({ episode }: { episode: Episode }) => (
  <div className="flex items-start py-3 episode-link">
    <img src={episode.imageUrl} alt={episode.title} className="w-[80px] h-[80px] rounded-[0.8rem] mr-4" />
    <div className="flex flex-col justify-between">
      <h3 className="episode-title">{episode.id}. {episode.title}</h3>
      <div className="flex space-x-4 episode-meta">
        <p className="text-gray-500 mb-1">
          <IoCalendarOutline className="inline-block mr-1" />
          {new Date(episode.publishedAt).toLocaleDateString()}
        </p>
        <p className="text-gray-500">
          <FaRegClock className="inline-block mr-1" />
          {Duration.parse(String(episode.duration))}
        </p>
      </div>
    </div>
  </div>
);
