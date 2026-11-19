"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, Users, CheckCircle, ShieldAlert } from "lucide-react";
import { reservationSchema, ReservationFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";

const TIME_SLOTS = [
  "12:30 PM (Lunch)",
  "1:30 PM (Lunch Seating)",
  "2:30 PM (Afternoon Flight)",
  "7:00 PM (First Dinner Seating)",
  "8:15 PM (Dinner)",
  "9:30 PM (Late Evening Flight)",
];

let bookingCounter = 8410;
function createBookingCode(): string {
  bookingCounter += 1;
  return `RAJ-RES-${bookingCounter}`;
}

export function ReservationForm() {
  const [confirmedData, setConfirmedData] = useState<{
    values: ReservationFormValues;
    bookingCode: string;
  } | null>(null);

  // Get tomorrow's date string YYYY-MM-DD as minimum
  const [tomorrowStr, setTomorrowStr] = React.useState('');

  React.useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTomorrowStr(d.toISOString().split('T')[0]);
  }, []);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      guests: 2,
      time: "8:15 PM (Dinner)",
      seatingPreference: "main-dining",
      // date will be set after tomorrowStr is available
    },
  });

  const onSubmit = async (data: ReservationFormValues) => {
    // Brief simulated reservation processing
    await new Promise((r) => setTimeout(r, 650));
    const bookingCode = createBookingCode();
    setConfirmedData({ values: data, bookingCode });
  };

  const handleReset = () => {
    setConfirmedData(null);
    reset();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#181B15] border border-[#2F3629] p-6 sm:p-10 rounded-xs shadow-2xl">
      {!confirmedData ? (
        <div>
          {/* Form Header */}
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-2">
              Online Dining Reservation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#EDE7D9] tracking-wide mb-3">
              Book Your Table at RAJWADA
            </h2>
            <p className="text-xs sm:text-sm text-[#8E948A] leading-relaxed max-w-md mx-auto">
              Select your preferred seating area, dining time, and guest count. Tables are reserved for 90 minutes.
            </p>
          </div>

          {/* Demo Disclaimer Banner */}
          <div className="flex items-start gap-3 p-3.5 mb-8 rounded-xs bg-[#22271E] border border-[#353E2F] text-xs text-[#A3A89F]">
            <ShieldAlert className="w-4 h-4 text-[#B99563] shrink-0 mt-0.5" />
            <p>
              <strong className="text-[#EDE7D9] block">Interactive Booking Demonstration</strong>
              Reservations placed through this portfolio demo are simulated and not transmitted to a live host stand.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Full Name *
                </label>
                <input
                  {...register("fullName")}
                  placeholder="e.g. S. Jha"
                  className="w-full px-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                />
                {errors.email && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Phone & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Phone Number (SMS Confirmation) *
                </label>
                <input
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                />
                {errors.phone && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Number of Guests *
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E948A]" />
                  <input
                    {...register("guests", { valueAsNumber: true })}
                    type="number"
                    min="1"
                    max="12"
                    className="w-full pl-10 pr-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                  />
                </div>
                {errors.guests && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.guests.message}</p>
                )}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Date of Visit *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E948A]" />
                  <input
                    {...register("date")}
                    type="date"
                    min={tomorrowStr}
                    className="w-full pl-10 pr-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                  />
                </div>
                {errors.date && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                  Seating Time Slot *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E948A]" />
                  <select
                    {...register("time")}
                    className="w-full pl-10 pr-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.time && (
                  <p className="text-xs text-[#8A4337] mt-1.5">{errors.time.message}</p>
                )}
              </div>
            </div>

            {/* Seating Preference */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                Preferred Seating Ambience *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {[
                  { id: "main-dining", label: "Main dining", desc: "Warm, lively tables" },
                  { id: "chef-counter", label: "Chef's counter", desc: "Watch the kitchen" },
                  { id: "private-room", label: "Private room", desc: "A quieter table" },
                  { id: "outdoor", label: "Garden table", desc: "Open-air seating" },
                ].map((seat) => (
                  <label
                    key={seat.id}
                    className="flex flex-col p-3 rounded-xs border border-[#2E3528] bg-[#141712] cursor-pointer hover:border-[#B99563]/60 transition-colors"
                  >
                    <input
                      type="radio"
                      value={seat.id}
                      {...register("seatingPreference")}
                      className="sr-only"
                    />
                    <span className="font-medium text-[#EDE7D9]">{seat.label}</span>
                    <span className="text-[10px] text-[#7E8579] mt-0.5">{seat.desc}</span>
                  </label>
                ))}
              </div>
              {errors.seatingPreference && (
                <p className="text-xs text-[#8A4337] mt-1.5">
                  {errors.seatingPreference.message}
                </p>
              )}
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#A3A89F] mb-2">
                Dietary Requirements or Special Celebration (Optional)
              </label>
              <textarea
                {...register("specialRequests")}
                rows={3}
                placeholder="Allergies (shellfish, gluten), anniversary notes, or quiet corner request..."
                className="w-full px-4 py-3 bg-[#131611] border border-[#2E3528] text-[#EDE7D9] rounded-xs text-sm focus:border-[#B99563] outline-none transition-colors resize-none"
              />
              {errors.specialRequests && (
                <p className="text-xs text-[#8A4337] mt-1.5">
                  {errors.specialRequests.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="gold"
              className="w-full py-4 text-sm font-semibold tracking-wider"
            >
              {isSubmitting ? "Confirming Table..." : "Complete Simulated Table Reservation"}
            </Button>
          </form>
        </div>
      ) : (
        /* Confirmation Screen */
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#B99563]/15 text-[#B99563] border border-[#B99563]/40 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#B99563] font-serif block mb-1">
            Table Reserved (Demo)
          </span>
          <h2 className="text-3xl font-serif text-[#EDE7D9] mb-3">
            We Await Your Visit
          </h2>
          <p className="text-xs sm:text-sm text-[#A3A89F] max-w-md mx-auto mb-8">
            Your simulated reservation has been recorded. Here are your booking details:
          </p>

          <div className="p-6 bg-[#131611] border border-[#2F3628] rounded-xs text-left max-w-md mx-auto space-y-3 mb-8 text-xs text-[#EDE7D9]">
            <div className="flex justify-between border-b border-[#242A20] pb-2">
              <span className="text-[#8E948A]">Confirmation Code:</span>
              <strong className="text-[#B99563] font-serif font-bold text-sm">
                {confirmedData.bookingCode}
              </strong>
            </div>
            <div className="flex justify-between border-b border-[#242A20] pb-2">
              <span className="text-[#8E948A]">Guest Name:</span>
              <span>{confirmedData.values.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#242A20] pb-2">
              <span className="text-[#8E948A]">Date & Time:</span>
              <span>
                {confirmedData.values.date} at {confirmedData.values.time}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#242A20] pb-2">
              <span className="text-[#8E948A]">Party Size:</span>
              <span>{confirmedData.values.guests} Guests</span>
            </div>
            <div className="flex justify-between border-b border-[#242A20] pb-2">
              <span className="text-[#8E948A]">Seating Area:</span>
              <span className="capitalize">{confirmedData.values.seatingPreference.replace("-", " ")}</span>
            </div>
            {confirmedData.values.specialRequests && (
              <div className="pt-1">
                <span className="text-[#8E948A] block mb-1">Notes:</span>
                <span className="text-[11px] italic text-[#A3A89F]">
                  &quot;{confirmedData.values.specialRequests}&quot;
                </span>
              </div>
            )}
          </div>

          <div className="p-3.5 bg-[#20251C] border border-[#333C2C] rounded-xs text-xs text-[#8E948A] max-w-md mx-auto mb-8">
            <strong>Demonstration Notice:</strong> This reservation was created in client demonstration mode. No real table was booked or message sent.
          </div>

          <Button onClick={handleReset} variant="outline" className="px-8">
            Make Another Demonstration Booking
          </Button>
        </div>
      )}
    </div>
  );
}
