import { z } from 'zod';

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;
