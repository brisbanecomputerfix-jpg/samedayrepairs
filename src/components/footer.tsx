"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Phone, AlertTriangle } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

interface FooterProps {
  onOpenRegister: () => void;
  onOpenDispatch: () => void;
}

export function Footer({ onOpenRegister, onOpenDispatch }: FooterProps) {
  return (
    <footer className="border-t-2 border-slate-200 bg-white text-slate-600 text-xs">
      {/* Top Tradie Fleet Callout Ribbon */}
      <div className="bg-slate-950 text-white py-8 px-4 border-b border-slate-800">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 font-mono font-bold uppercase tracking-wider text-[11px] mb-1">
              <span className="w-2 h-2 rounded-xs bg-amber-400 inline-block"></span>
              <span>Australian Licensed Trade Contractors</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Own a Licensed Trade Van or Mobile Workshop?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl font-medium">
              Join our emergency dispatch fleet. Fill schedule gaps with urgent, high-margin same-day jobs across your local postcode radius.
            </p>
          </div>

          <button
            onClick={onOpenRegister}
            className="rounded-lg bg-orange-600 hover:bg-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all shrink-0 cursor-pointer"
          >
            Register Trade Van (Free)
          </button>
        </div>
      </div>

      {/* Main Footer Directory Links */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 border border-slate-800">
                <Zap className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="text-base font-black text-slate-950">
                SameDay<span className="text-orange-600">Repairs</span>.com.au
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Australia's dedicated nationwide emergency directory and GPS dispatch network for urgent, high-priority same-day trade services.
            </p>
            <div className="pt-2 text-[11px] font-mono">
              <span className="text-slate-500 uppercase block">Duty Dispatch Hotline:</span>
              <a
                href="tel:0468991300"
                className="text-slate-950 text-base font-black hover:text-orange-600 transition-colors"
              >
                0468 991 300
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Emergency Trades
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              {REPAIR_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Australian Cities & Suburbs */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Metro & Suburb Hubs
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-medium">
              {AUSTRALIAN_CITIES.slice(0, 5).map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/category/appliance-repairs/${c.slug}`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    {c.name} ({c.state})
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] space-y-1">
              <span className="font-bold text-slate-800 block">Popular Local Suburbs:</span>
              <div className="flex flex-wrap gap-1.5 text-slate-500">
                <Link href="/suburbs/brisbane/chermside" className="hover:text-orange-600 underline">Chermside</Link>
                <span>•</span>
                <Link href="/suburbs/brisbane/aspley" className="hover:text-orange-600 underline">Aspley</Link>
                <span>•</span>
                <Link href="/suburbs/brisbane/indooroopilly" className="hover:text-orange-600 underline">Indooroopilly</Link>
                <span>•</span>
                <Link href="/suburbs/sydney/parramatta" className="hover:text-orange-600 underline">Parramatta</Link>
                <span>•</span>
                <Link href="/suburbs/melbourne/richmond" className="hover:text-orange-600 underline">Richmond</Link>
              </div>
            </div>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="font-black text-slate-950 uppercase tracking-wider text-xs mb-3 font-mono">
              Compliance & Safety
            </h4>
            <ul className="space-y-2 text-slate-600 text-[11px] font-medium">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>QBCC & Fair Trading Licences Checked</span>
              </li>
              <li>$20M Public Liability Insurance Audited</li>
              <li>12-Month Workmanship Warranty</li>
              <li>Itemized Tax Invoices with ABN & GST</li>
              <li className="pt-2 space-y-1">
                <Link href="/login" className="block font-black text-orange-600 hover:underline">
                  → Seeker & Tradie Portal Login
                </Link>
                <Link href="/admin" className="block text-slate-500 hover:underline">
                  → Central Dispatch Console
                </Link>
              </li>
              <li className="pt-2">
                <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 text-[10px] text-red-900 leading-snug">
                  <div className="flex items-center gap-1 font-black mb-0.5">
                    <AlertTriangle className="h-3 w-3 text-red-600 shrink-0" />
                    <span>Life-Threatening Emergency Notice:</span>
                  </div>
                  For active gas leaks, sparking mains with fire hazard, or structural danger, dial <strong>000</strong> immediately.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 font-medium">
          <div>
            © 2026 SameDayRepairs.com.au. Australian Registered Business Directory.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Statutory Trade Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
