"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
  currentPath: string;
}

export function MobileNav({
  isOpen,
  onClose,
  links,
  currentPath,
}: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-label="Mobile Navigation"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[#171916]/98 backdrop-blur-xl animate-in fade-in duration-200 md:hidden"
    >
      {/* Top Header */}
      <div className="p-6 border-b border-[#2C3227] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xs bg-[#242A20] border border-[#3C4436] flex items-center justify-center">
            <span className="font-serif text-lg font-bold text-[#B99563]">
              廻
            </span>
          </div>
          <span className="font-serif text-xl font-bold tracking-[0.2em] text-[#EDE7D9]">
            RAJWADA
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close menu"
          className="p-2 text-[#A3A89F] hover:text-[#EDE7D9] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`flex items-center justify-between py-2 text-xl font-serif tracking-wider border-b border-[#252B20] transition-colors ${
                isActive ? "text-[#B99563] font-semibold" : "text-[#EDE7D9]/90"
              }`}
            >
              <span>{link.label}</span>
              <ArrowRight className="w-4 h-4 text-[#B99563] opacity-60" />
            </Link>
          );
        })}

        <div className="pt-6">
          <Link href="/reservation" onClick={onClose} className="block w-full">
            <Button variant="gold" className="w-full py-4 text-sm font-semibold">
              Reserve a Table
            </Button>
          </Link>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-[#2C3227] bg-[#141712] text-center text-xs text-[#8E948A]">
        <p className="font-serif text-[#EDE7D9] mb-1">
          RAJWADA · The Royal Taste of India
        </p>
        <p>Reservations & Private Dining • Mumbai, India</p>
      </div>
    </div>
  );
}
