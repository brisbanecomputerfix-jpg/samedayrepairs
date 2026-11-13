import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Phone,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Mail,
  FileText,
  Eye,
  Database,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Australian Privacy Principles | SameDayRepairs.com.au",
  description:
    "Privacy Policy for SameDayRepairs.com.au in strict compliance with the Privacy Act 1988 (Cth) and Australian Privacy Principles (APPs). How emergency dispatch data is handled and protected.",
  alternates: {
    canonical: "https://samedayrepairs.com.au/privacy",
  },
  openGraph: {
    title: "Privacy Policy | SameDayRepairs.com.au",
    description:
      "Strict data privacy standards for emergency repair dispatch. We never sell your personal contact or address details.",
    url: "https://samedayrepairs.com.au/privacy",
    siteName: "SameDayRepairs.com.au",
    locale: "en_AU",
    type: "website",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "13 November 2026";

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
            <span className="text-orange-400 font-bold">Privacy Policy</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-400">
                Australian Privacy Principles (APPs) Compliance
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Privacy & Data Protection Policy
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Our binding commitment to protecting your personal information under the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and the Spam Act 2003 (Cth).
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Regulated by: Office of the Australian Information Commissioner (OAIC)</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Zero Data Brokering
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
                Demonstration Mockup Status
              </h3>
              <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                SameDayRepairs.com.au is currently an architectural demonstration. Form inputs and telemetry tracking in this mockup are sandboxed and not transmitted to third-party telemarketers. Direct enquiries and operational communications may be directed to{" "}
                <a href="tel:0468991300" className="font-bold underline text-amber-950">
                  0468 991 300
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Privacy Guarantees Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1">
              No Data Selling
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We never sell, rent, or lease your personal phone numbers, emails, or property addresses to lead brokers, advertisers, or third-party marketing companies.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1">
              Direct Trade Matching Only
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your contact details are disclosed exclusively to the single verified licensed trade contractor allocated to service your urgent repair request.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="h-9 w-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-3">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-950 mb-1">
              Australian Data Residency
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Customer records and emergency logs are handled in compliance with Australian Privacy Principles, secured by SSL/TLS encryption in transit and at rest.
            </p>
          </div>
        </div>

        {/* Legal Text Articles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>APP 1 & 2</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              1. Open and Transparent Management of Personal Information
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                SameDayRepairs.com.au respects the privacy of every individual who interacts with our directory and dispatch services. This policy explains how we collect, hold, use, and disclose personal information in accordance with the <strong>Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>.
              </p>
              <p>
                By accessing our website, initiating a trade dispatch request, or registering as a trade contractor, you consent to the collection and handling of your information as described in this Privacy Policy.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>APP 3 & 4</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              2. Personal Information We Collect
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                We only collect personal information that is reasonably necessary to fulfill your emergency trade booking, dispatch a local mobile technician, and ensure safe on-site service delivery:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
                <li>
                  <strong>Contact Details:</strong> Your full name, mobile telephone number, and email address.
                </li>
                <li>
                  <strong>Property Location:</strong> Your street address, suburb, postcode, and site access instructions (e.g. gate codes, apartment buzzers).
                </li>
                <li>
                  <strong>Repair Job Particulars:</strong> Appliance brand and model number, electrical switchboard status, plumbing leak details, photos or audio notes of faults if uploaded by you.
                </li>
                <li>
                  <strong>Trade Contractor Information:</strong> For service providers, we collect business trade name, ABN/ACN, trade contractor licence numbers (QBCC, Fair Trading, VBA, ARC tick), copy of Certificate of Currency for $20M Public Liability Insurance, and driver licence verification.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>APP 6 & 7</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              3. How We Use and Disclose Your Information
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                The primary purpose of collecting your information is to facilitate rapid trade repairs:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
                <li>
                  <strong>Direct Contractor Dispatch:</strong> When you confirm an urgent callout, your street address, contact phone number, and fault description are provided to the designated on-call trade technician so they can navigate to your location and phone ahead with their exact arrival time.
                </li>
                <li>
                  <strong>Customer Service & Telemetry:</strong> We use your contact number to send SMS dispatch status updates (e.g., &quot;Technician Dave is en route - ETA 24 mins&quot;).
                </li>
                <li>
                  <strong>Invoicing & Compliance:</strong> To generate compliant Australian tax invoices and facilitate warranty records under the 12-month workmanship guarantee.
                </li>
                <li>
                  <strong>Spam Act 2003 Compliance:</strong> We do not send unsolicited commercial electronic messages. You will only receive transactional SMS and email notifications directly relating to your active repair booking.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>APP 11</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              4. Storage, Encryption & Data Security
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                We implement comprehensive technical, administrative, and physical safeguards to protect personal information from misuse, interference, loss, unauthorized access, modification, or disclosure:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li>All website communications are secured using modern TLS 1.3 encryption (HTTPS).</li>
                <li>Database records are stored within Australian data centers with role-based access controls and encrypted backups.</li>
                <li>Payment card information is handled exclusively by PCI-DSS Level 1 compliant financial payment gateways; SameDayRepairs never stores complete credit card numbers on our servers.</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>APP 12 & 13</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              5. Access, Correction, and Data Deletion Rights
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Under the Australian Privacy Principles, you have the right to request access to the personal information we hold about you, and to request corrections if any details are inaccurate, out-of-date, or incomplete.
              </p>
              <p>
                You may also request that your historical booking data be deleted from our active customer systems, subject to statutory record-retention requirements under Australian taxation and trade warranty laws (e.g. 5-year ATO financial record keeping).
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="pb-4">
            <div className="flex items-center gap-2 text-emerald-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Contact Officer</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              6. Privacy Officer Enquiries & OAIC Complaints
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                If you have questions about this Privacy Policy, wish to make an access request, or have concerns about how your personal information has been handled, please contact our Privacy Officer:
              </p>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 font-mono text-xs text-slate-800 space-y-1.5">
                <div className="font-bold text-slate-950">Privacy Officer — SameDayRepairs.com.au</div>
                <div>Phone Direct: <a href="tel:0468991300" className="text-orange-600 font-bold hover:underline">0468 991 300</a></div>
                <div>Email: <a href="mailto:privacy@samedayrepairs.com.au" className="text-orange-600 font-bold hover:underline">privacy@samedayrepairs.com.au</a></div>
                <div>Location: Brisbane QLD / Sydney NSW / Melbourne VIC</div>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                If you are not satisfied with our response, you have the right to lodge a formal complaint with the <strong>Office of the Australian Information Commissioner (OAIC)</strong> at{" "}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                  www.oaic.gov.au
                </a>{" "}
                or by calling 1300 363 992.
              </p>
            </div>
          </section>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
              Consumer Safety & Trust
            </div>
            <h3 className="text-xl font-bold text-white">
              Learn More About Our Trade Verification
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Read how we audit QBCC, Fair Trading, and state licenses before allowing contractors to service Australian homes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/trade-charter"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all"
            >
              <span>Read Trade Charter</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-3 text-xs font-bold text-slate-200 transition-colors"
            >
              <span>Terms of Service</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

