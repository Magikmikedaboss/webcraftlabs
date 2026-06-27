import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import SiteShell from "@/components/SiteShell";
import { getBaseUrl, SITE } from "@/lib/site";

const baseUrl = getBaseUrl();
const socialImage = `${baseUrl}/images/modern-computer-display-on-an-office-desk-with-a-web-design.webp`;

export const metadata: Metadata = {
  title: `Las Vegas Web Design | ${SITE.name}`,
  description:
    "Custom Las Vegas web design and website development for service businesses, startups, and growing brands. Fast, SEO-ready websites built to convert.",
  alternates: {
    canonical: `${baseUrl}/las-vegas-web-design`,
  },
  openGraph: {
    title: `Las Vegas Web Design | ${SITE.name}`,
    description:
      "Custom websites for Las Vegas businesses that need more visibility, better performance, and stronger lead generation.",
    type: "website",
    url: `${baseUrl}/las-vegas-web-design`,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Las Vegas web design by WebCraft Labz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Las Vegas Web Design | ${SITE.name}`,
    description:
      "Fast, SEO-ready websites for Las Vegas service businesses and growing brands.",
    images: [socialImage],
  },
};

export default function LasVegasWebDesignPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} Las Vegas Web Design`,
    url: `${baseUrl}/las-vegas-web-design`,
    image: socialImage,
    areaServed: ["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"],
    serviceType: [
      "Web Design",
      "Website Development",
      "Local SEO",
      "Conversion Optimization",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
  };

  return (
    <>
      <Script id="las-vegas-web-design-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>

      <SiteShell
        title={
          <span className="inline-flex flex-col gap-3">
            <span className="inline-block self-start rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--primary)]">
              Las Vegas Web Design
            </span>
            <span className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Websites for Las Vegas Businesses
              <br />
              <span className="text-[var(--primary)]">That Actually Bring In Leads.</span>
            </span>
          </span>
        }
        intro={
          <div className="max-w-3xl space-y-4">
            <p className="text-lg leading-relaxed text-[var(--text)] sm:text-xl">
              We design and build fast, SEO-ready websites for Las Vegas service businesses, local brands, and teams that want more than a generic online brochure.
            </p>            <p className="text-base text-[var(--muted)]">
              If your current site feels outdated, slow, or unclear, WebCraft Labz can help you replace it with something that looks better, loads faster, and turns more visitors into calls, quote requests, and booked work.
            </p>
          </div>
        }
      >
        <section className="relative mx-auto max-w-6xl px-6 pb-16 pt-10">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] shadow-2xl">
            <div className="relative h-80 w-full">
              <Image
                src="/images/modern-computer-display-on-an-office-desk-with-a-web-design.webp"
                alt="Las Vegas web design services"
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/75 via-blue-900/55 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">Built for visibility, speed, and trust.</h2>
                <p className="mt-3 text-sm text-white/90 sm:text-base">
                  From local service pages to conversion-focused homepages, we build websites that help Las Vegas businesses show up better and sell more clearly.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50">
                    Book a local consult
                  </Link>
                  <Link href="/build" className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20">
                    Start your build
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Why Las Vegas businesses hire us</h2>
            <p className="mt-3 text-base text-[var(--muted)]">
              Local businesses don’t just need a pretty site. They need something clear, credible, and built to compete in a crowded market.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Clear messaging</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We help visitors understand what you do, why it matters, and what to do next within seconds.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <h3 className="text-lg font-semibold">SEO-ready structure</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Better page structure, better internal linking, and stronger local search signals from the start.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <h3 className="text-lg font-semibold">Performance that builds trust</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Fast load times, mobile-first layouts, and cleaner UX so your business looks more credible online.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-8 rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-xl md:grid-cols-2 md:p-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">What’s included in a better local website</h2>
              <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                <p>• Custom homepage messaging built around your offer</p>
                <p>• Service pages that target what people actually search for</p>
                <p>• Strong calls to action and contact flow</p>
                <p>• Mobile-first design and Core Web Vitals improvements</p>
                <p>• Local SEO foundations for Las Vegas visibility</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Best fit for</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Contractors",
                  "Home services",
                  "Consultants",
                  "Studios",
                  "Medical + wellness",
                  "Local brands",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[var(--border)] bg-white/70 px-3 py-1 text-sm text-[var(--text)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-sm text-[var(--muted)]">
                Whether you serve all of Las Vegas or nearby areas like Henderson, Summerlin, or North Las Vegas, the goal is the same: make it easier for the right people to find you and trust you.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-2xl font-bold">Local specialized service pages</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Need a more specific service path? Use these local pages to jump straight to the right offer.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="/services/las-vegas-custom-website-development" className="text-[var(--primary)] hover:underline">Las Vegas Custom Website Development</Link>
              <Link href="/services/las-vegas-landing-pages-funnels" className="text-[var(--primary)] hover:underline">Las Vegas Landing Pages + Funnels</Link>
              <Link href="/services/las-vegas-seo-technical-optimization" className="text-[var(--primary)] hover:underline">Las Vegas SEO + Technical Optimization</Link>
              <Link href="/services/las-vegas-saas-platform-development" className="text-[var(--primary)] hover:underline">Las Vegas SaaS Platform Development</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 text-center shadow-2xl md:p-12">
            <h2 className="text-3xl font-bold text-white">Need Las Vegas web design that actually works?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/90">
              If you want a site that looks premium, performs fast, and helps your business generate better leads, let’s talk.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-50">
                Talk about your project
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20">
                Explore our services
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
