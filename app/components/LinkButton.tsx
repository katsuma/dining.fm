import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

const baseStyles =
  "inline-block text-[15px] font-bold tracking-[-0.45px] text-black-primary bg-white border-2 border-black rounded-[var(--button-radius)] px-8 py-3 transition-all duration-200 hover:bg-orange hover:text-white hover:shadow-[var(--card-shadow)] hover:mt-[-5px] hover:mb-[5px] cursor-pointer";

export function LinkButton({ to, children, className, external }: Props) {
  const classes = cn(baseStyles, className);
  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={classes}>
      {children}
    </Link>
  );
}
