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
    // Ensure there's a markInteracted callback that sets the ref to true
    expect(src).toMatch(/const\s+markInteracted\s*=\s*\(\)\s*=>\s*\{[\s\S]*?userInteractedRef\.current\s*=\s*true[\s\S]*?\}/);
    // Verify both pointerdown and wheel listeners use the markInteracted callback
    expect(src).toMatch(/addEventListener\(\s*["']pointerdown["']\s*,\s*markInteracted/);
    expect(src).toMatch(/addEventListener\(\s*["']wheel["']\s*,\s*markInteracted/);
  });

  it("the auto-fit loop bails out before touching the camera once that ref is set", () => {
    const fitFn = /const fitToData = \(\) => \{([\s\S]*?)\n\s*\};/.exec(src);
    expect(fitFn).not.toBeNull();
    const body = fitFn![1];
    // The interaction check must come before any centerAt/zoom call, not
    // after — otherwise one more fit still lands after the user's input.
    const guardIndex = body.indexOf("userInteractedRef.current");
    // Look for the actual ref method calls to avoid accidental matches
    // inside surrounding comments or other helpers.
    const centerAtIndex = body.indexOf("fg.centerAt");
    const zoomIndex = body.indexOf("fg.zoom");
    expect(guardIndex).toBeGreaterThan(-1);
    expect(centerAtIndex).toBeGreaterThan(-1);
    expect(zoomIndex).toBeGreaterThan(-1);
    // The guard must come before both camera-manipulating calls.
    expect(guardIndex).toBeLessThan(centerAtIndex);
    expect(guardIndex).toBeLessThan(zoomIndex);
  });
});
