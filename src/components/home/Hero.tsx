import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-20">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-5xl md:text-6xl">
          Websites, software, and AI automation built around how your business actually works.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--muted)] sm:text-xl">
          WebCraft Labz designs high-converting websites, custom software, and practical automation for growing businesses, startups, and organizations.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/build"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-base font-semibold text-[var(--onPrimary)] shadow-md transition hover:opacity-90"
          >
            Start Your Project
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-base font-semibold text-[var(--text)] transition hover:bg-[var(--hoverSurface)]"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
