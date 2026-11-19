import { create } from "zustand";
import { CartItem } from "@/types/cart";
import { DISHES } from "@/data/dishes";

interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (dishId: string, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartStoreState>((set) => ({
  items: [],
  isOpen: false,

  addItem: (dishId: string, quantity = 1) => {
    // Validate dish exists
    const dishExists = DISHES.some((d) => d.id === dishId);
    if (!dishExists) return;

    set((state) => {
      const existing = state.items.find((item) => item.dishId === dishId);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.dishId === dishId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { dishId, quantity }],
      };
    });
  },

  removeItem: (dishId: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.dishId !== dishId),
    }));
  },

  updateQuantity: (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      set((state) => ({
        items: state.items.filter((item) => item.dishId !== dishId),
      }));
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.dishId === dishId ? { ...item, quantity: Math.floor(quantity) } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  setOpen: (open: boolean) => {
    set({ isOpen: open });
  },
}));

// Helper selector functions for computed values
export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const dish = DISHES.find((d) => d.id === item.dishId);
    return total + (dish ? dish.price * item.quantity : 0);
  }, 0);
}
