import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "muted" | "primary";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        variant === "default" && "bg-secondary text-secondary-foreground ring-border",
        variant === "muted" && "bg-muted text-muted-foreground ring-border",
        variant === "primary" && "bg-primary/10 text-primary ring-primary/20",
        className
      )}
      {...props}
    />
  );
}
