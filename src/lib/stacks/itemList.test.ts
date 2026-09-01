import { describe, it, expect } from "vitest";
import { buildStackItemList } from "./itemList";
import { STACK_TRACKS } from "./config";
import type { StackTrack } from "./types";

const BASE = "https://example.com";

const planned = (id: string): StackTrack => ({
  id,
  title: `Planned ${id}`,
  description: "d",
  useCase: "u",
  shape: "s",
  status: "planned",
});

const published = (id: string, href: string): StackTrack => ({
  id,
  title: `Published ${id}`,
  description: "d",
  useCase: "u",
  shape: "s",
  status: "published",
  href,
});

/**
 * The regression these cover: the hub used to omit `mainEntity`
 * unconditionally, with a comment claiming the ItemList would arrive with
 * the first published guide. Nothing implemented that, so the first real
 * guide would have rendered a visible card that the structured data denied
 * existed. These exercise the published path, which live config cannot.
 */
describe("buildStackItemList", () => {
  it("returns undefined while every track is planned", () => {
    expect(buildStackItemList([planned("a"), planned("b")], BASE)).toBeUndefined();
  });

  it("returns undefined for an empty track list rather than an empty ItemList", () => {
    expect(buildStackItemList([], BASE)).toBeUndefined();
  });

  it("appears as soon as one track is published", () => {
    const list = buildStackItemList(
      [planned("a"), published("solo-saas", "/blog/solo-saas-stack")],
      BASE
    );
    expect(list).toBeDefined();
    expect(list!["@type"]).toBe("ItemList");
    expect(list!.numberOfItems).toBe(1);
  });

  it("lists only published tracks, with absolute canonical URLs", () => {
    const list = buildStackItemList(
      [
        published("solo-saas", "/blog/solo-saas-stack"),
        planned("fast-mvp"),
        published("ai-app", "/blog/ai-application-stack"),
      ],
      BASE
    )!;
    const items = list.itemListElement as Array<{ url: string; name: string; position: number }>;
    expect(items).toHaveLength(2);
    expect(items.map((i) => i.url)).toEqual([
      `${BASE}/blog/solo-saas-stack`,
      `${BASE}/blog/ai-application-stack`,
    ]);
    expect(items.map((i) => i.position)).toEqual([1, 2]);
    expect(JSON.stringify(list)).not.toContain("fast-mvp");
  });

  it("matches the live config's current state — nothing published yet", () => {
    expect(buildStackItemList(STACK_TRACKS, BASE)).toBeUndefined();
  });
});
