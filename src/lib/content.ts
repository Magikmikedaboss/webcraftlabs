import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type ContentMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

export type ContentItem = ContentMeta & {
  contentHtml: string;
};

export async function parseMarkdownFile(
  baseDir: string,
  slug: string
): Promise<ContentItem> {
  // Sanitize slug to prevent path traversal
  const sanitizedSlug = path.basename(slug.replace(/[/\\]/g, ''));
  if (!sanitizedSlug || sanitizedSlug !== slug) {
    throw new Error(`Invalid slug: ${slug}`);
  }

  let fullPath = path.join(baseDir, `${sanitizedSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(baseDir, `${sanitizedSlug}.md`);
  }
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content not found for slug: ${sanitizedSlug}`);
  }
  
  // Ensure resolved path is within baseDir
  const resolvedBase = path.resolve(baseDir);
  const resolvedPath = path.resolve(fullPath);
  const sep = path.sep;
  if (!resolvedPath.startsWith(resolvedBase + sep)) {
    throw new Error('Path traversal detected');
  }

  const file = fs.readFileSync(resolvedPath, "utf8");
  const { data, content } = matter(file);

  // Validate required frontmatter fields
  const ext = fullPath.endsWith('.mdx') ? '.mdx' : '.md';
  if (!data.title || typeof data.title !== 'string') {
    throw new Error(`Missing or invalid title in ${sanitizedSlug}${ext}`);
  }
  if (!data.date) {
    throw new Error(`Missing date in ${sanitizedSlug}${ext}`);
  }

  const processed = await remark().use(html).process(content);

  return {
    slug: sanitizedSlug,
    title: data.title,
    date: String(data.date),
    summary: data.summary ?? "",
    tags: data.tags ?? [],
    contentHtml: processed.toString(),
  };
}

export async function loadAllMarkdown(
  baseDir: string
): Promise<ContentMeta[]> {
  const files = fs
    .readdirSync(baseDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const items: ContentMeta[] = [];
  
  for (const file of files) {
    const fullPath = path.join(baseDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    
    // Skip files without required frontmatter
    if (!data.title || typeof data.title !== 'string' || !data.date) {
      continue;
    }
    
    const slug = file.replace(/\.(mdx|md)$/, "");
    items.push({
      slug,
      title: data.title,
      date: String(data.date),
      summary: data.summary ?? "",
      tags: data.tags ?? [],
    });
  }
  
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}
