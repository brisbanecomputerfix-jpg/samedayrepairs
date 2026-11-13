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
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-xl font-bold text-xs shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl bg-orange-600 flex items-center justify-center text-white shadow-sm group-hover:bg-orange-700 transition-colors">
                <Zap className="h-5 w-5 fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-slate-950 leading-none">
                  SameDay<span className="text-orange-600">Repairs</span>
                </span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Customer Account
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 fill-white" />
              <span className="hidden sm:inline">Request Urgent Repair</span>
              <span className="sm:hidden">Urgent Repair</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900">
                  {seeker ? seeker.name : "Sarah Jenkins"}
                </span>
                <span className="text-[11px] text-slate-500">Verified Resident</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Verified Homeowner • 100% Statutory Trade Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              G'day, {seeker ? seeker.name.split(" ")[0] : "Sarah"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Manage your urgent repairs, track your assigned technician's arrival, and access 12-month parts & workmanship warranty records.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:0468991300"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 transition-all shadow-2xs"
            >
              <Phone className="h-4 w-4 text-orange-600" />
              <span>Hotline: 0468 991 300</span>
            </a>
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Book New Repair</span>
            </button>
          </div>
        </div>

        {/* Active Emergency Dispatch (Live Ticket Card) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Active Repair Request</span>
            </h2>
            <Link
              href={`/dispatch/${activeTicket}`}
              className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
            >
              <span>View Full Tracker</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-lg">
                    #{activeTicket}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    <span>En Route • ETA ~18 Mins</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                    Technician Confirmed
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                  Appliance Breakdown: Samsung French Door Fridge Not Cooling
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>14 Wallace Street, Chermside QLD 4032 (Family Home)</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/dispatch/${activeTicket}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
                >
                  <Truck className="h-4 w-4" />
                  <span>View Live Tracker</span>
                </Link>
                <a
                  href="tel:0468991300"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-colors"
                >
                  <Phone className="h-4 w-4 text-orange-600" />
                  <span>Call Van (0468 991 300)</span>
                </a>
              </div>
            </div>

            <div className="pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">
                  Assigned Specialist
                </span>
                <span className="font-bold text-slate-950 block mt-1 text-sm">Dave Mitchell</span>
                <span className="text-xs text-slate-600">Express Whitegoods Rescue (QBCC #15092831)</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">
                  Mobile Workshop
                </span>
                <span className="font-bold text-slate-950 block mt-1 text-sm">Toyota HiAce #QLD-728</span>
                <span className="text-xs text-slate-600">OEM parts & diagnostic tools on board</span>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200/80">
                <span className="text-[11px] uppercase font-bold text-slate-500 block">
                  Fixed Pricing Cap
                </span>
                <span className="font-bold text-orange-700 block mt-1 text-sm">$149 Urgent Diagnostic</span>
                <span className="text-xs text-slate-600">Credited 100% if repair quote is approved</span>
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
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                  <Home className="h-4 w-4 text-orange-600" />
                  <span>My Saved Properties</span>
                </h2>
                <p className="text-xs text-slate-600">
                  Quickly request service for your home or investment properties.
                </p>
              </div>

              <button
                onClick={() => setIsAddPropOpen(!isAddPropOpen)}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Property</span>
              </button>
            </div>

            {/* Add Property Form */}
            {isAddPropOpen && (
              <form
                onSubmit={handleAddProperty}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-sm animate-in fade-in"
              >
                <div className="text-xs font-bold text-slate-900">
                  Add New Address
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={propLabel}
                    onChange={(e) => setPropLabel(e.target.value)}
                    placeholder="Label (e.g. Family Home, Unit 4)"
                    className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propAddress}
                    onChange={(e) => setPropAddress(e.target.value)}
                    placeholder="Street Address"
                    className="col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propSuburb}
                    onChange={(e) => setPropSuburb(e.target.value)}
                    placeholder="Suburb"
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propPostcode}
                    onChange={(e) => setPropPostcode(e.target.value)}
                    placeholder="Postcode"
                    className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-slate-400 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddPropOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold hover:bg-orange-700 cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {(seeker ? seeker.savedProperties : []).map((prop: any) => (
                <div
                  key={prop.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-950">{prop.label}</span>
                      {prop.isPrimary && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>
                        {prop.address}, {prop.suburb} {prop.state} {prop.postcode}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDispatchOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 px-3.5 py-2 text-xs font-bold text-slate-800 transition-all cursor-pointer"
                  >
                    <Zap className="h-3.5 w-3.5 fill-current" />
                    <span>Book Here</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 12-Month Warranty Vault & Completed Invoices */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-600" />
                <span>12-Month Warranty Vault & Receipts</span>
              </h2>
              <p className="text-xs text-slate-600">
                All parts and labor completed through SameDayRepairs are digitally secured for 12 months.
              </p>
            </div>

            <div className="space-y-3">
              {(seeker ? seeker.pastServices : []).map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-950">{item.category}</span>
                        <span className="text-xs text-slate-400">#{item.ticketRef}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{item.providerName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-slate-950">${item.totalCost}</span>
                      <span className="block text-[11px] text-slate-400">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span>Warranty Valid to {item.warrantyValidUntil}</span>
                    </div>

                    <button
                      onClick={() =>
                        showToast(`Tax invoice (${item.invoiceNumber}) downloaded.`)
                      }
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Invoice PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-4 text-center text-xs text-slate-500">
        SameDayRepairs.com.au Customer Portal • Support Hotline:{" "}
        <a href="tel:0468991300" className="text-slate-800 font-bold hover:underline">
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
