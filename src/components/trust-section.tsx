"use client";

import * as React from "react";
import { Check, X, Shield, Clock, Zap, Award } from "lucide-react";

export function TrustSection() {
  return (
    <section className="py-16 px-4 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            The SameDayRepairs Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white">
            Built for Real Crises. Not Multi-Day Waiting Games.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
            When your home or business faces an emergency, you need an on-call licensed technician at your door today—not days of bidding wars.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs mb-12">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <th className="p-4 font-bold text-zinc-900 dark:text-white">What You Experience</th>
                <th className="p-4 font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border-x border-amber-500/20">
                  SameDayRepairs.com.au
                </th>
                <th className="p-4 font-bold text-zinc-500">Airtasker / Bidding Apps</th>
                <th className="p-4 font-bold text-zinc-500">Google Search / Directories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-200">
                  Speed to Arrival
                </td>
                <td className="p-4 font-bold text-emerald-600 bg-amber-500/5 border-x border-amber-500/20 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Today (Under 60 - 90 mins)
                </td>
                <td className="p-4 text-zinc-500">2 to 4 days of bidding</td>
                <td className="p-4 text-zinc-500">Must call 8+ numbers to find someone free</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-200">
                  Vetting & Safety
                </td>
                <td className="p-4 font-bold text-emerald-600 bg-amber-500/5 border-x border-amber-500/20 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> ABN & Police Checked
                </td>
                <td className="p-4 text-zinc-500">Unvetted casual handymen</td>
                <td className="p-4 text-zinc-500">Varies widely, no verification</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-200">
                  Pricing Transparency
                </td>
                <td className="p-4 font-bold text-emerald-600 bg-amber-500/5 border-x border-amber-500/20 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Flat Diagnostic / Clear Fees
                </td>
                <td className="p-4 text-zinc-500">Price gouging or hidden costs</td>
                <td className="p-4 text-zinc-500">Unexpected after-hours markups</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-200">
                  Parts & Warranty
                </td>
                <td className="p-4 font-bold text-emerald-600 bg-amber-500/5 border-x border-amber-500/20 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> 12-Month Guarantee
                </td>
                <td className="p-4 text-zinc-500">Zero formal warranty</td>
                <td className="p-4 text-zinc-500">Depends on individual contractor</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-950 dark:text-white">Strict Same-Day Cutoff Policy</h3>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Every technician in our network commits to clear same-day cut-off hours (typically 3:30 PM to 5:00 PM). If you book before cut-off, a tech arrives today.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-950 dark:text-white">Verified Australian ABNs</h3>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              We verify Australian Business Numbers, state trade contractor licenses (QBCC, NSW Fair Trading, ESV), and minimum \$5M public liability insurance.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-3">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-zinc-950 dark:text-white">Van-Stocked First-Time Fixes</h3>
            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">
              Our technicians carry common genuine components for major brands (Samsung, LG, Bosch, Merlin, Dux, Rheem) to maximize same-day repair completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

