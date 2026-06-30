import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export interface LocalServiceStubProps {
  title: string;
  intro: string;
  heading: string;
  body: string;
  /** Label for the secondary CTA button. Defaults to "Book a local consult". */
  secondCtaLabel?: string;
  relatedLinks: { href: string; label: string }[];
}

export default function LocalServiceStubPage({
  title,
  intro,
  heading,
  body,
  secondCtaLabel = "Book a local consult",
  relatedLinks,
}: LocalServiceStubProps) {
  return (
    <SiteShell title={title} intro={intro}>
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">{heading}</h2>
          <p className="mt-4 text-[var(--muted)]">{body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/build"
              className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Start your build
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[var(--hoverSurface)]"
            >
              {secondCtaLabel}
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related service pages</h3>          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {relatedLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-[var(--primary)] hover:underline">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
