import path from "path";
import { loadAllMarkdown, ContentMeta } from "./content";
import { getMdxContent } from "./mdx";

export const NEWS_DIR = path.join(process.cwd(), "src/content/news");

export async function getAllNews(): Promise<ContentMeta[]> {
  return loadAllMarkdown(NEWS_DIR);
}

export async function getNewsItem(slug: string) {
  return getMdxContent(NEWS_DIR, slug);
}