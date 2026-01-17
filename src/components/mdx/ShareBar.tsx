"use client";

import { useMemo, useState } from "react";

export default function ShareBar({
  title,
  url,
}: {
  title: string;
  url: string; // absolute URL
}) {
  const [copied, setCopied] = useState(false);

  const links = useMemo(() => {
    const t = encodeURIComponent(title);
    const u = encodeURIComponent(url);
    return {
      x: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    };
  }, [title, url]);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[var(--border)] bg-white/90 p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-800">Share</div>

      <a
        className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold hover:shadow"
        href={links.x}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>

      <a
        className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold hover:shadow"
        href={links.linkedin}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </a>

      <button
        type="button"
        className="rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-sm font-semibold hover:shadow"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1200);
          } catch {
            // fallback: select + copy can be added later if needed
          }
        }}
      >
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
