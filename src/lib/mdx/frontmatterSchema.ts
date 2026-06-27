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
  published: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  slug: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
  series: z.string().trim().optional().transform(v => (v === "" ? undefined : v)),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
