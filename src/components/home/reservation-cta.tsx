import React from "react";
import Link from "next/link";
import { Calendar, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReservationCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#171916] to-[#121411] border-t border-[#252A20] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#B99563_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-3">
          Lunch, dinner & celebrations
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#EDE7D9] tracking-tight mb-6">
          Make the table yours
        </h2>
        <p className="text-sm sm:text-base text-[#A3A89F] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
          Come for a relaxed lunch, a long dinner or a celebration with your favourite people. We will take care of the rest.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/reservation">
            <Button variant="gold" size="lg" className="w-full sm:w-auto px-8 gap-2">
              <span>Book Table Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
              Explore Full Menu
            </Button>
          </Link>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#282F24] text-xs text-[#8E948A]">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-[#B99563]" />
            <span>Open Tuesday through Sunday</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#B99563]" />
            <span>Lunch & Dinner seatings</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-[#B99563]" />
            <span>Indoor & private seating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
