"use client";

import * as React from "react";
import Link from "next/link";
import {
  RepairCategory,
  RepairProvider,
  AustralianCity,
  Suburb,
} from "@/types";
import { Navbar } from "@/components/navbar";
import { ProviderCard } from "@/components/provider-card";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";
import { ListBusinessModal } from "@/components/list-business-modal";
import {
  Clock,
  DollarSign,
  ShieldCheck,
  Zap,
  MapPin,
  ChevronRight,
  HelpCircle,
  Phone,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Refrigerator,
  Droplets,
  KeyRound,
  Zap as ElectricIcon,
  ShieldAlert,
  Warehouse,
  Car,
  Laptop,
  Home,
  Wrench,
} from "lucide-react";

interface SuburbClientProps {
  city: AustralianCity;
  suburb: Suburb;
  categories: RepairCategory[];
  providers: RepairProvider[];
  nearbySuburbsList: Suburb[];
}

const CATEGORY_ICON_MAP: Record<string, any> = {
  Refrigerator,
  Droplets,
  KeyRound,
  Zap: ElectricIcon,
  ShieldAlert,
  Warehouse,
  Car,
  Laptop,
  Home,
};

export function SuburbClient({
  city,
  suburb,
  categories,
  providers,
  nearbySuburbsList,
}: SuburbClientProps) {
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);
  const [selectedCategoryForModal, setSelectedCategoryForModal] = React.useState<string | undefined>();

  const openDispatchWithCategory = (catId?: string) => {
    setSelectedCategoryForModal(catId);
    setIsDispatchOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <Navbar
        selectedCityId={city.id}
        onSelectCity={() => {}}
        onOpenDispatch={() => openDispatchWithCategory()}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs py-2.5 px-4">
        <div className="container mx-auto max-w-6xl flex flex-wrap items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <Link href={`/category/appliance-repairs/${city.slug}`} className="hover:text-slate-900 transition-colors">
            {city.name}
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-400" />
          <span className="text-slate-950 font-bold">
            {suburb.name} ({suburb.postcode})
          </span>
        </div>
      </div>

      {/* Suburb Master Hero */}
      <section className="bg-white border-b border-slate-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Same-Day Trade Fleet Active in {suburb.name} ({suburb.postcode})</span>
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              {suburb.region} • Greater {city.name}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Same-Day Emergency Repairs & Trades in <br className="hidden sm:inline" />
            <span className="text-orange-600">{suburb.name}, {city.state} {suburb.postcode}</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Need urgent repair help in {suburb.name}? From broken fridges and blocked drains to emergency lockouts and tripped electrical switchboards, our GPS-dispatched licensed tradesmen arrive at your door with upfront diagnostic caps, genuine parts, and 12-month warranties.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <Clock className="h-4 w-4 text-orange-600" />
              <span>{suburb.name} Response: <strong>45 – 60 mins</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-amber-950 shadow-2xs">
              <DollarSign className="h-4 w-4 text-emerald-700" />
              <span>Emergency Diagnostics: <strong>From $149 Upfront</strong></span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-slate-800 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{city.state} Licenced & $20M Insured</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => openDispatchWithCategory()}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3.5 text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Request Same-Day Repair in {suburb.name}</span>
            </button>

            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-600 text-emerald-900 bg-emerald-50/50 hover:bg-emerald-100 font-bold px-6 py-3.5 text-xs transition-colors shadow-2xs"
            >
              <Phone className="h-4 w-4 text-emerald-700" />
              <span>Call Direct: 0468 991 300</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        
        {/* All Emergency Services Available in Suburb */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Available Same-Day Emergency Services in {suburb.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Select a service to view specialized local technicians, diagnostic caps, and guaranteed arrival times.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
              9 Trades On Call
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICON_MAP[cat.iconName] || Wrench;
              return (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="h-10 w-10 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono">
                        {cat.typicalCalloutFee.split(" ")[0]} Callout
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-950">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>

                    <div className="mt-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-orange-600" />
                      <span>{suburb.name} Arrival: {cat.avgResponseTime}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Link
                      href={`/category/${cat.slug}/${city.slug}/${suburb.slug}`}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => openDispatchWithCategory(cat.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold cursor-pointer transition-colors"
                    >
                      Book Today
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Local Verified Contractors */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Verified Trade Contractors Dispatched to {suburb.name}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Audited Australian business numbers, verified police checks, and comprehensive liability cover.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full self-start sm:self-auto">
              {providers.length} Licensed Contractors Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onOpenDispatch={() => openDispatchWithCategory(provider.categoryIds[0])}
              />
            ))}
          </div>
        </section>

        {/* Surrounding Suburbs Directory */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-950">
                Surrounding Suburbs in {suburb.region}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Our mobile tradesmen service all residential and commercial addresses within 15km of {suburb.name}.
              </p>
            </div>
            <Link
              href={`/category/appliance-repairs/${city.slug}`}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>View All {city.name}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {nearbySuburbsList.map((nearSub) => (
              <Link
                key={nearSub.slug}
                href={`/suburbs/${city.slug}/${nearSub.slug}`}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-orange-500 hover:text-orange-600 transition-all text-xs font-medium flex items-center justify-between group"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-orange-600 shrink-0" />
                  <span className="truncate">{nearSub.name}</span>
                </div>
                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                  {nearSub.postcode}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Suburb FAQ Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 mb-1">
              <HelpCircle className="h-4 w-4 text-orange-600" />
              <span>Local Frequently Asked Questions</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Emergency Trade Services in {suburb.name} FAQ
            </h3>
          </div>

          <div className="divide-y divide-slate-200">
            <div className="py-4 first:pt-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-orange-600 font-mono">Q:</span>
                <span>How fast can a repair van arrive in {suburb.name} ({suburb.postcode}) today?</span>
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-5">
                Technicians dispatched through SameDayRepairs typically arrive within 45 to 60 minutes for urgent crises (warm fridges, burst water pipes, lockout emergencies) across {suburb.name} and {suburb.region}.
              </p>
            </div>

            <div className="py-4">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-orange-600 font-mono">Q:</span>
                <span>Are there extra travel fees for callouts to {suburb.name}?</span>
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-5">
                No. Our emergency diagnostic and callout fees are fixed upfront (from $149 for whitegoods, electrical, and mechanics; $165 for locksmiths; $189 for plumbing). The diagnostic fee is waived or credited toward the total invoice if you proceed with the repair.
              </p>
            </div>

            <div className="py-4">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-orange-600 font-mono">Q:</span>
                <span>Do your contractors service commercial premises in {suburb.name}?</span>
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-5">
                Yes. We dispatch licensed tradesmen to retail shops, cafes, commercial kitchens, medical clinics, offices, and residential properties throughout {suburb.name} ({suburb.postcode}).
              </p>
            </div>

            <div className="py-4 last:pb-0">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-start gap-2">
                <span className="text-orange-600 font-mono">Q:</span>
                <span>Are all technicians licensed under {city.state} trade authorities?</span>
              </h4>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed pl-5">
                Yes. Every contractor in the directory undergoes annual ABN verification, hold appropriate state trade licences (such as QBCC in QLD or NSW Fair Trading), and maintain active $20M public liability insurance.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer
        onOpenDispatch={() => openDispatchWithCategory()}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      <MobileStickyBar
        onOpenDispatch={() => openDispatchWithCategory()}
        suburbText={`${suburb.name} (${suburb.postcode})`}
      />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCategory={selectedCategoryForModal as any || "appliances"}
        defaultCityId={city.id}
        defaultSuburb={suburb.name}
        defaultPostcode={suburb.postcode}
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
