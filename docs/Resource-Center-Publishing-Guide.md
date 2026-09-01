# Resource Center — Classification & Publishing Guide

The WebCraft Resource Center (`/knowledge`) organizes existing Blog and News
content into a hero, a "Start here" trio, goal lanes, tools, and the
canonical **All Resources** listing. It does **not** have its own content
pipeline — it reads from the same validated MDX loaders as the rest of the
site (`src/lib/mdx/blog.ts`, `src/lib/mdx/news.ts`) through one query layer:
`src/lib/resources.ts`.

The page order is: Hero → Start Here → **Browse by Goal** → Tools → All
Resources → Archive pointer.

**Visible UI says "Browse by Goal". The frontmatter field is still
`learningPath`.** That naming split is deliberate: `learningPath` remains the
taxonomy primitive in content and code, while what a visitor sees is framed
as the goal they are trying to achieve ("Build a Better Website"), not the
internal label. Do not rename the field.

**Every eligible resource appears in All Resources exactly once**, whatever
else is set on it. The other sections are curation on top of that listing,
not alternative routes into it — so a resource is never invisible because it
lacks a particular tag, and never duplicated because it has several.

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
- `building-software-products` — **active as of Phase 4.**
- `developer-stacks` — backs the Developer Stack Library. **Hub-backed: it has
  no `/knowledge/paths/` route.** See below.

## Where each field is consumed

| Field | Used by |
|---|---|
| `resourceType` | Eligibility for the whole Resource Center, and the type label on each All Resources row |
| `learningPath` | `getResourcesByPath()` — powers each `/knowledge/paths/[path]` page, and decides which goal lane (if any) a resource belongs to via `RESOURCE_GOALS` in `src/lib/resourceGoals.ts`. **Also decides the All Resources category chip**, via `RESOURCE_CATEGORIES` in `src/lib/resourceCategories.ts` |
| `featured` | `getFeaturedResources(START_HERE_LIMIT)` — powers **Start here**. The section is capped at **3 cards** (`START_HERE_LIMIT` in `FeaturedResources.tsx`), taken in `getAllResources()` order, which is newest-first. Flagging a fourth resource does **not** add a fourth card — it competes for the three slots, and whichever falls outside them simply doesn't appear there. Treat `featured` as an editorial decision about those three slots, not a tag |
| `audience` | Metadata only. Kept for filtering, recommendations, related content, and SEO — it **no longer drives any visible section**. Setting it is still worthwhile; it will not change what renders today |
| `template: "lab"` (pre-existing field, not new) | The Lab Notebook article template at `/blog/<slug>`. It no longer drives a Resource Center section |
| `relatedService` | Not yet rendered anywhere — reserved for a future "related service" callout. Safe to set now; has no effect until that's built |

### Category chips in All Resources

Chips are derived from `learningPath`, never from individual slugs:

| Category | Learning path |
|---|---|
| Websites | `websites-that-grow-businesses` |
| Software | `building-software-products` |
| Development | `modern-web-development` |
| AI & Automation | `ai-workflow-automation` |

A chip only renders when that category actually has resources. A path with
no category mapping — currently `experiments-emerging-ideas` — still appears
in All Resources under **All** and in search, just without a chip. To add or
remap a category, edit `RESOURCE_CATEGORIES`; nothing else needs changing.

## Goal lanes: not every path becomes one

`RESOURCE_GOALS` (`src/lib/resourceGoals.ts`) is the single source for what
Browse by Goal shows. Three concepts are kept separate on purpose:

| Concept | Lives in | Means |
|---|---|---|
| The taxonomy value | `learningPath` frontmatter | which path a resource is on |
| Route exists | `ACTIVE_LEARNING_PATHS` (`src/lib/resources.ts`) | `/knowledge/paths/<path>` renders and is in the sitemap |
| Visibly promoted | `RESOURCE_GOALS` | a card appears in Browse by Goal |

**Route existence must never depend on visible promotion.** Removing a lane
from navigation must not turn a working URL into a 404 — that is why the two
lists are separate rather than one list doing both jobs.

A path earns a visible goal lane only when **both** are true:

1. It has several genuinely related resources. A one-resource path is not a
   sequence and must not be promoted — `modern-web-development` is routable
   and has an All Resources category, but no lane.
2. There is an intentional order someone would actually read them in, written
   out in `sequence`.

**Publish date is not a teaching order.** The website lane runs diagnose →
structure → cost, which is deliberately *not* newest-first; ordering it by
date would teach it backwards. Always write the order out explicitly.

A content bucket is not a learning sequence. `experiments-emerging-ideas`
groups creative and speculative pieces that were never meant to be read in
order, so it is routable but not promoted.

### Sequences do not have to include everything on the path

`sequence` lists only the resources that belong in the taught progression.
Anything else on that path still appears once in All Resources, and the path
page lists it under **More on this topic** — nothing is dropped. Use this
when a resource is more editorial or speculative than instructional:
"The Invisible Workforce" sits on the AI path but outside its sequence,
because including it would make the lane less coherent.

The recommended starting point is always `sequence[0]` — derived, never
configured twice.

## Developer Stacks: a hub-backed goal lane

The Developer Stack Library is the one lane whose canonical destination is a
dedicated page rather than a path listing.

| | |
|---|---|
| Canonical hub | `/knowledge/developer-stacks` |
| Taxonomy value | `learningPath: developer-stacks` |
| Path route | **none — deliberately** |
| Guides publish at | `/blog/<slug>`, like every other resource |

**Do not add `developer-stacks` to `ACTIVE_LEARNING_PATHS`.** Doing so would
generate `/knowledge/paths/developer-stacks`, a second listing competing with
the hub for the same content. One canonical destination, not two.

`RESOURCE_GOALS` models this with a discriminated union: a `destination: "path"`
goal resolves to its path page and must declare a `sequence`; a
`destination: "hub"` goal carries its own `href` and has no sequence, because
no stack guide is published yet. Components call `goalDestination(goal)` — no
component special-cases a lane.

### Publishing a stack guide

1. Write it as an ordinary blog post at `/blog/<slug>`.
2. Set `resourceType: guide` (there is no stack-specific resourceType) and
   `learningPath: developer-stacks`.
3. Set `audience` to `developers`, `founders`, or both.
4. Use `tags` for tool-level concepts — `next-js`, `supabase`, `neon`,
   `postgres`, `vercel`, `stripe`, `resend`, `sentry`, `posthog`. Tags are the
   tool-level discovery layer; **do not add tool-specific frontmatter fields.**
5. In `src/lib/stacks/config.ts`, flip that track's `status` to `"published"`
   and add its `href`. Nothing else changes.

**All Resources picks the guide up automatically** — it derives from the
content collections, never from the stack config.

### Unpublished tracks are never represented as live resources

`STACK_TRACKS` uses the same published/planned discipline as everything else,
enforced by types: a `planned` track has `href?: undefined`, so it is
impossible to give one a destination. Planned tracks render as non-clickable
cards marked "Guide coming next", and the hub's `CollectionPage` JSON-LD
carries **no `ItemList`** until real guides exist — advertising URLs that
don't resolve is worse than an empty section.

### Affiliate participation is optional and never editorial

Stack guides may eventually carry affiliate links via `<AffiliateLink>` and
`affiliate: true` (see the affiliate disclosure infrastructure). If they do:
**affiliate status must never influence which stack or tool is recommended.**
A vendor with no affiliate program is assessed on exactly the same terms as
one with a generous program. The hub publishes its evaluation criteria for
this reason — so a reader can check the reasoning rather than trust a verdict.

## Creative and speculative work

The Resource Center is for practical guides, technical education, business
and software decisions, AI education, and tools. Creative, speculative, and
experimental writing is pointed at via a single Archive link near the bottom
of the page rather than promoted with its own section.

Such content is still eligible for the Resource Center and still appears
once in All Resources — but **do not set `featured: true` on it**, since
Start here is reserved for practical starting points.

## Activating a held-back path

`building-software-products` was activated in Phase 4 (three real,
published guides: MVP vs. Prototype vs. Production Application, Custom
Software vs. Off-the-Shelf Tools, and What Drives the Cost of a SaaS MVP in
2026), following the same procedure documented here — kept for the next
path that needs it:

1. Set `learningPath: <path>` on at least one real, published resource.
2. In `src/lib/resources.ts`, add the path to `ACTIVE_LEARNING_PATHS`. This
   creates the route and the sitemap entry — it does **not** promote it into
   Browse by Goal.
3. In `src/lib/resourcePathMeta.ts`, set its `status` to `"active"` and add a
   `recommendedStart` slug (must be one of the resources now on that path —
   `resources.test.ts` will fail the build if it isn't).
4. The `/knowledge/paths/[path]` route and sitemap entry pick it up
   automatically — no route code changes needed.
5. Decide whether the new path needs an All Resources category chip. If so,
   add it to `RESOURCE_CATEGORIES` in `src/lib/resourceCategories.ts`; if
   not, its resources still appear under **All**.
6. Decide whether it deserves a visible goal lane. Only add an entry to
   `RESOURCE_GOALS` once it has several related resources *and* an
   intentional `sequence`. Skipping this step is a valid outcome — the route
   works either way.

> The "coming soon" teaser this list used to mention was removed — it had
> become dead code, gated on a `status` that was already `"active"`. Don't
> reintroduce a hardcoded teaser; an empty path simply has no card.

Do the same in reverse to hold a path back if it ever runs out of real
content.

## Archive is never eligible

`getAllResources()` explicitly excludes `collection: "webcraft-archive"`.
This is not configurable per-resource — Archive fiction cannot enter the
Resource Center by setting any of the fields above.

## News vs. Blog in the Resource Center

News stays News — genuine company/product announcements. A News item can
appear in the Resource Center and should be tagged
`resourceType: announcement`, which renders an "Announcement" label on its
All Resources row rather than letting it look like an evergreen guide. Prefer
Blog content as the backbone of a learning path; use News sparingly, and
only where it provides necessary context (e.g., an origin story for a
project like Axon).

## Keeping counts honest

There are two kinds of count on this page, and they are not the same thing.

**Build-time totals** — `X published resources` in the hero, learning-path
card counts, `X resources on this path`, and the All Resources category chip
counts. These are computed at build time from `getAllResources()` /
`getResourcesByPath()` and never hardcoded. Add or remove taxonomy fields on
content and they update on the next build.

**A client-side filtered count** — `Showing X of Y` in All Resources.
`AllResourcesClient.tsx` computes this in the browser from whatever search
term and category are currently selected, so **X changes as the visitor
filters**. `Y` is the build-time total, so `Showing Y of Y` is the unfiltered
state. Don't quote `X` anywhere as though it were a total.

Do not reintroduce a hardcoded number for either kind. The "Published
resources" stat and the All Resources listing read the *same* array, and a
test asserts the displayed number equals the number of unique rows
rendered — so those two can never disagree.
