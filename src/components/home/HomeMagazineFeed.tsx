import Link from "next/link";

type FeedItem = {
  type: "blog" | "news";
  title: string;
  href: string;
  date?: string;
  description?: string;
  tag?: string;
};

type HomeMagazineFeedProps = {
  featured?: FeedItem;
  latest: FeedItem[];
};

/**
 * Compact "Latest from the Resource Center" strip for the homepage.
 * Intentionally subordinate to the commercial sections above it — a simple
 * card grid, not a full magazine spread. Archive-collection documents are
 * already excluded upstream by buildHomeFeed().
 */
export default function HomeMagazineFeed({ featured, latest }: HomeMagazineFeedProps) {
  const items = [featured, ...latest].filter((item): item is FeedItem => Boolean(item)).slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-[var(--text)]">
          Latest from the Resource Center
        </h2>
        <Link href="/knowledge" className="text-sm font-semibold text-[var(--primary)] hover:opacity-80">
          Browse all resources →
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <span className="rounded bg-[var(--primary)]/10 px-2 py-0.5 font-semibold text-[var(--primary)]">
                {item.type === "blog" ? "Blog" : "News"}
              </span>
              {item.date ? <span>{item.date}</span> : null}
            </div>
            <h3 className="mt-3 text-sm font-semibold leading-snug text-[var(--text)] group-hover:text-[var(--primary)]">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
