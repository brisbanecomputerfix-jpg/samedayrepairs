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

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-500 text-zinc-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto max-w-6xl px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-black shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Zap className="h-4 w-4 fill-zinc-950" />
              </div>
              <span className="text-sm sm:text-base font-black text-white">
                SameDay<span className="text-amber-500">Repairs</span>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
              Seeker Portal
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-3 py-1.5 text-xs font-bold text-zinc-950 shadow-md shadow-amber-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="h-3.5 w-3.5 fill-zinc-950" />
              <span className="hidden sm:inline">Request Urgent Repair</span>
              <span className="sm:hidden">Urgent Repair</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300 hidden md:inline">
                {seeker ? seeker.name : "Guest Seeker"}
              </span>
              <button
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className="p-1.5 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
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
        {/* Welcome Banner */}
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verified Homeowner Account</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              G'day, {seeker ? seeker.name : "Sarah"}!
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              Access your active emergency technicians on the road, manage your saved properties, and view 12-month parts & labor warranties.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:0468991300"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-xs font-bold text-zinc-200 hover:text-white hover:border-zinc-600 transition-colors"
            >
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>Hotline: 0468 991 300</span>
            </a>
            <button
              onClick={() => setIsDispatchOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-xs font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-zinc-950" />
              <span>Dispatch Tech Now</span>
            </button>
          </div>
        </div>

        {/* Active Emergency Dispatch (Live Ticket) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-500 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
              <span>Active Emergency Dispatch</span>
            </h2>
            <Link
              href="/dispatch/SDR-948102"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full GPS Screen</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="rounded-2xl border-2 border-amber-500/40 bg-zinc-900/90 p-5 sm:p-6 shadow-xl backdrop-blur-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">#SDR-948102</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    <span>En Route • ETA ~18 Mins</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Appliance Breakdown: Samsung French Door Fridge Not Cooling
                </h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>14 Wallace Street, Chermside QLD 4032 (Family Home)</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/dispatch/SDR-948102"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-zinc-950 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Track Van on GPS</span>
                </Link>
                <a
                  href="tel:0468991300"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Call 0468 991 300</span>
                </a>
              </div>
            </div>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Assigned Specialist
                </span>
                <span className="font-bold text-white block mt-0.5">Dave Mitchell</span>
                <span className="text-[11px] text-zinc-400">Express Whitegoods Rescue</span>
              </div>
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Mobile Workshop Van
                </span>
                <span className="font-bold text-white block mt-0.5">Toyota HiAce #QLD-728</span>
                <span className="text-[11px] text-zinc-400">Genuine Samsung parts onboard</span>
              </div>
              <div className="rounded-xl bg-zinc-950/60 p-3 border border-zinc-800/80">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">
                  Diagnostic Guarantee
                </span>
                <span className="font-bold text-amber-400 block mt-0.5">$149 Urgent Diagnostic</span>
                <span className="text-[11px] text-zinc-400">Waived if repair work is approved</span>
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
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Home className="h-4 w-4 text-amber-400" />
                  <span>My Saved Properties</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Quickly dispatch emergency trades to any of your homes or investments.
                </p>
              </div>

              <button
                onClick={() => setIsAddPropOpen(!isAddPropOpen)}
                className="inline-flex items-center gap-1 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-200 hover:text-white hover:border-amber-400 transition-colors cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Property</span>
              </button>
            </div>

            {/* Add Property Collapsible Form */}
            {isAddPropOpen && (
              <form
                onSubmit={handleAddProperty}
                className="rounded-2xl border border-amber-500/30 bg-zinc-900 p-4 space-y-3 animate-in fade-in"
              >
                <div className="text-xs font-bold text-amber-400">Add New Property to Address Book</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={propLabel}
                    onChange={(e) => setPropLabel(e.target.value)}
                    placeholder="Label (e.g. Holiday House)"
                    className="col-span-2 rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-white placeholder-zinc-500 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propAddress}
                    onChange={(e) => setPropAddress(e.target.value)}
                    placeholder="Street Address"
                    className="col-span-2 rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-white placeholder-zinc-500 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propSuburb}
                    onChange={(e) => setPropSuburb(e.target.value)}
                    placeholder="Suburb"
                    className="rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-white placeholder-zinc-500 focus:outline-hidden"
                    required
                  />
                  <input
                    type="text"
                    value={propPostcode}
                    onChange={(e) => setPropPostcode(e.target.value)}
                    placeholder="Postcode"
                    className="rounded-xl border border-zinc-700 bg-zinc-950 p-2 text-white placeholder-zinc-500 focus:outline-hidden"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddPropOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-zinc-700 text-xs text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold hover:bg-amber-400"
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
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 flex items-center justify-between hover:border-zinc-700 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{prop.label}</span>
                      {prop.isPrimary && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-500" />
                      <span>
                        {prop.address}, {prop.suburb} {prop.state} {prop.postcode}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDispatchOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-bold text-amber-400 hover:bg-zinc-700 transition-colors"
                  >
                    <Zap className="h-3 w-3 fill-amber-400" />
                    <span>Dispatch Here</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 12-Month Warranty Vault & Completed Invoices */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="h-4 w-4 text-emerald-400" />
                <span>12-Month Warranty Vault & Receipts</span>
              </h2>
              <p className="text-xs text-zinc-400">
                All parts and labor provided through SameDayRepairs are digitally backed for 12 months.
              </p>
            </div>

            <div className="space-y-3">
              {(seeker ? seeker.pastServices : []).map((item: any) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{item.category}</span>
                        <span className="text-[10px] font-mono text-zinc-500">#{item.ticketRef}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.providerName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-bold text-white">${item.totalCost}</span>
                      <span className="block text-[10px] text-zinc-500">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Warranty Valid to {item.warrantyValidUntil}</span>
                    </div>

                    <button
                      onClick={() =>
                        showToast(`Downloaded official invoice & warranty document (${item.invoiceNumber})`)
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Receipt PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-4 px-4 text-center text-xs text-zinc-500">
        SameDayRepairs.com.au Seeker Portal • Emergency Hotline:{" "}
        <a href="tel:0468991300" className="text-zinc-300 font-bold hover:underline">
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
