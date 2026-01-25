import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type MdxContent = {
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
  frontmatter?: any;
  title?: string;
  summary?: string;
  date?: string;
  tags?: string[];
};

export async function getMdxContent(baseDir: string, slug: string): Promise<MdxContent> {
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  const sanitizedSlug = slug;
  let fullPath = path.resolve(baseDir, `${sanitizedSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.resolve(baseDir, `${sanitizedSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found for slug: ${slug}`);
    }
  }
  const resolvedBase = path.resolve(baseDir);
  const sep = path.sep;
  if (!fullPath.startsWith(resolvedBase + sep)) {
    throw new Error('Path traversal detected');
  }
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content, { scope: data });
  return {
    frontmatter: data,
    slug: sanitizedSlug,
    mdxSource,
  };
}
