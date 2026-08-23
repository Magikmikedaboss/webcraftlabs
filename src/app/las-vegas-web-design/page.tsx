import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import SiteShell from "@/components/SiteShell";
import ProcessSteps from "@/components/ProcessSteps";
import { getBaseUrl, SITE } from "@/lib/site";

const baseUrl = getBaseUrl();
const socialImage = `${baseUrl}/images/modern-computer-display-on-an-office-desk-with-a-web-design.webp`;

export const metadata: Metadata = {
  title: "Las Vegas Web Design",
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
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Las Vegas Web Design" },
        ]}
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
                sizes="(min-width: 1024px) 1152px, 100vw"
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
            <h2 className="text-2xl font-bold">Service areas</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Based in Las Vegas, working with businesses across the valley.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Las Vegas", "Henderson", "Summerlin", "North Las Vegas"].map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-sm text-[var(--text)]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Jump links to the service sections below — these anchors are the
            permanent redirect targets for the four retired local service URLs. */}
        <section className="mx-auto max-w-7xl px-6 pb-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold">Jump to a specific service</h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link href="#custom-website-development" className="text-[var(--primary)] hover:underline">Custom Website Development</Link>
              <Link href="#landing-pages-funnels" className="text-[var(--primary)] hover:underline">Landing Pages + Funnels</Link>
              <Link href="#saas-platform-development" className="text-[var(--primary)] hover:underline">SaaS Platform Development</Link>
              <Link href="#seo-technical-optimization" className="text-[var(--primary)] hover:underline">SEO + Technical Optimization</Link>
            </div>
          </div>
        </section>

        <section id="custom-website-development" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Las Vegas Custom Website Development</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Custom website development for Las Vegas businesses that need stronger visibility, better conversion flow, and scalable website structure — not another template site.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              We build custom websites for Las Vegas service businesses, contractors, and local brands. Focus areas include page speed, local SEO architecture, and clear conversion paths from every page.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              <li>• Custom design and structure built around your services and customers</li>
              <li>• Local SEO foundations from the first line of code</li>
              <li>• Mobile-first performance and Core Web Vitals attention</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
              Talk about your website →
            </Link>
          </div>
        </section>

        <section id="landing-pages-funnels" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Las Vegas Landing Pages + Funnels</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Conversion-focused local landing pages and funnels for Las Vegas campaigns, quote requests, and booked calls.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              We build focused landing pages for Las Vegas service offers, ad campaigns, and lead funnels — each one structured for mobile conversion and measurable campaign performance.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              <li>• Offer-first layout built for paid traffic and promotions</li>
              <li>• Form and CRM integration for lead capture</li>
              <li>• Clean tracking so you can see what&apos;s actually working</li>
            </ul>
            <Link href="/contact" className="mt-6 inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
              Talk about your campaign →
            </Link>
          </div>
        </section>

        <section id="saas-platform-development" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Las Vegas SaaS Platform Development</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              SaaS MVP and platform development for Las Vegas teams building digital products, portals, and subscription experiences.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              We help local founders and teams design MVP scope, build core SaaS workflows, and launch platform foundations that can scale with customer demand.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              <li>• MVP scoping and technical architecture</li>
              <li>• User authentication, dashboards, and subscription billing</li>
              <li>• A foundation built to scale past launch</li>
            </ul>
            <Link href="/services/saas-platform-development" className="mt-6 inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
              See full SaaS platform details →
            </Link>
          </div>
        </section>

        <section id="seo-technical-optimization" className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-16">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Las Vegas SEO + Technical Optimization</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
              Technical SEO and local optimization for Las Vegas websites that need better rankings, speed, and search-ready structure.
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
              We improve your Las Vegas search footprint with better indexation, stronger internal linking, and performance-focused page architecture that supports both service and location intent.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[var(--muted)]">
              <li>• Technical SEO audit and fixes (crawlability, metadata, structure)</li>
              <li>• Internal linking built around real search intent</li>
              <li>• Core Web Vitals and page-speed improvements</li>
            </ul>
            <Link href="/services/seo-technical-optimization" className="mt-6 inline-flex items-center rounded-xl bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90">
              See full SEO service details →
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <ProcessSteps />
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Do you only work with businesses in Las Vegas proper?",
                a: "No — we work with businesses across the valley, including Henderson, Summerlin, and North Las Vegas, as well as remote clients outside Nevada.",
              },
              {
                q: "Can you redesign my existing site instead of starting over?",
                a: "Yes. If your current site has a reasonable foundation, we can often improve structure, speed, and conversion without a full rebuild.",
              },
              {
                q: "How is this different from a generic template site?",
                a: "Templates get you online quickly but rarely match how your business actually explains itself or converts visitors. We build around your specific services, customers, and local search intent.",
              },
              {
                q: "What if I need a SaaS platform or AI automation instead of a marketing website?",
                a: "That's covered too — see our SaaS Platform Development and AI & Automation service pages for the software side of what we build.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-lg font-semibold">See related work</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Browse recent website and software projects in our portfolio.
            </p>
            <Link href="/portfolio" className="mt-4 inline-flex items-center text-sm font-semibold text-[var(--primary)] hover:underline">
              View the portfolio →
            </Link>
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
