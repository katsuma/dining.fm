type Props = {
  title: string;
  dotClassName?: string;
};

export const Heading = ({ title, dotClassName = "bg-green" }: Props) => (
  <div className="flex items-center gap-2 mb-4">
    <span
      className={`inline-block size-[10px] rounded-full shrink-0 border-2 border-black ${dotClassName}`}
    />
    <h2 className="text-[18px] font-bold tracking-[-0.54px] text-black">
      {title}
    </h2>
  </div>
);
