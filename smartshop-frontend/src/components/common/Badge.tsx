// components/common/Badge.tsx
import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
  {
    variants: {
      variant: {
        success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, variant, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)}>{children}</span>;
}