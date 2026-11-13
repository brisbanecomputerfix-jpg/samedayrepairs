"use client";

import * as React from "react";
import { AlertTriangle, Phone } from "lucide-react";

export function DemoBanner() {
  return (
    <aside
      aria-label="Prototype demo disclaimer"
      className="bg-amber-400 border-b-2 border-slate-950 text-slate-950 px-3 py-2 text-xs font-bold shadow-sm relative z-50 min-h-[56px] sm:min-h-[38px] flex items-center justify-center"
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-mono font-black bg-slate-950 text-amber-300 uppercase tracking-widest shrink-0 shadow-2xs">
            <AlertTriangle className="h-3 w-3 text-amber-400 fill-amber-400/20" />
            <span>PROTOTYPE DEMO</span>
          </span>
          <span className="leading-snug text-slate-950 font-bold text-[11px] sm:text-xs">
            This platform is currently a <strong>demonstration mockup and is NOT active</strong> for live bookings.
          </span>
        </div>

        <div className="text-[11px] font-bold text-slate-900 flex items-center justify-center gap-1.5 shrink-0 font-mono">
          <span>Direct enquiries:</span>
          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-1 font-black underline hover:text-black transition-colors"
          >
            <Phone className="h-3 w-3 text-emerald-900" />
            <span>0468 991 300</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
