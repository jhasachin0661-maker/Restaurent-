export type DishTier = 1 | 2 | 3 | 4 | 5;

export type DishCategory = 
  | "all"
  | "starters"
  | "mains"
  | "biryani"
  | "tandoor"
  | "thalis"
  | "desserts"
  | "beverages";

export interface Dish {
  id: string;
  name: string;
  regionalName?: string;
  description: string;
  price: number; // numeric INR amount
  category: "starters" | "mains" | "biryani" | "tandoor" | "thalis" | "desserts" | "beverages";
  tier?: DishTier;
  image: string;
  conveyorImage?: string;
  details: string[];
  dietaryTags?: string[];
  featured?: boolean;
  pieces?: string;
}

export interface ConveyorDish {
  id: string;
  name: string;
  description?: string;
  price: string; // display label e.g. "₹650"
  tier?: DishTier;
  image: string;
  details?: string[];
}
