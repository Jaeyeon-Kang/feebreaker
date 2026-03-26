"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import StickyResultBar from "@/app/components/StickyResultBar";

export default function HourlyRatePage() {
  const [annualGoal, setAnnualGoal] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState(10000);
  const [vacationWeeks, setVacationWeeks] = useState(4);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [billablePercent, setBillablePercent] = useState(70);

  const result = useMemo(() => {
    const workWeeks = 52 - vacationWeeks;
    const totalHours = workWeeks * hoursPerWeek;
    const billableHours = totalHours * (billablePercent / 100);
    const totalNeeded = annualGoal + annualExpenses;
    const hourlyRate = billableHours > 0 ? totalNeeded / billableHours : 0;
    const monthlyRevenue = billableHours > 0 ? Math.round(totalNeeded / 12) : 0;
    const dailyRate = hourlyRate * 8;

    return {
      hourlyRate: Math.round(hourlyRate * 100) / 100,
      dailyRate: Math.round(dailyRate * 100) / 100,
      monthlyRevenue: Math.round(monthlyRevenue),
      billableHours: Math.round(billableHours),
      totalHours,
      workWeeks,
      totalNeeded,
    };
  }, [
    annualGoal,
    annualExpenses,
    vacationWeeks,
    hoursPerWeek,
    billablePercent,
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Freelance Hourly Rate Calculator",
            url: "https://feebreaker.com/hourly",
            description:
              "Calculate your ideal freelance hourly rate based on income goals, expenses, and billable hours.",
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
        <span className="text-slate-900" aria-current="page">Hourly Rate Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
        Freelance Hourly Rate Calculator
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mb-8">
        Find your ideal hourly rate based on your income goals, business
        expenses, and realistic billable hours.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Annual Income Goal ($)
            </label>
            <input
              type="number"
              value={annualGoal}
              onChange={(e) =>
                setAnnualGoal(parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-3 text-lg font-semibold border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              min="0"
              step="1000"
            />
            <p className="text-xs text-slate-400 mt-1">
              Your target annual take-home pay, before taxes
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Annual Business Expenses ($)
            </label>
            <input
              type="number"
              value={annualExpenses}
              onChange={(e) =>
                setAnnualExpenses(parseFloat(e.target.value) || 0)
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              min="0"
              step="500"
            />
            <p className="text-xs text-slate-400 mt-1">
              Software, insurance, equipment, etc.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vacation Weeks
              </label>
              <input
                type="number"
                value={vacationWeeks}
                onChange={(e) =>
                  setVacationWeeks(parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="0"
                max="52"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Hours / Week
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) =>
                  setHoursPerWeek(parseInt(e.target.value) || 0)
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                min="1"
                max="80"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Billable Percentage: {billablePercent}%
            </label>
            <input
              type="range"
              value={billablePercent}
              onChange={(e) =>
                setBillablePercent(parseInt(e.target.value))
              }
              className="w-full accent-emerald-600"
              min="10"
              max="100"
              step="5"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>10% (heavy admin)</span>
              <span>100% (all billable)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Most freelancers are billable 60-75% of the time. The rest goes
              to admin, marketing, bookkeeping, and prospecting.
            </p>
          </div>
        </div>

        {/* Result */}
        <div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 md:p-8 mb-6">
            <div className="text-sm text-emerald-600 mb-1">
              Your hourly rate should be
            </div>
            <div className="text-5xl font-extrabold text-emerald-700 mb-4">
              ${result.hourlyRate.toFixed(0)}
              <span className="text-2xl text-emerald-500">/hr</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white/60 rounded-xl p-3">
                <div className="text-xs text-emerald-600">
                  Daily Rate (8hr)
                </div>
                <div className="text-xl font-bold text-slate-900">
                  ${result.dailyRate.toFixed(0)}
                </div>
              </div>
              <div className="bg-white/60 rounded-xl p-3">
                <div className="text-xs text-emerald-600">
                  Monthly Revenue
                </div>
                <div className="text-xl font-bold text-slate-900">
                  ${result.monthlyRevenue.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-emerald-700">Working weeks</span>
                <span className="font-medium">
                  {result.workWeeks} weeks
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Total hours</span>
                <span className="font-medium">
                  {result.totalHours.toLocaleString()} hrs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Billable hours</span>
                <span className="font-medium">
                  {result.billableHours.toLocaleString()} hrs
                </span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-emerald-200">
                <span className="text-emerald-800">Revenue needed</span>
                <span>${result.totalNeeded.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Rate Comparison
            </h3>
            <div className="space-y-2">
              {[50, 75, 100, 125, 150, 200].map((rate) => {
                const annual = rate * result.billableHours;
                const take = annual - annualExpenses;
                return (
                  <div
                    key={rate}
                    className={`flex justify-between text-sm p-2 rounded-lg ${
                      Math.abs(rate - result.hourlyRate) < 15
                        ? "bg-emerald-50 font-medium"
                        : ""
                    }`}
                  >
                    <span>${rate}/hr</span>
                    <span className="text-slate-500">
                      &rarr; ${take.toLocaleString()}/year take-home
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Why is the billable percentage important?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              As a freelancer, not all your working hours generate income. Time
              spent on proposals, invoicing, marketing, meetings, and admin is
              unbillable. Most freelancers are billable 60-75% of their time.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Should I factor in taxes?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes! As a freelancer, you&apos;re responsible for
              self-employment tax (~15.3% in the US) plus income tax. Add
              your estimated tax burden to the &quot;Annual Income Goal&quot;
              to account for this.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What about payment processing fees?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Payment processors like Stripe (2.9% + $0.30) and PayPal
              (3.49% + $0.49) reduce your actual take-home amount. Use our
              fee calculators to see the impact.
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
            href="/invoice"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Invoice Generator
          </Link>
          <Link
            href="/us/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe Fee Calculator
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
        label="Rate"
        value={`$${result.hourlyRate.toFixed(0)}/hr`}
        subValue={`$${result.dailyRate.toFixed(0)}/day`}
        visible={true}
      />
      <div className="h-14 lg:hidden" />
    </div>
  );
}
