"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-1.5 rounded-full border border-slate-300 bg-white/95 backdrop-blur-xs px-3.5 py-2.5 text-xs font-bold text-slate-800 shadow-lg hover:shadow-xl hover:border-orange-500 hover:text-orange-700 active:scale-95 transition-all cursor-pointer group min-h-[44px] min-w-[44px]"
    >
      <ArrowUp className="h-4 w-4 text-orange-700 transition-transform group-hover:-translate-y-0.5" />
      <span className="hidden sm:inline">Back to Top</span>
    </button>
  );
}

