"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Zap,
  ExternalLink,
  Wrench,
  FileCheck,
} from "lucide-react";
import { RepairProvider } from "@/types";
import { REPAIR_CATEGORIES } from "@/data/categories";

interface ProviderCardProps {
  provider: RepairProvider;
  onOpenDispatch: (provider: RepairProvider) => void;
}

export function ProviderCard({ provider, onOpenDispatch }: ProviderCardProps) {
  const categoryObjects = REPAIR_CATEGORIES.filter((c) =>
    provider.categoryIds.includes(c.id)
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        {/* Top Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Available Today</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Same-Day Cutoff: {provider.sameDayCutoffTime}</span>
          </div>
        </div>

        {/* Business Title & Tagline */}
        <Link href={`/provider/${provider.slug}`} className="group block">
          <h3 className="text-lg font-bold text-slate-950 group-hover:text-orange-700 transition-colors flex items-center justify-between">
            <span>{provider.name}</span>
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-orange-700" />
          </h3>
        </Link>
        <p className="text-xs font-medium text-orange-700 mt-0.5">
          {provider.tagline}
        </p>

        {/* Location & Reviews Row */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200/80">
            <MapPin className="h-3.5 w-3.5 text-orange-700 shrink-0" />
            <span>{provider.suburb}, {provider.state} ({provider.serviceRadiusKm}km radius)</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50/60 px-2.5 py-1 rounded-lg border border-amber-200/80 text-slate-900 font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" />
            <span>{provider.rating}</span>
            <span className="text-slate-500 font-normal">({provider.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Australian Compliance Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
          {provider.isAbnVerified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              ABN Verified
            </span>
          )}
          {provider.isLicensed && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-800 border border-emerald-200/60">
              Licensed & $20M Insured
            </span>
          )}
          {provider.isPoliceChecked && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
              <FileCheck className="h-3.5 w-3.5 text-blue-600" />
              Police Checked
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          {provider.bio}
        </p>

        {/* On-Board Spares & Capabilities */}
        <div className="mt-3 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5 text-slate-500" />
            <span>On-Site Workshop Capabilities:</span>
          </div>
          {provider.features.slice(0, 3).map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & Action Bar */}
      <div className="mt-5 pt-3 border-t border-slate-100 space-y-3">
        {/* Transparent Diagnostic Fee Box */}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-center text-xs">
          <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">Fixed Diagnostic Fee</span>
          <span className="text-sm font-bold text-slate-900">{provider.calloutPricingNote}</span>
        </div>

        {/* Direct Phone Call & Booking Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:0468991300"
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 py-2.5 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
          >
            <Phone className="h-3.5 w-3.5 text-orange-700" />
            <span>0468 991 300</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenDispatch(provider)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-orange-700 hover:bg-orange-800 py-2.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
