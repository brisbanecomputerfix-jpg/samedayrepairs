"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  Wrench,
  ShieldCheck,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Navigation,
  DollarSign,
  TrendingUp,
  Sliders,
  Check,
  X,
  ExternalLink,
  Truck,
  CheckCheck,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { DEMO_PROVIDER } from "@/data/mock-users";
import { ProviderUser } from "@/types/auth";

export function ProviderClient() {
  const router = useRouter();
  const {
    user,
    role,
    logout,
    toggleProviderOnDuty,
    updateJobStatus,
    acceptBroadcastJob,
    declineBroadcastJob,
    setServiceRadius,
    isHydrated,
  } = useAuth();

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (!isHydrated) return null;

  const provider: ProviderUser = (role === "provider" && user ? user : DEMO_PROVIDER) as ProviderUser;

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
                  Contractor Portal
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* On-Duty / Off-Duty Toggle Button */}
            <button
              onClick={() => {
                toggleProviderOnDuty();
                showToast(
                  provider?.isOnDuty
                    ? "Status: Off-Duty. Same-day job alerts paused."
                    : "Status: On-Duty! You will receive urgent job notifications."
                );
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer border ${
                provider?.isOnDuty
                  ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  provider?.isOnDuty ? "bg-emerald-500 animate-ping" : "bg-slate-400"
                }`}
              />
              <span>{provider?.isOnDuty ? "Available for Callouts" : "Off-Duty (Paused)"}</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {provider ? provider.contactName : "Dave Mitchell"}
                </span>
                <span className="text-[11px] text-slate-500">Contractor</span>
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

      {/* Main Dashboard */}
      <main className="container mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12 flex-1 space-y-8">
        {/* Top Fleet & Metrics Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>ABN {provider?.abn || "48 619 402 188"}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center gap-1">
                <Truck className="h-3.5 w-3.5 text-slate-500" />
                <span>{provider?.vehiclePlate || "Toyota HiAce Workshop #QLD-728"}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                QBCC #15092831 Audited
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {provider?.businessName || "Express Whitegoods & Fridge Rescue"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Primary Specialist: <strong className="text-slate-900">{provider?.contactName}</strong> • {provider?.category} ({provider?.city || "Greater Brisbane"})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
            <div>
              <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                Today's Earnings
              </span>
              <div className="text-2xl font-black text-emerald-700 flex items-baseline mt-0.5">
                <span>${provider?.todayEarnings || 0}</span>
                <span className="text-[10px] text-slate-400 ml-1 font-normal">AUD</span>
              </div>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                Jobs Completed
              </span>
              <span className="text-2xl font-black text-slate-950 mt-0.5 block">
                {provider?.completedJobsToday || 0}
              </span>
            </div>
            <div className="border-l border-slate-200 pl-3">
              <span className="text-[11px] uppercase font-semibold text-slate-500 block">
                Client Rating
              </span>
              <span className="text-2xl font-black text-amber-600 mt-0.5 block">
                {provider?.rating || "4.9"} ★
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Emergency Job Requests */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-600" />
              <span>Available Same-Day Jobs in Your Area (Within {provider?.serviceRadiusKm || 35}km)</span>
            </h2>
            <span className="text-xs text-slate-500">
              {provider?.broadcastQueue?.length || 0} jobs waiting
            </span>
          </div>

          {provider?.broadcastQueue && provider.broadcastQueue.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.broadcastQueue.map((bcast: any) => (
                <div
                  key={bcast.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-lg">
                          #{bcast.ticketRef}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                          {bcast.distanceKm} km away • {bcast.suburb}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-950 mt-2">{bcast.category}</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        "{bcast.issue}"
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                        Estimated Total
                      </span>
                      <span className="text-sm font-black text-emerald-700">
                        {bcast.payoutEstimate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{bcast.minutesAgo}m ago • {bcast.urgency}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          declineBroadcastJob(bcast.id);
                          showToast("Job passed to another available contractor.");
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold cursor-pointer"
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => {
                          acceptBroadcastJob(bcast.id);
                          showToast(`Job #${bcast.ticketRef} accepted! Added to your active jobs.`);
                        }}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Accept Job</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              No new unassigned job requests in your immediate radius right now. You will be notified as soon as a customer submits a repair.
            </div>
          )}
        </section>

        {/* Active Dispatched Jobs List */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-600" />
              <span>My Active Bookings ({provider?.activeJobs?.length || 0})</span>
            </h2>
          </div>

          <div className="space-y-4">
            {(provider?.activeJobs || []).map((job: any) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2.5 py-0.5 rounded-lg">
                        #{job.ticketRef}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          job.status === "Completed"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : "bg-amber-50 text-amber-900 border border-amber-200"
                        }`}
                      >
                        <span>Status: {job.status}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-950">{job.issue}</h3>
                    <p className="text-xs text-slate-600 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.address}, {job.suburb}</span>
                      <span className="text-slate-300">•</span>
                      <span>Customer: <strong>{job.customerName}</strong></span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`tel:${job.customerPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 transition-colors shadow-2xs"
                    >
                      <Phone className="h-3.5 w-3.5 text-orange-600" />
                      <span>Call {job.customerPhone}</span>
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(job.address + " " + job.suburb)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 transition-colors"
                    >
                      <Navigation className="h-3.5 w-3.5 text-slate-600" />
                      <span>Directions</span>
                    </a>

                    <Link
                      href={`/dispatch/${job.ticketRef}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 px-3.5 py-2 text-xs font-bold text-white transition-colors shadow-2xs"
                    >
                      <span>Job Tracker</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Job Progression Stepper */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                  <div className="text-xs text-slate-600">
                    <span className="block font-semibold text-slate-800">Pricing Agreement:</span>
                    <span>{job.diagnosticFee} • Estimated: {job.totalQuote}</span>
                  </div>

                  {job.status !== "Completed" && (
                    <div className="flex items-center gap-2">
                      {job.status === "En Route" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Arrived");
                            showToast("Arrival logged. Status updated to On Site.");
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        >
                          Mark Arrived On Site
                        </button>
                      )}

                      {job.status === "Arrived" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "In Progress");
                            showToast("Diagnostic quote approved. Repair in progress.");
                          }}
                          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        >
                          Approve Quote & Start Work
                        </button>
                      )}

                      {job.status === "In Progress" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Completed");
                            showToast(
                              "Job successfully marked as COMPLETED! $280 credited to your account balance."
                            );
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        >
                          Mark Complete & Issue $280 Receipt
                        </button>
                      )}
                    </div>
                  )}

                  {job.status === "Completed" && (
                    <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                      <CheckCheck className="h-4 w-4" />
                      <span>Completed • 12-Month Warranty Active</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage Radius Settings */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-orange-600" />
              <span>Service Radius & Travel Boundary</span>
            </h2>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {provider?.serviceRadiusKm || 35} km Radius
            </span>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={provider?.serviceRadiusKm || 35}
              onChange={(e) => setServiceRadius(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>10 km (Inner City Only)</span>
              <span>35 km (Standard Metro)</span>
              <span>60 km (Outer Suburbs & Regional)</span>
            </div>
          </div>
          <p className="text-xs text-slate-600">
            You will only receive instant job notifications for customer emergencies located within your configured{" "}
            <strong>{provider?.serviceRadiusKm || 35} km radius</strong> of South Brisbane.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 px-4 text-center text-xs text-slate-500">
        SameDayRepairs.com.au Contractor Network • Contractor Support:{" "}
        <a href="tel:0468991300" className="text-slate-800 font-bold hover:underline">
          0468 991 300
        </a>
      </footer>
    </div>
  );
}
