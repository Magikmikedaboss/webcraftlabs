import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { getBaseUrl, SITE } from "@/lib/site";
import { getAllResources, resourceHref } from "@/lib/resources";
import {
  STACK_TRACKS,
  STACK_CRITERIA,
  DECISION_TOPICS,
  RELATED_RESOURCE_SLUGS,
} from "@/lib/stacks/config";
import { isPublished } from "@/lib/stacks/types";

const DESCRIPTION =
  "There is no best tech stack — only one that matches what you're building. Practical technology combinations for SaaS products, MVPs, AI applications, and marketing sites.";

export const metadata: Metadata = {
  title: "Developer Stack Library",
  description: DESCRIPTION,
  openGraph: {
    title: `Developer Stack Library | ${SITE.name}`,
    description: DESCRIPTION,
    type: "website",
    url: `${getBaseUrl()}/knowledge/developer-stacks`,
  },
  twitter: {
    card: "summary_large_image",
    title: `Developer Stack Library | ${SITE.name}`,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: `${getBaseUrl()}/knowledge/developer-stacks`,
  },
};

function Section({
  eyebrow,
  heading,
  intro,
  children,
}: {
  eyebrow: string;
  heading: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">{eyebrow}</span>
        <h2 className="rc-h2 mt-4">{heading}</h2>
        {intro && <p className="rc-body mt-3">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DeveloperStacksPage() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/knowledge/developer-stacks`;

  // Resolved against real published content: a slug that stops existing
  // drops out of the list rather than rendering as a dead link.
  const bySlug = new Map(getAllResources().map((r) => [r.slug, r]));
  const related = RELATED_RESOURCE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (r) => r !== undefined
  );

  /**
   * CollectionPage without an ItemList, deliberately.
   *
   * No stack guide is published yet, so there is no list of real URLs to
   * describe. Emitting an ItemList of planned tracks would tell search
   * engines that pages exist which do not. The ItemList arrives with the
   * first published guide.
   */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: "Developer Stack Library",
    description: DESCRIPTION,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}#website`, url: baseUrl },
    publisher: { "@type": "Organization", name: SITE.name, url: baseUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Resource Center", item: `${baseUrl}/knowledge` },
      { "@type": "ListItem", position: 3, name: "Developer Stack Library", item: url },
    ],
  };

  return (
    <SiteShell
      background="bg"
      title="Developer Stack Library"
      intro="There is no universal best stack. The right one depends on what you're building, how fast you need to ship, how much infrastructure you want to run, and what happens if it works."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Resource Center", href: "/knowledge" },
        { label: "Developer Stack Library" },
      ]}
    >
      <script
        id="stacks-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        id="stacks-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="rc-root">
        <Section
          eyebrow="Choose by build type"
          heading="Start from what you're building"
          intro="Each track covers one common kind of build: what it optimises for, what it costs you, and where it stops being the right choice."
        >
          <ul className="grid gap-5 md:grid-cols-2">
            {STACK_TRACKS.map((track) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="rc-card-title">{track.title}</h3>
                    {!isPublished(track) && (
                      <span className="rc-badge-muted">Guide coming next</span>
                    )}
                  </div>
                  <p className="rc-card-body mt-2">{track.description}</p>
                  <dl className="mt-4 flex flex-col gap-1 text-sm">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-[var(--text)]">For:</dt>
                      <dd className="text-[var(--muted)]">{track.useCase}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-[var(--text)]">Shape:</dt>
                      <dd className="text-[var(--muted)]">{track.shape}</dd>
                    </div>
                  </dl>
                </>
              );

              // Planned tracks render as plain cards. The type makes an href
              // unrepresentable while planned, so there is no way to emit a
              // link to a guide that doesn't exist.
              return (
                <li key={track.id}>
                  {isPublished(track) ? (
                    <Link href={track.href} className="rc-card rc-card-link block h-full">
                      {body}
                      <span className="rc-card-cta mt-4">Read the guide →</span>
                    </Link>
                  ) : (
                    <div className="rc-card h-full">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section
          eyebrow="How we evaluate"
          heading="What every stack guide has to answer"
          intro="Published so you can check the work. A guide that skips these isn't a comparison, it's a preference."
        >
          <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
            {STACK_CRITERIA.map((c) => (
              <div key={c.id}>
                <dt className="rc-card-title text-base">{c.label}</dt>
                <dd className="rc-card-body mt-1">{c.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section
          eyebrow="Technology decision guides"
          heading="The choices that recur across every stack"
          intro="Some decisions come up whatever you're building. These get their own comparisons rather than being re-argued in each guide — none are published yet, so this is what the library will cover."
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {DECISION_TOPICS.map((t) => (
              <li key={t.id} className="rc-card">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="rc-card-title">{t.label}</h3>
                  {t.status === "planned" && <span className="rc-badge-muted">Planned</span>}
                </div>
                <p className="rc-card-body mt-2">{t.detail}</p>
              </li>
            ))}
          </ul>
        </Section>

        <section className="rc-canvas mx-auto max-w-7xl px-6 pb-4">
          <div className="rc-panel-muted max-w-3xl">
            <span className="rc-eyebrow">Planned tool</span>
            <h2 className="rc-h3 mt-2">An interactive Stack Builder</h2>
            <p className="rc-body-muted mt-2">
              A short set of questions — what you&apos;re building, team size, how fast you need to
              launch — that points at one of the tracks above. It isn&apos;t built yet, and there is
              nothing to click. When it exists it will appear alongside the Build Calculator under{" "}
              <Link href="/knowledge#tools" className="rc-inline-link">
                Tools
              </Link>
              .
            </p>
          </div>
        </section>

        {related.length > 0 && (
          <Section
            eyebrow="Before you choose a stack"
            heading="Related reading that already exists"
            intro="Choosing tools is the second question. These cover the first one."
          >
            <ul className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <li key={`${r.type}-${r.slug}`}>
                  <Link href={resourceHref(r)} className="rc-card rc-card-link block h-full">
                    <h3 className="rc-card-title">{r.frontmatter.title}</h3>
                    <p className="rc-card-body mt-2">{r.frontmatter.description}</p>
                    <span className="rc-card-cta mt-4">Read →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <section className="rc-canvas mx-auto max-w-7xl px-6 pb-16">
          <p className="rc-body max-w-3xl">
            Every resource on this site is listed in one place — see{" "}
            <Link href="/knowledge#all-resources" className="rc-inline-link">
              All Resources
            </Link>
            . Stack guides will appear there automatically as they publish.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
