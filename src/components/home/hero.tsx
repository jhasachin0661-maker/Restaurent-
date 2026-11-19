"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#25231f] pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(196,154,85,.12)_1px,transparent_1px),linear-gradient(rgba(196,154,85,.12)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="space-y-7 lg:col-span-6">
          <div className="inline-flex items-center gap-2 border border-[#6d5a3e] bg-[#302d27] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#c49a55]"><Crown className="h-3.5 w-3.5" /> The royal taste of India</div>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.97] tracking-tight text-[#f3ebdd] sm:text-6xl lg:text-8xl">A Royal Feast, <span className="italic text-[#c49a55]">Rooted in India.</span></h1>
          <p className="max-w-xl text-base leading-8 text-[#c2b8a8] sm:text-lg">Discover timeless Indian favourites, prepared with care and served with a contemporary touch.</p>
          <div className="flex flex-wrap gap-3 pt-2"><Link href="/menu"><Button variant="gold" size="lg" className="gap-2">Explore the menu <ArrowRight className="h-4 w-4" /></Button></Link><Link href="/reservation"><Button variant="outline" size="lg">Reserve a table</Button></Link></div>
          <div className="grid max-w-lg grid-cols-3 gap-5 border-t border-[#514a40] pt-6"><div><strong className="block font-serif text-2xl text-[#f3ebdd]">Tandoor</strong><span className="text-[10px] uppercase tracking-widest text-[#c2b8a8]">live fire</span></div><div><strong className="block font-serif text-2xl text-[#c49a55]">Dum</strong><span className="text-[10px] uppercase tracking-widest text-[#c2b8a8]">slow cooking</span></div><div><strong className="block font-serif text-2xl text-[#f3ebdd]">Bandra</strong><span className="text-[10px] uppercase tracking-widest text-[#c2b8a8]">Mumbai</span></div></div>
        </div>
        <div className="relative lg:col-span-6 lg:pl-10"><div className="relative aspect-[4/5] overflow-hidden border border-[#6d5a3e] shadow-2xl shadow-black/40"><Image src={assetPath("/images/rajwada/golden-thali.png")} alt="A royal Indian thali with colourful regional dishes" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#25231f]/85 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between"><div><span className="text-[10px] uppercase tracking-[0.25em] text-[#c49a55]">Tonight at Rajwada</span><p className="mt-1 font-serif text-2xl text-[#f3ebdd]">A table worth gathering around</p></div><div className="rounded-full bg-[#f3ebdd] p-3 text-[#77352d]"><MapPin className="h-5 w-5" /></div></div></div><div className="absolute -bottom-5 -left-3 border border-[#6d5a3e] bg-[#302d27] px-5 py-4 shadow-xl sm:-left-8"><span className="block text-[10px] uppercase tracking-widest text-[#c49a55]">From the kitchen</span><span className="font-serif text-lg text-[#f3ebdd]">Butter chicken & warm naan</span></div></div>
      </div>
    </section>
  );
}
