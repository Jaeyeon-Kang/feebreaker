import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { stripeFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UK Stripe Fee Calculator — Calculate Stripe Fees for UK Payments",
  description:
    "Free Stripe fee calculator for UK payments. See exactly how much Stripe charges and what you keep. UK domestic 1.5% + 20p, international 3.2% + 20p.",
  openGraph: {
    title: "UK Stripe Fee Calculator | FeeBreaker",
    description:
      "Calculate Stripe fees for UK payments. See what you keep after Stripe processing fees.",
    url: "https://feebreaker.com/gb/stripe",
  },
  alternates: {
    canonical: "https://feebreaker.com/gb/stripe",
  },
};

export default function GBStripePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stripe Fee Calculator (UK)",
    url: "https://feebreaker.com/gb/stripe",
    description:
      "Calculate Stripe processing fees for UK domestic and international payments.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
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
        <span className="text-slate-600">GB</span>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Stripe Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            GB
          </span>
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Stripe
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          UK Stripe Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate exactly how much Stripe charges for your UK payment and what
          you keep. Supports domestic UK cards and international card transactions.
        </p>
      </div>

      <FeeCalculator
        feeData={stripeFees.uk}
        compareTo={{ name: "PayPal", href: "/gb/paypal" }}
      />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How Stripe Fees Work in the UK
        </h2>
        <div className="prose prose-slate prose-sm max-w-none text-slate-600 space-y-3">
          <p>
            Stripe charges a percentage-based fee plus a flat per-transaction fee on
            every payment. For UK domestic cards, the standard rate is{" "}
            <strong>1.5% + £0.20</strong>. International cards cost more at{" "}
            <strong>3.2% + £0.20</strong>, and there is an additional{" "}
            <strong>+1.5%</strong> surcharge for cards issued outside the UK.
          </p>
          <p>
            These fees are deducted automatically from each payment before the
            funds reach your Stripe balance. There are no monthly fees, no setup
            costs, and no hidden charges for the standard plan.
          </p>
          <p>
            UK businesses benefit from significantly lower domestic rates compared
            to the US (1.5% vs 2.9%), making Stripe especially competitive for
            businesses primarily serving UK customers.
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
                  fee: 25 * 0.015 + 0.20,
                  keep: 25 - (25 * 0.015 + 0.20),
                },
                {
                  amt: 50,
                  type: "Domestic",
                  fee: 50 * 0.015 + 0.20,
                  keep: 50 - (50 * 0.015 + 0.20),
                },
                {
                  amt: 100,
                  type: "Domestic",
                  fee: 100 * 0.015 + 0.20,
                  keep: 100 - (100 * 0.015 + 0.20),
                },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.032 + 0.20,
                  keep: 100 - (100 * 0.032 + 0.20),
                },
                {
                  amt: 500,
                  type: "Domestic",
                  fee: 500 * 0.015 + 0.20,
                  keep: 500 - (500 * 0.015 + 0.20),
                },
                {
                  amt: 1000,
                  type: "Domestic",
                  fee: 1000 * 0.015 + 0.20,
                  keep: 1000 - (1000 * 0.015 + 0.20),
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">£{row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-£{row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    £{row.keep.toFixed(2)}
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
              Does Stripe charge monthly fees in the UK?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Stripe has no monthly fees, setup fees, or cancellation fees
              in the UK. You only pay per transaction, making it cost-effective
              for businesses of all sizes.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What are Stripe&apos;s UK international fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              International cards (cards issued outside the UK) are charged at
              3.2% + £0.20. Additionally, there is a +1.5% fee for non-UK issued
              cards. Currency conversion adds another 2% on top when the payment
              currency differs from your settlement currency.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How do I reduce Stripe fees in the UK?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              High-volume businesses can contact Stripe for custom pricing.
              Encouraging customers to pay with UK-issued cards avoids the
              international surcharge. Settling in GBP eliminates currency
              conversion fees. Businesses processing £250K+ per year may qualify
              for negotiated rates.
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
            href="/gb/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            UK PayPal Fee Calculator
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
        Fee data from the official {stripeFees.uk.source}. Last updated:{" "}
        {stripeFees.uk.lastUpdated}. Rates shown are standard; your account may
        have different pricing.
      </div>
    </div>
  );
}
