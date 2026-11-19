import React from "react";
import { Hero } from "@/components/home/hero";
import { FeaturedDishes } from "@/components/home/featured-dishes";
import { RajwadaTable } from "@/components/home/rajwada-table";
import { StoryTeaser } from "@/components/home/story-teaser";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ReservationCTA } from "@/components/home/reservation-cta";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Featured Indian plates */}
      <RajwadaTable />

      {/* 3. Featured Signatures */}
      <FeaturedDishes />

      {/* 4. Heritage & Craft Story Teaser */}
      <StoryTeaser />

      {/* 5. Guest Reflections & Testimonials */}
      <TestimonialsSection />

      {/* 6. Reservation Call to Action */}
      <ReservationCTA />
    </div>
  );
}
