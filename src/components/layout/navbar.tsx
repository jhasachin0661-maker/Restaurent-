"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon } from "lucide-react";
import { useCartStore, getCartItemCount } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/our-story", label: "Our Story" },
  { href: "/reservation", label: "Reservation" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const setCartOpen = useCartStore((state) => state.setOpen);
  const cartCount = getCartItemCount(items);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#171916]/95 backdrop-blur-md border-b border-[#2D3328] py-3.5 shadow-lg shadow-black/30"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 text-left focus:outline-none"
            aria-label="RAJWADA home"
          >
            <div className="w-10 h-10 rounded-xs bg-[#242A20] border border-[#3C4436] group-hover:border-[#B99563] flex items-center justify-center transition-colors">
              <span className="font-serif text-lg font-bold text-[#B99563]">
                廻
              </span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#EDE7D9] group-hover:text-[#B99563] transition-colors block">
                RAJWADA
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8E948A] block">
                The Royal Taste of India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs uppercase tracking-[0.18em] transition-colors relative py-1",
                    isActive
                      ? "text-[#B99563] font-semibold"
                      : "text-[#EDE7D9]/80 hover:text-[#B99563]"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B99563] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Cart Badge & Reserve CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Trigger Button */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Open Cart with ${cartCount} items`}
              className="relative p-2.5 text-[#EDE7D9] hover:text-[#B99563] bg-[#22271E] hover:bg-[#2A3125] border border-[#353C2F] rounded-xs transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#8A4337] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#171916] animate-in zoom-in-50 duration-200">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Reserve Button */}
            <Link href="/reservation" className="hidden sm:inline-flex">
              <Button variant="gold" size="sm" className="px-4">
                Reserve a Table
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2.5 md:hidden text-[#EDE7D9] bg-[#22271E] hover:bg-[#2A3125] border border-[#353C2F] rounded-xs transition-colors"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}
