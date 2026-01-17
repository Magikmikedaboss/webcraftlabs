function sanitizeSlug(slug: string): string {
  // Decode and strictly allow only [a-z0-9-_]
  const decoded = decodeURIComponent(slug);
  if (!/^[a-z0-9-_]+$/.test(decoded)) {
    throw new Error('Invalid slug');
  }
  return decoded;
}
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatterSchema, BlogFrontmatter } from "./frontmatterSchema";
import { BLOG_DIR } from "../blog";





export function getAllPostSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}
export function getPostBySlug(slug: string): { slug: string; content: string; frontmatter: typeof BlogFrontmatterSchema._input } {
  const safeSlug = sanitizeSlug(slug);
  let fullPath = path.join(BLOG_DIR, `${safeSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(BLOG_DIR, `${safeSlug}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${safeSlug} in ${BLOG_DIR}`);
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

export function getAllPosts() {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
