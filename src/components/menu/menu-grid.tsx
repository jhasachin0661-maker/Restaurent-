"use client";

import React, { useState, useMemo } from "react";
import { UtensilsCrossed, RotateCcw } from "lucide-react";
import { DISHES } from "@/data/dishes";
import { Dish, DishCategory } from "@/types/dish";
import { DishCard } from "@/components/menu/dish-card";
import { MenuFilters } from "@/components/menu/menu-filters";
import { DishDialog } from "@/components/menu/dish-dialog";
import { Button } from "@/components/ui/button";

export function MenuGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DishCategory>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeDish, setActiveDish] = useState<Dish | null>(null);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      // Category check
      if (selectedCategory !== "all" && dish.category !== selectedCategory) {
        return false;
      }
      // Tag check
      if (selectedTag && !dish.dietaryTags?.includes(selectedTag)) {
        return false;
      }
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = dish.name.toLowerCase().includes(query);
        const matchDesc = dish.description.toLowerCase().includes(query);
        const matchRegional = dish.regionalName?.toLowerCase().includes(query);
        const matchDetails = dish.details?.some((d) => d.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchRegional && !matchDetails) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTag(null);
  };

  return (
    <div className="w-full">
      {/* Search & Category Filter Controls */}
      <MenuFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />

      {/* Result Count Status */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#262C21] text-xs text-[#8E948A]">
        <span>
          Showing {filteredDishes.length} of {DISHES.length} seasonal culinary items
        </span>
        {(searchQuery || selectedCategory !== "all" || selectedTag) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-[#B99563] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Grid or Empty State */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onSelect={(d) => setActiveDish(d)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-[#171A14] border border-[#2B3126] rounded-xs p-8 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#22271E] border border-[#353D2F] flex items-center justify-center text-[#7E8579] mx-auto mb-4">
            <UtensilsCrossed className="w-8 h-8 opacity-40" />
          </div>
          <h3 className="text-xl font-serif text-[#EDE7D9] mb-2">
            No culinary offerings match your search
          </h3>
          <p className="text-xs text-[#8E948A] leading-relaxed mb-6">
            We could not find any dish matching &quot;{searchQuery || selectedTag}&quot;. Try another ingredient, course or reset the filters.
          </p>
          <Button onClick={handleResetFilters} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4 text-[#B99563]" />
            <span>Clear Filter Criteria</span>
          </Button>
        </div>
      )}

      {/* Dish Detail Dialog */}
      <DishDialog
        dish={activeDish}
        isOpen={!!activeDish}
        onClose={() => setActiveDish(null)}
      />
    </div>
  );
}
