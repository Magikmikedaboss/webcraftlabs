import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Landing Page Design + Sales Funnels | ${SITE.name}`,
  description:
    "Landing page design and funnel development for lead generation, paid ads, service offers, launches, and conversion-focused campaigns.",
  alternates: {
    canonical: `${baseUrl}/services/landing-pages-funnels`,
  },
};

const deliverables = [
  "Custom landing page design",
  "Offer-first page strategy",
  "Lead generation forms",
  "Calendar booking integrations",
  "CRM-ready form structure",
  "Persuasive section flow",
  "Mobile-responsive layouts",
  "GA4 and event tracking setup",
  "Conversion-focused calls to action",
  "A/B testing-ready structure",
];

const funnelTypes = [
  "Google Ads landing pages",
  "Facebook and Instagram ad funnels",
  "Lead magnet landing pages",
  "Service offer pages",
  "Booking funnels",
  "Product launch pages",
  "Webinar registration pages",
  "Email campaign landing pages",
];

const processSteps = [
  {
    title: "Offer Strategy",
    description:
      "We clarify the offer, audience, pain points, trust signals, and main action you want visitors to take.",
  },
  {
    title: "Page Structure",
    description:
      "We map the sections, messaging flow, calls to action, proof points, and form placement before development.",
  },
  {
    title: "Design & Build",
    description:
      "We create a fast, mobile-friendly landing page built to keep visitors focused and moving toward conversion.",
  },
  {
    title: "Tracking & Launch",
    description:
      "We prepare analytics, conversion events, form testing, and launch support so you can measure performance.",
  },
];

const faqs = [
  {
    question: "What is a landing page?",
    answer:
      "A landing page is a focused web page built around one campaign, offer, or action. Instead of sending visitors to a general homepage, a landing page guides them toward a specific conversion like booking a call, filling out a form, downloading a guide, or requesting a quote.",
  },
  {
    question: "How is a funnel different from a regular website?",
    answer:
      "A regular website gives visitors many paths to explore. A funnel is more focused. It is designed to move people through a specific journey from attention to interest to action.",
  },
  {
    question: "Do I need a landing page for paid ads?",
    answer:
      "Most paid campaigns perform better when traffic is sent to a focused landing page instead of a general homepage. The message can match the ad, the offer is clearer, and the page is easier to measure.",
  },
  {
    question: "Can you connect forms, calendars, or CRM tools?",
    answer:
      "Yes. Landing pages can be connected to contact forms, booking calendars, email tools, CRM systems, analytics platforms, and other business tools depending on your needs.",
  },
  {
    question: "Can landing pages help local businesses?",
    answer:
      "Yes. Local businesses can use landing pages for specific services, seasonal offers, city-based campaigns, lead generation, quote requests, and appointment booking.",
  },
  {
    question: "Can you improve an existing landing page?",
    answer:
      "Yes. If you already have a landing page that is not converting well, we can improve the layout, copy structure, calls to action, page speed, mobile experience, and tracking setup.",
  },
];

export default function LandingPagesFunnelsPage() {
  return (
    <SiteShell
      title="Landing Page Design + Sales Funnels"
      intro="Conversion-focused landing pages and funnels built to turn campaign traffic into leads, bookings, quote requests, and sales opportunities."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border)]">
          <Image
            src="/images/dynamic-website-speed-light-trails-with-long-exposure-.jpg"
            alt="High-converting landing page and funnel performance"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section className="mt-10 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              Landing Pages + Funnels
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Send Traffic Somewhere Built to Convert
            </h2>

            <div className="mt-5 space-y-4 text-[var(--muted)]">
              <p>
                A homepage has too many doors. A landing page gives visitors one
                clear path. That makes it one of the most useful tools for paid ads,
                lead generation, service offers, launches, and local campaigns.
              </p>

              <p>
                At {SITE.name}, we design and build landing pages that focus on the
                offer, the audience, and the action you want people to take. That
                could be booking a call, requesting a quote, joining a list, or
                starting a project.
              </p>

              <p>
                Whether you are running Google Ads, social media campaigns, email
                promotions, or local Las Vegas service campaigns, your landing page
                should make the next step obvious.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold">Best fit for</h2>

            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>• Paid traffic campaigns</li>
              <li>• Local service offers</li>
              <li>• Lead magnet downloads</li>
              <li>• Appointment booking funnels</li>
              <li>• Launches and promotions</li>
              <li>• Quote request campaigns</li>
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
          <h2 className="text-2xl font-bold">Conversion-Focused Deliverables</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            A strong landing page is not just a prettier page. It is a focused
            campaign asset with the right message, layout, tracking, and call to action.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
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
          <h2 className="text-2xl font-bold">Built for Campaigns, Not Guesswork</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Clear Offer</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Visitors should understand what you offer, why it matters, and what
                to do next without hunting through your site.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Focused User Flow</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                The page structure guides people from problem to solution to proof
                to action, with fewer distractions along the way.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Measurable Results</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Tracking setup helps you understand form submissions, clicks,
                bookings, campaign performance, and conversion paths.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Landing Pages We Can Build</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            Different campaigns need different pages. A lead magnet page should not
            feel like a contractor quote page, and a booking funnel should not feel
            like a product launch page.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {funnelTypes.map((type) => (
              <div
                key={type}
                className="rounded-xl border border-[var(--border)] bg-black/5 p-4 text-sm font-medium"
              >
                {type}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Our Funnel Development Process</h2>

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
            Landing Pages for Local Businesses and Online Campaigns
          </h2>

          <div className="mt-4 space-y-4 text-[var(--muted)]">
            <p>
              Landing pages are especially useful for small businesses and local
              companies that want to promote one service, one location, or one
              offer at a time. Instead of sending every visitor to a general
              homepage, you can create a page around the exact thing they searched
              for or clicked on.
            </p>

            <p>
              For Las Vegas businesses, this can work well for contractor services,
              home service campaigns, event promotions, restaurant offers,
              professional services, consultations, and appointment-based businesses.
            </p>

            <p>
              The goal is simple: match the visitor&apos;s intent, remove confusion,
              and make the next step easy.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Why Choose {SITE.name}?</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Built Around the Offer</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We focus the page around the campaign goal instead of forcing your
                traffic into a generic website layout.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Designed for Real Action</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Calls to action, form placement, trust signals, and section flow are
                planned around what visitors need before they convert.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Ready for Tracking</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Funnels should be measurable. We can structure pages for analytics,
                event tracking, form tracking, and campaign reporting.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Fast and Mobile-Friendly</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Most campaign traffic comes from mobile devices, so landing pages
                need to load quickly and feel simple on smaller screens.
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
              href="/services/custom-website-development"
              className="text-[var(--primary)] hover:underline"
            >
              Custom Website Development
            </Link>

            <Link
              href="/las-vegas-web-design"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Web Design
            </Link>

            <Link
              href="/services/las-vegas-landing-pages-funnels"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas Landing Pages + Funnels
            </Link>

            <Link
              href="/services/las-vegas-seo-technical-optimization"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas SEO + Technical Optimization
            </Link>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--primary)] p-8 text-white">
          <h2 className="text-3xl font-bold">
            Ready to Turn More Traffic Into Leads?
          </h2>

          <p className="mt-4 max-w-3xl text-white/85">
            If you are running ads, launching an offer, or promoting a service,
            {SITE.name} can help you build a landing page that gives your traffic
            a clearer path to action.
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