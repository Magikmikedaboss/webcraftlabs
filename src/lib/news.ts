import path from "path";
import { loadAllMarkdown, parseMarkdownFile, ContentMeta, ContentItem } from "./content";

export const NEWS_DIR = path.join(process.cwd(), "src/content/news");

export async function getAllNews(): Promise<ContentMeta[]> {
  return loadAllMarkdown(NEWS_DIR);
}

export async function getNewsItem(slug: string): Promise<ContentItem> {
  return parseMarkdownFile(NEWS_DIR, slug);
}