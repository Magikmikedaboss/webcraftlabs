import React from "react";
import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import LearningPaths from "./LearningPaths";
import { getResourcesByPath, ACTIVE_LEARNING_PATHS } from "@/lib/resources";
import { LEARNING_PATH_META } from "@/lib/resourcePathMeta";

describe("LearningPaths", () => {
  it("renders every active path as a link with its real count", () => {
    render(<LearningPaths />);
    for (const path of ACTIVE_LEARNING_PATHS) {
      const meta = LEARNING_PATH_META[path];
      const count = getResourcesByPath(path).length;
      expect(count).toBeGreaterThan(0);
      const link = screen.getByRole("link", { name: new RegExp(meta.label) });
      expect(link).toHaveAttribute("href", `/knowledge/paths/${path}`);
      expect(within(link).getByText(new RegExp(`${count} resources?`))).toBeInTheDocument();
    }
  });

  it("never renders a 'coming soon' teaser for a path whose status is active", () => {
    render(<LearningPaths />);
    // Regression: the teaser used to be hardcoded to always show
    // building-software-products regardless of its activation status,
    // which duplicated it as both an active card and a held-back teaser.
    expect(screen.queryByText("Growing next")).not.toBeInTheDocument();
    for (const path of ACTIVE_LEARNING_PATHS) {
      const meta = LEARNING_PATH_META[path];
      expect(screen.getAllByText(meta.label)).toHaveLength(1);
    }
  });
});
