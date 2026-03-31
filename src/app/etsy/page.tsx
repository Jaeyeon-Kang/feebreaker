"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const processingRates: Record<
  string,
  { rate: number; fixed: number; sym: string; currency: string; label: string }
> = {
  us: { rate: 0.03, fixed: 0.25, sym: "$", currency: "USD", label: "?눣?눡 US" },
  uk: { rate: 0.04, fixed: 0.20, sym: "짙", currency: "GBP", label: "?눐?눉 UK" },
  ca: { rate: 0.03, fixed: 0.25, sym: "C$", currency: "CAD", label: "?눊?눇 CA" },
  au: { rate: 0.03, fixed: 0.25, sym: "A$", currency: "AUD", label: "?눇?눣 AU" },
};

const samplePrices = [10, 25, 50, 100, 150, 200];

export default function EtsyPage() {
  const [itemPrice, setItemPrice] = useState(50);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [includeListing, setIncludeListing] = useState(true);
  const [country, setCountry] = useState("us");

  const pc = processingRates[country];
  const sym = pc.sym;

  const calc = useMemo(() => {
    const base = itemPrice + shippingPrice;
    const transactionFee = base * 0.065;
    const processingFee = base * pc.rate + pc.fixed;
    const listingFee = includeListing ? 0.20 : 0;
    const totalFee = transactionFee + processingFee + listingFee;
    const youKeep = itemPrice - totalFee;
    const effectiveRate = itemPrice > 0 ? (totalFee / itemPrice) * 100 : 0;
    return { transactionFee, processingFee, listingFee, totalFee, youKeep, effectiveRate };
  }, [itemPrice, shippingPrice, includeListing, pc]);

  const sampleCalc = (price: number) => {
    const base = price;
    const txFee = base * 0.065;
    const procFee = base * pc.rate + pc.fixed;
    const lstFee = 0.20;
    const total = txFee + procFee + lstFee;
    return { fee: total, keep: price - total };
  };

  const fmt = (n: number) => `${sym}${Math.max(0, n).toFixed(2)}`;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Etsy Fee Calculator",
            url: "https://www.feebreaker.com/etsy",
            description:
              "Calculate Etsy transaction fees, payment processing fees, and listing fees. See exactly what you keep from each sale.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Etsy Fee Calculator</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
            Etsy
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          Etsy Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Calculate Etsy transaction fees, Etsy Payments processing fees, and
          listing fees. See exactly what you keep from every sale.
        </p>
      </div>

      {/* Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Your Sale</h2>

          {/* Country selector */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your country
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(processingRates).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setCountry(key)}
                  aria-pressed={country === key}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    country === key
                      ? "bg-orange-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-700"
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>

          {/* Item price */}
          <div className="mb-5">
            <label
              htmlFor="item-price"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Item price ({pc.currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                {sym}
              </span>
              <input
                id="item-price"
                type="number"
                min="0"
                step="0.01"
                value={itemPrice}
                onChange={(e) => setItemPrice(parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
              />
            </div>
          </div>

          {/* Shipping price */}
          <div className="mb-5">
            <label
              htmlFor="shipping-price"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Shipping charged to buyer ({pc.currency})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                {sym}
              </span>
              <input
                id="shipping-price"
                type="number"
                min="0"
                step="0.01"
                value={shippingPrice}
                onChange={(e) =>
                  setShippingPrice(parseFloat(e.target.value) || 0)
                }
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Etsy&apos;s 6.5% transaction fee applies to shipping too.
            </p>
          </div>

          {/* Listing fee toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Include listing fee ({sym}0.20)
              </p>
              <p className="text-xs text-slate-400">
                Charged per item listed or renewed
              </p>
            </div>
            <button
              role="switch"
              aria-checked={includeListing}
              onClick={() => setIncludeListing(!includeListing)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                includeListing ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  includeListing ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Fee Breakdown</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <span className="text-sm font-medium text-slate-700">
                  Transaction fee
                </span>
                <span className="text-xs text-slate-400 ml-2">6.5% of sale + shipping</span>
              </div>
              <span className="text-sm font-semibold text-red-500">
                -{fmt(calc.transactionFee)}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <span className="text-sm font-medium text-slate-700">
                  Payment processing
                </span>
                <span className="text-xs text-slate-400 ml-2">
                  {(pc.rate * 100).toFixed(0)}% + {sym}{pc.fixed.toFixed(2)}
                </span>
              </div>
              <span className="text-sm font-semibold text-red-500">
                -{fmt(calc.processingFee)}
              </span>
            </div>

            {includeListing && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <span className="text-sm font-medium text-slate-700">
                    Listing fee
                  </span>
                  <span className="text-xs text-slate-400 ml-2">per item</span>
                </div>
                <span className="text-sm font-semibold text-red-500">
                  -{fmt(calc.listingFee)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm font-bold text-slate-800">Total fees</span>
              <span className="text-sm font-bold text-red-500">
                -{fmt(calc.totalFee)}
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-500 mb-1">You keep</p>
            <p className="text-4xl font-extrabold text-emerald-600">
              {calc.youKeep >= 0 ? fmt(calc.youKeep) : `??{sym}${Math.abs(calc.youKeep).toFixed(2)}`}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              from {fmt(itemPrice)} item price &middot; Effective fee rate:{" "}
              {calc.effectiveRate.toFixed(1)}%
            </p>
          </div>

          <p className="text-xs text-slate-400 mt-4">
            Shipping ({fmt(shippingPrice)}) is passed through to your carrier.
            This calculator shows what you keep from the item price after all Etsy fees.
          </p>
        </div>
      </div>

      {/* Sample calculations table */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Sample Calculations
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Based on {pc.label} payment processing, with listing fee included, no shipping.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Item Price
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Transaction Fee (6.5%)
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Total Fees
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-emerald-700">
                  You Keep
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {samplePrices.map((price) => {
                const { fee, keep } = sampleCalc(price);
                const txFee = price * 0.065;
                return (
                  <tr key={price}>
                    <td className="p-3 font-medium">{sym}{price.toFixed(2)}</td>
                    <td className="p-3 text-slate-500">{sym}{txFee.toFixed(2)}</td>
                    <td className="p-3 text-red-500">-{sym}{fee.toFixed(2)}</td>
                    <td className="p-3 font-semibold text-emerald-600">
                      {sym}{Math.max(0, keep).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How Etsy Fees Work
        </h2>
        <div className="text-sm text-slate-600 space-y-3">
          <p>
            Etsy charges sellers three main types of fees on each sale:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>
              <strong>Transaction fee (6.5%)</strong> ??charged on the total
              sale price including any shipping cost you charge the buyer.
            </li>
            <li>
              <strong>Payment processing fee</strong> ??charged by Etsy Payments
              for processing the card. Rates vary by country: US is 3% + $0.25,
              UK is 4% + 짙0.20, CA and AU are 3% + $0.25.
            </li>
            <li>
              <strong>Listing fee ($0.20)</strong> ??charged each time you list
              or renew an item (every 4 months or when sold).
            </li>
          </ul>
          <p>
            Etsy does not have a separate &quot;marketplace fee&quot; ??the 6.5%
            transaction fee covers Etsy&apos;s marketplace services. For a typical
            US seller, the effective total fee rate works out to around 9.5??2%
            depending on item price.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What percentage does Etsy take?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Etsy takes a 6.5% transaction fee on every sale (including
              shipping). On top of that, Etsy Payments charges a payment
              processing fee (3% + $0.25 in the US). Combined, Etsy typically
              takes 9.5??0.5% of your item price plus fixed fees. For a $50 US
              sale, Etsy takes about $5.50 total.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does Etsy charge listing fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes. Etsy charges $0.20 per listing. Listings stay active for
              4 months. When an item sells, the listing automatically renews at
              $0.20. For multi-quantity listings, you pay $0.20 for each
              additional quantity sold.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              How do I calculate my Etsy fees accurately?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Add up: (1) 6.5% of item price + shipping, (2) your
              country&apos;s payment processing fee, (3) $0.20 listing fee.
              This calculator does all of that automatically. Note that
              Etsy&apos;s Offsite Ads fee (12-15%) applies separately if Etsy
              promotes your listings externally.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What is the Etsy Offsite Ads fee?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Etsy&apos;s Offsite Ads program charges an additional 15% (or 12%
              for sellers over $10K/year) when a buyer clicks an Etsy ad on
              Google, Facebook, or other platforms and then makes a purchase
              within 30 days. This is not included in the calculator above, as
              it only applies to advertised sales.
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
            href="/us/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe Fee Calculator
          </Link>
          <Link
            href="/us/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            PayPal Fee Calculator
          </Link>
          <Link
            href="/margin"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Profit Margin Calculator
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
        Fee data sourced from Etsy&apos;s official seller fees page. Last updated:
        2026-03-26. Rates shown are standard; Etsy Offsite Ads fees are not
        included. Always verify with Etsy&apos;s current pricing.
      </div>
    </div>
  );
}
