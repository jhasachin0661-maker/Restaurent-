import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "dark";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
          // Variants
          variant === "primary" &&
            "bg-[#77352d] text-[#f3ebdd] hover:bg-[#965148] shadow-sm hover:shadow-md",
          variant === "secondary" &&
            "bg-[#302d27] text-[#f3ebdd] hover:bg-[#3b3730] border border-[#5a5146]",
          variant === "outline" &&
            "border border-[#c49a55]/60 text-[#f3ebdd] hover:border-[#c49a55] hover:bg-[#c49a55]/10",
          variant === "ghost" &&
            "text-[#f3ebdd] hover:bg-[#302d27] hover:text-[#c49a55]",
          variant === "gold" &&
            "bg-[#c49a55] text-[#25231f] font-semibold tracking-wide hover:bg-[#d7b878] shadow-md",
          variant === "dark" &&
            "bg-[#302d27] text-[#f3ebdd] hover:bg-[#3b3730] border border-[#5a5146]",
          // Sizes
          size === "sm" && "text-xs px-3 py-1.5 rounded-sm tracking-wider uppercase min-h-[36px]",
          size === "md" && "text-sm px-5 py-2.5 rounded-sm tracking-wider uppercase min-h-[44px]",
          size === "lg" && "text-base px-7 py-3.5 rounded-sm tracking-wider uppercase min-h-[48px]",
          size === "icon" && "h-11 w-11 rounded-sm p-0 min-h-[44px] min-w-[44px]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
