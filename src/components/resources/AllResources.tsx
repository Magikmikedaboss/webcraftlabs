import { getAllResources, resourceHref, type ResourceItem } from "@/lib/resources";
import { RESOURCE_CATEGORIES, categoryForPath } from "@/lib/resourceCategories";
import AllResourcesClient, {
  type AllResourcesRow,
  type AllResourcesFilter,
} from "./AllResourcesClient";

/**
 * The canonical Resource Center listing: every resource, exactly once.
 *
 * This is the section that makes removing the audience panels and topic map
 * safe — before it existed, a resource's discoverability depended on how
 * many audience tags it happened to carry. Rows are built on the server
 * from getAllResources(), the same array the hero counts, so the displayed
 * count and this list can never disagree.
 */

/** Human label for a resource's type — News items are announcements/updates. */
function typeLabel(r: ResourceItem): string {
  if (r.type === "news") return "Announcement";
  const t = r.frontmatter.resourceType;
  if (!t) return "Resource";
  return t.charAt(0).toUpperCase() + t.slice(1).replace(/-/g, " ");
}

/** Server-side row projection — exported so tests can assert on it directly. */
export function buildRows(resources: readonly ResourceItem[]): AllResourcesRow[] {
  return resources.map((r) => {
    const category = categoryForPath(r.frontmatter.learningPath);
    const title = r.frontmatter.title;
    const description = r.frontmatter.description;
    const label = typeLabel(r);
    return {
      key: `${r.type}-${r.slug}`,
      slug: r.slug,
      title,
      description,
      href: resourceHref(r),
      typeLabel: label,
      categoryId: category?.id ?? null,
      categoryLabel: category?.label ?? null,
      haystack: [title, description ?? "", label, category?.label ?? ""]
        .join(" ")
        .toLowerCase(),
    };
  });
}

/**
 * "All" plus every category that actually has resources — a chip is never
 * shown for an empty category, and the counts come from the same rows the
 * list renders.
 */
export function buildFilters(rows: readonly AllResourcesRow[]): AllResourcesFilter[] {
  const filters: AllResourcesFilter[] = [{ id: "all", label: "All", count: rows.length }];
  for (const c of RESOURCE_CATEGORIES) {
    const count = rows.filter((r) => r.categoryId === c.id).length;
    if (count > 0) filters.push({ id: c.id, label: c.label, count });
  }
  return filters;
}

export default function AllResources() {
  const rows = buildRows(getAllResources());
  const filters = buildFilters(rows);

  return (
    <section id="all-resources" className="rc-canvas mx-auto max-w-7xl px-6 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="rc-eyebrow">All Resources</span>
        <h2 className="rc-h2 mt-4">Every resource in one place</h2>
        <p className="rc-body mt-3">
          The complete library — {rows.length} published resources, each listed once. Filter or
          search to narrow it down; nothing is hidden behind a category you have to guess.
        </p>
      </div>

      <AllResourcesClient rows={rows} filters={filters} />
    </section>
  );
}
