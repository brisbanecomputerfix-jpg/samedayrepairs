"use client";

import * as React from "react";
import { Phone, Zap } from "lucide-react";

interface MobileStickyBarProps {
  onOpenDispatch: () => void;
}

export function MobileStickyBar({ onOpenDispatch }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-zinc-200 bg-white/95 backdrop-blur-md p-2.5 px-3 flex items-center gap-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/95">
      <a
        href="tel:1300726339"
        className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 py-3 text-xs font-bold text-zinc-900 active:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        <Phone className="h-4 w-4 text-emerald-600" />
        <span>Call Now</span>
      </a>

      <button
        onClick={onOpenDispatch}
        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 active:scale-98"
      >
        <Zap className="h-4 w-4 fill-zinc-950" />
        <span>Dispatch Tech</span>
      </button>
    </div>
  );
}

