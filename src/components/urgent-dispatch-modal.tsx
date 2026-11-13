"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Zap, CheckCircle2, ShieldCheck, Clock, MapPin, Phone, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { RepairCategoryId, UrgentBookingRequest } from "@/types";

interface UrgentDispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: RepairCategoryId;
  defaultCityId?: string;
  defaultSuburb?: string;
  defaultPostcode?: string;
}

export function UrgentDispatchModal({
  isOpen,
  onClose,
  defaultCategory,
  defaultCityId = "brisbane",
  defaultSuburb = "",
  defaultPostcode = "",
}: UrgentDispatchModalProps) {
  const router = useRouter();
  const { broadcastEmergencyTicket } = useAuth();
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ticketId, setTicketId] = React.useState("");

  const [form, setForm] = React.useState<UrgentBookingRequest>({
    customerName: "",
    customerPhone: "0468 991 300",
    suburb: defaultSuburb || "",
    postcode: defaultPostcode || "",
    categoryId: defaultCategory || "appliances",
    specificIssue: "",
    urgencyLevel: "Emergency (1-2 Hours)",
    notes: "",
  });

  React.useEffect(() => {
    if (defaultSuburb) setForm((prev) => ({ ...prev, suburb: defaultSuburb }));
    if (defaultPostcode) setForm((prev) => ({ ...prev, postcode: defaultPostcode }));
    if (defaultCategory) setForm((prev) => ({ ...prev, categoryId: defaultCategory }));
  }, [defaultSuburb, defaultPostcode, defaultCategory]);

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

  const handleFillDemo = () => {
    setForm({
      customerName: "Sarah Jenkins",
      customerPhone: "0468 991 300",
      suburb: "Chermside",
      postcode: "4032",
      categoryId: defaultCategory || "appliances",
      specificIssue: "Fridge stopped cooling 2 hours ago. Freezer warming up, groceries spoiling.",
      urgencyLevel: "Emergency (1-2 Hours)",
      notes: "Gate code 1492. Van parking available in driveway.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const generatedTicket = "SDR-" + Math.floor(100000 + Math.random() * 900000);
      setTicketId(generatedTicket);

      broadcastEmergencyTicket({
        ticketRef: generatedTicket,
        category: selectedCategoryObj?.name || "Emergency Repair",
        issue: form.specificIssue,
        suburb: form.suburb || "Chermside",
        postcode: form.postcode,
        customerName: form.customerName,
        customerPhone: form.customerPhone,
        urgency: form.urgencyLevel,
        notes: form.notes,
      });

      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  const selectedCategoryObj = REPAIR_CATEGORIES.find((c) => c.id === form.categoryId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border-2 border-slate-900 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 border-2 border-emerald-300">
              <CheckCircle2 className="h-8 w-8 text-emerald-700" />
            </div>

            <div>
              <span className="inline-block rounded-md bg-slate-900 px-3 py-1 text-xs font-mono font-black text-amber-300 tracking-wider">
                DISPATCH TICKET: {ticketId}
              </span>
              <h3 className="mt-2 text-xl font-black text-slate-950">
                Priority Dispatch Broadcasted!
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
                We have notified verified on-duty <strong>{selectedCategoryObj?.name}</strong> technicians in <strong>{form.suburb || "your suburb"}</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Clock className="h-4 w-4 text-orange-700" />
                <span>Next Step: Contractor Confirmation</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                You will receive a phone call within <strong>5 to 15 minutes</strong> confirming your arrival window and assigned technician details.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <Link
                href={`/dispatch/${ticketId}`}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-700 hover:bg-orange-800 py-3 text-xs font-bold text-white shadow-sm transition-all"
              >
                <span>View Live Status Tracker (ETA & Specialist)</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Close & Return to Directory
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <Zap className="h-4 w-4 fill-orange-700 text-orange-700" />
                <span>Request Same-Day Repair</span>
              </div>

              {/* 1-Click Demo Fill */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-300 px-2.5 py-1 text-[11px] font-bold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-amber-700" />
                <span>Demo Fill (Sarah)</span>
              </button>
            </div>

            <h2 className="text-xl font-black text-slate-950 tracking-tight">
              Dispatch Nearest Available Mobile Workshop
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
              Broadcast your repair ticket directly to verified, insured trade vans currently roaming your metro zone.
            </p>

            {/* Diagnostic Fee Badge */}
            {selectedCategoryObj && (
              <div className="mt-3 rounded-lg bg-amber-50 border border-amber-300 p-2.5 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Fixed Upfront Diagnostic:</span>
                <span className="font-mono font-black text-amber-950 bg-white px-2 py-0.5 rounded-sm border border-amber-200">
                  {selectedCategoryObj.typicalCalloutFee}
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              {/* Category selector */}
              <div>
                <label htmlFor="modal-dispatch-category" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                  Repair Vertical
                </label>
                <select
                  id="modal-dispatch-category"
                  name="modal-dispatch-category"
                  aria-label="Select repair trade vertical"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value as RepairCategoryId })}
                  className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                >
                  {REPAIR_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name} ({cat.typicalCalloutFee})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-customer-name" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Your Name
                  </label>
                  <input
                    id="modal-customer-name"
                    name="modal-customer-name"
                    type="text"
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-customer-phone" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Contact Phone
                  </label>
                  <input
                    id="modal-customer-phone"
                    name="modal-customer-phone"
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    placeholder="0468 991 300"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              {/* Suburb & Postcode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="modal-suburb" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Suburb
                  </label>
                  <input
                    id="modal-suburb"
                    name="modal-suburb"
                    type="text"
                    value={form.suburb}
                    onChange={(e) => setForm({ ...form, suburb: e.target.value })}
                    placeholder="e.g. Chermside"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-postcode" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Postcode
                  </label>
                  <input
                    id="modal-postcode"
                    name="modal-postcode"
                    type="text"
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    placeholder="e.g. 4032"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden font-mono"
                    required
                  />
                </div>
              </div>

              {/* Issue Description */}
              <div>
                <label htmlFor="modal-specific-issue" className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                  Symptom / What Happened?
                </label>
                <textarea
                  id="modal-specific-issue"
                  name="modal-specific-issue"
                  value={form.specificIssue}
                  onChange={(e) => setForm({ ...form, specificIssue: e.target.value })}
                  placeholder="e.g. Fridge warming up, compressor buzzing, water leaking under vegetable crisper."
                  rows={2}
                  className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden resize-none"
                  required
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-700 hover:bg-orange-800 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md active:scale-98 transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Broadcasting Ticket to Nearby Vans...</span>
                ) : (
                  <>
                    <Zap className="h-4 w-4 fill-white" />
                    <span>Broadcast Urgent Ticket Now</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Audited Australian Tradies • Fixed Diagnostic Rates • No Obligation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
