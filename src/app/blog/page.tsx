import PostIndexClient from "@/components/content/PostIndexClient";
import { getAllPosts } from "@/lib/mdx/blog";

export const metadata = {
  title: "Blog | WebCraft Labs",
  description:
    "Editorials on conversion-first web design, performance, and marketing systems.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags || [],
    kind: "blog" as const,
    // optional: readingTime: p.readingTime,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 border-b border-[var(--border)] pb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          WebCraft Labs
        </div>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-[var(--text)]">
          Editorial
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Straight-talk strategy on websites that convert, load fast, and earn trust.
        </p>
      </header>

      <PostIndexClient posts={posts} kind="blog" />
    </main>
  );
}
