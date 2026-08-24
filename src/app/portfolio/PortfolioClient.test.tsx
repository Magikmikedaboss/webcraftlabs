import { render, screen, within, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import PortfolioClient from "./PortfolioClient";
import { PROJECTS, type Project } from "./projects";

function renderPortfolio(projects: Project[] = PROJECTS) {
  return render(
    <ThemeProvider>
      <PortfolioClient projects={projects} />
    </ThemeProvider>
  );
}

describe("PortfolioClient — approved project set", () => {
  it("renders all six approved projects", () => {
    renderPortfolio();
    for (const p of PROJECTS) {
      const card = screen.getByTestId(`project-card-${p.id}`);
      expect(within(card).getByText(p.title)).toBeInTheDocument();
    }
    expect(PROJECTS).toHaveLength(6);
  });

  it("has replaced AYSO naming with LeagueOS everywhere in portfolio data and UI", () => {
    const asText = JSON.stringify(PROJECTS);
    expect(asText.toLowerCase()).not.toContain("ayso");
    expect(PROJECTS.some((p) => p.id === "leagueos" && p.title === "LeagueOS")).toBe(true);

    renderPortfolio();
    expect(screen.getByText("LeagueOS")).toBeInTheDocument();
    expect(screen.queryByText(/ayso/i)).not.toBeInTheDocument();
  });

  it("reports correct live vs. in-development counts computed from data", () => {
    const liveCount = PROJECTS.filter((p) => p.status === "live").length;
    const inDevCount = PROJECTS.length - liveCount;
    expect(liveCount).toBe(2);
    expect(inDevCount).toBe(4);

    renderPortfolio();
    expect(screen.getByText(String(PROJECTS.length))).toBeInTheDocument();
    expect(screen.getByText(String(liveCount))).toBeInTheDocument();
    expect(screen.getByText(String(inDevCount))).toBeInTheDocument();
  });

  it("never claims case studies or paid client work", () => {
    renderPortfolio();
    expect(screen.queryByText(/case stud(y|ies)/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/client work/i)).not.toBeInTheDocument();
  });
});

describe("PortfolioClient — link integrity", () => {
  it("never renders a href=\"#\" link anywhere on the page", () => {
    const { container } = renderPortfolio();
    const hashLinks = Array.from(container.querySelectorAll('a[href="#"]'));
    expect(hashLinks).toHaveLength(0);
  });

  it("only renders 'Visit website' for projects that are live and have a verified publicUrl", () => {
    renderPortfolio();
    const visitLinks = screen.getAllByRole("link", { name: /visit website/i });
    const expectedVisitable = PROJECTS.filter((p) => p.status === "live" && !!p.publicUrl);
    expect(visitLinks).toHaveLength(expectedVisitable.length);
  });

  it("does not show 'Visit website' for in-development projects", () => {
    renderPortfolio();
    const inDevProjects = PROJECTS.filter((p) => p.status === "in-development");
    for (const p of inDevProjects) {
      const card = screen.getByTestId(`project-card-${p.id}`);
      expect(within(card).queryByText(/visit website/i)).not.toBeInTheDocument();
    }
  });
});

describe("PortfolioClient — project drawer", () => {
  it("opens the drawer with project details when 'View project details' is clicked", () => {
    renderPortfolio();
    const nelFuoco = PROJECTS.find((p) => p.id === "nelfuoco")!;
    const card = screen.getByTestId(`project-card-${nelFuoco.id}`);
    fireEvent.click(within(card).getByRole("button", { name: /view project details/i }));

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByText(nelFuoco.tagline)).toBeInTheDocument();
  });

  it("separates built-so-far content from planned/next work", () => {
    renderPortfolio();
    const project = PROJECTS.find((p) => (p.next?.length ?? 0) > 0)!;
    const card = screen.getByTestId(`project-card-${project.id}`);
    fireEvent.click(within(card).getByRole("button", { name: /view project details/i }));

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText(/what's been built so far/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/planned \/ next/i)).toBeInTheDocument();
    for (const item of project.next ?? []) {
      expect(within(dialog).getByText(item)).toBeInTheDocument();
    }
  });

  it("closes on Escape and restores focus to the triggering element", () => {
    renderPortfolio();
    const trigger = within(screen.getByTestId(`project-card-${PROJECTS[0].id}`)).getByRole("button", {
      name: /view project details/i,
    });
    trigger.focus();
    fireEvent.click(trigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when the Close button is clicked", () => {
    renderPortfolio();
    const trigger = within(screen.getByTestId(`project-card-${PROJECTS[0].id}`)).getByRole("button", {
      name: /view project details/i,
    });
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^close$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("only shows a public link in the drawer for live, verified-URL projects", () => {
    renderPortfolio();
    const inDev = PROJECTS.find((p) => p.status === "in-development")!;
    const trigger = within(screen.getByTestId(`project-card-${inDev.id}`)).getByRole("button", {
      name: /view project details/i,
    });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog");
    expect(within(dialog).queryByRole("link", { name: /visit website/i })).not.toBeInTheDocument();
  });

  it("shows a Visit website link in the drawer for live projects with a publicUrl", () => {
    renderPortfolio();
    const liveWithUrl = PROJECTS.find((p) => p.status === "live" && !!p.publicUrl)!;
    const trigger = within(screen.getByTestId(`project-card-${liveWithUrl.id}`)).getByRole("button", {
      name: /view project details/i,
    });
    fireEvent.click(trigger);

    const dialog = screen.getByRole("dialog");
    const visitLink = within(dialog).getByRole("link", { name: /visit website/i });
    expect(visitLink).toBeInTheDocument();
    expect(visitLink).toHaveAttribute("href", liveWithUrl.publicUrl);
  });
});

describe("PortfolioClient — image fallback and accessibility", () => {
  it("renders a designed placeholder (not a fabricated screenshot) when no image is set", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => !p.image)) {
      expect(screen.getAllByText(/preview coming soon/i).length).toBeGreaterThan(0);
      expect(p.image).toBeUndefined();
    }
  });

  it("renders a real image with meaningful alt text when the image field is populated", () => {
    const withImage: Project[] = [
      {
        ...PROJECTS[0],
        image: "/images/portfolio/example.png",
        imageAlt: "Example project dashboard screenshot",
      },
    ];
    renderPortfolio(withImage);
    const img = screen.getByAltText("Example project dashboard screenshot");
    expect(img).toBeInTheDocument();
    expect(img.tagName.toLowerCase()).toBe("img");
  });

  it("keeps the status indicator visible on a card even when a real image is set", () => {
    const withImage: Project[] = [
      {
        ...PROJECTS[0],
        status: "in-development",
        image: "/images/portfolio/example.png",
        imageAlt: "Example project dashboard screenshot",
      },
    ];
    renderPortfolio(withImage);
    const card = screen.getByTestId(`project-card-${withImage[0].id}`);
    expect(within(card).getByText("In development")).toBeInTheDocument();
  });
});

describe("PortfolioClient — theme tokens", () => {
  it("uses CSS custom-property tokens rather than hardcoded Tailwind color utilities for surfaces", () => {
    const { container } = renderPortfolio();
    const html = container.innerHTML;
    expect(html).toContain("var(--surface)");
    expect(html).toContain("var(--text)");
    expect(html).toContain("var(--border)");
    expect(html).not.toMatch(/bg-neutral-\d/);
    expect(html).not.toMatch(/from-blue-\d+ via-blue-\d+ to-cyan-\d+/);
  });
});
