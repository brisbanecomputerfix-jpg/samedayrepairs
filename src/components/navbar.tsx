"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, Phone, PlusCircle, MapPin, ShieldCheck, Menu, X } from "lucide-react";
import { AUSTRALIAN_CITIES } from "@/data/locations";

interface NavbarProps {
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  onOpenDispatch: () => void;
  onOpenRegister: () => void;
}

export function Navbar({
  selectedCityId,
  onSelectCity,
  onOpenDispatch,
  onOpenRegister,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const currentCity = AUSTRALIAN_CITIES.find((c) => c.id === selectedCityId) || AUSTRALIAN_CITIES[0];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
      {/* Top Emergency Announcement Ribbon */}
      <div className="bg-amber-500 text-zinc-950 px-3 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
            <span>
              <strong>Australia-Wide Same-Day Guarantee:</strong> Technicians currently on-call across {currentCity.name}.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> ABN Verified Trades
            </span>
            <span className="text-zinc-700 dark:text-zinc-400">•</span>
            <span>No Flake Guarantee</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-zinc-950 text-zinc-950" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">
                SameDay<span className="text-amber-500">Repairs</span>
              </span>
              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-600 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                .com.au
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-medium -mt-1 hidden sm:block">
              Australia's Urgent Repair Network
            </span>
          </div>
        </Link>

        {/* Location Selector */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/80 px-3 py-1.5 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
          <MapPin className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-zinc-500 text-[11px]">Region:</span>
          <select
            value={selectedCityId}
            onChange={(e) => onSelectCity(e.target.value)}
            className="bg-transparent font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-hidden cursor-pointer"
          >
            {AUSTRALIAN_CITIES.map((c) => (
              <option key={c.id} value={c.id} className="dark:bg-zinc-900">
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* List Your Business Button */}
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-amber-600 dark:text-zinc-300 dark:hover:text-amber-400 transition-colors px-2 py-1.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>List Your Business (Free)</span>
          </button>

          {/* Emergency Hotline Button */}
          <a
            href="tel:1300726339"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 hover:border-amber-400 hover:bg-amber-50/50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 transition-all shadow-xs"
          >
            <Phone className="h-3.5 w-3.5 text-emerald-600" />
            <span>1300 726 339</span>
          </a>

          {/* Urgent Dispatch CTA */}
          <button
            onClick={onOpenDispatch}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-zinc-950" />
            <span>Dispatch Tech Today</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenDispatch}
            className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-[11px] font-bold text-zinc-950 flex items-center gap-1"
          >
            <Zap className="h-3 w-3 fill-zinc-950" />
            <span>Dispatch</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-white p-4 space-y-3 dark:border-zinc-800 dark:bg-zinc-950 animate-in slide-in-from-top-2">
          <div>
            <label className="text-[11px] font-medium text-zinc-500 block mb-1">Select Your Region:</label>
            <select
              value={selectedCityId}
              onChange={(e) => {
                onSelectCity(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {AUSTRALIAN_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="tel:1300726339"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-100 p-2.5 text-xs font-bold text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
            >
              <Phone className="h-4 w-4 text-emerald-600" />
              <span>Call Emergency Hotline: 1300 726 339</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-300 p-2.5 text-xs font-bold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
            >
              <PlusCircle className="h-4 w-4 text-amber-500" />
              <span>Are You a Tradie? List Your Business</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

