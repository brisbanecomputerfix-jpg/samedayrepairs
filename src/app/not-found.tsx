import Link from "next/link";
import { Zap, Phone, ArrowLeft, Wrench, MapPin, Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";

export const metadata = {
  title: "404 - Page Not Found | SameDayRepairs.com.au",
  description:
    "The requested page could not be found, but our emergency mobile repair vans are on call Australia-wide. Call 0468 991 300 for immediate same-day dispatch.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between text-slate-900 font-sans">
      {/* Mini Brand Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30">
        <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-xl bg-orange-700 flex items-center justify-center text-white shadow-sm group-hover:bg-orange-800 transition-colors">
              <Zap className="h-4.5 w-4.5 fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-slate-950">
                SameDay<span className="text-orange-700">Repairs</span>.com.au
              </span>
              <span className="text-[10px] font-medium text-slate-500 hidden sm:block">
                Emergency Trade Network
              </span>
            </div>
          </Link>

          <a
            href="tel:0468991300"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-900 transition-all shadow-2xs"
          >
            <Phone className="h-3.5 w-3.5 text-orange-700" />
            <span>0468 991 300</span>
          </a>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 container mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-orange-800">
            <Clock className="h-3.5 w-3.5 text-orange-700" />
            <span>Emergency Dispatch Active 24/7</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            Page Not Found (404)
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
            The specific suburb or service address you requested could not be located. If you are experiencing an urgent household breakdown (burst pipe, cooling failure, lockout, or power trip), our mobile workshops are on call.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:0468991300"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-orange-700 hover:bg-orange-800 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
            >
              <Phone className="h-4 w-4" />
              <span>Call Priority Hotline: 0468 991 300</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-slate-100 px-6 py-3 text-xs font-black uppercase text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Directory Home</span>
            </Link>
          </div>
        </div>

        {/* Quick Service Selection Grid */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 font-mono text-center sm:text-left flex items-center justify-center sm:justify-start gap-1.5">
            <Wrench className="h-3.5 w-3.5 text-orange-700" />
            <span>Select Your Emergency Repair Trade</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {REPAIR_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-orange-500 hover:bg-orange-50/30 transition-all text-xs flex items-center justify-between group shadow-2xs"
              >
                <div>
                  <div className="font-bold text-slate-950 group-hover:text-orange-700 transition-colors">
                    {cat.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {cat.typicalCalloutFee} • {cat.avgResponseTime}
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-orange-700 transition-colors font-bold text-sm">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Metro Hubs Fast Links */}
        <div className="mt-10 p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-3">
            <MapPin className="h-4 w-4 text-orange-700" />
            <span>Select Your Metropolitan Region:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {AUSTRALIAN_CITIES.map((c) => (
              <Link
                key={c.id}
                href={`/category/appliance-repairs/${c.slug}`}
                className="rounded-lg border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-800 px-3 py-1.5 font-semibold text-slate-700 transition-colors"
              >
                {c.name} ({c.state})
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="container mx-auto max-w-4xl space-y-2">
          <p className="font-medium">
            © 2026 SameDayRepairs.com.au. Verified Australian Emergency Trade Directory.
          </p>
          <div className="flex items-center justify-center gap-4 text-slate-600">
            <Link href="/privacy" className="hover:text-orange-700 underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-orange-700 underline">
              Terms of Service
            </Link>
            <Link href="/trade-charter" className="hover:text-orange-700 underline">
              Trade Charter
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

