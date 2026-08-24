import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProofHighlights, { FEATURED_IDS } from "./ProofHighlights";
import { PROJECTS } from "@/app/portfolio/projects";

describe("ProofHighlights — homepage compatibility with redesigned Project model", () => {
  it("renders its configured featured projects and does not show legacy names", () => {
    render(<ProofHighlights />);
    for (const id of FEATURED_IDS) {
      const proj = PROJECTS.find((p) => p.id === id);
      if (!proj) continue; // covered in the other test
      expect(screen.getByText(proj.title)).toBeInTheDocument();
    }
    expect(screen.queryByText(/ayso/i)).not.toBeInTheDocument();
  });

  it("every featured id it references actually exists in PROJECTS", () => {
    const ids = new Set(PROJECTS.map((p) => p.id));
    for (const id of FEATURED_IDS) {
      expect(ids.has(id)).toBe(true);
    }
  });

  it("discloses Live vs. In development status for every featured project", () => {
    render(<ProofHighlights />);
    const liveCount = FEATURED_IDS.filter((id) => PROJECTS.find((p) => p.id === id)?.status === "live").length;
    const inDevCount = FEATURED_IDS.length - liveCount;

    if (liveCount > 0) {
      expect(screen.getAllByText("Live").length).toBe(liveCount);
    }
    if (inDevCount > 0) {
      expect(screen.getAllByText("In development").length).toBe(inDevCount);
    }
  });
});
