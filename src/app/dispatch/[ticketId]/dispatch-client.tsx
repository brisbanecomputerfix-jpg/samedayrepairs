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
    { title: "Broadcast Sent", desc: "Sent to local fleet", done: true },
    {
      title: "Tech Assigned",
      desc: ticket.assignedTechName ? "Dave Mitchell" : "Matching van",
      done: ticket.status !== "Broadcasted",
      active: ticket.status === "Accepted",
    },
    {
      title: "En Route",
      desc: ticket.etaMinutes ? `ETA ~${ticket.etaMinutes}m` : "On the road",
      done: ["En Route", "Arrived", "Completed"].includes(ticket.status),
      active: ticket.status === "En Route",
    },
    {
      title: "Arrived / Diagnostic",
      desc: "$149 upfront triage",
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 sm:pb-0">
      <Navbar
        selectedCityId="brisbane"
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs py-2 px-4">
        <div className="container mx-auto max-w-4xl flex items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span>Dispatch Terminal</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-slate-900 font-mono">
            {ticket.id}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 flex-1">
        {/* Main Status Header Card */}
        <div className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-mono font-black text-amber-300">
                  TICKET: {ticket.id}
                </span>
                <span className="text-xs text-slate-500 font-mono">Logged {ticket.createdAt}</span>
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Emergency Van Telemetry
              </h1>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                {ticket.categoryName} • {ticket.suburb}, {ticket.city}
              </p>
            </div>

            {/* Current State Pill */}
            <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-3 text-emerald-950 self-start sm:self-auto flex items-center gap-3 shadow-2xs">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              <div>
                <div className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-800">
                  FLEET DISPATCH STATE
                </div>
                <div className="text-sm font-black">
                  {ticket.status === "En Route"
                    ? `En Route • ETA ~${ticket.etaMinutes || 18} Mins`
                    : ticket.status}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-2.5 border text-xs transition-all ${
                    st.active
                      ? "border-orange-500 bg-orange-50 text-orange-950 ring-2 ring-orange-400/30"
                      : st.done
                      ? "border-emerald-300 bg-emerald-50/70 text-slate-900"
                      : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-black mb-0.5">
                    {st.done ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="h-4 w-4 rounded-full border border-current flex items-center justify-center text-[10px] shrink-0 font-mono">
                        {i + 1}
                      </span>
                    )}
                    <span className="text-[11px] truncate">{st.title}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">
                    {st.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Advancement Bar */}
          {ticket.status !== "Completed" && (
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Sparkles className="h-4 w-4 text-orange-600" />
                <span>Test Interactive Lifecycle:</span>
              </div>
              <button
                type="button"
                onClick={advanceTicketStatus}
                className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-amber-300 px-3 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-xs"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>Advance Van Status →</span>
              </button>
            </div>
          )}
        </div>

        {/* 2-Column Details: Technician Card + Job Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assigned Technician Card */}
          <div className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-2xs md:col-span-1 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-black uppercase tracking-wider text-orange-600 mb-2">
                Assigned Mobile Workshop
              </div>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-black">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-slate-950 leading-tight">
                    {ticket.assignedTechName || "Dave Mitchell (Express Whitegoods)"}
                  </h3>
                  <span className="text-[11px] text-emerald-800 font-bold flex items-center gap-1 mt-0.5 font-mono">
                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                    QBCC #15291048 Audited
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>{ticket.assignedTechVehicle || "Toyota HiAce Workshop #QLD-728"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                  <span>Direct GPS Van Telemetry Active</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 space-y-2">
              <a
                href="tel:0468991300"
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white py-2.5 text-xs font-black uppercase tracking-wider transition-colors shadow-2xs"
              >
                <Phone className="h-3.5 w-3.5 fill-white" />
                <span>Call Van: 0468 991 300</span>
              </a>
            </div>
          </div>

          {/* Job Specifics & Diagnostic Pricing Breakdown */}
          <div className="rounded-xl border-2 border-slate-200 bg-white p-5 shadow-2xs md:col-span-2 space-y-4">
            <div>
              <div className="text-xs font-mono font-black uppercase tracking-wider text-slate-500 mb-1">
                Dispatch Summary
              </div>
              <h3 className="font-black text-base text-slate-950">
                {ticket.issue}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Property</div>
                <div className="font-bold text-slate-900 mt-0.5">{ticket.suburb}, {ticket.city}</div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5">
                <div className="text-[10px] font-mono uppercase text-slate-500">Contact</div>
                <div className="font-bold text-slate-900 mt-0.5">{ticket.customerName}</div>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-300 p-2.5">
                <div className="text-[10px] font-mono uppercase text-amber-800 font-bold">Diagnostic Fee</div>
                <div className="font-black text-amber-950 mt-0.5">$149 inc. GST (Credited)</div>
              </div>
            </div>

            {/* Simulated Live Van Radar Map Box */}
            <div className="rounded-xl border-2 border-slate-300 bg-slate-100 p-6 text-center space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-slate-700">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>GPS RADAR ACTIVE • GYMPIE RD / CHERMSIDE CORRIDOR</span>
              </div>
              <div className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                Van equipped with OEM parts inventory. Driver will call upon arrival at front driveway.
              </div>
            </div>

            {/* Consumer Rights Protection Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Australian Consumer Law Guarantee:</strong> All diagnostics follow fixed upfront quoting standards. Replacement parts carry minimum 12-month manufacturer warranties.
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
      />

      <ListBusinessModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
    </div>
  );
}
