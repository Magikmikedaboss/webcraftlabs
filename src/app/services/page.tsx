import SiteShell from "@/components/SiteShell";
// import Card from "@/components/Card";
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "Marketing Websites",
    text: "Premium websites engineered to rank, load fast, and convert visitors into calls.",
    bullets: ["Custom design system", "Local SEO-ready structure", "Speed + accessibility pass"],
    forWho: "Best for: service businesses, creators, local brands",
  },
  {
    title: "Landing Pages + Funnels",
    text: "High-focus pages built for ads, offers, and lead capture with clean tracking.",
    bullets: ["Offer-first copy layout", "Form + CRM integration", "A/B-ready sections"],
    forWho: "Best for: promos, launches, paid traffic",
  },
  {
    title: "SEO Setup + Local",
    text: "Technical SEO foundation plus local setup that helps you show up when it matters.",
    bullets: ["Indexing + sitemap", "On-page SEO framework", "Google Business Profile guidance"],
    forWho: "Best for: local services + maps visibility",
  },
  {
    title: "Analytics + Tracking",
    text: "Know what’s working. Clean GA4 tracking, events, and conversion visibility.",
    bullets: ["GA4 + GTM baseline", "Conversion events", "UTM structure + reporting hooks"],
    forWho: "Best for: teams running campaigns or content",
  },
  {
    title: "Content System",
    text: "A publishing system that stays organized, scalable, and easy to update.",
    bullets: ["Blog + category architecture", "Internal linking blueprint", "SEO-friendly templates"],
    forWho: "Best for: SEO growth + long-term authority",
  },
  {
    title: "Maintenance + Growth",
    text: "Measured improvements every month. No random redesign chaos, just progress.",
    bullets: ["Monthly updates", "Performance checks", "Conversion improvements"],
    forWho: "Best for: ongoing growth + peace of mind",
  },
];


export default function ServicesPage() {
  return (
    <SiteShell
      title={<span className="text-2xl sm:text-3xl md:text-4xl font-semibold">Services</span>}
      intro={<span className="text-base sm:text-lg md:text-xl text-[var(--muted)]">We help you grow from seed to standout. Explore our signature serviceseach one crafted to move your business forward, not just fill a template.</span>}
    >
      {/* Visual Hero */}
      <section className="relative mx-auto max-w-5xl px-6 pt-10 pb-16 flex flex-col items-center text-center">
        <div className="w-full h-64 relative rounded-3xl overflow-hidden mb-8 shadow-lg">
          <Image
            src="/images/beautiful-landscape-with-trees-and-mountains-marketing-agency-hero.jpg"
            alt="Earthy, futuristic landscape"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)]/80 to-[var(--bg)]/60" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Services, but not as you know them</h1>
        <p className="max-w-2xl text-lg text-[var(--muted)]">
          We don’t do cookie-cutter. Every project is a partnership, every site a launchpad. Here’s how we help you grow, convert, and lead in your space.
        </p>
      </section>

      {/* Signature Service Feature */}
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border-2 border-[var(--primary)] bg-gradient-to-br from-[var(--surface)] to-[var(--bg)] shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/images/advertising-beautiful-landscape-with-trees-and-mountains-small.jpg"
            alt="Signature service visual"
            width={220}
            height={180}
            className="rounded-2xl object-cover shadow-md w-full max-w-[220px] h-auto"
          />
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold mb-2 text-[var(--primary)]">Marketing Websites</h2>
            <p className="mb-3 text-base text-[var(--muted)]">Premium websites engineered to rank, load fast, and convert visitors into calls. Built for the future, rooted in your brand’s story.</p>
            <ul className="mb-3 space-y-1 text-sm">
              <li>• Custom design system</li>
              <li>• Local SEO-ready structure</li>
              <li>• Speed + accessibility pass</li>
            </ul>
            <div className="text-xs opacity-80 mb-2">Best for: service businesses, creators, local brands</div>
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
