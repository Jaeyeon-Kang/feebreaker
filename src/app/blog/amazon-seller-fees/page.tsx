import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amazon Seller Fees Explained: FBA, Referral & Monthly Costs (2026)",
  description:
    "A complete breakdown of Amazon seller fees — referral fees by category, FBA fulfillment costs, monthly subscription, and how to calculate your actual profit per sale.",
  alternates: {
    canonical: "https://feebreaker.com/blog/amazon-seller-fees",
  },
};

export default function AmazonSellerFeesPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Amazon Seller Fees</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Amazon Seller Fees Explained: FBA, Referral &amp; Monthly Costs (2026)
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>April 3, 2026</span>
        <span>·</span>
        <span>7 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          Selling on Amazon involves multiple overlapping fee layers. Many new sellers
          focus only on the referral fee and are surprised when fulfillment costs eat
          half their margin. Here&apos;s every fee you need to account for.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">The Two Seller Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-slate-200 rounded-xl">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Plan</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Monthly Fee</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Per-Item Fee</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-slate-200 font-medium">Individual</td>
                  <td className="p-3 border border-slate-200">$0</td>
                  <td className="p-3 border border-slate-200">$0.99 per sale</td>
                  <td className="p-3 border border-slate-200 text-slate-500 text-xs">Fewer than 40 sales/month</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-3 border border-slate-200 font-medium">Professional</td>
                  <td className="p-3 border border-slate-200">$39.99/month</td>
                  <td className="p-3 border border-slate-200">$0</td>
                  <td className="p-3 border border-slate-200 text-slate-500 text-xs">40+ sales/month, ads, Buy Box</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">The break-even point is 40 sales/month — at that volume the Professional plan pays for itself.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Referral Fees by Category</h2>
          <p>Amazon charges a referral fee on every sale — a percentage of the total sale price including shipping.</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Category</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Referral Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Electronics", "8%"],
                  ["Clothing & Accessories", "17%"],
                  ["Home & Kitchen", "15%"],
                  ["Books", "15%"],
                  ["Health & Personal Care", "8%"],
                  ["Toys & Games", "15%"],
                  ["Sports & Outdoors", "15%"],
                  ["Beauty", "8%"],
                ].map(([cat, fee], i) => (
                  <tr key={cat} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{cat}</td>
                    <td className="p-3 border border-slate-200 font-medium">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Rates shown are typical 2026 rates. Always verify on Amazon&apos;s current fee schedule as categories can have tiered rates.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">FBA Fulfillment Fees</h2>
          <p>
            If you use Fulfillment by Amazon (FBA), Amazon picks, packs, and ships for you —
            but charges per-unit fulfillment fees based on size and weight.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Size Tier</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Weight</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Fulfillment Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Small Standard", "≤ 4 oz", "$3.06"],
                  ["Large Standard", "≤ 1 lb", "$3.68"],
                  ["Large Standard", "1–2 lb", "$4.99"],
                  ["Large Standard", "2–3 lb", "$5.59"],
                  ["Large Bulky", "≤ 30 lb", "$9.61+"],
                ].map(([tier, weight, fee], i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{tier}</td>
                    <td className="p-3 border border-slate-200">{weight}</td>
                    <td className="p-3 border border-slate-200 font-medium">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">FBA also charges monthly storage fees ($0.78–$2.40/cubic ft for standard, higher Oct–Dec).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Full Cost Example: $30 Product</h2>
          <div className="bg-slate-50 rounded-xl p-5 space-y-2 text-sm">
            <div className="flex justify-between"><span>Sale price</span><span className="font-medium">$30.00</span></div>
            <div className="flex justify-between text-slate-500"><span>Referral fee (15% — Home & Kitchen)</span><span>- $4.50</span></div>
            <div className="flex justify-between text-slate-500"><span>FBA fulfillment fee (Large Standard, 1 lb)</span><span>- $3.68</span></div>
            <div className="flex justify-between text-slate-500"><span>Professional plan (amortized, 100 sales/mo)</span><span>- $0.40</span></div>
            <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold text-slate-900">
              <span>Net after Amazon fees</span><span>$21.42</span>
            </div>
            <p className="text-xs text-slate-400 pt-1">This is before your COGS, shipping to FBA warehouse, and advertising costs.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">FBA vs FBM: Which Costs Less?</h2>
          <p>
            Fulfilled by Merchant (FBM) avoids FBA fees but you handle shipping yourself.
            FBM makes sense when your product is large/heavy (FBA fees spike) or you have
            fast, cheap fulfillment. FBA is generally better for small, lightweight items
            where the Prime badge boosts conversion rates enough to offset fees.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Calculate your Amazon fees</p>
          <p className="text-sm text-emerald-800 mb-3">
            Use our fee calculators to estimate profit margins across different platforms and pricing scenarios.
          </p>
          <Link
            href="/compare"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Fee Comparison Calculator →
          </Link>
        </div>

      </div>
    </div>
  );
}
