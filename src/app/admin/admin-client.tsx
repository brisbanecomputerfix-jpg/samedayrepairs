"use client";

import * as React from "react";
import Link from "next/link";
import {
  ActiveDispatchTicket,
  INITIAL_ACTIVE_DISPATCHES,
  PendingTradieApplication,
  INITIAL_PENDING_APPLICATIONS,
} from "@/data/mock-dispatches";
import { INITIAL_PROVIDERS } from "@/data/providers";
import { RepairProvider } from "@/types";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import {
  Zap,
  ShieldCheck,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  Truck,
  Users,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Lock,
  Unlock,
} from "lucide-react";

export function AdminClient() {
  const [pinUnlocked, setPinUnlocked] = React.useState<boolean>(true);
  const [activeTab, setActiveTab] = React.useState<"dispatches" | "applications" | "roster">("dispatches");

  // State
  const [dispatches, setDispatches] = React.useState<ActiveDispatchTicket[]>(INITIAL_ACTIVE_DISPATCHES);
  const [applications, setApplications] = React.useState<PendingTradieApplication[]>(INITIAL_PENDING_APPLICATIONS);
  const [providers, setProviders] = React.useState<RepairProvider[]>(INITIAL_PROVIDERS);
  const [selectedCityFilter, setSelectedCityFilter] = React.useState<string>("all");

  // Actions
  const handleAdvanceStatus = (ticketId: string) => {
    setDispatches((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          if (t.status === "Broadcasted") return { ...t, status: "Accepted" };
          if (t.status === "Accepted") return { ...t, status: "En Route", etaMinutes: 20 };
          if (t.status === "En Route") return { ...t, status: "Arrived", etaMinutes: 0 };
          if (t.status === "Arrived") return { ...t, status: "Completed" };
        }
        return t;
      })
    );
  };

  const handleApproveApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: "approved" } : a))
    );
  };

  const handleRejectApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: "rejected" } : a))
    );
  };

  const handleToggleOnDuty = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, isOnDutyToday: !p.isOnDutyToday } : p))
    );
  };

  const filteredDispatches = dispatches.filter((d) => {
    if (selectedCityFilter !== "all" && !d.city.toLowerCase().includes(selectedCityFilter.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="border-b border-zinc-800 bg-zinc-900/90 px-4 py-3 sticky top-0 z-30 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-black">
                <Zap className="h-4 w-4 fill-zinc-950" />
              </div>
              <span className="font-black text-sm text-white">SameDayRepairs</span>
            </Link>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30">
              Operations Center
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span>National Dispatch Active</span>
            </span>

            <Link
              href="/"
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs font-semibold hover:bg-zinc-700 transition-colors"
            >
              Public Site →
            </Link>
          </div>
        </div>
      </header>

      {/* KPI Overview Metrics */}
      <div className="border-b border-zinc-800 bg-zinc-900/40 px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Dispatches Today
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400">{dispatches.length + 34}</span>
                <span className="text-[11px] text-emerald-400 font-bold">+18% vs avg</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                On-Duty Fleet
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400">
                  {providers.filter((p) => p.isOnDutyToday).length} Mobile Vans
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Avg Response Time
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-sky-400">41 Mins</span>
                <span className="text-[11px] text-zinc-400">Arrival window</span>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Pending Tradie Signups
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-orange-400">
                  {applications.filter((a) => a.status === "pending").length} Awaiting
                </span>
                <span className="text-[11px] text-zinc-400">ABN check</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-zinc-800">
            <button
              onClick={() => setActiveTab("dispatches")}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "dispatches"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Truck className="h-4 w-4" />
              <span>Live Emergency Dispatches ({filteredDispatches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "applications"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Tradie Onboarding Review ({applications.filter((a) => a.status === "pending").length})</span>
            </button>

            <button
              onClick={() => setActiveTab("roster")}
              className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "roster"
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-zinc-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>On-Duty Roster ({providers.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8 flex-1">
        {/* TAB 1: LIVE DISPATCHES */}
        {activeTab === "dispatches" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-black text-white">Active Dispatch Stream</h2>
                <p className="text-xs text-zinc-400">
                  Simulated live emergency repair tickets currently dispatched to Australian vans.
                </p>
              </div>

              {/* City filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">Region:</span>
                <select
                  value={selectedCityFilter}
                  onChange={(e) => setSelectedCityFilter(e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white focus:outline-hidden"
                >
                  <option value="all">All Regions</option>
                  <option value="brisbane">Greater Brisbane</option>
                  <option value="sydney">Greater Sydney</option>
                  <option value="melbourne">Greater Melbourne</option>
                  <option value="gold-coast">Gold Coast</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/60 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Ticket Ref</th>
                    <th className="p-3.5">Customer & Suburb</th>
                    <th className="p-3.5">Vertical & Problem</th>
                    <th className="p-3.5">Assigned Specialist</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {filteredDispatches.map((d) => (
                    <tr key={d.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-amber-400">
                        <Link href={`/dispatch/${d.id}`} className="hover:underline flex items-center gap-1">
                          <span>{d.id}</span>
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </Link>
                        <span className="text-[10px] text-zinc-500 block font-sans font-normal">
                          {d.createdAt}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-white">{d.customerName}</div>
                        <div className="text-[11px] text-zinc-400">
                          {d.suburb}, {d.city}
                        </div>
                        <div className="text-[10px] text-zinc-500">{d.customerPhone}</div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <span className="rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                          {d.categoryName}
                        </span>
                        <p className="mt-1 text-zinc-300 text-[11px] line-clamp-2">
                          "{d.issue}"
                        </p>
                      </td>

                      <td className="p-3.5">
                        <div className="font-semibold text-zinc-200">
                          {d.assignedTechName || "Searching on-call pool..."}
                        </div>
                        {d.assignedTechVehicle && (
                          <div className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Truck className="h-3 w-3 text-zinc-500" />
                            <span>{d.assignedTechVehicle}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                            d.status === "En Route"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : d.status === "Arrived"
                              ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                              : d.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          {d.status === "En Route" && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />}
                          <span>{d.status}</span>
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        {d.status !== "Completed" ? (
                          <button
                            onClick={() => handleAdvanceStatus(d.id)}
                            className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1 text-[11px] font-bold text-white border border-zinc-700 hover:border-zinc-600 transition-colors"
                          >
                            Advance Status →
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-400 font-bold">✓ Signed Off</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: TRADIE ONBOARDING REVIEW */}
        {activeTab === "applications" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-black text-white">Pending Contractor Registrations</h2>
              <p className="text-xs text-zinc-400">
                Review ABN credentials, trade licensing, and public liability insurance before publishing to directory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{app.submittedAt}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                          app.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : app.status === "rejected"
                            ? "bg-red-500/20 text-red-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white">{app.businessName}</h3>
                    <div className="mt-1 text-xs text-zinc-400">
                      Contact: <strong>{app.contactName}</strong> ({app.contactPhone})
                    </div>
                    <div className="text-xs text-zinc-400">
                      Base: <strong>{app.suburb}, {app.city}</strong>
                    </div>

                    {/* ABN details */}
                    <div className="mt-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">ABN Number:</span>
                        <a
                          href={`https://abr.business.gov.au/ABN/View?id=${app.abn.replace(/\s+/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <span>{app.abn}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-zinc-500">Public Liability:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> $5M+ Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center gap-2">
                    {app.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApproveApplication(app.id)}
                          className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                        <button
                          onClick={() => handleRejectApplication(app.id)}
                          className="rounded-xl border border-zinc-700 hover:bg-zinc-800 py-2 px-3 text-xs font-bold text-red-400 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center text-xs font-bold text-zinc-400 py-1">
                        Application {app.status.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ON-DUTY ROSTER MANAGEMENT */}
        {activeTab === "roster" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-black text-white">Technician On-Duty Roster</h2>
              <p className="text-xs text-zinc-400">
                Toggle availability status for provider listings across Australian cities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {providers.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-zinc-400">
                        {p.suburb}, {p.state}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          p.isOnDutyToday
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-zinc-800 text-zinc-500"
                        }`}
                      >
                        {p.isOnDutyToday ? "● LIVE ON-DUTY" : "○ PAUSED"}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white">{p.name}</h3>
                    <p className="text-xs text-amber-400 mt-0.5">{p.tagline}</p>
                    <div className="mt-2 text-xs text-zinc-400">
                      Phone: <strong>{p.phone}</strong> • ABN: {p.abn}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Cutoff: {p.sameDayCutoffTime}</span>

                    <button
                      onClick={() => handleToggleOnDuty(p.id)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        p.isOnDutyToday
                          ? "bg-red-950 text-red-300 hover:bg-red-900 border border-red-800"
                          : "bg-emerald-600 text-white hover:bg-emerald-500"
                      }`}
                    >
                      {p.isOnDutyToday ? "Set Off-Duty" : "Activate On-Duty"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
