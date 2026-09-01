import { isPublished, type StackTrack } from "./types";

/**
 * ItemList of the stack guides that actually exist, or undefined when none
 * do.
 *
 * Derived from STACK_TRACKS rather than written by hand, so publishing a
 * guide via the documented config-only workflow — flip `status`, add `href` —
 * updates the structured data too. Previously the hub's CollectionPage
 * omitted `mainEntity` unconditionally with a comment claiming the list
 * would arrive with the first published guide; nothing implemented that, so
 * the first real guide would have rendered a visible card that the
 * structured data denied existed.
 *
 * Returns undefined rather than an empty ItemList: advertising a collection
 * of zero items is not more honest than saying nothing.
 */
export function buildStackItemList(
  tracks: readonly StackTrack[],
  baseUrl: string
): Record<string, unknown> | undefined {
  const published = tracks.filter(isPublished);
  if (published.length === 0) return undefined;

  return {
    "@type": "ItemList",
    name: "Developer stack guides",
    numberOfItems: published.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: published.map((track, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}${track.href}`,
      name: track.title,
    })),
  };
}
