import Link from "next/link";
import { getResourcesByPath, resourceHref, type ResourceItem } from "@/lib/resources";

function Group({ label, items }: { label: string; items: ResourceItem[] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="rc-h3">{label}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((r) => (
          <Link key={`${r.type}-${r.slug}`} href={resourceHref(r)} className="rc-card rc-card-link">
            <div className="flex items-center justify-between gap-2">
              <h4 className="rc-card-title">{r.frontmatter.title}</h4>
              {r.frontmatter.resourceType === "announcement" && (
                <span className="rc-badge-muted">Announcement</span>
              )}
            </div>
            <p className="rc-card-body">{r.frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Axon and Synthetic Minds live here, not as the centerpiece of the
 * Resource Center. Archive fiction never enters this section — it's
 * sourced entirely from getResourcesByPath(), which already excludes the
 * webcraft-archive collection.
 */
export default function ProjectsAndExperiments() {
  const resources = getResourcesByPath("experiments-emerging-ideas");

  const projectsAndResearch = resources.filter((r) => r.frontmatter.resourceType === "announcement");
  const series = resources.filter((r) => r.frontmatter.resourceType === "experiment");
  const essays = resources.filter((r) => r.frontmatter.resourceType === "essay");

  if (resources.length === 0) return null;

  return (
    <section className="rc-canvas-dark mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow-on-dark">Projects &amp; Experiments</span>
        <h2 className="rc-h2-on-dark mt-4">Where we explore past client work</h2>
        <p className="rc-body-on-dark mt-3">
          Research notes, a creative series, and essays — clearly separate from commercial work, not
          presented as finished products or client results.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <Group label="Projects & Research" items={projectsAndResearch} />
        <Group label="Series" items={series} />
        <Group label="Essays & Emerging Ideas" items={essays} />
      </div>
    </section>
  );
}
