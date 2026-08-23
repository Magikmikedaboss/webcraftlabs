import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import MobileMenu from "./MobileMenu";
import { ThemeProvider } from "./ThemeProvider";

function renderMenu() {
  return render(
    <ThemeProvider>
      <MobileMenu />
    </ThemeProvider>
  );
}

describe("MobileMenu", () => {
  it("opens the panel and shows the Services and Resources accordion groups plus flat links", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute("href", "/portfolio");
    expect(screen.getByRole("link", { name: "Build Calculator" })).toHaveAttribute("href", "/build");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  it("reveals a group's links only once its <details> is expanded", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const servicesSummary = screen.getByText("Services").closest("summary") as HTMLElement;
    const details = servicesSummary.closest("details") as HTMLDetailsElement;
    expect(details.open).toBe(false);

    fireEvent.click(servicesSummary);
    expect(details.open).toBe(true);
    expect(screen.getByRole("link", { name: "AI & Automation" })).toHaveAttribute(
      "href",
      "/services/ai-automation"
    );
  });

  it("closes the panel on Escape", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
  });

  it("includes Creative Archive as the final item in the Resources group, linking to /archive", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));

    const resourcesSummary = screen.getByText("Resources").closest("summary") as HTMLElement;
    const details = resourcesSummary.closest("details") as HTMLDetailsElement;
    fireEvent.click(resourcesSummary);
    expect(details.open).toBe(true);

    const links = within(details)
      .getAllByRole("link")
      .map((el) => [el.textContent, el.getAttribute("href")]);

    expect(links[links.length - 1]).toEqual(["Creative Archive", "/archive"]);
  });

  it("does not surface Archive as a flat top-level mobile link outside the Resources group", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    // Archive legitimately appears inside the Resources group (checked
    // above) and in the footer — this only asserts it isn't also a
    // standalone flat link like Work/Build Calculator/About/Contact.
    const archiveLink = screen.getByRole("link", { name: "Creative Archive" });
    expect(archiveLink.closest("details")).not.toBeNull();
  });
});
