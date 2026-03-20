type Props = {
  text: string;
};

export const LabelBadge = ({ text }: Props) => (
  <div className="absolute -top-3 left-2 z-10">
    <div className="inline-block -rotate-5">
      <span className="inline-block bg-yellow-green border-2 border-black rounded-[12px] px-3 py-0.5 text-[12px] font-black text-black tracking-[-0.36px]">
        {text}
      </span>
    </div>
  </div>
);
