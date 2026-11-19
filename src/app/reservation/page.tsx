import React from "react";
import type { Metadata } from "next";
import { ReservationForm } from "@/components/reservation/reservation-form";
import { Clock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Reservations | RAJWADA · Regional Indian Dining",
  description:
    "Reserve a table at RAJWADA for relaxed Indian dining, celebrations and chef-led experiences.",
};

export default function ReservationPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#171916]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Reservation Form Component */}
        <ReservationForm />

        {/* Dining Notes & Guidelines Grid */}
        <div className="max-w-2xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#8E948A]">
          <div className="p-5 bg-[#141712] border border-[#272D21] rounded-xs">
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#EDE7D9] mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B99563]" />
              Seating Policy
            </h4>
            <p className="leading-relaxed">
              We hold reserved tables for up to 15 minutes past booking time. For larger groups, our team will help shape the right menu for your table.
            </p>
          </div>

          <div className="p-5 bg-[#141712] border border-[#272D21] rounded-xs">
            <h4 className="font-serif text-sm uppercase tracking-wider text-[#EDE7D9] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B99563]" />
              Attire & Experience
            </h4>
            <p className="leading-relaxed">
              Smart casual attire is appreciated. Let us know about dietary requirements or celebrations when you book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
