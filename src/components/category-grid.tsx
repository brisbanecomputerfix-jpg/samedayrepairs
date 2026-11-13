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
  ShieldCheck,
  Phone,
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
    <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-600 mb-1">
              <span className="w-2 h-2 rounded-xs bg-orange-600 inline-block"></span>
              <span>Emergency Repair Verticals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Specialized Same-Day Trade Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Vans stocked with brand-specific parts. Real-time GPS dispatch across 9 core emergency trades.
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-black uppercase tracking-wider text-slate-700 hover:text-orange-600 bg-white border border-slate-300 rounded-lg px-3 py-1.5 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              ← Show Full Fleet (All Trades)
            </button>
          )}
        </div>

        {/* Categories Grid - Industrial Utilitarian Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPAIR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-xl border-2 p-5 transition-all cursor-pointer bg-white shadow-2xs hover:shadow-md flex flex-col justify-between ${
                  isSelected
                    ? "border-slate-900 ring-2 ring-orange-500/30"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-slate-950 text-amber-400"
                          : "bg-slate-100 text-slate-800 group-hover:bg-amber-100 group-hover:text-amber-900"
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>

                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-black uppercase text-slate-700 tracking-wider border border-slate-200">
                      {cat.badgeText}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-3 text-base font-black text-slate-950 group-hover:text-orange-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div>
                  {/* Timing & Fee Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="bg-slate-50 border border-slate-200 rounded-md p-1.5 flex items-center gap-1 text-slate-700">
                      <Clock className="h-3 w-3 text-amber-600 shrink-0" />
                      <span className="font-semibold text-[10px]">{cat.avgResponseTime}</span>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-1.5 text-amber-900 font-bold text-[10px] truncate text-center">
                      {cat.typicalCalloutFee}
                    </div>
                  </div>

                  {/* Action Strip */}
                  <div className="mt-3 flex items-center justify-between pt-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View Technicians</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDispatch(cat.id);
                      }}
                      className="text-[10px] font-black uppercase tracking-wider bg-slate-950 hover:bg-slate-800 text-white px-2.5 py-1.5 rounded-md shadow-2xs transition-colors cursor-pointer"
                    >
                      Dispatch Tech
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
