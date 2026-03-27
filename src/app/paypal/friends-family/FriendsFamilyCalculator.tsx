"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import StickyResultBar from "@/app/components/StickyResultBar";

// Fee constants
const DOMESTIC_CARD_RATE = 0.029;
const DOMESTIC_CARD_FIXED = 0.3;
const INTL_RATE = 0.05;
const INTL_MIN = 0.99;
const INTL_MAX = 4.99;
const CONVERSION_FEE = 0.03;

export default function FriendsFamilyCalculator() {
  const [amount, setAmount] = useState(100);
  const [mode, setMode] = useState<"receive" | "send">("receive");
  const [isInternational, setIsInternational] = useState(false);
  const [fundedByCard, setFundedByCard] = useState(false);

  const result = useMemo(() => {
    if (amount <= 0) return null;
    if (mode === "receive") {
      if (!isInternational) {
        return {
          fee: 0,
          youGet: amount,
          senderPays: amount,
          isFree: true,
          note: "Free! Receiver gets full amount.",
        };
      } else {
        const convFee = amount * CONVERSION_FEE;
        return {
          fee: convFee,
          youGet: amount - convFee,
          senderPays: amount,
          isFree: false,
          note: "Currency conversion fee applies (\u22483%).",
        };
      }
    } else {
      if (!isInternational) {
        if (!fundedByCard) {
          return {
            fee: 0,
            youGet: amount,
            senderPays: amount,
            isFree: true,
            note: "Free when funded by bank or PayPal balance.",
          };
        } else {
          const fee = amount * DOMESTIC_CARD_RATE + DOMESTIC_CARD_FIXED;
          return {
            fee,
            youGet: amount,
            senderPays: amount + fee,
            isFree: false,
            note: "Card processing fee added on top.",
          };
        }
      } else {
        const intlFee = Math.min(
          Math.max(amount * INTL_RATE, INTL_MIN),
          INTL_MAX
        );
        return {
          fee: intlFee,
          youGet: amount,
          senderPays: amount + intlFee,
          isFree: false,
          note: "International transfer fee (5%, max $4.99).",
        };
      }
    }
  }, [amount, mode, isInternational, fundedByCard]);

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
          onClick={() => setMode("receive")}
          aria-pressed={mode === "receive"}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "receive"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          I&apos;m Receiving
        </button>
        <button
          onClick={() => setMode("send")}
          aria-pressed={mode === "send"}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "send"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
          }`}
        >
          I&apos;m Sending
        </button>
      </div>

      {/* Amount input */}
      <div className="mb-5">
        <label
          htmlFor="ff-amount"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          {mode === "receive" ? "Amount being sent to me" : "Amount I want to send"}
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
            $
          </span>
          <input
            id="ff-amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Payment amount in US dollars"
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={() => setIsInternational(!isInternational)}
          aria-pressed={isInternational}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
            isInternational
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-slate-600 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          International Transfer
        </button>

        {mode === "send" && !isInternational && (
          <button
            onClick={() => setFundedByCard(!fundedByCard)}
            aria-pressed={fundedByCard}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
              fundedByCard
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-slate-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
            }`}
          >
            Funded by Debit/Credit Card
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div
          aria-live="polite"
          className={`rounded-xl p-5 ${
            result.isFree
              ? "bg-emerald-50 border border-emerald-200"
              : "bg-slate-50 border border-gray-200"
          }`}
        >
          {result.isFree ? (
            <div className="text-center py-2">
              <div className="text-4xl font-extrabold text-emerald-600 mb-1">
                FREE
              </div>
              <div className="text-emerald-700 font-semibold text-sm">
                {result.note}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Fee</span>
                <span className="text-red-500 font-bold text-lg">
                  -${fmt(result.fee)}
                </span>
              </div>
              {mode === "receive" && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">You receive</span>
                  <span className="text-emerald-600 font-extrabold text-2xl">
                    ${fmt(result.youGet)}
                  </span>
                </div>
              )}
              {mode === "send" && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Recipient gets</span>
                    <span className="text-emerald-600 font-bold text-lg">
                      ${fmt(result.youGet)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                    <span className="text-sm font-semibold text-slate-700">
                      You pay total
                    </span>
                    <span className="text-slate-900 font-extrabold text-2xl">
                      ${fmt(result.senderPays)}
                    </span>
                  </div>
                </>
              )}
              <p className="text-xs text-slate-400 pt-1">{result.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Sticky mobile bar */}
      <StickyResultBar
        label={result?.isFree ? "F&F Fee" : "Fee"}
        value={result?.isFree ? "FREE" : result ? `-$${fmt(result.fee)}` : "$0.00"}
        subValue={
          result && !result.isFree
            ? mode === "receive"
              ? `You get $${fmt(result.youGet)}`
              : `Total $${fmt(result.senderPays)}`
            : undefined
        }
        visible={!!result}
      />

      {/* Info note */}
      <p className="mt-4 text-xs text-slate-400">
        F&amp;F is for personal payments only. Using it for business transactions violates PayPal&apos;s Terms of Service.{" "}
        <Link href="/us/paypal" className="underline hover:text-emerald-600">
          Use Goods &amp; Services for business.
        </Link>
      </p>
    </div>
  );
}
