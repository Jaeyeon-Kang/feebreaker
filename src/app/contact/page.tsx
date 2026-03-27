"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: Replace YOUR_FORM_ID with your Formspree form ID
// Sign up at https://formspree.io → New Form → copy the ID (e.g. "xabcdefg")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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
      <p className="text-lg text-slate-500 mb-10">
        Found outdated fee data? Have a suggestion? We&apos;re happy to hear
        from you.
      </p>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-6">
          Send us a message
        </h2>

        {status === "success" ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-4">✅</div>
            <div className="text-lg font-bold text-slate-900 mb-2">
              Message sent!
            </div>
            <p className="text-slate-500 text-sm">
              Thanks for reaching out. We&apos;ll get back to you as soon as
              possible.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-emerald-600 hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm bg-white"
              >
                <option value="">Select a topic</option>
                <option value="fee-data">Outdated fee data</option>
                <option value="feature">Feature request</option>
                <option value="bug">Bug report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                placeholder="Tell us more..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold rounded-xl transition-colors"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
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
