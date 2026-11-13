"use client";

import * as React from "react";
import { Check, X, Shield, Clock, Zap, Award, FileCheck2, CreditCard, Wrench } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-14 px-4 bg-white border-b border-slate-200">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase tracking-wider text-orange-600 mb-1">
            <span className="w-2 h-2 rounded-xs bg-orange-600 inline-block"></span>
            <span>The Australian Trade Standard</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Built for Crises. Not Multi-Day Waiting Games.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            When your home or business faces an emergency, you need an on-call licensed technician at your door today—backed by Australian consumer law and verified licensing.
          </p>
        </div>

        {/* 4 Concrete Consumer Protection Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 shadow-2xs">
            <div className="h-9 w-9 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center mb-3">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="font-black text-sm text-slate-950">Statutory Trade Licences</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Audited against QBCC (QLD), Fair Trading (NSW), and Energy Safe (VIC). Zero unlicensed handymen touching high-voltage or pressurized mains.
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 shadow-2xs">
            <div className="h-9 w-9 rounded-lg bg-slate-950 text-emerald-400 flex items-center justify-center mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-black text-sm text-slate-950">$20M Public Liability</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Active certificates of currency verified. Your premises and property are fully protected in the event of unforeseen leaks or accidents.
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 shadow-2xs">
            <div className="h-9 w-9 rounded-lg bg-slate-950 text-blue-400 flex items-center justify-center mb-3">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="font-black text-sm text-slate-950">Mobile Workshop Stock</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              GPS-dispatched vans carry fast-moving OEM spares (Samsung, Rheem, Bosch, LG, Lockwood) for an 85%+ first-visit resolution rate.
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-slate-50 p-4 shadow-2xs">
            <div className="h-9 w-9 rounded-lg bg-slate-950 text-orange-400 flex items-center justify-center mb-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="font-black text-sm text-slate-950">On-Van Tap & Go EFTPOS</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Pay securely on completion with mobile card terminals. Instant itemized tax invoices with ABN and GST breakdown for your records.
            </p>
          </div>
        </div>

        {/* Operational Comparison Table */}
        <div className="overflow-x-auto rounded-xl border-2 border-slate-200 shadow-2xs">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 bg-slate-100 font-mono">
                <th className="p-3.5 font-black text-slate-900 uppercase text-xs">Operational Factor</th>
                <th className="p-3.5 font-black text-slate-950 bg-amber-100/70 border-x-2 border-amber-300 uppercase text-xs">
                  SameDayRepairs Fleet
                </th>
                <th className="p-3.5 font-bold text-slate-500 uppercase text-xs">Airtasker / Bidding Apps</th>
                <th className="p-3.5 font-bold text-slate-500 uppercase text-xs">Standard Trade Directories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Speed to Arrival
                </td>
                <td className="p-3.5 font-black text-emerald-800 bg-amber-50/50 border-x-2 border-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 stroke-[3]" /> Today (Under 60–90 mins)
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">2 to 4 days of bidding rounds</td>
                <td className="p-3.5 text-slate-500">Must call 8+ numbers to find someone free</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Licensing & Compliance
                </td>
                <td className="p-3.5 font-black text-emerald-800 bg-amber-50/50 border-x-2 border-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 stroke-[3]" /> State Trade Licences Audited
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">Unvetted casual handymen</td>
                <td className="p-3.5 text-slate-500">Self-reported without live check</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Pricing Predictability
                </td>
                <td className="p-3.5 font-black text-emerald-800 bg-amber-50/50 border-x-2 border-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 stroke-[3]" /> Fixed Diagnostic (From $149)
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">Uncontrolled price escalation</td>
                <td className="p-3.5 text-slate-500">Unknown call-out and hourly rates</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-slate-900">
                  Parts & Warranty
                </td>
                <td className="p-3.5 font-black text-emerald-800 bg-amber-50/50 border-x-2 border-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600 stroke-[3]" /> 12-Month Genuine Warranty
                  </span>
                </td>
                <td className="p-3.5 text-slate-500">Zero formal warranty backing</td>
                <td className="p-3.5 text-slate-500">Contractor-dependent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
