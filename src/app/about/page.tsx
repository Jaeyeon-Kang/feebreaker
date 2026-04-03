import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About FeeBreaker — Free Fee Calculators for Freelancers",
  description:
    "FeeBreaker provides free, accurate fee calculators for Stripe, PayPal, Etsy, and more. Built for freelancers and online sellers who want to know exactly what they keep after fees.",
  alternates: {
    canonical: "https://feebreaker.com/about",
  },
};

const TOOLS = [
  {
    title: "US Stripe Fee Calculator",
    desc: "Domestic and international rates for the US. Forward and reverse calculation.",
    href: "/us/stripe",
  },
  {
    title: "US PayPal Fee Calculator",
    desc: "PayPal Checkout rates for the US. See the exact fee breakdown per transaction.",
    href: "/us/paypal",
  },
  {
    title: "UK Stripe & PayPal Fees",
    desc: "British pound fee calculators for Stripe and PayPal UK merchant accounts.",
    href: "/gb/stripe",
  },
  {
    title: "Etsy Fee Calculator",
    desc: "Listing, transaction, and payment processing fees for Etsy sellers.",
    href: "/etsy",
  },
  {
    title: "Stripe vs PayPal Comparison",
    desc: "Side-by-side at any amount. Find out which platform saves you more.",
    href: "/compare",
  },
  {
    title: "PayPal Friends & Family",
    desc: "Understand when F&F is free and when it's actually more expensive.",
    href: "/paypal/friends-family",
  },
  {
    title: "Stripe ACH Calculator",
    desc: "Bank transfer fees via Stripe ACH — lower rates for large payments.",
    href: "/us/stripe-ach",
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
];

const FAQ = [
  {
    q: "Are the fee calculations accurate?",
    a: "We source fee rates directly from official Stripe, PayPal, and Etsy pricing pages and update them whenever changes are announced. That said, processors can change rates at any time — always verify with your payment provider before making major decisions.",
  },
  {
    q: "Does FeeBreaker store my data?",
    a: "No. All calculations run entirely in your browser. We never see or store the numbers you enter.",
  },
  {
    q: "Is FeeBreaker really free?",
    a: "Yes, completely free. No sign-up, no subscription, no hidden fees. The site is supported by non-intrusive ads.",
  },
  {
    q: "Which countries are supported?",
    a: "We currently cover the US, UK, Canada, and Australia for Stripe and PayPal. Etsy fees reflect the standard global structure. More regions are planned.",
  },
  {
    q: "How often are fee rates updated?",
    a: "We monitor official pricing pages and update rates as soon as changes are announced. Each calculator page notes the last date rates were verified.",
  },
];

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
        Built for freelancers and sellers who are tired of guessing what they&apos;ll actually keep.
      </p>

      <div className="space-y-12 text-slate-600">

        {/* Why */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Why We Built This</h2>
          <p>
            Payment processors like Stripe and PayPal charge fees that aren&apos;t always
            obvious — a percentage here, a flat fee there, and suddenly a $100 payment
            becomes $96.70. Multiply that across hundreds of transactions and you&apos;re
            losing real money without realizing it.
          </p>
          <p className="mt-3">
            FeeBreaker was built to give freelancers, indie sellers, and small business
            owners a clear, honest answer to one question:{" "}
            <strong>after fees, how much do I actually keep?</strong>
          </p>
          <p className="mt-3">
            We also added a reverse calculator — so if you need to receive exactly $500,
            you can find out how much to invoice so that after fees you end up with $500.
          </p>
        </section>

        {/* Who is it for */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Who Is This For?</h2>
          <ul className="space-y-2">
            {[
              "Freelancers billing clients via Stripe or PayPal",
              "Etsy and online marketplace sellers calculating profit per item",
              "Small business owners comparing payment processors",
              "Developers and accountants who need quick fee estimates",
              "Anyone who has ever wondered why their payout was less than expected",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tools */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">All Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-4 border border-gray-200 rounded-xl hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
              >
                <div className="font-semibold text-slate-900 mb-1">{tool.title}</div>
                <div className="text-sm text-slate-500">{tool.desc}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Our Principles</h2>
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
                desc: "Fee rates are sourced directly from official pricing pages and updated regularly.",
              },
              {
                title: "Built for speed",
                desc: "Results update instantly as you type. No loading spinners, no waiting.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <div>
                  <span className="font-semibold text-slate-900">{item.title}: </span>
                  {item.desc}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="font-semibold text-slate-900 mb-1">{item.q}</h3>
                <p className="text-slate-600 text-[15px]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data accuracy */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Data Accuracy</h2>
          <p>
            Fee rates are sourced from official Stripe, PayPal, and Etsy pricing pages.
            While we update rates as soon as changes are announced, payment processors can
            change their fees at any time. Always verify rates directly with your payment
            provider before making business decisions.
          </p>
        </section>

        {/* Get in touch */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Get in Touch</h2>
          <p>
            Found an error in our fee data? Have a suggestion for a new tool or country?
            We&apos;d love to hear from you.
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
