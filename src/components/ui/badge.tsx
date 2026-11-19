import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gold" | "tier" | "outline" | "red";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium tracking-widest uppercase rounded-xs transition-colors",
        variant === "default" && "bg-[#292D27] text-[#EDE7D9] border border-[#383E34]",
        variant === "gold" && "bg-[#B99563]/15 text-[#D4AF77] border border-[#B99563]/40",
        variant === "red" && "bg-[#8A4337]/20 text-[#E5938D] border border-[#8A4337]/40",
        variant === "outline" && "border border-[#4B5246] text-[#A3A89F]",
        variant === "tier" && "bg-[#1C201A] text-[#EDE7D9] border border-[#B99563]/30",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
