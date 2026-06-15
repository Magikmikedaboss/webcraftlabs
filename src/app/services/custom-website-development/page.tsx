import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Custom Website Development Services | ${SITE.name}`,
  description:
    "Custom website development services for businesses that need fast, scalable, SEO-friendly websites built to generate leads and grow online.",
  alternates: {
    canonical: `${baseUrl}/services/custom-website-development`,
  },
};

const includedFeatures = [
  "Custom Next.js website architecture",
  "Responsive mobile-friendly design",
  "Reusable page components",
  "Conversion-focused page layouts",
  "Technical SEO foundations",
  "Schema markup setup",
  "Core Web Vitals optimization",
  "Contact forms and lead capture",
  "Analytics-ready structure",
  "Scalable codebase for future growth",
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We learn about your business, your customers, your services, and what your website needs to accomplish.",
  },
  {
    title: "Strategy",
    description:
      "We plan the site structure, page flow, SEO targets, calls to action, and content sections before development begins.",
  },
  {
    title: "Design & Development",
    description:
      "We build a fast, responsive website using modern tools like Next.js, clean components, and performance-focused layouts.",
  },
  {
    title: "Launch & Optimize",
    description:
      "We test the site, prepare it for search engines, connect key tools, and help you launch with a strong foundation.",
  },
];

const industries = [
  "Contractors",
  "Home service businesses",
  "Restaurants",
  "Local service companies",
  "Artists and creators",
  "Event brands",
  "Professional services",
  "Startups",
];

const faqs = [
  {
    question: "What is custom website development?",
    answer:
      "Custom website development means your website is built around your business goals instead of being forced into a generic template. The design, structure, pages, and features are created to support your brand, customers, and growth plan.",
  },
  {
    question: "How much does a custom website cost?",
    answer:
      "Pricing depends on the number of pages, features, content needs, integrations, and design complexity. A simple business website costs less than a custom platform, ecommerce site, or advanced web application.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most small business websites can be completed in a few weeks, while larger custom websites or platforms may take longer depending on the scope.",
  },
  {
    question: "Will my website be mobile friendly?",
    answer:
      "Yes. Every website should be designed to work smoothly across phones, tablets, laptops, and desktop screens.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. If your current website is outdated, slow, hard to update, or not generating leads, a redesign can improve performance, trust, and user experience.",
  },
  {
    question: "Do you build SEO-friendly websites?",
    answer:
      "Yes. We build with SEO structure in mind, including clean page organization, metadata, headings, internal linking, performance, and technical foundations.",
  },
];

export default function CustomWebsiteDevelopmentPage() {
  return (
    <SiteShell
      title="Custom Website Development Services"
      intro="Fast, scalable, SEO-friendly websites built to help your business attract customers, generate leads, and grow online."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border)]">
          <Image
            src="/images/web-development-cross-platform-solutions-design-and-development.jpg"
            alt="Custom website development architecture and cross-platform delivery"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section className="mt-10 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Custom Web Development
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Your Website Should Work Like a Business Tool, Not Just a Digital Flyer
            </h2>

            <div className="mt-5 space-y-4 text-[var(--muted)]">
              <p>
                A good website should do more than look nice. It should load fast,
                explain what you offer, build trust, guide visitors, and help turn
                search traffic into real leads.
              </p>

              <p>
                At {SITE.name}, we build custom websites for businesses that need
                more flexibility, better performance, and stronger search visibility
                than basic template builders can provide.
              </p>

              <p>
                Whether you are launching a new business, upgrading an outdated site,
                or building a more advanced online platform, custom website development
                gives your brand a stronger foundation to grow.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold">Best fit for</h2>

            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>• Businesses replacing outdated websites</li>
              <li>• Local companies that need more leads</li>
              <li>• Brands that want better SEO structure</li>
              <li>• Companies needing custom pages or integrations</li>
              <li>• Startups building scalable web platforms</li>
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

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">What&apos;s Included</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            Every project is different, but a strong custom website usually includes
            the core pieces needed for performance, usability, search visibility, and
            future growth.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {includedFeatures.map((feature) => (
              <div
                key={feature}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]"
              >
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Built for Speed, SEO, and Conversions</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Performance First</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Fast websites create better user experiences and reduce the chances
                of visitors leaving before they contact you.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">SEO-Friendly Structure</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                We organize pages, headings, metadata, internal links, and technical
                foundations so search engines can better understand your site.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Conversion-Focused UX</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Your pages should guide visitors toward action, whether that means
                calling, booking, requesting a quote, or starting a project.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Our Website Development Process</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
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
          <h2 className="text-2xl font-bold">Custom Websites for Local Businesses</h2>

          <div className="mt-4 space-y-4 text-[var(--muted)]">
            <p>
              If your business depends on local customers, your website needs to be
              built around how people actually search. A Las Vegas contractor,
              restaurant, event brand, or service company needs pages that clearly
              explain services, locations, trust signals, and calls to action.
            </p>

            <p>
              We help businesses create websites that are easier to understand,
              easier to navigate, and better prepared for local SEO. That means your
              site can support searches like custom website development, web design
              services, small business website design, and local business websites.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-medium"
              >
                {industry}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Why Choose {SITE.name}?</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Custom Instead of Cookie-Cutter</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Your business is not generic, so your website should not feel generic.
                We build around your brand, services, customers, and goals.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Built to Grow With You</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                A clean development foundation makes it easier to add landing pages,
                service pages, blog content, integrations, and new features later.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Search Visibility Matters</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We think about SEO from the start, so your website has stronger bones
                before you begin publishing content or running campaigns.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Designed for Real Customers</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                The goal is not just pretty pixels. The goal is helping visitors
                understand your offer and take the next step.
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
              href="/services/seo-technical-optimization"
              className="text-[var(--primary)] hover:underline"
            >
              SEO + Technical Optimization
            </Link>

            <Link
              href="/services/landing-pages-funnels"
              className="text-[var(--primary)] hover:underline"
            >
              Landing Pages + Funnels
            </Link>

            <Link
              href="/services/saas-platform-development"
              className="text-[var(--primary)] hover:underline"
            >
              SaaS Platform Development
            </Link>

            <Link
              href="/services/las-vegas-custom-website-development"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Custom Website Development
            </Link>

            <Link
              href="/las-vegas-web-design"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Web Design
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--primary)] p-8 text-white">
          <h2 className="text-3xl font-bold">Ready to Build a Better Website?</h2>

          <p className="mt-4 max-w-3xl text-white/85">
            Whether you need a new business website, a redesign, or a custom web
            platform, {SITE.name} can help you build something fast, professional,
            and ready to grow.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Request a free consultation
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