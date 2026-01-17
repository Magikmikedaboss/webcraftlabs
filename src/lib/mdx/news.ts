function sanitizeSlug(slug: string): string {
  // Decode and strictly allow only [a-z0-9-_]
  let decoded: string;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    throw new Error('Invalid slug');
  }
  if (!/^[a-z0-9-_]+$/.test(decoded)) {
    throw new Error('Invalid slug');
  }
  return decoded;
}
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatterSchema } from "./frontmatterSchema";
import { z } from "zod";

const NEWS_DIR = path.join(process.cwd(), "src/content/news");

export function getAllNewsSlugs() {
  return fs
    .readdirSync(NEWS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}
export function getNewsBySlug(slug: string): { slug: string; content: string; frontmatter: z.infer<typeof BlogFrontmatterSchema> } {
  const safeSlug = sanitizeSlug(slug);
  let fullPath = path.join(NEWS_DIR, `${safeSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(NEWS_DIR, `${safeSlug}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${safeSlug} in ${NEWS_DIR}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const parsed = BlogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter for slug '${safeSlug}': ${parsed.error.message}`);
  }
  return {
    slug: safeSlug,
    content,
    frontmatter: parsed.data,
  };
}

export function getAllNews() {
  return getAllNewsSlugs()
    .map((slug) => getNewsBySlug(slug))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
