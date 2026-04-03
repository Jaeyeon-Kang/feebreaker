import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Payment Processing Fees Eat Into Your Freelance Income",
  description:
    "Most freelancers underestimate how much they lose to fees each year. Here's how to calculate the real cost ??and how to price your services to account for it.",
  alternates: {
    canonical: "https://feebreaker.com/blog/how-payment-fees-affect-freelance-income",
  },
};

export default function FeesAndFreelancePost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">How Payment Fees Affect Freelance Income</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        How Payment Processing Fees Eat Into Your Freelance Income
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>March 30, 2026</span>
        <span>쨌</span>
        <span>6 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          If you charge $100 per hour and bill 20 hours a month, you expect $2,000.
          But after Stripe takes its cut, you actually receive around $1,942. That&apos;s
          $58 gone ??before taxes. Over a year, that&apos;s nearly $700 in fees you
          might not be accounting for when you set your rates.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">The Hidden Cost of Convenience</h2>
          <p>
            Payment processors are convenient ??and they should be paid for that convenience.
            The problem isn&apos;t the fee itself, it&apos;s that most freelancers don&apos;t factor fees
            into their pricing. They calculate their target income, set a rate to hit it,
            then watch fees silently erode their actual take-home pay.
          </p>
          <p className="mt-3">
            Standard Stripe fees are 2.9% + $0.30 per transaction. PayPal charges 3.49% + $0.49.
            These numbers look small. Across a full year of invoicing, they add up fast.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Annual Fee Cost by Income Level</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Annual Revenue</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Stripe Fees (~3%)</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">PayPal Fees (~3.6%)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rev: "$24,000", stripe: "~$720", paypal: "~$864" },
                  { rev: "$48,000", stripe: "~$1,440", paypal: "~$1,728" },
                  { rev: "$72,000", stripe: "~$2,160", paypal: "~$2,592" },
                  { rev: "$120,000", stripe: "~$3,600", paypal: "~$4,320" },
                ].map((row, i) => (
                  <tr key={row.rev} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200 font-medium">{row.rev}</td>
                    <td className="p-3 border border-slate-200">{row.stripe}</td>
                    <td className="p-3 border border-slate-200">{row.paypal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Approximate figures based on standard card transaction rates.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">How to Price to Cover Fees</h2>
          <p>
            The most reliable approach: decide your target income, then use a reverse
            calculator to find out what you need to invoice so that after fees you end up
            with your target amount.
          </p>
          <p className="mt-3">
            For example, if you want to receive exactly $1,000 via Stripe, you should
            invoice <strong>$1,030.93</strong> ??not $1,000. If you invoice $1,000,
            you receive $970.70.
          </p>
          <p className="mt-3">
            Most freelancers never do this math. They invoice round numbers and absorb the
            difference without noticing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Three Strategies to Reduce Fee Impact</h2>

          <h3 className="font-semibold text-slate-800 mt-4 mb-2">1. Use ACH / Bank Transfer for Large Invoices</h3>
          <p>
            Stripe ACH Direct Debit charges just 0.8% (capped at $5). On a $2,000 invoice,
            that&apos;s $5 instead of $58.30. The catch: ACH takes 3?? business days to settle
            and requires the client to connect their bank account.
          </p>

          <h3 className="font-semibold text-slate-800 mt-4 mb-2">2. Consolidate Invoices</h3>
          <p>
            The flat fee component ($0.30 for Stripe, $0.49 for PayPal) hits hardest on
            small transactions. If you bill weekly at $250, you pay $0.30 횞 52 = $15.60/year
            in flat fees. Billing monthly at $1,000 cuts that to $0.30 횞 12 = $3.60.
          </p>

          <h3 className="font-semibold text-slate-800 mt-4 mb-2">3. Build Fees Into Your Rate</h3>
          <p>
            Add 3??% to your desired hourly or project rate. Make it a line item on your
            invoice labelled &quot;Payment processing fee&quot; ??or simply bake it into your
            quoted price. Either way, you stop absorbing a business cost personally.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Is It Legal to Pass Fees to Clients?</h2>
          <p>
            In most US states, yes ??you can add a surcharge to credit card payments, provided
            you disclose it upfront. However, Stripe and PayPal&apos;s terms of service have their
            own rules about surcharging. Always check the current terms before adding fees
            as a separate line item.
          </p>
          <p className="mt-3">
            A simpler approach that avoids all this: quote a rate that already includes the
            fee. Clients don&apos;t need to know the breakdown.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Calculate what you&apos;ll actually receive</p>
          <p className="text-sm text-emerald-800 mb-3">
            Use the reverse calculator to find out what to invoice to receive your exact target amount after fees.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/us/stripe" className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors">
              Stripe Calculator ??            </Link>
            <Link href="/us/paypal" className="inline-block px-4 py-2 border border-emerald-600 text-emerald-700 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition-colors">
              PayPal Calculator ??            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
