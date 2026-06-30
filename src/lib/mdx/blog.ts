
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatterSchema } from "./frontmatterSchema";
import { z } from "zod";
import { BLOG_DIR } from "../blog";
import { publishCutoff } from "./publishCutoff";

function sanitizeSlug(slug: string): string {
  // Decode and allow [a-zA-Z0-9-_]
  let decoded: string;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    console.error('[sanitizeSlug] Could not decode slug:', slug);
    throw new Error('Invalid slug');
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(decoded)) {
    console.error('[sanitizeSlug] Rejected slug:', decoded);
    throw new Error('Invalid slug');
  }
  return decoded;
}





export function getAllPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}
export function getPostBySlug(slug: string): { slug: string; content: string; frontmatter: z.infer<typeof BlogFrontmatterSchema> } {
  const safeSlug = sanitizeSlug(slug);
  let fullPath = path.join(BLOG_DIR, `${safeSlug}.mdx`);
  console.log('[getPostBySlug] Looking for:', fullPath);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(BLOG_DIR, `${safeSlug}.md`);
    console.log('[getPostBySlug] Fallback to:', fullPath);
  }
  if (!fs.existsSync(fullPath)) {
    console.error(`[getPostBySlug] Post not found: ${safeSlug} in ${BLOG_DIR}`);
    throw new Error(`Post not found: ${safeSlug} in ${BLOG_DIR}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const parsed = BlogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.error(`[getPostBySlug] Invalid frontmatter for slug '${safeSlug}': ${parsed.error.message}`);
    throw new Error(`Invalid frontmatter for slug '${safeSlug}': ${parsed.error.message}`);
  }
  return {
    slug: safeSlug,
    content,
    frontmatter: parsed.data,
  };
}

/** Descending-date comparator for posts with a `frontmatter.date` field. */
function newestFirst<T extends { frontmatter: { date: string } }>(a: T, b: T): number {
  if (a.frontmatter.date < b.frontmatter.date) return 1;
  if (a.frontmatter.date > b.frontmatter.date) return -1;
  return 0;
}

export function getAllPosts() {
  const today = publishCutoff();
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p) => p.frontmatter.date <= today)
    .sort(newestFirst);
}

/** Frontmatter-only variant — no MDX content string returned. */
export function getAllPostFrontmatter() {
  const today = publishCutoff();
  return getAllPostSlugs()
    .map((slug) => {
      const { slug: safeSlug, frontmatter } = getPostBySlug(slug);
      return { slug: safeSlug, frontmatter };
    })
    .filter((p) => p.frontmatter.date <= today)
    .sort(newestFirst);
}
