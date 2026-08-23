import Link from "next/link";

export default function ResourceCenterIntro() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Resource Center
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)]">
            We share how we build, not just what we sell
          </h2>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Guides, research notes, and write-ups on web development, software, and AI automation — the same thinking that goes into client work, published openly.
          </p>
          <div className="mt-6">
            <Link
              href="/knowledge"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Visit the Resource Center →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
