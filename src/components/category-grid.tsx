"use client";

import * as React from "react";
import Link from "next/link";
import {
  Refrigerator,
  Droplets,
  KeyRound,
  Zap,
  ShieldAlert,
  Warehouse,
  Wrench,
  Smartphone,
  Home,
  ArrowRight,
  Clock,
  ShieldCheck,
  Phone,
  Flame,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { RepairCategoryId } from "@/types";

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onOpenDispatch: (catId?: RepairCategoryId) => void;
}

const CATEGORY_THEMES: Record<
  string,
  {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    glow: string;
    accent: string;
    badgeBg: string;
    badgeText: string;
    dot: string;
  }
> = {
  appliances: {
    bg: "bg-sky-50/80",
    text: "text-sky-600",
    border: "border-sky-200/80",
    hoverBg: "group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(2,132,199,0.25)]",
    accent: "group-hover:text-sky-600",
    badgeBg: "bg-sky-50 border-sky-200",
    badgeText: "text-sky-700",
    dot: "bg-sky-500",
  },
  plumbing: {
    bg: "bg-blue-50/80",
    text: "text-blue-600",
    border: "border-blue-200/80",
    hoverBg: "group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(37,99,235,0.25)]",
    accent: "group-hover:text-blue-600",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-700",
    dot: "bg-blue-500",
  },
  locksmith: {
    bg: "bg-amber-50/80",
    text: "text-amber-600",
    border: "border-amber-200/80",
    hoverBg: "group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500",
    glow: "group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    accent: "group-hover:text-amber-600",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-700",
    dot: "bg-amber-500",
  },
  electrical: {
    bg: "bg-orange-50/80",
    text: "text-orange-600",
    border: "border-orange-200/80",
    hoverBg: "group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(234,88,12,0.25)]",
    accent: "group-hover:text-orange-600",
    badgeBg: "bg-orange-50 border-orange-200",
    badgeText: "text-orange-700",
    dot: "bg-orange-500",
  },
  glazing: {
    bg: "bg-emerald-50/80",
    text: "text-emerald-600",
    border: "border-emerald-200/80",
    hoverBg: "group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(5,150,105,0.25)]",
    accent: "group-hover:text-emerald-600",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "garage-doors": {
    bg: "bg-violet-50/80",
    text: "text-violet-600",
    border: "border-violet-200/80",
    hoverBg: "group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]",
    accent: "group-hover:text-violet-600",
    badgeBg: "bg-violet-50 border-violet-200",
    badgeText: "text-violet-700",
    dot: "bg-violet-500",
  },
  "mobile-mechanic": {
    bg: "bg-rose-50/80",
    text: "text-rose-600",
    border: "border-rose-200/80",
    hoverBg: "group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(225,29,72,0.25)]",
    accent: "group-hover:text-rose-600",
    badgeBg: "bg-rose-50 border-rose-200",
    badgeText: "text-rose-700",
    dot: "bg-rose-500",
  },
  "tech-repairs": {
    bg: "bg-indigo-50/80",
    text: "text-indigo-600",
    border: "border-indigo-200/80",
    hoverBg: "group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(79,70,229,0.25)]",
    accent: "group-hover:text-indigo-600",
    badgeBg: "bg-indigo-50 border-indigo-200",
    badgeText: "text-indigo-700",
    dot: "bg-indigo-500",
  },
  roofing: {
    bg: "bg-teal-50/80",
    text: "text-teal-600",
    border: "border-teal-200/80",
    hoverBg: "group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600",
    glow: "group-hover:shadow-[0_0_20px_rgba(13,148,136,0.25)]",
    accent: "group-hover:text-teal-600",
    badgeBg: "bg-teal-50 border-teal-200",
    badgeText: "text-teal-700",
    dot: "bg-teal-500",
  },
};

export function CategoryGrid({
  selectedCategory,
  onSelectCategory,
  onOpenDispatch,
}: CategoryGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Refrigerator":
        return <Refrigerator className="h-5 w-5" />;
      case "Droplets":
        return <Droplets className="h-5 w-5" />;
      case "KeyRound":
        return <KeyRound className="h-5 w-5" />;
      case "Zap":
        return <Zap className="h-5 w-5" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-5 w-5" />;
      case "Warehouse":
        return <Warehouse className="h-5 w-5" />;
      case "Wrench":
        return <Wrench className="h-5 w-5" />;
      case "Smartphone":
        return <Smartphone className="h-5 w-5" />;
      case "Home":
        return <Home className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-orange-700 inline-block animate-pulse"></span>
              <span>Interactive Trade Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Specialized Same-Day Emergency Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select a trade to view licensed specialists with mobile workshops on call across your metro radius.
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-bold text-slate-700 hover:text-orange-700 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              ← View All Services
            </button>
          )}
        </div>

        {/* Categories Grid - Interactive High-Tactile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPAIR_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            const theme =
              CATEGORY_THEMES[cat.id] || CATEGORY_THEMES.appliances;
            const isTiltLeft = idx % 2 === 0;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 cursor-pointer bg-white flex flex-col justify-between select-none ${
                  isSelected
                    ? "border-slate-900 ring-2 ring-orange-500/30 shadow-lg scale-[1.01]"
                    : "border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Top Badge & Interactive Icon Container */}
                  <div className="flex items-start justify-between gap-3">
                    
                    {/* Interactive Icon with Category-Matched Glow & Tilt */}
                    <div className="relative">
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-300 ease-out transform ${
                          isTiltLeft
                            ? "group-hover:-rotate-6"
                            : "group-hover:rotate-6"
                        } group-hover:scale-110 active:scale-95 ${
                          isSelected
                            ? "bg-slate-900 text-white border-slate-900 shadow-md"
                            : `${theme.bg} ${theme.text} ${theme.border} ${theme.hoverBg} ${theme.glow}`
                        }`}
                      >
                        {getIcon(cat.iconName)}
                      </div>

                      {/* Live Online Ping Beacon */}
                      <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${theme.dot}`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-3 w-3 border-2 border-white shadow-2xs ${theme.dot}`}
                        />
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                          isSelected
                            ? "bg-slate-900 text-amber-300 border-slate-800"
                            : `${theme.badgeBg} ${theme.badgeText}`
                        }`}
                      >
                        {cat.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`mt-4 text-base font-bold text-slate-950 transition-colors ${theme.accent}`}
                  >
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div>
                  {/* Timing & Fee Strip */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 flex items-center gap-1.5 text-slate-700">
                      <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-[11px] truncate">
                        {cat.avgResponseTime}
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-slate-900 font-bold text-[11px] truncate text-center">
                      {cat.typicalCalloutFee}
                    </div>
                  </div>

                  {/* Action Strip */}
                  <div className="mt-4 flex items-center justify-between pt-1">
                    <Link
                      href={`/category/${cat.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-orange-700 hover:text-orange-800 transition-colors flex items-center gap-1 group/link"
                    >
                      <span>Explore Hub</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDispatch(cat.id);
                      }}
                      className="text-xs font-bold bg-slate-900 hover:bg-orange-700 text-white px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1.5"
                    >
                      <span>Book Visit</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Verification Reassurance Strip */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="text-slate-700">
              <strong className="text-slate-900">100% Australian Licensed Contractors:</strong> Every trade icon connects to verified QBCC, Fair Trading, and state-certified technicians.
            </div>
          </div>

          <Link
            href="/trade-charter"
            className="text-orange-700 font-bold hover:underline shrink-0 flex items-center gap-1"
          >
            <span>Read Trade Charter & Standards</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
