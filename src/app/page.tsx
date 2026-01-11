import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import Card from "@/components/Card";
import styles from "./home.module.css";

const HERO_IMAGE =
  "/images/breathtaking-sunrise-over-mountain-landscape-showcasing-marketing-advertising.jpg";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${styles.pill} inline-flex items-center px-3 py-1 text-xs font-semibold text-[var(--muted)]`}>
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className={styles.hero}>
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Marketing sunrise"
            fill
            priority
            className="object-cover opacity-[0.14]"
          />
        </div>
        <div className={styles.heroBg} />
        <div className={styles.grid} />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-20 md:pt-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Pill>Marketing Websites</Pill>
                <Pill>SEO + Local</Pill>
                <Pill>Funnels + Lead Capture</Pill>
              </div>

              <h1 className={`mt-6 text-5xl font-semibold leading-[1.05] md:text-6xl ${styles.sectionTitle}`}>
                Marketing websites that{" "}
                <span className="text-[var(--primary)]">mean business.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-[var(--muted)]">
                WebCraft Labs builds modern sites and marketing systems for local services, agencies,
                and brands. Clean architecture, fast performance, and measurable conversion flow.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/build"
                  className="rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:opacity-90"
                >
                  Start your build
                </Link>
                <Link
                  href="/services"
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-semibold hover:bg-[var(--bg)]"
                >
                  View marketing work
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
                <span>Typical timeline: 2–6 weeks</span>
                <span>SEO + analytics included</span>
                <span>Built for ongoing campaigns</span>
              </div>
            </div>

            {/* Right preview */}
            <div className="md:col-span-5">
              <div className={`${styles.heroCard} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Instant estimate</div>
                  <span className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                    Web + Marketing
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  {[
                    ["Build type", "Marketing website"],
                    ["Pages", "5 pages"],
                    ["Add-ons", "SEO · Booking · Email capture"],
                    ["Timeline", "Standard (2–4 weeks)"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <div className="text-[var(--muted)]">{k}</div>
                      <div className="font-semibold">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4">
                  <div className="text-xs text-[var(--muted)]">Estimated range</div>
                  <div className="mt-1 text-2xl font-semibold">$2.4k – $5.6k</div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    Final pricing depends on content + integrations.
                  </div>
                </div>

                <Link
                  href="/build"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[var(--secondary)] px-5 py-3 font-semibold text-white hover:opacity-90"
                >
                  Open the configurator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built on modern architecture */}
      <Section
        title="Built on a modern architecture"
        intro="Next.js, Tailwind, and a content system that scales from simple sites to ongoing marketing."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Next.js Framework", "Fast, SEO-friendly rendering"],
            ["Tailwind CSS", "Consistent design system"],
            ["Headless-ready", "Blog/news without pain"],
            ["Deployments", "Vercel or your host"],
          ].map(([t, d]) => (
            <Card key={t} title={t} text={d} />
          ))}
        </div>
      </Section>

      {/* More than pretty */}
      <Section
        title="More than just a pretty face"
        intro="Everything ships ready to plug into campaigns: UTM tracking, lead capture, analytics, and performance."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Core Web Vitals" text="Performance builds that stay fast under real traffic." />
          <Card title="SEO-ready" text="Semantic HTML, metadata, schema, and indexable architecture." />
          <Card title="CMS-powered content" text="Publish landing pages, news, and blog posts cleanly." />
          <Card title="Mobile-first layouts" text="Designed for thumb-friendly navigation and scanning." />
          <Card title="Analytics wired-in" text="GA4 + conversion events (or your stack) from day one." />
          <Card title="Secure & scalable" text="Static-first deployments that handle campaign spikes." />
        </div>
      </Section>

      {/* Process */}
      <Section
        title="From kickoff to launch in weeks, not months."
        intro="Tight, transparent sprints. Clear plan. Clean handoff."
      >
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="text-sm font-semibold">Client note</div>
              <p className="mt-3 text-sm text-[var(--muted)]">
                “The most organized dev process I’ve seen. We launched early with tracking and SEO
                actually configured.”
              </p>
              <div className="mt-3 text-xs font-semibold text-[var(--muted)]">
                — Sample client, CMO
              </div>
            </div>
          </div>

          <div className="md:col-span-6">
            <ol className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
              {[
                ["Discovery & scope", "Align goals, audience, sitemap, and success metrics."],
                ["UX & visual design", "Wireframes + design system tuned for conversion."],
                ["Build & integrations", "Next.js build, forms, tracking, and content setup."],
                ["QA & launch support", "Cross-browser QA, SEO checks, and handoff."],
              ].map(([t, d], idx) => (
                <li key={t} className="flex gap-4 py-3">
                  <div className="mt-1 h-6 w-6 rounded-md bg-[var(--surface-2)] text-center text-xs font-bold leading-6">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">{d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* News + Blog (not crowded) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
              NEWSROOM + BLOG
            </div>
            <h2 className={`mt-2 text-3xl font-semibold ${styles.sectionTitle}`}>
              From the WebCraft Labs desk
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              Launch notes, case studies, and practical marketing lessons. Short, useful, and built for busy owners.
            </p>
          </div>

          <Link
            href="/blog"
            className="hidden md:inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-12">
          <article className={`md:col-span-7 ${styles.newsFeatured}`}>
            <div className={styles.newsFeaturedMedia} aria-hidden="true" />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
                <span className={styles.badge}>Case Study</span>
                <span>•</span>
                <span>6 min read</span>
                <span>•</span>
                <span>Published Jan 2026</span>
              </div>

              <h3 className="mt-3 text-xl font-semibold leading-snug">
                How a focused landing page lifted demo requests by 42% in 60 days
              </h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                We rebuilt a cluttered marketing site into a streamlined funnel with fewer pages,
                clearer CTAs, and tracking that measured what mattered.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  Read case study
                </Link>
                <Link
                  href="/build"
                  className="inline-flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]"
                >
                  Start your build
                </Link>
              </div>
            </div>
          </article>

          <aside className={`md:col-span-5 ${styles.newsList}`}>
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Latest dispatches</div>
              <Link href="/news" className="text-xs font-semibold text-[var(--primary)] hover:opacity-80">
                View news
              </Link>
            </div>

            <ul className="mt-4 divide-y divide-[var(--border)]">
              {[
                ["Designing a marketing site that actually works with paid ads", "7 min read"],
                ["Why we build client blogs as part of a single 'news' system", "5 min read"],
                ["Launch notes: WebCraft Q2 features for marketers", "3 min read"],
                ["From static site to content engine: adding a headless CMS", "8 min read"],
              ].map(([title, meta]) => (
                <li key={title} className="py-4">
                  <Link href="/news" className="group block">
                    <div className="text-sm font-semibold leading-snug group-hover:opacity-90">
                      {title}
                    </div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{meta}</div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)] md:hidden"
            >
              View all posts
            </Link>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 md:flex md:items-center md:justify-between">
            <div>
              <div className="text-2xl font-semibold">Ready to design your own build?</div>
              <div className="mt-2 text-[var(--muted)]">
                Choose pages, add-ons, and timeline. Then send your configuration with one click.
              </div>
            </div>
            <a
              href="/build"
              className="mt-6 inline-flex rounded-md bg-[var(--primary)] px-7 py-3 font-semibold text-white hover:opacity-90 md:mt-0"
            >
              Open the configurator
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
