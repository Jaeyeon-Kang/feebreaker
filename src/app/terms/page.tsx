import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — FeeBreaker",
  description:
    "FeeBreaker terms of service. Understand the conditions for using our free fee calculators and business tools.",
  alternates: {
    canonical: "https://feebreaker.com/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">
          Terms of Service
        </span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: March 30, 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using FeeBreaker (&quot;Service&quot;), you agree to be bound
            by these Terms of Service. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
          <p>
            FeeBreaker provides free online calculators and tools to help freelancers,
            sellers, and business owners estimate payment processing fees (Stripe, PayPal,
            Etsy, etc.), generate invoices, and calculate business metrics. All tools are
            provided free of charge.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Accuracy of Calculations</h2>
          <p>
            All fee calculations provided by FeeBreaker are <strong>estimates only</strong>.
            Payment processor fees, tax rates, and other figures may change without notice.
            FeeBreaker makes no warranty that calculations are accurate, complete, or
            up-to-date. Always verify figures directly with the official platform (Stripe,
            PayPal, Etsy, etc.) before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Disclaimer of Warranties</h2>
          <p>
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties
            of any kind, either express or implied. FeeBreaker does not warrant that the
            Service will be uninterrupted, error-free, or free of viruses or other harmful
            components.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
          <p>
            FeeBreaker shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of, or inability
            to use, the Service or its calculations. This includes any financial losses
            resulting from reliance on our fee estimates.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Intellectual Property</h2>
          <p>
            All content on FeeBreaker, including text, code, design, and logos, is the
            property of FeeBreaker. You may not reproduce, distribute, or create
            derivative works without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Prohibited Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Scrape or automatically extract data from the Service at scale</li>
            <li>Misrepresent FeeBreaker&apos;s calculations as official platform figures</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Changes to Terms</h2>
          <p>
            FeeBreaker reserves the right to modify these terms at any time. Continued
            use of the Service after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">9. Governing Law</h2>
          <p>
            These terms are governed by applicable law. Any disputes shall be resolved
            in accordance with those laws.
          </p>
        </section>
      </div>
    </div>
  );
}
