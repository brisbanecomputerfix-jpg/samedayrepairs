"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { HeroSearch } from "@/components/hero-search";
import { CategoryGrid } from "@/components/category-grid";
import { ProviderCard } from "@/components/provider-card";
import { TrustSection } from "@/components/trust-section";
import { SuburbDirectory } from "@/components/suburb-directory";
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
  Radio,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const [selectedCityId, setSelectedCityId] = React.useState<string>("brisbane");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [suburbQuery, setSuburbQuery] = React.useState<string>("");
  const [onDutyOnly, setOnDutyOnly] = React.useState<boolean>(true);
  const [expandedFaqIndex, setExpandedFaqIndex] = React.useState<number | null>(null);

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
        if (suburbQuery.trim()) {
          const matchSub =
            p.suburb.toLowerCase().includes(suburbQuery.toLowerCase()) ||
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
    setActiveDispatchCategory(
      catId || (selectedCategory !== "all" ? (selectedCategory as RepairCategoryId) : "appliances")
    );
    setIsDispatchOpen(true);
  };

  const selectedCategoryObj = REPAIR_CATEGORIES.find((c) => c.id === selectedCategory);

  const HOME_FAQS = [
    {
      q: "How fast can a technician arrive in Brisbane, Sydney, or Melbourne today?",
      a: "Technicians dispatched through the SameDayRepairs fleet average an arrival window between 45 and 90 minutes across all capital metros. Emergency jobs logged before the local same-day cutoff (typically 3:30 PM to 5:00 PM) are prioritized for guaranteed same-day resolution.",
    },
    {
      q: "What does the $149 - $195 diagnostic fee cover?",
      a: "The diagnostic fee covers mobile workshop van travel to your premises, thorough physical fault triage using professional testing equipment (multimeters, pressure gauges, drain cameras), and a written itemized quote. When you approve the quote and proceed with the repair on the spot, the diagnostic fee is credited directly against the final bill.",
    },
    {
      q: "Are the technicians licensed tradesmen?",
      a: "Yes. Every technician on the platform is required to hold verified Australian statutory trade qualifications—including QBCC contractor licenses in Queensland, NSW Fair Trading licences, Victorian VBA registrations, ARC Arctick refrigerant licenses, and minimum $20M Public Liability insurance.",
    },
    {
      q: "Do vans carry genuine replacement parts?",
      a: "Yes. Our mobile workshop fleet carries fast-moving genuine OEM spare parts for major Australian brands—including Samsung, LG, Fisher & Paykel, Bosch, Westinghouse, Rheem, Clipsal, and Lockwood. Over 85% of repair calls are diagnosed and fixed during the very first visit.",
    },
    {
      q: "How do I pay, and will I receive a formal tax invoice?",
      a: "All technicians carry mobile EFTPOS card terminals accepting Visa, Mastercard, EFTPOS, Apple Pay, and Google Pay. You never need to hand over cash advances. An itemized digital tax invoice showing the business's verified ABN and GST is generated on site for your warranty, rental property ledger, or home insurance claim.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Top Navbar */}
      <Navbar
        selectedCityId={selectedCityId}
        onSelectCity={(cId) => setSelectedCityId(cId)}
        onOpenDispatch={() => handleOpenDispatch()}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <main id="main-content" className="flex-1">
        {/* Hero with Emergency Crisis Console */}
        <HeroSearch
          selectedCityId={selectedCityId}
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          suburbQuery={suburbQuery}
          onSuburbChange={(q) => setSuburbQuery(q)}
          onOpenDispatch={handleOpenDispatch}
        />

        {/* 3-STEP REASSURANCE STRIP */}
        <div className="bg-slate-900 text-slate-100 py-6 px-4 border-y border-slate-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  01
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">1. Select Breakdown & Suburb</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Choose your repair issue. We match you with on-call vans licensed for that trade within your postcode.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  02
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">2. Tradie Phones Ahead</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    The allocated technician calls within 15 minutes to confirm ETA. Mobile vans carry common parts for a same-day fix.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="h-8 w-8 rounded-lg bg-orange-600/20 border border-orange-500/40 text-orange-400 font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  03
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">3. Fixed Diagnostic & 12-Mo Warranty</h3>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    $149 diagnostic fee credited against approved repairs. Written quotes before work, backed by 12-month parts warranties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 9 Repair Verticals Grid */}
        <div id="categories">
          <CategoryGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onOpenDispatch={handleOpenDispatch}
          />
        </div>

        {/* Live Directory Section */}
        <section className="py-14 px-4 container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 font-mono">
                  Verified Local Contractors
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-950 mt-1 tracking-tight">
                Same-Day Repair Providers in {currentCity.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {selectedCategory !== "all" ? `Category: ${selectedCategoryObj?.name} • ` : ""}
                Showing <strong>{filteredProviders.length}</strong> licensed contractors available for same-day callouts.
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setOnDutyOnly(!onDutyOnly)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  onDutyOnly
                    ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 bg-white"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Available Today Only</span>
              </button>

              {/* City Switcher */}
              <select
                id="city-switcher"
                name="city-switcher"
                aria-label="Select Australian capital city or region"
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer shadow-2xs"
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
          <div className="mt-8 rounded-xl border-2 border-amber-300 bg-amber-50 p-8 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="h-12 w-12 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center mx-auto">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">
              Need A Tech Dispatched to {suburbQuery || currentCity.name} Right Now?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto font-medium">
              No individual listing matched your specific filter, but our central dispatch fleet covers all {currentCity.name} postcodes. Broadcast your repair ticket directly to on-call mobile workshops.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handleOpenDispatch()}
                className="w-full sm:w-auto rounded-lg bg-orange-700 hover:bg-orange-800 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
              >
                Broadcast Urgent Dispatch
              </button>
              <a
                href="tel:0468991300"
                className="w-full sm:w-auto rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-100 px-5 py-2.5 text-xs font-black uppercase text-slate-900 transition-colors"
              >
                Call 0468 991 300
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Hyper-Local Suburb Directory */}
      <SuburbDirectory currentCityId={selectedCityId} />

      {/* Trust & Australian Standard Charter */}
      <TrustSection />

      {/* Frequently Asked Questions Section */}
      <section className="py-14 px-4 bg-slate-100 border-b border-slate-200">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-800 mb-1">
              <HelpCircle className="h-4 w-4" />
              <span>Consumer Clarity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Emergency Repair Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
              Upfront answers regarding arrival times, diagnostics, and Australian trade licensing.
            </p>
          </div>

          <div className="space-y-3">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-black text-sm text-slate-950 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180 text-orange-700" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need help footer */}
          <div className="mt-8 text-center text-xs text-slate-700 font-medium">
            Have a question not listed here? Talk to our emergency dispatcher at{" "}
            <a href="tel:0468991300" className="text-orange-700 font-black hover:underline">
              0468 991 300
            </a>
          </div>
        </div>
      </section>
      </main>

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
