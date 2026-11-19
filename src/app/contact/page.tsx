"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Private Dining Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#171916]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#22271E] border border-[#353D2E] text-xs uppercase tracking-[0.25em] text-[#B99563] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Concierge & Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#EDE7D9] tracking-tight mb-4">
            Connect with RAJWADA
          </h1>
          <p className="text-sm sm:text-base text-[#A3A89F] leading-relaxed font-light max-w-2xl mx-auto">
            For private event buyouts, chef-led dinners, culinary inquiries, or feedback, our dining concierge is pleased to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Information Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="bg-[#191D17] border border-[#2B3125] p-6 rounded-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#242A20] text-[#B99563] border border-[#3A4234] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#EDE7D9] mb-1">
                    Sanctuary Location
                  </h3>
                  <p className="text-xs text-[#A3A89F] leading-relaxed mb-3">
                    Level 2, The Heritage Pavilion, <br />
                    Waterfield Road, Bandra West, <br />
                    Mumbai, Maharashtra 400050, India
                  </p>
                  <a
                    href="https://maps.google.com/?q=Bandra+West+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#B99563] hover:text-[#D4AF77] font-medium transition-colors"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Card */}
            <div className="bg-[#191D17] border border-[#2B3125] p-6 rounded-xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#242A20] text-[#B99563] border border-[#3A4234] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-[#7E8579]">
                    Dining Concierge (Phone)
                  </h4>
                  <a
                    href="tel:+912226548900"
                    className="text-sm font-medium text-[#EDE7D9] hover:text-[#B99563] transition-colors"
                  >
                    +91 22 2654 8900
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-[#242920]">
                <div className="w-10 h-10 rounded-xs bg-[#242A20] text-[#B99563] border border-[#3A4234] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider text-[#7E8579]">
                    Electronic Mail
                  </h4>
                  <a
                    href="mailto:concierge@rajwada.demo"
                    className="text-sm font-medium text-[#EDE7D9] hover:text-[#B99563] transition-colors"
                  >
                    concierge@rajwada.demo
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#191D17] border border-[#2B3125] p-6 rounded-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xs bg-[#242A20] text-[#B99563] border border-[#3A4234] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h3 className="font-serif text-base text-[#EDE7D9] mb-3">
                    Service Hours
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-[#23281E] pb-1.5">
                      <span className="text-[#A3A89F]">Tuesday – Friday:</span>
                      <span className="text-[#EDE7D9]">12:30 PM – 3:30 PM | 7:00 PM – 11:30 PM</span>
                    </div>
                    <div className="flex justify-between border-b border-[#23281E] pb-1.5">
                      <span className="text-[#A3A89F]">Saturday – Sunday:</span>
                      <span className="text-[#EDE7D9]">12:00 PM – 4:00 PM | 6:30 PM – Midnight</span>
                    </div>
                    <div className="flex justify-between text-[#8A4337] pt-1">
                      <span>Monday:</span>
                      <span>Closed for kitchen preparation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#141712] border border-[#272D21] rounded-xs text-xs text-[#7E8579]">
              * Note: Contact numbers, address, and email addresses are sample placeholders established for demonstration purposes.
            </div>
          </div>

          {/* Concierge Message Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#191D17] border border-[#2B3125] p-6 sm:p-10 rounded-xs shadow-xl">
            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-1">
                    Direct Inquiry
                  </span>
                  <h2 className="text-2xl font-serif text-[#EDE7D9]">
                    Send a Message to Our Host Team
                  </h2>
                  <p className="text-xs text-[#8E948A] mt-1">
                    We respond to private dining and event inquiries within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. S. Jha"
                      className="w-full px-4 py-3 bg-[#131611] border border-[#2D3327] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guest@domain.com"
                      className="w-full px-4 py-3 bg-[#131611] border border-[#2D3327] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#131611] border border-[#2D3327] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none"
                  >
                    <option value="Private Dining Inquiry">Private Dining & Counter Buyout</option>
                    <option value="Dietary & Allergen Consultation">Dietary & Allergen Consultation</option>
                      <option value="Beverage Pairing">House Beverage Pairing Query</option>
                    <option value="General Dining Inquiry">General Dining Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requested dates, number of guests, or special requirements..."
                    className="w-full px-4 py-3 bg-[#131611] border border-[#2D3327] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none resize-none"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full py-4 text-sm font-semibold tracking-wider gap-2">
                  <Send className="w-4 h-4" />
                  <span>Transmit Demonstration Inquiry</span>
                </Button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#B99563]/15 text-[#B99563] border border-[#B99563]/40 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-[#EDE7D9]">
                  Message Received
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A89F] max-w-sm mx-auto">
                  Thank you, {formData.name}. In a production deployment, our concierge team would respond to {formData.email}.
                </p>
                <div className="p-3 bg-[#141712] border border-[#2B3126] rounded-xs text-xs text-[#8E948A] max-w-sm mx-auto">
                  <strong>Demo Mode:</strong> Your message was processed client-side. No email dispatch occurred.
                </div>
                <Button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Private Dining Inquiry", message: "" });
                  }}
                  variant="outline"
                  size="sm"
                >
                  Send Another Inquiry
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
