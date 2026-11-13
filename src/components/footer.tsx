"use client";

import * as React from "react";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  Phone,
  AlertTriangle,
  ArrowUp,
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

interface FooterProps {
  onOpenRegister: () => void;
  onOpenDispatch: () => void;
}

export function Footer({ onOpenRegister, onOpenDispatch }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 text-xs">
      {/* Top Tradie Fleet Callout Ribbon */}
      <div className="bg-slate-950 text-white py-8 px-4 border-b border-slate-800">
        <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 font-mono font-bold uppercase tracking-wider text-[11px] mb-1">
              <span className="w-2 h-2 rounded-xs bg-amber-400 inline-block"></span>
              <span>Australian Licensed Trade Contractors</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Own a Licensed Trade Van or Mobile Workshop?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
              Join our emergency dispatch fleet. Fill schedule gaps with urgent, high-margin same-day repair jobs across your local postcode radius.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
            >
              Register Trade Van (Free)
            </button>
            <Link
              href="/portal/provider"
              className="rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 px-4 py-3 text-xs font-bold text-slate-300 transition-colors"
            >
              Contractor Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Directory Links */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center text-white shadow-2xs group-hover:bg-orange-700 transition-colors">
                <Zap className="h-4 w-4 fill-white" />
              </div>
              <span className="text-base font-black text-slate-950">
                SameDay<span className="text-orange-600">Repairs</span>.com.au
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Australia's verified directory of same-day emergency trade services. Connecting homeowners and commercial premises with licensed technicians ready to arrive today.
            </p>
            <div className="pt-2 text-[11px] font-mono">
              <span className="text-slate-500 uppercase block font-semibold">Priority Dispatch Hotline:</span>
              <a
                href="tel:0468991300"
                className="text-slate-950 text-base font-black hover:text-orange-600 transition-colors inline-flex items-center gap-1.5 mt-0.5"
              >
                <Phone className="h-4 w-4 text-emerald-600" />
                <span>0468 991 300</span>
              </a>
              <span className="text-slate-400 block text-[10px] mt-0.5">24/7 Intake • 45–75 Min Metro ETA</span>
            </div>
          </div>

          {/* Column 2: Emergency Trades (All 9 Categories) */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono flex items-center gap-1.5">
              <span>Emergency Trades</span>
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              {REPAIR_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-orange-600 hover:translate-x-0.5 transition-all inline-block"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Capital Metro Hubs */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Metro Coverage Hubs
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              {AUSTRALIAN_CITIES.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/appliance-repairs/${c.slug}`}
                    className="hover:text-orange-600 hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                  >
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{c.name} ({c.state})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Popular Suburb Hubs */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Local Suburb Hubs
            </h4>
            <div className="space-y-2.5 text-slate-600">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Queensland (QLD)
                </span>
                <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-[11px]">
                  <Link href="/suburbs/brisbane/chermside" className="hover:text-orange-600">Chermside (4032)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/brisbane/aspley" className="hover:text-orange-600">Aspley (4034)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/brisbane/indooroopilly" className="hover:text-orange-600">Indooroopilly (4068)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/brisbane/fortitude-valley" className="hover:text-orange-600">Fortitude Valley</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/gold-coast/surfers-paradise" className="hover:text-orange-600">Surfers Paradise</Link>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  New South Wales (NSW)
                </span>
                <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-[11px]">
                  <Link href="/suburbs/sydney/parramatta" className="hover:text-orange-600">Parramatta (2150)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/sydney/bondi" className="hover:text-orange-600">Bondi (2026)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/sydney/chatswood" className="hover:text-orange-600">Chatswood (2067)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/sydney/penrith" className="hover:text-orange-600">Penrith (2750)</Link>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Victoria (VIC)
                </span>
                <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-[11px]">
                  <Link href="/suburbs/melbourne/richmond" className="hover:text-orange-600">Richmond (3121)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/melbourne/south-yarra" className="hover:text-orange-600">South Yarra (3141)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/melbourne/brunswick" className="hover:text-orange-600">Brunswick (3056)</Link>
                  <span className="text-slate-300">•</span>
                  <Link href="/suburbs/melbourne/dandenong" className="hover:text-orange-600">Dandenong</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Column 5: Compliance, Portals & Safety */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Portals & Standards
            </h4>
            <ul className="space-y-2 text-slate-600 text-[11px] font-medium">
              <li>
                <Link
                  href="/trade-charter"
                  className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                >
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>QBCC & Fair Trading Licences</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/trade-charter"
                  className="flex items-center gap-1.5 hover:text-orange-600 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>$20M Public Liability Insured</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-orange-600 transition-colors block">
                  12-Month Genuine Parts Warranty
                </Link>
              </li>
              <li>Mobile Card Terminals • Tax Invoices</li>

              <li className="pt-2 space-y-1.5">
                <Link
                  href="/portal/seeker"
                  className="block font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  → Customer Booking Account
                </Link>
                <Link
                  href="/portal/provider"
                  className="block font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  → Contractor Fleet Portal
                </Link>
                <Link
                  href="/trade-charter"
                  className="block font-bold text-slate-900 hover:text-orange-600 transition-colors"
                >
                  → Trade Charter & Standards
                </Link>
                <Link
                  href="/admin"
                  className="block text-slate-500 hover:text-slate-800 transition-colors"
                >
                  → Operations Dispatch Console
                </Link>
                <Link
                  href="/login"
                  className="block text-slate-500 hover:text-slate-800 transition-colors"
                >
                  → Portal Login
                </Link>
              </li>

              <li className="pt-2">
                <div className="rounded-xl bg-red-50 border border-red-200 p-2.5 text-[10px] text-red-900 leading-snug">
                  <div className="flex items-center gap-1 font-black mb-0.5">
                    <AlertTriangle className="h-3 w-3 text-red-600 shrink-0" />
                    <span>Emergency Notice:</span>
                  </div>
                  For active gas leaks, sparking mains with fire hazard, or structural danger, dial <strong>000</strong> immediately.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row with Scroll to Top button */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 SameDayRepairs.com.au. All Rights Reserved. Verified Australian Trade Directory.
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-orange-600 hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-600 hover:underline transition-colors">
                Terms of Service
              </Link>
              <Link href="/trade-charter" className="hover:text-orange-600 hover:underline transition-colors">
                Trade Charter
              </Link>
            </div>

            {/* Back to Top Arrow Button in Footer */}
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-800 font-bold px-3 py-1.5 transition-all cursor-pointer group"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5 text-orange-600 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
