"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { DISHES } from "@/data/dishes";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { RajwadaConveyorMenu, type ConveyorDish } from "@/components/ui/rajwada-conveyor-menu";

export function RajwadaTable() {
  const addItem = useCartStore((state) => state.addItem);
  const items: ConveyorDish[] = DISHES.filter((dish) => dish.featured).map((dish) => ({
    id: dish.id,
    name: dish.name,
    description: dish.description,
    price: formatINR(dish.price),
    tier: dish.tier,
    image: dish.image,
    details: dish.details,
  }));

  const handleAdd = (dish: ConveyorDish) => {
    addItem(dish.id);
    toast.success(`${dish.name} added to your order`, {
      description: `${dish.price} • Your cart is ready to review`,
      action: { label: "Open cart", onClick: () => useCartStore.getState().setOpen(true) },
    });
  };

  return (
    <div id="moving-table" className="scroll-mt-20 bg-[#25231f]">
      <RajwadaConveyorMenu
        items={items}
        eyebrow="The Rajwada moving table"
        heading="A royal table that keeps moving."
        caption="Drag, swipe or use the arrow keys to explore signature Indian plates. Pause the belt, open a dish and add it directly to your order."
        autoplay
        speed={34}
        interval={3000}
        legend={["House classic", "Rajwada favourite", "Tandoor special", "Chef selection", "Royal feast"]}
        labels={{ add: "Add to order", close: "Close dish", prev: "Previous dish", next: "Next dish", pause: "Pause moving table", play: "Resume moving table" }}
        onAdd={handleAdd}
        action={<div className="flex flex-wrap items-center justify-center gap-3"><Link href="/menu"><Button variant="outline" className="gap-2">Explore the full menu <ArrowRight className="h-4 w-4" /></Button></Link><Link href="/reservation"><Button variant="gold">Reserve a table</Button></Link></div>}
        className="border-y border-[#514a40] bg-[#25231f]"
      />
    </div>
  );
}
