import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import "@/app/blog/editorial.css";

import { getArchivePostBySlug } from "@/lib/mdx/archive";
import { getArchivePosts } from "@/lib/archive";
import ArchiveNav from "@/components/archive/ArchiveNav";

// Deduplicate the file read/parse between generateMetadata and the page component.
const getCachedPost = cache(getArchivePostBySlug);

import mdxComponents from '@/lib/mdxComponents';
import { TRUSTED_MDX_OPTIONS } from '@/lib/mdxOptions';
import SiteShell from "@/components/SiteShell";
import EditorialTemplateV2 from "@/components/blog/EditorialTemplateV2";
// Lab and editorial subcomponents are provided via `mdxComponents`.
import { getBaseUrl, SITE } from "@/lib/site";

export function generateStaticParams() {
  return getArchivePosts().map((p) => ({ slug: p.slug }));
}

// Only serve slugs that were pre-generated (published, non-future-dated).
// Any other slug — including future-dated docs — gets a 404 at the edge.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getCachedPost(slug);
    if (post.frontmatter.collection !== "webcraft-archive") {
      return { title: "WebCraft Archive" };
    }
    const siteUrl = getBaseUrl();
    const url = `${siteUrl}/archive/${slug}`;
    const imageVal = post.frontmatter.image as string | undefined;
    const socialImage = imageVal
      ? imageVal.startsWith('http')
        ? imageVal
        : imageVal.startsWith('/')
        ? `${siteUrl}${imageVal}`
        : new URL(imageVal, siteUrl).toString()
      : `${siteUrl}/images/dreamy-city-street-lined-with-trees-and-tall-buildings-beneath.jpg`;

    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      alternates: { canonical: url },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        url,
        publishedTime: post.frontmatter.date,
        authors: [post.frontmatter.author || SITE.name],
        tags: post.frontmatter.tags || [],
        images: [{ url: socialImage, width: 1200, height: 630, alt: post.frontmatter.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        images: [socialImage],
      },
    };
  } catch {
    return { title: "WebCraft Archive" };
  }
}

export default async function ArchiveDocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: ReturnType<typeof getArchivePostBySlug>;
  try {
    post = getCachedPost(slug);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.startsWith("Post not found") || msg === "Invalid slug") {
      notFound();
    }
    throw err;
  }

  // Only serve archive collection documents at this route
  const siteUrl = getBaseUrl();
  const url = `${siteUrl}/archive/${slug}`;
  const imageVal = post.frontmatter.image as string | undefined;
  const socialImage = imageVal
    ? imageVal.startsWith('http')
      ? imageVal
      : imageVal.startsWith('/')
      ? `${siteUrl}${imageVal}`
      : new URL(imageVal, siteUrl).toString()
    : `${siteUrl}/images/dreamy-city-street-lined-with-trees-and-tall-buildings-beneath.jpg`;

  const isSyntheticMinds = post.frontmatter.archiveCollection === "synthetic-minds";

  const articleJsonLd = {
    "@context": "https://schema.org",
    // Synthetic Minds episodes are a creative series, not an institutional
    // scholarly record — never mapped to ScholarlyArticle/Report. For the
    // Archive Universe, derive the most-appropriate type from the canonical
    // `archiveId` where possible, falling back to `CreativeWork`.
    "@type": isSyntheticMinds
      ? "CreativeWork"
      : (() => {
          const aid = String(post.frontmatter.archiveId || "").toLowerCase();
          if (!aid) return "CreativeWork";
          if (aid.includes("treatise") || aid.includes("paper") || aid.includes("scholar")) return "ScholarlyArticle";
          if (aid.includes("report")) return "Report";
          if (aid.includes("essay") || aid.includes("article")) return "Article";
          return "CreativeWork";
        })(),
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Organization",
      name: post.frontmatter.author || SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/branding/180.png`,
      },
    },
    mainEntityOfPage: url,
    image: [socialImage],
    ...(isSyntheticMinds
      ? {
          isPartOf: {
            "@type": "CreativeWorkSeries",
            name: "Synthetic Minds",
            url: `${siteUrl}/blog/synthetic-minds-series`,
          },
          position: post.frontmatter.seriesOrder,
        }
      : {}),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Archive", item: `${siteUrl}/archive` },
      { "@type": "ListItem", position: 3, name: post.frontmatter.title, item: url },
    ],
  };

  const cleanContent = post.content
    .replace(/^import\s+.+\s+from\s+['"].+['"]\s*;?\s*$/gm, "")
    .trim();
  const wordCount = cleanContent
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[`*#_\[\]()!]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const readMins = Math.max(1, Math.ceil(wordCount / 200));

  // Use shared MDX components mapping
  // (imported earlier as `mdxComponents`)

  // Remove the first line-level Markdown H1 only when it duplicates the
  // frontmatter title. Many MDX authors include the title as an H1 in the
  // body; when that title matches `frontmatter.title` we strip it to avoid
  // duplication. Otherwise leave the content untouched.
  const firstH1Match = cleanContent.match(/^[ \t]*#\s+(.*)(?:\r?\n)?/m);
  let contentForMdx = cleanContent;
  if (firstH1Match && post.frontmatter.title) {
    const h1Text = (firstH1Match[1] || "").trim().replace(/\s+/g, " ");
    const fmTitle = String(post.frontmatter.title).trim().replace(/\s+/g, " ");
    if (h1Text.localeCompare(fmTitle, undefined, { sensitivity: "base" }) === 0) {
      // remove only the first matching H1 line
      contentForMdx = cleanContent.replace(/^[ \t]*#\s+.*(?:\r?\n)?/m, "").trim();
    }
  }

  return (
    <SiteShell background="bg" showArchiveQuote={true}>      <script
        id={`archive-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        id={`archive-breadcrumb-jsonld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* `affiliate` is deliberately not threaded through here. The Archive
          is a creative/fiction collection with no commercial links, so the
          disclosure band has nothing to disclose on these pages — only
          /blog/[slug] passes it. */}
      <EditorialTemplateV2
        post={{
          title: post.frontmatter.title as string,
          description: post.frontmatter.description as string | undefined,
          summary: post.frontmatter.summary as string | undefined,
          published:
            typeof post.frontmatter.published === "string"
              ? post.frontmatter.published
              : undefined,
          date: post.frontmatter.date as string | undefined,
          author: post.frontmatter.author as string | undefined,
          image: post.frontmatter.image as string | undefined,
          badge: post.frontmatter.badge as string | undefined,
          pullQuote: post.frontmatter.pullQuote as string | undefined,
          tags: post.frontmatter.tags as string[] | undefined,
        }}        readMins={readMins}
        pageUrl={url}
        cover={post.frontmatter.image as string | undefined}
        coverAbs={socialImage}
        related={[]}
        backHref="/archive"
        backLabel="← Back to Archive"
      >
        <MDXRemote
          source={contentForMdx}
          components={mdxComponents}
          options={TRUSTED_MDX_OPTIONS}
        />
      </EditorialTemplateV2>
      <ArchiveNav
        slug={post.slug as import('@/lib/archive').ArchiveDoc['slug']}
        archiveCollection={post.frontmatter.archiveCollection}
      />
    </SiteShell>
  );
}
