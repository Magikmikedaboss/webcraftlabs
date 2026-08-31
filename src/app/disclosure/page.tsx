import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl, SITE } from "@/lib/site";

const DISCLOSURE_DESCRIPTION =
  "How WebCraft Labz handles affiliate links, commissions, and paid placements — and why they never decide what we recommend.";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: DISCLOSURE_DESCRIPTION,
  openGraph: {
    title: `Affiliate Disclosure | ${SITE.name}`,
    description: DISCLOSURE_DESCRIPTION,
    type: "website",
    url: `${getBaseUrl()}/disclosure`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Affiliate Disclosure | ${SITE.name}`,
    description: DISCLOSURE_DESCRIPTION,
  },
  alternates: {
    canonical: `${getBaseUrl()}/disclosure`,
  },
};

function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold tracking-tight text-[var(--text)] sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-[15px] leading-7 text-[var(--muted)]">
        {children}
      </div>
    </section>
  );
}

export default function DisclosurePage() {
  return (
    <SiteShell
      background="bg"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Affiliate Disclosure" },
      ]}
      title="Affiliate Disclosure"
      intro="What our outbound links are, what they aren't, and what they never influence."
    >
      {/* Same mx-auto max-w-7xl px-6 wrapper SiteShell uses for the title
          block, so the body copy lines up with the h1 above it instead of
          floating in its own centered column. */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="max-w-3xl">
          <Section heading="Some links may earn us a commission">
            <p>
              WebCraft Labz may participate in affiliate programs run by the
              software vendors, hosting providers, and other services we write
              about. When an article contains affiliate links, some outbound
              links may generate a commission if you sign up or make a purchase
              after clicking one.
            </p>
            <p>
              A commission never increases your price. You pay the vendor
              exactly what you would have paid arriving there any other way, and
              in some cases an affiliate link carries a discount that a direct
              visit does not.
            </p>
          </Section>

          <Section heading="Affiliate relationships do not decide what we recommend">
            <p>
              This is the part that matters. What we recommend is decided on
              usefulness and fit for the job being described. Whether a vendor
              happens to run an affiliate program, and what it pays, is not an
              input to that decision — and a tool with no affiliate program at
              all is recommended on exactly the same terms as one that has a
              generous program.
            </p>
            <p>
              We will not remove, downgrade, or soften an honest assessment of a
              product because of a commercial relationship, and we will not add
              a recommendation because one exists.
            </p>
          </Section>

          <Section heading="Not every link is an affiliate link">
            <p>
              Most outbound links on this site are ordinary references —
              documentation, source material, and tools we are simply pointing
              at. Those are not affiliate links and earn us nothing.
            </p>
            <p>
              Where an article does contain affiliate links, a disclosure
              appears near the top of that article, before the links it covers.
              If you do not see that disclosure, the article has no affiliate
              links in it.
            </p>
          </Section>

          <Section heading="Sponsorships and paid placements">
            <p>
              An affiliate commission is paid after a reader chooses to buy
              something. It is not the same as being paid to publish. If we ever
              accept a sponsorship, a paid placement, or compensation for
              coverage itself, it will be labeled as such directly on the page
              where it appears — clearly and separately from this affiliate
              disclosure. We will not present paid coverage as independent
              editorial.
            </p>
          </Section>

          <Section heading="Pricing and offers change">
            <p>
              Prices, free tiers, usage limits, and plan names in our articles
              reflect what we found when the article was written or last
              updated. Vendors change these regularly and without notice. Always
              confirm current pricing and terms on the vendor&apos;s own site
              before you commit to anything — our figures are a starting point
              for comparison, not a quote.
            </p>
          </Section>

          <Section heading="Questions">
            <p>
              If anything here is unclear, or you want to know whether a
              specific link is an affiliate link, just ask — we will tell you.{" "}
              <Link
                href="/contact"
                className="font-semibold text-[var(--primary)] underline underline-offset-2 transition hover:opacity-80"
              >
                Get in touch
              </Link>
              .
            </p>
          </Section>
        </div>
      </div>
    </SiteShell>
  );
}
