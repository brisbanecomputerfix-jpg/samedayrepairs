"use client";

import * as React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { REPAIR_CATEGORIES } from "@/data/categories";

interface SuburbDirectoryProps {
  currentCityId?: string;
  categorySlug?: string;
}

export function SuburbDirectory({
  currentCityId = "brisbane",
  categorySlug,
}: SuburbDirectoryProps) {
  const [activeCityId, setActiveCityId] = React.useState(currentCityId);
  const city = AUSTRALIAN_CITIES.find((c) => c.id === activeCityId) || AUSTRALIAN_CITIES[0];
  const category = categorySlug
    ? REPAIR_CATEGORIES.find((c) => c.slug === categorySlug)
    : undefined;

  // Group suburbs by region
  const suburbsByRegion = React.useMemo(() => {
    const map: Record<string, typeof city.popularSuburbs> = {};
    for (const sub of city.popularSuburbs) {
      const region = sub.region || "Metro Area";
      if (!map[region]) {
        map[region] = [];
      }
      map[region].push(sub);
    }
    return map;
  }, [city]);

  return (
    <section className="bg-white border-y border-slate-200 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3 shadow-2xs">
            <MapPin className="h-3.5 w-3.5 text-orange-600" />
            <span>Hyper-Local Suburb Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            {category
              ? `Same-Day ${category.shortName} Repairs by Suburb`
              : "Hyper-Local Same-Day Trade Directory"}
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            Our GPS-dispatched mobile repair vans operate dedicated rapid-response zones across all major Australian metropolitan postcodes. Select your suburb for local arrival times and on-duty technicians.
          </p>
        </div>

        {/* City Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-100 scrollbar-none">
          {AUSTRALIAN_CITIES.map((c) => {
            const isActive = c.id === activeCityId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCityId(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                }`}
              >
                {c.name} ({c.state})
              </button>
            );
          })}
        </div>

        {/* Suburbs Grid by Region */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(suburbsByRegion).map(([region, suburbs]) => (
            <div
              key={region}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-xs"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  {region}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  {suburbs.length} Suburbs
                </span>
              </div>

              <div className="space-y-2">
                {suburbs.map((sub) => {
                  const targetUrl = category
                    ? `/category/${category.slug}/${city.slug}/${sub.slug}`
                    : `/suburbs/${city.slug}/${sub.slug}`;

                  return (
                    <Link
                      key={sub.slug}
                      href={targetUrl}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-orange-500 hover:shadow-xs transition-all text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-600 transition-colors" />
                        <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {sub.name}
                        </span>
                        <span className="font-mono text-[11px] text-slate-400">
                          {sub.postcode}
                        </span>
                      </div>
                      <ArrowRight className="h-3 w-3 text-slate-300 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Local Guarantee Ribbon */}
        <div className="mt-10 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Clock className="h-4 w-4" />
              <span>Same-Day Suburb Guarantee</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Can't see your suburb listed?
            </h4>
            <p className="text-xs text-slate-300 max-w-xl">
              Our mobile trade vans travel within a 45km radius of every capital city center. If you are located in Greater {city.name}, an on-duty technician can be dispatched to your address today.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3 text-xs transition-colors shadow-sm"
            >
              <span>Call Dispatch: 0468 991 300</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

