# WebCraft Archive — Creative Works & Experiments: Publishing Guide

The Archive (`/archive`) is WebCraft Labz's creative wing — speculative
fiction, experimental narratives, and unconventional digital work. It has its
own physical content directory (`src/content/archive/`) but **does not have
its own content pipeline**: it reuses the same validated MDX parsing, Zod
schema, and publish-cutoff gating as Blog and News, through
`src/lib/mdx/archive.ts`.

## Two collections, one directory

Every file in `src/content/archive/` carries `collection: webcraft-archive`,
plus a required `archiveCollection` discriminator that decides which of the
two sub-collections it belongs to:

- `archiveCollection: archive-universe` — the institutional fiction universe
  (Investigations, Treatises, Recovered Records, the Orientation piece).
  Feeds `/archive/institutions`, `/archive/glossary`, `/archive/timeline`,
  and the citation graph.
- `archiveCollection: synthetic-minds` — the Synthetic Minds creative series.
  Ordered by `seriesOrder`, not by institutional record type. Has no
  institutions, no citations, no evidence controls.

These two collections never mix. A document belongs to exactly one.

## Institutional Archive Universe documents

```yaml
collection: webcraft-archive
archiveCollection: archive-universe
archiveId: Investigation 204   # must start with Investigation | Treatise | Recovered Record, or be exactly "Orientation"
mystery: What question does this document raise?   # required
workType: investigation         # investigation | treatise | recovered-record | orientation
```

`archiveId` and `mystery` are both required and validated by
`BlogFrontmatterSchema`'s `superRefine` — the build fails without them.

## Synthetic Minds episodes

```yaml
collection: webcraft-archive
archiveCollection: synthetic-minds
series: Synthetic Minds          # required, must be exactly this string
seriesOrder: 7                    # required, positive integer, must be unique
workType: series-episode           # required, fixed value
author: WebCraft Labz
```

`archiveId` and `mystery` are **not** required here — Synthetic Minds is a
creative series, not an institutional record, and forcing a fabricated
archiveId onto it would misrepresent what it is. The schema enforces this
directly: setting `archiveCollection: synthetic-minds` makes `series`,
`seriesOrder`, and `workType: series-episode` required instead.

## The series overview stays in Blog

`src/content/blog/synthetic-minds-series.mdx` is the one exception: it's the
editorial introduction and series guide, and it deliberately stays a
`collection: blog` post so it remains eligible for the Resource Center
(`resourceType: experiment`, `featured: true`). Its body links to the six
canonical episodes at their `/archive/episode-*` URLs. Do not duplicate
episode content back into this file — it introduces the series and points
readers into the Archive, nothing more.

## Adding a new Archive document

1. Drop the `.mdx` file into `src/content/archive/`.
2. Set `collection: webcraft-archive` and the appropriate `archiveCollection`.
3. Archive Universe: add the slug to `src/lib/archive-order.json` (controls
   reading order, prev/next, and inclusion in `/archive/catalog`,
   `/archive/timeline`). Optionally reference it from `COLLECTION_THEMES` or
   `INSTITUTIONS` in `src/lib/archive.ts`.
4. Synthetic Minds: just set a unique `seriesOrder` — no order file to edit.
5. Run the test suite (`src/lib/archive.test.ts`,
   `src/lib/mdx/archive.test.ts`) — it enforces slug resolution, unique
   positive `seriesOrder`, and that the two sub-collections never leak into
   each other's utility pages.

## What's shared vs. Archive-specific

| Shared with Blog/News | Archive-specific |
|---|---|
| `BlogFrontmatterSchema` (Zod) | `archiveCollection`, `workType`, `seriesOrder`, `contentWarnings` fields |
| Publish-cutoff gating (`laPublishCutoff`) | `ARCHIVE_ORDER`, `INSTITUTIONS`, `GLOSSARY`, `COLLECTION_THEMES` (`src/lib/archive.ts`) |
| MDX rendering, `mdxComponents`, reading-time calculation | `getArchiveUniversePosts()` / `getSyntheticMindsEpisodes()` query split |
| `gray-matter` parsing | The 8 Archive utility pages (`/archive/*`) |

## Archive never enters the Resource Center

`src/lib/resources.ts`'s `isRealResource()` excludes anything with
`collection === "webcraft-archive"` — that's every document in
`src/content/archive/`, both sub-collections, unconditionally. The only
Archive-adjacent content in the Resource Center is the Blog-collection
`synthetic-minds-series.mdx` overview described above.
