
import SiteShell from "@/components/SiteShell";
import Link from "next/link";

const ITEMS = [
  {
    slug: "launch-build-configurator",
    title: "Build Configurator Launched",
    summary: "Our productized build system is live.",
    meta: "Jan 2026 • Release note",
  },
];

export default function NewsIndexPage() {
  return (
    <SiteShell title="News" intro="Studio updates, releases, and launch notes.">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 hover:bg-[var(--bg)]"
            >
              <div className="text-xs font-semibold text-[var(--muted)]">{n.meta}</div>
              <div className="mt-2 text-lg font-semibold">{n.title}</div>
              <div className="mt-2 text-sm text-[var(--muted)]">{n.summary}</div>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}