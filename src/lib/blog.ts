import path from "path";
import { loadAllMarkdown, ContentMeta } from "./content";
import { getMdxContent } from "./mdx";

export const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllBlogPosts(): Promise<ContentMeta[]> {
  return loadAllMarkdown(BLOG_DIR);
}

export async function getBlogPost(slug: string) {
  return getMdxContent(BLOG_DIR, slug);
}