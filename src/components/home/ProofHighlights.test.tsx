import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProofHighlights, { FEATURED_IDS } from "./ProofHighlights";
import { PROJECTS } from "@/app/portfolio/projects";

describe("ProofHighlights — homepage compatibility with expanded status model", () => {
  it("renders its configured featured projects and does not show legacy names", () => {
    render(<ProofHighlights />);
    for (const id of FEATURED_IDS) {
      const proj = PROJECTS.find((p) => p.id === id);
      if (!proj) continue; // covered in the other test
      expect(screen.getByText(proj.title)).toBeInTheDocument();
    }
    expect(screen.queryByText(/ayso/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/biohacking/i)).not.toBeInTheDocument();
  });

  it("every featured id it references actually exists in PROJECTS", () => {
    const ids = new Set(PROJECTS.map((p) => p.id));
    for (const id of FEATURED_IDS) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it("discloses accurate status for every featured project and never presents a business demo as a live website", () => {
    render(<ProofHighlights />);
    const STATUS_LABEL: Record<string, string> = {
      live: "Live website",
      "business-demo": "Business demo",
      "in-development": "In development",
    };
    const counts: Record<string, number> = {};
    for (const id of FEATURED_IDS) {
      const status = PROJECTS.find((p) => p.id === id)?.status;
      if (!status) continue;
      counts[status] = (counts[status] ?? 0) + 1;
    }
    for (const [status, count] of Object.entries(counts)) {
      expect(screen.getAllByText(STATUS_LABEL[status]).length).toBe(count);
    }
    // No featured project is a business demo today, so "Business demo" must not appear.
    if (!counts["business-demo"]) {
      expect(screen.queryByText("Business demo")).not.toBeInTheDocument();
    }
  });
});
