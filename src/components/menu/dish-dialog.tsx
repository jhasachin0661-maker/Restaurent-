"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, Plus, Sparkles, Check } from "lucide-react";
import { Dish } from "@/types/dish";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface DishDialogProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function DishDialog({
  dish,
  isOpen,
  onClose,
  triggerRef,
}: DishDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = React.useState(false);

  // Focus trap & Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Set initial focus
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const triggerElem = triggerRef?.current;

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (triggerElem) {
        triggerElem.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen || !dish) return null;

  const handleAddToCart = () => {
    addItem(dish.id);
    setAdded(true);
    toast.success(`Added ${dish.name} to order`, {
      description: `${formatINR(dish.price)} • Cart updated`,
      action: {
        label: "Open Cart",
        onClick: () => useCartStore.getState().setOpen(true),
      },
    });
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-dialog-title"
      aria-describedby="dish-dialog-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl bg-[#1D211B] border border-[#3A4136] rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 p-2 text-[#A3A89F] hover:text-[#EDE7D9] bg-[#171916]/80 hover:bg-[#292D27] rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-[#B99563]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Visual Showcase (Square / top-down or editorial) */}
        <div className="relative w-full md:w-1/2 min-h-[260px] md:min-h-full bg-gradient-to-b from-[#242921] to-[#171916] flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-[#333830]">
          <div className="relative w-56 h-56 transition-transform duration-500 hover:scale-105">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 768px) 240px, 300px"
              className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)]"
              priority
            />
          </div>
          {dish.tier && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="gold">
                {dish.tier && (dish.tier >= 3 ? "Chef's selection" : dish.tier === 2 ? "Guest favourite" : "House classic")}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {dish.regionalName && (
              <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-1">
                {dish.regionalName}
              </span>
            )}
            <h2
              id="dish-dialog-title"
              className="text-2xl font-serif text-[#EDE7D9] tracking-wide mb-2"
            >
              {dish.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-serif font-semibold text-[#B99563]">
                {formatINR(dish.price)}
              </span>
              {dish.pieces && (
                <span className="text-xs text-[#A3A89F] uppercase tracking-wider">
                  / {dish.pieces}
                </span>
              )}
            </div>

            <p
              id="dish-dialog-description"
              className="text-sm text-[#A3A89F] leading-relaxed mb-6"
            >
              {dish.description}
            </p>

            {/* Details & Dietary Chips */}
            {dish.details && dish.details.length > 0 && (
              <div className="mb-6">
                <span className="text-[11px] uppercase tracking-widest text-[#7E8579] block mb-2">
                  Composition & Notes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {dish.details.map((detail, idx) => (
                    <Badge key={idx} variant="default" className="text-[10px]">
                      {detail}
                    </Badge>
                  ))}
                  {dish.dietaryTags?.map((tag, idx) => (
                    <Badge key={`tag-${idx}`} variant="tier" className="text-[10px] text-[#B99563]">
                      <Sparkles className="w-2.5 h-2.5 mr-1 inline" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#333830] flex items-center gap-3">
            <Button
              onClick={handleAddToCart}
              variant="gold"
              className="flex-1 gap-2"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#171916]" />
                  Added to Order
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add to Order • {formatINR(dish.price)}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
