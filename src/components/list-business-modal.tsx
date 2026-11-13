"use client";

import * as React from "react";
import { X, CheckCircle2, ShieldCheck, Briefcase, Plus, Phone, Clock } from "lucide-react";
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
    contactPhone: "",
    contactEmail: "",
    cityId: "brisbane",
    primarySuburb: "",
    serviceRadiusKm: 25,
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

  const toggleCategory = (catId: RepairCategoryId) => {
    setForm((prev) => {
      const exists = prev.categoryIds.includes(catId);
      if (exists) {
        if (prev.categoryIds.length === 1) return prev; // keep at least 1
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
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

            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              Application Received!
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Thank you, <strong>{form.businessName}</strong>. Our onboarding team is performing an ABN verification check on <strong>{form.abn}</strong>.
            </p>

            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left text-xs space-y-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>What Happens Next:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-zinc-500 text-[11px]">
                <li>Your listing profile is published to the directory within 12–24 hours.</li>
                <li>You will receive SMS alerts when homeowners in your primary service zone trigger an urgent dispatch.</li>
                <li>Zero upfront listing cost during our national rollout.</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-xl bg-zinc-900 py-3 text-xs font-bold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Briefcase className="h-4 w-4" />
              <span>For Australian Tradies & Repairers</span>
            </div>

            <h2 className="text-xl font-black text-zinc-900 dark:text-white">
              List Your Same-Day Service (Free)
            </h2>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              Join Australia's dedicated urgent repair network. Attract high-margin emergency jobs in your local area with zero bidding wars.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Registered Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="e.g. Brisbane Emergency Appliance Pros"
                  className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Australian Business Number (ABN) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.abn}
                    onChange={(e) => setForm({ ...form, abn: e.target.value })}
                    placeholder="e.g. 51 824 753 556"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Trade License # (if applicable)
                  </label>
                  <input
                    type="text"
                    value={form.licenseNumber}
                    onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
                    placeholder="e.g. QBCC #129481"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Category Multi-selector */}
              <div>
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Same-Day Services Offered (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 border rounded-xl border-zinc-200 dark:border-zinc-800">
                  {REPAIR_CATEGORIES.map((cat) => {
                    const isSelected = form.categoryIds.includes(cat.id);
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`text-left p-2 rounded-lg text-[11px] font-medium transition-all ${
                          isSelected
                            ? "bg-amber-100 text-amber-950 font-bold dark:bg-amber-900/60 dark:text-amber-200"
                            : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:text-zinc-300"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "}
                        {cat.shortName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location & radius */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    State / Region
                  </label>
                  <select
                    value={form.cityId}
                    onChange={(e) => setForm({ ...form, cityId: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {AUSTRALIAN_CITIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Base Suburb <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.primarySuburb}
                    onChange={(e) => setForm({ ...form, primarySuburb: e.target.value })}
                    placeholder="e.g. Chermside"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Same-Day Cutoff
                  </label>
                  <input
                    type="text"
                    value={form.sameDayCutoffTime}
                    onChange={(e) => setForm({ ...form, sameDayCutoffTime: e.target.value })}
                    placeholder="e.g. 3:30 PM / 24/7"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Direct Phone / Hotline <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    placeholder="04XX XXX XXX or 1300..."
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Email for Leads <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    placeholder="bookings@yourbiz.com.au"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                </div>
              </div>

              {/* Insurance checkbox */}
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={form.hasPublicLiability}
                  onChange={(e) => setForm({ ...form, hasPublicLiability: e.target.checked })}
                  className="mt-0.5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-[11px] text-zinc-600 dark:text-zinc-300">
                  I confirm this business maintains minimum <strong>$5M Public Liability Insurance</strong> and valid Australian trade credentials.
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3.5 text-xs font-bold text-white hover:bg-zinc-800 active:scale-98 transition-all dark:bg-white dark:text-zinc-950 cursor-pointer disabled:opacity-50"
              >
                <span>{loading ? "Submitting Application..." : "Submit Verified Business Listing"}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

