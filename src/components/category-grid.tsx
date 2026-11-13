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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b border-slate-200">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span>
              <span>Available Emergency Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Specialized Same-Day Trade Directory
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Select a trade to view licensed local specialists with mobile workshops on call today.
            </p>
          </div>

          {selectedCategory !== "all" && (
            <button
              onClick={() => onSelectCategory("all")}
              className="text-xs font-bold text-slate-700 hover:text-orange-600 bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
            >
              ← View All Services
            </button>
          )}
        </div>

        {/* Categories Grid - Clean Professional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REPAIR_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative rounded-2xl border p-6 transition-all cursor-pointer bg-white shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isSelected
                    ? "border-slate-900 ring-2 ring-orange-500/20 shadow-md"
                    : "border-slate-200/90 hover:border-slate-300"
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 group-hover:bg-orange-50 group-hover:text-orange-600"
                      }`}
                    >
                      {getIcon(cat.iconName)}
                    </div>

                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                      {cat.badgeText}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-4 text-base font-bold text-slate-950 group-hover:text-orange-600 transition-colors">
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
                      <span className="font-medium text-[11px]">{cat.avgResponseTime}</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2 text-slate-900 font-bold text-[11px] truncate text-center">
                      {cat.typicalCalloutFee}
                    </div>
                  </div>

                  {/* Action Strip */}
                  <div className="mt-4 flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>View Trades</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDispatch(cat.id);
                      }}
                      className="text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl shadow-2xs transition-colors cursor-pointer"
                    >
                      Book Visit
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
