"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  Phone,
  Flame,
  Refrigerator,
  Droplets,
  KeyRound,
  Warehouse,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { RepairCategoryId } from "@/types";

interface HeroSearchProps {
  selectedCityId: string;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  suburbQuery: string;
  onSuburbChange: (q: string) => void;
  onOpenDispatch: () => void;
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

  const COMMON_EMERGENCIES: Array<{
    id: RepairCategoryId;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    diagnostic: string;
  }> = [
    {
      id: "appliances",
      title: "Fridge Leaking / Not Cooling",
      subtitle: "Whitegoods & freezer rescue",
      icon: Refrigerator,
      diagnostic: "$149 Diagnostic",
    },
    {
      id: "plumbing",
      title: "Burst Pipe / Severe Leak",
      subtitle: "Mains shutoff & pipe repair",
      icon: Droplets,
      diagnostic: "$149 Diagnostic",
    },
    {
      id: "locksmith",
      title: "Locked Out / Lost Keys",
      subtitle: "Residential & automotive entry",
      icon: KeyRound,
      diagnostic: "$165 Callout",
    },
    {
      id: "electrical",
      title: "Power Tripped / Switchboard",
      subtitle: "RCD safety switch failure",
      icon: Zap,
      diagnostic: "$149 Diagnostic",
    },
    {
      id: "garage-doors",
      title: "Garage Door Stuck Off-Track",
      subtitle: "Broken spring or motor jam",
      icon: Warehouse,
      diagnostic: "$160 Callout",
    },
    {
      id: "mobile-mechanic",
      title: "Car Won't Start / Battery",
      subtitle: "On-site roadside mechanic",
      icon: Flame,
      diagnostic: "$149 Callout",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50/50 border-b border-slate-200 clean-grid py-14 sm:py-18 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Verification Pill */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-700 shadow-xs max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="font-semibold text-slate-900 truncate">Australia's Verified Same-Day Trade Directory</span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="text-slate-500 hidden sm:inline">QBCC & State Licences Audited</span>
          </div>
        </div>

        {/* Clear, High-Trust Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] break-words">
            Same-Day Emergency Repairs & Trades. <br className="hidden sm:inline" />
            <span className="text-orange-600">Dispatched To Your Door Today.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find vetted, licensed Australian whitegoods mechanics, emergency plumbers, 24/7 locksmiths, and electricians on call right now across {currentCity.name}. Upfront diagnostic fees, transparent quotes, and 12-month warranties.
          </p>
        </div>

        {/* Quick Crisis Selection Cards */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Common Urgent Repairs (Same-Day Response)
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Select your issue for direct technician matching
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {COMMON_EMERGENCIES.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedCategory === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectCategory(item.id)}
                  className={`group text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-full ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/30"
                      : "bg-white hover:bg-slate-50/80 text-slate-900 border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`h-9 w-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-orange-600 text-white"
                            : "bg-slate-100 text-slate-700 group-hover:bg-slate-200"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-slate-800 text-amber-300"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.diagnostic}
                      </span>
                    </div>

                    <div
                      className={`text-xs font-bold leading-snug line-clamp-2 ${
                        isSelected ? "text-white" : "text-slate-950"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>

                  <div
                    className={`text-[11px] leading-tight mt-2 line-clamp-1 ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {item.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Location Bar */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Category Dropdown */}
            <div className="md:col-span-5 bg-slate-50/80 border border-slate-200 rounded-xl p-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1">
                Select Service
              </label>
              <div className="flex items-center mt-1">
                <Search className="h-4 w-4 text-orange-600 mr-2 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Same-Day Services</option>
                  {REPAIR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.typicalCalloutFee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Suburb / Postcode Input */}
            <div className="md:col-span-4 bg-slate-50/80 border border-slate-200 rounded-xl p-2.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1">
                Suburb or Postcode in {currentCity.name}
              </label>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 text-orange-600 mr-2 shrink-0" />
                <input
                  type="text"
                  value={suburbQuery}
                  onChange={(e) => onSuburbChange(e.target.value)}
                  placeholder="e.g. Chermside, Parramatta, South Yarra"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Search / Dispatch Action Button */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={onOpenDispatch}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 py-3.5 px-4 text-sm font-bold text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Find Available Trades</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Suburb Filters */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Popular {currentCity.name} areas:</span>
            {currentCity.popularSuburbs.slice(0, 5).map((suburb) => (
              <button
                key={suburb.name}
                type="button"
                onClick={() => onSuburbChange(suburb.name)}
                className="rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 px-2.5 py-1 text-slate-700 font-medium transition-colors cursor-pointer"
              >
                {suburb.name}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Guarantees Row */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 font-medium bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
            <Clock className="h-4 w-4 text-orange-600 shrink-0" />
            <span>Same-Day On-Site Arrival</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 font-medium bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Audited State Licences</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 font-medium bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
            <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
            <span>Upfront Diagnostic Pricing</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-700 font-medium bg-white border border-slate-200/80 rounded-xl p-3 shadow-2xs">
            <Phone className="h-4 w-4 text-amber-600 shrink-0" />
            <span>Direct Phone: 0468 991 300</span>
          </div>
        </div>

      </div>
    </section>
  );
}
