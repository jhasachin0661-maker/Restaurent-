import React from "react";
import Image from "next/image";
import { assetPath } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoryTeaser() {
  return (
    <section className="py-24 bg-[#171916] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Split Editorial Photo (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-xs overflow-hidden border border-[#373E31] shadow-2xl">
              <Image
                src={assetPath("/images/rajwada/dining-room.png")}
                alt="Chef preparing a regional Indian dish over live fire"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141712]/90 via-transparent to-transparent" />
            </div>

            {/* Inset Quote Card */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#20251C] border border-[#3D4536] p-6 rounded-xs max-w-xs shadow-xl">
              <span className="font-serif text-3xl text-[#B99563] block leading-none mb-2">
                “
              </span>
              <p className="text-xs text-[#EDE7D9] italic font-serif leading-relaxed mb-2">
                Good Indian food is never in a hurry. It is built in the masala, the smoke and the stories around the table.
              </p>
              <span className="text-[10px] uppercase tracking-widest text-[#B99563]">
                RAJWADA kitchen · Bandra
              </span>
            </div>
          </div>

          {/* Narrative Story Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block">
              Philosophy & Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#EDE7D9] tracking-tight leading-tight">
              From home kitchens to <br />
              <span className="italic text-[#D4AF77]">the modern table</span>
            </h2>

            <p className="text-sm sm:text-base text-[#A3A89F] leading-relaxed font-light">
              RAJWADA is a modern Indian restaurant rooted in the food we grew up with: the Sunday handi, the roadside tandoor and the first sip of chai after a long day.
            </p>

            <p className="text-sm text-[#8E948A] leading-relaxed">
              We cook with seasonal produce, house-ground masalas and a little live fire. The menu moves with the markets, but the welcome stays the same—generous, easy and made to be shared.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <Link href="/our-story">
                <Button variant="gold" className="gap-2">
                  <span>Our story</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/reservation">
                <Button variant="outline">
                  Book the table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
