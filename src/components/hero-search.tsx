"use client";

import * as React from "react";
import {
  Search,
  MapPin,
  Zap,
  Clock,
  ShieldCheck,
  Phone,
  Flame,
  Droplets,
  Refrigerator,
  KeyRound,
  Warehouse,
  Wind,
  CheckCircle2,
  AlertTriangle,
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

  // Common crisis triggers with real trade symptoms
  const CRISIS_TRIGGERS: {
    id: RepairCategoryId;
    title: string;
    symptom: string;
    icon: React.ComponentType<{ className?: string }>;
    diagnostic: string;
  }[] = [
    {
      id: "appliances",
      title: "Fridge Leaking / Food Warming",
      symptom: "Compressor humming, ice buildup, milk spoiling",
      icon: Refrigerator,
      diagnostic: "From $149",
    },
    {
      id: "plumbing",
      title: "Burst Pipe / Mains Flooding",
      symptom: "Water spraying, no hot water, overflowing drain",
      icon: Droplets,
      diagnostic: "From $189",
    },
    {
      id: "locksmith",
      title: "Locked Out of House / Snapped Key",
      symptom: "Rapid non-destructive door entry",
      icon: KeyRound,
      diagnostic: "From $165",
    },
    {
      id: "electrical",
      title: "Power Tripped / Switchboard Burning",
      symptom: "Safety switch won't reset, spark risk",
      icon: Zap,
      diagnostic: "From $175",
    },
    {
      id: "garage-doors",
      title: "Garage Door Stuck / Car Trapped",
      symptom: "Broken torsion spring, cable off track",
      icon: Warehouse,
      diagnostic: "From $160",
    },
    {
      id: "mobile-mechanic",
      title: "Car Won't Start / Flat Battery",
      symptom: "Rapid roadside mobile van dispatch",
      icon: Flame,
      diagnostic: "From $149",
    },
  ];

  return (
    <div className="relative bg-white border-b border-slate-200 industrial-grid pt-8 pb-14 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Real-time Fleet Telemetry Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-mono font-medium text-slate-100 shadow-xs border border-slate-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-amber-400 font-bold">LIVE TELEMETRY:</span>
            <span>Vans active in {currentCity.name} metro</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">ETA ~45 mins</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 border border-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>State Trade Licences Audited</span>
          </div>
        </div>

        {/* High-Impact Authoritative Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Urgent Same-Day Repairs & Trades. <br className="hidden sm:inline" />
            <span className="text-orange-600">Dispatched To Your Door Today.</span>
          </h1>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Direct dispatch for licensed, insured Australian whitegoods specialists, emergency plumbers, 24/7 locksmiths, and electricians. Fixed diagnostic pricing—no multi-day bidding games.
          </p>
        </div>

        {/* TACTILE EMERGENCY CRISIS SELECTOR */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-orange-600 rounded-xs"></span>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                1-Tap Urgent Crisis Intake
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
              Select your emergency for prioritized fleet dispatch
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {CRISIS_TRIGGERS.map((crisis) => {
              const Icon = crisis.icon;
              const isSelected = selectedCategory === crisis.id;

              return (
                <button
                  key={crisis.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(crisis.id);
                  }}
                  className={`group text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-full ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-orange-500/50"
                      : "bg-white hover:bg-slate-50 text-slate-900 border-slate-300 hover:border-slate-400 shadow-2xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`h-7 w-7 rounded-md flex items-center justify-center ${
                          isSelected
                            ? "bg-orange-600 text-white"
                            : "bg-slate-100 text-slate-800 group-hover:bg-slate-200"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded-sm ${
                          isSelected
                            ? "bg-slate-800 text-amber-300"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {crisis.diagnostic}
                      </span>
                    </div>

                    <div
                      className={`text-xs font-black leading-snug line-clamp-2 ${
                        isSelected ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {crisis.title}
                    </div>
                  </div>

                  <div
                    className={`text-[10px] leading-tight mt-2 line-clamp-1 ${
                      isSelected ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {crisis.symptom}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* INDUSTRIAL DISPATCH CONSOLE SEARCH BAR */}
        <div className="mt-6 rounded-xl border-2 border-slate-900 bg-white p-3 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
            
            {/* Category Dropdown */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block px-1">
                Repair Vertical / Trade
              </label>
              <div className="flex items-center mt-0.5">
                <Search className="h-4 w-4 text-orange-600 mr-2 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => onSelectCategory(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-black text-slate-900 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Same-Day Trades (Full Fleet)</option>
                  {REPAIR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.typicalCalloutFee})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Suburb Search */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-lg p-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block px-1">
                Suburb or Postcode in {currentCity.name}
              </label>
              <div className="flex items-center mt-0.5">
                <MapPin className="h-4 w-4 text-orange-600 mr-2 shrink-0" />
                <input
                  type="text"
                  value={suburbQuery}
                  onChange={(e) => onSuburbChange(e.target.value)}
                  placeholder={`e.g. ${currentCity.popularSuburbs[0]?.name || "Chermside"} or 4000`}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                >
                </input>
              </div>
            </div>

            {/* Emergency Dispatch Button */}
            <div className="md:col-span-3">
              <button
                type="button"
                onClick={() =>
                  onOpenDispatch(
                    selectedCategory !== "all" ? (selectedCategory as RepairCategoryId) : undefined
                  )
                }
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-98 text-white px-4 py-3.5 text-xs sm:text-sm font-black shadow-md uppercase tracking-wider transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Instant Van Dispatch</span>
              </button>
            </div>
          </div>

          {/* Quick Suburb Shortcut Pills */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-600 px-1">
            <span className="font-bold text-slate-700">Priority Hubs:</span>
            {currentCity.popularSuburbs.slice(0, 6).map((sub) => (
              <button
                key={sub.postcode}
                type="button"
                onClick={() => onSuburbChange(sub.name)}
                className="rounded-md bg-slate-100 hover:bg-slate-200 px-2 py-0.5 font-semibold text-slate-800 transition-colors cursor-pointer"
              >
                {sub.name} ({sub.postcode})
              </button>
            ))}
            {suburbQuery && (
              <button
                type="button"
                onClick={() => onSuburbChange("")}
                className="text-orange-600 font-bold hover:underline ml-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Direct Phone Dispatch Hotline Callout */}
        <div className="mt-6 rounded-lg bg-slate-900 text-white p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md border-l-4 border-amber-500">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 animate-bounce" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-400">
                Direct Emergency Phone Line
              </div>
              <div className="text-xs text-slate-300">
                Facing an urgent flood, lock-out, or food crisis? Talk directly to our duty dispatcher.
              </div>
            </div>
          </div>

          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-sm font-black tracking-wider uppercase transition-colors shrink-0 shadow-xs"
          >
            <Phone className="h-4 w-4 fill-white" />
            <span>0468 991 300</span>
          </a>
        </div>

        {/* 4 Australian Consumer Guarantees */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
            <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-slate-950">QBCC / Fair Trading</div>
              <div className="text-[11px] text-slate-500 leading-tight">Audited state trade licences</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
            <Clock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-slate-950">Under 90 Min Arrival</div>
              <div className="text-[11px] text-slate-500 leading-tight">Same-day cutoff guaranteed</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
            <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-slate-950">Fixed Diagnostic Fee</div>
              <div className="text-[11px] text-slate-500 leading-tight">Credited toward repair</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
            <Zap className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-slate-950">12-Month Guarantee</div>
              <div className="text-[11px] text-slate-500 leading-tight">Parts & labor backed</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
