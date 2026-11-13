"use client";

import * as React from "react";
import { X, CheckCircle2, ShieldCheck, Briefcase, Plus, Phone, Clock, Sparkles } from "lucide-react";
import { REPAIR_CATEGORIES } from "@/data/categories";
import { AUSTRALIAN_CITIES } from "@/data/locations";
import { ProviderRegistrationRequest, RepairCategoryId } from "@/types";

interface ListBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ListBusinessModal({ isOpen, onClose }: ListBusinessModalProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [form, setForm] = React.useState<ProviderRegistrationRequest>({
    businessName: "",
    tradingName: "",
    abn: "",
    contactName: "",
    contactPhone: "0468 991 300",
    contactEmail: "",
    cityId: "brisbane",
    primarySuburb: "",
    serviceRadiusKm: 35,
    categoryIds: ["appliances"],
    sameDayCutoffTime: "3:30 PM",
    hasPublicLiability: true,
    licenseNumber: "",
  });

  React.useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillDemo = () => {
    setForm({
      businessName: "Express Whitegoods & Fridge Rescue",
      tradingName: "Express Whitegoods QLD",
      abn: "48 619 402 188",
      contactName: "Dave Mitchell",
      contactPhone: "0468 991 300",
      contactEmail: "dave@expresswhitegoods.com.au",
      cityId: "brisbane",
      primarySuburb: "South Brisbane",
      serviceRadiusKm: 35,
      categoryIds: ["appliances"],
      sameDayCutoffTime: "3:30 PM",
      hasPublicLiability: true,
      licenseNumber: "QBCC #15291048 • ARC #L184920",
    });
  };

  const toggleCategory = (catId: RepairCategoryId) => {
    setForm((prev) => {
      const exists = prev.categoryIds.includes(catId);
      if (exists) {
        if (prev.categoryIds.length === 1) return prev;
        return { ...prev, categoryIds: prev.categoryIds.filter((id) => id !== catId) };
      } else {
        return { ...prev, categoryIds: [...prev.categoryIds, catId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border-2 border-slate-900 max-h-[92vh] overflow-y-auto">
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

            <h3 className="text-xl font-black text-slate-950">
              Trade Van Application Received!
            </h3>
            <p className="mt-1 text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
              Thank you, <strong>{form.businessName}</strong>. Our fleet auditing team is cross-referencing your ABN <strong>{form.abn}</strong> and trade licence.
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>ONBOARDING WORKFLOW:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-600 text-xs font-medium">
                <li>Your listing profile is published to the directory within 12–24 hours.</li>
                <li>You will receive SMS alerts when homeowners in your {form.serviceRadiusKm}km radius request urgent repairs.</li>
                <li>Zero upfront fee during our Australian national rollout.</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-lg bg-slate-950 hover:bg-slate-800 py-3 text-xs font-black uppercase tracking-wider text-amber-300 shadow-md transition-all cursor-pointer"
            >
              Done & Return to Directory
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-orange-600 text-xs font-black uppercase tracking-wider font-mono">
                <Briefcase className="h-4 w-4" />
                <span>Trade Contractor Onboarding</span>
              </div>

              {/* 1-Click Demo Fill */}
              <button
                type="button"
                onClick={handleFillDemo}
                className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-300 px-2.5 py-1 text-[11px] font-bold text-amber-900 hover:bg-amber-100 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3 w-3 text-amber-700" />
                <span>Demo Fill (Dave)</span>
              </button>
            </div>

            <h2 className="text-xl font-black text-slate-950 tracking-tight">
              Register Your Mobile Workshop Van
            </h2>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
              Join Australia's verified same-day repair network. Fill schedule gaps with profitable, pre-qualified local jobs.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              {/* Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Legal Business Name
                  </label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    placeholder="e.g. Express Whitegoods Pty Ltd"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Australian Business Number (ABN)
                  </label>
                  <input
                    type="text"
                    value={form.abn}
                    onChange={(e) => setForm({ ...form, abn: e.target.value })}
                    placeholder="e.g. 48 619 402 188"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden font-mono"
                    required
                  />
                </div>
              </div>

              {/* Contact Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Lead Technician / Contact
                  </label>
                  <input
                    type="text"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Dave Mitchell"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    Mobile for Dispatch Alerts
                  </label>
                  <input
                    type="tel"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    placeholder="0468 991 300"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden font-mono"
                    required
                  />
                </div>
              </div>

              {/* Trade Licence & Insurance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    State Trade Licence / ARC #
                  </label>
                  <input
                    type="text"
                    value={form.licenseNumber}
                    onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                    placeholder="e.g. QBCC #15291048"
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                    City Metro Hub
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                    className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-slate-900 focus:bg-white focus:outline-hidden cursor-pointer"
                  >
                    {AUSTRALIAN_CITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Checkboxes */}
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1 font-mono">
                  Emergency Trades You Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1 bg-slate-50 border border-slate-200 rounded-lg">
                  {REPAIR_CATEGORIES.map((cat) => {
                    const isChecked = form.categoryIds.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`text-left p-2 rounded-md text-[11px] font-bold transition-all border ${
                          isChecked
                            ? "bg-slate-900 text-amber-300 border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {cat.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Public Liability Declaration */}
              <label className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={form.hasPublicLiability}
                  onChange={(e) => setForm({ ...form, hasPublicLiability: e.target.checked })}
                  className="rounded text-orange-600 focus:ring-orange-500 h-4 w-4"
                />
                <span className="text-slate-800 font-bold">
                  I hold active minimum $5M–$20M Public Liability insurance
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-950 hover:bg-slate-900 py-3 text-xs font-black uppercase tracking-wider text-amber-300 shadow-md transition-all cursor-pointer"
              >
                {loading ? (
                  <span>Auditing Application...</span>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Submit Free Trade Application</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
