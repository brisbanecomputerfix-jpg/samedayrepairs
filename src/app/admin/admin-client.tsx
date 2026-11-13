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
  RotateCw,
} from "lucide-react";

export function AdminClient() {
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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Admin Command Header */}
      <header className="border-b border-slate-800 bg-slate-900 px-4 py-3 sticky top-0 z-30 shadow-xs">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-black shadow-xs">
                <Zap className="h-4 w-4 fill-white text-white" />
              </div>
              <span className="font-bold text-sm text-white">
                SameDayRepairs<span className="text-orange-500">.com.au</span>
              </span>
            </Link>
            <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-semibold text-slate-300">
              Operations Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="hidden sm:flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Network Operations: Live</span>
            </span>

            <Link
              href="/"
              className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              Public Site →
            </Link>
          </div>
        </div>
      </header>

      {/* KPI Overview Telemetry Metrics */}
      <div className="border-b border-slate-200 bg-white px-4 py-6 shadow-2xs">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Bookings Today
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-950">{dispatches.length + 38}</span>
                <span className="text-xs text-emerald-700 font-semibold">+24% vs avg</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                On-Duty Active Fleet
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-700">
                  {providers.filter((p) => p.isOnDutyToday).length} Vans
                </span>
                <span className="text-xs text-slate-500">Active</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Average Arrival Window
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-orange-600">42 Mins</span>
                <span className="text-xs text-slate-500">Across metros</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Pending Contractor Audits
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-700">
                  {applications.filter((a) => a.status === "pending").length} Awaiting
                </span>
                <span className="text-xs text-slate-500">ABN check</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex items-center gap-2 border-b border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("dispatches")}
              className={`pb-3 px-3.5 transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "dispatches"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Truck className="h-4 w-4" />
              <span>Active Bookings ({filteredDispatches.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`pb-3 px-3.5 transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "applications"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Contractor Applications ({applications.filter((a) => a.status === "pending").length})</span>
            </button>

            <button
              onClick={() => setActiveTab("roster")}
              className={`pb-3 px-3.5 transition-all border-b-2 -mb-px cursor-pointer flex items-center gap-1.5 ${
                activeTab === "roster"
                  ? "border-orange-600 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Contractor Roster ({providers.length})</span>
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
                <h2 className="text-xl font-black text-slate-950 tracking-tight">Active Dispatch Stream</h2>
                <p className="text-xs text-slate-600 font-medium">
                  Real-time emergency tickets currently dispatched to Australian mobile workshops.
                </p>
              </div>

              {/* City filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-bold uppercase font-mono">Metro:</span>
                <select
                  value={selectedCityFilter}
                  onChange={(e) => setSelectedCityFilter(e.target.value)}
                  className="rounded-lg border-2 border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer"
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
            <div className="overflow-x-auto rounded-xl border-2 border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50 text-slate-600 font-black font-mono uppercase tracking-wider text-[10px]">
                    <th className="p-3.5">Ticket Ref</th>
                    <th className="p-3.5">Customer & Suburb</th>
                    <th className="p-3.5">Vertical & Issue</th>
                    <th className="p-3.5">Assigned Van</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredDispatches.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold font-mono text-slate-900">
                        <Link href={`/dispatch/${d.id}`} className="hover:text-orange-600 flex items-center gap-1 font-black">
                          <span>{d.id}</span>
                          <ExternalLink className="h-3 w-3 opacity-60 text-orange-600" />
                        </Link>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {d.createdAt}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-black text-slate-950">{d.customerName}</div>
                        <div className="text-[11px] text-slate-600 font-medium">
                          {d.suburb}, {d.city}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{d.customerPhone}</div>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <span className="rounded bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-800 font-mono">
                          {d.categoryName}
                        </span>
                        <p className="mt-1 text-slate-600 text-[11px] line-clamp-2 font-medium">
                          "{d.issue}"
                        </p>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">
                          {d.assignedTechName || "Searching on-call pool..."}
                        </div>
                        {d.assignedTechVehicle && (
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                            <Truck className="h-3 w-3 text-slate-400" />
                            <span>{d.assignedTechVehicle}</span>
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-mono font-bold ${
                            d.status === "En Route"
                              ? "bg-amber-100 text-amber-950 border border-amber-300"
                              : d.status === "Arrived"
                              ? "bg-blue-100 text-blue-950 border border-blue-300"
                              : d.status === "Completed"
                              ? "bg-emerald-100 text-emerald-950 border border-emerald-300"
                              : "bg-slate-100 text-slate-800 border border-slate-200"
                          }`}
                        >
                          {d.status === "En Route" && <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" />}
                          <span>{d.status}</span>
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        {d.status !== "Completed" ? (
                          <button
                            onClick={() => handleAdvanceStatus(d.id)}
                            className="rounded-lg bg-slate-950 hover:bg-slate-800 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300 transition-colors cursor-pointer shadow-2xs"
                          >
                            Advance →
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-800 font-bold font-mono">✓ Closed & Signed</span>
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
              <h2 className="text-xl font-black text-slate-950 tracking-tight">Pending Contractor Registrations</h2>
              <p className="text-xs text-slate-600 font-medium">
                Review ABN credentials, trade licensing, and public liability insurance before publishing to the live directory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{app.submittedAt}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                          app.status === "approved"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : app.status === "rejected"
                            ? "bg-red-100 text-red-900 border border-red-300"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-950">{app.businessName}</h3>
                    <div className="mt-1 text-xs text-slate-600 font-medium">
                      Contact: <strong>{app.contactName}</strong> ({app.contactPhone})
                    </div>
                    <div className="text-xs text-slate-600 font-medium">
                      Base: <strong>{app.suburb}, {app.city}</strong>
                    </div>

                    {/* ABN details */}
                    <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">ABN Number:</span>
                        <a
                          href={`https://abr.business.gov.au/ABN/View?id=${app.abn.replace(/\s+/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-orange-600 font-bold hover:underline flex items-center gap-1 text-[11px]"
                        >
                          <span>{app.abn}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Public Liability:</span>
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> $5M+ Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2">
                    {app.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleApproveApplication(app.id)}
                          className="flex-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 py-2 text-xs font-black uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Approve Van</span>
                        </button>
                        <button
                          onClick={() => handleRejectApplication(app.id)}
                          className="rounded-lg border-2 border-slate-200 hover:bg-slate-100 py-2 px-3 text-xs font-bold text-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <div className="w-full text-center text-xs font-bold font-mono text-slate-500 py-1">
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
              <h2 className="text-xl font-black text-slate-950 tracking-tight">Technician On-Duty Roster</h2>
              <p className="text-xs text-slate-600 font-medium">
                Toggle availability status for provider listings across Australian cities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {providers.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-slate-500 font-mono">
                        {p.suburb}, {p.state}
                      </span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                          p.isOnDutyToday
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-slate-100 text-slate-500 border border-slate-200"
                        }`}
                      >
                        {p.isOnDutyToday ? "● LIVE ON-DUTY" : "○ PAUSED"}
                      </span>
                    </div>

                    <h3 className="font-black text-base text-slate-950">{p.name}</h3>
                    <p className="text-xs text-orange-700 font-bold mt-0.5">{p.tagline}</p>
                    <div className="mt-2 text-xs text-slate-600 font-mono">
                      Phone: <strong>{p.phone}</strong> • ABN: {p.abn}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">Cutoff: {p.sameDayCutoffTime}</span>

                    <button
                      onClick={() => handleToggleOnDuty(p.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-mono font-black uppercase tracking-wider transition-all cursor-pointer shadow-2xs ${
                        p.isOnDutyToday
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300"
                          : "bg-emerald-700 text-white hover:bg-emerald-800"
                      }`}
                    >
                      {p.isOnDutyToday ? "Pause Roster" : "Activate On-Duty"}
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
