import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} — FeeBreaker`,
      description: post.description,
      alternates: { canonical: `https://feebreaker.com/blog/${slug}` },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/blog" className="hover:text-emerald-600">Blog</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span className="text-slate-900" aria-current="page">{post.breadcrumb}</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-3">{post.title}</h1>
      <div className="flex items-center gap-3 text-sm text-slate-400 mb-8">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>

      <article className="max-w-none">
        <MDXRemote
          source={post.source}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </article>
    </div>
  );
}
