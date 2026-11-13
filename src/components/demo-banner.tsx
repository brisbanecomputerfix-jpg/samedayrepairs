"use client";

import * as React from "react";
import { AlertTriangle, Phone } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-amber-400 border-b border-amber-500 text-zinc-950 px-3 py-2 text-xs font-bold shadow-sm relative z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-zinc-950 text-amber-300 uppercase tracking-wider shrink-0">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            <span>DEMO WEBSITE</span>
          </span>
          <span className="leading-snug">
            This platform is currently a <strong>mockup demo and is NOT active</strong> for live bookings.
          </span>
        </div>

        <div className="text-[11px] font-semibold text-zinc-900 flex items-center justify-center gap-1.5 shrink-0">
          <span>Direct enquiries:</span>
          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-1 font-black underline hover:text-black transition-colors"
          >
            <Phone className="h-3 w-3 text-emerald-800" />
            <span>0468 991 300</span>
          </a>
        </div>
      </div>
    </div>
  );
}
