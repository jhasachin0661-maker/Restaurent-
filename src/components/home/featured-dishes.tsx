"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import { DISHES } from "@/data/dishes";
import { Dish } from "@/types/dish";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DishDialog } from "@/components/menu/dish-dialog";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { motion, useReducedMotion } from "framer-motion";

export function FeaturedDishes() {
  const featured = DISHES.filter((d) => d.featured).slice(0, 4);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const addItem = useCartStore((state) => state.addItem);
  const reduceMotion = useReducedMotion();

  const handleQuickAdd = (e: React.MouseEvent, dish: Dish) => {
    e.stopPropagation();
    addItem(dish.id);
    toast.success(`Added ${dish.name} to order`, {
      description: `${formatINR(dish.price)} • Featured Dish`,
      action: {
        label: "View Cart",
        onClick: () => useCartStore.getState().setOpen(true),
      },
    });
  };

  return (
    <section className="py-20 bg-[#141712] border-t border-b border-[#252A20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-2">
              Rajwada&apos;s Signatures
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#EDE7D9] tracking-wide">
              Featured Signatures
            </h2>
          </div>
          <Link href="/menu" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B99563] hover:text-[#D4AF77] transition-colors">
            <span>Explore All 12 Offerings</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((dish) => (
            <motion.div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedDish(dish);
                }
              }}
              className="group bg-[#1A1E17] border border-[#2E3529] hover:border-[#B99563]/60 rounded-xs overflow-hidden transition-all duration-300 flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-black/60"
              style={{ perspective: 1200, transformStyle: "preserve-3d" }}
              whileHover={reduceMotion ? undefined : { y: -12, rotateX: 5, rotateY: -5, scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.7 }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#20251C]">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E17] via-transparent to-transparent opacity-80" />

                {dish.tier && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold" className="text-[9px]">
                      Tier {dish.tier}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {dish.regionalName && (
                    <span className="text-[10px] uppercase tracking-widest text-[#B99563] font-serif block mb-1">
                      {dish.regionalName}
                    </span>
                  )}
                  <h3 className="text-base font-serif font-semibold text-[#EDE7D9] group-hover:text-[#B99563] transition-colors mb-2 line-clamp-1">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-[#8E948A] leading-relaxed line-clamp-2 mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Footer price & quick add */}
                <div className="pt-3 border-t border-[#292F23] flex items-center justify-between">
                  <div>
                    <span className="text-base font-serif font-bold text-[#EDE7D9]">
                      {formatINR(dish.price)}
                    </span>
                    {dish.pieces && (
                      <span className="text-[10px] text-[#7E8579] ml-1.5 uppercase">
                        {dish.pieces}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleQuickAdd(e, dish)}
                    aria-label={`Quick add ${dish.name} to order`}
                    className="p-2 rounded-xs bg-[#242A20] hover:bg-[#B99563] text-[#EDE7D9] hover:text-[#171916] border border-[#3A4234] transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/menu">
            <Button variant="outline" className="w-full gap-2">
              <span>View All Menu Offerings</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Shared Dish Detail Dialog */}
      <DishDialog
        dish={selectedDish}
        isOpen={!!selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </section>
  );
}
