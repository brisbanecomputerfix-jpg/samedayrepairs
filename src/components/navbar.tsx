"use client";

import * as React from "react";
import Link from "next/link";
import {
  Zap,
  Phone,
  MapPin,
  ShieldCheck,
  Menu,
  X,
  User,
  LogIn,
  Wrench,
  Clock,
  ArrowRight,
} from "lucide-react";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { useAuth } from "@/context/auth-context";

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
  const { user, role, isHydrated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const currentCity = AUSTRALIAN_CITIES.find((c) => c.id === selectedCityId) || AUSTRALIAN_CITIES[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Reassurance Ribbon */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Same-Day Availability: <strong className="text-white">{currentCity.name} Metro</strong></span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>QBCC & Fair Trading Licensed Trades</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Average arrival window: 45–75 mins
            </span>
            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>0468 991 300</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm group-hover:bg-orange-700 transition-colors">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-950">
                SameDay<span className="text-orange-600">Repairs</span>
              </span>
              <span className="text-xs font-bold text-slate-400 tracking-normal">
                .com.au
              </span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
              Australia's Verified Emergency Trade Directory
            </span>
          </div>
        </Link>

        {/* Metro Region Selector */}
        <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-700">
          <MapPin className="h-4 w-4 text-orange-600 shrink-0" />
          <span className="text-slate-500 font-medium">Service Area:</span>
          <select
            value={selectedCityId}
            onChange={(e) => onSelectCity(e.target.value)}
            className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
          >
            {AUSTRALIAN_CITIES.map((c) => (
              <option key={c.id} value={c.id} className="bg-white text-slate-900">
                {c.name} ({c.state})
              </option>
            ))}
          </select>
        </div>

        {/* Right Navigation & CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* User / Tradie Portal Indicator */}
          {isHydrated && user ? (
            <Link
              href={role === "seeker" ? "/portal/seeker" : "/portal/provider"}
              className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800"
            >
              {role === "seeker" ? (
                <>
                  <User className="h-4 w-4 text-orange-600" />
                  <span>{(user as any).name?.split(" ")[0] || "Account"}</span>
                </>
              ) : (
                <>
                  <Wrench className="h-4 w-4 text-orange-600" />
                  <span>{(user as any).contactName?.split(" ")[0] || "Contractor"}</span>
                </>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors shadow-2xs"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              <span>Portal Login</span>
            </Link>
          )}

          {/* Tradie Partner Button */}
          <button
            onClick={onOpenRegister}
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <span>Contractor Sign-Up</span>
          </button>

          {/* Direct Phone Call */}
          <a
            href="tel:0468991300"
            className="hidden lg:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <Phone className="h-3.5 w-3.5 text-orange-600" />
            <span>0468 991 300</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={onOpenDispatch}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Request Same-Day Repair</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="tel:0468991300"
            className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in fade-in">
          {/* Region selector mobile */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs">
            <MapPin className="h-4 w-4 text-orange-600 shrink-0" />
            <span className="text-slate-500 font-medium">Region:</span>
            <select
              value={selectedCityId}
              onChange={(e) => onSelectCity(e.target.value)}
              className="bg-transparent font-bold text-slate-900 focus:outline-hidden w-full cursor-pointer"
            >
              {AUSTRALIAN_CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.state})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-800"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              <span>Portal Login</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700"
            >
              <span>Join As Tradie</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDispatch();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-xs font-bold text-white shadow-sm"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Request Same-Day Repair Now</span>
          </button>
        </div>
      )}
    </header>
  );
}
