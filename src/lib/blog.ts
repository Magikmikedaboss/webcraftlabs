import path from "path";
import { loadAllMarkdown, parseMarkdownFile, ContentMeta, ContentItem } from "./content";

export const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export async function getAllBlogPosts(): Promise<ContentMeta[]> {
  return loadAllMarkdown(BLOG_DIR);
}

export async function getBlogPost(slug: string): Promise<ContentItem> {
  return parseMarkdownFile(BLOG_DIR, slug);
}