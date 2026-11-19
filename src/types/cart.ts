import { Dish } from "./dish";

export interface CartItem {
  dishId: string;
  quantity: number;
}

export interface EnrichedCartItem {
  dish: Dish;
  quantity: number;
  lineTotal: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (dishId: string, quantity?: number) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (isOpen: boolean) => void;
}
