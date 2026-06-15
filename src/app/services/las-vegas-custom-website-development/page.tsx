import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas Custom Website Development | ${SITE.name}`,
  description:
    "Las Vegas custom website development for local businesses in Summerlin, Henderson, North Las Vegas, and the surrounding valley that need faster websites, stronger SEO, and better lead conversion.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-custom-website-development`,
  },
};

export default function LasVegasCustomWebsiteDevelopmentPage() {
  return (
    <SiteShell
      title="Las Vegas Custom Website Development"
      intro="Custom website development for Las Vegas businesses that need stronger visibility, better conversion flow, and scalable website structure."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">Built for local growth in Las Vegas</h2>
          <p className="mt-4 text-[var(--muted)]">
            We build custom websites for Las Vegas service businesses, contractors, and local brands that need more than a template. Focus areas include page speed, local SEO architecture, and clear conversion paths.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/build" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Start your build</Link>
            <Link href="/contact" className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-[var(--hoverSurface)]">Book a local consult</Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related local service pages</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/las-vegas-web-design" className="text-[var(--primary)] hover:underline">Las Vegas Web Design</Link>
            <Link href="/services/las-vegas-seo-technical-optimization" className="text-[var(--primary)] hover:underline">Las Vegas SEO + Technical Optimization</Link>
            <Link href="/services/las-vegas-landing-pages-funnels" className="text-[var(--primary)] hover:underline">Las Vegas Landing Pages + Funnels</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
