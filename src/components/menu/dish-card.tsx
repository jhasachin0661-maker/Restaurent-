"use client";

import React from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { Dish } from "@/types/dish";
import { formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
}

export function DishCard({ dish, onSelect }: DishCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = React.useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(dish.id);
    setJustAdded(true);
    toast.success(`Added ${dish.name} to order`, {
      description: `${formatINR(dish.price)} • Cart updated`,
      action: {
        label: "Open Cart",
        onClick: () => useCartStore.getState().setOpen(true),
      },
    });
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(dish)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(dish);
        }
      }}
      className="group bg-[#191D17] border border-[#2B3125] hover:border-[#B99563]/60 rounded-xs overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-black/60 focus-visible:ring-2 focus-visible:ring-[#B99563]"
    >
      <div>
        {/* Top Visual Canvas */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#20251C]">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191D17] via-transparent to-transparent opacity-80" />

          {/* Tier or Category Tag */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {dish.tier && (
              <Badge variant="gold" className="text-[9px]">
                Tier {dish.tier}
              </Badge>
            )}
            {dish.dietaryTags?.includes("Chef's Signature") && (
              <Badge variant="red" className="text-[9px]">
                Signature
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {dish.regionalName && (
            <span className="text-[10px] uppercase tracking-widest text-[#B99563] font-serif block mb-1">
              {dish.regionalName}
            </span>
          )}
          <h3 className="text-lg font-serif font-semibold text-[#EDE7D9] group-hover:text-[#B99563] transition-colors mb-2">
            {dish.name}
          </h3>
          <p className="text-xs text-[#8E948A] leading-relaxed line-clamp-2 mb-3">
            {dish.description}
          </p>

          {/* Ingredients / Pieces note */}
          {dish.details && dish.details.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {dish.details.slice(0, 2).map((detail, idx) => (
                <span
                  key={idx}
                  className="text-[10px] bg-[#141712] border border-[#282F22] text-[#A3A89F] px-2 py-0.5 rounded-xs"
                >
                  {detail}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Price and Add Action */}
      <div className="px-5 py-4 border-t border-[#262C21] bg-[#161914] flex items-center justify-between">
        <div>
          <span className="text-lg font-serif font-bold text-[#EDE7D9]">
            {formatINR(dish.price)}
          </span>
          {dish.pieces && (
            <span className="text-[10px] text-[#7A8074] ml-1.5 uppercase tracking-wider">
              {dish.pieces}
            </span>
          )}
        </div>

        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${dish.name} to order`}
          className="px-3.5 py-1.5 rounded-xs bg-[#22271E] hover:bg-[#B99563] text-[#EDE7D9] hover:text-[#171916] border border-[#373F30] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span>Added</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
