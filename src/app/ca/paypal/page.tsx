import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { paypalFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Canada PayPal Fee Calculator ??Calculate PayPal Fees (CAD)",
  description:
    "Free PayPal fee calculator for Canadian payments. Standard 2.89% + C$0.30.",
  openGraph: {
    title: "Canada PayPal Fee Calculator | FeeBreaker",
    description:
      "Calculate PayPal fees for Canadian payments in CAD. See what you keep after PayPal processing fees.",
    url: "https://feebreaker.com/ca/paypal",
  },
  alternates: {
    canonical: "https://feebreaker.com/ca/paypal",
  },
};

export default function CAPayPalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PayPal Fee Calculator (Canada)",
    url: "https://feebreaker.com/ca/paypal",
    description:
      "Calculate PayPal fees for Canadian domestic and international payments.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
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
        <span className="text-slate-600">CA</span>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">PayPal Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            CA
          </span>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            PayPal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Canada PayPal Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate PayPal fees for Canadian transactions in CAD. Find out
          exactly how much PayPal takes and what lands in your account.
        </p>
      </div>

      <FeeCalculator
        feeData={paypalFees.ca}
        compareTo={{ name: "Stripe", href: "/ca/stripe" }}
      />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How PayPal Fees Work in Canada
        </h2>
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            PayPal Canada charges <strong>2.89% + C$0.30</strong> per domestic
            transaction. International transactions cost{" "}
            <strong>3.89% + C$0.30</strong>. There are no monthly fees for
            standard PayPal business accounts in Canada.
          </p>
          <p>
            Currency conversion incurs an additional fee when your customer pays
            in a different currency. If you accept USD payments from American
            customers, PayPal will convert to CAD and charge a conversion spread
            (typically 3-4% above the mid-market rate).
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
                  fee: 25 * 0.0289 + 0.30,
                  keep: 25 - (25 * 0.0289 + 0.30),
                },
                {
                  amt: 50,
                  type: "Domestic",
                  fee: 50 * 0.0289 + 0.30,
                  keep: 50 - (50 * 0.0289 + 0.30),
                },
                {
                  amt: 100,
                  type: "Domestic",
                  fee: 100 * 0.0289 + 0.30,
                  keep: 100 - (100 * 0.0289 + 0.30),
                },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.0389 + 0.30,
                  keep: 100 - (100 * 0.0389 + 0.30),
                },
                {
                  amt: 500,
                  type: "Domestic",
                  fee: 500 * 0.0289 + 0.30,
                  keep: 500 - (500 * 0.0289 + 0.30),
                },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">C${row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-C${row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    C${row.keep.toFixed(2)}
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
              Does PayPal charge monthly fees in Canada?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Standard PayPal business accounts in Canada have no monthly
              fees. You only pay per transaction when you receive payments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Is Stripe or PayPal cheaper in Canada?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe (2.9% + C$0.30) and PayPal (2.89% + C$0.30) have nearly
              identical domestic rates in Canada, making the choice largely
              about features, integration, and customer experience rather than
              cost. Use our{" "}
              <Link href="/compare" className="text-emerald-600 hover:underline">
                comparison tool
              </Link>{" "}
              to see a detailed side-by-side breakdown.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does PayPal support CAD?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes. PayPal fully supports Canadian dollars (CAD) for businesses
              operating in Canada. You can receive, hold, and withdraw funds in
              CAD directly to your Canadian bank account.
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
            href="/ca/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Canada Stripe Fee Calculator
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
        Fee data from the official {paypalFees.ca.source}. Last updated:{" "}
        {paypalFees.ca.lastUpdated}. Rates shown are standard; your account may
        have different pricing.
      </div>
    </div>
  );
}
