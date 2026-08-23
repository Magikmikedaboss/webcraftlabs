import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("never shows Archive in the mobile navigation panel (footer-only per Phase 2)", () => {
    renderMenu();
    fireEvent.click(screen.getByRole("button", { name: "Open navigation menu" }));
    expect(screen.queryByText(/Archive/i)).not.toBeInTheDocument();
  });
});
