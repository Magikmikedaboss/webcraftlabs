import SiteShell from "@/components/SiteShell";
// import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export const metadata = {
  title: `Services | ${SITE.name}`,
  description: 'SEO-optimized website design, marketing funnels, and growth strategies.',
  openGraph: {
    title: `Services | ${SITE.name}`,
    description: 'SEO-optimized website design, marketing funnels, and growth strategies.',
  },
};

const SERVICES = [
  {
    title: "Custom Website Development",
    text: "Full-stack web development built for performance, scalability, and your exact needs.",
    bullets: ["React/Next.js architecture", "Custom functionality + integrations", "Responsive, accessible design"],
    forWho: "Best for: businesses ready to scale with custom tech",
  },
  {
    title: "Marketing Websites",
    text: "Premium websites engineered to rank, load fast, and convert visitors into calls.",
    bullets: ["Custom design system", "Local SEO-ready structure", "Speed + accessibility pass"],
    forWho: "Best for: service businesses, creators, local brands",
  },
  {
    title: "SaaS Platform Development",
    text: "End-to-end SaaS solutions from MVP to production-ready platforms.",
    bullets: ["User auth + dashboards", "Subscription + payment integration", "Scalable cloud architecture"],
    forWho: "Best for: startups building digital products",
  },
  {
    title: "Landing Pages + Funnels",
    text: "High-focus pages built for ads, offers, and lead capture with clean tracking.",
    bullets: ["Offer-first copy layout", "Form + CRM integration", "A/B-ready sections"],
    forWho: "Best for: promos, launches, paid traffic",
  },
  {
    title: "SEO + Technical Optimization",
    text: "Technical SEO foundation plus local setup that helps you show up when it matters.",
    bullets: ["Core Web Vitals optimization", "On-page SEO framework", "Google Business Profile guidance"],
    forWho: "Best for: local services + maps visibility",
  },
  {
    title: "Website Maintenance + Support",
    text: "Proactive monitoring, updates, and improvements to keep your site running smooth.",
    bullets: ["Security patches + updates", "Performance monitoring", "Monthly improvement sprints"],
    forWho: "Best for: businesses that want peace of mind",
  },
  {
    title: "E-Commerce Solutions",
    text: "Full-featured online stores built to handle real traffic and drive sales.",
    bullets: ["Shopify or custom builds", "Payment + inventory systems", "Conversion optimization"],
    forWho: "Best for: retail brands scaling online",
  },
  {
    title: "Analytics + Conversion Tracking",
    text: "Know what’s working. Clean GA4 tracking, events, and conversion visibility.",
    bullets: ["GA4 + GTM baseline", "Conversion events", "UTM structure + reporting hooks"],
    forWho: "Best for: teams running campaigns or content",
  },

];


export default function ServicesPage() {
  return (
    <SiteShell
      title={
        <span style={{ display: "inline-flex", flexDirection: "column", gap: "0.75rem" }}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-semibold text-[var(--primary)] uppercase tracking-wide self-start">
            Services
          </span>
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Built for Growth.<br />
            <span className="text-[var(--primary)]">Designed to Stand Out.</span>
          </span>
        </span>
      }
      intro={
        <div className="max-w-3xl space-y-4">
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
            WebCraft Labz builds premium web solutions for businesses that refuse to settle. We specialize in high-performance marketing websites and digital SaaS platforms engineered to convert, scale, and dominate your market.
          </p>
          <p className="text-base text-[var(--muted)]">
            No templates. No cookie-cutter approaches. Just strategic, custom-built solutions designed around your goals—because standing out is no longer optional.
          </p>
        </div>
      }
    >
      {/* Visual Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pt-12 pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[var(--border)]">
          <div className="w-full h-80 relative">
            <Image
              src="/images/beautiful-landscape-with-trees-and-mountains-marketing-agency-hero.jpg"
              alt="Professional marketing services landscape"
              fill
              className="object-cover object-center"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-900/50 to-transparent" />
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Services Built Around You
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm md:text-base text-white/90 drop-shadow-md mb-3 sm:mb-4">
              We don&apos;t do cookie-cutter. Every project is a partnership, every site a launchpad. Here&apos;s how we help you grow, convert, and lead in your space.
            </p>
            <div className="flex flex-wrap gap-2">
              <Link href="/build" className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-blue-900 shadow-lg hover:bg-blue-50 transition">
                Start your build
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white hover:bg-white/20 transition">
                Book intro call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Service Feature */}
      <section className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:py-10">
        <div className="rounded-3xl border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/images/advertising-beautiful-landscape-with-trees-and-mountains-small.jpg"
            alt="Signature service visual"
            width={220}
            height={180}
            className="rounded-2xl object-cover shadow-md w-full max-w-[220px] h-auto"
          />
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">Custom Website Development</h2>
            <p className="mb-3 text-base text-[var(--muted)]">Full-stack web development built for performance, scalability, and your exact needs. From marketing sites to complex SaaS platforms.</p>
            <ul className="mb-3 space-y-1 text-sm">
              <li>• React/Next.js architecture</li>
              <li>• Custom functionality + integrations</li>
              <li>• Responsive, accessible design</li>
            </ul>
            <div className="text-xs opacity-80 mb-2">Best for: businesses ready to scale with custom tech</div>
            <Link href="/contact" className="inline-block rounded-xl bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white hover:opacity-90">Get started</Link>
          </div>
        </div>
      </section>

      {/* Other Services - visually broken up */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold">More ways we help you grow</h2>
          <p className="mt-2 max-w-2xl mx-auto text-sm text-[var(--muted)]">From high-converting funnels to ongoing growth, our services are designed to meet you where you are and take you further.</p>
        </div>
        <div className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(1).map((s, i) => (
            <div
              key={s.title}
              className={`rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col h-full shadow-md ${i % 2 === 0 ? 'bg-gradient-to-br from-[var(--surface)]/80 to-[var(--bg)]/60' : ''}`}
            >
              <h3 className="text-lg font-bold mb-1">{s.title}</h3>
              <p className="mb-2 text-sm text-[var(--muted)]">{s.text}</p>
              <ul className="mb-2 space-y-1 text-sm">
                {s.bullets.map((b) => (
                  <li key={b}>• {b}</li>
                ))}
              </ul>
              <div className="text-xs opacity-70 mt-auto">{s.forWho}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Book a consult →
          </Link>
        </div>
      </section>

      {/* Process Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-wider opacity-70">How it works</div>
          <h3 className="mt-2 text-xl font-semibold">A simple process that stays sharp.</h3>
          <p className="mt-2 max-w-3xl text-sm opacity-80">
            Premium doesn’t mean complicated. It means fewer surprises, clear milestones, and a site that performs.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">1) Strategy</div>
              <div className="mt-1 text-sm opacity-80">Goals, offers, pages, and conversion plan.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">2) Design</div>
              <div className="mt-1 text-sm opacity-80">Premium UI, brand feel, and layout system.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">3) Build</div>
              <div className="mt-1 text-sm opacity-80">Responsive, fast, SEO-ready development.</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold">4) Launch + Improve</div>
              <div className="mt-1 text-sm opacity-80">Tracking, iteration, and growth sprints.</div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm opacity-80">
              Want the fastest path? Start with a marketing website, then add funnels + tracking.
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/15"
            >
              Book a quick consult →
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
