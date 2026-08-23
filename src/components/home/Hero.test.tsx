import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders exactly one h1 with the approved homepage positioning", () => {
    render(<Hero />);
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(
      "Websites, software, and AI automation built around how your business actually works."
    );
  });

  it("renders the primary and secondary CTAs pointing at the right destinations", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Start Your Project" })).toHaveAttribute("href", "/build");
    expect(screen.getByRole("link", { name: "View Our Work" })).toHaveAttribute("href", "/portfolio");
  });
});
