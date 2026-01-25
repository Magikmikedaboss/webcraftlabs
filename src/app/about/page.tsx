import SiteShell from "@/components/SiteShell";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `About | ${SITE.name}`,
  description: 'Learn about WebCraft Labz - a web development company building powerful marketing websites, SaaS platforms, and web tools for real-world business needs.',
  openGraph: {
    title: `About | ${SITE.name}`,
    description: 'Learn about WebCraft Labz - a web development company building powerful marketing websites, SaaS platforms, and web tools for real-world business needs.',
  },
};

export default function AboutPage() {
  return (
    <SiteShell
      title={
        <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.75rem" }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-semibold text-[var(--primary)] uppercase tracking-wide self-start">
            About Us
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            We Build Websites<br />
            <span className="text-[var(--primary)]">That Mean Business.</span>
          </span>
        </span>
      }
      intro={
        <div className="max-w-3xl space-y-4">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            WebCraft Labz is a web development company specializing in high-performance marketing websites, SaaS platforms, and custom web tools built for real-world business needs.
          </p>
          <p className="text-base text-[var(--muted)]">
            We don&apos;t do templates or cookie-cutter solutions. Every project is custom-built, strategically designed, and engineered to help you grow, convert, and lead in your market.
          </p>
        </div>
      }
    >
      {/* Hero Image Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)]">
          <div className="w-full h-96 relative">
            <Image
              src="/images/web-development-lone-tree-in-the-middle-of-a-field-with-mountains.jpg"
              alt="Dedicated support and partnership"
              fill
              className="object-cover object-center"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-900/60 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              Built for Growth. Designed to Last.
            </h2>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-white/95 drop-shadow-md mb-4">
              We&apos;re a team of developers, designers, and strategists who believe your website should be more than just a digital brochure—it should be a powerful tool that drives real business results.
            </p>
          </div>
        </div>
      </section>

      {/* What the Z Stands For */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What the <span className="text-[var(--primary)]">Z</span> Stands For</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)]">
            The &quot;Z&quot; in WebCraft Labz represents our core values—the principles that guide every project we build.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Transparency */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Transparency</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Clear flows. Clear choices.
            </p>
            <p className="text-sm text-[var(--muted)]">
              No hidden steps, dark patterns, or surprises. We believe in honest communication, straightforward pricing, and building trust through clarity at every interaction.
            </p>
          </div>

          {/* Design */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Design</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Thoughtfully crafted pages that remove friction.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Every element serves a purpose. We design with intention—creating beautiful, intuitive experiences that build trust and guide users toward action.
            </p>
          </div>

          {/* Impact */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Impact</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Built to last. Made for real people.
            </p>
            <p className="text-sm text-[var(--muted)]">
              We build for communities, not vanity metrics. Our work is designed to create meaningful results—driving growth, conversions, and lasting value for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-gradient-to-br from-blue-50/40 to-cyan-50/30">
        <div className="rounded-3xl border border-[var(--border)] bg-white/60 backdrop-blur-sm p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Who We Work With</h2>
              <p className="text-base text-[var(--muted)] mb-6">
                We partner with ambitious businesses, startups, and entrepreneurs who understand that their website is more than just an online presence—it&apos;s a growth engine.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm"><strong>Service Businesses</strong> looking to dominate their local market with SEO-optimized websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm"><strong>SaaS Startups</strong> building scalable platforms from MVP to production-ready</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm"><strong>E-Commerce Brands</strong> scaling online with custom stores that convert</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[var(--primary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm"><strong>Marketing Teams</strong> running campaigns that need high-converting landing pages</span>
                </li>
              </ul>
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                View Our Services →
              </Link>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/business-marketing-solutions-concept-art.jpg"
                alt="Business marketing solutions"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Approach</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)]">
            We combine strategic thinking, modern technology, and thoughtful design to build websites that perform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">01</div>
            <h3 className="text-lg font-semibold mb-2">Strategy First</h3>
            <p className="text-sm text-[var(--muted)]">
              We start by understanding your goals, audience, and market. Every design decision is rooted in strategy.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">02</div>
            <h3 className="text-lg font-semibold mb-2">Custom Development</h3>
            <p className="text-sm text-[var(--muted)]">
              No templates. We build from scratch using modern frameworks like React and Next.js for maximum performance.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">03</div>
            <h3 className="text-lg font-semibold mb-2">Performance Obsessed</h3>
            <p className="text-sm text-[var(--muted)]">
              Fast load times, SEO optimization, and accessibility aren&apos;t optional—they&apos;re built into every project.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-3xl font-bold text-[var(--primary)] mb-2">04</div>
            <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
            <p className="text-sm text-[var(--muted)]">
              Launch is just the beginning. We provide maintenance, updates, and growth sprints to keep you ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Service & Support */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-blue-50/60 to-cyan-50/40 p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg order-2 md:order-1">
              <Image
                src="/images/web-development-cross-platform-solutions-design-and-development.jpg"
                alt="Web development and cross-platform solutions"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">World-Class Support</h2>
              <p className="text-base text-[var(--muted)] mb-6">
                When you work with WebCraft Labz, you&apos;re not just getting a website—you&apos;re getting a dedicated partner committed to your success.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Direct Communication</h3>
                    <p className="text-sm text-[var(--muted)]">No ticket systems or outsourced support. You work directly with our team.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast Response Times</h3>
                    <p className="text-sm text-[var(--muted)]">We respond quickly to questions, updates, and support requests.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Proactive Maintenance</h3>
                    <p className="text-sm text-[var(--muted)]">Regular updates, security patches, and performance monitoring included.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth Partnership</h3>
                    <p className="text-sm text-[var(--muted)]">We help you iterate, improve, and scale as your business grows.</p>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Something Great?
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 mb-8">
            Let&apos;s talk about your project. Whether you need a marketing website, SaaS platform, or custom web tool, we&apos;re here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 hover:bg-blue-50 transition shadow-lg"
            >
              Start Your Build
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              Book Intro Call
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
