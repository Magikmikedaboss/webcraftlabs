import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import DiagnosticScore from "./DiagnosticScore";

const anchors = [
  { score: 0, text: "Nothing is clear" },
  { score: 5, text: "Everything is clear" },
];

const render = (props: Partial<React.ComponentProps<typeof DiagnosticScore>>) =>
  renderToStaticMarkup(
    <DiagnosticScore category="Message Clarity" anchors={anchors} {...props} />
  );

describe("DiagnosticScore max normalization", () => {
  it("defaults to a 0-5 scale", () => {
    const html = render({});
    expect(html).toContain("0–5");
    expect(html).toContain("Message Clarity: ___ / 5");
  });

  it("honours a valid custom maximum", () => {
    const html = render({ max: 10 });
    expect(html).toContain("0–10");
  });

  it("floors a fractional maximum above 1", () => {
    const html = render({ max: 7.9 });
    expect(html).toContain("0–7");
  });

  // Regression: `max={0.5}` passes a naive `> 0` check but floors to 0, which
  // collapsed the scale to zero length and clamped every anchor to 0.
  it.each([0.5, 0.99, 0, -3, Number.NaN, Number.POSITIVE_INFINITY])(
    "falls back to 5 when the normalized maximum is below 1 (max=%s)",
    (max) => {
      const html = render({ max });
      expect(html).toContain("0–5");
      expect(html).not.toContain("0–0");
      // anchors must survive at their own values, not be clamped to zero
      expect(html).toContain("Everything is clear");
    }
  );

  it("keeps anchors distinct rather than collapsing them", () => {
    const html = render({ max: 0.5 });
    expect(html).toContain("Nothing is clear");
    expect(html).toContain("Everything is clear");
    // the 5-anchor must still render as 5, not clamped down
    expect(html).toMatch(/>\s*5\s*<\/span>/);
  });
});
