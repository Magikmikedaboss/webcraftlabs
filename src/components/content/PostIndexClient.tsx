"use client";

import { useMemo, useState } from "react";
import PostCard from "./PostCard";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  kind: "blog" | "news";
  readingTime?: string;
};

export default function PostIndexClient({
  posts,
  kind,
}: {
  posts: Post[];
  kind: "blog" | "news";
}) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("All");

  const tags = useMemo(() => {
    const s = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s).sort()];
  }, [posts]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesTag = tag === "All" ? true : (p.tags || []).includes(tag);
      const matchesQ =
        !query ||
        [p.title, p.description, (p.tags || []).join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(query);
      return matchesTag && matchesQ;
    });
  }, [posts, q, tag]);

  const featured = filtered[0];
  const next = filtered.slice(1, 4);
  const rest = filtered.slice(4);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            {kind === "blog" ? "Editorial desk" : "News desk"}
          </span>
          <span className="text-xs text-[var(--muted)]">•</span>
          <span className="text-sm font-semibold text-[var(--text)]">
            {filtered.length} posts
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="w-full sm:w-72 rounded-xl border border-[var(--border)] bg-white/90 px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-200"
          />
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            aria-label="Filter by tag"
            className="w-full sm:w-56 rounded-xl border border-[var(--border)] bg-white/90 px-3 py-2 text-sm shadow-sm"
          >
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Featured */}
      {featured ? <PostCard post={featured} variant="featured" /> : null}

      {/* Secondary grid */}
      {next.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {next.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : null}

      {/* More */}
      {rest.length ? (
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
            More stories
          </div>
          <div className="grid gap-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} variant="compact" />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
