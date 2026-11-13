"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { HeroSearch } from "@/components/hero-search";
import { CategoryGrid } from "@/components/category-grid";
import { ProviderCard } from "@/components/provider-card";
import { TrustSection } from "@/components/trust-section";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";
import { ListBusinessModal } from "@/components/list-business-modal";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { RepairCategoryId, RepairProvider } from "@/types";
import {
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  CheckCircle2,
  Phone,
  Search,
} from "lucide-react";

export default function HomePage() {
  const [selectedCityId, setSelectedCityId] = React.useState<string>("brisbane");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [suburbQuery, setSuburbQuery] = React.useState<string>("");
  const [onDutyOnly, setOnDutyOnly] = React.useState<boolean>(true);

  // Modals
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);
  const [activeDispatchCategory, setActiveDispatchCategory] = React.useState<RepairCategoryId | undefined>();

  const currentCity = AUSTRALIAN_CITIES.find((c) => c.id === selectedCityId) || AUSTRALIAN_CITIES[0];

  // Filtering logic
  const filteredProviders = React.useMemo(() => {
    return INITIAL_PROVIDERS.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && !p.categoryIds.includes(selectedCategory as RepairCategoryId)) {
        return false;
      }

      // City filter (or show all if matches query)
      if (selectedCityId && p.cityId !== selectedCityId) {
        // If user searched for a specific suburb, check if suburb matches
        if (suburbQuery.trim()) {
          const matchSub = p.suburb.toLowerCase().includes(suburbQuery.toLowerCase()) ||
            p.postcode.includes(suburbQuery.trim());
          if (!matchSub) return false;
        } else {
          return false;
        }
      }

      // Suburb query filter
      if (suburbQuery.trim()) {
        const q = suburbQuery.toLowerCase().trim();
        const matchesSuburb =
          p.suburb.toLowerCase().includes(q) ||
          p.postcode.includes(q) ||
          p.cityId.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q);
        if (!matchesSuburb) return false;
      }

      // On duty only
      if (onDutyOnly && !p.isOnDutyToday) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedCityId, suburbQuery, onDutyOnly]);

  const handleOpenDispatch = (catId?: RepairCategoryId) => {
    setActiveDispatchCategory(catId || (selectedCategory !== "all" ? (selectedCategory as RepairCategoryId) : "appliances"));
    setIsDispatchOpen(true);
  };

  const selectedCategoryObj = REPAIR_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 pb-16 sm:pb-0">
      {/* Top Navbar */}
      <Navbar
        selectedCityId={selectedCityId}
        onSelectCity={(cId) => setSelectedCityId(cId)}
        onOpenDispatch={() => handleOpenDispatch()}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Hero with Search and Emergency Banner */}
      <HeroSearch
        selectedCityId={selectedCityId}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        suburbQuery={suburbQuery}
        onSuburbChange={(q) => setSuburbQuery(q)}
        onOpenDispatch={handleOpenDispatch}
      />

      {/* 9 Repair Verticals Grid */}
      <div id="categories">
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onOpenDispatch={handleOpenDispatch}
        />
      </div>

      {/* Live Directory Section */}
      <section className="py-12 px-4 container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Live On-Call Roster
              </span>
            </div>
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white mt-0.5">
              Verified Same-Day Technicians in {currentCity.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {selectedCategory !== "all" ? `Category: ${selectedCategoryObj?.name} • ` : ""}
              Showing <strong>{filteredProviders.length}</strong> available providers with guaranteed same-day dispatch.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setOnDutyOnly(!onDutyOnly)}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                onDutyOnly
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400"
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>On-Duty Today Only</span>
            </button>

            {/* City Switcher */}
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 cursor-pointer"
            >
              {AUSTRALIAN_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Directory Cards Grid */}
        {filteredProviders.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onOpenDispatch={(p) => handleOpenDispatch(p.categoryIds[0])}
              />
            ))}
          </div>
        ) : (
          /* Empty State with Urgent Dispatch Box */
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50/60 p-8 text-center dark:border-amber-900/50 dark:bg-amber-950/20 max-w-xl mx-auto space-y-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto dark:bg-amber-900/60 dark:text-amber-300">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-amber-950 dark:text-amber-100">
              Need Someone in {suburbQuery || currentCity.name} Right Now?
            </h3>
            <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed max-w-md mx-auto">
              No individual listing matched your specific filter, but our on-call dispatch network covers all {currentCity.name} suburbs. Broadcast your urgent repair ticket to on-duty mobile vans.
            </p>
            <button
              onClick={() => handleOpenDispatch()}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/25 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              Broadcast Urgent Dispatch Now
            </button>
          </div>
        )}
      </section>

      {/* Trust & Comparison Section */}
      <TrustSection />

      {/* Footer */}
      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDispatch={() => handleOpenDispatch()}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenDispatch={() => handleOpenDispatch()} />

      {/* Modals */}
      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={activeDispatchCategory}
        defaultCityId={selectedCityId}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
