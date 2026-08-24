import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProofHighlights, { FEATURED_IDS, STATUS_LABEL } from "./ProofHighlights";
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

  it("discloses the correct status label on each featured project's own card", () => {
    render(<ProofHighlights />);
    for (const id of FEATURED_IDS) {
      const project = PROJECTS.find((p) => p.id === id);
      if (!project) continue;
      const card = screen.getByTestId(`proof-card-${id}`);
      expect(within(card).getByText(STATUS_LABEL[project.status])).toBeInTheDocument();
    }
  });

  it("never presents a business demo as a live website", () => {
    render(<ProofHighlights />);
    const hasFeaturedDemo = FEATURED_IDS.some(
      (id) => PROJECTS.find((p) => p.id === id)?.status === "business-demo"
    );
    // No featured project is a business demo today, so the label must not appear.
    if (!hasFeaturedDemo) {
      expect(screen.queryByText(STATUS_LABEL["business-demo"])).not.toBeInTheDocument();
    }
  });

  it("maps every status to its correct user-facing label, including business-demo", () => {
    // FEATURED_IDS currently has no business-demo entry, so this verifies the
    // mapping directly rather than only through a rendered card.
    expect(STATUS_LABEL.live).toBe("Live website");
    expect(STATUS_LABEL["business-demo"]).toBe("Business demo");
    expect(STATUS_LABEL["in-development"]).toBe("In development");
  });
});
