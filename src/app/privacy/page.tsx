import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — FeeBreaker",
  description:
    "FeeBreaker privacy policy. Learn how we handle your data — we don't collect any personal information.",
  alternates: {
    canonical: "https://feebreaker.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">
          Privacy Policy
        </span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: March 27, 2026</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Overview</h2>
          <p>
            FeeBreaker (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates{" "}
            <strong>feebreaker.com</strong>. We are committed to protecting your
            privacy. This policy explains what information we collect, how we use
            it, and your rights.
          </p>
          <p className="mt-3">
            The short version: <strong>we do not collect any personal information.</strong>{" "}
            All calculations happen entirely in your browser. No data is sent to
            our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Information We Do Not Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>No account registration or login required</li>
            <li>No names, emails, or contact information</li>
            <li>No payment information</li>
            <li>No invoices or financial data you enter into our tools — all
              calculations run client-side in your browser only</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Cookies and Tracking
          </h2>
          <p>
            FeeBreaker itself does not use cookies or tracking technologies.
          </p>
          <p className="mt-3">
            However, we use <strong>Google AdSense</strong> to display advertisements.
            Google AdSense may use cookies to show personalized ads based on your
            browsing activity. You can opt out of personalized advertising by
            visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Google&apos;s Ad Settings
            </a>
            .
          </p>
          <p className="mt-3">
            We also use <strong>Google Analytics</strong> to understand how visitors
            use our site (page views, session duration, traffic sources). This data
            is aggregated and anonymous. You can opt out via the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Third-Party Links
          </h2>
          <p>
            Our site contains links to third-party websites such as Stripe and
            PayPal. These sites have their own privacy policies, and we are not
            responsible for their content or practices.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Children&apos;s Privacy
          </h2>
          <p>
            FeeBreaker is not directed at children under 13. We do not knowingly
            collect information from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. Any changes will
            be posted on this page with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Contact</h2>
          <p>
            If you have any questions about this privacy policy, contact us at:{" "}
            <a
              href="mailto:contact@feebreaker.com"
              className="text-emerald-600 hover:underline"
            >
              contact@feebreaker.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
