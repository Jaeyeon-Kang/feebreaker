import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FeeBreaker — Free Fee Calculators for Freelancers",
  description:
    "FeeBreaker provides free, accurate fee calculators for Stripe, PayPal, and more. Built for freelancers and online sellers who want to know exactly what they keep.",
  alternates: {
    canonical: "https://feebreaker.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">
          About
        </span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        About FeeBreaker
      </h1>
      <p className="text-lg text-slate-500 mb-10">
        Built for freelancers and sellers who are tired of guessing.
      </p>

      <div className="space-y-10 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Why We Built This
          </h2>
          <p>
            Payment processors like Stripe and PayPal charge fees that aren&apos;t
            always obvious — a percentage here, a flat fee there, and suddenly
            a $100 payment becomes $96.70. Multiply that across hundreds of
            transactions and you&apos;re losing real money without realizing it.
          </p>
          <p className="mt-3">
            FeeBreaker was built to give freelancers, indie sellers, and small
            business owners a clear, honest answer to one question:{" "}
            <strong>after fees, how much do I actually keep?</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            What FeeBreaker Offers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Stripe Fee Calculator",
                desc: "Domestic and international rates for US and UK. Forward and reverse calculation.",
                href: "/us/stripe",
              },
              {
                title: "PayPal Fee Calculator",
                desc: "PayPal Checkout rates for US and UK. See the exact fee breakdown.",
                href: "/us/paypal",
              },
              {
                title: "Stripe vs PayPal",
                desc: "Side-by-side comparison at any amount. Find out which platform saves you more.",
                href: "/compare",
              },
              {
                title: "Invoice Generator",
                desc: "Create and download professional PDF invoices — free, no sign-up required.",
                href: "/invoice",
              },
              {
                title: "Profit Margin Calculator",
                desc: "Calculate margin, markup, and the revenue you need to hit any profit target.",
                href: "/margin",
              },
              {
                title: "Hourly Rate Calculator",
                desc: "Work backwards from your income goal to find the right hourly rate.",
                href: "/hourly",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
              >
                <div className="font-semibold text-slate-900 mb-1">
                  {tool.title}
                </div>
                <div className="text-sm text-slate-500">{tool.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Our Principles
          </h2>
          <ul className="space-y-3">
            {[
              {
                title: "Free, always",
                desc: "Every tool on FeeBreaker is free to use. No sign-up, no paywall.",
              },
              {
                title: "No data collection",
                desc: "All calculations happen in your browser. We never see the numbers you enter.",
              },
              {
                title: "Accurate data",
                desc: "Fee rates are sourced directly from official Stripe and PayPal pricing pages and updated regularly.",
              },
              {
                title: "Built for speed",
                desc: "Results update instantly as you type. No loading spinners, no waiting.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <div>
                  <span className="font-semibold text-slate-900">
                    {item.title}:{" "}
                  </span>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Data Accuracy
          </h2>
          <p>
            Fee rates are sourced from official Stripe and PayPal pricing pages.
            While we update rates as soon as changes are announced, payment
            processors can change their fees at any time. Always verify rates
            directly with your payment provider before making business decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Get in Touch
          </h2>
          <p>
            Found an error in our fee data? Have a feature request? We&apos;d love
            to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-3 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
