"use client";

import { useState, useMemo } from "react";
import {
  calculateFee,
  reverseCalculate,
  type FeeStructure,
} from "@/data/fees";
import Link from "next/link";
import StickyResultBar from "./StickyResultBar";

interface FeeCalculatorProps {
  feeData: FeeStructure;
  compareTo?: { name: string; href: string };
}

export default function FeeCalculator({
  feeData,
  compareTo,
}: FeeCalculatorProps) {
  const [amount, setAmount] = useState(100);
  const [isInternational, setIsInternational] = useState(false);
  const [mode, setMode] = useState<"forward" | "reverse">("forward");

  const rate = isInternational
    ? feeData.internationalRate
    : feeData.domesticRate;
  const fixed = isInternational
    ? feeData.internationalFixed
    : feeData.domesticFixed;
  const sym = feeData.currencySymbol;

  const result = useMemo(() => {
    if (amount <= 0) return null;
    if (mode === "forward") {
      return calculateFee(amount, rate, fixed);
    } else {
      const rev = reverseCalculate(amount, rate, fixed);
      return {
        ...rev,
        fee: rev.fee,
        youKeep: amount,
        effectiveRate:
          Math.round((rev.fee / rev.chargeAmount) * 10000) / 100,
      };
    }
  }, [amount, rate, fixed, mode]);

  const examples = [50, 100, 250, 500, 1000, 5000];

  const stickyLabel = mode === "forward" ? "You keep" : "Charge";
  const stickyValue =
    result && amount > 0
      ? mode === "forward"
        ? `${sym}${result.youKeep.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
        : `${sym}${(result as ReturnType<typeof reverseCalculate> & { youKeep: number; effectiveRate: number }).chargeAmount?.toLocaleString("en-US", { minimumFractionDigits: 2 }) ?? ""}`
      : "";
  const stickySubValue =
    result && amount > 0 ? `Fee: ${result.effectiveRate}%` : "";

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h2 className="font-semibold text-lg text-slate-900 mb-6">
            {mode === "forward" ? "Calculate Fee" : "Reverse Calculate"}
          </h2>

          {/* Mode toggle */}
          <div role="group" aria-label="Calculation mode" className="flex bg-slate-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setMode("forward")}
              aria-pressed={mode === "forward"}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "forward"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Amount &rarr; Fee
            </button>
            <button
              onClick={() => setMode("reverse")}
              aria-pressed={mode === "reverse"}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                mode === "reverse"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Net &rarr; Charge
            </button>
          </div>

          {/* Amount input */}
          <label htmlFor="fee-amount" className="block text-sm font-medium text-slate-700 mb-2">
            {mode === "forward" ? "Payment Amount" : "Desired Net Amount"} (
            {feeData.currency})
          </label>
          <div className="relative mb-4">
            <span aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              {sym}
            </span>
            <input
              id="fee-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-3 text-xl font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              min="0"
              step="0.01"
              aria-label={`${mode === "forward" ? "Payment amount" : "Desired net amount"} in ${feeData.currency}`}
            />
          </div>

          {/* Transaction type */}
          <p id="txn-type-label" className="block text-sm font-medium text-slate-700 mb-2">
            Transaction Type
          </p>
          <div role="group" aria-labelledby="txn-type-label" className="flex gap-3 mb-6">
            <button
              onClick={() => setIsInternational(false)}
              aria-pressed={!isInternational}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
                !isInternational
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 text-slate-500 hover:border-gray-300"
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setIsInternational(true)}
              aria-pressed={isInternational}
              className={`flex-1 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
                isInternational
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-gray-200 text-slate-500 hover:border-gray-300"
              }`}
            >
              International
            </button>
          </div>

          {/* Rate info */}
          <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500">
            <div className="flex justify-between mb-1">
              <span>Rate</span>
              <span className="font-medium text-slate-700">
                {(rate * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Fixed fee</span>
              <span className="font-medium text-slate-700">
                {sym}
                {fixed.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Formula</span>
              <span className="font-mono text-xs text-slate-600">
                {(rate * 100).toFixed(1)}% + {sym}
                {fixed.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Result Panel */}
        <div aria-live="polite" aria-atomic="true">
          {result && amount > 0 ? (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 mb-6">
              <div className="text-sm text-emerald-700 font-medium mb-1">
                {mode === "forward" ? "You keep" : "You need to charge"}
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">
                {sym}
                {mode === "forward"
                  ? result.youKeep.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })
                  : (
                      result as ReturnType<typeof reverseCalculate> & {
                        youKeep: number;
                        effectiveRate: number;
                      }
                    ).chargeAmount?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    }) ??
                    result.youKeep.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
              </div>
              <div className="text-sm text-emerald-600">
                Effective fee rate: {result.effectiveRate}%
              </div>

              {mode === "forward" && result.youKeep < 0 && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                  The fee exceeds the payment amount. You would lose money on this transaction.
                  Minimum amount for this fee structure: {sym}
                  {(fixed / (1 - rate)).toFixed(2)}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-emerald-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">
                    {mode === "forward"
                      ? "Payment received"
                      : "Charge amount"}
                  </span>
                  <span className="font-semibold text-emerald-800">
                    {sym}
                    {mode === "forward"
                      ? amount.toFixed(2)
                      : (
                          (result as any).chargeAmount ?? amount
                        ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">
                    {feeData.platform} fee
                  </span>
                  <span className="font-semibold text-red-600">
                    -{sym}
                    {result.fee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-emerald-200">
                  <span className="text-emerald-800">You keep</span>
                  <span className="text-emerald-800">
                    {sym}
                    {result.youKeep.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-8 text-center text-slate-400">
              Enter an amount to see results
            </div>
          )}

          {/* Reverse card (only in forward mode) */}
          {mode === "forward" && result && amount > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6">
              <div className="text-sm text-slate-500 mb-1">
                To receive exactly {sym}
                {amount.toFixed(2)} after fees:
              </div>
              <div className="text-lg font-bold text-slate-900">
                Charge {sym}
                {reverseCalculate(amount, rate, fixed).chargeAmount.toFixed(2)}
              </div>
            </div>
          )}

          {/* Quick examples */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Quick Examples
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {examples.map((ex) => {
                const r = calculateFee(ex, rate, fixed);
                return (
                  <button
                    key={ex}
                    onClick={() => {
                      setAmount(ex);
                      setMode("forward");
                    }}
                    className="text-left p-3 rounded-xl hover:bg-slate-50 border border-gray-100 transition-colors"
                  >
                    <div className="text-xs text-slate-400">
                      {sym}
                      {ex}
                    </div>
                    <div className="text-sm font-semibold text-emerald-600">
                      Keep {sym}
                      {r.youKeep.toFixed(2)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compare link */}
          {compareTo && (
            <div className="mt-4 text-center">
              <Link
                href={compareTo.href}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Compare with {compareTo.name} &rarr;
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky result bar */}
      <StickyResultBar
        label={stickyLabel}
        value={stickyValue}
        subValue={stickySubValue}
        visible={!!(result && amount > 0)}
      />

      {/* Bottom padding for mobile sticky bar */}
      {result && amount > 0 && <div className="h-14 lg:hidden" />}
    </>
  );
}
