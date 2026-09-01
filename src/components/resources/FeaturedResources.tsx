import Link from "next/link";
import { getFeaturedResources, resourceHref } from "@/lib/resources";

/** Driven entirely by frontmatter.featured === true — a small, curated set, never everything. */
export default function FeaturedResources() {
  const featured = getFeaturedResources();

  if (featured.length === 0) return null;

  return (
    <section id="start-here" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">Start here</span>
        <h2 className="rc-h2 mt-4">Three resources to start with</h2>
        <p className="rc-body mt-3">
          If you read nothing else, read these — the practical starting points for a website, a
          software decision, and AI.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
