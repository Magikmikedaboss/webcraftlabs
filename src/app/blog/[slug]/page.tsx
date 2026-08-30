﻿import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import "@/app/blog/editorial.css";

import { getPostBySlug, getAllPosts } from "@/lib/mdx/blog";

// Deduplicate the file read/parse between generateMetadata and the page component.
const getCachedPost = cache(getPostBySlug);

import mdxComponents from '@/lib/mdxComponents';
import { TRUSTED_MDX_OPTIONS } from '@/lib/mdxOptions';
import SiteShell from "@/components/SiteShell";
import EditorialTemplateV2 from "@/components/blog/EditorialTemplateV2";
import LabNotebookTemplate from "@/components/blog/LabNotebookTemplate";
// Lab notebook components are provided via centralized mdxComponents
import { getBaseUrl, SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getCachedPost(slug);
    const siteUrl = getBaseUrl();
    const url = `${siteUrl}/blog/${slug}`;
    const imageVal = post.frontmatter.image as string | undefined;
    const socialImage = imageVal
      ? imageVal.startsWith('http')
        ? imageVal
        : imageVal.startsWith('/')
        ? `${siteUrl}${imageVal}`
        : new URL(imageVal, siteUrl).toString()
      : `${siteUrl}/images/structure-database-software-development.jpg`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        url,
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author || SITE.name],
        tags: post.frontmatter.tags || [],
        images: [
          {
            url: socialImage,
            width: 1200,
            height: 630,
            alt: post.frontmatter.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: [socialImage],
      },
    };
  } catch {
    return { title: "Blog | WebCraft LabZ" };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getCachedPost(slug);
  } catch {
    notFound();
  }

  const siteUrl = getBaseUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const imageVal = post.frontmatter.image as string | undefined;
  const socialImage = imageVal
    ? imageVal.startsWith('http')
      ? imageVal
      : imageVal.startsWith('/')
      ? `${siteUrl}${imageVal}`
      : new URL(imageVal, siteUrl).toString()
    : `${siteUrl}/images/structure-database-software-development.jpg`;
  // Ensure we only pass a string date for rendered publication text.
  // `post.frontmatter.published` may be a boolean sentinel; coerce to
  // a string only when it's explicitly a string (legacy tokens), otherwise
  // keep the canonical `date` field for display.
  const publishedString = typeof post.frontmatter.published === 'string'
    ? post.frontmatter.published
    : undefined;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: post.frontmatter.author || SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/branding/180.png`,
      },
    },
    mainEntityOfPage: url,
    image: [socialImage],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.frontmatter.title,
        item: url,
      },
    ],
  };

  // prev/next → used as related reading cards
  // Exclude archive posts so related/adjacent cards only include normal blog content
  const list = getAllPosts().filter((p) => p.frontmatter.collection !== "webcraft-archive");
  const idx = list.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;
  const related = [prev, next]
    .filter(Boolean)
    .map((p) => ({
      slug: p!.slug,
      title: p!.frontmatter.title as string,
      image: p!.frontmatter.image as string | undefined,
      tags: p!.frontmatter.tags as string[] | undefined,
    }));

  // Strip import/declaration lines — used for word count only, not for rendering
  const cleanContent = post.content.replace(/^import\s+.+\s+from\s+['"].+['"]\s*;?\s*$/gm, '').trim();
  // Strip JSX/HTML tags and markdown syntax for an accurate word count
  const wordCount = cleanContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[`*#_\[\]()!]/g, ' ')
    .split(/\s+/).filter(Boolean).length;
  const readMins = Math.max(1, Math.ceil(wordCount / 200));
  const isLab = post.frontmatter.template === "lab";

  // Use shared MDX components mapping
  // (imported earlier as `mdxComponents`)

  return (
    <SiteShell background="bg">
      <script id={`blog-jsonld-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c') }} />
      <script id={`blog-breadcrumb-jsonld-${post.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }} />
      {isLab ? (
        <LabNotebookTemplate
            post={{
              title: post.frontmatter.title as string,
              description: post.frontmatter.description as string | undefined,
              summary: post.frontmatter.description as string | undefined,
              // Pass a true date-bearing symbol for display, and only include
              // the legacy `published` string when it exists as a string.
              date: post.frontmatter.date as string | undefined,
              published: publishedString as string | undefined,
              author: post.frontmatter.author as string | undefined,
            }}
          readMins={readMins}
          pageUrl={url}
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={TRUSTED_MDX_OPTIONS}
          />
        </LabNotebookTemplate>
      ) : (
        <EditorialTemplateV2
          post={{
            title: post.frontmatter.title as string,
            description: post.frontmatter.description as string | undefined,
            summary: post.frontmatter.summary as string | undefined,
            // Use `date` for rendered publication text and only keep
            // `published` when it is a string token.
            date: post.frontmatter.date as string | undefined,
            published: publishedString as string | undefined,
            author: post.frontmatter.author as string | undefined,
            image: post.frontmatter.image as string | undefined,
            badge: post.frontmatter.badge as string | undefined,
            pullQuote: post.frontmatter.pullQuote as string | undefined,
            tags: post.frontmatter.tags as string[] | undefined,
          }}
          readMins={readMins}
          pageUrl={url}
          cover={post.frontmatter.image as string | undefined}
          coverAbs={socialImage}
          related={related}
          backHref="/blog"
          backLabel="← Back to Blog"
        >
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={TRUSTED_MDX_OPTIONS}
          />
        </EditorialTemplateV2>
      )}
    </SiteShell>
  );
}
