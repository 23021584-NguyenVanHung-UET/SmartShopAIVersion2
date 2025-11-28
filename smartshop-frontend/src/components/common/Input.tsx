// components/common/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800",
          "focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all",
          icon && "pl-12",
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";
export default Input;