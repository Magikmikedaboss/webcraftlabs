import { z } from 'zod';

export const BlogFrontmatterSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
  summary: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  author: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  image: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  // Enforce ISO date format YYYY-MM-DD and valid calendar date
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Date must be in YYYY-MM-DD format' })
    .refine(dateStr => {
      const [y, m, d] = dateStr.split('-').map(Number);
      const dt = new Date(Date.UTC(y, m - 1, d));
      return (
        dt.getUTCFullYear() === y &&
        dt.getUTCMonth() === m - 1 &&
        dt.getUTCDate() === d
      );
    }, { message: 'Date must be a valid calendar date in YYYY-MM-DD format' }),
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
}).superRefine((data, ctx) => {
  if (data.collection === 'webcraft-archive') {
    if (!data.mystery) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'mystery is required when collection is "webcraft-archive"',
        path: ['mystery'],
      });
    }
  }
}).superRefine((data, ctx) => {
  if (data.collection === 'webcraft-archive') {
    if (!data.archiveId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'archiveId is required when collection is "webcraft-archive"',
        path: ['archiveId'],
      });
      return;
    }
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
    }
  }
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
