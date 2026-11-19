import React from "react";
import type { Metadata } from "next";
import { MenuGrid } from "@/components/menu/menu-grid";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Indian Menu | RAJWADA · Regional Indian Dining",
  description: "Explore RAJWADA's regional Indian menu of tandoor plates, biryani, slow-cooked curries and bright house drinks.",
};

export default function MenuPage() {
  return <div className="min-h-screen bg-[#211613] pb-24 pt-32"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-14 max-w-3xl text-center"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#654035] bg-[#30201a] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#f2bb61]"><Sparkles className="h-3.5 w-3.5" /> Regional Indian kitchen</div><h1 className="mb-4 font-serif text-4xl tracking-tight text-[#fff4df] sm:text-5xl">The RAJWADA menu</h1><p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#c7ad91] sm:text-base">Every plate is cooked to order with regional produce, house masalas and the kind of patience good food deserves. Filter by course, dietary preference or search directly.</p></div><MenuGrid /></div></div>;
}
