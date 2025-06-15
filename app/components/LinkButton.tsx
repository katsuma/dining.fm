import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import React from "react";

type Props = {
  to: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function LinkButton({ to, children, className, external }: Props) {
  const baseClass = cn("text-lg py-6 px-8", className);
  if (external) {
    return (
      <Button asChild variant="outline" className={baseClass}>
        <a href={to} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Button>
    );
  }
  return (
    <Button asChild variant="outline" className={baseClass}>
      <Link to={to}>{children}</Link>
    </Button>
  );
}
