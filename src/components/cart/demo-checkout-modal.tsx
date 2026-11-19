"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, CheckCircle, ShieldAlert } from "lucide-react";
import { checkoutSchema, CheckoutFormValues } from "@/lib/validations";
import { useCartStore, getCartSubtotal } from "@/store/cart-store";
import { DISHES } from "@/data/dishes";
import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DemoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

let orderCounter = 2048;
function createOrderReference(): string {
  orderCounter += 1;
  return `RAJ-${orderCounter}`;
}

export function DemoCheckoutModal({ isOpen, onClose }: DemoCheckoutModalProps) {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const setCartOpen = useCartStore((state) => state.setOpen);
  const subtotal = getCartSubtotal(items);

  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      diningType: "dine-in",
      tableOrAddress: "Table 04",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async () => {
    // Simulate brief network delay
    await new Promise((r) => setTimeout(r, 600));
    const randomId = createOrderReference();
    setOrderNumber(randomId);
    setOrderConfirmed(true);
    // Clear cart only upon successful simulated order completion
    clearCart();
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    reset();
    onClose();
    setCartOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#1B1E19] border border-[#394034] rounded-sm shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-4 right-4 p-2 text-[#A3A89F] hover:text-[#EDE7D9] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#B99563]">
                Simulated Demonstration
              </span>
            </div>
            <h2 className="text-2xl font-serif text-[#EDE7D9] mb-2">
              Confirm Demo Order
            </h2>

            {/* Clear Non-Production Banner */}
            <div className="flex items-start gap-3 p-3.5 mb-6 rounded-xs bg-[#242A21] border border-[#3A4335] text-xs text-[#A3A89F]">
              <ShieldAlert className="w-4 h-4 text-[#B99563] shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#EDE7D9] block">Concept Demonstration Only</strong>
                No payment will be collected, and no real kitchen ticket will be created. You can test the complete order flow safely.
              </p>
            </div>

            {/* Order Items Preview */}
            <div className="mb-6 p-4 rounded-xs bg-[#151813] border border-[#2B3127]">
              <div className="flex justify-between text-xs text-[#A3A89F] uppercase tracking-wider mb-2">
                <span>Items ({items.length})</span>
                <span>Amount</span>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-sm">
                {items.map((item) => {
                  const dish = DISHES.find((d) => d.id === item.dishId);
                  if (!dish) return null;
                  return (
                    <div key={item.dishId} className="flex justify-between text-xs text-[#EDE7D9]">
                      <span className="truncate pr-2">
                        {item.quantity}× {dish.name}
                      </span>
                      <span className="font-serif text-[#B99563]">
                        {formatINR(dish.price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3 mt-3 border-t border-[#292F25] flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-widest text-[#EDE7D9] font-medium">
                  Subtotal
                </span>
                <span className="text-lg font-serif font-bold text-[#B99563]">
                  {formatINR(subtotal)}
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                  Guest Name
                </label>
                <input
                  {...register("name")}
                  placeholder="e.g. S. Jha"
                  className="w-full px-3.5 py-2.5 bg-[#141712] border border-[#343A2E] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                />
                {errors.name && (
                  <p className="text-xs text-[#8A4337] mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Email for Receipt
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="guest@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#141712] border border-[#343A2E] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#8A4337] mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#141712] border border-[#343A2E] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#8A4337] mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Dining Mode
                  </label>
                  <select
                    {...register("diningType")}
                    className="w-full px-3 py-2.5 bg-[#141712] border border-[#343A2E] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                  >
                    <option value="dine-in">Dine-in (Table service)</option>
                    <option value="takeaway">Artisanal Takeaway</option>
                    <option value="curbside">Curbside Valet Pickup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Table / Instructions
                  </label>
                  <input
                    {...register("tableOrAddress")}
                    placeholder="e.g. Table 04 / window seat"
                    className="w-full px-3.5 py-2.5 bg-[#141712] border border-[#343A2E] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gold"
                  className="w-full py-3.5"
                >
                  {isSubmitting ? "Processing Demo Order..." : `Place Simulated Order • ${formatINR(subtotal)}`}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#B99563]/15 text-[#B99563] border border-[#B99563]/40 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] block mb-1">
              Demo Order Confirmed
            </span>
            <h2 className="text-3xl font-serif text-[#EDE7D9] mb-2">
              Thank You for Dining with Us
            </h2>
            <p className="text-sm text-[#A3A89F] max-w-sm mx-auto mb-6">
              Thank you for dining with RAJWADA. Your sample order reference is:
            </p>

            <div className="p-4 bg-[#141712] border border-[#33392E] rounded-xs mb-6 text-center">
              <div className="text-xs text-[#8E948A] uppercase tracking-widest">
                Reference Code
              </div>
              <div className="text-2xl font-serif font-bold text-[#EDE7D9] tracking-wider my-1">
                {orderNumber}
              </div>
              <div className="text-xs text-[#B99563]">
                Estimated Kitchen Prep: ~14 mins (Simulated)
              </div>
            </div>

            <div className="p-3 bg-[#242A21] border border-[#384133] rounded-xs text-xs text-[#A3A89F] mb-6">
              <strong>Notice:</strong> This is an interactive frontend demonstration built for client evaluation. No actual financial transaction occurred.
            </div>

            <Button onClick={handleFinish} variant="gold" className="w-full">
              Return to Dining Experience
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
