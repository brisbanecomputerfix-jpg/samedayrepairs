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
      customerName: "Valued Customer",
      customerPhone: "04XX XXX XXX",
      suburb: "Brisbane CBD",
      city: "Greater Brisbane",
      categoryName: "Emergency Repairs",
      issue: "Emergency technician dispatch request logged via SameDayRepairs portal.",
      urgency: "Emergency (1-2 Hours)",
      status: "En Route",
      assignedTechName: "Dave Mitchell (Licensed Mobile Tech)",
      assignedTechPhone: "1300 726 339",
      assignedTechVehicle: "Mobile Workshop Van #QLD-842",
      etaMinutes: 24,
      createdAt: "Just now",
    };

  const [ticket, setTicket] = React.useState<ActiveDispatchTicket>(initialTicket);

  // Step indices
  const steps = [
    { title: "Broadcast Sent", desc: "Sent to on-duty local fleet", done: true },
    {
      title: "Tech Assigned",
      desc: ticket.assignedTechName || "Matching nearest van",
      done: ticket.status !== "Broadcasted",
    },
    {
      title: "En Route",
      desc: ticket.etaMinutes ? `ETA: ~${ticket.etaMinutes} mins` : "Heading to property",
      done: ["En Route", "Arrived", "Completed"].includes(ticket.status),
      active: ticket.status === "En Route",
    },
    {
      title: "Arrived / Diagnostic",
      desc: "Inspection & upfront quote",
      done: ["Arrived", "Completed"].includes(ticket.status),
      active: ticket.status === "Arrived",
    },
    {
      title: "Repair Complete",
      desc: "12-Month warranty logged",
      done: ticket.status === "Completed",
      active: ticket.status === "Completed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 pb-16 sm:pb-0">
      <Navbar
        selectedCityId="brisbane"
        onSelectCity={() => {}}
        onOpenDispatch={() => setIsDispatchOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-zinc-200 dark:bg-zinc-900/60 dark:border-zinc-800 text-xs py-2.5 px-4">
        <div className="container mx-auto max-w-4xl flex items-center gap-1.5 text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-500">Dispatch Status</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-bold text-zinc-900 dark:text-white">
            {ticket.id}
          </span>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8 flex-1">
        {/* Main Status Header Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                  Ticket #{ticket.id}
                </span>
                <span className="text-xs text-zinc-500">Logged {ticket.createdAt}</span>
              </div>

              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white">
                Emergency Dispatch Status
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">
                {ticket.categoryName} • {ticket.suburb}, {ticket.city}
              </p>
            </div>

            {/* Current State Indicator */}
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300 self-start sm:self-auto flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Live Dispatch State
                </div>
                <div className="text-base font-black">
                  {ticket.status === "En Route"
                    ? `En Route • ETA ~${ticket.etaMinutes || 20} Mins`
                    : ticket.status}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Progression */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {steps.map((st, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-3 border text-xs transition-all ${
                    st.active
                      ? "border-amber-500 bg-amber-50/70 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/20"
                      : st.done
                      ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20 text-zinc-800 dark:text-zinc-200"
                      : "border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-800/40"
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
                    <span>{st.title}</span>
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {st.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2-Column Details: Technician Card + Job Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Assigned Technician Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm md:col-span-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
              Assigned Specialist
            </div>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-zinc-950 flex items-center justify-center font-black text-lg">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-zinc-950 dark:text-white leading-tight">
                  {ticket.assignedTechName || "Nearest Licensed Tech"}
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="h-3 w-3" /> ABN & Police Vetted
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>{ticket.assignedTechVehicle}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                <span>Estimated Arrival: <strong>~{ticket.etaMinutes || 20} minutes</strong></span>
              </div>
            </div>

            {/* Direct Call Tech Button */}
            <a
              href={`tel:${ticket.assignedTechPhone?.replace(/\s+/g, "") || "1300726339"}`}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-emerald-400" />
              <span>Call Technician Direct</span>
            </a>
          </div>

          {/* Job Scope & Pricing Details */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 shadow-sm md:col-span-2 space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                Reported Problem
              </div>
              <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
                "{ticket.issue}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block">Location</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {ticket.suburb}, {ticket.city}
                </span>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-800/40">
                <span className="text-zinc-400 text-[10px] uppercase font-bold block">Urgency Tier</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {ticket.urgency}
                </span>
              </div>
            </div>

            {/* Pricing Transparency Guarantee */}
            <div className="rounded-xl bg-amber-50/80 p-4 border border-amber-200/70 text-xs dark:bg-amber-950/30 dark:border-amber-900/40">
              <div className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5 mb-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Our No-Price-Gouging Guarantee</span>
              </div>
              <p className="text-amber-900/80 dark:text-amber-300/80 text-[11px] leading-relaxed">
                The technician performs an initial on-site physical diagnostic, quotes the repair parts and labor clearly, and only begins work once you explicitly approve the quote.
              </p>
            </div>

            {/* Help / Hotline */}
            <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span>Need to change or cancel this request?</span>
              <a href="tel:1300726339" className="font-bold text-zinc-900 dark:text-zinc-100 hover:underline">
                Call Support: 1300 726 339
              </a>
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

