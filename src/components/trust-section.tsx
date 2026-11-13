"use client";

import * as React from "react";
import { Check, X, Shield, Clock, Zap, Award, FileCheck2, CreditCard, Wrench } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-orange-700 inline-block"></span>
            <span>Australian Trade Standards</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Emergency Trade Standards You Can Hold Us To
          </h2>
          <p className="mt-3 text-sm text-slate-700 leading-relaxed font-medium">
            Emergency repairs shouldn&apos;t come with surprise bills or unverified handymen. Every technician dispatched through our network operates under strict Australian consumer protection and state licensing requirements.
          </p>
        </div>

        {/* 4 Concrete Consumer Protection Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-xs hover:bg-white hover:border-slate-300 transition-all">
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center mb-3.5">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Active State Trade Licences</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Audited against QBCC (QLD), Fair Trading (NSW), and Energy Safe (VIC). Electricians, plumbers, and refrigeration mechanics carry verified qualifications.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-xs hover:bg-white hover:border-slate-300 transition-all">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3.5">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">$20,000,000 Public Liability</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Active insurance certificates verified annually. Your property is protected against accidental damage or unforeseen incidents.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-xs hover:bg-white hover:border-slate-300 transition-all">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3.5">
              <Wrench className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Stocked for First-Visit Fix</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Mobile workshops carry common OEM spare parts (Samsung, Rheem, Bosch, LG, Lockwood) for an 85%+ same-day resolution rate.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-xs hover:bg-white hover:border-slate-300 transition-all">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3.5">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-950">Mobile EFTPOS & Tax Invoices</h3>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Pay securely on completion via card terminal. Instant itemised tax invoices with ABN and GST breakdown for insurance or tax records.
            </p>
          </div>
        </div>

        {/* Operational Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
          <table className="w-full min-w-[560px] text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="p-4 font-bold text-slate-900 text-xs uppercase tracking-wider">Service Feature</th>
                <th className="p-4 font-bold text-slate-950 bg-orange-50/70 border-x border-orange-200 text-xs uppercase tracking-wider text-orange-900">
                  SameDayRepairs Network
                </th>
                <th className="p-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Gig & Bidding Apps</th>
                <th className="p-4 font-semibold text-slate-500 text-xs uppercase tracking-wider">Standard Directories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-4 font-bold text-slate-900">
                  Speed to Arrival
                </td>
                <td className="p-4 font-semibold text-emerald-800 bg-orange-50/30 border-x border-orange-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> Today (Typically 45–75 mins)
                  </span>
                </td>
                <td className="p-4 text-slate-500">2 to 4 days of bidding rounds</td>
                <td className="p-4 text-slate-500">Must call 8+ numbers to find someone free</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">
                  Licensing & Compliance
                </td>
                <td className="p-4 font-semibold text-emerald-800 bg-orange-50/30 border-x border-orange-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> State Trade Licences Audited
                  </span>
                </td>
                <td className="p-4 text-slate-500">Unvetted casual handymen</td>
                <td className="p-4 text-slate-500">Self-reported without live check</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">
                  Pricing Predictability
                </td>
                <td className="p-4 font-semibold text-emerald-800 bg-orange-50/30 border-x border-orange-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> Fixed Diagnostic (From $149)
                  </span>
                </td>
                <td className="p-4 text-slate-500">Uncontrolled price escalation</td>
                <td className="p-4 text-slate-500">Unknown call-out and hourly rates</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">
                  Parts & Warranty
                </td>
                <td className="p-4 font-semibold text-emerald-800 bg-orange-50/30 border-x border-orange-200">
                  <span className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" /> 12-Month Genuine Warranty
                  </span>
                </td>
                <td className="p-4 text-slate-500">Zero formal warranty backing</td>
                <td className="p-4 text-slate-500">Contractor-dependent</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
