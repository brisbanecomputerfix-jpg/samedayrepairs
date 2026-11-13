import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Award,
  Phone,
  Scale,
  Wrench,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  BadgeCheck,
  Building,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Statutory Trade & Consumer Protection Charter | SameDayRepairs.com.au",
  description:
    "Our mandatory accreditation standard for Australian trade contractors: QBCC, NSW Fair Trading, VBA licensing audits, $20M public liability insurance, and 12-month parts warranties.",
  alternates: {
    canonical: "https://samedayrepairs.com.au/trade-charter",
  },
  openGraph: {
    title: "Statutory Trade & Consumer Protection Charter | SameDayRepairs.com.au",
    description:
      "Vetting standards, $20M insurance requirements, and mandatory warranty guarantees for Australian emergency repair trades.",
    url: "https://samedayrepairs.com.au/trade-charter",
    siteName: "SameDayRepairs.com.au",
    locale: "en_AU",
    type: "website",
  },
};

export default function TradeCharterPage() {
  const lastAudited = "November 2026";

  const STATUTORY_BODIES = [
    {
      state: "Queensland (QLD)",
      body: "Queensland Building and Construction Commission (QBCC)",
      licenseTypes: "Plumbing, Drainage, Gas Fitting, Builder Restricted",
      regulatorUrl: "https://www.qbcc.qld.gov.au",
    },
    {
      state: "New South Wales (NSW)",
      body: "NSW Fair Trading",
      licenseTypes: "Electrical Contractor, Specialist Plumber, Glazier",
      regulatorUrl: "https://www.fairtrading.nsw.gov.au",
    },
    {
      state: "Victoria (VIC)",
      body: "Victorian Building Authority (VBA) & Energy Safe Victoria (ESV)",
      licenseTypes: "Registered Building Practitioner, Licensed Plumber, A-Grade Electrician",
      regulatorUrl: "https://www.vba.vic.gov.au",
    },
    {
      state: "South Australia (SA)",
      body: "Consumer and Business Services (CBS)",
      licenseTypes: "Building Work Contractor, Electrical & Plumbing Contractor",
      regulatorUrl: "https://www.cbs.sa.gov.au",
    },
    {
      state: "Western Australia (WA)",
      body: "Building and Energy (DMIRS)",
      licenseTypes: "Plumbers Licensing Board, Electrical Licensing Board",
      regulatorUrl: "https://www.commerce.wa.gov.au/building-and-energy",
    },
    {
      state: "Commonwealth Wide",
      body: "Australian Refrigeration Council (ARC Tick)",
      licenseTypes: "Refrigerant Handling Licence (RHL) & Trading Authorisation (RTA)",
      regulatorUrl: "https://www.arctick.org",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Breadcrumb Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-mono">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
            <span className="text-orange-400 font-bold">Trade Charter</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-orange-600/20 border border-orange-500/30 text-orange-400 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-orange-400">
                Statutory Trade Verification Standard
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Trade & Consumer Protection Charter
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            The binding professional charter governing every trade van, mobile workshop, and emergency technician dispatched through SameDayRepairs.com.au.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Audit Standard: Edition {lastAudited}</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> $20,000,000 Public Liability Insured
            </span>
            <span>•</span>
            <span className="text-amber-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> 12-Month Minimum Warranty
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Prototype Alert Notice */}
        <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-5 mb-8 text-amber-950">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm text-amber-900 uppercase tracking-wide font-mono">
                Prototype Demonstration System Notice
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                SameDayRepairs.com.au is operating as a production architecture demonstration. Direct contractor accreditation applications and consumer verification queries are managed via our central coordinator at{" "}
                <a href="tel:0468991300" className="font-bold underline text-amber-950">
                  0468 991 300
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Protection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider mb-2">
                <BadgeCheck className="h-4 w-4" /> Pillar 01: Licensing
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Active State Trade Licences Audited
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No contractor is permitted onto the platform without verified, unrestricted trade contractor licences from statutory bodies (QBCC, Fair Trading, VBA, ESV, DMIRS). Every technician must possess certified trade qualifications for their repair discipline.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Verified via Official State Online Registrars
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600 uppercase tracking-wider mb-2">
                <ShieldCheck className="h-4 w-4" /> Pillar 02: Insurance
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                $20,000,000 Public Liability Insurance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Residential and commercial premises are fully protected. Every mobile workshop must present an active Certificate of Currency for at least $20,000,000 in Public Liability Insurance, protecting against accidental property damage or bodily injury.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Current Policy Verification Mandated Annually
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-600 uppercase tracking-wider mb-2">
                <Scale className="h-4 w-4" /> Pillar 03: Pricing Integrity
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                Upfront Written Quotes & No Surprises
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technicians provide an upfront diagnostic assessment before commencing repairs. All required replacement parts, labor hours, and disposal fees must be presented clearly in an itemised estimate. No work begins without your written or verbal authorization.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Fixed Diagnostic Callout Fee Standard
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-600 uppercase tracking-wider mb-2">
                <FileCheck className="h-4 w-4" /> Pillar 04: Warranty
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-2">
                12-Month Minimum Parts & Labor Warranty
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Repairs are built to last. All fitted parts are genuine OEM or certified high-grade equivalents, backed by a minimum 12-month statutory manufacturer and contractor warranty. If a repaired component faults within 12 months, callout is waived for rectification.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500">
              Australian Consumer Law Guarantee Backed
            </div>
          </div>

        </div>

        {/* State Trade Bodies Compliance Table */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
            <span>Regulatory Bodies</span>
          </div>
          <h2 className="text-xl font-bold text-slate-950 mb-2">
            Recognised Australian Trade Licensing Authorities
          </h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            All trades listed in our directory operate under the oversight of their respective state building and consumer protection bodies:
          </p>

          <div className="divide-y divide-slate-100">
            {STATUTORY_BODIES.map((item, idx) => (
              <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-950 text-sm">{item.state}</div>
                  <div className="font-semibold text-slate-800">{item.body}</div>
                  <div className="text-slate-500 mt-0.5">{item.licenseTypes}</div>
                </div>
                <a
                  href={item.regulatorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700 font-mono text-[11px] shrink-0"
                >
                  <span>License Search</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Code of On-Site Conduct */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider">
            <span>Professional Standard</span>
          </div>
          <h2 className="text-xl font-bold text-slate-950">
            Code of On-Site Conduct for Trade Vans
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Clean Site Guarantee:</strong>
                Technicians use protective floor coverings, clean drop sheets, and remove all old parts and hazardous packaging upon job completion.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Mobile Phone Ahead:</strong>
                Technicians call or SMS 15–30 minutes before arrival to confirm someone over 18 is on premises and provide precise arrival times.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Itemised ATO Tax Invoices:</strong>
                Every invoice clearly itemises parts, labor, diagnostic callout, ABN, GST, and 12-month warranty certificate reference.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Respectful Professionalism:</strong>
                Punctual, polite, drug-and-alcohol free, and adhering to Australian workplace health and safety (WHS) protocols.
              </div>
            </div>
          </div>
        </div>

        {/* Direct Contact Footer */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-1">
              Contractor Onboarding & Compliance
            </div>
            <h3 className="text-xl font-bold text-white">
              Are You a Licensed Trade Contractor?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Submit your trade credentials, ABN, and insurance certificate to join Australia&apos;s verified emergency repair dispatch network.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:0468991300"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>0468 991 300</span>
            </a>
            <Link
              href="/portal/provider"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-3 text-xs font-bold text-slate-200 transition-colors"
            >
              <span>Contractor Portal</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
