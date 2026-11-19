import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, HeartHandshake, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/utils";
import { CHEF_INFO } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Our Story & Heritage | RAJWADA · Indian Dining",
  description: "Discover RAJWADA, a modern Indian restaurant shaped by regional recipes, live fire and generous hospitality.",
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#171916] pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-[#B99563]">The philosophy of RAJWADA</span>
          <h1 className="mb-6 font-serif text-4xl tracking-tight text-[#EDE7D9] sm:text-5xl lg:text-6xl">Rooted in India. Made for today.</h1>
          <p className="text-base leading-relaxed text-[#A3A89F] sm:text-lg">We bring the warmth of India&apos;s regional kitchens into a contemporary dining room. Every plate is familiar, generous and carefully finished.</p>
        </header>

        <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[#343B2C] shadow-2xl">
            <Image src={assetPath("/images/rajwada/dining-room.png")} alt="RAJWADA dining room with carved arches and warm golden lighting" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#141712]/90 via-transparent to-transparent p-6"><div><span className="block text-[10px] uppercase tracking-widest text-[#B99563]">The atmosphere</span><span className="font-serif text-sm text-[#EDE7D9]">Old-world detail, warm light and unhurried tables</span></div></div>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-[#343B2C] shadow-2xl">
            <Image src={assetPath("/images/rajwada/brass-thali.png")} alt="Royal Indian thali served in brass bowls" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#141712]/90 via-transparent to-transparent p-6"><div><span className="block text-[10px] uppercase tracking-widest text-[#B99563]">The table</span><span className="font-serif text-sm text-[#EDE7D9]">A generous spread made for sharing</span></div></div>
          </div>
        </div>

        <section className="mb-24 rounded-sm border border-[#2F3628] bg-[#191D17] p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#3A4333] lg:col-span-4"><Image src={assetPath("/images/rajwada/paneer-tikka.png")} alt="Paneer tikka prepared over a live tandoor flame" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" /></div>
            <div className="space-y-5 lg:col-span-8">
              <span className="block text-xs uppercase tracking-[0.25em] text-[#B99563]">{CHEF_INFO.regionalTitle}</span>
              <h2 className="font-serif text-3xl text-[#EDE7D9] sm:text-4xl">{CHEF_INFO.name}</h2>
              <div className="text-xs uppercase tracking-wider text-[#D4AF77]">{CHEF_INFO.title} · {CHEF_INFO.experience}</div>
              <p className="text-sm leading-relaxed text-[#A3A89F]">{CHEF_INFO.bio}</p>
              <blockquote className="border-l-2 border-[#B99563] bg-[#141712] p-4 font-serif text-xs italic leading-relaxed text-[#EDE7D9] sm:text-sm">“{CHEF_INFO.philosophy}”</blockquote>
            </div>
          </div>
        </section>

        <section className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            { icon: Flame, title: "Live-fire cooking", text: "Our tandoor, griddle and handi bring depth to every marinade, bread and slow-cooked gravy." },
            { icon: Leaf, title: "Season-led produce", text: "We build the menu around Indian produce, house-ground masalas and ingredients at their best." },
            { icon: HeartHandshake, title: "Generous hospitality", text: "Every detail is designed to make the table feel easy, welcoming and worth lingering over." },
          ].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-sm border border-[#2C3226] bg-[#1A1E17] p-8"><div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-[#394233] bg-[#242A20] text-[#B99563]"><Icon className="h-5 w-5" /></div><h3 className="mb-2 font-serif text-lg text-[#EDE7D9]">{title}</h3><p className="text-xs leading-relaxed text-[#8E948A]">{text}</p></div>)}
        </section>

        <div className="border-t border-[#262C21] pt-8 text-center"><h3 className="mb-4 font-serif text-2xl text-[#EDE7D9]">Experience RAJWADA in person</h3><div className="flex flex-wrap items-center justify-center gap-4"><Link href="/reservation"><Button variant="gold" size="lg" className="gap-2">Reserve a table <ArrowRight className="h-4 w-4" /></Button></Link><Link href="/menu"><Button variant="outline" size="lg">Explore the menu</Button></Link></div></div>
      </div>
    </div>
  );
}
