import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — FeeBreaker",
  description:
    "Guides and articles on payment processing fees, freelance pricing, and tools for online sellers. Learn how to keep more of what you earn.",
  alternates: {
    canonical: "https://feebreaker.com/blog",
  },
};

const POSTS = [
  {
    slug: "stripe-vs-paypal-fees-2026",
    title: "Stripe vs PayPal Fees in 2026: Which Costs Less?",
    excerpt:
      "A side-by-side breakdown of Stripe and PayPal fee structures for US freelancers and sellers — including when each platform actually saves you money.",
    date: "March 30, 2026",
    readTime: "5 min read",
  },
  {
    slug: "how-payment-fees-affect-freelance-income",
    title: "How Payment Processing Fees Eat Into Your Freelance Income",
    excerpt:
      "Most freelancers underestimate how much they lose to fees each year. Here's how to calculate the real cost — and how to price your services to account for it.",
    date: "March 30, 2026",
    readTime: "6 min read",
  },
  {
    slug: "understanding-etsy-fees",
    title: "Understanding Etsy Fees: What Sellers Actually Pay in 2026",
    excerpt:
      "Etsy charges more than just a listing fee. A full breakdown of transaction fees, payment processing, offsite ads, and how to calculate your actual profit per sale.",
    date: "March 30, 2026",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">Blog</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Blog</h1>
      <p className="text-slate-500 mb-10">
        Guides on fees, pricing, and tools for freelancers and online sellers.
      </p>

      <div className="space-y-6">
        {POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-200 rounded-2xl hover:border-emerald-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700">
              {post.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">{post.excerpt}</p>
            <span className="inline-block mt-3 text-sm text-emerald-600 font-medium">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
