"use client";

import Link from "next/link";
import { useMemo, useState, useRef, useId, useEffect } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const id = useId();
  const inputId = `${id}-post-search`;
  const suggestionListId = `${inputId}-list`;
  /**
   * The active option is tracked by value rather than by index. A changing
   * result set then cannot leave a stale row highlighted — indexOf simply
   * stops finding it — so no synchronising effect is needed.
   */
  const [activeValue, setActiveValue] = useState<string | null>(null);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /**
   * Accepting a suggestion restores focus to the input, and that focus event
   * would otherwise re-open the popup we just closed. This suppresses exactly
   * that one programmatic focus, never a real one from the user.
   */
  const suppressFocusOpen = useRef(false);
  /** Points at the currently-active <li>, and only at that one. */
  const activeOptionRef = useRef<HTMLLIElement | null>(null);

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

  const suggestionPool = useMemo(() => {
    const tags = allTags;
    const titles = posts.map((p) => p.title);
    const combined = Array.from(new Set([...tags, ...titles]));
    return combined;
  }, [allTags, posts]);

  const suggestions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return suggestionPool
      .filter((s) => s.toLowerCase().includes(q))
      .slice(0, 8);
  }, [searchTerm, suggestionPool]);

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (selectedTag) {
      return posts.filter((post) => post.tags.includes(selectedTag));
    }
    if (!q) return posts;
    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [posts, searchTerm, selectedTag]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  /**
   * The popup only exists when there is something in it, so every ARIA
   * attribute that describes the popup keys off this one value rather than
   * off `showSuggestions` alone.
   */
  const isOpen = showSuggestions && suggestions.length > 0;
  const activeIndex = activeValue === null ? -1 : suggestions.indexOf(activeValue);
  const optionId = (index: number) => `${suggestionListId}-option-${index}`;
  // Undefined whenever the popup is closed or nothing is active, so
  // aria-activedescendant can never name a node that isn't rendered.
  const activeOptionId = isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined;
  const moveActiveTo = (index: number) => setActiveValue(suggestions[index] ?? null);

  useEffect(() => {
    return () => {
      if (blurTimer.current) clearTimeout(blurTimer.current);
    };
  }, []);

  /**
   * Keeps the active option visible inside the capped (max-h-64) list. Purely
   * imperative — it reads a ref and scrolls, and never touches React state.
   *
   * Keyed on activeOptionId, the same value aria-activedescendant uses, so the
   * visual and the announced option can never disagree. "nearest" scrolls the
   * smallest amount needed and does nothing at all when the option is already
   * visible, which is why pointer hover (where the option is visible by
   * definition) stays a no-op and the page itself never jumps.
   */
  useEffect(() => {
    if (!activeOptionId) return;
    activeOptionRef.current?.scrollIntoView({ block: "nearest" });
  }, [activeOptionId]);

  /**
   * The single path for accepting a suggestion. Both Enter and pointer
   * selection route through here, so the two can never drift apart.
   */
  const commitSuggestion = (value: string) => {
    setSearchTerm(value);
    setSelectedTag(allTags.includes(value) ? value : null);
    setShowSuggestions(false);
    setActiveValue(null);
    suppressFocusOpen.current = true;
    inputRef.current?.focus();
    // If focus() was a no-op because the input already had focus, release the
    // guard so it can't swallow the user's next genuine focus.
    queueMicrotask(() => {
      suppressFocusOpen.current = false;
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Tab is never trapped — it just dismisses the popup on the way out.
    // The active option is dropped here rather than left to the deferred blur
    // handler: returning with Shift+Tab inside that 150ms window cancels the
    // timer, and a surviving activeValue would come back with the popup as a
    // selection the user never made on this visit.
    if (event.key === "Tab") {
      setShowSuggestions(false);
      setActiveValue(null);
      return;
    }

    if (event.key === "Escape") {
      if (isOpen) event.preventDefault();
      // Closes the list and drops the active option, but deliberately keeps
      // whatever the user typed.
      setShowSuggestions(false);
      setActiveValue(null);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (suggestions.length === 0) return;
      if (!isOpen) {
        setShowSuggestions(true);
        moveActiveTo(0);
        return;
      }
      moveActiveTo(activeIndex < 0 ? 0 : (activeIndex + 1) % suggestions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (suggestions.length === 0) return;
      if (!isOpen) {
        setShowSuggestions(true);
        moveActiveTo(suggestions.length - 1);
        return;
      }
      moveActiveTo(
        activeIndex < 0
          ? suggestions.length - 1
          : (activeIndex - 1 + suggestions.length) % suggestions.length
      );
      return;
    }

    // Everything below only means anything while the popup is open.
    if (!isOpen) return;

    if (event.key === "Enter") {
      // With no active option, Enter belongs to the form/input, not to us.
      if (activeIndex >= 0) {
        event.preventDefault();
        commitSuggestion(suggestions[activeIndex]);
      }
      return;
    }

    // Home/End only belong to the listbox once the user has actually entered
    // navigation, the same rule Enter follows above. This is an editable
    // combobox and the popup is open for any matching query, so intercepting
    // them earlier would steal the caret keys from ordinary text editing.
    if (event.key === "Home") {
      if (activeIndex < 0) return;
      event.preventDefault();
      moveActiveTo(0);
      return;
    }

    if (event.key === "End") {
      if (activeIndex < 0) return;
      event.preventDefault();
      moveActiveTo(suggestions.length - 1);
    }
  };

  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
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
      <header className="mb-14 border-b border-[var(--border)] pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
            WebCraft Labs
          </span>

          <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            {kindLabel}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            {/* h2, not h1: this is a subsection of a page that already owns an
                h1 in its hero. Rendered on both /blog and /news, so an h1 here
                gave each of those routes two. Typography classes are unchanged
                — the level is semantic only. */}
            <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-6xl">
              Ideas for the next internet.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              Essays, field notes, and research from the edge of AI, software,
              websites, automation, and the strange new machinery of modern
              work.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--bg)] p-6">
            <p className="text-sm leading-7 text-[var(--muted)]">
              <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
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

      {/* Search bar with autocomplete suggestions */}
      <div className="mb-12">
        <div className="relative max-w-xl">
          <label htmlFor={inputId} className="sr-only">Search posts</label>
          <input
            ref={inputRef}
            id={inputId}
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={isOpen ? suggestionListId : undefined}
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            autoComplete="off"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedTag(null);
              setShowSuggestions(true);
              // New results mean the previous highlight no longer applies.
              setActiveValue(null);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (blurTimer.current) clearTimeout(blurTimer.current);
              if (suppressFocusOpen.current) {
                suppressFocusOpen.current = false;
                return;
              }
              setShowSuggestions(true);
            }}
            onBlur={() => {
              // Deferred so a pointer selection lands before the list unmounts.
              if (blurTimer.current) clearTimeout(blurTimer.current);
              blurTimer.current = setTimeout(() => {
                setShowSuggestions(false);
                setActiveValue(null);
              }, 150);
            }}
            placeholder="Search posts, tags, and titles"
            className="w-full rounded-2xl border border-[var(--controlBorder)] bg-[var(--surface)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />

          {isOpen && (
            <ul
              id={suggestionListId}
              role="listbox"
              aria-label="Search suggestions"
              className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg"
            >
              {suggestions.map((s, i) => (
                <li
                  key={s}
                  id={optionId(i)}
                  // Only the active row holds the ref. React detaches every
                  // stale ref before attaching the new one, so this always
                  // ends up pointing at the current option.
                  ref={activeIndex === i ? activeOptionRef : null}
                  role="option"
                  aria-selected={activeIndex === i}
                  onMouseEnter={() => setActiveValue(s)}
                  onMouseDown={(e) => {
                    // preventDefault keeps focus on the input, so the blur
                    // timer never races the selection.
                    e.preventDefault();
                    commitSuggestion(s);
                  }}
                  className={`cursor-pointer rounded-md px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--hoverSurface)]${
                    activeIndex === i ? " bg-[var(--hoverSurface)]" : ""
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Featured */}
      {featuredPost && (
        <Link
          href={featuredPost.href ?? `/${kind}/${featuredPost.slug}`}
          className="group mb-16 block overflow-hidden rounded-[2rem] border border-[var(--border)] bg-gradient-to-br from-[var(--bg)] via-[var(--bg)] to-[var(--accent)] p-1 transition hover:border-[var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
        >
          <article className="relative overflow-hidden rounded-[1.75rem] bg-[var(--surface)] p-8 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--accent)]/25 blur-3xl transition group-hover:bg-[var(--accent)]/40" />

            <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                  Featured Entry
                </p>

                <div className="flex flex-wrap gap-2">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border)] bg-[var(--bg)] px-3 py-1 text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* h3, level with the list rows below: both are post entries
                    inside this section. At h2 it was a sibling of the section
                    heading, which read as though the rows were subsections of
                    the featured article. Typography classes are unchanged. */}
                <h3 className="max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[var(--text)] sm:text-5xl">
                  {featuredPost.title}
                </h3>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  {featuredPost.description}
                </p>

                <div className="mt-8 flex items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  <span>{formatDate(featuredPost.date)}</span>
                  <span className="h-1 w-1 rounded-full bg-current opacity-40" />
                  <span className="text-[var(--primary)] transition group-hover:translate-x-1">
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
            className="group block rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-5 py-6 transition hover:border-[var(--primary)] hover:bg-[var(--hoverSurface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] sm:px-6"
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
                <h3 className="text-2xl font-semibold tracking-[-0.025em] text-[var(--text)]">
                  {post.title}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  {post.description}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex text-sm font-semibold text-[var(--primary)] transition group-hover:translate-x-1">
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
            className="mt-5 text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            Clear filter
          </button>
        </div>
      )}
    </section>
  );
}
