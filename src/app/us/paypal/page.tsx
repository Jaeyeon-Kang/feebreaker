import type { Metadata } from "next";
import FeeCalculator from "@/app/components/FeeCalculator";
import { paypalFees } from "@/data/fees";
import Link from "next/link";

export const metadata: Metadata = {
  title: "US PayPal Fee Calculator — Calculate PayPal Processing Fees",
  description:
    "Free PayPal fee calculator for US payments. PayPal Checkout 3.49% + $0.49. See your take-home amount instantly. Reverse calculation included.",
  openGraph: {
    title: "US PayPal Fee Calculator | FeeBreaker",
    description:
      "Calculate PayPal fees for US payments. See what you keep after PayPal processing fees.",
    url: "https://feebreaker.com/us/paypal",
  },
  alternates: {
    canonical: "https://feebreaker.com/us/paypal",
  },
};

export default function USPayPalPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PayPal Fee Calculator (US)",
    url: "https://feebreaker.com/us/paypal",
    description:
      "Calculate PayPal Checkout fees for US domestic and international payments.",
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

      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-600">US</span>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">PayPal Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            US
          </span>
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            PayPal
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          US PayPal Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate PayPal Checkout fees for US transactions. Find out exactly
          how much PayPal takes and what lands in your account.
        </p>
      </div>

      <FeeCalculator
        feeData={paypalFees.us}
        compareTo={{ name: "Stripe", href: "/us/stripe" }}
      />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How PayPal Fees Work in the US
        </h2>
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            PayPal Checkout charges <strong>3.49% + $0.49</strong> per domestic
            transaction. International transactions cost{" "}
            <strong>4.49% + $0.49</strong>. There are additional fees for
            currency conversion (typically 3-4% above mid-market rate).
          </p>
          <p>
            PayPal also offers different rates depending on the payment method:
            PayPal Checkout, Standard card processing, and Advanced card
            processing each have slightly different rates. The calculator above
            uses PayPal Checkout rates as these are the most common for
            freelancers and small sellers.
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
                { amt: 25, type: "Domestic", fee: 25 * 0.0349 + 0.49 },
                { amt: 50, type: "Domestic", fee: 50 * 0.0349 + 0.49 },
                { amt: 100, type: "Domestic", fee: 100 * 0.0349 + 0.49 },
                {
                  amt: 100,
                  type: "International",
                  fee: 100 * 0.0449 + 0.49,
                },
                { amt: 500, type: "Domestic", fee: 500 * 0.0349 + 0.49 },
                { amt: 1000, type: "Domestic", fee: 1000 * 0.0349 + 0.49 },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="p-3 font-medium">${row.amt.toFixed(2)}</td>
                  <td className="p-3 text-slate-500">{row.type}</td>
                  <td className="p-3 text-red-500">-${row.fee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    ${(row.amt - row.fee).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Why is PayPal more expensive than Stripe?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              PayPal Checkout&apos;s standard rate (3.49% + $0.49) is higher
              than Stripe&apos;s (2.9% + $0.30). However, PayPal offers brand
              recognition and buyer trust that can increase conversion rates,
              potentially offsetting the cost difference.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Are PayPal Friends &amp; Family payments free?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Domestic personal transfers are free when funded by bank account
              or PayPal balance. However, using Friends &amp; Family for
              business transactions violates PayPal&apos;s Terms of Service.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does PayPal have volume discounts?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes. Merchants processing over $3,000/month can qualify for
              reduced rates. Contact PayPal directly for custom pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Related Tools
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/us/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            US Stripe Fee Calculator
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

      <div className="mt-12 text-xs text-slate-400 max-w-3xl">
        Fee data from the official PayPal US business pricing page. Last
        updated: {paypalFees.us.lastUpdated}.
      </div>
    </div>
  );
}
