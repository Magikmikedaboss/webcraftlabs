import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `SaaS Platform Development Services | ${SITE.name}`,
  description:
    "SaaS platform development services for MVPs, dashboards, authentication, billing, subscriptions, customer workflows, and scalable product foundations.",
  alternates: {
    canonical: `${baseUrl}/services/saas-platform-development`,
  },
};

const buildScope = [
  "SaaS MVP development",
  "User authentication",
  "Account roles and permissions",
  "Subscription billing setup",
  "Payment integrations",
  "Customer dashboards",
  "Admin dashboards",
  "Database architecture",
  "Product onboarding flows",
  "Analytics and event tracking",
];

const platformTypes = [
  "Customer portals",
  "Membership platforms",
  "Internal business tools",
  "Subscription products",
  "Booking platforms",
  "AI-powered tools",
  "Marketplace MVPs",
  "Admin dashboards",
];

const processSteps = [
  {
    title: "Product Discovery",
    description:
      "We clarify the problem, audience, core features, user roles, business model, and first version of the product.",
  },
  {
    title: "MVP Planning",
    description:
      "We define the smallest useful version of the platform so you can launch faster without building unnecessary features.",
  },
  {
    title: "Design & Development",
    description:
      "We build the core user flows, dashboards, authentication, database structure, and product experience.",
  },
  {
    title: "Launch Foundation",
    description:
      "We prepare the platform for testing, payments, analytics, feedback, and future feature expansion.",
  },
];

const faqs = [
  {
    question: "What is SaaS platform development?",
    answer:
      "SaaS platform development is the process of building a web-based software product that users can access online, often through accounts, subscriptions, dashboards, and recurring services.",
  },
  {
    question: "Can you build a SaaS MVP?",
    answer:
      "Yes. An MVP focuses on the smallest useful version of your product so you can test the idea, collect feedback, and improve before investing in a larger build.",
  },
  {
    question: "Can you add authentication and user accounts?",
    answer:
      "Yes. SaaS platforms often include login systems, user accounts, roles, permissions, onboarding, and secure account flows.",
  },
  {
    question: "Can you connect subscriptions and payments?",
    answer:
      "Yes. A SaaS platform can include subscription billing, payment forms, plan tiers, checkout flows, and customer account management depending on the project needs.",
  },
  {
    question: "How long does a SaaS platform take to build?",
    answer:
      "Timeline depends on the scope. A focused MVP may take weeks, while a larger platform with complex workflows, integrations, and user roles can take longer.",
  },
  {
    question: "Do I need every feature in the first version?",
    answer:
      "No. Most SaaS products are better launched in stages. The first version should prove the core value before adding advanced features.",
  },
];

export default function SaasPlatformDevelopmentPage() {
  return (
    <SiteShell
      title="SaaS Platform Development Services"
      intro="Launch and grow SaaS products with clean architecture, secure user flows, dashboards, billing, and scalable product foundations."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="relative h-72 overflow-hidden rounded-2xl border border-[var(--border)]">
          <Image
            src="/images/structure-database-software-development.jpg"
            alt="SaaS architecture with data and software platform components"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <section className="mt-10 grid gap-8 md:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
              SaaS Development
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Build the First Version Without Building the Whole Castle
            </h2>

            <div className="mt-5 space-y-4 text-[var(--muted)]">
              <p>
                A SaaS product does not need every feature on day one. It needs the
                right foundation, the right user flows, and a clear path from idea to
                usable product.
              </p>

              <p>
                At {SITE.name}, we help founders and teams build SaaS platforms,
                MVPs, customer portals, dashboards, and subscription-based products
                with clean architecture and practical growth in mind.
              </p>

              <p>
                Whether you are starting with a rough idea, replacing spreadsheets,
                creating a paid tool, or building a custom platform for your business,
                we can help shape the product into something users can actually use.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="text-xl font-semibold">Who this is for</h2>

            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>• Founders building an MVP</li>
              <li>• Teams launching a subscription product</li>
              <li>• Businesses replacing manual workflows</li>
              <li>• Agencies needing client portals</li>
              <li>• Startups testing a product idea</li>
              <li>• Companies building internal tools</li>
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
          <h2 className="text-2xl font-bold">SaaS Build Scope</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            A strong SaaS platform needs more than screens. It needs account flows,
            data structure, user permissions, payment logic, dashboards, and a product
            experience that feels clear from the first login.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {buildScope.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Built for Product Growth</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">MVP First</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                We help focus the first version around the core value instead of
                burying the product under features nobody has tested yet.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">User-Friendly Dashboards</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Dashboards should make tasks easier, not create a maze. We focus on
                clear navigation, useful data, and simple customer workflows.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="font-semibold">Scalable Structure</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">
                Clean architecture makes it easier to add new features, user roles,
                billing options, integrations, and product improvements later.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Platforms We Can Help Build</h2>

          <p className="mt-3 max-w-3xl text-sm text-[var(--muted)]">
            SaaS development can take many forms. Some products start as a simple
            dashboard. Others become full subscription platforms, portals, tools,
            or internal operating systems.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {platformTypes.map((type) => (
              <div
                key={type}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm font-medium"
              >
                {type}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Our SaaS Development Process</h2>

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
          <h2 className="text-2xl font-bold">
            From Idea to MVP to Product Foundation
          </h2>

          <div className="mt-4 space-y-4 text-[var(--muted)]">
            <p>
              Many SaaS ideas begin as a messy spreadsheet, a manual process, a
              repeated customer request, or a workflow that takes too much time.
              The first version of a platform should turn that problem into a
              usable tool.
            </p>

            <p>
              Instead of trying to build everything at once, we help shape the
              product around the most important user journey. That keeps the build
              leaner, easier to test, and easier to improve.
            </p>

            <p>
              Once the MVP is working, the platform can grow with better onboarding,
              billing options, admin tools, customer dashboards, reports,
              automations, and integrations.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Why Choose {SITE.name}?</h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Product Thinking</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We look beyond pages and buttons. We think about the user journey,
                the business model, the core feature set, and the product path.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Clean Technical Foundation</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                SaaS platforms need structure. Authentication, permissions, data,
                dashboards, billing, and workflows should be planned carefully.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Launch Without Feature Bloat</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                We help focus the build around what matters first so you can test,
                learn, and grow without wasting time on unnecessary complexity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Built for Future Iteration</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Your first version should not trap you. A strong foundation gives you
                room to improve the product as real users give feedback.
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
              href="/services/las-vegas-saas-platform-development"
              className="text-[var(--primary)] hover:underline"
            >
              Las Vegas SaaS Platform Development
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
            Ready to Build Your SaaS MVP?
          </h2>

          <p className="mt-4 max-w-3xl text-white/85">
            If you have a software idea, customer portal, subscription product, or
            internal tool you want to bring to life, {SITE.name} can help shape it
            into a focused first version.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
            >
              Book a SaaS consult
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