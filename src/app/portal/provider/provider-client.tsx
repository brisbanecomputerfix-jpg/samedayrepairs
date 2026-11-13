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
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
              Tradie Portal
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* On-Duty / Off-Duty Toggle Button */}
            <button
              onClick={() => {
                toggleProviderOnDuty();
                showToast(
                  provider?.isOnDuty
                    ? "You are now OFF-DUTY. New dispatches paused."
                    : "You are now ON-DUTY! Live emergency radar active."
                );
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-md ${
                provider?.isOnDuty
                  ? "bg-emerald-500 text-zinc-950 shadow-emerald-500/20"
                  : "bg-zinc-800 text-zinc-400 border border-zinc-700"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  provider?.isOnDuty ? "bg-zinc-950 animate-ping" : "bg-zinc-500"
                }`}
              />
              <span>{provider?.isOnDuty ? "On-Duty (Available)" : "Off-Duty (Paused)"}</span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
              <span className="text-xs font-semibold text-zinc-300 hidden md:inline">
                {provider ? provider.contactName : "Tradie"}
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

      {/* Main Dashboard */}
      <main className="container mx-auto max-w-6xl px-4 py-8 flex-1 space-y-8">
        {/* Top Fleet & Metrics Banner */}
        <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>ABN {provider?.abn || "Verified"}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-mono text-[11px]">
                {provider?.vehiclePlate}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {provider?.businessName || "Express Whitegoods & Fridge Rescue"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Primary Specialist: <strong className="text-white">{provider?.contactName}</strong> • {provider?.category} ({provider?.city})
            </p>
          </div>

          <div className="flex items-center gap-4 bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Today's Earnings</span>
              <div className="text-2xl font-black text-emerald-400 flex items-center">
                <span>${provider?.todayEarnings || 0}</span>
                <span className="text-xs text-zinc-400 ml-1 font-normal">AUD</span>
              </div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Completed Today</span>
              <span className="text-2xl font-black text-white">
                {provider?.completedJobsToday || 0}
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-500 block">Tradie Rating</span>
              <span className="text-2xl font-black text-amber-400">
                {provider?.rating || "4.9"} ★
              </span>
            </div>
          </div>
        </div>

        {/* Incoming Emergency Broadcast Radar */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
              <Radio className="h-4 w-4 text-orange-500 animate-pulse" />
              <span>Live Emergency Dispatch Radar (Within Your Radius)</span>
            </h2>
            <span className="text-xs text-zinc-500">
              {provider?.broadcastQueue?.length || 0} Opportunities Available
            </span>
          </div>

          {provider?.broadcastQueue && provider.broadcastQueue.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {provider.broadcastQueue.map((bcast: any) => (
                <div
                  key={bcast.id}
                  className="rounded-2xl border-2 border-orange-500/40 bg-zinc-900 p-5 space-y-4 shadow-xl hover:border-orange-500 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-orange-400">
                          #{bcast.ticketRef}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 text-[10px] font-bold">
                          {bcast.distanceKm} km away • {bcast.suburb}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1.5">{bcast.category}</h3>
                      <p className="text-xs text-zinc-300 mt-1 leading-relaxed">"{bcast.issue}"</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                        Est. Payout
                      </span>
                      <span className="text-sm font-black text-emerald-400">
                        {bcast.payoutEstimate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
                    <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-zinc-500" />
                      <span>Logged {bcast.minutesAgo} mins ago • {bcast.urgency}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          declineBroadcastJob(bcast.id);
                          showToast("Job declined and passed to next closest van.");
                        }}
                        className="px-3 py-1.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-semibold cursor-pointer"
                      >
                        Pass
                      </button>
                      <button
                        onClick={() => {
                          acceptBroadcastJob(bcast.id);
                          showToast(`Job #${bcast.ticketRef} accepted! Added to your active roster.`);
                        }}
                        className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
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
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-center text-xs text-zinc-500">
              No new unassigned broadcasts in your immediate vicinity right now. Radar will automatically chime when a new customer logs an urgent request.
            </div>
          )}
        </section>

        {/* Active Dispatched Jobs List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Wrench className="h-4 w-4 text-amber-500" />
              <span>My Active Dispatched Jobs ({provider?.activeJobs?.length || 0})</span>
            </h2>
          </div>

          <div className="space-y-4">
            {(provider?.activeJobs || []).map((job: any) => (
              <div
                key={job.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6 space-y-4 shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        #{job.ticketRef}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                          job.status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        <span>Status: {job.status}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{job.issue}</h3>
                    <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                      <span>{job.address}, {job.suburb}</span>
                      <span className="text-zinc-600">•</span>
                      <span>Customer: <strong>{job.customerName}</strong></span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={`tel:${job.customerPhone.replace(/\s+/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-zinc-700 transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Call {job.customerPhone}</span>
                    </a>

                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(job.address + " " + job.suburb)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:text-white hover:bg-zinc-700 transition-colors"
                    >
                      <Navigation className="h-3.5 w-3.5 text-amber-400" />
                      <span>GPS Maps</span>
                    </a>

                    <Link
                      href={`/dispatch/${job.ticketRef}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-3.5 py-2 text-xs font-bold text-zinc-200 hover:text-white transition-colors"
                    >
                      <span>Customer View</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Job Progression Stepper */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="text-xs text-zinc-400">
                    <span className="block font-semibold text-zinc-300">Guaranteed Fee Note:</span>
                    <span>{job.diagnosticFee} • Estimated: {job.totalQuote}</span>
                  </div>

                  {job.status !== "Completed" && (
                    <div className="flex items-center gap-2">
                      {job.status === "En Route" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Arrived");
                            showToast("Job status updated to ARRIVED on site.");
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
                        >
                          Mark Arrived on Site
                        </button>
                      )}

                      {job.status === "Arrived" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "In Progress");
                            showToast("Diagnostic approved. Status updated to IN PROGRESS.");
                          }}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
                        >
                          Approve Quote & Start Repair
                        </button>
                      )}

                      {job.status === "In Progress" && (
                        <button
                          onClick={() => {
                            updateJobStatus(job.id, "Completed");
                            showToast(
                              "Job successfully marked as COMPLETED! $180 credited to your account balance."
                            );
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-colors shadow-sm cursor-pointer"
                        >
                          Mark Complete & Issue $180 Receipt
                        </button>
                      )}
                    </div>
                  )}

                  {job.status === "Completed" && (
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Job Finished & Signed Off</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fleet & Coverage Settings */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-amber-500" />
              <span>Service Area & Radius Settings</span>
            </h2>
            <span className="text-xs font-bold text-amber-400">
              {provider?.serviceRadiusKm || 35} km Coverage Radius
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
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>10 km (Inner City Only)</span>
              <span>35 km (Standard Metro)</span>
              <span>60 km (Outer Suburbs & Regional)</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            Dispatch broadcasts will only alert your vehicle when the emergency customer is located within your configured{" "}
            <strong>{provider?.serviceRadiusKm || 35} km radius</strong> of South Brisbane.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-4 px-4 text-center text-xs text-zinc-500">
        SameDayRepairs.com.au Tradie Dispatch Network • Support Hotline:{" "}
        <a href="tel:0468991300" className="text-zinc-300 font-bold hover:underline">
          0468 991 300
        </a>
      </footer>
    </div>
  );
}
