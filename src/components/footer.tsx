"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Phone, Heart } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

interface FooterProps {
  onOpenRegister: () => void;
  onOpenDispatch: () => void;
}

export function Footer({ onOpenRegister, onOpenDispatch }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 text-xs">
      {/* Top Tradie CTA Banner */}
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 text-white py-8 px-4 border-b border-zinc-800">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
              Are You an Australian Tradie or Repairer?
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
              Get High-Margin Same-Day Repair Jobs in Your Local Suburbs
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Fill calendar gaps with urgent, high-paying jobs. Zero bidding wars. List your ABN-registered business for free during our national rollout.
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            List Your Business (Free)
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950">
                <Zap className="h-4 w-4 fill-zinc-950 text-zinc-950" />
              </div>
              <span className="text-base font-black text-zinc-950 dark:text-white">
                SameDay<span className="text-amber-500">Repairs</span>.com.au
              </span>
            </Link>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Australia's dedicated nationwide directory and dispatch network for urgent, emergency, and same-day repair providers.
            </p>
            <div className="pt-2 text-[11px] text-zinc-500">
              National Referral Hotline:<br />
              <a href="tel:0468991300" className="text-zinc-900 dark:text-zinc-200 text-sm font-bold hover:text-amber-500 transition-colors">
                0468 991 300
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Repair Verticals
            </h4>
            <ul className="space-y-1.5 text-zinc-500">
              {REPAIR_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`#categories`} className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Australian Cities */}
          <div>
            <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Covered Regions
            </h4>
            <ul className="space-y-1.5 text-zinc-500">
              {AUSTRALIAN_CITIES.map((c) => (
                <li key={c.id}>
                  <span className="hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer">
                    {c.name} ({c.state})
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-bold text-zinc-950 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Trust & Standards
            </h4>
            <ul className="space-y-2 text-zinc-500 text-[11px]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>ABN & License Verification</span>
              </li>
              <li>Same-Day Cutoff Policy</li>
              <li>12-Month Workmanship Warranty</li>
              <li>Fair Diagnostic Fee Guidelines</li>
              <li className="pt-2">
                <div className="rounded-lg bg-red-50 p-2 text-[10px] text-red-900 dark:bg-red-950/40 dark:text-red-300">
                  <strong>Notice:</strong> For life-threatening emergencies (e.g. major gas leaks, structural collapse), please call <strong>000</strong> immediately.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-400">
          <div>
            © 2026 SameDayRepairs.com.au. All Rights Reserved. ABN Verified Australian Directory.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Tradie Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
