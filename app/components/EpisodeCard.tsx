import { Link } from "react-router-dom";
import { CirclePlay } from "lucide-react";
import { type Episode } from "@prisma/client";
import { PublishedDate } from "@/utils/PublishedDate";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { Duration } from "@/utils/Duration";

export const EpisodeCard = ({ episode }: { episode: Episode }) => (
  <Link to={`/episodes/${episode.id}`} className="block border-b-0 no-underline">
    <div className="group flex items-start gap-4 bg-white border-2 border-black rounded-(--card-radius) p-4 transition-all duration-200 hover:bg-episode-hover-bg hover:shadow-(--card-shadow) hover:mt-[-5px] hover:mb-[5px]">
      <div className="relative shrink-0">
        <img
          src={episode.imageUrl}
          alt={episode.title}
          className="size-[76px] rounded-[10px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <CirclePlay className="size-[30px] text-white drop-shadow-md" />
        </div>
      </div>
      <div className="flex flex-col justify-between min-w-0">
        <p className="text-[16px] font-bold text-black-primary tracking-[-0.45px] leading-normal mb-1">
          <span className="font-numeric text-[15px] font-bold">{episode.id}.</span>
          {" "}
          {episode.title}
        </p>
        <div className="flex items-center space-x-4">
          <p className="flex items-center gap-1 font-numeric text-[14px] text-black tracking-[-0.42px]">
          <IoCalendarOutline className="size-4" />
            {PublishedDate.parse(episode.publishedAt.toISOString())}
          </p>
          <p className="flex items-center gap-1 font-numeric text-[14px] text-black tracking-[-0.42px]">
            <FaRegClock className="size-4" />
            {Duration.parse(episode.duration)}
          </p>
        </div>
      </div>
    </div>
  </Link>
);
