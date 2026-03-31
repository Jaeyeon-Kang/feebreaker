import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Understanding Etsy Fees: What Sellers Actually Pay in 2026",
  description:
    "Etsy charges more than just a listing fee. A full breakdown of transaction fees, payment processing, offsite ads, and how to calculate your actual profit per sale.",
  alternates: {
    canonical: "https://www.feebreaker.com/blog/understanding-etsy-fees",
  },
};

export default function EtsyFeesPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Understanding Etsy Fees</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Understanding Etsy Fees: What Sellers Actually Pay in 2026
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>March 30, 2026</span>
        <span>쨌</span>
        <span>5 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          New Etsy sellers often focus on the $0.20 listing fee and think that&apos;s most
          of the cost. In reality, listing fees are the smallest part. By the time a sale
          goes through, Etsy takes around 8??1% of the sale price ??sometimes more.
          Here&apos;s the full breakdown.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">The Complete Etsy Fee Structure</h2>
          <div className="space-y-4">
            {[
              {
                name: "Listing Fee",
                rate: "$0.20 per listing",
                desc: "Charged when you list an item. Renews every 4 months or when the item sells. Applies even if the item never sells.",
              },
              {
                name: "Transaction Fee",
                rate: "6.5% of sale price",
                desc: "Applied to the item price plus any shipping costs you charge the buyer. This is Etsy's core marketplace fee.",
              },
              {
                name: "Payment Processing Fee",
                rate: "3% + $0.25 (US)",
                desc: "Charged when you use Etsy Payments. Rates vary by country. This is separate from the transaction fee.",
              },
              {
                name: "Offsite Ads Fee",
                rate: "12??5% of sale",
                desc: "Etsy promotes your listings on Google, Facebook, and other platforms. If a sale comes through an offsite ad, you pay 12??5% of that sale. Sellers under $10k/year can opt out; sellers over $10k/year cannot.",
              },
              {
                name: "Etsy Plus (optional)",
                rate: "$10/month",
                desc: "Includes 15 listing credits, $5 in Etsy ad credits, and access to customization features.",
              },
            ].map((fee) => (
              <div key={fee.name} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-semibold text-slate-900">{fee.name}</div>
                  <div className="text-sm font-mono text-emerald-700 whitespace-nowrap">{fee.rate}</div>
                </div>
                <p className="text-sm text-slate-500 mt-1">{fee.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Real Example: A $30 Handmade Item</h2>
          <p>Let&apos;s say you sell a handmade candle for $30 with $5 shipping (total $35):</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <tbody>
                {[
                  { label: "Sale price + shipping", value: "$35.00" },
                  { label: "Listing fee", value: "??0.20" },
                  { label: "Transaction fee (6.5% 횞 $35)", value: "??2.28" },
                  { label: "Payment processing (3% 횞 $35 + $0.25)", value: "??1.30" },
                  { label: "Total fees", value: "??3.78", highlight: true },
                  { label: "You receive", value: "$31.22", highlight: true },
                ].map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className={`p-3 border border-slate-200 ${row.highlight ? "font-semibold text-slate-900" : ""}`}>
                      {row.label}
                    </td>
                    <td className={`p-3 border border-slate-200 text-right ${row.highlight ? "font-semibold text-slate-900" : ""}`}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            That&apos;s 10.8% in total fees ??not including the cost of materials or your time.
            If an offsite ad drove the sale, add another 12??5%.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">The Offsite Ads Problem</h2>
          <p>
            Etsy&apos;s offsite ads program is the fee that catches most sellers off guard.
            If Etsy promotes your listing on Google or Instagram and a buyer clicks that ad
            and purchases within 30 days, you owe Etsy 15% of the sale (12% once you exceed
            $10k in sales).
          </p>
          <p className="mt-3">
            You have no control over which listings get promoted. The 30-day attribution
            window is wide ??a buyer could see the ad on day 1 and purchase on day 29, and
            you&apos;d still owe the fee.
          </p>
          <p className="mt-3">
            <strong>Opt-out:</strong> If your shop has earned less than $10,000 in the past
            12 months, you can opt out of offsite ads in your Shop Manager settings.
            Sellers above $10k/year are automatically enrolled and cannot opt out.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">How to Price for Etsy Profitability</h2>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Start with your cost floor:</strong> materials + your time at a reasonable hourly rate + packaging + shipping supplies.
            </li>
            <li>
              <strong>Add Etsy fees (approx. 10%):</strong> Divide your cost floor by 0.90 to find a break-even price. Selling below this means losing money on every transaction.
            </li>
            <li>
              <strong>Add your profit margin:</strong> Etsy recommends a 20??0% margin on top of costs and fees.
            </li>
            <li>
              <strong>Check competitor pricing:</strong> Make sure your price is competitive, but don&apos;t race to the bottom ??competing on price alone on Etsy rarely works.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Is Etsy Worth It?</h2>
          <p>
            For most handmade and vintage sellers, yes ??Etsy&apos;s audience reach justifies
            the fees. The platform brings buyers who are specifically looking for unique,
            handcrafted items. That traffic is hard to replicate on your own website,
            especially when starting out.
          </p>
          <p className="mt-3">
            The key is knowing your numbers. Price your items with full fees factored in,
            track your actual margins, and reinvest profit into growing your shop.
          </p>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Calculate your Etsy profit instantly</p>
          <p className="text-sm text-emerald-800 mb-3">
            Enter your item price and see exactly what Etsy takes ??including all fees.
          </p>
          <Link
            href="/etsy"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Etsy Fee Calculator ??          </Link>
        </div>

      </div>
    </div>
  );
}
