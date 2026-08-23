import Link from "next/link";
import { getFeaturedResources, resourceHref } from "@/lib/resources";

/** Driven entirely by frontmatter.featured === true — a small, curated set, never everything. */
export default function FeaturedResources() {
  const featured = getFeaturedResources();

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Featured Resources</span>
        <h2 className="rc-h2 mt-4">Start with these</h2>
        <p className="rc-body mt-3">A small selection of the resources we&apos;d point you to first.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-2">
        {featured.map((r) => (
          <Link key={`${r.type}-${r.slug}`} href={resourceHref(r)} className="rc-card rc-card-featured rc-card-link">
            <div className="rc-card-eyebrow">{r.type === "news" ? "Announcement" : r.frontmatter.resourceType ?? "Resource"}</div>
            <h3 className="rc-card-title mt-2">{r.frontmatter.title}</h3>
            <p className="rc-card-body mt-2">{r.frontmatter.description}</p>
            <span className="rc-card-cta">Read →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
