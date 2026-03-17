export const proseStyles =
  "text-base leading-7 text-black font-normal [&_a]:text-orange [&_a:hover]:underline";

export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return <p className={proseStyles}>{children}</p>;
};
