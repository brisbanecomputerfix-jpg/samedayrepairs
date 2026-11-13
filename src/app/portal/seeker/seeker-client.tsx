"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Home,
  ShieldCheck,
  Phone,
  Clock,
  ArrowRight,
  Plus,
  FileText,
  Award,
  CheckCircle2,
  AlertTriangle,
  User,
  LogOut,
  MapPin,
  ExternalLink,
  ChevronRight,
  Truck,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DEMO_SEEKER } from "@/data/mock-users";
import { SeekerUser } from "@/types/auth";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";

export function SeekerClient() {
  const router = useRouter();
  const { user, role, logout, addSavedProperty, isHydrated } = useAuth();
  const [isDispatchOpen, setIsDispatchOpen] = React.useState(false);
  const [isAddPropOpen, setIsAddPropOpen] = React.useState(false);

  // New property form
  const [propLabel, setPropLabel] = React.useState("");
  const [propAddress, setPropAddress] = React.useState("");
  const [propSuburb, setPropSuburb] = React.useState("");
  const [propState, setPropState] = React.useState("QLD");
  const [propPostcode, setPropPostcode] = React.useState("");

  // Toast message
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propLabel || !propAddress || !propSuburb || !propPostcode) return;
    addSavedProperty({
      label: propLabel,
      address: propAddress,
      suburb: propSuburb,
      state: propState,
      postcode: propPostcode,
    });
    setPropLabel("");
    setPropAddress("");
    setPropSuburb("");
    setPropPostcode("");
    setIsAddPropOpen(false);
    showToast("New property successfully added to your address book!");
  };

  if (!isHydrated) return null;

  const seeker: SeekerUser = (role === "seeker" && user ? user : DEMO_SEEKER) as SeekerUser;
  const activeTicket = seeker.activeTicketId || "SDR-948102";

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 industrial-grid flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white border-2 border-emerald-500 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b-2 border-slate-900 bg-white sticky top-0 z-40 shadow-xs">
        <div className="hazard-stripe-thin w-full" />
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 font-black shadow-xs group-hover:bg-orange-600 transition-colors">
                <Zap className="h-5 w-5 fill-amber-400 group-hover:fill-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-slate-950 leading-none">
                  SameDay<span className="text-orange-600">Repairs</span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  Homeowner Portal
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>DISPATCH DESK ACTIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span className="hidden sm:inline">Request Urgent Repair</span>
              <span className="sm:hidden">Urgent Repair</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l-2 border-slate-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-black text-slate-900 leading-tight">
                  {seeker ? seeker.name : "Sarah Jenkins"}
                </span>
                <span className="text-[10px] font-mono text-slate-500">Verified Homeowner</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-2 rounded-lg border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 py-8 flex-1 space-y-8">
        {/* Welcome Command Banner */}
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 sm:p-7 shadow-[4px_4px_0_0_#0f172a] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-mono font-bold text-emerald-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>VERIFIED RESIDENT ACCOUNT • 100% STATUTORY QBCC & CONSUMER LAW GUARANTEE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                G'day, {seeker ? seeker.name.split(" ")[0] : "Sarah"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium leading-relaxed">
                Your emergency trade command center. Track your on-duty technician's GPS arrival, manage saved residences across Greater Brisbane, and download 12-month parts & labor warranty certificates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:0468991300"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-slate-900 shadow-sm transition-all"
              >
                <Phone className="h-4 w-4 text-orange-600" />
                <span>Call Hotline: 0468 991 300</span>
              </a>
              <button
                onClick={() => setIsDispatchOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-white" />
                <span>Dispatch Tech Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Emergency Dispatch (Live Ticket Card) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-orange-700 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600"></span>
              </span>
              <span>LIVE EMERGENCY DISPATCH RADAR • ACTIVE WORKLOAD</span>
            </h2>
            <Link
              href={`/dispatch/${activeTicket}`}
              className="text-xs font-mono font-bold text-orange-700 hover:underline flex items-center gap-1"
            >
              <span>Full GPS Command Screen</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border-2 border-slate-900 bg-white p-5 sm:p-6 shadow-[4px_4px_0_0_#0f172a] relative overflow-hidden">
            <div className="hazard-stripe-thin absolute top-0 left-0 right-0" />

            <div className="pt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-black bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded-md">
                    #{activeTicket}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-xs font-mono font-black flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-700" />
                    <span>EN ROUTE • ETA ~18 MINS</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-bold">
                    GPS LOCK CONFIRMED
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950">
                  Appliance Breakdown: Samsung French Door Fridge Not Cooling
                </h3>
                <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  <span>14 Wallace Street, Chermside QLD 4032 (Family Home)</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/dispatch/${activeTicket}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all"
                >
                  <Truck className="h-4 w-4" />
                  <span>Track Van on GPS</span>
                </Link>
                <a
                  href="tel:0468991300"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 px-3.5 py-2.5 text-xs font-black text-slate-900 transition-colors"
                >
                  <Phone className="h-4 w-4 text-orange-600" />
                  <span>Call Van (0468 991 300)</span>
                </a>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Assigned Specialist
                </span>
                <span className="font-black text-slate-950 block mt-1 text-sm">Dave Mitchell</span>
                <span className="text-[11px] text-slate-600 font-medium">Express Whitegoods Rescue (QBCC #15092831)</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Mobile Workshop Van
                </span>
                <span className="font-black text-slate-950 block mt-1 text-sm">Toyota HiAce #QLD-728</span>
                <span className="text-[11px] text-slate-600 font-medium">OEM Samsung parts & gas recharge gear onboard</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Transparent Pricing Cap
                </span>
                <span className="font-black text-orange-700 block mt-1 text-sm">$149 Urgent Diagnostic</span>
                <span className="text-[11px] text-slate-600 font-medium">Fee 100% waived if repair quote is approved</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two-Column Grid: Saved Properties & Warranty Vault */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Properties */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-600" />
                  <span>My Saved Properties</span>
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Quickly dispatch emergency trades to any of your homes or investments in 1 tap.
                </p>
              </div>

              <button
                onClick={() => setIsAddPropOpen(!isAddPropOpen)}
                className="inline-flex items-center gap-1 rounded-lg border-2 border-slate-900 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Property</span>
              </button>
            </div>

            {/* Add Property Collapsible Form */}
            {isAddPropOpen && (
              <form
                onSubmit={handleAddProperty}
                className="rounded-xl border-2 border-slate-900 bg-white p-4 space-y-3 shadow-md animate-in fade-in"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-orange-700">
                  Register New Property to Address Book
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={propLabel}
                    onChange={(e) => setPropLabel(e.target.value)}
                    placeholder="Label (e.g. Holiday House, Sunnybank Rental)"
                    className="col-span-2 rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:border-slate-900 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propAddress}
                    onChange={(e) => setPropAddress(e.target.value)}
                    placeholder="Street Address"
                    className="col-span-2 rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:border-slate-900 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propSuburb}
                    onChange={(e) => setPropSuburb(e.target.value)}
                    placeholder="Suburb"
                    className="rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:border-slate-900 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propPostcode}
                    onChange={(e) => setPropPostcode(e.target.value)}
                    placeholder="Postcode"
                    className="rounded-lg border border-slate-300 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 font-medium focus:bg-white focus:border-slate-900 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddPropOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                  >
                    Save Property
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {(seeker ? seeker.savedProperties : []).map((prop: any) => (
                <div
                  key={prop.id}
                  className="rounded-xl border-2 border-slate-900 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-orange-600 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-950">{prop.label}</span>
                      {prop.isPrimary && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>
                        {prop.address}, {prop.suburb} {prop.state} {prop.postcode}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDispatchOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-slate-900 bg-slate-100 hover:bg-slate-900 hover:text-white px-3.5 py-1.5 text-xs font-black uppercase tracking-wider text-slate-900 transition-all cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Dispatch Here</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 12-Month Warranty Vault & Completed Invoices */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-black text-slate-950 flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <span>12-Month Warranty Vault & Receipts</span>
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                All parts and labor completed through SameDayRepairs are digitally secured for 12 full months.
              </p>
            </div>

            <div className="space-y-3">
              {(seeker ? seeker.pastServices : []).map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-xl border-2 border-slate-900 bg-white p-4 space-y-3 shadow-xs hover:border-orange-600 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-950">{item.category}</span>
                        <span className="text-[11px] font-mono font-bold text-slate-500">#{item.ticketRef}</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">{item.providerName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-black text-slate-950">${item.totalCost}</span>
                      <span className="block text-[10px] font-mono text-slate-500">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Warranty Valid to {item.warrantyValidUntil}</span>
                    </div>

                    <button
                      onClick={() =>
                        showToast(`Official Tax Invoice (${item.invoiceNumber}) & 12-Month Warranty Certificate generated.`)
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Tax Invoice PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-white py-4 px-4 text-center text-xs text-slate-600 font-medium">
        SameDayRepairs.com.au Homeowner Portal • Emergency Dispatch Hotline:{" "}
        <a href="tel:0468991300" className="text-orange-600 font-black hover:underline">
          0468 991 300
        </a>
      </footer>

      {/* Urgent Dispatch Modal */}
      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCityId="brisbane"
      />
    </div>
  );
}
