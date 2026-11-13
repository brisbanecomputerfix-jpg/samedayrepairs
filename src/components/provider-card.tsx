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
  Truck,
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
    <div className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-slate-400">
      <div>
        {/* Top Operational Status Bar */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-100">
          {/* On-Duty Green Pulse */}
          <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-mono font-bold text-emerald-800 border border-emerald-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ON-DUTY FLEET</span>
          </div>

          {/* Same-day cutoff badge */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            <Clock className="h-3 w-3 text-orange-600" />
            <span>CUTOFF: {provider.sameDayCutoffTime}</span>
          </div>
        </div>

        {/* Business Title & Tagline */}
        <Link href={`/provider/${provider.slug}`} className="group block">
          <h3 className="text-lg font-black text-slate-950 leading-snug group-hover:text-orange-600 transition-colors flex items-center justify-between">
            <span>{provider.name}</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-orange-600" />
          </h3>
        </Link>
        <p className="text-xs font-bold text-orange-700 mt-0.5">
          {provider.tagline}
        </p>

        {/* Location & Reviews Row */}
        <div className="mt-3 flex flex-wrap items-center gap-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-1 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
            <MapPin className="h-3 w-3 text-orange-600" />
            <span>
              {provider.suburb}, {provider.state} ({provider.serviceRadiusKm}km coverage)
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-900 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span>{provider.rating}</span>
            <span className="text-slate-500 font-normal">({provider.reviewCount} verified reviews)</span>
          </div>
        </div>

        {/* Australian Compliance Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5 font-mono">
          {provider.isAbnVerified && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800 border border-slate-200">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              ABN: {provider.abn}
            </span>
          )}
          {provider.isPoliceChecked && (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-800 border border-slate-200">
              <FileCheck className="h-3 w-3 text-blue-600" />
              Police Checked
            </span>
          )}
          {provider.isLicensed && (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
              Licensed & $20M Insured
            </span>
          )}
        </div>

        {/* Bio */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed font-medium">
          {provider.bio}
        </p>

        {/* Features / On-Board Equipment */}
        <div className="mt-3 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            <Truck className="h-3 w-3 text-slate-700" />
            <span>Mobile Workshop Capabilities:</span>
          </div>
          {provider.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
              <span className="text-emerald-700 font-bold">✓</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing & High-Conversion Action Bar */}
      <div className="mt-4 pt-3 border-t border-slate-200 space-y-2.5">
        {/* Transparent Diagnostic Fee Box */}
        <div className="rounded-md bg-amber-50 border border-amber-300 p-2 text-center text-xs font-bold text-amber-950">
          <span className="font-mono text-[11px] uppercase tracking-wider text-amber-800 block">Upfront Diagnostic Callout:</span>
          <span className="text-sm font-black text-slate-950">{provider.calloutPricingNote}</span>
        </div>

        {/* Direct Phone Call & Van Dispatch Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href="tel:0468991300"
            className="flex items-center justify-center gap-1.5 rounded-lg border-2 border-emerald-600 bg-white py-2.5 text-xs font-black text-emerald-800 hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>0468 991 300</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenDispatch(provider)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 py-2.5 text-xs font-black text-white shadow-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-white" />
            <span>Dispatch Van</span>
          </button>
        </div>
      </div>
    </div>
  );
}
