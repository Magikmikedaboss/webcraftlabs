/**
 * Interactive tools surfaced in the Resource Center.
 *
 * A config array rather than hardcoded JSX so a second tool (the planned
 * Stack Builder) can join by adding one entry, without touching layout.
 * Only tools that actually exist and work belong here — no placeholders,
 * no "coming soon" rows for things that aren't built.
 */
export type ResourceTool = {
  id: string;
  label: string;
  href: string;
  description: string;
  /** Optional second line clarifying what the tool is *not*, to set expectations. */
  note?: string;
  cta: string;
};

export const RESOURCE_TOOLS: readonly ResourceTool[] = [
  {
    id: "build-calculator",
    label: "Build Calculator",
    href: "/build",
    description:
      "An interactive estimator for scoping a website project. Choose page count, design level, content readiness, timeline, and add-ons, and it calculates a live price range and timeline — the same tool our own project-scoping process uses.",
    note: "It doesn't generate downloadable files or templates — it's a live calculator you use directly on the page.",
    cta: "Open the Build Calculator →",
  },
];
