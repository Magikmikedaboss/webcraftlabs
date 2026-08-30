import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMDX } from "next-mdx-remote/rsc";

import { TRUSTED_MDX_OPTIONS } from "@/lib/mdxOptions";
import Checklist from "@/components/mdx/Checklist";
import { SplitCompare } from "@/components/blog/EditorialTemplateV2";

/**
 * Regression coverage for the next-mdx-remote v6 `blockJS` default.
 *
 * v6 strips every JSX expression attribute (`<C prop={value} />`) unless
 * `blockJS: false` is passed. It does so *silently* — the MDX still compiles
 * and the component still mounts, it just never receives the prop. So these
 * tests deliberately assert on RENDERED OUTPUT rather than on compilation:
 * a compile-only test passed happily while the page rendered empty.
 */

/** Probe that echoes a numeric prop, so we can assert `number={3}` survives. */
function NumberProbe({ number = 1 }: { number?: number }) {
  return <div data-testid="number-probe">number={number}</div>;
}

/**
 * Probe for the array-of-objects prop shape (e.g. DiagnosticScore's `anchors`,
 * Takeaways' `items`). Deliberately a local probe rather than a real component,
 * so this suite depends only on the MDX runtime configuration it is testing.
 */
function AnchorsProbe({
  anchors = [],
}: {
  anchors?: { score: number; text: string }[];
}) {
  return (
    <ul>
      {anchors.map((a) => (
        <li key={a.score}>
          {a.score}: {a.text}
        </li>
      ))}
    </ul>
  );
}

const components = {
  Checklist,
  SplitCompare,
  NumberProbe,
  AnchorsProbe,
};

async function renderMdx(source: string, options: typeof TRUSTED_MDX_OPTIONS) {
  const { content } = await compileMDX({ source, components, options });
  return renderToStaticMarkup(content as React.ReactElement);
}

describe("TRUSTED_MDX_OPTIONS", () => {
  it("keeps blockDangerousJS at its secure default (never explicitly disabled)", () => {
    // Must stay undefined (defaults true) or explicitly true — never false.
    expect(TRUSTED_MDX_OPTIONS?.blockDangerousJS).not.toBe(false);
  });

  it("disables blockJS so JSX expression props reach components", () => {
    expect(TRUSTED_MDX_OPTIONS?.blockJS).toBe(false);
  });

  it("registers remark-gfm exactly once", () => {
    const plugins = TRUSTED_MDX_OPTIONS?.mdxOptions?.remarkPlugins ?? [];
    expect(plugins).toHaveLength(1);
  });
});

describe("expression-valued MDX props survive the live configuration", () => {
  it("preserves a numeric prop: <NumberProbe number={3} />", async () => {
    const html = await renderMdx(
      `<NumberProbe number={3} />`,
      TRUSTED_MDX_OPTIONS
    );
    expect(html).toContain("number=3");
    expect(html).not.toContain("number=1"); // 1 is the default → prop was stripped
  });

  it("preserves an array prop: <Checklist items={[...]} />", async () => {
    const html = await renderMdx(
      `<Checklist items={["One", "Two"]} />`,
      TRUSTED_MDX_OPTIONS
    );
    expect(html).toContain("One");
    expect(html).toContain("Two");
  });

  it("preserves multiple array props: <SplitCompare left={[...]} right={[...]} />", async () => {
    const html = await renderMdx(
      `<SplitCompare leftTitle="L" rightTitle="R" left={["Alpha"]} right={["Beta"]} />`,
      TRUSTED_MDX_OPTIONS
    );
    expect(html).toContain("Alpha");
    expect(html).toContain("Beta");
  });

  it("preserves an array-of-objects prop (DiagnosticScore/Takeaways shape)", async () => {
    const html = await renderMdx(
      `<AnchorsProbe
  category="Message Clarity"
  anchors={[
    { score: 0, text: "Nothing is clear" },
    { score: 5, text: "Everything is clear" }
  ]}
/>`,
      TRUSTED_MDX_OPTIONS
    );
    expect(html).toContain("Nothing is clear");
    expect(html).toContain("Everything is clear");
  });
});

describe("the old blockJS default is what broke rendering", () => {
  // These pin the exact regression. Under next-mdx-remote's defaults the MDX
  // compiles fine and the components mount — but the props are gone. If a
  // future upgrade changes this behaviour these tests will fail loudly, which
  // is the signal to revisit TRUSTED_MDX_OPTIONS.
  it("drops array props under the default options (documents the bug)", async () => {
    const html = await renderMdx(`<Checklist items={["One", "Two"]} />`, undefined);
    expect(html).not.toContain("One");
    expect(html).not.toContain("Two");
  });

  it("drops numeric props under the default options (documents the bug)", async () => {
    const html = await renderMdx(`<NumberProbe number={3} />`, undefined);
    expect(html).toContain("number=1"); // fell back to the default
    expect(html).not.toContain("number=3");
  });
});

describe("GitHub-Flavoured Markdown tables", () => {
  const table = [
    "| Metric | Threshold |",
    "|---|---|",
    "| LCP | 2.5 seconds or less |",
    "| CLS | 0.1 or less |",
  ].join("\n");

  it("renders pipe tables as real table markup", async () => {
    const html = await renderMdx(table, TRUSTED_MDX_OPTIONS);
    expect(html).toContain("<table>");
    expect(html).toContain("<thead>");
    expect(html).toContain("<tbody>");
    expect(html).toContain("<tr>");
    expect(html).toContain("<th>");
    expect(html).toContain("<td>");
    expect(html).toContain("Threshold");
    expect(html).toContain("2.5 seconds or less");
  });

  it("leaks raw pipe text without remark-gfm (documents the bug)", async () => {
    const html = await renderMdx(table, { blockJS: false });
    expect(html).not.toContain("<table>");
    expect(html).toContain("|---|---|");
  });
});
