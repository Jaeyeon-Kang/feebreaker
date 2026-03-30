import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="font-bold text-lg mb-3">
              <span aria-hidden="true" className="text-emerald-600">{"\u26A1"}</span> Fee
              <span className="text-emerald-600">Breaker</span>
            </div>
            <p className="text-sm text-slate-500">
              Free tools for freelancers and sellers. Know exactly what you keep
              after fees.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-3">
              Fee Calculators
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/us/stripe" className="hover:text-emerald-600">
                  US Stripe Fees
                </Link>
              </li>
              <li>
                <Link href="/us/paypal" className="hover:text-emerald-600">
                  US PayPal Fees
                </Link>
              </li>
              <li>
                <Link href="/gb/stripe" className="hover:text-emerald-600">
                  UK Stripe Fees
                </Link>
              </li>
              <li>
                <Link href="/gb/paypal" className="hover:text-emerald-600">
                  UK PayPal Fees
                </Link>
              </li>
              <li>
                <Link href="/etsy" className="hover:text-emerald-600">
                  Etsy Fees
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-emerald-600">
                  Stripe vs PayPal
                </Link>
              </li>
              <li>
                <Link href="/paypal/friends-family" className="hover:text-emerald-600">
                  PayPal F&amp;F
                </Link>
              </li>
              <li>
                <Link href="/us/stripe-ach" className="hover:text-emerald-600">
                  Stripe ACH
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-3">
              Business Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/invoice" className="hover:text-emerald-600">
                  Invoice Generator
                </Link>
              </li>
              <li>
                <Link href="/margin" className="hover:text-emerald-600">
                  Profit Margin Calculator
                </Link>
              </li>
              <li>
                <Link href="/hourly" className="hover:text-emerald-600">
                  Hourly Rate Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-slate-900 mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link href="/about" className="hover:text-emerald-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-emerald-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} FeeBreaker. All fee calculations
          are estimates. Always verify with the official platform pricing page.
        </div>
      </div>
    </footer>
  );
}
