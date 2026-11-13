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
import { SuburbDirectory } from "@/components/suburb-directory";
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

interface CategoryClientProps {
  category: RepairCategory;
  cities: AustralianCity[];
  providers: RepairProvider[];
  faqs: CategoryFaq[];
}

export function CategoryClient({
  category,
  cities,
  providers,
  faqs,
}: CategoryClientProps) {
  const [selectedCityId, setSelectedCityId] = React.useState<string>("all");
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);

  const filteredProviders = React.useMemo(() => {
    if (selectedCityId === "all") return providers;
    return providers.filter((p) => p.cityId === selectedCityId);
  }, [providers, selectedCityId]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <Navbar
        selectedCityId="brisbane"
        onSelectCity={(cId) => setSelectedCityId(cId)}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs py-2 px-4">
        <div className="container mx-auto max-w-6xl flex items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#categories" className="hover:text-slate-900">
            Categories
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-slate-900">
            {category.name}
          </span>
        </div>
      </div>

      {/* Category Hero Header - Industrial Emergency Command */}
      <header className="relative bg-white border-b border-slate-200 py-12 px-4 industrial-grid">
        <div className="container mx-auto max-w-5xl relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-1 text-xs font-mono font-medium text-slate-100 mb-4 border border-slate-700 shadow-2xs">
            <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="text-amber-400 font-bold">NATIONAL FLEET:</span>
            <span>Australia-Wide Same-Day Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
            Same-Day {category.name}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-medium">
            {category.description} On-call licensed Australian technicians ready for emergency dispatch today with zero multi-day waiting games.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <Clock className="h-4 w-4 text-orange-600" />
              <span>Avg Response: <strong>{category.avgResponseTime}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 text-amber-950 shadow-2xs">
              <DollarSign className="h-4 w-4 text-emerald-700" />
              <span>Typical Callout: <strong>{category.typicalCalloutFee}</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% ABN Verified & Insured</span>
            </div>
          </div>

          {/* Direct CTA button */}
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Dispatch On-Call Tech Now</span>
            </button>
            <a
              href="tel:0468991300"
              className="flex items-center gap-2 rounded-lg border-2 border-emerald-600 bg-white px-5 py-3 text-xs font-black uppercase text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>Call Hotline: 0468 991 300</span>
            </a>
          </div>
        </div>
      </header>

      {/* Select City Hubs */}
      <section className="py-8 px-4 bg-zinc-50 border-b border-zinc-200 dark:bg-zinc-900/40 dark:border-zinc-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
            Select Your City for Local Suburb Roster:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCityId("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                selectedCityId === "all"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300"
              }`}
            >
              All Australia ({providers.length})
            </button>

            {cities.map((city) => (
              <Link
                key={city.id}
                href={`/category/${category.slug}/${city.slug}`}
                className="rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 hover:border-amber-400 hover:text-amber-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white transition-all flex items-center gap-1.5"
              >
                <MapPin className="h-3 w-3 text-amber-500" />
                <span>{city.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems Checklist */}
      <section className="py-10 px-4 container mx-auto max-w-6xl">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span>Common Urgent Symptoms Fixed Same-Day</span>
          </div>
          <h2 className="text-xl font-black text-zinc-950 dark:text-white">
            Issues Our {category.shortName} Technicians Solve Daily
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
      </section>

      {/* Verified Providers List */}
      <section className="py-6 px-4 container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">
              On-Duty {category.name} Providers
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Showing {filteredProviders.length} verified Australian technicians with guaranteed same-day availability.
            </p>
          </div>
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onOpenDispatch={() => setIsDispatchOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-xs text-zinc-500">
              No registered provider in this specific filter right now. Broadcast your urgent ticket to our on-call network.
            </p>
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="mt-3 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-zinc-950 hover:bg-amber-400"
            >
              Broadcast Urgent Dispatch
            </button>
          </div>
        )}
      </section>

      {/* Hyper-Local Suburb Coverage for this Category */}
      <SuburbDirectory categorySlug={category.slug} />

      {/* Category FAQs (SEO Schema-Powered) */}
      <section className="py-14 px-4 bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-900/50 dark:border-zinc-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              Everything You Need to Know About Same-Day {category.shortName}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-xs"
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

      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDispatch={() => setIsDispatchOpen(true)}
      />

      <MobileStickyBar onOpenDispatch={() => setIsDispatchOpen(true)} />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={category.id}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

