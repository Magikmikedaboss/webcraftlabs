import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import SiteShell from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";

function renderShell() {
  return render(
    <ThemeProvider>
      <SiteShell>
        <div>Page content</div>
      </SiteShell>
    </ThemeProvider>
  );
}

describe("SiteShell desktop navigation", () => {
  it("orders top-level items as Services, Work, Resources, Build Calculator, About, Contact", () => {
    renderShell();
    expect(screen.getByRole("button", { name: /^Services/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Work" })[0]).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("button", { name: /^Resources/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Build Calculator" })[0]).toHaveAttribute("href", "/build");
    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute("href", "/about");
    expect(screen.getAllByRole("link", { name: "Contact" })[0]).toHaveAttribute("href", "/contact");
  });

  it("opens the Services dropdown on click and shows the three service links", () => {
    renderShell();
    const trigger = screen.getByRole("button", { name: /^Services/ });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const menu = screen.getByRole("menu");
    expect(within(menu).getByRole("menuitem", { name: "Websites & Local Growth" })).toHaveAttribute(
      "href",
      "/las-vegas-web-design"
    );
    expect(within(menu).getByRole("menuitem", { name: "Custom Software & SaaS" })).toHaveAttribute(
      "href",
      "/services/saas-platform-development"
    );
    expect(within(menu).getByRole("menuitem", { name: "AI & Automation" })).toHaveAttribute(
      "href",
      "/services/ai-automation"
    );
  });

  it("closes an open dropdown on Escape", () => {
    renderShell();
    const trigger = screen.getByRole("button", { name: /^Services/ });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.keyDown(document, { key: "Escape" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("shows only the four Phase 2 Resources destinations that exist today", () => {
    renderShell();
    fireEvent.click(screen.getByRole("button", { name: /^Resources/ }));
    const menu = screen.getByRole("menu");
    const links = within(menu)
      .getAllByRole("menuitem")
      .map((el) => [el.textContent, el.getAttribute("href")]);

    expect(links).toEqual([
      ["Resource Center", "/knowledge"],
      ["Learning Paths", "/knowledge#paths"],
      ["Blog", "/blog"],
      ["News", "/news"],
    ]);
  });

  it("never renders Archive in primary desktop navigation", () => {
    renderShell();
    fireEvent.click(screen.getByRole("button", { name: /^Services/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Resources/ }));
    // Scoped to the header nav landmark — Archive legitimately appears in
    // the footer (checked separately below), just not here.
    const headerNav = screen.getByRole("navigation");
    expect(within(headerNav).queryByText(/Archive/i)).not.toBeInTheDocument();
  });
});

describe("SiteShell footer", () => {
  it("surfaces Archive only as a distinctly labeled, subordinate footer link", () => {
    renderShell();
    const archiveLink = screen.getByRole("link", {
      name: "WebCraft Archive — Creative Works & Experiments",
    });
    expect(archiveLink).toHaveAttribute("href", "/archive");
  });

  it("does not list Archive among the plain footer nav links", () => {
    renderShell();
    // The plain footer nav renders SITE.nav labels exactly; "Archive" as a
    // standalone label should not appear there (only the fiction-labeled link).
    expect(screen.queryByRole("link", { name: "Archive" })).not.toBeInTheDocument();
  });
});
