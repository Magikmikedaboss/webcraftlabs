import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `SEO + Technical Optimization Services | ${SITE.name}`,
  description:
    "Technical SEO services for faster websites, better indexing, stronger internal linking, Core Web Vitals, schema markup, and local search visibility.",
  alternates: {
    canonical: `${baseUrl}/services/seo-technical-optimization`,
  },
};

const focusAreas = [
  "Technical SEO audits",
  "Crawl and indexing improvements",
  "Core Web Vitals optimization",
  "Website speed improvements",
  "Metadata and heading structure",
  "Schema markup setup",
  "Internal linking strategy",
  "Image optimization",
  "Local SEO foundations",
  "Search-friendly page architecture",
];

const auditItems = [
  "Can Google crawl your important pages?",
  "Are your service pages properly indexed?",
  "Are your title tags and descriptions clear?",
  "Does your site load quickly on mobile?",
  "Are your pages connected with internal links?",
  "Do your images slow down your website?",
  "Does your site have schema markup?",
  "Are your local business signals strong enough?",
];

const processSteps = [
  {
    title: "SEO Audit",
    description:
      "We review your website structure, page speed, indexing, metadata, internal links, content gaps, and technical search issues.",
  },
  {
    title: "Optimization Plan",
    description:
      "We prioritize the fixes that matter most for search visibility, user experience, local relevance, and conversion flow.",
  },
  {
    title: "Technical Fixes",
    description:
      "We improve site speed, page structure, metadata, schema, internal linking, images, and crawlability.",
  },
  {
    title: "Growth Structure",
    description:
      "We help organize your pages so future service pages, blog posts, and location pages support each other.",
  },
];

const faqs = [
  {
    question: "What is technical SEO?",
    answer:
      "Technical SEO is the process of improving the behind-the-scenes structure of your website so search engines can crawl, understand, and index your pages more effectively.",
  },
  {
    question: "Why does website speed matter for SEO?",
    answer:
      "A faster website usually creates a better user experience. Speed can affect how visitors interact with your site, especially on mobile devices, and it is part of the overall technical quality of a website.",
  },
  {
    question: "What are Core Web Vitals?",
    answer:
      "Core Web Vitals are performance measurements related to loading speed, interactivity, and visual stability. They help show whether your website feels fast and stable for users.",
  },
  {
    question: "Can SEO help local businesses?",
    answer:
      "Yes. Local SEO helps businesses appear for location-based searches by improving service pages, local content, internal links, business information, and search relevance.",
  },
  {
    question: "Do you add schema markup?",
    answer:
      "Yes. Schema markup can help search engines better understand your business, services, pages, FAQs, and other important site information.",
  },
  {
    question: "How long does SEO take?",
    answer:
      "SEO is usually a long-term growth channel. Technical fixes can improve your foundation quickly, but rankings and traffic growth depend on competition, content quality, authority, and consistency.",
  },
];

export default function SeoTechnicalOptimizationPage() {
  return (
    <SiteShell
      title="SEO + Technical Optimization Services"
      intro="Improve search visibility with technical SEO, faster pages, cleaner site structure, stronger internal linking, and local search foundations."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border)]">
          <Image
            src="/images/close-up-shot-of-man-wearing-glasses-reflecting-web-design-development.jpg"
            alt="Technical SEO analysis and optimization workflow"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section className="mt-10 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Technical SEO
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Help Search Engines Understand Your Website
            </h2>

            <div className="mt-5 space-y-4 text-[var(--muted)]">
              <p>
                A good-looking website still needs a strong technical foundation.
                If search engines struggle to crawl your pages, understand your
                services, or connect your content, your site may not show up for the
                searches that matter.
              </p>

              <p>
                At {SITE.name}, we improve the technical structure of your website so
                your pages are easier to crawl, faster to load, better organized, and
                more aligned with search intent.
              </p>

              <p>
                This is especially important for service businesses, local companies,
                and growing brands that want to rank for web design, website
                development, landing pages, SEO services, and location-based searches.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold">Business outcomes</h2>

            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>• Better search engine crawlability</li>
              <li>• Cleaner page structure</li>
              <li>• Stronger local SEO signals</li>
              <li>• Faster page performance</li>
              <li>• Improved internal linking</li>
              <li>• Better foundation for content growth</li>
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
                className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                Book a consult
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Core SEO Focus Areas</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            Technical optimization strengthens the parts of your website that users
            may not always see, but search engines absolutely notice.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-black/5 p-4 text-sm text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            SEO Is More Than Keywords on a Page
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Crawlability</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Your important pages should be easy for search engines to discover,
                crawl, and index without confusion.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Site Architecture</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Service pages, blog posts, and location pages should connect in a way
                that builds topical relevance across your website.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Performance</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Faster pages help visitors move through your site with less friction,
                especially on mobile devices and campaign traffic.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">What We Look For in an SEO Audit</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            Before fixing anything, we look for the technical issues that may be
            holding your website back.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {auditItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-black/5 p-4 text-sm text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Our Technical SEO Process</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-[var(--border)] bg-black/5 p-5"
              >
                <p className="text-sm font-semibold text-[var(--primary)]">
                  Step {index + 1}
                </p>

                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            Technical SEO for Local and Service Businesses
          </h2>

          <div className="mt-4 space-y-4 text-[var(--muted)]">
            <p>
              Local businesses need more than a homepage. They need service pages,
              location pages, strong internal links, clear headings, useful content,
              and technical structure that supports how customers search.
            </p>

            <p>
              For Las Vegas businesses, technical SEO can support searches around
              web design, website development, local service companies, contractor
              websites, restaurant websites, landing pages, and small business SEO.
            </p>

            <p>
              Think of technical SEO as cleaning the wiring behind the walls. The
              visitor may not see every connection, but the whole house works better
              when the structure is right. ⚡
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Why Choose {SITE.name}?</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Built From a Developer&apos;s View</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We do not only look at keywords. We look at code structure, page
                hierarchy, speed, usability, linking, and technical foundations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">SEO That Supports Growth</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Strong technical SEO makes it easier to add new service pages,
                blog articles, city pages, and campaign pages over time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Focused on Real Business Pages</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We optimize the pages that matter most: service pages, landing
                pages, location pages, contact pages, and conversion paths.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Local Search Awareness</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We structure your website so it can better support local relevance,
                service intent, and location-based search visibility.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

          <div className="mt-5 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <h3 className="font-semibold">{faq.question}</h3>

                <p className="mt-2 text-sm text-[var(--muted)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related services</h3>

          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              href="/services/custom-website-development"
              className="text-[var(--primary)] hover:underline"
            >
              Custom Website Development
            </Link>

            <Link
              href="/services/landing-pages-funnels"
              className="text-[var(--primary)] hover:underline"
            >
              Landing Pages + Funnels
            </Link>

            <Link
              href="/las-vegas-web-design"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Web Design
            </Link>

            <Link
              href="/services/las-vegas-seo-technical-optimization"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas SEO + Technical Optimization
            </Link>

            <Link
              href="/services/las-vegas-custom-website-development"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Custom Website Development
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--primary)] p-8 text-white">
          <h2 className="text-3xl font-bold">
            Ready to Strengthen Your Search Foundation?
          </h2>

          <p className="mt-4 max-w-3xl text-white/85">
            If your website is slow, thin, poorly connected, or struggling to show
            up in search, {SITE.name} can help improve the technical foundation
            underneath your online presence.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Request an SEO review
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