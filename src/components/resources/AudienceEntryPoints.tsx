import Link from "next/link";
import { getResourcesByAudience, resourceHref } from "@/lib/resources";
import type { AUDIENCES } from "@/lib/mdx/frontmatterSchema";

const ENTRY_POINTS: { id: string; audience: (typeof AUDIENCES)[number]; label: string; description: string }[] = [
  {
    id: "for-developers",
    audience: "developers",
    label: "Developers",
    description: "Tooling, build logs, and technical write-ups.",
  },
  {
    id: "for-founders",
    audience: "founders",
    label: "Founders & Product Teams",
    description: "Where automation, AI, and product decisions actually meet.",
  },
  {
    id: "for-business-owners",
    audience: "business-owners",
    label: "Business Owners",
    description: "Straight answers on websites, cost, and conversion.",
  },
  {
    id: "for-ai-adopters",
    audience: "ai-adopters",
    label: "AI & Automation Adopters",
    description: "Practical looks at what AI changes — and what it doesn't.",
  },
];

export default function AudienceEntryPoints() {
  return (
    <section className="rc-canvas px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-2xl">
          <span className="rc-eyebrow">Start here</span>
          <h2 className="rc-h2 mt-4">Find resources for you</h2>
          <p className="rc-body mt-3">Four starting points into the same library of real, published resources.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {ENTRY_POINTS.map((entry) => (
            <Link key={entry.id} href={`#${entry.id}`} className="rc-card rc-card-link">
              <h3 className="rc-card-title">{entry.label}</h3>
              <p className="rc-card-body">{entry.description}</p>
              <span className="rc-card-cta">Jump to resources →</span>
            </Link>
          ))}
        </div>

        <div id="for-you" className="mt-10 grid gap-8 lg:grid-cols-2">
          {ENTRY_POINTS.map((entry) => {
            const resources = getResourcesByAudience(entry.audience).slice(0, 4);
            return (
              <div key={entry.id} id={entry.id} className="rc-panel scroll-mt-24">
                <h3 className="rc-panel-title">{entry.label}</h3>
                {resources.length === 0 ? (
                  <p className="rc-body mt-2">
                    No resources are tagged for this audience yet — check back soon.
                  </p>
                ) : (
                  <ul className="mt-4 flex flex-col gap-2">
                    {resources.map((r) => (
                      <li key={`${r.type}-${r.slug}`}>
                        <Link href={resourceHref(r)} className="rc-inline-link">
                          {r.frontmatter.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
