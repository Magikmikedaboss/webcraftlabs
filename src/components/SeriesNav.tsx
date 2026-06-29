import Link from "next/link";

export default function SeriesNav() {
  return (
    <nav aria-label="Synthetic Minds series" className="mb-10 flex items-center justify-between text-sm text-[var(--muted)]">
      <Link href="/blog/synthetic-minds-series" className="hover:text-[var(--text)]">
        🧠 Synthetic Minds
      </Link>      <span className="opacity-60">Episode</span>
    </nav>
  );
}
