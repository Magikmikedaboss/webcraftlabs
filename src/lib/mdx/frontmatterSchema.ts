import { z } from 'zod';

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  // Enforce ISO date format YYYY-MM-DD
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
