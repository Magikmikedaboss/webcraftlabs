import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import LearningPaths from "./LearningPaths";
import { getResourcesByPath, ACTIVE_LEARNING_PATHS } from "@/lib/resources";
import { LEARNING_PATH_META } from "@/lib/resourcePathMeta";

describe("LearningPaths", () => {
  it("renders exactly the four active paths as links with their real counts", () => {
    render(<LearningPaths />);
    for (const path of ACTIVE_LEARNING_PATHS) {
      const meta = LEARNING_PATH_META[path];
      const count = getResourcesByPath(path).length;
      const link = screen.getByRole("link", { name: new RegExp(meta.label) });
      expect(link).toHaveAttribute("href", `/knowledge/paths/${path}`);
      expect(within(link).getByText(new RegExp(`${count} resources?`))).toBeInTheDocument();
    }
  });

  it("renders Building Software Products as a teaser with no link and no fabricated count", () => {
    render(<LearningPaths />);
    const comingSoon = LEARNING_PATH_META["building-software-products"];
    expect(screen.getByText(comingSoon.label)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: new RegExp(comingSoon.label) })).not.toBeInTheDocument();
    // No stray digit anywhere near the teaser heading implying a resource count.
    const heading = screen.getByText(comingSoon.label);
    const panel = heading.closest("div");
    expect(panel?.textContent).not.toMatch(/\d+\s+resources?/);
  });
});
