import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import EditorialTemplateV2 from "./EditorialTemplateV2";
import { LabHero } from "./lab-notebook";

/**
 * Article titles are headlines, not homepage billboards. Both reading
 * templates once grew to 8–9rem (editorial) and 7rem (lab) on desktop, which
 * pushed the longest published title to eight lines and over a full viewport
 * height before the body started.
 *
 * These assert the *scale tokens*, not rendered pixels — font rendering
 * varies by machine, class names do not. Mobile is asserted separately
 * because preserving it is the whole constraint on this fix.
 */

/** The billboard-sized steps that caused the problem. Must never come back. */
const BILLBOARD_STEPS = [
  "text-[7rem]",
  "text-[8rem]",
  "text-[9rem]",
  "text-8xl",
  "text-9xl",
];

function articleTitle() {
  render(
    <EditorialTemplateV2 post={{ title: "A Test Article", author: "WebCraft Labz" }}>
      <p>Body copy.</p>
    </EditorialTemplateV2>
  );
  return screen.getByRole("heading", { level: 1 });
}

describe("EditorialTemplateV2 article title scale", () => {
  it("caps the desktop steps at 5rem/5.5rem", () => {
    const cls = articleTitle().className;
    expect(cls).toContain("lg:text-[5rem]");
    expect(cls).toContain("xl:text-[5.5rem]");
  });

  it("keeps the mobile and small-screen steps untouched", () => {
    const cls = articleTitle().className;
    expect(cls).toContain("text-5xl");
    expect(cls).toContain("sm:text-7xl");
  });

  it("does not reintroduce a billboard-sized desktop step", () => {
    const cls = articleTitle().className;
    for (const step of BILLBOARD_STEPS) {
      expect(cls).not.toContain(step);
    }
  });

  it("keeps the wide measure that lets long titles wrap to few lines", () => {
    // Narrowing this actively hurts: at max-w-5xl the longest published title
    // wraps to five lines instead of four.
    expect(articleTitle().className).toContain("max-w-6xl");
  });
});

describe("LabHero article title scale", () => {
  const labTitle = () => {
    render(<LabHero title="A Test Lab Note" />);
    return screen.getByRole("heading", { level: 1 });
  };

  it("caps the desktop steps below the old 7rem", () => {
    const cls = labTitle().className;
    expect(cls).toContain("lg:text-[5rem]");
    expect(cls).toContain("xl:text-[6rem]");
  });

  it("keeps its own smaller-screen ramp", () => {
    const cls = labTitle().className;
    expect(cls).toContain("text-5xl");
    expect(cls).toContain("sm:text-6xl");
    expect(cls).toContain("md:text-7xl");
  });

  it("does not reintroduce a billboard-sized desktop step", () => {
    const cls = labTitle().className;
    for (const step of BILLBOARD_STEPS) {
      expect(cls).not.toContain(step);
    }
  });
});
