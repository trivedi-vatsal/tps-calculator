import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * A simple Container component that sets a max width and horizontal padding.
 * Customize Tailwind classes as needed.
 */
export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto max-w-7xl px-4", className)} {...props}>
      {children}
    </div>
  );
}