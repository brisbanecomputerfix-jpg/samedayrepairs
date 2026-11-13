"use client";

import * as React from "react";
import { Phone, Zap } from "lucide-react";

interface MobileStickyBarProps {
  onOpenDispatch: () => void;
  suburbText?: string;
}

export function MobileStickyBar({ onOpenDispatch, suburbText }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t-2 border-slate-300 bg-white p-2.5 px-3 flex flex-col gap-1.5 shadow-xl">
      {suburbText && (
        <div className="text-[10px] text-center font-bold text-slate-500 uppercase tracking-wider">
          Direct Tech Dispatch to <strong className="text-slate-900">{suburbText}</strong>
        </div>
      )}
      <div className="flex items-center gap-2">
        <a
          href="tel:0468991300"
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 py-3 text-xs font-black uppercase tracking-wider text-white active:scale-98 transition-all shadow-xs"
        >
          <Phone className="h-4 w-4 fill-white" />
          <span>Call 0468 991 300</span>
        </a>

        <button
          type="button"
          onClick={onOpenDispatch}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-orange-700 hover:bg-orange-800 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <Zap className="h-4 w-4 fill-white" />
          <span>Dispatch Tech</span>
        </button>
      </div>
    </div>
  );
}
