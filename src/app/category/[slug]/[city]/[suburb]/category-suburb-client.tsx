"use client";

import * as React from "react";
import Link from "next/link";
import {
  RepairCategory,
  RepairProvider,
  AustralianCity,
  Suburb,
} from "@/types";
import { Navbar } from "@/components/navbar";
import { ProviderCard } from "@/components/provider-card";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";
import { ListBusinessModal } from "@/components/list-business-modal";
import { CategoryFaq } from "@/data/faqs";
import {
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Phone,
  ArrowRight,
  Wrench,
} from "lucide-react";

interface CategorySuburbClientProps {
  category: RepairCategory;
  city: AustralianCity;
  suburb: Suburb;
  providers: RepairProvider[];
  nearbySuburbsList: Suburb[];
  faqs: CategoryFaq[];
}

export function CategorySuburbClient({
  category,
  city,
  suburb,
  providers,
  nearbySuburbsList,
  faqs,
}: CategorySuburbClientProps) {
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <Navbar
        selectedCityId={city.id}
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs py-2.5 px-4">
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/category/${category.slug}`} className="hover:text-slate-900 transition-colors">
            {category.shortName}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/category/${category.slug}/${city.slug}`} className="hover:text-slate-900 transition-colors">
            {city.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-950 font-bold">
            {suburb.name} ({suburb.postcode})
          </span>
        </div>
      </div>

      {/* Suburb Hero Section */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Same-Day Response Active in {suburb.name} ({suburb.postcode})</span>
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {suburb.region} • {city.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Same-Day {category.name} in <br className="hidden sm:inline" />
            <span className="text-orange-700">{suburb.name}, {city.state} {suburb.postcode}</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Need urgent {category.shortName.toLowerCase()} repairs in {suburb.name}? Our mobile workshop vans are equipped with genuine replacement parts and arrive ready to diagnose, quote, and complete your repair on the same day. Upfront pricing with no surprise after-hours fees.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <Clock className="h-4 w-4 text-orange-700" />
              <span>{suburb.name} Arrival: <strong>45 – 60 mins</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-amber-950 shadow-2xs">
              <DollarSign className="h-4 w-4 text-emerald-700" />
              <span>Diagnostic Cap: <strong>{category.typicalCalloutFee}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{city.state} Trade Licenced & $20M Insured</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold px-6 py-3.5 text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Request Dispatch to {suburb.name}</span>
            </button>

            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-600 text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100 font-bold px-6 py-3.5 text-xs transition-colors shadow-2xs"
            >
              <Phone className="h-4 w-4 text-emerald-700" />
              <span>Call Direct: 0468 991 300</span>
            </a>

            <Link
              href={`/suburbs/${city.slug}/${suburb.slug}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-3 text-xs transition-colors shadow-2xs"
            >
              <span>All Trades in {suburb.name}</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        
        {/* Common Emergencies in this suburb */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-950">
              Common {category.shortName} Emergencies Dispatched to {suburb.name}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Our technicians carry universal stock for immediate on-site restoration across {suburb.name} and {suburb.region}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {category.popularIssues.map((issue, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/60"
              >
                <div className="h-7 w-7 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench className="h-3.5 w-3.5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    {issue}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Same-day resolution • Genuine parts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Local Verified Contractors */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Verified {category.shortName} Technicians Servicing {suburb.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Audited ABN, valid state trade licences, and verified public liability insurance.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
              {providers.length} Licensed Contractors Active
            </span>
          </div>

          {providers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  onOpenDispatch={() => setIsDispatchOpen(true)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <ShieldCheck className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-950">
                GPS Fleet Dispatched to {suburb.name}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 mb-5">
                Our central dispatch hub allocates the closest available mobile van to {suburb.name} ({suburb.postcode}) based on real-time traffic and parts inventory.
              </p>
              <button
                onClick={() => setIsDispatchOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-700 hover:bg-orange-800 text-white font-bold px-5 py-2.5 text-xs shadow-sm cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Request Rapid Dispatch Now</span>
              </button>
            </div>
          )}
        </section>

        {/* Nearby Suburbs Fast-Links Grid */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">
                Also Servicing Surrounding {suburb.region} Suburbs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Same-day emergency {category.shortName.toLowerCase()} coverage across postcodes adjacent to {suburb.name}.
              </p>
            </div>
            <Link
              href={`/category/${category.slug}/${city.slug}`}
              className="text-xs font-bold text-orange-700 hover:text-orange-800 flex items-center gap-1"
            >
              <span>View All {city.name}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {nearbySuburbsList.map((nearSub) => (
              <Link
                key={nearSub.slug}
                href={`/category/${category.slug}/${city.slug}/${nearSub.slug}`}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-orange-500 hover:text-orange-700 transition-all text-xs font-medium flex items-center justify-between group"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-700 shrink-0" />
                  <span className="truncate">{nearSub.name}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                  {nearSub.postcode}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Suburb FAQ Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
              <HelpCircle className="h-4 w-4 text-orange-700" />
              <span>Local Frequently Asked Questions</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              {category.shortName} Repairs in {suburb.name} FAQ
            </h3>
          </div>

          <div className="divide-y divide-slate-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                  <span className="text-orange-700 font-mono">Q:</span>
                  <span>{faq.question.replace(/\?$/, "")} in {suburb.name}?</span>
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <MobileStickyBar
        onOpenDispatch={() => setIsDispatchOpen(true)}
        suburbText={`${suburb.name} (${suburb.postcode})`}
      />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={category.id}
        defaultCityId={city.id}
        defaultSuburb={suburb.name}
        defaultPostcode={suburb.postcode}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
