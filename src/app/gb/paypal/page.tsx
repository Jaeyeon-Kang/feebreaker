import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { paypalFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UK PayPal Fee Calculator ??Calculate PayPal Fees for UK Payments",
  description:
    "Free PayPal fee calculator for UK payments. Standard rate 2.9% + 30p, international 4.99% + 30p.",
  openGraph: {
    title: "UK PayPal Fee Calculator | FeeBreaker",
    description:
      "Calculate PayPal fees for UK payments. See what you keep after PayPal processing fees.",
    url: "https://www.feebreaker.com/gb/paypal",
  },
  alternates: {
    canonical: "https://www.feebreaker.com/gb/paypal",
  },
};

export default function GBPayPalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PayPal Fee Calculator (UK)",
    url: "https://www.feebreaker.com/gb/paypal",
    description:
      "Calculate PayPal fees for UK domestic and international payments.",
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
        <span className="text-slate-900" aria-current="page">PayPal Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            GB
          </span>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            PayPal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          UK PayPal Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate PayPal fees for UK transactions. Find out exactly how much
          PayPal takes and what lands in your account.
        </p>
      </div>

      <FeeCalculator
        feeData={paypalFees.uk}
        compareTo={{ name: "Stripe", href: "/gb/stripe" }}
      />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How PayPal Fees Work in the UK
        </h2>
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            PayPal UK charges a standard rate of{" "}
            <strong>2.9% + 짙0.30</strong> per domestic transaction. International
            transactions cost <strong>4.99% + 짙0.30</strong>. There are no
            monthly fees for standard PayPal business accounts.
          </p>
          <p>
            Currency conversion incurs an additional fee (typically 3-4% above
            the mid-market exchange rate) when your customer pays in a different
            currency. If you receive payments in multiple currencies, settling in
            GBP helps avoid these additional charges.
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
                  fee: 25 * 0.029 + 0.30,
                  keep: 25 - (25 * 0.029 + 0.30),
                },
                {
                  amt: 50,
                  type: "Domestic",
                  fee: 50 * 0.029 + 0.30,
                  keep: 50 - (50 * 0.029 + 0.30),
                },
                {
                  amt: 100,
                  type: "Domestic",
                  fee: 100 * 0.029 + 0.30,
                  keep: 100 - (100 * 0.029 + 0.30),
                },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.0499 + 0.30,
                  keep: 100 - (100 * 0.0499 + 0.30),
                },
                {
                  amt: 500,
                  type: "Domestic",
                  fee: 500 * 0.029 + 0.30,
                  keep: 500 - (500 * 0.029 + 0.30),
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">짙{row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-짙{row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    짙{row.keep.toFixed(2)}
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
              Does PayPal charge monthly fees in the UK?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Standard PayPal business accounts in the UK have no monthly
              fees. You only pay per transaction when you receive payments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Are PayPal Friends &amp; Family payments free in the UK?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Domestic personal transfers funded by bank account or PayPal
              balance are free. However, using Friends &amp; Family for business
              transactions violates PayPal&apos;s Terms of Service and removes
              buyer protection.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How does PayPal compare to Stripe in the UK?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe (1.5% + 짙0.20) is cheaper than PayPal (2.9% + 짙0.30) for
              UK domestic transactions. However, PayPal&apos;s buyer recognition
              and checkout trust can improve conversion rates for some businesses.
              Use our{" "}
              <Link href="/compare" className="text-emerald-600 hover:underline">
                comparison tool
              </Link>{" "}
              to see the full breakdown.
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
            href="/gb/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            UK Stripe Fee Calculator
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
        Fee data from the official {paypalFees.uk.source}. Last updated:{" "}
        {paypalFees.uk.lastUpdated}. Rates shown are standard; your account may
        have different pricing.
      </div>
    </div>
  );
}
