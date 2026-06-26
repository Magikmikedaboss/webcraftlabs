import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Script from "next/script";

import "@/app/blog/editorial.css";

import { getAllPostSlugs, getPostBySlug, getAllPosts } from "@/lib/mdx/blog";

import Link from "next/link";
import Image from "next/image";
import Callout from "@/components/mdx/Callout";
import Stat from "@/components/mdx/Stat";
import Checklist from "@/components/mdx/Checklist";
import PullQuote from "@/components/mdx/PullQuote";
import Takeaways from "@/components/mdx/Takeaways";
import MdxImage from "@/components/mdx/MdxImage";
import ArticleImage from "@/components/mdx/ArticleImage";
import SiteShell from "@/components/SiteShell";
import EditorialTemplateV2, {
  BigQuote,
  Insight,
  StatBlock,
  SplitCompare,
  PostTimeline,
  Chapter,
} from "@/components/blog/EditorialTemplateV2";
import { getBaseUrl, SITE } from "@/lib/site";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    const siteUrl = getBaseUrl();
    const url = `${siteUrl}/blog/${slug}`;
    const socialImage = new URL(
      post.frontmatter.image || "/images/structure-database-software-development.jpg",
      siteUrl,
    ).toString();

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
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const siteUrl = getBaseUrl();
  const url = `${siteUrl}/blog/${post.slug}`;
  const socialImage = new URL(
    post.frontmatter.image || "/images/structure-database-software-development.jpg",
    siteUrl,
  ).toString();
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

  // prev/next â†’ used as related reading cards
  const list = getAllPosts();
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

  const wordCount = post.content.split(/\s+/).length;
  const readMins = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <SiteShell background="bg">
      <Script id={`blog-jsonld-${post.slug}`} type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </Script>
      <Script id={`blog-breadcrumb-jsonld-${post.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </Script>
      <div className="mx-auto max-w-6xl px-6 py-12">
        <EditorialTemplateV2
          post={{
            title: post.frontmatter.title as string,
            description: post.frontmatter.description as string | undefined,
            summary: post.frontmatter.description as string | undefined,
            published: post.frontmatter.date as string | undefined,
            author: post.frontmatter.author as string | undefined,
            image: post.frontmatter.image as string | undefined,
            badge: (post.frontmatter.tags as string[] | undefined)?.[0],
            tags: post.frontmatter.tags as string[] | undefined,
          }}
          readMins={readMins}
          pageUrl={url}
          cover={post.frontmatter.image as string | undefined}
          coverAbs={socialImage}
          related={related}
        >
          <MDXRemote
            source={post.content}
            options={{ blockJS: false, blockDangerousJS: true }}
            components={{
              Callout,
              Stat,
              Checklist,
              PullQuote,
              Takeaways,
              BigQuote,
              Insight,
              StatBlock,
              SplitCompare,
              PostTimeline,
              Chapter,
              ArticleImage,
              img: MdxImage,
              Link,
              Image,
            }}
          />
        </EditorialTemplateV2>
      </div>
    </SiteShell>
  );
}
