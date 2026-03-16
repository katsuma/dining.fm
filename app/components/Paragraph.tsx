export const Paragraph = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-base leading-6 tracking-[-0.24px] font-weight-100">
      {children}
    </p>
  );
};
