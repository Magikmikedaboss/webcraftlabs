import { describe, it, expect } from "vitest";
import { generateStaticParams } from "./page";
import { ACTIVE_LEARNING_PATHS } from "@/lib/resources";

describe("/knowledge/paths/[path] generateStaticParams", () => {
  it("generates exactly the active paths and nothing else", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(ACTIVE_LEARNING_PATHS.length);
    expect(params.map((p) => p.path).sort()).toEqual([...ACTIVE_LEARNING_PATHS].sort());
  });

  it("generates the building-software-products path now that it's activated (Phase 4)", () => {
    const params = generateStaticParams();
    const paths: string[] = params.map((p) => p.path);
    expect(paths.includes("building-software-products")).toBe(true);
  });
});
