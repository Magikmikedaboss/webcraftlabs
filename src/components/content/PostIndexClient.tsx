
"use client";


import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";

type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  kind: string;
};

interface PostIndexClientProps {
  posts: Post[];
  kind: string;
}

export default function PostIndexClient({ posts, kind }: PostIndexClientProps) {
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagSearch, setTagSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      post.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [posts]);

  const allTags = useMemo(
    () => Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]),
    [tagCounts]
  );

  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return allTags;
    return allTags.filter(tag =>
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    );
  }, [allTags, tagSearch]);

  const activeHighlightedIndex = dropdownOpen
    ? filteredTags.length === 0
      ? -1
      : Math.min(Math.max(highlightedIndex, 0), filteredTags.length - 1)
    : -1;

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags.includes(selectedTag))
    : posts;

  const kindLabel = kind === "blog" ? "Blog" : "News";

  const kindTheme =
    kind === "blog"
      ? {
          btnActive: "bg-cyan-500/20 text-cyan-300",
          focusRing: "focus:ring-cyan-400/40",
          tag: "bg-cyan-500 text-white",
          cardHover: "hover:border-cyan-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
          cardGlow: "bg-cyan-400/20",
          tagText: "text-cyan-300",
          titleHover: "group-hover:text-cyan-300",
          link: "text-cyan-400",
          linkHover: "group-hover:translate-x-1",
        }
      : {
          btnActive: "bg-blue-500/20 text-blue-300",
          focusRing: "focus:ring-blue-400/40",
          tag: "bg-blue-500 text-white",
          cardHover: "hover:border-blue-400/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
          cardGlow: "bg-blue-400/20",
          tagText: "text-blue-300",
          titleHover: "group-hover:text-blue-300",
          link: "text-blue-400",
          linkHover: "group-hover:translate-x-1",
        };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        !(dropdownRef.current && dropdownRef.current.contains(e.target as Node))
      ) {
        setDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [dropdownOpen]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen && ["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      setDropdownOpen(true);
      if (filteredTags.length > 0) setHighlightedIndex(0);
      return;
    }
    if (!dropdownOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(idx => {
        const next = Math.min(idx + 1, filteredTags.length - 1);
        // Scroll into view after state update
        setTimeout(() => {
          optionRefs.current[next]?.scrollIntoView({ block: "nearest" });
        }, 0);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(idx => {
        const prev = Math.max(idx - 1, 0);
        setTimeout(() => {
          optionRefs.current[prev]?.scrollIntoView({ block: "nearest" });
        }, 0);
        return prev;
      });
    } else if (e.key === "Enter") {
      if (activeHighlightedIndex >= 0) {
        const tag = filteredTags[activeHighlightedIndex];
        setSelectedTag(tag);
        setDropdownOpen(false);
        setTagSearch("");
        setHighlightedIndex(-1);
      }
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
      setHighlightedIndex(-1);
    }
  };


  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
          No {kindLabel} Posts Yet
        </h2>
        <p className="text-[var(--muted)]">
          Check back soon for updates!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tag Search */}
      <div className="mb-10 relative max-w-xs w-full">
        <input
          ref={inputRef}
          aria-label={`Filter ${kindLabel.toLowerCase()} posts by tag`}
          type="text"
          placeholder="Filter by tag..."
          value={tagSearch}
          onChange={e => {
            setTagSearch(e.target.value);
            setDropdownOpen(true);
            setHighlightedIndex(0);
          }}
          onFocus={() => {
            setDropdownOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleInputKeyDown}
          role="combobox"
          aria-controls="tag-combobox-listbox"
          aria-expanded={dropdownOpen}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-activedescendant={
            activeHighlightedIndex >= 0 && filteredTags[activeHighlightedIndex]
              ? `tag-option-${activeHighlightedIndex}`
              : undefined
          }
          className={`w-full px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm focus:outline-none focus:ring-2 ${kindTheme.focusRing} transition-all`}
        />
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            id="tag-combobox-listbox"
            role="listbox"
            className="absolute z-10 mt-2 w-full bg-[var(--surface,theme(colors.slate.900))]/95 dark:bg-[var(--surface-dark,#0d1420)]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-h-60 overflow-auto"
          >
            {filteredTags.map((tag, idx) => (
              <button
                key={tag}
                ref={el => {
                  optionRefs.current[idx] = el ?? null;
                }}
                id={`tag-option-${idx}`}
                role="option"
                aria-selected={activeHighlightedIndex === idx}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => {
                  setSelectedTag(tag);
                  setDropdownOpen(false);
                  setTagSearch("");
                  setHighlightedIndex(-1);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition ${
                  activeHighlightedIndex === idx
                    ? kindTheme.btnActive
                    : "hover:bg-white/10"
                }`}
              >
                {tag} <span className="opacity-60">({tagCounts[tag]})</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Tag */}
      {selectedTag && (
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1 rounded-full ${kindTheme.tag} text-xs font-semibold shadow hover:scale-105 transition`}
          >
            {selectedTag} ×
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map(post => (
          <Link
            key={post.slug}
            href={`/${kind}/${post.slug}`}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:scale-[1.03] ${kindTheme.cardHover}`}
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
              <div className={`absolute -top-10 -right-10 w-40 h-40 ${kindTheme.cardGlow} blur-3xl`} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 ${kindTheme.tagText}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className={`text-xl font-bold text-[var(--text)] ${kindTheme.titleHover} transition mb-2`}>
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--muted)] line-clamp-3 mb-4">
              {post.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-[var(--muted)]">
              <span>
                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(post.date))}
              </span>

              <span className={`flex items-center gap-1 font-semibold ${kindTheme.link} ${kindTheme.linkHover} transition`}>
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && selectedTag && (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-[var(--text)] mb-2">
            No posts found for &quot;{selectedTag}&quot;
          </h3>
          <button
            onClick={() => setSelectedTag(null)}
            className={`mt-4 ${kindTheme.link} hover:underline font-semibold`}
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}