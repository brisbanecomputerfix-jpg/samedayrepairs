"use client";

import * as React from "react";
import { X, Zap, CheckCircle2, ShieldCheck, Clock, MapPin, Phone } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { RepairCategoryId, UrgentBookingRequest } from "@/types";

interface UrgentDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: RepairCategoryId;
  defaultCityId?: string;
}

export function UrgentDispatchModal({
  isOpen,
  onClose,
  defaultCategory,
  defaultCityId = "brisbane",
}: UrgentDispatchModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ticketId, setTicketId] = React.useState("");

  const [form, setForm] = React.useState<UrgentBookingRequest>({
    customerName: "",
    customerPhone: "",
    suburb: "",
    postcode: "",
    categoryId: defaultCategory || "appliances",
    specificIssue: "",
    urgencyLevel: "Emergency (1-2 Hours)",
    notes: "",
  });

  React.useEffect(() => {
    if (defaultCategory) {
      setForm((prev) => ({ ...prev, categoryId: defaultCategory }));
    }
  }, [defaultCategory]);

  React.useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const generatedTicket = "SDR-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const selectedCategoryObj = REPAIR_CATEGORIES.find((c) => c.id === form.categoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                Ticket Ref: {ticketId}
              </span>
              <h3 className="mt-2 text-xl font-black text-zinc-900 dark:text-white">
                Urgent Dispatch Broadcasted!
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-sm mx-auto">
                We have notified verified on-duty <strong>{selectedCategoryObj?.name}</strong> technicians in <strong>{form.suburb || "your area"}</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left text-xs space-y-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
                <Clock className="h-4 w-4 text-amber-500" />
                <span>Next Step: Rapid SMS Confirmation</span>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                You will receive an SMS and phone call within <strong>5 to 15 minutes</strong> from the nearest available technician confirming arrival window and diagnostic dispatch.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Close & View Directory
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="h-4 w-4 fill-current" />
              <span>Priority Same-Day Dispatch</span>
            </div>

            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              Request Nearest Available Technician
            </h2>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              No endless ringing around. We broadcast your urgent repair request directly to verified, insured technicians currently on-call in your area.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Category selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Repair Type / Vertical <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value as RepairCategoryId })}
                  className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-semibold text-zinc-900 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  {REPAIR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.typicalCalloutFee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Suburb and Postcode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Your Suburb <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    placeholder="e.g. Chermside"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Postcode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    placeholder="e.g. 4032"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Specific Problem description */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  What happened? (Problem Details) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.specificIssue}
                  onChange={(e) => setForm({ ...form, specificIssue: e.target.value })}
                  placeholder="e.g. Samsung double door fridge stopped cooling 2 hours ago. Freezer feels warm."
                  className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              {/* Urgency Level */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  When do you need them?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Emergency (1-2 Hours)", "Today by 5:00 PM", "First slot Tomorrow"] as const).map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setForm({ ...form, urgencyLevel: level })}
                      className={`rounded-xl border p-2 text-center text-[11px] font-semibold transition-all ${
                        form.urgencyLevel === level
                          ? "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 font-bold"
                          : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    placeholder="04XX XXX XXX"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Trust Callout */}
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  100% Free dispatch request. You only pay the technician after diagnostic & quote approval.
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3.5 text-xs font-bold text-zinc-950 shadow-lg shadow-orange-500/25 hover:brightness-105 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Zap className="h-4 w-4 fill-zinc-950" />
                <span>{loading ? "Broadcasting to On-Duty Techs..." : "Dispatch Nearest Technician Now"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
