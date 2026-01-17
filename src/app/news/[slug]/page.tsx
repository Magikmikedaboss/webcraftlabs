import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import "@/app/blog/editorial.css";

import { getAllNewsSlugs, getNewsBySlug, getAllNews } from "@/lib/mdx/news";

import ShareBar from "@/components/mdx/ShareBar";
import Callout from "@/components/mdx/Callout";
import Stat from "@/components/mdx/Stat";
import Checklist from "@/components/mdx/Checklist";
import PullQuote from "@/components/mdx/PullQuote";
import Takeaways from "@/components/mdx/Takeaways";
import PrevNext from "@/components/content/PrevNext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export function generateStaticParams() {
  return getAllNewsSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = getNewsBySlug(slug);
    return {
      title: `${post.frontmatter.title} | WebCraft Labs News`,
      description: post.frontmatter.description,
    };
  } catch {
    return { title: "News | WebCraft Labs" };
  }
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: ReturnType<typeof getNewsBySlug>;
  try {
    post = getNewsBySlug(slug);
  } catch {
    notFound();
  }

  const url = `${SITE_URL}/news/${post.slug}`;

  const list = getAllNews();
  const idx = list.findIndex((p) => p.slug === post.slug);
  const prev = idx > 0 ? list[idx - 1] : null;
  const next = idx >= 0 && idx < list.length - 1 ? list[idx + 1] : null;

  return (
    <main className="editorial mx-auto max-w-6xl px-6 py-12 bg-[var(--bg)] min-h-screen">
      <div className="grid gap-10 lg:grid-cols-[1fr,280px]">
        <article className="min-w-0">
          <header className="mb-10 border-b border-[var(--border)] pb-8">
            <div className="kicker">WebCraft Labs Newsroom</div>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[var(--text)] sm:text-5xl">
              {post.frontmatter.title}
            </h1>

            <p className="dek mt-4 max-w-2xl">{post.frontmatter.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
              <span className="font-semibold">{post.frontmatter.date}</span>
              {post.frontmatter.tags?.length ? <span className="opacity-40">•</span> : null}
              {post.frontmatter.tags?.length ? (
                <div className="flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((t: string) => (
                    <span
                      key={t}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-xs font-semibold text-[var(--text)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </header>

          <div className="prose prose-custom max-w-none">
            <MDXRemote
              source={post.content}
              components={{
                Callout,
                Stat,
                Checklist,
                PullQuote,
                Takeaways,
              }}
            />
          </div>

          <PrevNext
            kind="news"
            prev={prev ? { slug: prev.slug, title: prev.frontmatter.title } : undefined}
            next={next ? { slug: next.slug, title: next.frontmatter.title } : undefined}
          />

          <div className="mt-8">
            <ShareBar title={post.frontmatter.title} url={url} />
          </div>
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Share this update
              </div>
              <div className="mt-3">
                <ShareBar title={post.frontmatter.title} url={url} />
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg)] to-[var(--surface)] p-5 shadow-sm">
              <div className="text-sm font-extrabold text-[var(--text)]">
                Need a site refresh?
              </div>
              <p className="mt-1 text-sm text-[var(--muted)]">
                If your site feels slow or unclear, I can modernize it without rebuilding everything.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Talk to me
              </a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}