import { render, screen, within, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import PortfolioClient from "./PortfolioClient";
import { PROJECTS, CATEGORY_ORDER, type Project } from "./projects";

function renderPortfolio(projects: Project[] = PROJECTS) {
  return render(
    <ThemeProvider>
      <PortfolioClient projects={projects} />
    </ThemeProvider>
  );
}

function openDrawerFor(id: string) {
  const trigger = within(screen.getByTestId(`project-card-${id}`)).getByRole("button", {
    name: /view build details/i,
  });
  fireEvent.click(trigger);
  return trigger;
}

describe("PortfolioClient — approved project inventory", () => {
  it("contains exactly the 10 curated projects", () => {
    expect(PROJECTS).toHaveLength(10);
  });

  it("reports 3 live / 3 business-demo / 4 in-development, computed from data", () => {
    const live = PROJECTS.filter((p) => p.status === "live");
    const demos = PROJECTS.filter((p) => p.status === "business-demo");
    const inDev = PROJECTS.filter((p) => p.status === "in-development");
    expect(live).toHaveLength(3);
    expect(demos).toHaveLength(3);
    expect(inDev).toHaveLength(4);
  });

  it("Mike's Pro Handyman, Nel Fuoco, and WebCraft Labz are the only live entries", () => {
    const liveIds = PROJECTS.filter((p) => p.status === "live")
      .map((p) => p.id)
      .sort();
    expect(liveIds).toEqual(["mikes-pro-handyman", "nelfuoco", "webcraft"].sort());
  });

  it("Black Hat Welders, Hailey Jade, and Glamping Retreat are the only business demos", () => {
    const demoIds = PROJECTS.filter((p) => p.status === "business-demo")
      .map((p) => p.id)
      .sort();
    expect(demoIds).toEqual(["black-hat-welders", "hailey-jade", "glamping-retreat"].sort());
  });

  it("Axon fully replaces Biohacking Research Platform", () => {
    const asText = JSON.stringify(PROJECTS).toLowerCase();
    expect(asText).not.toContain("biohacking");
    expect(asText).not.toContain("biotech");
    expect(PROJECTS.some((p) => p.id === "axon" && p.title === "Axon Research Platform")).toBe(true);
  });

  it("never contains AYSO wording anywhere in the data", () => {
    const asText = JSON.stringify(PROJECTS).toLowerCase();
    expect(asText).not.toContain("ayso");
  });

  it("project ordering within each category matches the approved editorial order", () => {
    for (const status of ["live", "business-demo", "in-development"] as const) {
      const idsInDataOrder = PROJECTS.filter((p) => p.status === status).map((p) => p.id);
      expect(idsInDataOrder).toEqual(CATEGORY_ORDER[status]);
    }
  });

  it("never claims case studies, client work, or paid engagements", () => {
    renderPortfolio();
    expect(screen.queryByText(/case stud(y|ies)/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/client work/i)).not.toBeInTheDocument();
  });
});

describe("PortfolioClient — counts and grouping", () => {
  it("renders correct honest counts derived from project data", () => {
    renderPortfolio();
    expect(within(screen.getByTestId("stat-total")).getByText("10")).toBeInTheDocument();
    expect(within(screen.getByTestId("stat-live")).getByText("3")).toBeInTheDocument();
    expect(within(screen.getByTestId("stat-demo")).getByText("3")).toBeInTheDocument();
    expect(within(screen.getByTestId("stat-in-dev")).getByText("4")).toBeInTheDocument();
  });

  it("groups projects under Live Websites / Business Demos / Products in Development headings by default", () => {
    renderPortfolio();
    expect(screen.getByRole("heading", { name: "Live Websites" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Business Demos" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Products in Development" })).toBeInTheDocument();
  });

  it("renders all 10 project cards", () => {
    renderPortfolio();
    for (const p of PROJECTS) {
      expect(screen.getByTestId(`project-card-${p.id}`)).toBeInTheDocument();
    }
  });
});

describe("PortfolioClient — filtering", () => {
  it("defaults to the All filter with an accessible pressed state", () => {
    renderPortfolio();
    const allButton = screen.getByRole("button", { name: /^All/ });
    expect(allButton).toHaveAttribute("aria-pressed", "true");
  });

  it("exposes accessible pressed state on every filter button, toggling on click", () => {
    renderPortfolio();
    const liveButton = screen.getByRole("button", { name: /^Live Websites/ });
    expect(liveButton).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(liveButton);
    expect(liveButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /^All/ })).toHaveAttribute("aria-pressed", "false");
  });

  it("Live Websites filter shows only the 3 live projects", () => {
    renderPortfolio();
    fireEvent.click(screen.getByRole("button", { name: /^Live Websites/ }));
    for (const p of PROJECTS.filter((p) => p.status === "live")) {
      expect(screen.getByTestId(`project-card-${p.id}`)).toBeInTheDocument();
    }
    for (const p of PROJECTS.filter((p) => p.status !== "live")) {
      expect(screen.queryByTestId(`project-card-${p.id}`)).not.toBeInTheDocument();
    }
  });

  it("Business Demos filter shows only the 3 business-demo projects", () => {
    renderPortfolio();
    fireEvent.click(screen.getByRole("button", { name: /^Business Demos/ }));
    for (const p of PROJECTS.filter((p) => p.status === "business-demo")) {
      expect(screen.getByTestId(`project-card-${p.id}`)).toBeInTheDocument();
    }
    for (const p of PROJECTS.filter((p) => p.status !== "business-demo")) {
      expect(screen.queryByTestId(`project-card-${p.id}`)).not.toBeInTheDocument();
    }
  });

  it("Products in Development filter shows only the 4 in-development projects", () => {
    renderPortfolio();
    fireEvent.click(screen.getByRole("button", { name: /^Products in Development/ }));
    for (const p of PROJECTS.filter((p) => p.status === "in-development")) {
      expect(screen.getByTestId(`project-card-${p.id}`)).toBeInTheDocument();
    }
    for (const p of PROJECTS.filter((p) => p.status !== "in-development")) {
      expect(screen.queryByTestId(`project-card-${p.id}`)).not.toBeInTheDocument();
    }
  });

  it("switching filters does not break drawer behavior", () => {
    renderPortfolio();
    openDrawerFor("nelfuoco");
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Business Demos/ }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(within(screen.getByRole("dialog")).getByText("Nel Fuoco")).toBeInTheDocument();
  });

  it("filter counts derive from project data", () => {
    renderPortfolio();
    const liveButton = screen.getByRole("button", { name: /^Live Websites/ });
    expect(within(liveButton).getByText("3")).toBeInTheDocument();
    const inDevButton = screen.getByRole("button", { name: /^Products in Development/ });
    expect(within(inDevButton).getByText("4")).toBeInTheDocument();
  });
});

describe("PortfolioClient — link integrity and labels", () => {
  it("never renders a href=\"#\" link anywhere on the page", () => {
    const { container } = renderPortfolio();
    expect(container.querySelectorAll('a[href="#"]')).toHaveLength(0);
  });

  it("live projects show 'Visit live website'", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => p.status === "live" && p.publicUrl)) {
      const card = screen.getByTestId(`project-card-${p.id}`);
      expect(within(card).getByText(/visit live website/i)).toBeInTheDocument();
    }
  });

  it("business demos show 'View business demo'", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => p.status === "business-demo" && p.publicUrl)) {
      const card = screen.getByTestId(`project-card-${p.id}`);
      expect(within(card).getByText(/view business demo/i)).toBeInTheDocument();
    }
  });

  it("in-development projects never render a public link", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => p.status === "in-development")) {
      const card = screen.getByTestId(`project-card-${p.id}`);
      expect(within(card).queryByText(/visit live website|view business demo/i)).not.toBeInTheDocument();
    }
  });
});

describe("PortfolioClient — business-demo disclosure", () => {
  it("every business demo renders the required disclosure in its drawer", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => p.status === "business-demo")) {
      openDrawerFor(p.id);
      const dialog = screen.getByRole("dialog");
      expect(within(dialog).getByText(/independent demonstration created by webcraft labz/i)).toBeInTheDocument();
      fireEvent.click(within(dialog).getByRole("button", { name: /^close$/i }));
    }
  });

  it("does not render the disclosure for live or in-development projects", () => {
    renderPortfolio();
    openDrawerFor("nelfuoco");
    expect(
      within(screen.getByRole("dialog")).queryByText(/independent demonstration created by webcraft labz/i)
    ).not.toBeInTheDocument();
  });
});

describe("PortfolioClient — project drawer", () => {
  it("opens with project details and separates Built now from Next or planned work", () => {
    renderPortfolio();
    const project = PROJECTS.find((p) => (p.next?.length ?? 0) > 0)!;
    openDrawerFor(project.id);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(within(dialog).getByText(/built now/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/next or planned work/i)).toBeInTheDocument();
    for (const item of project.next ?? []) {
      expect(within(dialog).getByText(item)).toBeInTheDocument();
    }
  });

  it("closes on Escape and restores focus to the triggering element", () => {
    renderPortfolio();
    const trigger = within(screen.getByTestId(`project-card-${PROJECTS[0].id}`)).getByRole("button", {
      name: /view build details/i,
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
    openDrawerFor(PROJECTS[0].id);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^close$/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("only shows a public action for projects that have one", () => {
    renderPortfolio();
    const inDev = PROJECTS.find((p) => p.status === "in-development")!;
    openDrawerFor(inDev.id);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).queryByRole("link", { name: /visit live website|view business demo/i })).not.toBeInTheDocument();
  });

  it("live project drawer link points at the verified publicUrl", () => {
    renderPortfolio();
    const live = PROJECTS.find((p) => p.status === "live" && !!p.publicUrl)!;
    openDrawerFor(live.id);
    const dialog = screen.getByRole("dialog");
    const link = within(dialog).getByRole("link", { name: /visit live website/i });
    expect(link).toHaveAttribute("href", live.publicUrl);
  });
});

describe("PortfolioClient — image fallback and accessibility", () => {
  it("renders a designed placeholder (not a fabricated screenshot) when no image is set", () => {
    renderPortfolio();
    for (const p of PROJECTS.filter((p) => !p.image)) {
      expect(p.image).toBeUndefined();
    }
    expect(screen.getAllByText(/preview coming soon/i).length).toBeGreaterThan(0);
  });

  it("no project with an image is missing imageAlt", () => {
    for (const p of PROJECTS.filter((p) => !!p.image)) {
      expect(p.imageAlt).toBeTruthy();
    }
  });

  it("renders a real image with meaningful alt text when the image field is populated", () => {
    const withImage: Project[] = [
      { ...PROJECTS[0], image: "/images/portfolio/example.png", imageAlt: "Example project dashboard screenshot" },
    ];
    renderPortfolio(withImage);
    const img = screen.getByAltText("Example project dashboard screenshot");
    expect(img).toBeInTheDocument();
    expect(img.tagName.toLowerCase()).toBe("img");
  });

  it("keeps the status badge visible on a card even when a real image is set", () => {
    const withImage: Project[] = [
      {
        ...PROJECTS[0],
        status: "business-demo",
        image: "/images/portfolio/example.png",
        imageAlt: "Example project dashboard screenshot",
      },
    ];
    renderPortfolio(withImage);
    const card = screen.getByTestId(`project-card-${withImage[0].id}`);
    expect(within(card).getByText("Business demo")).toBeInTheDocument();
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
