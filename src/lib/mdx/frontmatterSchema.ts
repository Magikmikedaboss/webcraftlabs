import { z } from 'zod';

export const BlogFrontmatterSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  description: z.string().trim().min(1, 'Description is required'),
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
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
