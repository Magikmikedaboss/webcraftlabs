import { SITE } from "@/lib/site";
import SiteShell from "@/components/SiteShell";
import ContactForm from "./ContactForm";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WebCraft LabZ for a personalized website quote, marketing strategy, or to discuss your next project. Fast replies, expert advice, and a team that cares about your business.",
  openGraph: {
    title: "Contact WebCraft LabZ | Las Vegas Web Design & Marketing",
    description: "Contact WebCraft LabZ for a personalized website quote, marketing strategy, or to discuss your next project. Fast replies, expert advice, and a team that cares about your business.",
    type: "website",
    url: new URL('/contact', SITE.url).toString(),
    siteName: "WebCraft LabZ",
    images: [
      {
        url: "/images/website-marketing-design-man-holding-megaphone-standing-on-orchid.jpg",
        width: 1200,
        height: 630,
        alt: "Contact WebCraft LabZ - Get in Touch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact WebCraft LabZ | Las Vegas Web Design & Marketing",
    description: "Contact WebCraft LabZ for a personalized website quote, marketing strategy, or to discuss your next project. Fast replies, expert advice, and a team that cares about your business.",
    images: ["/images/website-marketing-design-man-holding-megaphone-standing-on-orchid.jpg"],
  },
  alternates: {
    canonical: new URL('/contact', SITE.url).toString()
  }
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    email: 'info@webcraftlabz.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Las Vegas',
      addressRegion: 'NV',
      addressCountry: 'US',
    },
    contactPoint: [{
      '@type': 'ContactPoint',
      email: 'info@webcraftlabz.com',
      contactType: 'customer support',
    }],
  };
  return (
    <>
      <Script id="contact-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <SiteShell
        title="Contact WebCraft LabZ"
        intro="Let’s build something remarkable. Reach out for a personalized quote, marketing strategy, or to connect with our team in Las Vegas. We reply fast—usually within 24 hours."
      >
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="text-sm font-semibold text-blue-900">Request a personalized quote</div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Share your project details or paste your “Choose Your Build” configuration. We’ll review and reply with a tailored plan—no spam, just real advice from our team.
                </p>
                <ContactForm />
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="text-sm font-semibold text-blue-900">WebCraft LabZ HQ</div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  Las Vegas, NV & Remote<br />
                  <span className="font-semibold text-blue-900">info@webcraftlabz.com</span>
                </div>
                <div className="mt-6 text-sm">
                  <div className="font-semibold">Typical turnaround</div>
                  <div className="text-[var(--muted)]">Replies within 24–48 hours (often same day)</div>
                </div>
                <div className="mt-4 text-sm">
                  <div className="font-semibold">Who you’ll talk to</div>
                  <div className="text-[var(--muted)]">Mike, founder & lead strategist, or a senior team member. No sales scripts—just real help.</div>
                </div>
                <div className="mt-6 rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-xs text-[var(--muted)]">
                  Pro tip: If you already ran the configurator, paste the output here and we’ll start from a clean scope.
                </div>
              </div>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
