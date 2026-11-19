"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore, getCartItemCount, getCartSubtotal } from "@/store/cart-store";
import { DISHES } from "@/data/dishes";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/cart-item";
import { DemoCheckoutModal } from "@/components/cart/demo-checkout-modal";

export function CartDrawer() {
  const isOpen = useCartStore((state) => state.isOpen);
  const setOpen = useCartStore((state) => state.setOpen);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const itemCount = getCartItemCount(items);
  const subtotal = getCartSubtotal(items);

  if (!isOpen) return null;

  return (
    <>
      <div
        role="dialog"
        aria-label="Order Cart"
        aria-modal="true"
        className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="relative w-full max-w-md h-full bg-[#181B16] border-l border-[#31372C] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#2C3227] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#242A20] border border-[#3C4436] flex items-center justify-center text-[#B99563]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#EDE7D9] tracking-wide">
                  Your Order Cart
                </h3>
                <span className="text-xs text-[#A3A89F]">
                  {itemCount} {itemCount === 1 ? "item" : "items"} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close cart"
              className="p-2 text-[#A3A89F] hover:text-[#EDE7D9] hover:bg-[#252B21] rounded-xs transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#2C3227]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#20251D] border border-[#30382A] flex items-center justify-center text-[#7E8579] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-serif text-lg text-[#EDE7D9] mb-1">
                  Your order is empty
                </h4>
                <p className="text-xs text-[#8E948A] max-w-xs mb-6">
                  Choose a few plates for the table, then adjust quantities before checkout.
                </p>
                <Link href="/menu" onClick={() => setOpen(false)}>
                  <Button variant="outline" size="sm">
                    Browse Menu Catalog
                  </Button>
                </Link>
              </div>
            ) : (
              items.map((item) => {
                const dish = DISHES.find((d) => d.id === item.dishId);
                if (!dish) return null;
                return (
                  <CartItemRow
                    key={item.dishId}
                    dish={dish}
                    quantity={item.quantity}
                  />
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#2C3227] bg-[#141612]">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-xs uppercase tracking-widest text-[#A3A89F]">
                  Subtotal
                </span>
                <span className="text-2xl font-serif font-bold text-[#B99563]">
                  {formatINR(subtotal)}
                </span>
              </div>

              <p className="text-[11px] text-[#7E8579] mb-4 leading-relaxed">
                Taxes & service charges calculated during table service. Demo ordering does not charge your account.
              </p>

              <div className="space-y-2">
                <Button
                  onClick={() => setCheckoutModalOpen(true)}
                  variant="gold"
                  className="w-full gap-2 py-3.5"
                >
                  <span>Continue to Demo Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-[#8E948A] hover:text-[#EDE7D9] py-2 transition-colors"
                >
                  Clear Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Checkout Modal */}
      <DemoCheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
      />
    </>
  );
}
