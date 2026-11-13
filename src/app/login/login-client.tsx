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
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-zinc-800 bg-zinc-900/60 backdrop-blur-md px-4 py-3.5">
        <div className="container mx-auto max-w-5xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-zinc-950 font-black shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-4 w-4 fill-zinc-950" />
            </div>
            <span className="text-sm sm:text-base font-black text-white">
              SameDay<span className="text-amber-500">Repairs</span>
              <span className="text-[10px] text-zinc-500 font-mono ml-1">.com.au</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-zinc-400 hidden sm:inline">Signed in as:</span>
                <span className="font-bold text-amber-400">
                  {role === "seeker" ? (user as any).name : (user as any).contactName}
                </span>
                <button
                  onClick={logout}
                  className="px-2.5 py-1 rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/"
                className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
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
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Demo Authentication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            Account Access & Dispatch Portals
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto">
            Choose your portal type below to test the live service seeker or verified service provider experience.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 max-w-md mx-auto mb-8 w-full">
          <button
            onClick={() => setActiveTab("seeker")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "seeker"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Service Seeker</span>
          </button>

          <button
            onClick={() => setActiveTab("provider")}
            className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "provider"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 shadow-md shadow-orange-500/20"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Service Provider</span>
          </button>
        </div>

        {/* Card Content */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl max-w-xl mx-auto w-full">
          {activeTab === "seeker" ? (
            /* =================== SEEKER TAB =================== */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <User className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Customer & Homeowner Sign In</h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Track ongoing same-day dispatches, view 12-month warranties, and manage saved properties.
                </p>
              </div>

              {/* Instant 1-Click Demo Access Button */}
              <button
                onClick={() => {
                  loginAsSeeker();
                  router.push("/portal/seeker");
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent hover:border-amber-400 hover:from-amber-500/20 transition-all text-left cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-0.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Instant Demo Login (Recommended)</span>
                  </div>
                  <div className="text-sm font-bold text-white">Sarah Jenkins • Chermside, QLD</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    1 Active Dispatch (SDR-948102 Fridge En Route) • 2 Saved Properties
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-800 w-full" />
                <span className="bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase tracking-wider shrink-0 font-medium">
                  Or Sign In With Mobile OTP
                </span>
                <div className="border-t border-zinc-800 w-full" />
              </div>

              <form onSubmit={handleSeekerSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Australian Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="0468 991 300"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-300">
                      4-Digit Verification Code
                    </label>
                    <span className="text-[11px] text-amber-400/80">Demo Code: 8492</span>
                  </div>
                  <div className="relative">
                    <Lock className="h-4 w-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="8492"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-hidden tracking-widest font-mono"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-md shadow-amber-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
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
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Real-time GPS dispatch map</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>12-Month warranty vault</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Direct technician messaging</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Zero upfront booking fees</span>
                </div>
              </div>
            </div>
          ) : (
            /* =================== PROVIDER TAB =================== */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <h2 className="text-lg font-bold text-white">Tradie & Contractor Access</h2>
                </div>
                <p className="text-xs text-zinc-400">
                  Accept nearby same-day emergency dispatches, toggle availability, and track daily earnings.
                </p>
              </div>

              {/* Instant 1-Click Demo Provider Button */}
              <button
                onClick={() => {
                  loginAsProvider();
                  router.push("/portal/provider");
                }}
                className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-orange-500/40 bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent hover:border-orange-400 hover:from-orange-500/20 transition-all text-left cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-0.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Instant Demo Login (Recommended)</span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    Dave Mitchell • Express Whitegoods & Fridge Rescue
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    ABN 48 619 402 188 • 2 Broadcasts Nearby • $420 Earned Today
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-orange-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-zinc-800 w-full" />
                <span className="bg-zinc-900 px-3 text-[11px] text-zinc-500 uppercase tracking-wider shrink-0 font-medium">
                  Or Sign In With ABN & Mobile
                </span>
                <div className="border-t border-zinc-800 w-full" />
              </div>

              <form onSubmit={handleProviderSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Registered Australian Business Number (ABN)
                  </label>
                  <div className="relative">
                    <ShieldCheck className="h-4 w-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={abnInput}
                      onChange={(e) => setAbnInput(e.target.value)}
                      placeholder="48 619 402 188"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-hidden font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1.5">
                    Authorized Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={tradiePhone}
                      onChange={(e) => setTradiePhone(e.target.value)}
                      placeholder="0468 991 300"
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-950 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-hidden"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-xs sm:text-sm font-bold text-zinc-950 shadow-md shadow-orange-500/20 hover:brightness-105 active:scale-98 transition-all cursor-pointer"
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
              <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Instant job push notifications</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Guaranteed diagnostic fee</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>No lead auction bidding wars</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Same-day automated payout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 py-4 px-4 text-center text-xs text-zinc-500">
        SameDayRepairs.com.au • Australia's Emergency Referral Hotline:{" "}
        <a href="tel:0468991300" className="text-zinc-300 font-bold hover:underline">
          0468 991 300
        </a>
      </footer>
    </div>
  );
}
