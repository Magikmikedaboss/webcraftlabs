import SiteShell from "@/components/SiteShell";
import Link from "next/link";
import Image from "next/image";
import { getBaseUrl, SITE } from "@/lib/site";

const ABOUT_DESCRIPTION =
  "Learn how WebCraft Labz builds intelligent websites, software platforms, research systems, and AI-powered workflows for modern business.";

export const metadata = {
  title: "About",
  description: ABOUT_DESCRIPTION,
  openGraph: {
    title: `About | ${SITE.name}`,
    description: ABOUT_DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/images/web-development-cross-platform-solutions-design-and-development.webp",
        width: 1200,
        height: 630,
        alt: "About WebCraft Labz - Intelligence Layer for Modern Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `About | ${SITE.name}`,
    description: ABOUT_DESCRIPTION,
    images: ["/images/web-development-cross-platform-solutions-design-and-development.webp"],  },
  alternates: {
    canonical: `${getBaseUrl()}/about`,
  },
};

export default function AboutPage() {
  return (
    <SiteShell
      title={
        <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.75rem" }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-semibold text-[var(--primary)] uppercase tracking-wide self-start">
            About WebCraft Labz
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Building the<br />
            <span className="text-[var(--primary)]">Intelligence Layer</span><br />
            Behind Modern Business
          </span>
        </span>
      }
      intro={
        <div className="max-w-3xl space-y-4">
          <p className="text-lg sm:text-xl text-[var(--muted)] leading-relaxed">
            WebCraft Labz builds intelligent websites, software platforms, research systems, and AI-powered workflows designed for the next generation of business.
          </p>
          <p className="text-base text-[var(--muted)]">
            We believe the future belongs to organizations that can transform information into intelligence and intelligence into action. Our work sits at the intersection of web development, artificial intelligence, enterprise systems, and human-centered design.
          </p>
          <p className="text-base text-[var(--muted)]">
            Websites are only the beginning. Our mission is to help businesses build the digital infrastructure needed to thrive in an increasingly intelligent world.
          </p>
        </div>
      }
    >
      {/* Hero Image Section */}
      <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)]">
          <div className="w-full h-96 relative">
            <Image
              src="/images/web-development-lone-tree-in-the-middle-of-a-field-with-mountains.webp"
              alt="A lone tree in a field with mountains in the background"
              fill
              sizes="(max-width: 1280px) calc(100vw - 3rem), 1104px"
              className="object-cover object-center"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-900/60 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-lg">
              The Future Won&apos;t Be Built By Bigger Teams.
            </h2>
            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-white/95 drop-shadow-md mb-4">
              It will be built by organizations that learn faster, adapt faster, and leverage intelligent systems more effectively. We help businesses build the technology foundation for that future.
            </p>
          </div>
        </div>
      </section>

      {/* What We Build Around */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What We Build Around</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)]">
            Our work is guided by three principles that help businesses move from information overload to clear action.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Intelligence */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Intelligence</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Turn information into action.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Modern businesses generate enormous amounts of data and knowledge. We build systems that help organizations extract meaning, surface insights, and make better decisions.
            </p>
          </div>

          {/* Leverage */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Leverage</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Multiply human capability.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Technology should remove friction, not create it. Our goal is to help people accomplish more with fewer constraints through automation, intelligent workflows, and thoughtful system design.
            </p>
          </div>

          {/* Adaptability */}
          <div className="rounded-2xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--primary)]">Adaptability</h3>
            <p className="text-base text-[var(--text)] mb-4">
              Built for a changing world.
            </p>
            <p className="text-sm text-[var(--muted)]">
              The pace of change is accelerating. We create platforms, websites, and digital systems designed to evolve alongside the businesses that depend on them.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-gradient-to-br from-blue-50/40 to-cyan-50/30">
        <div className="rounded-3xl border border-[var(--border)] bg-white/60 backdrop-blur-sm p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Who We Work Best With</h2>
              <p className="text-base text-[var(--muted)] mb-6">
                We do our best work with founders, service businesses, and lean teams who care about quality, responsiveness, and long-term digital leverage—not just getting something online fast.
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
                src="/images/business-marketing-solutions-concept-art.webp"
                alt="Business marketing solutions"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Looking Ahead */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border-2 border-[var(--primary)]/20 bg-gradient-to-br from-blue-50/60 to-cyan-50/40 p-8 md:p-12 shadow-xl">
          <div className="max-w-4xl mb-10">
            <span className="inline-block px-3 py-1 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-semibold uppercase tracking-wide text-[var(--primary)] mb-4">
              Looking Ahead
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Future We&apos;re Building Toward</h2>
            <p className="text-base sm:text-lg text-[var(--muted)] mb-4">
              The internet connected people. The cloud connected systems. Artificial intelligence is connecting knowledge.
            </p>
            <p className="text-base sm:text-lg text-[var(--muted)]">
              We believe the next generation of businesses will operate on intelligence layers capable of understanding information, surfacing insights, automating routine work, and helping humans make better decisions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Research Systems</h3>
              <p className="text-sm text-[var(--muted)]">
                Turning information overload into actionable knowledge.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6">
              <h3 className="text-xl font-semibold mb-2">Enterprise Intelligence Platforms</h3>
              <p className="text-sm text-[var(--muted)]">
                Helping organizations see patterns, opportunities, and risks faster.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6">
              <h3 className="text-xl font-semibold mb-2">Autonomous Workflows</h3>
              <p className="text-sm text-[var(--muted)]">
                Reducing operational complexity through intelligent automation.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--border)] bg-white/70 p-6">
              <h3 className="text-xl font-semibold mb-2">Human-AI Collaboration</h3>
              <p className="text-sm text-[var(--muted)]">
                Designing systems that amplify people rather than replace them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Center Teaser */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.96),_rgba(240,249,255,0.72))] p-8 md:p-12 shadow-xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-[var(--primary)]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                Explore our thinking
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">
                The WebCraft Resource Center
              </h2>
              <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-[var(--muted)]">
                Practical guides, learning paths, and project breakdowns covering web development, software, and AI automation — organized so you can actually find what&apos;s useful.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--text)]">Synthetic Minds</span>
                <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--text)]">Axon Research Intelligence</span>
                <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm font-medium text-[var(--text)]">Enterprise AI</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/knowledge"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-95"
                >
                  Explore the Resource Center →
                </Link>
                <Link
                  href="/blog/synthetic-minds-series"
                  className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] bg-white/80 px-6 py-3 text-sm font-semibold text-[var(--text)] transition-all hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  Start with Synthetic Minds
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-[var(--border)] bg-white/85 p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">Full map</div>
                <div className="mt-2 text-lg font-semibold text-[var(--text)]">Clickable topic cards, learning paths, and featured articles.</div>
              </div>
              <div className="rounded-2xl border border-[var(--border)] bg-white/85 p-5 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">Why it exists</div>
                <div className="mt-2 text-lg font-semibold text-[var(--text)]">A cleaner way to connect research, products, and future-facing ideas.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How We Work</h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--muted)]">
            Our process is simple: listen carefully, design intentionally, build cleanly, and stay involved after launch.
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
                src="/images/web-development-cross-platform-solutions-design-and-development.webp"
                alt="Web development and cross-platform solutions"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">World-Class Support & Ongoing Partnership</h2>
              <p className="text-base text-[var(--muted)] mb-6">
                When you work with WebCraft Labz, you&apos;re not just getting a website — you&apos;re gaining a long-term digital partner focused on SEO, performance, reliability, and real business growth.
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
                    <p className="text-sm text-[var(--muted)]">No ticket systems. No outsourcing. You work directly with experienced developers who understand your project and your goals.</p>
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
                    <p className="text-sm text-[var(--muted)]">We provide quick turnaround on updates, fixes, and support requests so your business keeps moving without delays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Proactive Website Maintenance</h3>
                    <p className="text-sm text-[var(--muted)]">We handle security updates, performance optimization, bug fixes, and ongoing monitoring so your website stays fast, secure, and reliable.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Growth-Focused Development</h3>
                    <p className="text-sm text-[var(--muted)]">We help you improve search visibility, optimize conversions, expand features, and integrate automation as your business grows.</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] mb-6">
                Looking for a web developer who understands SEO, performance, and real business growth? Let&apos;s build something that gets results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Let&apos;s Talk About Your Project →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Axon Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 md:p-12 shadow-xl">
          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-semibold uppercase tracking-wide text-[var(--primary)] mb-4">
              Internal Research Initiative
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Axon</h2>
            <p className="text-base sm:text-lg text-[var(--muted)] mb-4">
              Axon is our research and intelligence platform exploring how AI, enterprise systems, and human decision-making intersect.
            </p>
            <p className="text-base sm:text-lg text-[var(--muted)]">
              What began as an experiment in knowledge systems has evolved into a broader effort to understand how organizations can transform information into intelligence and intelligence into action.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-600 p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            If the work matters, the website should too.
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 mb-8">
            If you&apos;re ready for a site or system that feels refined, performs fast, and supports real business growth, we&apos;d love to hear what you&apos;re building.
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
