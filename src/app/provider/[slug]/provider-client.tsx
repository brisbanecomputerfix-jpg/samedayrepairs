"use client";

import * as React from "react";
import Link from "next/link";
import { RepairProvider } from "@/types";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";
import { ListBusinessModal } from "@/components/list-business-modal";
import {
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  Truck,
  ExternalLink,
  ChevronRight,
  Zap,
  DollarSign,
  Award,
} from "lucide-react";

interface ProviderClientProps {
  provider: RepairProvider;
}

export function ProviderClient({ provider }: ProviderClientProps) {
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);

  const city = AUSTRALIAN_CITIES.find((c) => c.id === provider.cityId);
  const categories = REPAIR_CATEGORIES.filter((c) =>
    provider.categoryIds.includes(c.id)
  );

  const mockReviews = [
    {
      author: "Jessica T.",
      suburb: provider.suburb,
      rating: 5,
      date: "2 days ago",
      text: "Called at 10:30 AM in a panic with a warm freezer full of groceries. Tech arrived by 11:45 AM with the exact replacement defrost sensor in his van. Excellent, honest pricing.",
    },
    {
      author: "Mark D.",
      suburb: `${provider.suburb} East`,
      rating: 5,
      date: "1 week ago",
      text: "Prompt and professional. Fixed our broken latch and quoted the exact repair before turning a screwdriver. Highly recommend their same-day service.",
    },
    {
      author: "Amanda K.",
      suburb: `${provider.suburb} North`,
      rating: 5,
      date: "3 weeks ago",
      text: "Other companies quoted 4 days wait. These guys came the same afternoon, diagnosed the fault immediately, and gave a 12-month warranty certificate.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-16 sm:pb-0">
      <Navbar
        selectedCityId={provider.cityId}
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-800 text-xs py-2.5 px-4">
        <div className="container mx-auto max-w-5xl flex items-center gap-1.5 text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#categories" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Directory
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-zinc-900 dark:text-white">
            {provider.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 flex-1">
        {/* Provider Profile Header Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>On-Duty Today</span>
                </span>

                <span className="flex items-center gap-1 text-xs font-semibold text-zinc-500">
                  <Clock className="h-3.5 w-3.5 text-amber-500" />
                  <span>Same-Day Cutoff: <strong>{provider.sameDayCutoffTime}</strong></span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white">
                {provider.name}
              </h1>
              <p className="mt-1 text-sm font-semibold text-amber-600 dark:text-amber-400">
                {provider.tagline}
              </p>

              {/* Badges row */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {provider.isAbnVerified && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1 font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>ABN: {provider.abn} (Verified)</span>
                  </span>
                )}
                {provider.isPoliceChecked && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1 font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>National Police Checked</span>
                  </span>
                )}
                {provider.isLicensed && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1 font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    <Award className="h-4 w-4 text-purple-600" />
                    <span>Licensed & $5M Insured</span>
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  <span>Based in {provider.suburb}, {provider.state} ({provider.serviceRadiusKm}km service zone)</span>
                </span>

                <span className="flex items-center gap-1 font-bold text-zinc-800 dark:text-zinc-200">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{provider.rating} / 5.0</span>
                  <span className="text-zinc-400 font-normal">({provider.reviewCount} verified reviews)</span>
                </span>
              </div>
            </div>

            {/* Quick Contact & Dispatch Box */}
            <div className="w-full md:w-80 rounded-2xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-3">
              <div className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  Upfront Diagnostic Fee
                </div>
                <div className="text-sm font-black text-amber-950 dark:text-amber-100 mt-0.5">
                  {provider.calloutPricingNote}
                </div>
              </div>

              <a
                href={`tel:${provider.phone.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-bold text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-xs dark:bg-zinc-900 dark:border-zinc-700 dark:text-white"
              >
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>Call Hotline: {provider.phone}</span>
              </a>

              <button
                onClick={() => setIsDispatchOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-zinc-950" />
                <span>Request Same-Day Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column: Bio & Features vs Coverage & Reviews */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Bio Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
              <h2 className="text-lg font-black text-zinc-950 dark:text-white mb-3">
                About {provider.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {provider.bio}
              </p>

              <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">
                  Vehicle Stock & Guarantee Highlights
                </h3>
                <div className="space-y-2">
                  {provider.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>12-Month written warranty certificate on all replaced components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Customer Reviews */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-black text-zinc-950 dark:text-white">
                    Verified Customer Reviews
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Real emergency repair feedback from local residents.
                  </p>
                </div>
                <div className="flex items-center gap-1 font-black text-amber-500 text-sm">
                  <Star className="h-4 w-4 fill-current" />
                  <span>{provider.rating} Rating</span>
                </div>
              </div>

              <div className="space-y-4">
                {mockReviews.map((rev, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-zinc-900 dark:text-white">
                          {rev.author}
                        </span>
                        <span className="text-[10px] text-zinc-400">({rev.suburb})</span>
                      </div>
                      <span className="text-[10px] text-zinc-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400 mb-2">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Coverage Suburbs */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                Service Radius & Coverage
              </h3>
              <p className="text-xs text-zinc-500 mb-4">
                Mobile vans dispatch from <strong>{provider.suburb}</strong> servicing a <strong>{provider.serviceRadiusKm}km</strong> radius.
              </p>

              <div className="space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                {city?.popularSuburbs.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between py-1 border-b border-zinc-100 dark:border-zinc-800 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-zinc-400" />
                      <span>{sub.name}</span>
                    </span>
                    <span className="text-zinc-400 font-mono">{sub.postcode}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsDispatchOpen(true)}
                className="mt-6 w-full rounded-xl bg-amber-500 py-3 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition-colors"
              >
                Dispatch to My Suburb
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDispatch={() => setIsDispatchOpen(true)}
      />

      <MobileStickyBar onOpenDispatch={() => setIsDispatchOpen(true)} />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={provider.categoryIds[0]}
        defaultCityId={provider.cityId}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}

