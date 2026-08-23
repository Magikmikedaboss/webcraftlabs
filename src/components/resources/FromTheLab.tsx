import Link from "next/link";
import { getAllResources, resourceHref } from "@/lib/resources";

/** "From the Lab" = resources authored with the existing `template: "lab"` format. */
export default function FromTheLab() {
  const labResources = getAllResources().filter((r) => r.frontmatter.template === "lab");

  if (labResources.length === 0) return null;

  return (
    <section className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">From the Lab</span>
        <h2 className="rc-h2 mt-4">Project breakdowns and build logs</h2>
        <p className="rc-body mt-3">
          Real setup and build notes from our own work — not polished case studies, working notes.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {labResources.map((r) => (
          <Link key={`${r.type}-${r.slug}`} href={resourceHref(r)} className="rc-card rc-card-link">
            <h3 className="rc-card-title">{r.frontmatter.title}</h3>
            <p className="rc-card-body">{r.frontmatter.description}</p>
            <span className="rc-card-cta">Read the breakdown →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
