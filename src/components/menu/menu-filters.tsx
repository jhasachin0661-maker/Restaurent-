"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { DishCategory } from "@/types/dish";
import { CATEGORIES } from "@/data/categories";

interface MenuFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: DishCategory;
  onSelectCategory: (category: DishCategory) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  totalCount: number;
}

const DIETARY_FILTERS = [
  "Chef's Signature",
  "Gluten-Free",
  "Vegetarian",
  "Customer Favorite",
  "Non-Vegetarian",
];

export function MenuFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
}: Omit<MenuFiltersProps, "totalCount">) {
  return (
    <div className="space-y-6 mb-10">
      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E948A]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search dishes, ingredients or regional favourites..."
          className="w-full pl-11 pr-10 py-3 bg-[#30201a] border border-[#654035] text-[#fff4df] text-sm rounded-xl placeholder:text-[#9f806b] focus:border-[#e58f43] outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            aria-label="Clear search query"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#8E948A] hover:text-[#EDE7D9]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2 px-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-xs text-xs uppercase tracking-wider whitespace-nowrap transition-all border ${
                isSelected
                  ? "bg-[#e58f43] text-[#211613] border-[#e58f43] font-semibold shadow-md"
                  : "bg-[#30201a] text-[#c7ad91] hover:text-[#fff4df] border-[#654035] hover:border-[#81503c]"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Dietary Sub-Tags */}
      <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
        <span className="text-[11px] uppercase tracking-widest text-[#7E8579] mr-1">
          Specialty Filter:
        </span>
        {DIETARY_FILTERS.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(isActive ? null : tag)}
              className={`px-3 py-1 rounded-xs text-[11px] tracking-wider transition-colors border ${
                isActive
                  ? "bg-[#e58f43]/20 border-[#e58f43] text-[#f2bb61] font-medium"
                  : "bg-[#211613] border-[#4a291f] text-[#c7ad91] hover:text-[#fff4df]"
              }`}
            >
              {tag}
            </button>
          );
        })}
        {selectedTag && (
          <button
            onClick={() => onSelectTag(null)}
            className="text-[11px] text-[#8A4337] hover:underline ml-2"
          >
            Clear tag
          </button>
        )}
      </div>
    </div>
  );
}
