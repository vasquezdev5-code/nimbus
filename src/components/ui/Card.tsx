import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, glass = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border p-4",
        glass
          ? "glass-card"
          : "bg-card text-card-foreground border-border shadow-sm",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
