import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fiverr vs Upwork Fees: What Freelancers Actually Pay in 2026",
  description:
    "Fiverr takes 20% flat. Upwork uses a sliding scale down to 10%. Here's a real comparison of freelancer fees on both platforms — and which one keeps more of your earnings.",
  alternates: {
    canonical: "https://www.feebreaker.com/blog/fiverr-vs-upwork-fees",
  },
};

export default function FiverrVsUpworkPost() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Fiverr vs Upwork Fees</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Fiverr vs Upwork Fees: What Freelancers Actually Pay in 2026
      </h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>April 3, 2026</span>
        <span>·</span>
        <span>5 min read</span>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600 text-[15px] leading-relaxed">

        <p>
          Both Fiverr and Upwork take a cut of every payment — but the structure is
          very different. Fiverr charges a flat 20% on every gig. Upwork uses a sliding
          scale based on your lifetime billings with each client.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Fiverr Fees</h2>
          <p>
            Fiverr charges a flat <strong>20% service fee</strong> on all earnings,
            regardless of order size or how long you&apos;ve worked with a client.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Gig Price</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Fiverr Fee (20%)</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">You Receive</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["$50", "$10.00", "$40.00"],
                  ["$200", "$40.00", "$160.00"],
                  ["$500", "$100.00", "$400.00"],
                  ["$1,000", "$200.00", "$800.00"],
                ].map(([price, fee, net], i) => (
                  <tr key={price} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200 font-medium">{price}</td>
                    <td className="p-3 border border-slate-200 text-red-600">{fee}</td>
                    <td className="p-3 border border-slate-200 font-semibold text-slate-900">{net}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">Buyers also pay a service fee on top of the gig price (varies by order amount).</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Upwork Fees</h2>
          <p>
            Upwork uses a <strong>sliding scale per client</strong>. The more you bill
            a single client over time, the lower your fee rate with that specific client.
          </p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Lifetime Billings (per client)</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-slate-700">Service Fee</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["$0 – $500", "20%"],
                  ["$500.01 – $10,000", "10%"],
                  ["$10,000+", "5%"],
                ].map(([tier, fee], i) => (
                  <tr key={tier} className={i % 2 === 0 ? "" : "bg-slate-50"}>
                    <td className="p-3 border border-slate-200">{tier}</td>
                    <td className="p-3 border border-slate-200 font-medium">{fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">The threshold resets per client — high billing with one client doesn&apos;t reduce fees with a new client.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Long-Term Client Comparison</h2>
          <p>
            Over a $5,000 project with a single client:
          </p>
          <div className="bg-slate-50 rounded-xl p-5 space-y-3 text-sm mt-3">
            <div>
              <p className="font-semibold text-slate-900">Fiverr (flat 20%)</p>
              <p className="text-slate-500">$5,000 × 20% = $1,000 in fees → you keep <strong>$4,000</strong></p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Upwork (sliding scale)</p>
              <p className="text-slate-500">First $500 @ 20% = $100 + Remaining $4,500 @ 10% = $450 → total fees $550 → you keep <strong>$4,450</strong></p>
            </div>
          </div>
          <p className="mt-3">
            The savings compound quickly with larger or ongoing engagements.
            A $10,000 long-term client on Upwork drops to 5% for all billings above $10k.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Which Platform Is Better?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Fiverr is better for:</strong> One-off projects, creative gigs, building a portfolio, clients who come to you via search.</li>
            <li><strong>Upwork is better for:</strong> Ongoing relationships, hourly contracts, higher-value professional services — the fee drops over time.</li>
            <li><strong>For maximum income:</strong> Use Upwork for repeat clients (the fee drops to 5–10%) and Fiverr for discoverability and smaller one-time orders.</li>
          </ul>
        </section>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mt-8">
          <p className="font-semibold text-emerald-900 mb-2">Calculate your net after platform fees</p>
          <p className="text-sm text-emerald-800 mb-3">
            Use our invoice fee calculator to factor in platform cuts when setting your rates.
          </p>
          <Link
            href="/invoice"
            className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Invoice Fee Calculator →
          </Link>
        </div>

      </div>
    </div>
  );
}
