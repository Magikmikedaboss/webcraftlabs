import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import type { BreadcrumbItem } from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ItemsGridConfig {
  title?: string;
  subtitle?: string;
  items: string[];
  cols?: 2 | 4;
  /** "muted" = descriptive phrases (default); "medium" = short category labels */
  itemStyle?: "muted" | "medium";
}

export interface HighlightCard {
  heading: string;
  body: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface RelatedReadingLink {
  href: string;
  label: string;
  description?: string;
}

export interface ServicePageConfig {
  // SiteShell props
  shellTitle: string;
  shellIntro: string;
  /** Rendered above the title via SiteShell. Home > Services > [this page]. */
  breadcrumbs?: BreadcrumbItem[];

  // Optional hero image
  hero?: { src: string; alt: string };

  // Two-column intro section
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  bestFitTitle: string;
  bestFitItems: string[];

  // Primary feature / deliverable grid (always present)
  primaryItems: ItemsGridConfig & { title: string };

  // 3-column highlight cards
  highlightCards: { sectionTitle: string; cards: HighlightCard[] };

  // Optional secondary items grid — rendered BEFORE processSteps
  secondaryItems?: ItemsGridConfig & { title: string };

  // Process steps
  processSteps: { title: string; steps: Step[] };

  // Optional local / context section — rendered AFTER processSteps
  localSection?: {
    title: string;
    paragraphs: string[];
    /** Optional inline items grid (e.g. industries list embedded in local section) */
    items?: ItemsGridConfig;
  };

  // Optional 2-col "Why Choose" reasons
  whyChoose?: { reasons: HighlightCard[] };

  faqs: FaqItem[];
  relatedLinks: RelatedLink[];
  /** Optional — a small, restrained set of Resource Center articles relevant to this service. */
  relatedReading?: { title: string; items: RelatedReadingLink[] };

  cta: {
    title: string;
    body: string;
    /** Defaults to "Request a free consultation" */
    primaryCtaLabel?: string;
  };
}

// ─── Helper: Items Grid ───────────────────────────────────────────────────────

function ItemsGrid({ cfg }: { cfg: ItemsGridConfig }) {
  const gridClass =
    cfg.cols === 4
      ? "mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4"
      : "mt-6 grid gap-3 sm:grid-cols-2";
  const itemClass =
    cfg.itemStyle === "medium"
      ? "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-medium"
      : "rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]";

  return (
    <ul className={`${gridClass} list-none p-0`}>
      {cfg.items.map((item) => (
        <li key={item} className={itemClass}>
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Structured data ──────────────────────────────────────────────────────────

/**
 * Builds FAQPage JSON-LD directly from the same `faqs` config every service
 * page already renders visibly — question/answer text must stay identical
 * between the two so structured data never claims something the page
 * doesn't actually say.
 */
function buildFaqJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ─── Template ─────────────────────────────────────────────────────────────────

export default function ServicePageTemplate({ config: c }: { config: ServicePageConfig }) {
  const faqJsonLd = buildFaqJsonLd(c.faqs);

  return (
    <SiteShell title={c.shellTitle} intro={c.shellIntro} breadcrumbs={c.breadcrumbs}>
      {faqJsonLd && (
        <script
          id="service-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* Hero image */}
        {c.hero && (
          <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border)]">
            <Image
              src={c.hero.src}
              alt={c.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) calc(100vw - 3rem), 976px"
              className="object-cover"
            />
          </div>
        )}

        {/* Two-column intro + best-fit sidebar */}
        <section className="mt-10 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              {c.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">{c.heading}</h2>
            <div className="mt-5 space-y-4 text-[var(--muted)]">
              {c.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold">{c.bestFitTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              {c.bestFitItems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
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
                Book a consult
              </Link>
            </div>
          </div>
        </section>

        {/* Primary items grid */}
        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">{c.primaryItems.title}</h2>
          {c.primaryItems.subtitle && (
            <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
              {c.primaryItems.subtitle}
            </p>
          )}
          <ItemsGrid cfg={c.primaryItems} />
        </section>

        {/* 3-column highlight cards */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">{c.highlightCards.sectionTitle}</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {c.highlightCards.cards.map((card) => (
              <div
                key={card.heading}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="font-semibold">{card.heading}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Secondary items grid (rendered before process steps when present) */}
        {c.secondaryItems && (
          <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">{c.secondaryItems.title}</h2>
            {c.secondaryItems.subtitle && (
              <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
                {c.secondaryItems.subtitle}
              </p>
            )}
            <ItemsGrid cfg={c.secondaryItems} />
          </section>
        )}

        {/* Process steps */}
        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">{c.processSteps.title}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {c.processSteps.steps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <p className="text-sm font-semibold text-[var(--primary)]">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Local / context section (rendered after process steps) */}
        {c.localSection && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">{c.localSection.title}</h2>
            <div className="mt-4 space-y-4 text-[var(--muted)]">
              {c.localSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {c.localSection.items && <ItemsGrid cfg={c.localSection.items} />}
          </section>
        )}

        {/* Why Choose section */}
        {c.whyChoose && (
          <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">Why Choose {SITE.name}?</h2>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {c.whyChoose.reasons.map((reason) => (
                <div key={reason.heading}>
                  <h3 className="font-semibold">{reason.heading}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{reason.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-5 space-y-4">
            {c.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related services */}
        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related services</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            {c.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--primary)] hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        {/* Related reading — optional, restrained set of Resource Center articles */}
        {c.relatedReading && (
          <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-semibold">{c.relatedReading.title}</h3>
            <ul className="mt-4 space-y-3">
              {c.relatedReading.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm font-semibold text-[var(--primary)] hover:underline">
                    {item.label}
                  </Link>
                  {item.description && (
                    <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA banner. --onPrimary, not text-white/85: --primary flips from
            dark/saturated (light theme) to light/pastel (dark theme), so a
            fixed white/85 only passed in light theme (4.20:1, still under
            AA) and failed badly in dark (2.24:1). --onPrimary is tuned per
            theme against --primary specifically. */}
        <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--primary)] p-8 text-[var(--onPrimary)]">
          <h2 className="text-3xl font-bold">{c.cta.title}</h2>
          <p className="mt-4 max-w-3xl">{c.cta.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              {c.cta.primaryCtaLabel ?? "Request a free consultation"}
            </Link>
            <Link
              href="/build"
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Start your build
            </Link>
          </div>
        </section>

      </section>
    </SiteShell>
  );
}
