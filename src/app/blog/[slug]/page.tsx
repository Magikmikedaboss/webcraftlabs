import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx/blog";
import ShareBar from "@/components/mdx/ShareBar";
import Callout from "@/components/mdx/Callout";
import Stat from "@/components/mdx/Stat";
import Checklist from "@/components/mdx/Checklist";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://webcraftlabs.com";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    return {
      title: `${post.frontmatter.title} | WebCraft Labs`,
      description: post.frontmatter.description,
      alternates: {
        canonical: `/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        url: `/blog/${slug}`,
        type: "article",
        publishedTime: post.frontmatter.date,
      },
    };
  } catch (err) {
    return { title: "Post | WebCraft Labs" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  let post: ReturnType<typeof getPostBySlug>;
  let slug: string;
  try {
    ({ slug } = await params);
    post = getPostBySlug(slug);
    if (!post) {
      notFound();
    }
  } catch (err: any) {
    if (err && (err.code === 'ENOENT' || err.message?.includes('no such file'))) {
      notFound();
    } else {
      throw err;
    }
  }
  const url = `${SITE_URL}/blog/${post.slug}`;
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <div className="text-xs font-semibold text-gray-500">{String(post.frontmatter.date)}</div>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 leading-tight">
          {post.frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-gray-600">{post.frontmatter.description}</p>
      </div>

      <article className="prose prose-slate max-w-none">
        <MDXRemote
          source={post.content}
          components={{
            Callout,
            Stat,
            Checklist,
          }}
        />
      </article>

      <ShareBar title={post.frontmatter.title} url={url} />
    </main>
  );
}

