"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  href?: string;
  kind: "blog" | "news";
};

interface PostIndexClientProps {
  posts: Post[];
  kind: "blog" | "news";
}

function formatDate(date: string) {
  const parts = date.split("-").map(Number);
  const [y, m, d] = parts;

  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) return "";

  const dt = new Date(Date.UTC(y, m - 1, d));
  if (
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() !== m - 1 ||
    dt.getUTCDate() !== d
  ) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

export default function PostIndexClient({ posts, kind }: PostIndexClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const kindLabel = kind === "blog" ? "Journal" : "Newsroom";

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return counts;
  }, [posts]);

  const allTags = useMemo(() => {
    return Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);
  }, [tagCounts]);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags.includes(selectedTag))
    : posts;

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          {kindLabel}
        </p>

        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
          Nothing published yet.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--muted)]">
          The archive is quiet for now. New entries will appear here when they
          are ready.
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* Header */}
      <header className="mb-14 border-b border-white/10 pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            WebCraft Labs
          </span>

          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {kindLabel}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-6xl">
              Ideas for the next internet.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Essays, field notes, and research from the edge of AI, software,
              websites, automation, and the strange new machinery of modern
              work.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Index
              </span>
              <span className="mt-3 block">
                {posts.length} published {posts.length === 1 ? "entry" : "entries"}.
                Updated as new research, essays, and experiments are released.
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Filters */}
      {allTags.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
              selectedTag === null
                ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                : "border-white/10 bg-white/[0.03] text-[var(--muted)] hover:border-white/20 hover:text-[var(--text)]"
            }`}
          >
            All
          </button>

          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                selectedTag === tag
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200"
                  : "border-white/10 bg-white/[0.03] text-[var(--muted)] hover:border-white/20 hover:text-[var(--text)]"
              }`}
            >
              {tag}
              <span className="ml-2 opacity-50">{tagCounts[tag]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Featured */}
      {featuredPost && (
        <Link
          href={featuredPost.href ?? `/${kind}/${featuredPost.slug}`}
          className="group mb-16 block overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-cyan-400/[0.06] p-1 transition hover:border-cyan-300/30"
        >
          <article className="relative overflow-hidden rounded-[1.75rem] bg-[var(--surface)] p-8 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

            <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                  Featured Entry
                </p>

                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[var(--text)] transition group-hover:text-cyan-200 sm:text-5xl">
                  {featuredPost.title}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  {featuredPost.description}
                </p>

                <div className="mt-8 flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span>{formatDate(featuredPost.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                  <span className="text-cyan-300 transition group-hover:translate-x-1">
                    Read Article →
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      )}

      {/* List */}
      <div className="space-y-4">
        {remainingPosts.map((post) => (
          <Link
            key={post.slug}
            href={post.href ?? `/${kind}/${post.slug}`}
            className="group block border-t border-white/10 py-7 transition hover:border-cyan-300/30"
          >
            <article className="grid gap-5 sm:grid-cols-[0.8fr_1.6fr_0.4fr] sm:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {post.tags[0] || kindLabel}
                </p>

                <p className="mt-3 text-sm text-[var(--muted)]">
                  {formatDate(post.date)}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text)] transition group-hover:text-cyan-200">
                  {post.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  {post.description}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex text-sm font-semibold text-cyan-300 transition group-hover:translate-x-1">
                  Read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && selectedTag && (
        <div className="py-20 text-center">
          <p className="text-sm text-[var(--muted)]">
            No entries found for{" "}
            <span className="text-[var(--text)]">{selectedTag}</span>.
          </p>

          <button
            onClick={() => setSelectedTag(null)}
            className="mt-5 text-sm font-semibold text-cyan-300 hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </section>
  );
}
