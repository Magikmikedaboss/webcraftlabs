// FeatureCard component for homepage features
import type { ReactNode } from "react";
function FeatureCard(props: { icon: ReactNode; title: string; text: string }) {
  const { icon, title, text } = props;
  return (
    <div className="flex flex-col items-start rounded-xl bg-white/90 border border-[var(--border)] shadow p-6 h-full">
      <div className="mb-3">{icon}</div>
      <div className="font-bold text-lg text-blue-900 mb-1">{title}</div>
      <div className="text-sm text-gray-700 flex-1">{text}</div>
    </div>
  );
}
import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import Section from "@/components/Section";
import Card from "@/components/Card";
import styles from "./home.module.css";

const HERO_IMAGE =
  "/images/advertising-beautiful-landscape-with-trees-and-mountains-small.jpg";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};
function Pill({ children, className }: PillProps) {
  return (
    <span className={`${styles.pill} inline-flex items-center px-4 py-2 text-sm font-semibold text-[var(--muted)] ${className ?? ""}`}>
      {children}
    </span>
  );
}
export default function HomePage() {
  return (
    <SiteShell>
      <>
        return (
          return (
            <SiteShell>
              <>
                {/* HERO */}
                <section className={styles.hero}>
                  <div className="absolute inset-0 pointer-events-none overflow-hidden min-h-[320px] sm:min-h-[400px]">
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
                  <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pb-20 md:pt-24 overflow-x-hidden">
                    <div className="grid gap-10 md:grid-cols-12 md:items-center">
                      <div className="md:col-span-7">
                        <div className="flex flex-wrap gap-2">
                          <Pill className="max-w-full truncate">Marketing Websites</Pill>
                          <Pill className="max-w-full truncate">SEO + Local</Pill>
                          <Pill className="max-w-full truncate">Funnels + Lead Capture</Pill>
                        </div>
                        <h1 className={`mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] ${styles.sectionTitle}`}>
                          Marketing websites that{" "}
                          <span className="text-[var(--primary)]">mean business.</span>
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg text-[var(--muted)]">
                          At WebCraft Labs, we believe every great brand starts with a seed—an idea ready to grow. We don’t just build beautiful websites; we craft digital experiences that connect, inspire, and deliver real results. Our team partners with you every step of the way, blending creativity, strategy, and care to nurture your vision and build for the future. Let’s plant something remarkable, together.
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
                      {/* Right preview intentionally left empty for hero focus */}
                      <div className="md:col-span-5"></div>
                    </div>
                  </div>
                </section>

                {/* Features Section */}
                <Section
                  title="Modern Website Development, Design & SEO"
                  intro="WebCraft Labs builds more than beautiful websites—we engineer high-performance, SEO-optimized platforms for marketing, growth, and results."
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--border)] bg-white">
                        <img
                          src="/images/bright-sky-reflects-on-tranquil-water-webcraft-website-design-image.jpg"
                          alt="WebCraft Labs website design, SEO, and marketing preview"
                          className="object-cover w-full h-auto max-h-[400px] sm:max-h-[500px]"
                          loading="lazy"
                        />
                        {/* Mock homepage overlay */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                          {/* Fake header/nav */}
                          <div className="flex items-center justify-between px-6 pt-5">
                            <span className="flex items-center gap-2 font-bold text-lg text-blue-900 drop-shadow-sm">
                              <span className="inline-block w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full"></span>
                              WebCraft
                            </span>
                            <nav className="flex gap-5 text-sm text-gray-700/90 font-semibold">
                              <span className="opacity-80">Home</span>
                              <span className="opacity-60">Work</span>
                              <span className="opacity-60">Blog</span>
                              <span className="opacity-60">Contact</span>
                            </nav>
                          </div>
                          {/* Fake hero text */}
                          <div className="px-8 pb-8 text-left">
                            <div className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blue-700 mb-3 shadow">Marketing Website</div>
                            <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg leading-tight mb-2">
                              Grow your business<br />with a website that works
                            </div>
                            <div className="text-sm text-white/90 drop-shadow mb-4 max-w-xs">
                              Beautiful, SEO-optimized, and built for results. Launch your next chapter with WebCraft Labs.
                            </div>
                            <div className="flex gap-3">
                              <span className="inline-block rounded bg-blue-600/90 px-4 py-2 text-xs font-bold text-white shadow">Start your build</span>
                              <span className="inline-block rounded border border-white/70 bg-white/30 px-4 py-2 text-xs font-bold text-white/90 shadow">See our work</span>
                            </div>
                          </div>
                        </div>
                        <span className="absolute top-3 left-3 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow">WebCraft Labs</span>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="inline-block w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10" cy="10" r="10" fill="url(#paint0_linear)" />
                            <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <defs>
                              <linearGradient id="paint0_linear" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#3b82f6" />
                                <stop offset="1" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </span>
                        <span className="font-bold text-xl text-blue-900">WebCraft Labs</span>
                      </div>
                      <div className="text-lg text-gray-800 font-semibold">Built for SEO, marketing, and growth—not just looks.</div>
                      <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
                        <li>SEO-first architecture: Next.js, semantic HTML, and fast performance</li>
                        <li>Custom design systems with Tailwind CSS for brand consistency</li>
                        <li>Headless CMS for easy content, news, and blog publishing</li>
                        <li>Analytics, UTM tracking, and lead capture ready out of the box</li>
                        <li>Mobile-first, accessible layouts for every device</li>
                        <li>Secure, scalable deployments (Vercel or your host)</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/30 border border-[var(--border)] shadow-lg px-4 py-8 md:px-10 md:py-12">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-blue-900 mb-2 tracking-tight">Why WebCraft Labs?</h3>
                      <div className="text-base text-gray-700 max-w-2xl mx-auto">Everything you need for modern, SEO-driven website design, marketing, and growth—built in.</div>
                    </div>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                      <FeatureCard
                        icon={<span className="text-blue-600 text-2xl">🔍</span>}
                        title="Rank Higher on Google"
                        text="SEO-optimized, fast, and indexable. Structured for search engines and real users."
                      />
                      <FeatureCard
                        icon={<span className="text-cyan-600 text-2xl">🎨</span>}
                        title="Stand Out with Custom Design"
                        text="Unique layouts, color systems, and components tailored to your brand."
                      />
                      <FeatureCard
                        icon={<span className="text-blue-500 text-2xl">📰</span>}
                        title="Easy Content & Blog Publishing"
                        text="Headless CMS for news, landing pages, and resources—no dev required."
                      />
                      <FeatureCard
                        icon={<span className="text-blue-700 text-2xl">📈</span>}
                        title="Marketing Integrations Built-In"
                        text="Lead capture, UTM tracking, and analytics wired in from day one."
                      />
                      <FeatureCard
                        icon={<span className="text-cyan-700 text-2xl">📱</span>}
                        title="Mobile-First, Accessible Design"
                        text="Responsive, thumb-friendly layouts for every device and user."
                      />
                      <FeatureCard
                        icon={<span className="text-blue-800 text-2xl">⚡</span>}
                        title="Performance & Security"
                        text="Static-first, scalable deployments that handle real campaign traffic."
                      />
                    </div>
                  </div>
                </Section>

                {/* Process Section */}
                <Section
                  title="Your 4-Step Onboarding: From Kickoff to Launch"
                  intro="A simple, guided process—so you always know what’s next. We handle the details, you stay in control."
                >
                  <div className="mx-auto max-w-4xl grid gap-8 grid-cols-1 md:grid-cols-4">
                    {[
                      {
                        title: "1. Discovery Call",
                        desc: "Share your goals and vision. We’ll map out the best path for your business.",
                        icon: "🌱",
                      },
                      {
                        title: "2. Design & Plan",
                        desc: "See your site take shape—wireframes, design system, and a clear content plan.",
                        icon: "🧩",
                      },
                      {
                        title: "3. Build & Review",
                        desc: "We build, you preview. Feedback is welcome at every milestone.",
                        icon: "🚀",
                      },
                      {
                        title: "4. Launch & Support",
                        desc: "Go live! We handle QA, SEO, and handoff. Ongoing support available.",
                        icon: "🎉",
                      },
                    ].map((step, idx) => (
                      <div key={step.title} className="flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
                        <div className="mb-3 text-3xl">{step.icon}</div>
                        <div className="text-base font-bold mb-1">{step.title}</div>
                        <div className="text-sm text-[var(--muted)]">{step.desc}</div>
                      </div>
                    ))}
                  </div>
                </Section>

                {/* News + Blog Section */}
                <section className="mx-auto max-w-7xl px-6 py-16">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">NEWSROOM + BLOG</div>
                      <h2 className={`mt-2 text-3xl font-bold ${styles.sectionTitle}`}>From the WebCraft Labs desk</h2>
                      <p className="mt-3 max-w-2xl text-[var(--muted)]">Launch notes, case studies, and practical marketing lessons. Short, useful, and built for busy owners.</p>
                    </div>
                    <Link
                      href="/blog"
                      className="hidden md:inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90"
                    >
                      View all posts
                    </Link>
                  </div>
                  <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <article className="col-span-2 flex flex-col md:flex-row rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] shadow-lg overflow-hidden">
                      <div className="md:w-1/3 bg-[var(--primary)] flex items-center justify-center text-6xl text-white" aria-hidden="true">
                        <span>📈</span>
                      </div>
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)] mb-2">
                            <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-1 font-semibold text-[var(--primary)]">Case Study</span>
                            <span>•</span>
                            <span>6 min read</span>
                            <span>•</span>
                            <span>Published Jan 2026</span>
                          </div>
                          <h3 className="text-xl font-bold leading-snug mb-2">How a focused landing page lifted demo requests by 42% in 60 days</h3>
                          <p className="text-base text-[var(--muted)] mb-4">We rebuilt a cluttered marketing site into a streamlined funnel with fewer pages, clearer CTAs, and tracking that measured what mattered.</p>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-4">
                          <Link href="/blog" className="inline-flex items-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Read case study</Link>
                          <Link href="/build" className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]">Start your build</Link>
                        </div>
                      </div>
                    </article>
                    <aside className="flex flex-col gap-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-bold">Latest dispatches</div>
                        <Link href="/news" className="text-xs font-semibold text-[var(--primary)] hover:opacity-80">View news</Link>
                      </div>
                      {[
                        { title: "Designing a marketing site that actually works with paid ads", meta: "7 min read", badge: "Guide", icon: "📝" },
                        { title: "Why we build client blogs as part of a single 'news' system", meta: "5 min read", badge: "Strategy", icon: "🧠" },
                        { title: "Launch notes: WebCraft Q2 features for marketers", meta: "3 min read", badge: "Launch Note", icon: "🚀" },
                        { title: "From static site to content engine: adding a headless CMS", meta: "8 min read", badge: "How-To", icon: "⚙️" },
                      ].map(({ title, meta, badge, icon }) => (
                        <div key={title} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                          <div className="text-2xl mt-1">{icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">{badge}</span>
                              <span className="text-xs text-[var(--muted)]">{meta}</span>
                            </div>
                            <Link href="/news" className="block text-sm font-semibold leading-snug hover:opacity-90">{title}</Link>
                          </div>
                        </div>
                      ))}
                      <Link
                        href="/blog"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 md:hidden"
                      >
                        View all posts
                      </Link>
                    </aside>
                  </div>
                </section>

                {/* Instant Estimate Section */}
                <section className="mx-auto max-w-2xl px-6 py-12">
                  <div className="rounded-3xl border border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-lg p-8">
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
                </section>

                {/* Final CTA Section */}
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
              </>
            </SiteShell>
          );
                <li>Headless CMS for easy content, news, and blog publishing</li>
                <li>Analytics, UTM tracking, and lead capture ready out of the box</li>
                <li>Mobile-first, accessible layouts for every device</li>
                <li>Secure, scalable deployments (Vercel or your host)</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/30 border border-[var(--border)] shadow-lg px-4 py-8 md:px-10 md:py-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-2 tracking-tight">Why WebCraft Labs?</h3>
              <div className="text-base text-gray-700 max-w-2xl mx-auto">Everything you need for modern, SEO-driven website design, marketing, and growth—built in.</div>
            </div>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {/* Row 1 */}
              <FeatureCard
                icon={<span className="text-blue-600 text-2xl">🔍</span>}
                title="Rank Higher on Google"
                text="SEO-optimized, fast, and indexable. Structured for search engines and real users."
              />
              <FeatureCard
                icon={<span className="text-cyan-600 text-2xl">🎨</span>}
                title="Stand Out with Custom Design"
                text="Unique layouts, color systems, and components tailored to your brand."
              />
              <FeatureCard
                icon={<span className="text-blue-500 text-2xl">📰</span>}
                title="Easy Content & Blog Publishing"
                text="Headless CMS for news, landing pages, and resources—no dev required."
              />
              {/* Row 2 */}
              <FeatureCard
                icon={<span className="text-blue-700 text-2xl">📈</span>}
                title="Marketing Integrations Built-In"
                text="Lead capture, UTM tracking, and analytics wired in from day one."
              />
              <FeatureCard
                icon={<span className="text-cyan-700 text-2xl">📱</span>}
                title="Mobile-First, Accessible Design"
                text="Responsive, thumb-friendly layouts for every device and user."
              />
              <FeatureCard
                icon={<span className="text-blue-800 text-2xl">⚡</span>}
                title="Performance & Security"
                text="Static-first, scalable deployments that handle real campaign traffic."
              />
            </div>
          </div>
        </Section>

        {/* Process */}
        <Section
          title="Your 4-Step Onboarding: From Kickoff to Launch"
          intro="A simple, guided process—so you always know what’s next. We handle the details, you stay in control."
        >
          <div className="mx-auto max-w-4xl grid gap-8 grid-cols-1 md:grid-cols-4">
            {[
              {
                title: "1. Discovery Call",
                desc: "Share your goals and vision. We’ll map out the best path for your business.",
                icon: "🌱",
              },
              {
                title: "2. Design & Plan",
                desc: "See your site take shape—wireframes, design system, and a clear content plan.",
                icon: "🧩",
              },
              {
                title: "3. Build & Review",
                desc: "We build, you preview. Feedback is welcome at every milestone.",
                icon: "🚀",
              },
              {
                title: "4. Launch & Support",
                desc: "Go live! We handle QA, SEO, and handoff. Ongoing support available.",
                icon: "🎉",
              },
            ].map((step, idx) => (
              <div key={step.title} className="flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
                <div className="mb-3 text-3xl">{step.icon}</div>
                <div className="text-base font-bold mb-1">{step.title}</div>
                <div className="text-sm text-[var(--muted)]">{step.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* News + Blog (visually structured) */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">NEWSROOM + BLOG</div>
              <h2 className={`mt-2 text-3xl font-bold ${styles.sectionTitle}`}>From the WebCraft Labs desk</h2>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">Launch notes, case studies, and practical marketing lessons. Short, useful, and built for busy owners.</p>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90"
            >
              View all posts
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {/* Featured Article Card */}
            <article className="col-span-2 flex flex-col md:flex-row rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] shadow-lg overflow-hidden">
              <div className="md:w-1/3 bg-[var(--primary)] flex items-center justify-center text-6xl text-white" aria-hidden="true">
                {/* Placeholder for image or icon */}
                <span>📈</span>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)] mb-2">
                    <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-1 font-semibold text-[var(--primary)]">Case Study</span>
                    <span>•</span>
                    <span>6 min read</span>
                    <span>•</span>
                    <span>Published Jan 2026</span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug mb-2">How a focused landing page lifted demo requests by 42% in 60 days</h3>
                  <p className="text-base text-[var(--muted)] mb-4">We rebuilt a cluttered marketing site into a streamlined funnel with fewer pages, clearer CTAs, and tracking that measured what mattered.</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link href="/blog" className="inline-flex items-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Read case study</Link>
                  <Link href="/build" className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]">Start your build</Link>
                </div>
              </div>
            </article>

            {/* Latest Dispatches as Cards */}
            <aside className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-bold">Latest dispatches</div>
                <Link href="/news" className="text-xs font-semibold text-[var(--primary)] hover:opacity-80">View news</Link>
              </div>
              {[
                { title: "Designing a marketing site that actually works with paid ads", meta: "7 min read", badge: "Guide", icon: "📝" },
                { title: "Why we build client blogs as part of a single 'news' system", meta: "5 min read", badge: "Strategy", icon: "🧠" },
                { title: "Launch notes: WebCraft Q2 features for marketers", meta: "3 min read", badge: "Launch Note", icon: "🚀" },
                { title: "From static site to content engine: adding a headless CMS", meta: "8 min read", badge: "How-To", icon: "⚙️" },
              ].map(({ title, meta, badge, icon }) => (
                <div key={title} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                  <div className="text-2xl mt-1">{icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">{badge}</span>
                      <span className="text-xs text-[var(--muted)]">{meta}</span>
                    </div>
                    <Link href="/news" className="block text-sm font-semibold leading-snug hover:opacity-90">{title}</Link>
                  </div>
                </div>
              ))}
              <Link
                href="/blog"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 md:hidden"
              >
                View all posts
              </Link>
            </aside>
          </div>
        </section>

        {/* Instant Estimate Section - now above final CTA */}
        <section className="mx-auto max-w-2xl px-6 py-12">
          <div className="rounded-3xl border border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-lg p-8">
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
      </>
    </SiteShell>
  );


      {/* WebCraft Labs: Modern, SEO-First Website Development */}
      <Section
        title="Modern Website Development, Design & SEO"
        intro="WebCraft Labs builds more than beautiful websites—we engineer high-performance, SEO-optimized platforms for marketing, growth, and results."
      >
        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[var(--border)] bg-white">
              <img
                src="/images/bright-sky-reflects-on-tranquil-water-webcraft-website-design-image.jpg"
                alt="WebCraft Labs website design, SEO, and marketing preview"
                className="object-cover w-full h-auto max-h-[400px] sm:max-h-[500px]"
                loading="lazy"
              />
              {/* Mock homepage overlay */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {/* Fake header/nav */}
                <div className="flex items-center justify-between px-6 pt-5">
                  <span className="flex items-center gap-2 font-bold text-lg text-blue-900 drop-shadow-sm">
                    <span className="inline-block w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full"></span>
                    WebCraft
                  </span>
                  <nav className="flex gap-5 text-sm text-gray-700/90 font-semibold">
                    <span className="opacity-80">Home</span>
                    <span className="opacity-60">Work</span>
                    <span className="opacity-60">Blog</span>
                    <span className="opacity-60">Contact</span>
                  </nav>
                </div>
                {/* Fake hero text */}
                <div className="px-8 pb-8 text-left">
                  <div className="inline-block rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blue-700 mb-3 shadow">Marketing Website</div>
                  <div className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg leading-tight mb-2">
                    Grow your business<br />with a website that works
                  </div>
                  <div className="text-sm text-white/90 drop-shadow mb-4 max-w-xs">
                    Beautiful, SEO-optimized, and built for results. Launch your next chapter with WebCraft Labs.
                  </div>
                  <div className="flex gap-3">
                    <span className="inline-block rounded bg-blue-600/90 px-4 py-2 text-xs font-bold text-white shadow">Start your build</span>
                    <span className="inline-block rounded border border-white/70 bg-white/30 px-4 py-2 text-xs font-bold text-white/90 shadow">See our work</span>
                  </div>
                </div>
              </div>
              <span className="absolute top-3 left-3 bg-white/80 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 shadow">WebCraft Labs</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-block w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="10" fill="url(#paint0_linear)" />
                  <path d="M6 10.5L9 13.5L14 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span className="font-bold text-xl text-blue-900">WebCraft Labs</span>
            </div>
            <div className="text-lg text-gray-800 font-semibold">Built for SEO, marketing, and growth—not just looks.</div>
            <ul className="list-disc pl-5 text-gray-700 text-base space-y-1">
              <li>SEO-first architecture: Next.js, semantic HTML, and fast performance</li>
              <li>Custom design systems with Tailwind CSS for brand consistency</li>
              <li>Headless CMS for easy content, news, and blog publishing</li>
              <li>Analytics, UTM tracking, and lead capture ready out of the box</li>
              <li>Mobile-first, accessible layouts for every device</li>
              <li>Secure, scalable deployments (Vercel or your host)</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-2xl bg-gradient-to-br from-blue-50/40 to-cyan-50/30 border border-[var(--border)] shadow-lg px-4 py-8 md:px-10 md:py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-2 tracking-tight">Why WebCraft Labs?</h3>
            <div className="text-base text-gray-700 max-w-2xl mx-auto">Everything you need for modern, SEO-driven website design, marketing, and growth—built in.</div>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {/* Row 1 */}
            <FeatureCard
              icon={<span className="text-blue-600 text-2xl">🔍</span>}
              title="Rank Higher on Google"
              text="SEO-optimized, fast, and indexable. Structured for search engines and real users."
            />
            <FeatureCard
              icon={<span className="text-cyan-600 text-2xl">🎨</span>}
              title="Stand Out with Custom Design"
              text="Unique layouts, color systems, and components tailored to your brand."
            />
            <FeatureCard
              icon={<span className="text-blue-500 text-2xl">📰</span>}
              title="Easy Content & Blog Publishing"
              text="Headless CMS for news, landing pages, and resources—no dev required."
            />
            {/* Row 2 */}
            <FeatureCard
              icon={<span className="text-blue-700 text-2xl">📈</span>}
              title="Marketing Integrations Built-In"
              text="Lead capture, UTM tracking, and analytics wired in from day one."
            />
            <FeatureCard
              icon={<span className="text-cyan-700 text-2xl">📱</span>}
              title="Mobile-First, Accessible Design"
              text="Responsive, thumb-friendly layouts for every device and user."
            />
            <FeatureCard
              icon={<span className="text-blue-800 text-2xl">⚡</span>}
              title="Performance & Security"
              text="Static-first, scalable deployments that handle real campaign traffic."
            />
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section
        title="Your 4-Step Onboarding: From Kickoff to Launch"
        intro="A simple, guided process—so you always know what’s next. We handle the details, you stay in control."
      >
        <div className="mx-auto max-w-4xl grid gap-8 grid-cols-1 md:grid-cols-4">
          {[
            {
              title: "1. Discovery Call",
              desc: "Share your goals and vision. We’ll map out the best path for your business.",
              icon: "🌱",
            },
            {
              title: "2. Design & Plan",
              desc: "See your site take shape—wireframes, design system, and a clear content plan.",
              icon: "🧩",
            },
            {
              title: "3. Build & Review",
              desc: "We build, you preview. Feedback is welcome at every milestone.",
              icon: "🚀",
            },
            {
              title: "4. Launch & Support",
              desc: "Go live! We handle QA, SEO, and handoff. Ongoing support available.",
              icon: "🎉",
            },
          ].map((step, idx) => (
            <div key={step.title} className="flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-center shadow-sm">
              <div className="mb-3 text-3xl">{step.icon}</div>
              <div className="text-base font-bold mb-1">{step.title}</div>
              <div className="text-sm text-[var(--muted)]">{step.desc}</div>
            </div>
          ))}
        </div>
      </Section>


      {/* News + Blog (visually structured) */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-xs font-semibold tracking-wide text-[var(--primary)]">NEWSROOM + BLOG</div>
            <h2 className={`mt-2 text-3xl font-bold ${styles.sectionTitle}`}>From the WebCraft Labs desk</h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">Launch notes, case studies, and practical marketing lessons. Short, useful, and built for busy owners.</p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90"
          >
            View all posts
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Featured Article Card */}
          <article className="col-span-2 flex flex-col md:flex-row rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface)] to-[var(--surface-2)] shadow-lg overflow-hidden">
            <div className="md:w-1/3 bg-[var(--primary)] flex items-center justify-center text-6xl text-white" aria-hidden="true">
              {/* Placeholder for image or icon */}
              <span>📈</span>
            </div>
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)] mb-2">
                  <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-1 font-semibold text-[var(--primary)]">Case Study</span>
                  <span>•</span>
                  <span>6 min read</span>
                  <span>•</span>
                  <span>Published Jan 2026</span>
                </div>
                <h3 className="text-xl font-bold leading-snug mb-2">How a focused landing page lifted demo requests by 42% in 60 days</h3>
                <p className="text-base text-[var(--muted)] mb-4">We rebuilt a cluttered marketing site into a streamlined funnel with fewer pages, clearer CTAs, and tracking that measured what mattered.</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link href="/blog" className="inline-flex items-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Read case study</Link>
                <Link href="/build" className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold hover:bg-[var(--bg)]">Start your build</Link>
              </div>
            </div>
          </article>

          {/* Latest Dispatches as Cards */}
          <aside className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-bold">Latest dispatches</div>
              <Link href="/news" className="text-xs font-semibold text-[var(--primary)] hover:opacity-80">View news</Link>
            </div>
            {[
              { title: "Designing a marketing site that actually works with paid ads", meta: "7 min read", badge: "Guide", icon: "📝" },
              { title: "Why we build client blogs as part of a single 'news' system", meta: "5 min read", badge: "Strategy", icon: "🧠" },
              { title: "Launch notes: WebCraft Q2 features for marketers", meta: "3 min read", badge: "Launch Note", icon: "🚀" },
              { title: "From static site to content engine: adding a headless CMS", meta: "8 min read", badge: "How-To", icon: "⚙️" },
            ].map(({ title, meta, badge, icon }) => (
              <div key={title} className="flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
                <div className="text-2xl mt-1">{icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block rounded bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">{badge}</span>
                    <span className="text-xs text-[var(--muted)]">{meta}</span>
                  </div>
                  <Link href="/news" className="block text-sm font-semibold leading-snug hover:opacity-90">{title}</Link>
                </div>
              </div>
            ))}
            <Link
              href="/blog"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 md:hidden"
            >
              View all posts
            </Link>
          </aside>
        </div>
      </section>


      {/* Instant Estimate Section - now above final CTA */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-lg p-8">
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

export const viewport = {
  width: "device-width",
  initialScale: 1,
}
