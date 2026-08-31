import { z } from 'zod';

/**
 * Resource Center taxonomy (Phase 3). All fields are optional so every
 * existing MDX file remains valid without edits — only resources that are
 * explicitly migrated into the Resource Center set these.
 */
export const RESOURCE_TYPES = ['guide', 'tutorial', 'essay', 'build-log', 'experiment', 'announcement'] as const;
export const AUDIENCES = ['developers', 'founders', 'business-owners', 'ai-adopters'] as const;
export const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'] as const;

/**
 * "building-software-products" is intentionally included as a valid value
 * now, even though no published resource uses it yet and no page exists for
 * it — it's a held-back path (see ACTIVE_LEARNING_PATHS in src/lib/resources.ts),
 * not a hypothetical field. Including it here avoids a second schema change
 * when the path activates later.
 */
export const LEARNING_PATHS = [
  'modern-web-development',
  'ai-workflow-automation',
  'websites-that-grow-businesses',
  'experiments-emerging-ideas',
  'building-software-products',
] as const;

/**
 * ISO `YYYY-MM-DD` string that must also be a real calendar date, so
 * "2026-02-30" is rejected rather than silently rolling over to March.
 * Shared by `date` and `updated` so both validate identically.
 */
const isoCalendarDate = (label: string) =>
  z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: `${label} must be in YYYY-MM-DD format` })
    .refine(dateStr => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(Date.UTC(y, m - 1, d));
      return (
        dt.getUTCFullYear() === y &&
        dt.getUTCMonth() === m - 1 &&
        dt.getUTCDate() === d
      );
    }, { message: `${label} must be a valid calendar date in YYYY-MM-DD format` });

export const BlogFrontmatterSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  summary: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  author: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  image: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  // Enforce ISO date format YYYY-MM-DD and valid calendar date
  date: isoCalendarDate('Date'),
  /**
   * Optional last-modified date. `date` always stays the original
   * publication date; this drives `dateModified` in the BlogPosting
   * JSON-LD and `modifiedTime` in the Open Graph article metadata.
   * Omit it and both fall back to `date` (see resolveArticleDates).
   */
  updated: isoCalendarDate('Updated date').optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  template: z.enum(["lab", "editorial"]).optional(),
  badge: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  pullQuote: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  // Prefer boolean published; accept a few legacy string tokens (case-insensitive)
  // Normalize legacy published string tokens to boolean true at the schema boundary.
  // Accept a real boolean, or accept a handful of legacy strings (case-insensitive)
  // which are converted to `true`. Any other string values are rejected.
  published: z.union([
    z.boolean(),
    z.string()
      .trim()
      .transform((v) => v.toLowerCase())
      .refine((v) => ['true', 'published', 'yes'].includes(v), { message: 'published must be boolean or one of true/published/yes' })
      .transform(() => true),
  ]).optional(),
  slug: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  series: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  archiveId: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  collection: z.union([z.literal('webcraft-archive'), z.literal('news'), z.literal('blog')]).optional(),
  mystery: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),

  // ── Archive taxonomy (Phase 3.5) ────────────────────────────────────
  /**
   * Discriminates the two sub-collections that share `collection:
   * "webcraft-archive"`: the institutional fiction universe (Investigations,
   * Treatises, Recovered Records) and the Synthetic Minds creative series.
   * Required whenever collection is "webcraft-archive" — see superRefine below.
   */
  archiveCollection: z.enum(['archive-universe', 'synthetic-minds']).optional(),
  workType: z.enum([
    'orientation',
    'investigation',
    'treatise',
    'recovered-record',
    'series-episode',
    'story',
    'poem',
    'experiment',
  ]).optional(),
  seriesOrder: z.number().int().positive().optional(),
  /** Controlled/trimmed array — never one unrestricted combined sentence. */
  contentWarnings: z.array(z.string().trim().min(1)).optional(),

  // ── Resource Center taxonomy (Phase 3) ──────────────────────────────
  resourceType: z.enum(RESOURCE_TYPES).optional(),
  audience: z.array(z.enum(AUDIENCES)).optional(),
  learningPath: z.enum(LEARNING_PATHS).optional(),
  difficulty: z.enum(DIFFICULTIES).optional(),
  /**
   * Opt-in flag for articles that contain affiliate links. Setting it to
   * true is the *only* thing an author does to get a disclosure: the
   * article template renders <AffiliateDisclosure /> above the fold on its
   * own (see EditorialTemplateV2), so the wording stays identical
   * everywhere and can never be forgotten on an individual article.
   * Optional and absent everywhere today — omitting it, or setting it to
   * false, renders exactly as before.
   */
  affiliate: z.boolean().optional(),
  /** Internal path only (e.g. "/services/ai-automation") — never an external/arbitrary URL. */
  relatedService: z.string().trim().optional().transform(v => (v === "" ? undefined : v))
    .refine(v => v === undefined || /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(v), {
      message: 'relatedService must be a relative internal path, e.g. "/services/ai-automation"',
    }),
}).superRefine((data, ctx) => {
  // A revision cannot predate publication. Both fields are already validated
  // as ISO YYYY-MM-DD, so a lexicographic compare is also a chronological one.
  // Guarded on both being strings because superRefine still runs when an
  // individual field failed its own validation.
  if (
    typeof data.date === 'string' &&
    typeof data.updated === 'string' &&
    data.updated < data.date
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Updated date (${data.updated}) cannot be earlier than the publication date (${data.date})`,
      path: ['updated'],
    });
  }

  if (data.collection !== 'webcraft-archive') return;

  if (!data.archiveCollection) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'archiveCollection is required when collection is "webcraft-archive"',
      path: ['archiveCollection'],
    });
    return;
  }

  if (data.archiveCollection === 'archive-universe') {
    if (!data.mystery) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'mystery is required when archiveCollection is "archive-universe"',
        path: ['mystery'],
      });
    }
    let expectedWorkType: typeof data.workType | undefined;
    if (!data.archiveId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'archiveId is required when archiveCollection is "archive-universe"',
        path: ['archiveId'],
      });
    } else {
      const validPrefixes = ['Investigation', 'Treatise', 'Recovered Record'];
      const isValid =
        validPrefixes.some(p => data.archiveId!.startsWith(p)) ||
        data.archiveId === 'Orientation';
      if (!isValid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'archiveId must start with "Investigation", "Treatise", or "Recovered Record", or be exactly "Orientation"',
          path: ['archiveId'],
        });
      } else {
        expectedWorkType = data.archiveId === 'Orientation' ? 'orientation'
          : data.archiveId.startsWith('Investigation') ? 'investigation'
          : data.archiveId.startsWith('Treatise') ? 'treatise'
          : 'recovered-record';
      }
    }

    if (!data.workType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'workType is required when archiveCollection is "archive-universe"',
        path: ['workType'],
      });
    } else if (expectedWorkType && data.workType !== expectedWorkType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `workType must be "${expectedWorkType}" for archiveId "${data.archiveId}"`,
        path: ['workType'],
      });
    }
    return;
  }

  if (data.archiveCollection === 'synthetic-minds') {
    // Institutional fields are deliberately not required here — Synthetic
    // Minds is a creative series, not an institutional record, and should
    // not need a fabricated archiveId/mystery to satisfy validation.
    if (data.series !== 'Synthetic Minds') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'series must be exactly "Synthetic Minds" when archiveCollection is "synthetic-minds"',
        path: ['series'],
      });
    }
    if (data.seriesOrder === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'seriesOrder is required when archiveCollection is "synthetic-minds"',
        path: ['seriesOrder'],
      });
    }
    if (data.workType !== 'series-episode') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'workType must be "series-episode" when archiveCollection is "synthetic-minds"',
        path: ['workType'],
      });
    }
  }
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
