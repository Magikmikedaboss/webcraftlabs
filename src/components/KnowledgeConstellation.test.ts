import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";

const src = readFileSync(join(__dirname, "KnowledgeConstellation.tsx"), "utf8");

/**
 * The graph itself renders on canvas and can't be meaningfully driven in
 * jsdom, but the auto-fit-vs-user-interaction regression (the auto-fit
 * loop kept overriding the user's own pan/zoom/drag for the first 8s after
 * mount, making the graph feel unresponsive) is a structural guarantee
 * worth checking directly in source: a ref that's set on real pointer/
 * wheel input, and checked before the loop touches the camera.
 */
describe("KnowledgeConstellation — auto-fit stops once the user interacts", () => {
  it("tracks user interaction via a ref set on pointerdown/wheel", () => {
    expect(src).toMatch(/const userInteractedRef = useRef\(false\)/);
    expect(src).toMatch(/addEventListener\(\s*["']pointerdown["']/);
    expect(src).toMatch(/addEventListener\(\s*["']wheel["']/);
  });

  it("the auto-fit loop bails out before touching the camera once that ref is set", () => {
    const fitFn = /const fitToData = \(\) => \{([\s\S]*?)\n\s*\};/.exec(src);
    expect(fitFn).not.toBeNull();
    const body = fitFn![1];
    // The interaction check must come before any centerAt/zoom call, not
    // after — otherwise one more fit still lands after the user's input.
    const guardIndex = body.indexOf("userInteractedRef.current");
    const centerAtIndex = body.indexOf("centerAt");
    expect(guardIndex).toBeGreaterThan(-1);
    expect(centerAtIndex).toBeGreaterThan(-1);
    expect(guardIndex).toBeLessThan(centerAtIndex);
  });
});
