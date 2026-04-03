import type { Metadata } from "next";
import Link from "next/link";
import StripeACHCalculator from "./StripeACHCalculator";

export const metadata: Metadata = {
  title: "Stripe ACH Fee Calculator \u2014 0.8% Capped at $5",
  description:
    "Calculate Stripe ACH Direct Debit fees. 0.8% per transaction, capped at $5.00. See how much you save vs card payments on large transactions.",
  alternates: { canonical: "https://feebreaker.com/us/stripe-ach" },
  openGraph: {
    title: "Stripe ACH Fee Calculator | FeeBreaker",
    description:
      "ACH Direct Debit at 0.8%, capped at $5.00. The most cost-effective way to accept large payments.",
    url: "https://feebreaker.com/us/stripe-ach",
  },
};

// Pre-computed break-even table data
const breakEvenRows = [
  { amount: 100, achFee: 0.8, cardFee: 3.2, savings: 2.4 },
  { amount: 500, achFee: 4.0, cardFee: 14.8, savings: 10.8 },
  { amount: 625, achFee: 5.0, cardFee: 18.425, savings: 13.425, isCap: true },
  { amount: 1000, achFee: 5.0, cardFee: 29.3, savings: 24.3 },
  { amount: 5000, achFee: 5.0, cardFee: 145.3, savings: 140.3 },
  { amount: 10000, achFee: 5.0, cardFee: 290.3, savings: 285.3 },
];

export default function StripeACHPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Stripe ACH Fee Calculator",
    url: "https://feebreaker.com/us/stripe-ach",
    description:
      "Calculate Stripe ACH Direct Debit fees. 0.8% per transaction, capped at $5.00.",
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
        <span className="text-slate-900" aria-current="page">
          Stripe ACH Fee Calculator
        </span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            US
          </span>
          <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
            Stripe
          </span>
          <span className="text-xs font-bold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">
            ACH
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Stripe ACH Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          ACH Direct Debit at 0.8%, capped at $5.00 per transaction. The most
          cost-effective way to accept large payments.
        </p>
      </div>

      <StripeACHCalculator />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How Stripe ACH Fees Work
        </h2>
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            Stripe ACH Direct Debit charges{" "}
            <strong>0.8% of the transaction amount</strong>, with a{" "}
            <strong>maximum fee cap of $5.00 per transaction</strong>. There is
            no fixed per-transaction fee.
          </p>
          <p>
            This means for any payment of <strong>$625 or more</strong>, the
            fee is always just $5.00 &mdash; making ACH extremely cost-effective
            for large transactions.
          </p>
          <p>
            <strong>Compare:</strong> a $1,000 card payment via standard Stripe
            costs $29.30. The same $1,000 via ACH costs just $5.00 &mdash; a
            savings of $24.30.
          </p>
          <p>
            <strong>Downsides to consider:</strong> ACH payments take 3&ndash;5
            business days to settle (vs. instant for cards). There is also a
            higher dispute rate with longer resolution windows, and ACH only
            works for US bank accounts.
          </p>
        </div>
      </section>

      {/* Break-even comparison table */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          ACH vs Card: Fee Comparison
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Card fee calculated at standard Stripe rate (2.9% + $0.30). The
          savings grow dramatically as amounts increase.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Amount
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  ACH Fee
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Card Fee (2.9%+$0.30)
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-emerald-700">
                  Savings with ACH
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {breakEvenRows.map((row) => (
                <tr key={row.amount} className={row.isCap ? "bg-emerald-50" : ""}>
                  <td className="p-3 font-medium">${row.amount.toLocaleString()}</td>
                  <td className="p-3 text-red-500">
                    ${row.achFee.toFixed(2)}
                    {row.isCap && (
                      <span className="ml-1.5 text-xs text-emerald-600 font-semibold">
                        (cap)
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-500">${row.cardFee.toFixed(2)}</td>
                  <td className="p-3 font-semibold text-emerald-600">
                    ${row.savings.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          For amounts over $625, the ACH fee is always $5.00 regardless of how
          large the payment is.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What is Stripe ACH Direct Debit?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              ACH Direct Debit is a bank-to-bank transfer method that moves
              funds directly between US bank accounts through the ACH network.
              It is significantly cheaper than card payments, especially for
              large amounts, but takes longer to settle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Why does ACH have a $5 cap?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe&apos;s pricing structure caps the ACH fee at $5.00 to
              incentivize businesses to use ACH for large payments. This makes
              it far more economical than card processing for high-value
              transactions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What&apos;s the break-even point for ACH vs cards?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              For payments over approximately $180, ACH becomes cheaper than
              standard Stripe card processing (2.9% + $0.30). Below $180, the
              0.8% ACH rate is actually slightly more than the effective card
              rate for small amounts.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How long does Stripe ACH take?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe ACH Direct Debit payments typically take 3&ndash;5 business
              days to settle. This is one of the main tradeoffs vs. card
              payments, which settle much faster.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does Stripe ACH work for subscriptions?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes. Stripe supports recurring ACH Direct Debit payments through
              Stripe Billing. Customers authorize the debit once and payments
              are automatically collected on your billing schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h2>
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
            Stripe vs PayPal
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
        Stripe ACH pricing from Stripe&apos;s official pricing page. Last verified
        March 2026. Rates shown are standard; your account may have different
        pricing.
      </div>
    </div>
  );
}
