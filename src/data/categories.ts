import { DishCategory } from "@/types/dish";

export interface CategoryInfo { id: DishCategory; label: string; descriptor: string; description: string; }

export const CATEGORIES: CategoryInfo[] = [
  { id: "all", label: "All dishes", descriptor: "The full table", description: "A generous Indian table of regional recipes, seasonal produce and slow-cooked favourites." },
  { id: "starters", label: "Small plates", descriptor: "To begin", description: "Crisp, smoky and bright plates made for sharing at the centre of the table." },
  { id: "tandoor", label: "From the tandoor", descriptor: "Live fire", description: "Overnight marinades finished over live charcoal for that unmistakable tandoor aroma." },
  { id: "mains", label: "Curries & mains", descriptor: "The heart of the meal", description: "Comforting regional gravies, seasonal vegetables and slow braises served with warmth." },
  { id: "biryani", label: "Biryani & rice", descriptor: "Fragrant grains", description: "Fragrant basmati, whole spices and patient dum cooking in every spoonful." },
  { id: "thalis", label: "Royal thalis", descriptor: "A complete spread", description: "A complete spread of seasonal curries, breads, rice and something sweet." },
  { id: "desserts", label: "Sweet endings", descriptor: "Something sweet", description: "Indian desserts with a lighter, modern finish and plenty of nostalgia." },
  { id: "beverages", label: "Drinks", descriptor: "Pour something bright", description: "House sharbat, chai and bright zero-proof pours to complete the meal." },
];
