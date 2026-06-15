import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas Landing Pages + Funnels | ${SITE.name}`,
  description:
    "Las Vegas landing page design and funnel development for local lead generation across Summerlin, Henderson, and North Las Vegas, including paid traffic campaigns and appointment booking flows.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-landing-pages-funnels`,
  },
};

export default function LasVegasLandingPagesFunnelsPage() {
  return (
    <SiteShell
      title="Las Vegas Landing Pages + Funnels"
      intro="Conversion-focused local landing pages and funnels for Las Vegas campaigns, quote requests, and booked calls."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Local campaign pages built to convert</h2>
          <p className="mt-4 text-[var(--muted)]">
            We build focused landing pages for Las Vegas service offers, ad campaigns, and lead funnels. Each page is structured for mobile conversion and measurable campaign performance.
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
            <Link href="/services/las-vegas-seo-technical-optimization" className="text-[var(--primary)] hover:underline">Las Vegas SEO + Technical Optimization</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
