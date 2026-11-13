"use client";

import * as React from "react";
import Link from "next/link";
import {
  RepairCategory,
  RepairProvider,
  AustralianCity,
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
  AlertTriangle,
} from "lucide-react";

interface CityCategoryClientProps {
  category: RepairCategory;
  city: AustralianCity;
  providers: RepairProvider[];
  otherCities: AustralianCity[];
  faqs: CategoryFaq[];
}

export function CityCategoryClient({
  category,
  city,
  providers,
  otherCities,
  faqs,
}: CityCategoryClientProps) {
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 pb-16 sm:pb-0">
      <Navbar
        selectedCityId={city.id}
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-zinc-100 border-b border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-800 text-xs py-2.5 px-4">
        <div className="container mx-auto max-w-6xl flex items-center gap-1.5 text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/category/${category.slug}`} className="hover:text-zinc-900 dark:hover:text-zinc-200">
            {category.shortName}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-zinc-900 dark:text-white">
            {city.name} ({city.state})
          </span>
        </div>
      </div>

      {/* Local Hero Header */}
      <header className="relative bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white py-14 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[280px] bg-amber-500/10 blur-[110px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-5xl relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>On-Duty Across {city.name} Today</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Same-Day {category.name} in <br className="hidden sm:inline" />
            <span className="text-amber-400">{city.name}, {city.state}</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            Need emergency {category.shortName.toLowerCase()} assistance in {city.name}? Our GPS-dispatched fleet of licensed, insured Australian tradesmen arrive with genuine replacement parts and clear diagnostic pricing today.
          </p>

          {/* Suburbs Badge List */}
          <div className="mt-5 flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="font-bold text-zinc-300">Fast Response Zones:</span>
            {city.popularSuburbs.map((sub) => (
              <span
                key={sub.name}
                className="rounded-md border border-zinc-800 bg-zinc-900/90 px-2 py-0.5 text-zinc-200"
              >
                {sub.name} ({sub.postcode})
              </span>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>{city.name} Avg Arrival: <strong>{category.avgResponseTime}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              <span>Diagnostic Fee: <strong>{category.typicalCalloutFee}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2.5">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              <span>{city.state} Trade Licensed</span>
            </div>
          </div>

          {/* Direct CTA button */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-zinc-950" />
              <span>Dispatch {city.name} Tech Now</span>
            </button>
            <a
              href="tel:0468991300"
              className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-5 py-3 text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>Call Direct: 0468 991 300</span>
            </a>
          </div>
        </div>
      </header>

      {/* Local Provider Roster */}
      <section className="py-12 px-4 container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active in {city.name} Today</span>
            </div>
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white mt-0.5">
              Verified {category.name} in {city.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Direct phone contact and instant dispatch for residents across {city.name} and surrounding postcodes.
            </p>
          </div>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onOpenDispatch={() => setIsDispatchOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-8 text-center dark:border-amber-900/50 dark:bg-amber-950/20 max-w-xl mx-auto space-y-4">
            <Zap className="h-10 w-10 text-amber-600 mx-auto" />
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">
              Need Urgent {category.shortName} in {city.name}?
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Our on-call mobile contractor network services all postcodes across {city.name}. Request an emergency dispatch to receive an immediate arrival window.
            </p>
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20"
            >
              Dispatch Nearest {city.name} Tech
            </button>
          </div>
        )}
      </section>

      {/* Common Problems Solved */}
      <section className="py-10 px-4 bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Local Emergency Scope</span>
            </div>
            <h2 className="text-xl font-black text-zinc-950 dark:text-white">
              {category.shortName} Emergencies Fixed in {city.name}
            </h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {category.popularIssues.map((issue, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl bg-zinc-50 p-3 text-xs text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700/60"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{issue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-14 px-4 bg-white border-t border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Local Service FAQs
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              {category.shortName} in {city.name}: Common Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs"
              >
                <h3 className="text-sm font-bold text-zinc-950 dark:text-white flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{faq.question}</span>
                </h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Cities Links */}
      <section className="py-8 px-4 bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
            Also Servicing Same-Day {category.shortName} in Other Capital Cities:
          </div>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((otherCity) => (
              <Link
                key={otherCity.id}
                href={`/category/${category.slug}/${otherCity.slug}`}
                className="rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-amber-400 hover:text-amber-600 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 transition-colors flex items-center gap-1"
              >
                <MapPin className="h-3 w-3 text-amber-500" />
                <span>{otherCity.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDispatch={() => setIsDispatchOpen(true)}
      />

      <MobileStickyBar onOpenDispatch={() => setIsDispatchOpen(true)} />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={category.id}
        defaultCityId={city.id}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

