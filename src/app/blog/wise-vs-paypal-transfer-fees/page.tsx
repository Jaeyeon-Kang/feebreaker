import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Wise vs PayPal for International Transfers: Fee Comparison 2026",
  description:
    "Sending money internationally? Wise and PayPal charge very differently. A side-by-side comparison of fees, exchange rates, and when each service actually saves you money.",
  alternates: {
    canonical: "https://feebreaker.com/blog/wise-vs-paypal-transfer-fees",
  },
};

export default function WiseVsPaypalPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Wise vs PayPal Transfer Fees</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Wise vs PayPal for International Transfers: Fee Comparison 2026
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>April 3, 2026</span>
        <span>·</span>
        <span>5 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          For freelancers and online sellers receiving international payments, the
          difference between Wise and PayPal can be hundreds of dollars per year.
          The key is not just the transfer fee — it&apos;s the exchange rate markup.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">How Each Service Charges</h2>
          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">Wise</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Transparent percentage fee: typically <strong>0.4–1.5%</strong> of transfer amount</li>
                <li>Uses the mid-market exchange rate (no markup)</li>
                <li>Small fixed fee component (varies by currency/country)</li>
                <li>Total cost is shown clearly before you confirm</li>
              </ul>
            </div>
            <div className="p-4 border border-slate-200 rounded-xl">
              <h3 className="font-bold text-slate-900 mb-2">PayPal</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Transfer fee: 5% for international personal payments (min $0.99, max $4.99)</li>
                <li>Exchange rate markup: <strong>3–4%</strong> above mid-market rate</li>
                <li>Business invoice payments from international clients: additional currency conversion fees</li>
                <li>Total cost is often not shown transparently</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Real Cost Comparison: Receiving $1,000 from a UK Client</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Service</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Transfer Fee</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">FX Markup</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">You Receive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Wise</td>
                  <td className="p-3 border border-slate-200">~$5–10</td>
                  <td className="p-3 border border-slate-200">0%</td>
                  <td className="p-3 border border-slate-200 font-semibold text-emerald-700">~$990–995</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">PayPal</td>
                  <td className="p-3 border border-slate-200">$4.99 (capped)</td>
                  <td className="p-3 border border-slate-200">~$35–40</td>
                  <td className="p-3 border border-slate-200 font-semibold text-red-600">~$955–960</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Estimates based on typical USD/GBP rates. FX markup varies by currency pair and market conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">When PayPal Still Makes Sense</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Client preference:</strong> Many clients already have PayPal and won&apos;t set up a new payment method.</li>
            <li><strong>Small amounts:</strong> PayPal&apos;s $4.99 cap means for transfers under ~$150 the total fee can be lower.</li>
            <li><strong>Buyer protection:</strong> PayPal offers buyer/seller dispute resolution that Wise does not.</li>
            <li><strong>Instant availability:</strong> PayPal balance is available immediately; Wise bank transfers take 1–2 days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">The Bottom Line</h2>
          <p>
            For international freelancers receiving payments regularly, <strong>Wise is almost always cheaper</strong> — especially for amounts over $500. The exchange rate markup PayPal adds is the hidden cost that most users don&apos;t calculate.
          </p>
          <p className="mt-3">
            A practical strategy: offer Wise as your primary payment method and PayPal
            as a fallback for clients who insist on it. Factor the extra ~3–4% cost into
            your pricing for PayPal invoices.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Calculate PayPal fees for your invoices</p>
          <p className="text-sm text-emerald-800 mb-3">
            Use our PayPal fee calculator to see exactly what you&apos;ll net after fees for any invoice amount.
          </p>
          <Link
            href="/us/paypal"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            PayPal Fee Calculator →
          </Link>
        </div>

      </div>
    </div>
  );
}
