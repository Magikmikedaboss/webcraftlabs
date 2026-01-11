
import SiteShell from "@/components/SiteShell";
import Link from "next/link";

const POSTS = [
  {
    slug: "hello-webcraft",
    title: "Hello WebCraft",
    summary: "Introducing WebCraft Labs and how we build marketing sites.",
    meta: "Jan 2026 • 4 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <SiteShell
      title="Blog"
      intro="Guides, experiments, and practical marketing notes from the lab."
    >
      <section className="mx-auto max-w-7xl px-6 py-16 overflow-x-hidden">
        <div className="grid gap-4 md:grid-cols-2 min-w-0">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 hover:bg-[var(--bg)]"
            >
              <div className="text-xs font-semibold text-[var(--muted)]">{p.meta}</div>
              <div className="mt-2 text-base sm:text-lg md:text-xl font-semibold">{p.title}</div>
              <div className="mt-2 text-sm sm:text-base text-[var(--muted)]">{p.summary}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
