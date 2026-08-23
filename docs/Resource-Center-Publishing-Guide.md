# Resource Center — Classification & Publishing Guide

The WebCraft Resource Center (`/knowledge`) organizes existing Blog and News
content into learning paths, a topic map, featured resources, "From the Lab"
project breakdowns, and "Projects & Experiments." It does **not** have its
own content pipeline — it reads from the same validated MDX loaders as the
rest of the site (`src/lib/mdx/blog.ts`, `src/lib/mdx/news.ts`) through one
query layer: `src/lib/resources.ts`.

## How a resource gets into the Resource Center

Add these optional fields to a Blog or News post's frontmatter. All of them
are optional at the schema level — existing content with none of these
fields stays valid — but **`resourceType` is the eligibility marker**:
`getAllResources()` (the query layer every Resource Center section reads
from) only includes posts that have it set. A post with `learningPath`,
`audience`, or `featured` but no `resourceType` still won't appear anywhere
in the Resource Center.

```yaml
resourceType: guide       # required for Resource Center eligibility — guide | tutorial | essay | build-log | experiment | announcement
audience: [founders]      # any of: developers, founders, business-owners, ai-adopters
learningPath: ai-workflow-automation
difficulty: beginner      # beginner | intermediate | advanced (optional, only where genuinely relevant)
relatedService: /services/ai-automation   # must be a relative internal path, validated by schema
featured: true            # optional — keep this to a small, genuinely strong selection
```

`learningPath` accepts one of:

- `modern-web-development`
- `ai-workflow-automation`
- `websites-that-grow-businesses`
- `experiments-emerging-ideas`
- `building-software-products` — **valid in the schema, but held back.** See
  below before using it.

## Where each field is consumed

| Field | Used by |
|---|---|
| `learningPath` | `getResourcesByPath()` — powers each `/knowledge/paths/[path]` page and the Learning Paths section |
| `audience` | `getResourcesByAudience()` — powers the "Find resources for you" section |
| `featured` | `getFeaturedResources()` — powers the Featured Resources section |
| `template: "lab"` (pre-existing field, not new) | `FromTheLab` section |
| `resourceType: "announcement"` | Renders a visible "Announcement" badge in Projects & Experiments |
| `relatedService` | Not yet rendered anywhere — reserved for a future "related service" callout. Safe to set now; has no effect until that's built |

## Activating "Building Software Products"

This path exists in the schema and in `LEARNING_PATH_META`
(`src/lib/resourcePathMeta.ts`, status: `"coming-soon"`) but has no page and
appears only as a restrained "Growing next" teaser — no fabricated resource
count, no active link.

To activate it once real content exists:

1. Set `learningPath: building-software-products` on at least one real,
   published resource.
2. In `src/lib/resources.ts`, add `"building-software-products"` to
   `ACTIVE_LEARNING_PATHS`.
3. In `src/lib/resourcePathMeta.ts`, set its `status` to `"active"` and add a
   `recommendedStart` slug (must be one of the resources now on that path —
   `resources.test.ts` will fail the build if it isn't).
4. The `/knowledge/paths/[path]` route and sitemap entry pick it up
   automatically — no route code changes needed.

Do the same in reverse to hold a path back if it ever runs out of real
content.

## Archive is never eligible

`getAllResources()` explicitly excludes `collection: "webcraft-archive"`.
This is not configurable per-resource — Archive fiction cannot enter the
Resource Center by setting any of the fields above.

## News vs. Blog in the Resource Center

News stays News — genuine company/product announcements. A News item can
appear in the Resource Center (most often under Projects & Experiments) but
should be tagged `resourceType: announcement` so it renders with a visible
"Announcement" badge rather than looking like an evergreen guide. Prefer
Blog content as the backbone of a learning path; use News sparingly, and
only where it provides necessary context (e.g., an origin story for a
project like Axon).

## Keeping counts honest

Every count shown anywhere in the Resource Center (`X resources on this
path`, `X published resources`, learning-path card counts) is computed live
from `getAllResources()` / `getResourcesByPath()` at build time — never
hardcoded. If you add or remove taxonomy fields from content, the counts
update automatically on the next build. Do not reintroduce a hardcoded
number anywhere in this section.
