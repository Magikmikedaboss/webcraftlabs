import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string; // "2026-01-17"
  tags?: string[];
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getAllPostSlugs() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}

export function getPostBySlug(slug: string) {
  let fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(BLOG_DIR, `${slug}.md`);
  }
  const raw = fs.readFileSync(fullPath, "utf8");
  const { content, data } = matter(raw);
  return {
    slug,
    content,
    frontmatter: data as BlogFrontmatter,
  };
}

export function getAllPosts() {
  return getAllPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
