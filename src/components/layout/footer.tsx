"use client";

import React from "react";
import Link from "next/link";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#121411] border-t border-[#252A21] text-[#A3A89F] pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xs bg-[#242A20] border border-[#3C4436] flex items-center justify-center">
                <span className="font-serif text-lg font-bold text-[#B99563]">
                  廻
                </span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-[0.2em] text-[#EDE7D9] block">
                  RAJWADA
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8E948A] block">
                  The Royal Taste of India
                </span>
              </div>
            </div>
            <p className="text-xs text-[#8E948A] leading-relaxed max-w-sm">
              A premium Indian multi-cuisine table where familiar regional flavours meet a contemporary, elegant setting.
            </p>
            <div className="inline-block px-3 py-1 bg-[#1A1E17] border border-[#30382A] rounded-xs text-[11px] text-[#B99563]">
              Frontend Demonstration & Client Concept
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#EDE7D9] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#B99563] transition-colors">
                  Home Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#B99563] transition-colors">
                  Indian Menu & Daily Specials
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-[#B99563] transition-colors">
                  Chef Heritage & Craft
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-[#B99563] transition-colors">
                  Table Reservations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B99563] transition-colors">
                  Location & Hours
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#EDE7D9] mb-4">
              Hours of Service
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B99563] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#EDE7D9] block">Lunch Seating</strong>
                  <span>Tuesday – Sunday: 12:30 PM – 3:30 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#B99563] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#EDE7D9] block">Dinner service</strong>
                  <span>Tuesday – Sunday: 7:00 PM – 11:30 PM</span>
                </div>
              </li>
              <li className="text-[11px] text-[#7E8579] pt-1">
                Closed Mondays for kitchen preparation and seasonal menu curation.
              </li>
            </ul>
          </div>

          {/* Contact & Location Placeholder */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[#EDE7D9] mb-4">
              Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B99563] mt-0.5 shrink-0" />
                <span>Level 2, The Heritage Pavilion, Bandra West, Mumbai 400050</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#B99563] shrink-0" />
                <span>+91 22 2654 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B99563] shrink-0" />
                <span>concierge@rajwada.demo</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#20251B] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A8175] gap-4">
          <p>© 2026 RAJWADA — The Royal Taste of India.</p>
          <div className="flex items-center gap-6">
            <Link href="/reservation" className="hover:text-[#B99563] transition-colors">
              Book Experience
            </Link>
            <Link href="/contact" className="hover:text-[#B99563] transition-colors">
              Private Events
            </Link>
            <span className="text-[#B99563]">IN / INR Pricing</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
