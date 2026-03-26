import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { stripeFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US Stripe Fee Calculator — Calculate Stripe Processing Fees",
  description:
    "Free Stripe fee calculator for US payments. See exactly how much Stripe charges and what you keep. Domestic 2.9% + 30\u00A2, international 3.9% + 30\u00A2. Reverse calculate included.",
  openGraph: {
    title: "US Stripe Fee Calculator | FeeBreaker",
    description:
      "Calculate Stripe fees for US payments. See what you keep after Stripe processing fees.",
    url: "https://feebreaker.com/us/stripe",
  },
  alternates: {
    canonical: "https://feebreaker.com/us/stripe",
  },
};

export default function USStripePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stripe Fee Calculator (US)",
    url: "https://feebreaker.com/us/stripe",
    description:
      "Calculate Stripe processing fees for US domestic and international payments.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-600">US</span>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Stripe Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            US
          </span>
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Stripe
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          US Stripe Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate exactly how much Stripe charges for your US payment and what
          you keep. Supports both domestic and international card transactions.
        </p>
      </div>

      <FeeCalculator
        feeData={stripeFees.us}
        compareTo={{ name: "PayPal", href: "/us/paypal" }}
      />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How Stripe Fees Work in the US
        </h2>
        <div className="prose prose-slate prose-sm max-w-none text-slate-600 space-y-3">
          <p>
            Stripe charges a percentage-based fee plus a flat per-transaction
            fee on every payment. For US domestic cards, the standard rate is{" "}
            <strong>2.9% + $0.30</strong>. International cards cost more at{" "}
            <strong>3.9% + $0.30</strong>, and there&apos;s an additional 1%
            currency conversion fee when applicable.
          </p>
          <p>
            These fees are deducted automatically from each payment before the
            funds reach your Stripe balance. No monthly fees, no setup costs,
            no hidden charges.
          </p>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">
          Sample Calculations
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Payment
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Type
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Fee
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-emerald-700">
                  You Keep
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                {
                  amt: 25,
                  type: "Domestic",
                  fee: 25 * 0.029 + 0.3,
                  keep: 25 - (25 * 0.029 + 0.3),
                },
                {
                  amt: 50,
                  type: "Domestic",
                  fee: 50 * 0.029 + 0.3,
                  keep: 50 - (50 * 0.029 + 0.3),
                },
                {
                  amt: 100,
                  type: "Domestic",
                  fee: 100 * 0.029 + 0.3,
                  keep: 100 - (100 * 0.029 + 0.3),
                },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.039 + 0.3,
                  keep: 100 - (100 * 0.039 + 0.3),
                },
                {
                  amt: 500,
                  type: "Domestic",
                  fee: 500 * 0.029 + 0.3,
                  keep: 500 - (500 * 0.029 + 0.3),
                },
                {
                  amt: 1000,
                  type: "Domestic",
                  fee: 1000 * 0.029 + 0.3,
                  keep: 1000 - (1000 * 0.029 + 0.3),
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">${row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-${row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    ${row.keep.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does Stripe charge monthly fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Stripe has no monthly fees, setup fees, or cancellation fees.
              You only pay per transaction.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What about Stripe&apos;s additional fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              International cards add +1% on top of the base rate. Currency
              conversion adds another 1%. Disputed payments (chargebacks) cost
              $15 each. These are not included in the basic calculator above.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How do I reduce Stripe fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              High-volume businesses ($80K+/month) can contact Stripe for custom
              pricing. Otherwise, encouraging domestic card payments and avoiding
              currency conversion can help.
            </p>
          </div>
        </div>
      </section>

      {/* Related tools */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Related Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/us/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            US PayPal Fee Calculator
          </Link>
          <Link
            href="/compare"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe vs PayPal Comparison
          </Link>
          <Link
            href="/margin"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Profit Margin Calculator
          </Link>
          <Link
            href="/invoice"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Invoice Generator
          </Link>
        </div>
      </section>

      {/* Source */}
      <div className="mt-12 text-xs text-slate-400 max-w-3xl">
        Fee data from the official Stripe US pricing page. Last updated:{" "}
        {stripeFees.us.lastUpdated}. Rates shown are standard; your account may
        have different pricing.
      </div>
    </div>
  );
}
