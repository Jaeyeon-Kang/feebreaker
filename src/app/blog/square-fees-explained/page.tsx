import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Square Fees Explained: In-Person, Online & Invoicing (2026)",
  description:
    "Square charges different rates for in-person, online, and manually entered payments. A clear breakdown of Square fees for small businesses and freelancers in 2026.",
  alternates: {
    canonical: "https://feebreaker.com/blog/square-fees-explained",
  },
};

export default function SquareFeesPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Square Fees Explained</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Square Fees Explained: In-Person, Online &amp; Invoicing (2026)
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>April 3, 2026</span>
        <span>·</span>
        <span>5 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          Square is popular with small businesses and freelancers for its simple, flat-rate
          pricing and free POS hardware for card readers. The fee varies by how you accept
          the payment — and that difference adds up quickly.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Square Standard Rates (2026)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-slate-200 rounded-xl">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Payment Type</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Rate</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Why Different</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["In-person (tap/chip/swipe)", "2.6% + $0.10", "Lowest fraud risk"],
                  ["Online checkout", "2.9% + $0.30", "Card not present"],
                  ["Invoices (free plan)", "3.3% + $0.30", "Invoice-based billing"],
                  ["Manually keyed / card on file", "3.5% + $0.15", "Highest fraud risk"],
                  ["ACH bank transfer", "1% (min $1.00)", "Bank-to-bank, lower risk"],
                ].map(([type, rate, reason], i) => (
                  <tr key={type} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200 font-medium">{type}</td>
                    <td className="p-3 border border-slate-200 font-semibold text-slate-900">{rate}</td>
                    <td className="p-3 border border-slate-200 text-slate-500 text-xs">{reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Square also offers Plus and Premium plans with lower rates in exchange for monthly fees. Standard (free) plan shown above.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Square vs Stripe vs PayPal (Online)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Processor</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Online Rate</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Fee on $500</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Square", "2.9% + $0.30", "$14.80"],
                  ["Stripe", "2.9% + $0.30", "$14.80"],
                  ["PayPal", "3.49% + $0.49", "$17.94"],
                ].map(([proc, rate, fee], i) => (
                  <tr key={proc} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200 font-medium">{proc}</td>
                    <td className="p-3 border border-slate-200">{rate}</td>
                    <td className="p-3 border border-slate-200">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            For online payments, Square and Stripe are essentially identical in price.
            The choice comes down to ecosystem: Square for brick-and-mortar businesses
            that also sell online, Stripe for developer-heavy integrations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">When Square Wins</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Free hardware:</strong> Square provides a free magstripe reader and sells chip/tap readers at low cost — great for in-person sellers just starting out.</li>
            <li><strong>All-in-one ecosystem:</strong> POS, invoicing, payroll, appointments, and online store in one dashboard.</li>
            <li><strong>In-person rate:</strong> At 2.6% + $0.10, the in-person rate is lower than online, rewarding businesses that primarily sell face-to-face.</li>
            <li><strong>No monthly fee:</strong> The free plan has no monthly cost — you only pay when you get paid.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Watch Out: Manually Keyed Rate</h2>
          <p>
            If you manually type in a card number (or use a saved card on file), Square
            charges <strong>3.5% + $0.15</strong> — significantly higher than in-person.
            For a $200 transaction, that&apos;s $7.15 vs $5.30 in-person. Always swipe/tap when possible.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Compare Stripe vs PayPal fees</p>
          <p className="text-sm text-emerald-800 mb-3">
            See how Stripe and PayPal compare across different invoice amounts with our side-by-side calculator.
          </p>
          <Link
            href="/compare"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Stripe vs PayPal Calculator →
          </Link>
        </div>

      </div>
    </div>
  );
}
