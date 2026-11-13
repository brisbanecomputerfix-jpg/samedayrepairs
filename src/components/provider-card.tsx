"use client";

import * as React from "react";
import {
  Phone,
  Clock,
  ShieldCheck,
  Star,
  MapPin,
  CheckCircle2,
  Zap,
  ExternalLink,
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
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs hover:shadow-md transition-all dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-between">
      <div>
        {/* Top Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* On-Duty Green Pulse */}
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>On-Duty Today</span>
          </div>

          {/* Same-day cutoff badge */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span>Cutoff: <strong>{provider.sameDayCutoffTime}</strong></span>
          </div>
        </div>

        {/* Business Title & Tagline */}
        <h3 className="text-lg font-black text-zinc-950 dark:text-white leading-snug">
          {provider.name}
        </h3>
        <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-0.5">
          {provider.tagline}
        </p>

        {/* Location & Reviews Row */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-zinc-400" />
            <span>
              {provider.suburb}, {provider.state} ({provider.serviceRadiusKm}km radius)
            </span>
          </div>

          <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300 font-bold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{provider.rating}</span>
            <span className="text-zinc-400 font-normal">({provider.reviewCount} reviews)</span>
          </div>
        </div>

        {/* Verified Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {provider.isAbnVerified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              ABN: {provider.abn}
            </span>
          )}
          {provider.isPoliceChecked && (
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <CheckCircle2 className="h-3 w-3 text-blue-600" />
              Police Checked
            </span>
          )}
          {provider.isLicensed && (
            <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Licensed & Insured
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {provider.bio}
        </p>

        {/* Feature bullets */}
        <div className="mt-3 space-y-1">
          {provider.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Pricing & Action Section */}
      <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
        {/* Diagnostic note */}
        <div className="rounded-lg bg-amber-50/70 p-2 text-center text-[11px] font-semibold text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
          {provider.calloutPricingNote}
        </div>

        {/* Two CTAs: Call Now & Book Same-Day */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${provider.phone.replace(/\s+/g, "")}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 bg-white py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>Call Now</span>
          </a>

          <button
            onClick={() => onOpenDispatch(provider)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-zinc-950" />
            <span>Dispatch Tech</span>
          </button>
        </div>
      </div>
    </div>
  );
}
