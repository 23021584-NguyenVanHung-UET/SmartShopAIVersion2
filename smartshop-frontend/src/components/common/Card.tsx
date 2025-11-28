// components/common/Card.tsx
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn(
      "rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl",
      hover && "hover:shadow-2xl hover:-translate-y-2 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}