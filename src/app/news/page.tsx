import PostIndexClient from "@/components/content/PostIndexClient";
import { getAllNews } from "@/lib/mdx/news";

export const metadata = {
  title: "News | WebCraft Labs",
  description: "Launches, updates, client wins, and what we’re building.",
};

export default function NewsIndexPage() {
  const posts = getAllNews().map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    tags: p.frontmatter.tags || [],
    kind: "news" as const,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-10 border-b border-[var(--border)] pb-8">
        <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          WebCraft Labs
        </div>
        <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-[var(--text)]">
          Newsroom
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
          Updates, launches, experiments, and client results.
        </p>
      </header>

      <PostIndexClient posts={posts} kind="news" />
    </main>
  );
}