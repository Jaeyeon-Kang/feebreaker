"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateFee, stripeFees, paypalFees } from "@/data/fees";

const tools = [
  {
    title: "Stripe Fee Calculator",
    description:
      "See how much Stripe takes from every payment — domestic and international.",
    href: "/us/stripe",
    icon: "\uD83D\uDCB3",
    tag: "US",
    priority: "A" as const,
  },
  {
    title: "PayPal Fee Calculator",
    description:
      "Calculate PayPal Checkout fees and find out what actually lands in your account.",
    href: "/us/paypal",
    icon: "\uD83C\uDD7F\uFE0F",
    tag: "US",
    priority: "A" as const,
  },
  {
    title: "Stripe vs PayPal",
    description:
      "Side-by-side fee comparison. Find out which platform costs you less.",
    href: "/compare",
    icon: "\u2696\uFE0F",
    priority: "A" as const,
  },
  {
    title: "Invoice Generator",
    description:
      "Create and download professional invoices as PDF — free, no sign-up.",
    href: "/invoice",
    icon: "\uD83D\uDCC4",
    priority: "A" as const,
  },
  {
    title: "Profit Margin Calculator",
    description:
      "Instantly calculate profit margin, markup, and break-even for any product or service.",
    href: "/margin",
    icon: "\uD83D\uDCCA",
    priority: "B" as const,
  },
  {
    title: "Hourly Rate Calculator",
    description:
      "Figure out the right hourly rate based on your income goals, expenses, and billable hours.",
    href: "/hourly",
    icon: "\u23F1\uFE0F",
    priority: "B" as const,
  },
];

type Country = "us" | "uk";

const countryConfig: Record<
  Country,
  {
    label: string;
    flag: string;
    currency: string;
    sym: string;
    examples: { label: string; amount: string; fee: string; keep: string }[];
  }
> = {
  us: {
    label: "US",
    flag: "\uD83C\uDDFA\uD83C\uDDF8",
    currency: "USD",
    sym: "$",
    examples: [
      {
        label: "Stripe US",
        amount: "$100",
        fee: `$${calculateFee(100, stripeFees.us.domesticRate, stripeFees.us.domesticFixed).fee.toFixed(2)}`,
        keep: `$${calculateFee(100, stripeFees.us.domesticRate, stripeFees.us.domesticFixed).youKeep.toFixed(2)}`,
      },
      {
        label: "PayPal US",
        amount: "$100",
        fee: `$${calculateFee(100, paypalFees.us.domesticRate, paypalFees.us.domesticFixed).fee.toFixed(2)}`,
        keep: `$${calculateFee(100, paypalFees.us.domesticRate, paypalFees.us.domesticFixed).youKeep.toFixed(2)}`,
      },
      {
        label: "Stripe Int'l",
        amount: "$100",
        fee: `$${calculateFee(100, stripeFees.us.internationalRate, stripeFees.us.internationalFixed).fee.toFixed(2)}`,
        keep: `$${calculateFee(100, stripeFees.us.internationalRate, stripeFees.us.internationalFixed).youKeep.toFixed(2)}`,
      },
    ],
  },
  uk: {
    label: "UK",
    flag: "\uD83C\uDDEC\uD83C\uDDE7",
    currency: "GBP",
    sym: "\u00A3",
    examples: [
      {
        label: "Stripe UK",
        amount: "\u00A3100",
        fee: `\u00A3${calculateFee(100, stripeFees.uk.domesticRate, stripeFees.uk.domesticFixed).fee.toFixed(2)}`,
        keep: `\u00A3${calculateFee(100, stripeFees.uk.domesticRate, stripeFees.uk.domesticFixed).youKeep.toFixed(2)}`,
      },
      {
        label: "PayPal UK",
        amount: "\u00A3100",
        fee: `\u00A3${calculateFee(100, paypalFees.uk.domesticRate, paypalFees.uk.domesticFixed).fee.toFixed(2)}`,
        keep: `\u00A3${calculateFee(100, paypalFees.uk.domesticRate, paypalFees.uk.domesticFixed).youKeep.toFixed(2)}`,
      },
      {
        label: "Stripe Int'l",
        amount: "\u00A3100",
        fee: `\u00A3${calculateFee(100, stripeFees.uk.internationalRate, stripeFees.uk.internationalFixed).fee.toFixed(2)}`,
        keep: `\u00A3${calculateFee(100, stripeFees.uk.internationalRate, stripeFees.uk.internationalFixed).youKeep.toFixed(2)}`,
      },
    ],
  },
};

export default function HomePage() {
  const [country, setCountry] = useState<Country>("us");
  const config = countryConfig[country];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Know exactly what you{" "}
            <span className="text-emerald-600">keep</span> after fees.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
            Free calculators and business tools for freelancers and online
            sellers. Stripe, PayPal, invoices, and margins &mdash; all in one
            place.
          </p>

          {/* Country tabs */}
          <div role="group" aria-label="Select country" className="flex justify-center items-center gap-2 mb-8">
            {(Object.keys(countryConfig) as Country[]).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                aria-pressed={country === c}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  country === c
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                <span aria-hidden="true">{countryConfig[c].flag}</span>
                <span>{countryConfig[c].label}</span>
              </button>
            ))}
            <span className="text-xs text-slate-400 ml-2 hidden sm:inline">
              More countries coming soon
            </span>
          </div>

          {/* Quick example cards */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {config.examples.map((ex) => (
              <div
                key={ex.label}
                className="bg-white border border-gray-200 rounded-xl px-5 py-4 text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xs font-medium text-slate-400 mb-1">
                  {ex.label}
                </div>
                <div className="text-sm text-slate-500">
                  Send{" "}
                  <span className="font-semibold text-slate-700">
                    {ex.amount}
                  </span>
                  {" \u2192 Fee "}
                  {ex.fee}
                </div>
                <div className="text-xl font-bold text-emerald-600 mt-1">
                  You keep {ex.keep}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/us/stripe"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl text-lg transition-colors shadow-md"
          >
            Calculate Your Fees &rarr;
          </Link>
          <p className="text-xs text-slate-400 mt-3">
            No sign-up required &middot; 100% free &middot; Works in your browser
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Free Tools</h2>
        <p className="text-slate-500 mb-8">
          Everything you need to understand your money as a freelancer or
          seller.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start justify-between mb-3">
                <span aria-hidden="true" className="text-2xl">{tool.icon}</span>
                <div className="flex gap-1.5">
                  {tool.tag && (
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      {tool.tag}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      tool.priority === "A"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {tool.priority === "A" ? "Popular" : "Useful"}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-600 transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-slate-500">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why section */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Why FeeBreaker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Always Accurate</h3>
              <p className="text-sm text-slate-500">
                Fee rates pulled directly from official Stripe and PayPal
                pricing pages. Updated regularly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-sm text-slate-500">
                All calculations run in your browser. No account needed, no
                waiting, no data stored.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Country-Specific</h3>
              <p className="text-sm text-slate-500">
                Fees differ by country. We show you the exact rate for your
                region &mdash; not a generic estimate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              How accurate are these calculators?
            </h3>
            <p className="text-sm text-slate-500">
              All fee rates are sourced from official Stripe and PayPal pricing
              pages. That said, your actual fees may differ based on your
              account type, volume discounts, or custom agreements. Always
              confirm with your payment processor.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Is FeeBreaker really free?
            </h3>
            <p className="text-sm text-slate-500">
              Yes. Every tool on this site is 100% free to use. No sign-up, no
              credit card, no hidden fees.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              What does &ldquo;reverse calculate&rdquo; mean?
            </h3>
            <p className="text-sm text-slate-500">
              It tells you how much to charge so you receive a specific amount
              after fees. For example, to keep exactly $100 after Stripe fees,
              you&apos;d need to charge $103.30.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">
              Which countries do you support?
            </h3>
            <p className="text-sm text-slate-500">
              Right now we support US and UK fee structures for Stripe and
              PayPal. Canada, Australia, and more are on the way.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
