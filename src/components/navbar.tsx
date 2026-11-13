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
  ChevronDown,
  Refrigerator,
  Droplets,
  KeyRound,
  ShieldAlert,
  Warehouse,
  Car,
  Laptop,
  Home as HomeIcon,
} from "lucide-react";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { useAuth } from "@/context/auth-context";

interface NavbarProps {
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  onOpenDispatch: () => void;
  onOpenRegister: () => void;
}

const CATEGORY_ICON_MAP: Record<string, any> = {
  Refrigerator,
  Droplets,
  KeyRound,
  Zap,
  ShieldAlert,
  Warehouse,
  Car,
  Laptop,
  Home: HomeIcon,
};

export function Navbar({
  selectedCityId,
  onSelectCity,
  onOpenDispatch,
  onOpenRegister,
}: NavbarProps) {
  const { user, role, isHydrated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = React.useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = React.useState(false);

  const currentCity = AUSTRALIAN_CITIES.find((c) => c.id === selectedCityId) || AUSTRALIAN_CITIES[0];

  // Close dropdowns on outside click
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-nav-dropdown]")) {
        setServicesDropdownOpen(false);
        setLocationsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      {/* Top Reassurance Ribbon */}
      <div className="bg-slate-900 text-slate-300 px-3 sm:px-4 py-2 text-xs">
        <div className="container mx-auto max-w-7xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium truncate">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">
                Same-Day Availability: <strong className="text-white">{currentCity.name} Metro</strong>
              </span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>QBCC & Fair Trading Licensed Trades</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              Average arrival window: 45–75 mins
            </span>
            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors text-xs"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              <span>0468 991 300</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 h-18 flex items-center justify-between">
        
        {/* Left: Brand Logo & Internal Nav Links */}
        <div className="flex items-center gap-6 lg:gap-8">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-700">
            
            {/* Services Dropdown */}
            <div className="relative" data-nav-dropdown>
              <button
                type="button"
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setLocationsDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  servicesDropdownOpen
                    ? "bg-slate-100 text-slate-950"
                    : "hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesDropdownOpen ? "rotate-180 text-orange-600" : "text-slate-400"}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    All Emergency Trades
                  </div>
                  <div className="divide-y divide-slate-100">
                    {REPAIR_CATEGORIES.map((cat) => {
                      const Icon = CATEGORY_ICON_MAP[cat.iconName] || Wrench;
                      return (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}/${currentCity.slug}`}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                                {cat.name}
                              </div>
                              <div className="text-[10px] text-slate-500 font-normal">
                                {cat.typicalCalloutFee}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Locations Dropdown */}
            <div className="relative" data-nav-dropdown>
              <button
                type="button"
                onClick={() => {
                  setLocationsDropdownOpen(!locationsDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  locationsDropdownOpen
                    ? "bg-slate-100 text-slate-950"
                    : "hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <span>Metro Hubs</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${locationsDropdownOpen ? "rotate-180 text-orange-600" : "text-slate-400"}`} />
              </button>

              {locationsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    Major Metropolitan Coverage
                  </div>
                  <div className="space-y-1">
                    {AUSTRALIAN_CITIES.map((c) => (
                      <Link
                        key={c.id}
                        href={`/category/appliance-repairs/${c.slug}`}
                        onClick={() => {
                          onSelectCity(c.id);
                          setLocationsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                          c.id === selectedCityId
                            ? "bg-orange-50 text-orange-900 font-bold"
                            : "hover:bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                          <span>{c.name} ({c.state})</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {c.popularSuburbs.length} suburbs
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Suburb Hub Direct Link */}
            <Link
              href={`/suburbs/${currentCity.slug}/chermside`}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-slate-950 transition-colors"
            >
              Local Suburbs
            </Link>
          </nav>
        </div>

        {/* Right Navigation & CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Metro Region Selector Pill */}
          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3.5 py-2 text-xs text-slate-700">
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
            aria-label="Call emergency dispatch line"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white p-4 space-y-4 animate-in fade-in max-h-[85vh] overflow-y-auto">
          
          {/* Region Selector Mobile */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs">
            <MapPin className="h-4 w-4 text-orange-600 shrink-0" />
            <span className="text-slate-500 font-medium">Metro Region:</span>
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

          {/* Quick Emergency Trades Grid */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
              Select Emergency Service:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {REPAIR_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICON_MAP[cat.iconName] || Wrench;
                return (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.slug}/${currentCity.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-orange-50 hover:border-orange-300 text-xs text-slate-800 transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                    <span className="truncate font-semibold">{cat.shortName}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Popular Suburb Quick Chips */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono px-1">
              Popular {currentCity.name} Suburbs:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentCity.popularSuburbs.slice(0, 6).map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/suburbs/${currentCity.slug}/${sub.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:border-orange-500 hover:text-orange-600 transition-colors font-medium"
                >
                  {sub.name} ({sub.postcode})
                </Link>
              ))}
            </div>
          </div>

          {/* Portals and Links */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-800 shadow-2xs"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              <span>Portal Login</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-700 cursor-pointer"
            >
              <span>Join As Tradie</span>
            </button>
          </div>

          {/* Emergency Direct Call */}
          <a
            href="tel:0468991300"
            className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 py-3 text-xs font-black text-emerald-900"
          >
            <Phone className="h-4 w-4 text-emerald-700" />
            <span>Call 24/7 Hotline: 0468 991 300</span>
          </a>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDispatch();
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 text-xs font-bold text-white shadow-sm cursor-pointer"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Request Same-Day Repair Now</span>
          </button>
        </div>
      )}
    </header>
  );
}
