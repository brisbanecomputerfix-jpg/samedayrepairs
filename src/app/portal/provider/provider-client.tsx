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
  Radio,
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
                  Tradie Mobile Fleet
                </span>
              </div>
            </Link>
            <div className="hidden sm:inline-block px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider">
              LICENSED CONTRACTOR DESK
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* On-Duty / Off-Duty Toggle Button */}
            <button
              onClick={() => {
                toggleProviderOnDuty();
                showToast(
                  provider?.isOnDuty
                    ? "Status: OFF-DUTY. Live emergency broadcasts paused."
                    : "Status: ON-DUTY! Live emergency radar is active and scanning."
                );
              }}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border-2 ${
                provider?.isOnDuty
                  ? "bg-emerald-600 text-white border-emerald-700 shadow-sm"
                  : "bg-slate-200 text-slate-600 border-slate-300"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  provider?.isOnDuty ? "bg-white animate-ping" : "bg-slate-400"
                }`}
              />
              <span>{provider?.isOnDuty ? "ON-DUTY (ROSTER ACTIVE)" : "OFF-DUTY (PAUSED)"}</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l-2 border-slate-200">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-black text-slate-900 leading-tight">
                  {provider ? provider.contactName : "Dave Mitchell"}
                </span>
                <span className="text-[10px] font-mono text-slate-500">Primary Tech</span>
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

      {/* Main Dashboard */}
      <main className="container mx-auto max-w-6xl px-4 py-8 flex-1 space-y-8">
        {/* Top Fleet & Metrics Banner */}
        <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 sm:p-7 shadow-[4px_4px_0_0_#0f172a] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono font-bold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>ABN {provider?.abn || "48 619 402 188"}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-300 text-slate-800 font-mono font-bold text-[11px] flex items-center gap-1">
                <Truck className="h-3 w-3 text-slate-600" />
                <span>{provider?.vehiclePlate || "Toyota HiAce #QLD-728"}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 font-mono text-[10px] font-bold">
                QBCC #15092831 VERIFIED
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              {provider?.businessName || "Express Whitegoods & Fridge Rescue"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Primary Specialist: <strong className="text-slate-900">{provider?.contactName}</strong> • {provider?.category} ({provider?.city || "Greater Brisbane"})
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Today's Earnings
              </span>
              <div className="text-2xl font-black text-emerald-700 flex items-baseline">
                <span>${provider?.todayEarnings || 0}</span>
                <span className="text-[10px] font-mono text-slate-500 ml-1">AUD</span>
              </div>
            </div>
            <div className="border-l border-slate-300 pl-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Vans Cleared
              </span>
              <span className="text-2xl font-black text-slate-950">
                {provider?.completedJobsToday || 0}
              </span>
            </div>
            <div className="border-l border-slate-300 pl-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                Tradie Rating
              </span>
              <span className="text-2xl font-black text-amber-600">
                {provider?.rating || "4.9"} ★
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Emergency Broadcast Radar */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-orange-700 flex items-center gap-2">
              <Radio className="h-4 w-4 text-orange-600 animate-pulse" />
              <span>LIVE EMERGENCY DISPATCH BROADCAST RADAR (WITHIN YOUR {provider?.serviceRadiusKm || 35}KM RADIUS)</span>
            </h2>
            <span className="text-xs font-mono font-bold text-slate-600">
              {provider?.broadcastQueue?.length || 0} EMERGENCY JOBS PENDING
            </span>
          </div>

          {provider?.broadcastQueue && provider.broadcastQueue.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.broadcastQueue.map((bcast: any) => (
                <div
                  key={bcast.id}
                  className="rounded-xl border-2 border-slate-900 bg-white p-5 space-y-4 shadow-[3px_3px_0_0_#0f172a] hover:border-orange-600 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                          #{bcast.ticketRef}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-900 font-mono text-[10px] font-bold border border-orange-300">
                          {bcast.distanceKm} km away • {bcast.suburb}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-slate-950 mt-2">{bcast.category}</h3>
                      <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                        "{bcast.issue}"
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block">
                        Est. Payout
                      </span>
                      <span className="text-sm font-black text-emerald-700">
                        {bcast.payoutEstimate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs">
                    <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>Logged {bcast.minutesAgo}m ago • {bcast.urgency}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          declineBroadcastJob(bcast.id);
                          showToast("Emergency job passed to next nearest available workshop van.");
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-950 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => {
                          acceptBroadcastJob(bcast.id);
                          showToast(`Job #${bcast.ticketRef} accepted! Van dispatched & assigned to your active workload.`);
                        }}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Accept & Roll Van</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center text-xs text-slate-500 font-medium">
              No pending unassigned broadcasts in your immediate perimeter right now. The radar will alert you immediately when a new crisis is submitted.
            </div>
          )}
        </section>

        {/* Active Dispatched Jobs List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-orange-600" />
              <span>MY ACTIVE DISPATCHED ROSTER ({provider?.activeJobs?.length || 0} ON-CALL JOBS)</span>
            </h2>
          </div>

          <div className="space-y-4">
            {(provider?.activeJobs || []).map((job: any) => (
              <div
                key={job.id}
                className="rounded-2xl border-2 border-slate-900 bg-white p-5 sm:p-6 space-y-4 shadow-[4px_4px_0_0_#0f172a]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black bg-slate-900 text-amber-300 px-2 py-0.5 rounded-md">
                        #{job.ticketRef}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold flex items-center gap-1 ${
                          job.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        <span>STATUS: {job.status.toUpperCase()}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-950">{job.issue}</h3>
                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.address}, {job.suburb}</span>
                      <span className="text-slate-400">•</span>
                      <span>Resident: <strong className="text-slate-900">{job.customerName}</strong></span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`tel:${job.customerPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-900 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-black text-slate-900 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-orange-600" />
                      <span>Call {job.customerPhone}</span>
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(job.address + " " + job.suburb)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 text-xs font-black text-slate-900 transition-colors"
                    >
                      <Navigation className="h-3.5 w-3.5 text-slate-700" />
                      <span>GPS Route</span>
                    </a>

                    <Link
                      href={`/dispatch/${job.ticketRef}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 px-3.5 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors"
                    >
                      <span>Telemetry Screen</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Job Progression Stepper */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-slate-600 font-medium">
                    <span className="block font-black text-slate-900 font-mono">STATUTORY BILLING NOTICE:</span>
                    <span>{job.diagnosticFee} • Estimated: {job.totalQuote}</span>
                  </div>

                  {job.status !== "Completed" && (
                    <div className="flex items-center gap-2">
                      {job.status === "En Route" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Arrived");
                            showToast("Van arrival logged. Status updated to ARRIVED on site.");
                          }}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          Mark Arrived on Site
                        </button>
                      )}

                      {job.status === "Arrived" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "In Progress");
                            showToast("Diagnostic quote approved by homeowner. Work started.");
                          }}
                          className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          Approve Quote & Start Repair
                        </button>
                      )}

                      {job.status === "In Progress" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Completed");
                            showToast(
                              "Job successfully COMPLETED! $280 credited to your account balance."
                            );
                          }}
                          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                        >
                          Mark Complete & Issue $280 Tax Receipt
                        </button>
                      )}
                    </div>
                  )}

                  {job.status === "Completed" && (
                    <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCheck className="h-4 w-4" />
                      <span>JOB FINISHED • 12-MO WARRANTY FILED</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet & Coverage Settings */}
        <section className="rounded-2xl border-2 border-slate-900 bg-white p-5 sm:p-6 space-y-4 shadow-[4px_4px_0_0_#0f172a]">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-orange-600" />
              <span>VAN SERVICE RADIUS & DISPATCH BOUNDARY</span>
            </h2>
            <span className="text-xs font-mono font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-md">
              {provider?.serviceRadiusKm || 35} KM COVERAGE RADIUS
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
            <div className="flex justify-between text-[11px] font-mono text-slate-500 font-medium">
              <span>10 km (Inner City Only)</span>
              <span>35 km (Standard Greater Metro)</span>
              <span>60 km (Outer Suburbs & Sunshine Coast)</span>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Emergency broadcasts will only chime your workshop tablet when the homeowner crisis is located within your configured{" "}
            <strong>{provider?.serviceRadiusKm || 35} km radius</strong> of South Brisbane depot.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-slate-900 bg-white py-4 px-4 text-center text-xs text-slate-600 font-medium">
        SameDayRepairs.com.au Contractor Network • Support Desk Hotline:{" "}
        <a href="tel:0468991300" className="text-orange-600 font-black hover:underline">
          0468 991 300
        </a>
      </footer>
    </div>
  );
}
