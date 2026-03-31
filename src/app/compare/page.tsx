"use client";

import { useState, useMemo } from "react";
import { calculateFee, stripeFees, paypalFees } from "@/data/fees";
import Link from "next/link";
import StickyResultBar from "@/app/components/StickyResultBar";

export default function ComparePage() {
  const [amount, setAmount] = useState(100);
  const [isInternational, setIsInternational] = useState(false);

  const stripe = stripeFees.us;
  const paypal = paypalFees.us;

  const stripeResult = useMemo(() => {
    const rate = isInternational
      ? stripe.internationalRate
      : stripe.domesticRate;
    const fixed = isInternational
      ? stripe.internationalFixed
      : stripe.domesticFixed;
    return calculateFee(amount, rate, fixed);
  }, [amount, isInternational, stripe]);

  const paypalResult = useMemo(() => {
    const rate = isInternational
      ? paypal.internationalRate
      : paypal.domesticRate;
    const fixed = isInternational
      ? paypal.internationalFixed
      : paypal.domesticFixed;
    return calculateFee(amount, rate, fixed);
  }, [amount, isInternational, paypal]);

  const cheaper =
    stripeResult.fee === paypalResult.fee
      ? "Same"
      : stripeResult.fee < paypalResult.fee
        ? "Stripe"
        : "PayPal";
  const savings = Math.abs(stripeResult.fee - paypalResult.fee);

  const presets = [25, 50, 100, 250, 500, 1000, 2500, 5000];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Stripe vs PayPal Fee Comparison",
            url: "https://www.feebreaker.com/compare",
            description:
              "Compare Stripe and PayPal fees side by side for US payments.",
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
        <span className="text-slate-900" aria-current="page">Stripe vs PayPal</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        Stripe vs PayPal Fee Comparison
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mb-8">
        Compare Stripe and PayPal fees side by side. See which platform saves
        you more on every sale.
      </p>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 max-w-xl">
        <label htmlFor="compare-amount" className="block text-sm font-medium text-slate-700 mb-2">
          Payment Amount (USD)
        </label>
        <div className="relative mb-4">
          <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            $
          </span>
          <input
            id="compare-amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-10 pr-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            min="0"
            step="0.01"
            aria-label="Payment amount in USD"
          />
        </div>
        <div role="group" aria-label="Transaction type" className="flex gap-3">
          <button
            onClick={() => setIsInternational(false)}
            aria-pressed={!isInternational}
            className={`flex-1 py-2 text-sm font-medium rounded-xl border-2 transition-all ${
              !isInternational
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-200 text-slate-500"
            }`}
          >
            Domestic
          </button>
          <button
            onClick={() => setIsInternational(true)}
            aria-pressed={isInternational}
            className={`flex-1 py-2 text-sm font-medium rounded-xl border-2 transition-all ${
              isInternational
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-200 text-slate-500"
            }`}
          >
            International
          </button>
        </div>
      </div>

      {/* Comparison cards + verdict */}
      {amount > 0 && (
        <div aria-live="polite" aria-atomic="true">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Stripe */}
            <div
              className={`rounded-2xl p-6 border-2 ${
                cheaper === "Stripe"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {cheaper === "Stripe" && (
                <span className="inline-block text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full mb-3">
                  CHEAPER
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span aria-hidden="true" className="text-xl">{"\uD83D\uDCB3"}</span>
                <h2 className="text-xl font-bold text-slate-900">Stripe</h2>
              </div>
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">
                ${stripeResult.youKeep.toFixed(2)}
              </div>
              <div className="text-sm text-slate-500 mb-4">you keep</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fee</span>
                  <span className="text-red-500 font-medium">
                    -${stripeResult.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective rate</span>
                  <span className="font-medium">
                    {stripeResult.effectiveRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate</span>
                  <span className="font-mono text-xs">
                    {(
                      (isInternational
                        ? stripe.internationalRate
                        : stripe.domesticRate) * 100
                    ).toFixed(2)}
                    % + $
                    {(isInternational
                      ? stripe.internationalFixed
                      : stripe.domesticFixed
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div
              className={`rounded-2xl p-6 border-2 ${
                cheaper === "PayPal"
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {cheaper === "PayPal" && (
                <span className="inline-block text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full mb-3">
                  CHEAPER
                </span>
              )}
              <div className="flex items-center gap-2 mb-4">
                <span aria-hidden="true" className="text-xl">{"\uD83C\uDD7F\uFE0F"}</span>
                <h2 className="text-xl font-bold text-slate-900">PayPal</h2>
              </div>
              <div className="text-3xl font-extrabold text-emerald-600 mb-1">
                ${paypalResult.youKeep.toFixed(2)}
              </div>
              <div className="text-sm text-slate-500 mb-4">you keep</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fee</span>
                  <span className="text-red-500 font-medium">
                    -${paypalResult.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Effective rate</span>
                  <span className="font-medium">
                    {paypalResult.effectiveRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate</span>
                  <span className="font-mono text-xs">
                    {(
                      (isInternational
                        ? paypal.internationalRate
                        : paypal.domesticRate) * 100
                    ).toFixed(2)}
                    % + $
                    {(isInternational
                      ? paypal.internationalFixed
                      : paypal.domesticFixed
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-center max-w-xl mx-auto">
            {cheaper === "Same" ? (
              <p className="text-lg font-semibold text-slate-900">
                Both charge the same fee on this ${amount.toFixed(2)} transaction
              </p>
            ) : (
              <>
                <p className="text-lg font-semibold text-slate-900">
                  {cheaper} saves you{" "}
                  <span className="text-emerald-600">
                    ${savings.toFixed(2)}
                  </span>{" "}
                  on this ${amount.toFixed(2)} transaction
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  That&apos;s ${(savings * 12).toFixed(2)}/year if you process one
                  per month, or ${(savings * 100).toFixed(2)} over 100
                  transactions.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Comparison table */}
      <section className="mt-8 max-w-4xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Comparison at Different Amounts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Amount
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-purple-700">
                  Stripe Fee
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-purple-700">
                  Stripe Keep
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-indigo-700">
                  PayPal Fee
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-indigo-700">
                  PayPal Keep
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-emerald-700">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {presets.map((amt) => {
                const sRate = isInternational
                  ? stripe.internationalRate
                  : stripe.domesticRate;
                const sFixed = isInternational
                  ? stripe.internationalFixed
                  : stripe.domesticFixed;
                const pRate = isInternational
                  ? paypal.internationalRate
                  : paypal.domesticRate;
                const pFixed = isInternational
                  ? paypal.internationalFixed
                  : paypal.domesticFixed;
                const s = calculateFee(amt, sRate, sFixed);
                const p = calculateFee(amt, pRate, pFixed);
                const w =
                  s.fee === p.fee ? "Same" : s.fee < p.fee ? "Stripe" : "PayPal";
                return (
                  <tr key={amt}>
                    <td className="p-3 font-medium">
                      ${amt.toLocaleString()}
                    </td>
                    <td className="p-3 text-red-500">
                      -${s.fee.toFixed(2)}
                    </td>
                    <td className="p-3">${s.youKeep.toFixed(2)}</td>
                    <td className="p-3 text-red-500">
                      -${p.fee.toFixed(2)}
                    </td>
                    <td className="p-3">${p.youKeep.toFixed(2)}</td>
                    <td className="p-3 font-semibold text-emerald-600">
                      {w}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Which is better for small transactions?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Stripe is typically cheaper for small transactions due to its
              lower fixed fee ($0.30 vs $0.49). The difference is most
              noticeable on payments under $50.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Can I use both?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes! Many businesses offer both Stripe and PayPal as payment
              options. This gives customers flexibility while potentially
              improving conversion rates.
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
            href="/margin"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Profit Margin Calculator
          </Link>
        </div>
      </section>

      {/* Sticky result bar for mobile */}
      <StickyResultBar
        label={cheaper}
        value={`Save $${savings.toFixed(2)}`}
        subValue={`per $${amount.toFixed(0)} txn`}
        visible={amount > 0}
      />
      {amount > 0 && <div className="h-14 lg:hidden" />}
    </div>
  );
}
