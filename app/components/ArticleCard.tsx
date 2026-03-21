import { Link } from "react-router-dom";

type ArticleCardProps = {
  thumbnailUrl: string;
  title: string;
  linkUrl: string;
  description: string;
};

export const ArticleCard = ({
  thumbnailUrl,
  title,
  linkUrl,
  description,
}: ArticleCardProps) => {
  return (
    <Link to={linkUrl} className="block border-b-0 no-underline">
      <div className="group flex items-start gap-4 bg-white border-2 border-black rounded-(--card-radius) p-4 transition-all duration-200 hover:bg-episode-hover-bg hover:shadow-(--card-shadow) hover:mt-[-5px] hover:mb-[5px]">
        <div className="relative shrink-0">
          <img
            src={thumbnailUrl}
            alt={title}
            className="size-[76px] rounded-[10px] object-cover border-2 border-black"
          />
        </div>
        <div>
          <p className="text-[16px] font-bold text-black-primary tracking-[-0.45px] leading-normal mb-1">
            {title}
          </p>
          <p className="text-[14px] text-black-secondary tracking-[-0.42px] leading-normal mb-1">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};
