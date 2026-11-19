"use client";

import React from "react";
import Image from "next/image";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Dish } from "@/types/dish";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

interface CartItemRowProps {
  dish: Dish;
  quantity: number;
}

export function CartItemRow({ dish, quantity }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-[#2C3227] last:border-b-0">
      {/* Plate Thumbnail */}
      <div className="relative w-16 h-16 rounded-xs bg-[#171916] border border-[#33392E] p-1.5 shrink-0 flex items-center justify-center">
        <Image
          src={dish.image}
          alt={dish.name}
          width={56}
          height={56}
          className="object-contain"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-[#EDE7D9] truncate">
          {dish.name}
        </h4>
        <div className="text-xs text-[#B99563] font-serif mt-0.5">
          {formatINR(dish.price)} each
        </div>
      </div>

      {/* Quantity Stepper */}
      <div className="flex items-center border border-[#3A4135] rounded-xs bg-[#1A1E18]">
        <button
          onClick={() => updateQuantity(dish.id, quantity - 1)}
          aria-label={`Decrease quantity of ${dish.name}`}
          className="p-1.5 text-[#A3A89F] hover:text-[#EDE7D9] hover:bg-[#252B22] transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-8 text-center text-xs font-semibold text-[#EDE7D9]">
          {quantity}
        </span>
        <button
          onClick={() => updateQuantity(dish.id, quantity + 1)}
          aria-label={`Increase quantity of ${dish.name}`}
          className="p-1.5 text-[#A3A89F] hover:text-[#EDE7D9] hover:bg-[#252B22] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Line Total & Remove */}
      <div className="text-right min-w-[70px]">
        <div className="text-sm font-serif font-medium text-[#EDE7D9]">
          {formatINR(dish.price * quantity)}
        </div>
        <button
          onClick={() => removeItem(dish.id)}
          aria-label={`Remove ${dish.name} from cart`}
          className="text-[11px] text-[#8E948A] hover:text-[#8A4337] transition-colors inline-flex items-center gap-1 mt-1"
        >
          <Trash2 className="w-3 h-3" />
          Remove
        </button>
      </div>
    </div>
  );
}
