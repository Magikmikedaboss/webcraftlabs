import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas SEO + Technical Optimization | ${SITE.name}`,
  description:
    "Las Vegas technical SEO services for businesses in Summerlin, Henderson, and North Las Vegas, focused on crawlability, Core Web Vitals, internal linking, and stronger local search visibility.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-seo-technical-optimization`,
  },
};

export default function LasVegasSeoTechnicalOptimizationPage() {
  return (
    <SiteShell
      title="Las Vegas SEO + Technical Optimization"
      intro="Technical SEO and local optimization for Las Vegas websites that need better rankings, speed, and search-ready structure."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Technical SEO for local service visibility</h2>
          <p className="mt-4 text-[var(--muted)]">
            Improve your Las Vegas search footprint with better indexation, stronger internal linking, and performance-focused page architecture that supports service and location intent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/build" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Start your build</Link>
            <Link href="/contact" className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-white/10">Book a local consult</Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related local service pages</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/las-vegas-web-design" className="text-[var(--primary)] hover:underline">Las Vegas Web Design</Link>
            <Link href="/services/las-vegas-custom-website-development" className="text-[var(--primary)] hover:underline">Las Vegas Custom Website Development</Link>
            <Link href="/services/las-vegas-landing-pages-funnels" className="text-[var(--primary)] hover:underline">Las Vegas Landing Pages + Funnels</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
