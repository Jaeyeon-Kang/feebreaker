import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — FeeBreaker",
  description:
    "Guides and articles on payment processing fees, freelance pricing, and tools for online sellers. Learn how to keep more of what you earn.",
  alternates: {
    canonical: "https://feebreaker.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

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
        {posts.map((post) => (
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
            <h2 className="text-lg font-bold text-slate-900 mb-2">{post.title}</h2>
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
