"use client";

import Link from "next/link";
import { useState } from "react";

const tools = [
  { name: "Stripe Fees", href: "/us/stripe" },
  { name: "PayPal Fees", href: "/us/paypal" },
  { name: "Compare", href: "/compare" },
  { name: "Invoice", href: "/invoice" },
  { name: "Margin", href: "/margin" },
  { name: "Hourly Rate", href: "/hourly" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-emerald-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight"
            aria-label="FeeBreaker home"
          >
            <span aria-hidden="true" className="text-emerald-600 text-2xl">{"\u26A1"}</span>
            <span className="text-slate-900">
              Fee<span className="text-emerald-600">Breaker</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav id="mobile-nav" aria-label="Mobile navigation" className="md:hidden border-t border-gray-100 bg-white px-4 py-2">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block py-2.5 text-sm text-slate-600 hover:text-emerald-600"
                onClick={() => setMenuOpen(false)}
              >
                {t.name}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
