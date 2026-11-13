"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, Phone, PlusCircle, MapPin, ShieldCheck, Menu, X, User, LogIn, Wrench, Radio } from "lucide-react";
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
      {/* Top Industrial Dispatch Ribbon */}
      <div className="bg-slate-950 text-slate-300 px-3 py-1.5 text-[11px] font-mono tracking-tight border-b border-slate-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-400">DISPATCH RADAR:</span>
            <span className="font-semibold text-slate-100 uppercase">
              {currentCity.name} ({currentCity.state}) FLEET ON-CALL
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-amber-400 font-semibold">
              AVG ARRIVAL: 45-65 MINS
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>QBCC / Fair Trading / ABN Verified</span>
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href="tel:0468991300"
              className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1"
            >
              <Phone className="h-3 w-3" />
              <span>0468 991 300</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand Logo - Utilitarian & Authoritative */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shadow-xs group-hover:border-amber-500 transition-colors">
            <Zap className="h-5 w-5 fill-amber-400 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-950">
                SameDay<span className="text-orange-600">Repairs</span>
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-slate-700 border border-slate-300 tracking-wider">
                .com.au
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 -mt-0.5 hidden sm:block">
              Emergency Trade & Repair Fleet
            </span>
          </div>
        </Link>

        {/* Metro Region Selector */}
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 shadow-2xs">
          <MapPin className="h-3.5 w-3.5 text-orange-600 shrink-0" />
          <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Region:</span>
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

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* User / Tradie Portal Indicator */}
          {isHydrated && user ? (
            <Link
              href={role === "seeker" ? "/portal/seeker" : "/portal/provider"}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all border ${
                role === "seeker"
                  ? "border-amber-300 bg-amber-50 text-amber-950 hover:bg-amber-100"
                  : "border-orange-300 bg-orange-50 text-orange-950 hover:bg-orange-100"
              }`}
            >
              {role === "seeker" ? (
                <>
                  <User className="h-3.5 w-3.5 text-amber-600" />
                  <span>{(user as any).name?.split(" ")[0] || "Seeker"} (Seeker)</span>
                </>
              ) : (
                <>
                  <Wrench className="h-3.5 w-3.5 text-orange-600" />
                  <span>{(user as any).contactName?.split(" ")[0] || "Tradie"} (Tradie)</span>
                </>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs"
            >
              <LogIn className="h-3.5 w-3.5 text-slate-500" />
              <span>Portal Login</span>
            </Link>
          )}

          {/* Tradie List Button */}
          <button
            onClick={onOpenRegister}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <PlusCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>Register Trade Van</span>
          </button>

          {/* Direct Emergency Call Button */}
          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-colors"
          >
            <Phone className="h-3.5 w-3.5 fill-white text-emerald-700" />
            <span>0468 991 300</span>
          </a>

          {/* Rapid Dispatch CTA */}
          <button
            onClick={onOpenDispatch}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3.5 py-2 text-xs font-black text-slate-950 shadow-xs transition-all cursor-pointer"
          >
            <Zap className="h-3.5 w-3.5 fill-slate-950" />
            <span>Dispatch Tech</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-2">
          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-2.5 py-1.5 text-xs font-bold text-white"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Region</span>
            <select
              value={selectedCityId}
              onChange={(e) => {
                onSelectCity(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-md p-1.5"
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
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <LogIn className="h-4 w-4" />
              <span>Portal Login</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Register Van</span>
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDispatch();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-black text-slate-950 shadow-xs"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>Emergency Van Dispatch</span>
          </button>
        </div>
      )}
    </header>
  );
}
