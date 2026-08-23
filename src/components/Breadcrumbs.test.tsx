import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Breadcrumbs from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  const items = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "AI & Automation" },
  ];

  it("renders nothing for an empty items array", () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a visible nav with a link for every item except the last", () => {
    render(<Breadcrumbs items={items} />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
    // Last item is the current page: rendered as text, not a link.
    expect(screen.queryByRole("link", { name: "AI & Automation" })).not.toBeInTheDocument();
    expect(screen.getByText("AI & Automation")).toHaveAttribute("aria-current", "page");
  });

  it("emits BreadcrumbList JSON-LD that matches the visible items exactly (single source of truth)", () => {
    const { container } = render(<Breadcrumbs items={items} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
    const jsonLd = JSON.parse(script!.innerHTML);

    expect(jsonLd["@type"]).toBe("BreadcrumbList");
    expect(jsonLd.itemListElement).toHaveLength(items.length);
    items.forEach((item, index) => {
      expect(jsonLd.itemListElement[index].position).toBe(index + 1);
      expect(jsonLd.itemListElement[index].name).toBe(item.label);
      if (item.href) {
        expect(jsonLd.itemListElement[index].item).toContain(item.href);
      } else {
        expect(jsonLd.itemListElement[index].item).toBeUndefined();
      }
    });
  });
});
