"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StickyResultBar from "@/app/components/StickyResultBar";

export default function MarginPage() {
  const [mode, setMode] = useState<"margin" | "markup">("margin");
  const [cost, setCost] = useState(60);
  const [revenue, setRevenue] = useState(100);
  const [marginPercent, setMarginPercent] = useState(40);

  const result = useMemo(() => {
    const safeCost = Math.max(0, cost);
    if (mode === "margin") {
      const safeRevenue = Math.max(0, revenue);
      const profit = safeRevenue - safeCost;
      const margin = safeRevenue > 0 ? (profit / safeRevenue) * 100 : 0;
      const markup = safeCost > 0 ? (profit / safeCost) * 100 : 0;
      return { profit, margin, markup, cost: safeCost, revenue: safeRevenue };
    } else {
      const safeMargin = Math.min(Math.max(0, marginPercent), 99.99);
      const calcRevenue = safeCost / (1 - safeMargin / 100);
      const profit = calcRevenue - safeCost;
      const markup = safeCost > 0 ? (profit / safeCost) * 100 : 0;
      return {
        profit,
        margin: safeMargin,
        markup,
        cost: safeCost,
        revenue: calcRevenue,
      };
    }
  }, [mode, cost, revenue, marginPercent]);

  const presets = [
    { label: "20% margin", cost: 80, revenue: 100 },
    { label: "30% margin", cost: 70, revenue: 100 },
    { label: "50% margin", cost: 50, revenue: 100 },
    { label: "2x markup", cost: 50, revenue: 100 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Profit Margin Calculator",
            url: "https://www.feebreaker.com/margin",
            description:
              "Calculate profit margin, markup percentage, and gross profit.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Profit Margin Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        Profit Margin Calculator
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mb-8">
        Calculate profit margin, markup percentage, and gross profit for any
        product or service.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <div role="group" aria-label="Calculation mode" className="flex bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("margin")}
              aria-pressed={mode === "margin"}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "margin"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Cost &amp; Revenue
            </button>
            <button
              onClick={() => setMode("markup")}
              aria-pressed={mode === "markup"}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "markup"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              Cost &amp; Target Margin
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="margin-cost" className="block text-sm font-medium text-slate-700 mb-2">
                Cost ($)
              </label>
              <input
                id="margin-cost"
                type="number"
                value={cost}
                onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="0"
                step="0.01"
              />
            </div>

            {mode === "margin" ? (
              <div>
                <label htmlFor="margin-revenue" className="block text-sm font-medium text-slate-700 mb-2">
                  Revenue / Selling Price ($)
                </label>
                <input
                  id="margin-revenue"
                  type="number"
                  value={revenue}
                  onChange={(e) =>
                    setRevenue(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  step="0.01"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="margin-target" className="block text-sm font-medium text-slate-700 mb-2">
                  Target Margin (%)
                </label>
                <input
                  id="margin-target"
                  type="number"
                  value={marginPercent}
                  onChange={(e) =>
                    setMarginPercent(parseFloat(e.target.value) || 0)
                  }
                  className="w-full px-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  min="0"
                  max="99.99"
                  step="0.1"
                />
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setCost(p.cost);
                  setRevenue(p.revenue);
                  setMode("margin");
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-emerald-50 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div aria-live="polite" aria-atomic="true">
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 mb-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm text-emerald-600 mb-1">
                  Profit Margin
                </div>
                <div className="text-4xl font-extrabold text-emerald-700">
                  {result.margin.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-emerald-600 mb-1">Markup</div>
                <div className="text-4xl font-extrabold text-emerald-700">
                  {result.markup.toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700">Revenue</span>
                <span className="font-semibold">
                  ${result.revenue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-emerald-700">Cost</span>
                <span className="font-semibold">
                  -${result.cost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-emerald-200">
                <span className="text-emerald-800">Gross Profit</span>
                <span className="text-emerald-800">
                  ${result.profit.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Margin vs Markup
            </h3>
            <p className="text-xs text-slate-500 mb-3">
              <strong>Margin</strong> = Profit / Revenue.{" "}
              <strong>Markup</strong> = Profit / Cost. A 50% margin means you
              keep half of the selling price. A 100% markup means you sell at
              double the cost &mdash; which is the same as a 50% margin.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-400">
                    <th scope="col" className="text-left py-1">Margin</th>
                    <th scope="col" className="text-left py-1">= Markup</th>
                    <th scope="col" className="text-left py-1">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {[
                    [20, 25, 1.25],
                    [25, 33.3, 1.33],
                    [30, 42.9, 1.43],
                    [40, 66.7, 1.67],
                    [50, 100, 2.0],
                  ].map(([m, mu, x]) => (
                    <tr key={m} className="border-t border-gray-50">
                      <td className="py-1">{m}%</td>
                      <td className="py-1">{mu}%</td>
                      <td className="py-1">{x}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What is a good profit margin?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              It varies by industry. Retail typically sees 2-5%, software/SaaS
              60-80%, and consulting/freelancing 30-50%. The key is
              understanding your specific market.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does this include payment processing fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No, this calculator shows gross margin. For net margin including
              payment fees, use our fee calculators to find the actual amount
              you receive, then use that as your revenue.
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
            Stripe Fee Calculator
          </Link>
          <Link
            href="/us/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            PayPal Fee Calculator
          </Link>
          <Link
            href="/hourly"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Hourly Rate Calculator
          </Link>
          <Link
            href="/invoice"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Invoice Generator
          </Link>
        </div>
      </section>

      {/* Sticky result bar for mobile */}
      <StickyResultBar
        label="Margin"
        value={`${result.margin.toFixed(1)}%`}
        subValue={`Profit $${result.profit.toFixed(2)}`}
        visible={true}
      />
      <div className="h-14 lg:hidden" />
    </div>
  );
}
