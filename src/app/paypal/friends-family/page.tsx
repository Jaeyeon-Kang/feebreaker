import type { Metadata } from "next";
import Link from "next/link";
import FriendsFamilyCalculator from "./FriendsFamilyCalculator";

export const metadata: Metadata = {
  title: "PayPal Friends & Family Fee Calculator \u2014 Is F&F Really Free?",
  description:
    "Calculate PayPal Friends & Family fees. Domestic F&F is free when funded by bank/balance. International F&F costs 5% (max $4.99). Compare with Goods & Services fees.",
  alternates: { canonical: "https://www.feebreaker.com/paypal/friends-family" },
  openGraph: {
    title: "PayPal Friends & Family Fee Calculator | FeeBreaker",
    description:
      "Is PayPal Friends & Family really free? Calculate F&F fees vs Goods & Services.",
    url: "https://www.feebreaker.com/paypal/friends-family",
  },
};

export default function FriendsFamilyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PayPal Friends & Family Fee Calculator",
    url: "https://www.feebreaker.com/paypal/friends-family",
    description:
      "Calculate PayPal Friends & Family fees. Find out when F&F is truly free and when fees apply.",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/us/paypal" className="hover:text-emerald-600">
          PayPal
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">
          Friends &amp; Family Fee Calculator
        </span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
            PayPal
          </span>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
            F&amp;F
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
          PayPal Friends &amp; Family Fee Calculator
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Find out when PayPal F&amp;F is truly free &mdash; and when it costs you.
        </p>
      </div>

      <FriendsFamilyCalculator />

      {/* Explanation */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          How PayPal Friends &amp; Family Works
        </h2>
        <div className="space-y-4 text-sm text-slate-600">
          <p>
            PayPal Friends &amp; Family (F&amp;F) is designed for{" "}
            <strong>personal payments between friends and family</strong>, not
            for business transactions. The fee structure is very different from
            PayPal Goods &amp; Services.
          </p>
          <p>
            <strong>Domestic (same country):</strong> Completely free when the
            sender funds the payment from their bank account or PayPal balance.
            If the sender uses a debit or credit card, they pay an additional
            fee of approximately 2.9% + $0.30 on top of the amount.
          </p>
          <p>
            <strong>International transfers:</strong> The sender pays 5% of the
            amount, with a minimum fee of $0.99 and a maximum of $4.99. If
            currency conversion is involved, the receiver also loses
            approximately 3% due to the conversion spread.
          </p>
        </div>

        {/* Warning box */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-xl flex-shrink-0" aria-hidden="true">
              &#9888;
            </span>
            <div>
              <h3 className="font-bold text-amber-800 mb-1">
                Important: Do Not Use F&amp;F for Business
              </h3>
              <p className="text-sm text-amber-700">
                Using PayPal Friends &amp; Family for business transactions (selling
                goods or services) violates PayPal&apos;s Terms of Service. Both buyer
                and seller lose all purchase protection. Sellers who accept F&amp;F for
                services risk account suspension and frozen funds. Always use{" "}
                <Link href="/us/paypal" className="underline font-semibold hover:text-amber-900">
                  Goods &amp; Services
                </Link>{" "}
                for business payments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          F&amp;F vs Goods &amp; Services: $100 Payment
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Method
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Fee (Domestic)
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Buyer Protection
                </th>
                <th scope="col" className="text-left p-3 font-semibold text-slate-700">
                  Seller Protection
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-medium">F&amp;F (bank/balance)</td>
                <td className="p-3 text-emerald-600 font-semibold">$0.00</td>
                <td className="p-3 text-slate-400">None</td>
                <td className="p-3 text-slate-400">None</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">F&amp;F (card)</td>
                <td className="p-3 text-orange-500 font-semibold">
                  ~$3.19 (sender pays)
                </td>
                <td className="p-3 text-slate-400">None</td>
                <td className="p-3 text-slate-400">None</td>
              </tr>
              <tr className="bg-blue-50">
                <td className="p-3 font-medium">Goods &amp; Services</td>
                <td className="p-3 text-red-500 font-semibold">
                  $3.98 (seller pays)
                </td>
                <td className="p-3 text-emerald-600 font-semibold">
                  Yes
                </td>
                <td className="p-3 text-emerald-600 font-semibold">
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          G&amp;S fee based on standard PayPal US rate of 3.49% + $0.49.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-bold text-slate-900 mb-4">FAQ</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Is PayPal Friends &amp; Family always free?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Domestic F&amp;F is free only when funded by a bank account or
              PayPal balance. International transfers always have a fee of 5%
              (min $0.99, max $4.99), and using a debit/credit card domestically
              adds ~2.9% + $0.30.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Can I use PayPal F&amp;F to receive payment for work?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              No. Using F&amp;F to receive payment for goods or services violates
              PayPal&apos;s Terms of Service. You lose all seller protection, and your
              account may be suspended or funds frozen.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              What&apos;s the PayPal F&amp;F international fee?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              5% of the amount sent, with a minimum fee of $0.99 and a maximum
              of $4.99. This means sending $100 internationally costs $4.99 in
              F&amp;F fees.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">
              Does PayPal F&amp;F have a fee when using a credit card?
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Yes. The sender pays approximately 2.9% + $0.30 on top of the
              amount when funding the F&amp;F payment with a debit or credit card.
              The receiver still gets the full amount.
            </p>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/us/paypal"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            US PayPal Fee Calculator
          </Link>
          <Link
            href="/us/stripe"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Stripe Fee Calculator
          </Link>
          <Link
            href="/invoice"
            className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm font-medium transition-colors"
          >
            Invoice Generator
          </Link>
        </div>
      </section>

      <div className="mt-12 text-xs text-slate-400 max-w-3xl">
        Fee data based on PayPal&apos;s published pricing. Rates shown are standard;
        actual fees may vary by account type or region. Always verify with
        PayPal&apos;s official fee schedule.
      </div>
    </div>
  );
}
