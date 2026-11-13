"use client";

import * as React from "react";
import Link from "next/link";
import {
  ActiveDispatchTicket,
  INITIAL_ACTIVE_DISPATCHES,
} from "@/data/mock-dispatches";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { UrgentDispatchModal } from "@/components/urgent-dispatch-modal";
import { ListBusinessModal } from "@/components/list-business-modal";
import {
  Zap,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Truck,
  UserCheck,
  ChevronRight,
  AlertCircle,
  RotateCw,
  Sparkles,
  FileText,
} from "lucide-react";

interface DispatchClientProps {
  ticketId: string;
}

export function DispatchClient({ ticketId }: DispatchClientProps) {
  const [isDispatchOpen, setIsDispatchOpen] = React.useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState<boolean>(false);

  // Match existing or create realistic dynamic ticket
  const initialTicket: ActiveDispatchTicket =
    INITIAL_ACTIVE_DISPATCHES.find((t) => t.id.toLowerCase() === ticketId.toLowerCase()) || {
      id: ticketId.toUpperCase(),
      customerName: "Sarah Jenkins",
      customerPhone: "0468 991 300",
      suburb: "Chermside",
      city: "Greater Brisbane",
      categoryName: "Appliance & Whitegoods",
      issue: "Emergency technician dispatch request logged via SameDayRepairs portal.",
      urgency: "Emergency (1-2 Hours)",
      status: "En Route",
      assignedTechName: "Dave Mitchell (Express Whitegoods)",
      assignedTechPhone: "0468 991 300",
      assignedTechVehicle: "Toyota HiAce Mobile Workshop #QLD-728",
      etaMinutes: 18,
      createdAt: "12 mins ago",
    };

  const [ticket, setTicket] = React.useState<ActiveDispatchTicket>(initialTicket);

  // Simulation controls to demonstrate live lifecycle
  const advanceTicketStatus = () => {
    if (ticket.status === "Broadcasted") {
      setTicket({ ...ticket, status: "Accepted", etaMinutes: 30 });
    } else if (ticket.status === "Accepted") {
      setTicket({ ...ticket, status: "En Route", etaMinutes: 15 });
    } else if (ticket.status === "En Route") {
      setTicket({ ...ticket, status: "Arrived", etaMinutes: 0 });
    } else if (ticket.status === "Arrived") {
      setTicket({ ...ticket, status: "Completed" });
    }
  };

  // Step indices
  const steps = [
    { title: "Request Received", desc: "Logged with dispatch", done: true },
    {
      title: "Tech Assigned",
      desc: ticket.assignedTechName ? "Dave Mitchell" : "Matching local van",
      done: ticket.status !== "Broadcasted",
      active: ticket.status === "Accepted",
    },
    {
      title: "En Route",
      desc: ticket.etaMinutes ? `ETA ~${ticket.etaMinutes} mins` : "On the road",
      done: ["En Route", "Arrived", "Completed"].includes(ticket.status),
      active: ticket.status === "En Route",
    },
    {
      title: "On Site Diagnostic",
      desc: "$149 fixed triage",
      done: ["Arrived", "Completed"].includes(ticket.status),
      active: ticket.status === "Arrived",
    },
    {
      title: "Repair Complete",
      desc: "12-mo warranty active",
      done: ticket.status === "Completed",
      active: ticket.status === "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        selectedCityId="brisbane"
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 text-xs py-3 px-4">
        <div className="container mx-auto max-w-4xl flex items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Service Tracker</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-slate-900">
            {ticket.id}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 flex-1">
        {/* Main Status Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-amber-400">
                  REF: {ticket.id}
                </span>
                <span className="text-xs text-slate-500">Logged {ticket.createdAt}</span>
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Live Repair Status Tracker
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {ticket.categoryName} • {ticket.suburb}, {ticket.city}
              </p>
            </div>

            {/* Current State Pill */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-950 self-start sm:self-auto flex items-center gap-3 shadow-2xs">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Current Status
                </div>
                <div className="text-sm font-bold text-emerald-950">
                  {ticket.status === "En Route"
                    ? `En Route • ETA ~${ticket.etaMinutes || 18} Mins`
                    : ticket.status}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3 border text-xs transition-all ${
                    st.active
                      ? "border-orange-500 bg-orange-50 text-orange-950 ring-2 ring-orange-500/20"
                      : st.done
                      ? "border-emerald-200 bg-emerald-50/60 text-slate-900"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold mb-1">
                    {st.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0">
                        {i + 1}
                      </span>
                    )}
                    <span className="text-xs truncate">{st.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {st.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Advancement Bar */}
          {ticket.status !== "Completed" && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span>Demo Interactive Simulator:</span>
              </div>
              <button
                type="button"
                onClick={advanceTicketStatus}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Advance Van Status →</span>
              </button>
            </div>
          )}
        </div>

        {/* Two-Column Details Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assigned Technician Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Assigned Technician
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                  On-Duty
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center font-black text-lg shrink-0">
                  DM
                </div>
                <div>
                  <h3 className="font-bold text-slate-950 text-base">
                    {ticket.assignedTechName || "Dave Mitchell"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Express Whitegoods Rescue
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-3 w-3" />
                    <span>QBCC #15092831 Audited</span>
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{ticket.assignedTechVehicle || "Toyota HiAce Workshop #QLD-728"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>Average travel time: 15–25 mins</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="tel:0468991300"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-3 text-xs font-bold transition-colors shadow-2xs"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>Call Specialist: 0468 991 300</span>
              </a>
            </div>
          </div>

          {/* Job Specifics & Diagnostic Pricing Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs md:col-span-2 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Reported Issue Summary
              </span>
              <h3 className="font-bold text-base text-slate-950 leading-snug">
                {ticket.issue}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                <div className="text-[10px] uppercase font-bold text-slate-400">Property</div>
                <div className="font-bold text-slate-900 mt-1">{ticket.suburb}, {ticket.city}</div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3">
                <div className="text-[10px] uppercase font-bold text-slate-400">Resident</div>
                <div className="font-bold text-slate-900 mt-1">{ticket.customerName}</div>
              </div>

              <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-3 col-span-2 sm:col-span-1">
                <div className="text-[10px] uppercase text-amber-800 font-bold">Diagnostic Cap</div>
                <div className="font-bold text-amber-950 mt-1">$149 inc. GST (Credited)</div>
              </div>
            </div>

            {/* Arrival Notice Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <MapPin className="h-4 w-4 text-orange-600" />
                <span>Technician En Route to {ticket.suburb}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mobile workshop vehicle carrying genuine OEM replacement parts. Technician will call ahead 10 minutes prior to arrival.
              </p>
            </div>

            {/* Consumer Rights Protection Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Australian Consumer Law Guarantee:</strong> All diagnostics follow fixed upfront quoting standards. Approved replacement parts carry minimum 12-month manufacturer warranties.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenDispatch={() => setIsDispatchOpen(true)}
      />
      <MobileStickyBar onOpenDispatch={() => setIsDispatchOpen(true)} />

      <UrgentDispatchModal
        isOpen={isDispatchOpen}
        onClose={() => setIsDispatchOpen(false)}
        defaultCityId="brisbane"
      />
      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
