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
  FileCheck,
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <Navbar
        selectedCityId={provider.cityId}
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs py-2 px-4">
        <div className="container mx-auto max-w-5xl flex items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#categories" className="hover:text-slate-900">
            Directory
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-slate-900">
            {provider.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-8 flex-1">
        {/* Provider Profile Header Card */}
        <div className="rounded-xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-mono font-bold text-emerald-800 border border-emerald-200">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ON-DUTY FLEET</span>
                </span>

                <span className="flex items-center gap-1 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                  <Clock className="h-3.5 w-3.5 text-orange-600" />
                  <span>CUTOFF: {provider.sameDayCutoffTime}</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
                {provider.name}
              </h1>
              <p className="mt-1 text-sm font-bold text-orange-700">
                {provider.tagline}
              </p>

              {/* Badges row */}
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
                {provider.isAbnVerified && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 font-bold text-slate-800">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>ABN: {provider.abn} (Verified)</span>
                  </span>
                )}
                {provider.isPoliceChecked && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 font-bold text-slate-800">
                    <FileCheck className="h-4 w-4 text-blue-600" />
                    <span>National Police Checked</span>
                  </span>
                )}
                {provider.isLicensed && (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-200 px-2.5 py-1 font-bold text-emerald-800">
                    <Award className="h-4 w-4 text-emerald-700" />
                    <span>Licensed & $20M Insured</span>
                  </span>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span>Based in {provider.suburb}, {provider.state} ({provider.serviceRadiusKm}km radius)</span>
                </span>

                <span className="flex items-center gap-1 font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{provider.rating} / 5.0</span>
                  <span className="text-slate-500 font-normal">({provider.reviewCount} verified reviews)</span>
                </span>
              </div>
            </div>

            {/* Quick Contact & Dispatch Box */}
            <div className="w-full md:w-80 rounded-xl border-2 border-amber-300 bg-amber-50 p-5 space-y-3 shadow-2xs">
              <div className="text-center">
                <div className="text-[11px] font-mono font-black uppercase tracking-wider text-amber-800">
                  Fixed Upfront Diagnostic
                </div>
                <div className="text-sm font-black text-slate-950 mt-0.5">
                  {provider.calloutPricingNote}
                </div>
              </div>

              <a
                href={`tel:${provider.phone.replace(/\s+/g, "")}`}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 py-3 text-xs font-black uppercase tracking-wider text-white shadow-2xs transition-colors"
              >
                <Phone className="h-4 w-4 fill-white" />
                <span>Call Van: 0468 991 300</span>
              </a>

              <button
                type="button"
                onClick={() => setIsDispatchOpen(true)}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md active:scale-98 transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Request Same-Day Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column: Bio & Features vs Coverage & Reviews */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Bio Card */}
            <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-2xs">
              <h2 className="text-lg font-black text-slate-950 mb-3 tracking-tight">
                About {provider.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {provider.bio}
              </p>

              <div className="mt-6 pt-5 border-t border-slate-200">
                <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-slate-700" />
                  <span>Mobile Workshop Stock & Guarantee</span>
                </h3>
                <div className="space-y-2">
                  {provider.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>12-Month written warranty certificate on all replaced OEM components</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Customer Reviews */}
            <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">
                    Verified Customer Reviews
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Emergency repair feedback from local residents.
                  </p>
                </div>
                <div className="flex items-center gap-1 font-black text-slate-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 text-sm">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{provider.rating} Rating</span>
                </div>
              </div>

              <div className="space-y-3">
                {mockReviews.map((rev, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs text-slate-950">
                          {rev.author}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">({rev.suburb})</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-500 mb-2">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Coverage Suburbs */}
          <div className="space-y-6">
            <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-2xs">
              <h3 className="text-xs font-mono font-black uppercase tracking-wider text-orange-600 mb-2">
                Service Radius & Coverage
              </h3>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                Mobile vans dispatch from <strong>{provider.suburb}</strong> servicing a <strong>{provider.serviceRadiusKm}km</strong> radius.
              </p>

              <div className="space-y-1.5 text-xs text-slate-700">
                {city?.popularSuburbs.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between py-1 border-b border-slate-100 text-[11px] font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-orange-600" />
                      <span>{sub.name}</span>
                    </span>
                    <span className="text-slate-400 font-mono">{sub.postcode}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsDispatchOpen(true)}
                className="mt-6 w-full rounded-lg bg-slate-950 hover:bg-slate-800 py-3 text-xs font-black uppercase tracking-wider text-amber-300 shadow-xs transition-colors cursor-pointer"
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
