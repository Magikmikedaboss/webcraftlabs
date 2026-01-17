
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type MdxContent = {
  slug: string;
  mdxSource: MDXRemoteSerializeResult;
  title?: string;
  summary?: string;
  date?: string;
  tags?: string[];
};

export async function getMdxContent(baseDir: string, slug: string): Promise<MdxContent> {
  const sanitizedSlug = path.basename(slug.replace(/[/\\]/g, ''));
  if (!sanitizedSlug || sanitizedSlug !== slug) {
    throw new Error(`Invalid slug: ${slug}`);
  }
  let fullPath = path.join(baseDir, `${sanitizedSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(baseDir, `${sanitizedSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found for slug: ${slug}`);
    }
  }
  const file = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(file);
  const mdxSource = await serialize(content, { scope: data });
  return {
    ...data,
    slug: sanitizedSlug,
    mdxSource,
  };
}
