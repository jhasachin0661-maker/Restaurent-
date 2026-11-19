import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#141712] border-t border-[#242A20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-2">
            Sample Reflections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#EDE7D9] tracking-wide mb-3">
            Guest Reflections
          </h2>
          <p className="text-xs text-[#7E8579] uppercase tracking-wider">
            Curated Demonstration Reviews for Concept Evaluation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1E17] border border-[#2D3428] p-8 rounded-xs flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center gap-1 text-[#B99563] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B99563]" />
                  ))}
                </div>
                <p className="text-sm text-[#EDE7D9] font-serif italic leading-relaxed mb-6">
                  “{item.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#282E22]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#EDE7D9]">
                  {item.author}
                </h4>
                <span className="text-[11px] text-[#8E948A]">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
