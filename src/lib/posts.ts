import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  readTime: string;
  breadcrumb: string;
  order: number;
};

export type Post = PostMeta & { source: string };

function readPost(slug: string): Post {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    description: data.description,
    excerpt: data.excerpt ?? data.description,
    date: data.date,
    readTime: data.readTime,
    breadcrumb: data.breadcrumb ?? data.title,
    order: data.order ?? 999,
    source: content,
  };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((f) => readPost(f.replace(/\.mdx$/, "")));
  return posts.sort((a, b) => a.order - b.order);
}

export function getPostBySlug(slug: string): Post {
  return readPost(slug);
}
