import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "eBay Fees Explained: Final Value Fees, Insertion & Managed Payments (2026)",
  description:
    "A complete guide to eBay seller fees in 2026 — final value fees by category, insertion fees, managed payments processing, and how to calculate your net payout per sale.",
  alternates: {
    canonical: "https://www.feebreaker.com/blog/ebay-fees-explained",
  },
};

export default function EbayFeesPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">eBay Fees Explained</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        eBay Fees Explained: Final Value Fees, Insertion &amp; Managed Payments (2026)
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>April 3, 2026</span>
        <span>·</span>
        <span>6 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          eBay&apos;s fee structure has three main components: insertion fees for listing,
          final value fees when you sell, and payment processing through Managed Payments.
          Understanding all three is essential for accurate profit calculations.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Insertion Fees (Listing Fees)</h2>
          <p>
            Most sellers get <strong>250 free listings per month</strong>. Beyond that,
            eBay charges $0.35 per listing. Store subscribers get significantly more free
            listings depending on their plan level.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Store Plan</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Monthly Fee</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Free Listings</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["No Store", "$0", "250"],
                  ["Starter", "$4.95", "250"],
                  ["Basic", "$21.95", "1,000"],
                  ["Premium", "$59.95", "10,000"],
                  ["Anchor", "$299.95", "25,000"],
                ].map(([plan, fee, listings], i) => (
                  <tr key={plan} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200 font-medium">{plan}</td>
                    <td className="p-3 border border-slate-200">{fee}</td>
                    <td className="p-3 border border-slate-200">{listings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Final Value Fees by Category</h2>
          <p>
            The final value fee is charged when your item sells — calculated on the total
            amount paid including shipping and taxes.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Category</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Final Value Fee</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Per-Order Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Most categories", "13.25% (up to $7,500)", "$0.30"],
                  ["Electronics", "8.7%", "$0.30"],
                  ["Clothing & Accessories", "15%", "$0.30"],
                  ["Sneakers > $150", "8%", "$0.30"],
                  ["Musical Instruments", "6.35%", "$0.30"],
                  ["Collectibles", "13.25%", "$0.30"],
                ].map(([cat, rate, ord], i) => (
                  <tr key={cat} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{cat}</td>
                    <td className="p-3 border border-slate-200 font-medium">{rate}</td>
                    <td className="p-3 border border-slate-200">{ord}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Above $7,500 the rate drops to 2.35% for most categories.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Managed Payments Processing Fee</h2>
          <p>
            eBay now handles all payments through Managed Payments. There is no separate
            PayPal fee — the processing cost is built into the final value fee calculation above.
            The per-order fee ($0.30) is eBay&apos;s payment processing component.
          </p>
          <p className="mt-3">
            Payouts are sent to your bank account, typically within 1–3 business days
            after the buyer&apos;s payment clears.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Full Cost Example: $50 Sale</h2>
          <div className="bg-slate-50 rounded-xl p-5 space-y-2 text-sm">
            <div className="flex justify-between"><span>Sale price (incl. $5 shipping)</span><span className="font-medium">$50.00</span></div>
            <div className="flex justify-between text-slate-500"><span>Final value fee (13.25%)</span><span>- $6.63</span></div>
            <div className="flex justify-between text-slate-500"><span>Per-order fee</span><span>- $0.30</span></div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
              <span>Net payout</span><span>$43.07</span>
            </div>
            <p className="text-xs text-slate-400 pt-1">Effective fee rate: ~13.9%. Still need to subtract actual shipping cost and item cost.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">eBay vs Etsy vs Amazon: Which Platform Costs Less?</h2>
          <p>
            For most categories, eBay&apos;s fees (13–15%) are comparable to Etsy (6.5% transaction + payment processing ≈ 9–10% total) and lower than Amazon (15% referral + FBA).
            eBay is generally strongest for electronics, used goods, and collectibles where category rates are lower and buyers specifically search eBay.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Compare platform fees side by side</p>
          <p className="text-sm text-emerald-800 mb-3">
            Use our Etsy fee calculator to see how platforms compare for your specific product pricing.
          </p>
          <Link
            href="/etsy"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Etsy Fee Calculator →
          </Link>
        </div>

      </div>
    </div>
  );
}
