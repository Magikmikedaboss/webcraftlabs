import Link from "next/link";
import { getBaseUrl } from "@/lib/site";

export type BreadcrumbItem = {
  label: string;
  /** Omit on the last (current-page) item. */
  href?: string;
};

/**
 * Single source of truth for both the visible breadcrumb trail and its
 * matching BreadcrumbList JSON-LD — the two can never drift since the JSON-LD
 * is generated directly from the same `items` array that gets rendered.
 *
 * Not used on the homepage by design (there's no "Home > Home" trail).
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  const baseUrl = getBaseUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-6 pt-4 text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-[var(--muted)]">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && <span aria-hidden="true">/</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-[var(--primary)] hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-[var(--text)] font-medium" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
