"use client";

import { useMemo, useState, useRef, useEffect } from "react";

export default function ShareBar({
  title,
  url,
}: {
  title: string;
  url: string; // absolute URL
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const links = useMemo(() => {
    const t = encodeURIComponent(title);
    const u = encodeURIComponent(url);
    return {
      x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    };
  }, [title, url]);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border p-4 shadow-sm" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Share</div>

      <a
        className="rounded-xl border px-3 py-2 text-sm font-semibold hover:shadow"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--primary)' }}
        href={links.x}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>

      <a
        className="rounded-xl border px-3 py-2 text-sm font-semibold hover:shadow"
        style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--primary)' }}
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>

      <button
        type="button"
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold hover:shadow"
        onClick={async () => {
          if (copyTimeoutRef.current) {
            clearTimeout(copyTimeoutRef.current);
          }
          setCopyError(false);
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1200);
          } catch {
            setCopyError(true);
            if (copyTimeoutRef.current) {
              clearTimeout(copyTimeoutRef.current);
            }
            copyTimeoutRef.current = window.setTimeout(() => setCopyError(false), 1200);
          }
        }}
      >
        {copied ? "Copied ✓" : copyError ? "Copy failed" : "Copy link"}
      </button>
    </div>
  );
}
