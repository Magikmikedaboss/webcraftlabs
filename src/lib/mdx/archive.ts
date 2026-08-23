
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogFrontmatterSchema } from "./frontmatterSchema";
import { z } from "zod";
import { laPublishCutoff } from "./publishCutoff";

/**
 * Shared Archive collection loader — mirrors src/lib/mdx/blog.ts and
 * src/lib/mdx/news.ts exactly (same schema, same publish-cutoff gating,
 * same MDX parsing). Archive content is its own physical directory, not a
 * second content pipeline: it reuses the validated frontmatter schema and
 * publish gating that Blog and News already share.
 */
export const ARCHIVE_DIR = path.join(process.cwd(), "src/content/archive");

function sanitizeSlug(slug: string): string {
  let decoded: string;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    throw new Error("Invalid slug");
  }
  if (!/^[a-zA-Z0-9-_]+$/.test(decoded)) {
    throw new Error("Invalid slug");
  }
  return decoded;
}

export function getAllArchiveSlugs() {
  if (!fs.existsSync(ARCHIVE_DIR)) {
    return [];
  }
  return fs
    .readdirSync(ARCHIVE_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getArchivePostBySlug(slug: string): {
  slug: string;
  content: string;
  frontmatter: z.infer<typeof BlogFrontmatterSchema>;
} {
  const safeSlug = sanitizeSlug(slug);
  let fullPath = path.join(ARCHIVE_DIR, `${safeSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(ARCHIVE_DIR, `${safeSlug}.md`);
  }
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post not found: ${safeSlug} in ${ARCHIVE_DIR}`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  const parsed = BlogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter for slug '${safeSlug}': ${parsed.error.message}`);
  }
  if (parsed.data.collection !== "webcraft-archive") {
    throw new Error(
      `Refusing to load '${safeSlug}' from ${ARCHIVE_DIR}: collection must be "webcraft-archive", got '${parsed.data.collection}'`
    );
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

export function isArchivePublished(frontmatter: { date: string; published?: unknown }) {
  if (typeof frontmatter.published === "boolean") {
    return frontmatter.published;
  } else if (typeof frontmatter.published === "string") {
    const v = frontmatter.published.trim().toLowerCase();
    return ["true", "published", "yes"].includes(v);
  }
  const today = laPublishCutoff();
  return frontmatter.date <= today;
}

/** All published Archive documents — both archive-universe and synthetic-minds. */
export function getAllArchivePosts() {
  return getAllArchiveSlugs()
    .map((slug) => getArchivePostBySlug(slug))
    .filter((p) => isArchivePublished(p.frontmatter))
    .sort(newestFirst);
}

/** Frontmatter-only variant — no MDX content string returned. */
export function getAllArchivePostFrontmatter() {
  return getAllArchiveSlugs()
    .map((slug) => {
      const { slug: safeSlug, frontmatter } = getArchivePostBySlug(slug);
      return { slug: safeSlug, frontmatter };
    })
    .filter((p) => isArchivePublished(p.frontmatter))
    .sort(newestFirst);
}
