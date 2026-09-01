import SiteShell from "@/components/SiteShell";
import ResourceHero from "@/components/resources/ResourceHero";
import LearningPaths from "@/components/resources/LearningPaths";
import FeaturedResources from "@/components/resources/FeaturedResources";
import ResourceTools from "@/components/resources/ResourceTools";
import AllResources from "@/components/resources/AllResources";
import ArchivePointer from "@/components/resources/ArchivePointer";
import { SITE, getBaseUrl } from "@/lib/site";
import { getAllResources, resourceHref } from "@/lib/resources";

const DESCRIPTION =
  "Practical guides, technical tutorials, project breakdowns, and tools for developers, founders, business owners, and teams exploring AI automation.";

export const metadata = {
  title: "WebCraft Resource Center",
  description: DESCRIPTION,
  openGraph: {
    title: `WebCraft Resource Center | ${SITE.name}`,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `WebCraft Resource Center | ${SITE.name}`,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: `${getBaseUrl()}/knowledge`,
  },
};

export default function KnowledgePage() {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/knowledge`;
  const resources = getAllResources();

  /**
   * CollectionPage + ItemList describing the All Resources listing. Every
   * entry points at the resource's own canonical /blog or /news URL — the
   * Resource Center is a discovery layer and never republishes an article
   * body, so there is no duplicate content to disambiguate.
   */
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: "WebCraft Resource Center",
    description: DESCRIPTION,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}#website`, url: baseUrl },
    publisher: { "@type": "Organization", name: SITE.name, url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      name: "All Resources",
      numberOfItems: resources.length,
      itemListOrder: "https://schema.org/ItemListUnordered",
      itemListElement: resources.map((r, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${baseUrl}${resourceHref(r)}`,
        name: r.frontmatter.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Resource Center", item: url },
    ],
  };

  return (
    <SiteShell background="bg">
      <script
        id="knowledge-collection-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        id="knowledge-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="rc-root">
        <ResourceHero />
        <FeaturedResources />
        <LearningPaths />
        <ResourceTools />
        <AllResources />
        <ArchivePointer />
      </div>
    </SiteShell>
  );
}
