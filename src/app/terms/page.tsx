import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Phone,
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions | SameDayRepairs.com.au",
  description:
    "Terms and Conditions of Use and Emergency Dispatch Platform Agreement for SameDayRepairs.com.au. Compliant with Australian Consumer Law (ACL) and State Trade Licensing Acts.",
  alternates: {
    canonical: "https://samedayrepairs.com.au/terms",
  },
  openGraph: {
    title: "Terms and Conditions | SameDayRepairs.com.au",
    description:
      "Platform terms, independent contractor framework, diagnostic pricing policies, and Australian Consumer Law guarantees.",
    url: "https://samedayrepairs.com.au/terms",
    siteName: "SameDayRepairs.com.au",
    locale: "en_AU",
    type: "website",
  },
};

export default function TermsPage() {
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
            <span className="text-orange-400 font-bold">Legal Terms</span>
          </nav>

          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-orange-600/20 border border-orange-500/30 text-orange-400 flex items-center justify-center">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-orange-400">
                Australian Legal Compliance & Regulatory Notice
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Terms and Conditions of Service
              </h1>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Platform dispatch agreement, directory matching policies, independent trade contractor terms, and statutory guarantees under the Australian Consumer Law (Competition and Consumer Act 2010 Cth).
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Last Updated: {lastUpdated}</span>
            <span>•</span>
            <span>Jurisdiction: Commonwealth of Australia & All States/Territories</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> ACL Compliant
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
                SameDayRepairs.com.au is currently operating in an active demonstration prototype stage. Online instant automated billing and dispatch channels are simulated for testing and architectural evaluation. For all direct consumer enquiries, verified contractor onboarding, and urgent service coordination, please contact our administrative desk directly at{" "}
                <a href="tel:0468991300" className="font-bold underline text-amber-950">
                  0468 991 300
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation Anchor Links */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
            <a href="#section-1" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">1.</span> Platform Role & Directory Status
            </a>
            <a href="#section-2" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">2.</span> Australian Consumer Law (ACL) Guarantees
            </a>
            <a href="#section-3" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">3.</span> Diagnostic Fees & On-Site Quotes
            </a>
            <a href="#section-4" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">4.</span> Emergency 000 Safety Disclaimer
            </a>
            <a href="#section-5" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">5.</span> Contractor Licensing & $20M Insurance
            </a>
            <a href="#section-6" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">6.</span> Booking Cancellations & En Route Policy
            </a>
            <a href="#section-7" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">7.</span> 12-Month Warranty Standard
            </a>
            <a href="#section-8" className="hover:text-orange-600 flex items-center gap-1.5 py-1">
              <span className="text-orange-600 font-mono font-bold">8.</span> Limitation of Liability & Disputes
            </a>
          </div>
        </div>

        {/* Legal Text Articles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-10 text-slate-700 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section id="section-1" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 01</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              1. Platform Role & Directory Intermediary Status
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>SameDayRepairs.com.au</strong> (&quot;the Platform&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) provides an Australian digital directory and priority emergency referral dispatch infrastructure. The Platform connects domestic and commercial property owners, tenants, and facility managers (&quot;Seekers&quot; or &quot;Customers&quot;) with autonomous, independent, licensed trade contractors (&quot;Trade Contractors&quot; or &quot;Providers&quot;).
              </p>
              <p>
                You explicitly acknowledge and agree that Trade Contractors operating through SameDayRepairs.com.au are independent third-party commercial entities, holding independent Australian Business Numbers (ABNs) or Australian Company Numbers (ACNs). They are not employees, agents, joint venturers, or legal representatives of SameDayRepairs.com.au.
              </p>
              <p>
                When you initiate a dispatch request or accept an on-site trade service, the legal contract for the physical trade labor, materials, diagnostics, and repairs is entered into directly between you and the assigned licensed Trade Contractor.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 02</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              2. Australian Consumer Law (ACL) Statutory Guarantees
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Nothing in these Terms and Conditions operates to exclude, restrict, or modify any statutory condition, warranty, right, or remedy conferred on you by the <strong>Competition and Consumer Act 2010 (Cth)</strong>, including the <strong>Australian Consumer Law (ACL)</strong>, or any other applicable state or federal legislation that cannot be lawfully excluded.
              </p>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider font-mono">
                  Consumer Rights Notice under the ACL:
                </span>
                <p className="text-xs text-slate-600">
                  Our services come with guarantees that cannot be excluded under the Australian Consumer Law. For major failures with the service, you are entitled to:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                  <li>Cancel your service contract with us; and</li>
                  <li>A refund for the unused portion, or compensation for its reduced value.</li>
                </ul>
                <p className="text-xs text-slate-600">
                  You are also entitled to choose a refund or replacement for major failures with goods. If a failure with the goods or a service does not amount to a major failure, you are entitled to have the failure rectified in a reasonable time. If this is not done you are entitled to a refund for the goods and to cancel the contract for the service and obtain a refund of any unused portion.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 03</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              3. Diagnostic Fees, Callout Charges & Upfront Quotes
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                To maintain same-day rapid mobile readiness across Australian capital cities, Trade Contractors apply an upfront diagnostic callout fee (typically ranging from $149 to $260 including GST, depending on the trade discipline and after-hours emergency surcharge).
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
                <li>
                  <strong>Diagnostic Scope:</strong> The diagnostic callout fee covers the technician&apos;s rapid transit, fuel, vehicle wear, initial safety isolation, and comprehensive technical fault identification using diagnostic equipment.
                </li>
                <li>
                  <strong>Written Quoting Before Work:</strong> Following diagnostic inspection, the technician must provide an itemised, transparent written or verbal quote outlining required parts, labor, and expected completion timeframe before commencing permanent repair work.
                </li>
                <li>
                  <strong>No Hidden Surprises:</strong> No physical repairs exceeding the diagnostic fee will be executed without your explicit prior authorization.
                </li>
                <li>
                  <strong>Payment Methods:</strong> Trade Contractors carry mobile EFTPOS facilities supporting Visa, Mastercard, AMEX, Apple Pay, Google Pay, and direct bank transfer. Official ATO-compliant Tax Invoices displaying the Provider&apos;s ABN and GST registration are issued upon completion.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-red-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 04</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              4. Emergency 000 Safety Disclaimer
            </h2>
            <div className="rounded-2xl bg-red-50 border border-red-200 p-5 space-y-3">
              <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
                <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                <span>Life-Threatening Emergency Notice</span>
              </div>
              <p className="text-xs text-red-900 leading-relaxed">
                SameDayRepairs.com.au is an urgent trade maintenance directory. It is <strong>NOT</strong> an emergency rescue service, fire brigade, police, or state ambulance service.
              </p>
              <p className="text-xs text-red-900 leading-relaxed font-semibold">
                If you suspect or observe an active gas explosion risk, uncontained toxic fumes, active electrical arcing with imminent fire risk, building structural collapse, or physical injury, you must immediately evacuate the premises and dial <span className="underline font-black text-sm">000</span> (Triple Zero) without delay.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 05</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              5. Contractor Licensing Verification & $20M Public Liability Insurance
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Every Trade Contractor onboarded onto the SameDayRepairs directory undergoes a rigorous statutory credential check prior to receiving dispatch referrals:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li>
                  <strong>Statutory Trade Licences:</strong> Verification of relevant state regulatory bodies including the Queensland Building and Construction Commission (QBCC), New South Wales Fair Trading, Victorian Building Authority (VBA), Consumer and Business Services (SA), and DMIRS (WA).
                </li>
                <li>
                  <strong>Electrical & Refrigeration Authorizations:</strong> Electricians must hold active Electrical Contractor Licenses. Whitegoods and air conditioning technicians handling refrigerants must hold active Australian Refrigeration Council (ARC) tick accreditation.
                </li>
                <li>
                  <strong>Public Liability Insurance:</strong> Trade Contractors must maintain an active Certificate of Currency for Public Liability Insurance with a minimum cover limit of <strong>$20,000,000 AUD</strong> per occurrence.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 06</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              6. Booking Cancellations & En Route Mobilisation Policy
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Because same-day emergency repairs require the immediate allocation of a mobile service van and the potential turning away of other urgent customer calls:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-2">
                <li>
                  <strong>Free Cancellation Window:</strong> You may cancel a requested dispatch without penalty within 15 minutes of booking confirmation, or before the assigned technician has commenced travel to your property.
                </li>
                <li>
                  <strong>En Route Cancellation:</strong> If a cancellation is requested after a technician has rolled their vehicle and is actively en route to your specified address, an en route mobilisation fee (equivalent to 50% of the standard diagnostic callout fee) may be billed to reimburse the contractor&apos;s incurred travel and fuel costs.
                </li>
                <li>
                  <strong>On-Site Arrival:</strong> If the technician arrives at your premises and access is refused or unattainable within 20 minutes of arrival, the full diagnostic callout fee remains payable.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7" className="scroll-mt-24 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 07</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              7. 12-Month Workmanship & Genuine Parts Warranty Standard
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                In accordance with our platform quality standards and consumer guarantees:
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5">
                <li>
                  <strong>Workmanship Guarantee:</strong> All labor performed by verified Trade Contractors carries a minimum 12-month workmanship guarantee from the invoice completion date.
                </li>
                <li>
                  <strong>Genuine Replacement Parts:</strong> All fitted replacement parts (compressors, elements, pumps, valves, lock barrels, springs) carry their respective Australian manufacturer warranties (minimum 12 months for new components).
                </li>
                <li>
                  <strong>Warranty Claims:</strong> In the unlikely event that a repaired component fails within the warranty period, the original servicing contractor will return to inspect and rectify the defect without secondary callout fees.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8" className="scroll-mt-24 pb-4">
            <div className="flex items-center gap-2 text-orange-600 font-mono font-bold text-xs uppercase tracking-wider mb-2">
              <span>Clause 08</span>
            </div>
            <h2 className="text-xl font-bold text-slate-950 mb-3">
              8. Limitation of Liability, Disputes & Direct Resolution
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                To the extent permitted by law, SameDayRepairs.com.au is not liable for indirect, incidental, special, or consequential damages resulting from the acts, omissions, negligence, or delays of any independent Trade Contractor.
              </p>
              <p>
                <strong>Fair Trading Dispute Resolution:</strong> If a disagreement arises regarding repair workmanship or pricing, Customers are encouraged to contact our administrative desk first at{" "}
                <a href="tel:0468991300" className="text-orange-600 font-bold hover:underline">
                  0468 991 300
                </a>{" "}
                or via email at{" "}
                <a href="mailto:support@samedayrepairs.com.au" className="text-orange-600 font-bold hover:underline">
                  support@samedayrepairs.com.au
                </a>
                . We facilitate direct, prompt mediation between the customer and contractor. If a matter cannot be settled amicably, either party may refer the matter to their respective State Fair Trading Tribunal or small claims authority.
              </p>
            </div>
          </section>

        </div>

        {/* Contact Footer Card */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-1">
              Legal Enquiries & Trade Governance
            </div>
            <h3 className="text-xl font-bold text-white">
              Questions Regarding Our Terms?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Our Australian legal and compliance desk is available to assist property owners and trade partners.
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
              href="/trade-charter"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-3 text-xs font-bold text-slate-200 transition-colors"
            >
              <span>View Trade Charter</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
