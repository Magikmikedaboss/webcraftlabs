import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { SITE, getBaseUrl } from "@/lib/site";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas SaaS Platform Development | ${SITE.name}`,
  description:
    "Las Vegas SaaS platform development for founders and teams in Summerlin, Henderson, and North Las Vegas building MVPs, subscription tools, client portals, and scalable product architecture.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-saas-platform-development`,
  },
};

export default function LasVegasSaasPlatformDevelopmentPage() {
  return (
    <SiteShell
      title="Las Vegas SaaS Platform Development"
      intro="SaaS MVP and platform development for Las Vegas teams building digital products, portals, and subscription experiences."
    >
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-bold">From product idea to launchable SaaS</h2>
          <p className="mt-4 text-[var(--muted)]">
            We help local founders and teams design MVP scope, build core SaaS workflows, and launch platform foundations that can scale with customer demand.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/build" className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">Start your build</Link>
            <Link href="/contact" className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-semibold hover:bg-white/10">Book a SaaS consult</Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h3 className="text-lg font-semibold">Related local service pages</h3>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/services/las-vegas-custom-website-development" className="text-[var(--primary)] hover:underline">Las Vegas Custom Website Development</Link>
            <Link href="/services/las-vegas-seo-technical-optimization" className="text-[var(--primary)] hover:underline">Las Vegas SEO + Technical Optimization</Link>
            <Link href="/services/saas-platform-development" className="text-[var(--primary)] hover:underline">SaaS Platform Development</Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
