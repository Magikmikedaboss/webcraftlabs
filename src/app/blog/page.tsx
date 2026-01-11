import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getAllBlogPosts } from "@/lib/blog";

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <SiteShell title="Blog" intro="Insights from WebCraft Labz">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-8">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:opacity-80">
                {p.title}
              </Link>
            </h2>
            <div className="mt-1 text-xs text-[var(--muted)]">{p.date}</div>
            <p className="mt-3 text-sm text-[var(--muted)]">{p.summary}</p>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
