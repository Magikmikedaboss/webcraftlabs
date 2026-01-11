"use client";


import Head from "next/head";
import SiteShell from "@/components/SiteShell";
export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact WebCraft Labs | Las Vegas Web Design & Marketing</title>
        <meta name="description" content="Contact WebCraft Labs for a personalized website quote, marketing strategy, or to discuss your next project. Fast replies, expert advice, and a team that cares about your business." />
        <meta property="og:title" content="Contact WebCraft Labs | Las Vegas Web Design & Marketing" />
        <meta property="og:description" content="Contact WebCraft Labs for a personalized website quote, marketing strategy, or to discuss your next project. Fast replies, expert advice, and a team that cares about your business." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://webcraftlabs.studio/contact" />
        <meta property="og:site_name" content="WebCraft Labs" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'WebCraft Labs',
          url: 'https://webcraftlabs.studio',
          email: 'hello@webcraftlabs.studio',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Las Vegas',
            addressRegion: 'NV',
            addressCountry: 'US',
          },
          contactPoint: [{
            '@type': 'ContactPoint',
            email: 'hello@webcraftlabs.studio',
            contactType: 'customer support',
          }],
        }) }} />
      </Head>
      <SiteShell
        title="Contact WebCraft Labs"
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
                <form className="mt-6 space-y-4">
                  <label htmlFor="contact-name" className="visually-hidden">Name</label>
                  <input
                    id="contact-name"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                    placeholder="Your name (or company)"
                  />
                  <label htmlFor="contact-email" className="visually-hidden">Email</label>
                  <input
                    id="contact-email"
                    className="w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                    placeholder="Your email address"
                  />
                  <label htmlFor="contact-project" className="visually-hidden">Project details / configuration</label>
                  <textarea
                    id="contact-project"
                    className="min-h-[160px] w-full rounded-md border border-[var(--border)] bg-[var(--bg)] px-3 py-3 text-sm outline-none"
                    placeholder="Tell us about your project, goals, or paste your configurator output."
                  />
                  <button
                    type="button"
                    className="rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white hover:opacity-90"
                  >
                    Send request
                  </button>
                </form>
                <style jsx global>{`
                  .visually-hidden {
                    position: absolute !important;
                    height: 1px; width: 1px;
                    overflow: hidden;
                    clip: rect(1px, 1px, 1px, 1px);
                    white-space: nowrap;
                  }
                `}</style>
              </div>
            </div>
            <div className="md:col-span-5">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
                <div className="text-sm font-semibold text-blue-900">WebCraft Labs HQ</div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  Las Vegas, NV & Remote<br />
                  <span className="font-semibold text-blue-900">hello@webcraftlabs.studio</span>
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
