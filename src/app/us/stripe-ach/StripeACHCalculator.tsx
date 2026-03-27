"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import StickyResultBar from "@/app/components/StickyResultBar";

const ACH_RATE = 0.008;
const ACH_CAP = 5.0;
const CARD_RATE = 0.029;
const CARD_FIXED = 0.3;

export default function StripeACHCalculator() {
  const [amount, setAmount] = useState(500);
  const [mode, setMode] = useState<"forward" | "reverse">("forward");

  const result = useMemo(() => {
    if (amount <= 0) return null;
    if (mode === "forward") {
      const fee = Math.min(amount * ACH_RATE, ACH_CAP);
      const youKeep = amount - fee;
      const effectiveRate = (fee / amount) * 100;
      const isCapped = amount * ACH_RATE >= ACH_CAP;
      const cardFee = amount * CARD_RATE + CARD_FIXED;
      const savings = cardFee - fee;
      return { fee, youKeep, chargeAmount: amount, effectiveRate, isCapped, cardFee, savings };
    } else {
      // Reverse: want to keep `amount` after fees
      const uncappedCharge = amount / (1 - ACH_RATE);
      const uncappedFee = uncappedCharge * ACH_RATE;
      const isCapped = uncappedFee >= ACH_CAP;
      const fee = isCapped ? ACH_CAP : uncappedFee;
      const chargeAmount = amount + fee;
      const effectiveRate = (fee / chargeAmount) * 100;
      const cardFee = chargeAmount * CARD_RATE + CARD_FIXED;
      const savings = cardFee - fee;
      return { fee, youKeep: amount, chargeAmount, effectiveRate, isCapped, cardFee, savings };
    }
  }, [amount, mode]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      {/* Mode toggle */}
      <div
        role="group"
        aria-label="Calculator mode"
        className="flex gap-2 mb-6"
      >
        <button
          onClick={() => setMode("forward")}
          aria-pressed={mode === "forward"}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "forward"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          Calculate Fees
        </button>
        <button
          onClick={() => setMode("reverse")}
          aria-pressed={mode === "reverse"}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "reverse"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          Reverse Calculate
        </button>
      </div>

      {/* Amount input */}
      <div className="mb-6">
        <label
          htmlFor="ach-amount"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          {mode === "forward" ? "Charge amount" : "Amount I want to keep"}
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
            $
          </span>
          <input
            id="ach-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Amount in US dollars"
          />
        </div>
      </div>

      {/* Cap indicator */}
      {result?.isCapped && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <span aria-hidden="true" className="text-lg">&#127881;</span>
          <span className="text-sm font-semibold text-emerald-700">
            Fee cap reached! ACH fee is always $5.00 for amounts of $625 or more.
          </span>
        </div>
      )}

      {/* Results */}
      {result && (
        <div
          aria-live="polite"
          className="bg-slate-50 border border-gray-200 rounded-xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">ACH fee</span>
            <span className="text-red-500 font-bold text-lg">
              -${fmt(result.fee)}
              {result.isCapped && (
                <span className="ml-1.5 text-xs font-normal text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                  capped
                </span>
              )}
            </span>
          </div>

          {mode === "forward" ? (
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-sm font-semibold text-slate-700">
                You keep
              </span>
              <span className="text-emerald-600 font-extrabold text-2xl">
                ${fmt(result.youKeep)}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-sm font-semibold text-slate-700">
                Charge customer
              </span>
              <span className="text-slate-900 font-extrabold text-2xl">
                ${fmt(result.chargeAmount)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-gray-100">
            <span>Effective rate: {result.effectiveRate.toFixed(3)}%</span>
            <span>
              vs card: ${fmt(result.cardFee)} &rarr;{" "}
              <span className="text-emerald-600 font-semibold">
                save ${fmt(result.savings)}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Sticky mobile bar */}
      <StickyResultBar
        label={mode === "forward" ? "You Keep" : "Charge"}
        value={
          result
            ? mode === "forward"
              ? `$${fmt(result.youKeep)}`
              : `$${fmt(result.chargeAmount)}`
            : "$0.00"
        }
        subValue={result ? `ACH fee: $${fmt(result.fee)}` : undefined}
        visible={!!result}
      />

      <p className="mt-4 text-xs text-slate-400">
        ACH Direct Debit: 0.8% capped at $5.00. Payments take 3&ndash;5 business days to settle.{" "}
        <Link href="/us/stripe" className="underline hover:text-emerald-600">
          Compare with card payments.
        </Link>
      </p>
    </div>
  );
}
