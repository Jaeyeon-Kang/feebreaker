import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact FeeBreaker ??Report Errors or Suggest Features",
  description:
    "Get in touch with the FeeBreaker team. Report outdated fee data, suggest new calculators, or send general feedback.",
  alternates: {
    canonical: "https://feebreaker.com/contact",
  },
};

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWvKJFWq5bvWPB2sh5fOHYHEm-zhMDDnZRVnGva8tasr473g/viewform?embedded=true";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">
          Contact
        </span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
        Contact Us
      </h1>
      <p className="text-lg text-slate-500 mb-8">
        Found outdated fee data? Have a suggestion? Fill out the form below.
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-8">
        <iframe
          src={GOOGLE_FORM_URL}
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Contact FeeBreaker"
          className="block"
        >
          Loading??        </iframe>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="font-semibold text-slate-900 mb-1">
            Report outdated fees
          </div>
          <p className="text-slate-500">
            Payment processors change rates without much notice. If you spot an
            error, let us know and we&apos;ll update it quickly.
          </p>
        </div>
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="font-semibold text-slate-900 mb-1">
            Suggest a tool
          </div>
          <p className="text-slate-500">
            Need a calculator for Square, Shopify Payments, or another
            platform? We&apos;re actively expanding our tool set.
          </p>
        </div>
      </div>
    </div>
  );
}
