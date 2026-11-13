"use client";

import * as React from "react";
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
  DollarSign,
} from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { RepairCategoryId } from "@/types";

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onOpenDispatch: (catId?: RepairCategoryId) => void;
}

export function CategoryGrid({
  selectedCategory,
  onSelectCategory,
  onOpenDispatch,
}: CategoryGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Refrigerator":
        return <Refrigerator className="h-6 w-6" />;
      case "Droplets":
        return <Droplets className="h-6 w-6" />;
      case "KeyRound":
        return <KeyRound className="h-6 w-6" />;
      case "Zap":
        return <Zap className="h-6 w-6" />;
      case "ShieldAlert":
        return <ShieldAlert className="h-6 w-6" />;
      case "Warehouse":
        return <Warehouse className="h-6 w-6" />;
      case "Wrench":
        return <Wrench className="h-6 w-6" />;
      case "Smartphone":
        return <Smartphone className="h-6 w-6" />;
      case "Home":
        return <Home className="h-6 w-6" />;
      default:
        return <Wrench className="h-6 w-6" />;
    }
  };

  return (
    <section className="py-12 px-4 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              Select Vertical
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
              Emergency & Same-Day Repair Categories
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Direct access to dedicated on-call technicians across 9 specialized repair fields.
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-bold text-amber-600 hover:underline dark:text-amber-400 self-start sm:self-auto cursor-pointer"
            >
              ← View All Categories
            </button>
          )}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPAIR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl border p-5 transition-all cursor-pointer bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md ${
                  isSelected
                    ? "border-amber-500 ring-2 ring-amber-500/20 dark:border-amber-400"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-amber-500 text-zinc-950"
                        : "bg-zinc-100 text-zinc-800 group-hover:bg-amber-500/10 group-hover:text-amber-600 dark:bg-zinc-800 dark:text-zinc-200"
                    }`}
                  >
                    {getIcon(cat.iconName)}
                  </div>

                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {cat.badgeText}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="mt-3 text-base font-bold text-zinc-950 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                {/* Timing & Callout Badges */}
                <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5 text-amber-500" />
                    <span>{cat.avgResponseTime}</span>
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{cat.typicalCalloutFee}</span>
                  </span>
                </div>

                {/* Dispatch Trigger */}
                <div className="mt-3 pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Browse Technicians</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDispatch(cat.id);
                    }}
                    className="text-[10px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-2 py-1 rounded-md dark:bg-amber-950 dark:text-amber-200 transition-colors"
                  >
                    Dispatch Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

