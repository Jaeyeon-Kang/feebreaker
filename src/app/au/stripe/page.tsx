import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { stripeFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Australia Stripe Fee Calculator ??Calculate Stripe Fees (AUD)",
  description:
    "Free Stripe fee calculator for Australian payments. Domestic 1.7% + A$0.30, international 3.5% + A$0.30.",
  openGraph: {
    title: "Australia Stripe Fee Calculator | FeeBreaker",
    description:
      "Calculate Stripe fees for Australian payments in AUD. See what you keep after Stripe processing fees.",
    url: "https://www.feebreaker.com/au/stripe",
  },
  alternates: {
    canonical: "https://www.feebreaker.com/au/stripe",
  },
};

export default function AUStripePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stripe Fee Calculator (Australia)",
    url: "https://www.feebreaker.com/au/stripe",
    description:
      "Calculate Stripe processing fees for Australian domestic and international payments.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
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
        <span className="text-slate-600">AU</span>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Stripe Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            AU
          </span>
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Stripe
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Australia Stripe Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate exactly how much Stripe charges for your Australian payment
          in AUD and what you keep. Supports both domestic and international card
          transactions.
        </p>
      </div>

      <FeeCalculator
        feeData={stripeFees.au}
        compareTo={{ name: "PayPal", href: "/au/paypal" }}
      />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How Stripe Fees Work in Australia
        </h2>
        <div className="prose prose-slate prose-sm max-w-none text-slate-600 space-y-3">
          <p>
            Stripe Australia offers competitive domestic rates at{" "}
            <strong>1.7% + A$0.30</strong> ??significantly lower than the US rate
            of 2.9%. International cards cost <strong>3.5% + A$0.30</strong>, and
            there is an additional 1% currency conversion fee when applicable.
          </p>
          <p>
            These fees are deducted automatically from each payment before the
            funds reach your Stripe balance. There are no monthly fees, no setup
            costs, and no hidden charges for the standard plan.
          </p>
          <p>
            Australian businesses benefit from one of the lowest domestic Stripe
            rates globally, making it an excellent choice for businesses
            primarily serving Australian customers. The low 1.7% domestic rate
            means you keep more of every sale.
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
                  fee: 25 * 0.017 + 0.30,
                  keep: 25 - (25 * 0.017 + 0.30),
                },
                {
                  amt: 50,
                  type: "Domestic",
                  fee: 50 * 0.017 + 0.30,
                  keep: 50 - (50 * 0.017 + 0.30),
                },
                {
                  amt: 100,
                  type: "Domestic",
                  fee: 100 * 0.017 + 0.30,
                  keep: 100 - (100 * 0.017 + 0.30),
                },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.035 + 0.30,
                  keep: 100 - (100 * 0.035 + 0.30),
                },
                {
                  amt: 500,
                  type: "Domestic",
                  fee: 500 * 0.017 + 0.30,
                  keep: 500 - (500 * 0.017 + 0.30),
                },
                {
                  amt: 1000,
                  type: "Domestic",
                  fee: 1000 * 0.017 + 0.30,
                  keep: 1000 - (1000 * 0.017 + 0.30),
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">A${row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-A${row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    A${row.keep.toFixed(2)}
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
              Does Stripe charge monthly fees in Australia?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Stripe has no monthly fees, setup fees, or cancellation fees
              in Australia. You only pay per transaction when you receive payments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Why is Stripe&apos;s Australian domestic rate lower than the US?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe sets different rates per country based on local card network
              interchange rates and market conditions. Australia&apos;s regulated
              interchange environment results in lower underlying costs, which
              Stripe passes on as a 1.7% domestic rate ??versus 2.9% in the US.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How do I reduce Stripe fees in Australia?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Encourage domestic card payments to benefit from the 1.7% rate.
              High-volume businesses can contact Stripe for custom pricing.
              Avoiding currency conversion by pricing in AUD also eliminates the
              additional 1% conversion fee.
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
            href="/au/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Australia PayPal Fee Calculator
          </Link>
          <Link
            href="/compare"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe vs PayPal Comparison
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
        Fee data from the official {stripeFees.au.source}. Last updated:{" "}
        {stripeFees.au.lastUpdated}. Rates shown are standard; your account may
        have different pricing.
      </div>
    </div>
  );
}
