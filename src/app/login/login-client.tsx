"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Zap,
  ShieldCheck,
  User,
  Wrench,
  ArrowRight,
  Phone,
  CheckCircle2,
  Clock,
  Sparkles,
  Home,
  MapPin,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function LoginClient() {
  const router = useRouter();
  const { user, role, loginAsSeeker, loginAsProvider, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState<"seeker" | "provider">("seeker");

  // Form states for realistic mockup inputs
  const [phoneInput, setPhoneInput] = React.useState("0468 991 300");
  const [otpInput, setOtpInput] = React.useState("8492");
  const [abnInput, setAbnInput] = React.useState("48 619 402 188");
  const [tradiePhone, setTradiePhone] = React.useState("0468 991 300");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSeekerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsSeeker();
      setIsLoading(false);
      router.push("/portal/seeker");
    }, 600);
  };

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginAsProvider();
      setIsLoading(false);
      router.push("/portal/provider");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-slate-200 bg-white px-4 py-3.5 shadow-2xs">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 font-black shadow-xs">
              <Zap className="h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-sm sm:text-base font-black text-slate-950">
              SameDay<span className="text-orange-600">Repairs</span>
              <span className="text-[10px] text-slate-500 font-mono ml-1">.com.au</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 hidden sm:inline">Signed in as:</span>
                <span className="font-bold text-orange-600">
                  {role === "seeker" ? (user as any).name : (user as any).contactName}
                </span>
                <button
                  onClick={logout}
                  className="px-2.5 py-1 rounded-md border border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 font-bold"
              >
                <span>← Back to Marketplace</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-4xl px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3.5 py-1 text-xs font-mono font-bold text-slate-700 mb-3 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-orange-600" />
            <span>Interactive Demo Authentication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight">
            Account Access & Dispatch Portals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto font-medium">
            Choose your portal type below to test the live service seeker or verified service provider experience.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-slate-200 border border-slate-300 max-w-md mx-auto mb-8 w-full shadow-inner">
          <button
            onClick={() => setActiveTab("seeker")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "seeker"
                ? "bg-white text-slate-950 shadow-md border border-slate-300"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Home className="h-4 w-4 text-orange-600" />
            <span>Service Seeker</span>
          </button>

          <button
            onClick={() => setActiveTab("provider")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs sm:text-sm font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "provider"
                ? "bg-slate-950 text-amber-300 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wrench className="h-4 w-4 text-amber-400" />
            <span>Trade Provider</span>
          </button>
        </div>

        {/* Card Content */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md max-w-xl mx-auto w-full">
          {activeTab === "seeker" ? (
            /* =================== SEEKER TAB =================== */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-black text-slate-950">Customer & Homeowner Sign In</h2>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Track ongoing same-day dispatches, view 12-month warranties, and manage saved properties.
                </p>
              </div>

              {/* Instant 1-Click Demo Access Button */}
              <button
                type="button"
                onClick={() => {
                  loginAsSeeker();
                  router.push("/portal/seeker");
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-orange-500 bg-orange-50/60 hover:bg-orange-100/60 transition-all text-left cursor-pointer group shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-orange-700 mb-0.5 font-mono">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Instant Demo Login (Recommended)</span>
                  </div>
                  <div className="text-sm font-black text-slate-950">Sarah Jenkins • Chermside, QLD</div>
                  <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                    1 Active Dispatch (SDR-948102 Fridge En Route) • 2 Saved Properties
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-orange-600 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-500 uppercase tracking-wider shrink-0 font-bold font-mono">
                  Or Sign In With Mobile OTP
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              <form onSubmit={handleSeekerSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider font-mono">
                    Australian Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="0468 991 300"
                      className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-orange-600 focus:bg-white focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                      4-Digit Verification Code
                    </label>
                    <span className="text-[11px] text-orange-700 font-bold font-mono">Demo Code: 8492</span>
                  </div>
                  <div className="relative">
                    <Lock className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="8492"
                      className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-orange-600 focus:bg-white focus:outline-hidden tracking-widest font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-700 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-md transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <span>Signing In...</span>
                  ) : (
                    <>
                      <span>Enter Seeker Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Seeker Benefits List */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Real-time GPS dispatch map</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>12-Month warranty vault</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Direct technician messaging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Zero upfront booking fees</span>
                </div>
              </div>
            </div>
          ) : (
            /* =================== PROVIDER TAB =================== */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-black text-slate-950">Tradie & Contractor Access</h2>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Accept nearby same-day emergency dispatches, toggle availability, and track daily earnings.
                </p>
              </div>

              {/* Instant 1-Click Demo Provider Button */}
              <button
                type="button"
                onClick={() => {
                  loginAsProvider();
                  router.push("/portal/provider");
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800 transition-all text-left cursor-pointer group shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-0.5 font-mono">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Instant Demo Login (Recommended)</span>
                  </div>
                  <div className="text-sm font-black text-white">
                    Dave Mitchell • Express Whitegoods & Fridge Rescue
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5 font-mono">
                    ABN 48 619 402 188 • 2 Broadcasts Nearby • $680 Earned Today
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] text-slate-500 uppercase tracking-wider shrink-0 font-bold font-mono">
                  Or Sign In With ABN & Mobile
                </span>
                <div className="border-t border-slate-200 w-full" />
              </div>

              <form onSubmit={handleProviderSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider font-mono">
                    Registered Australian Business Number (ABN)
                  </label>
                  <div className="relative">
                    <ShieldCheck className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={abnInput}
                      onChange={(e) => setAbnInput(e.target.value)}
                      placeholder="48 619 402 188"
                      className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider font-mono">
                    Authorized Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tradiePhone}
                      onChange={(e) => setTradiePhone(e.target.value)}
                      placeholder="0468 991 300"
                      className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:bg-white focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-950 hover:bg-slate-900 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-300 shadow-md transition-all cursor-pointer"
                >
                  {isLoading ? (
                    <span>Authenticating Tradie...</span>
                  ) : (
                    <>
                      <span>Enter Tradie Dispatch Portal</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Provider Benefits List */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                  <span>Instant job push notifications</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                  <span>Guaranteed diagnostic fee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                  <span>No lead auction bidding wars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-600 shrink-0" />
                  <span>Same-day automated payout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500 font-medium">
        SameDayRepairs.com.au • Australia's Emergency Referral Hotline:{" "}
        <a href="tel:0468991300" className="text-slate-950 font-bold hover:underline">
          0468 991 300
        </a>
      </footer>
    </div>
  );
}
