"use client";

import * as React from "react";
import { Search, MapPin, Zap, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { RepairCategoryId } from "@/types";

interface HeroSearchProps {
  selectedCityId: string;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  suburbQuery: string;
  onSuburbChange: (q: string) => void;
  onOpenDispatch: (catId?: RepairCategoryId) => void;
}

export function HeroSearch({
  selectedCityId,
  selectedCategory,
  onSelectCategory,
  suburbQuery,
  onSuburbChange,
  onOpenDispatch,
}: HeroSearchProps) {
  const currentCity = AUSTRALIAN_CITIES.find((c) => c.id === selectedCityId) || AUSTRALIAN_CITIES[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white pt-12 pb-16 px-4">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 text-center">
        {/* Urgency Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-semibold text-amber-400 mb-6 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Need it fixed today? Verified emergency technicians on-call now in {currentCity.name}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] max-w-3xl mx-auto">
          Same-Day Repairs & Trades. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
            No Waiting. No Flakes.
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Skip the 3-day Airtasker bidding games. Instant direct access to licensed, insured Australian whitegood specialists, emergency plumbers, 24/7 locksmiths, and electricians ready to dispatch today.
        </p>

        {/* Search Bar Card */}
        <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900/90 p-3 shadow-2xl backdrop-blur-md text-left">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
            {/* Category Dropdown */}
            <div className="md:col-span-5 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block px-3 pt-1">
                What needs fixing?
              </label>
              <div className="flex items-center px-3 py-1.5">
                <Search className="h-4 w-4 text-amber-400 mr-2 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-hidden cursor-pointer"
                >
                  <option value="all" className="bg-zinc-900 text-white">
                    All Same-Day Repairs (Everything)
                  </option>
                  {REPAIR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-zinc-900 text-white">
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px bg-zinc-700 my-2" />

            {/* Suburb / Postcode Input */}
            <div className="md:col-span-4 relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block px-3 pt-1">
                Suburb or Postcode
              </label>
              <div className="flex items-center px-3 py-1.5">
                <MapPin className="h-4 w-4 text-amber-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={suburbQuery}
                  onChange={(e) => onSuburbChange(e.target.value)}
                  placeholder={`e.g. ${currentCity.popularSuburbs[0]?.name || "Chermside"}`}
                  className="w-full bg-transparent text-xs sm:text-sm font-semibold text-white placeholder:text-zinc-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Action CTA */}
            <div className="md:col-span-3 flex items-center">
              <button
                onClick={() => onOpenDispatch(selectedCategory !== "all" ? (selectedCategory as RepairCategoryId) : undefined)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-3.5 text-xs sm:text-sm font-black text-zinc-950 shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-zinc-950" />
                <span>Find Tech Today</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Click Badges for popular emergencies */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-zinc-400">
          <span className="font-semibold text-zinc-400 mr-1 text-[11px]">Popular Emergencies:</span>
          {[
            { label: "Broken Fridge", catId: "appliances" },
            { label: "Burst Pipe", catId: "plumbing" },
            { label: "Locked Out", catId: "locksmith" },
            { label: "No Power", catId: "electrical" },
            { label: "Car Battery Flat", catId: "mobile-mechanic" },
            { label: "Garage Door Stuck", catId: "garage-doors" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onSelectCategory(item.catId);
                onOpenDispatch(item.catId as RepairCategoryId);
              }}
              className="rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-[11px] text-zinc-200 hover:border-amber-400 hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Live Trust Metrics Bar */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <div className="text-amber-400 font-black text-lg sm:text-xl">148+</div>
            <div className="text-[11px] text-zinc-400 font-medium">On-Call Techs Today</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <div className="text-emerald-400 font-black text-lg sm:text-xl">&lt; 60 Mins</div>
            <div className="text-[11px] text-zinc-400 font-medium">Average Arrival Time</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <div className="text-sky-400 font-black text-lg sm:text-xl">100% Verified</div>
            <div className="text-[11px] text-zinc-400 font-medium">ABN & Police Checked</div>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
            <div className="text-purple-400 font-black text-lg sm:text-xl">12-Month</div>
            <div className="text-[11px] text-zinc-400 font-medium">Parts & Labor Warranty</div>
          </div>
        </div>
      </div>
    </div>
  );
}

