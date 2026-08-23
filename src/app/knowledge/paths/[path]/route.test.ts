import { describe, it, expect } from "vitest";
import { generateStaticParams } from "./page";
import { ACTIVE_LEARNING_PATHS } from "@/lib/resources";

describe("/knowledge/paths/[path] generateStaticParams", () => {
  it("generates exactly the four active paths and nothing else", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(ACTIVE_LEARNING_PATHS.length);
    expect(params.map((p) => p.path).sort()).toEqual([...ACTIVE_LEARNING_PATHS].sort());
  });

  it("never generates a page for the held-back building-software-products path", () => {
    const params = generateStaticParams();
    // generateStaticParams()'s return type is already narrowed to
    // ActiveLearningPath by TypeScript (comparing directly against the
    // held-back literal is a compile error) — that's the real guarantee.
    // This runtime check guards the same invariant if the route's typing
    // is ever loosened.
    const paths: string[] = params.map((p) => p.path);
    expect(paths.includes("building-software-products")).toBe(false);
  });
});
