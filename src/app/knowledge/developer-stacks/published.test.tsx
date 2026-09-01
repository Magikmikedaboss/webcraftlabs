import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

/**
 * Renders the hub against a config where a track and a decision topic ARE
 * published — a state the live config cannot reach while everything is
 * planned.
 *
 * Without this, the "published renders as a link" assertions loop over an
 * empty array and verify nothing, which is exactly how a published guide
 * could have shipped unreachable.
 */
vi.mock("@/lib/stacks/config", async () => {
  const actual = await vi.importActual<typeof import("@/lib/stacks/config")>(
    "@/lib/stacks/config"
  );
  return {
    ...actual,
    STACK_TRACKS: [
      {
        id: "solo-saas",
        title: "Solo SaaS",
        description: "A product one person can ship.",
        useCase: "One founder",
        shape: "Managed everything",
        status: "published",
        href: "/blog/solo-saas-stack",
      },
      {
        id: "fast-mvp",
        title: "Fast MVP",
        description: "Ship quickly.",
        useCase: "Validating an idea",
        shape: "Speed over flexibility",
        status: "planned",
      },
    ],
    DECISION_TOPICS: [
      {
        id: "database",
        label: "Postgres, Supabase, or Neon",
        detail: "Managed Postgres options.",
        status: "published",
        href: "/blog/postgres-supabase-neon",
      },
      {
        id: "auth",
        label: "Authentication options",
        detail: "Hosted auth against rolling your own.",
        status: "planned",
      },
    ],
  };
});

import DeveloperStacksPage from "./page";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getBaseUrl } from "@/lib/site";

const renderHub = () => render(<ThemeProvider>{DeveloperStacksPage()}</ThemeProvider>);

const cardFor = (name: string | RegExp) =>
  screen.getByRole("heading", { name }).closest("li") as HTMLElement;

describe("hub with published content", () => {
  it("renders a published track as a link to its guide", () => {
    renderHub();
    const card = cardFor("Solo SaaS");
    const link = card.querySelector("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/blog/solo-saas-stack");
    expect(card.textContent).toContain("Read the guide");
    expect(card.textContent).not.toContain("Guide coming next");
  });

  it("still renders a planned track as a non-clickable card alongside it", () => {
    renderHub();
    const card = cardFor("Fast MVP");
    expect(card.querySelector("a")).toBeNull();
    expect(card.textContent).toContain("Guide coming next");
  });

  it("renders a published decision topic as a reachable link", () => {
    renderHub();
    const card = cardFor("Postgres, Supabase, or Neon");
    const link = card.querySelector("a");
    expect(link).not.toBeNull();
    expect(link!.getAttribute("href")).toBe("/blog/postgres-supabase-neon");
    expect(card.textContent).toContain("Read the comparison");
    expect(card.textContent).not.toContain("Planned");
  });

  it("still marks an unpublished decision topic as planned", () => {
    renderHub();
    const card = cardFor("Authentication options");
    expect(card.querySelector("a")).toBeNull();
    expect(card.textContent).toContain("Planned");
  });

  it("stops claiming nothing is published once something is", () => {
    const { container } = renderHub();
    expect(container.textContent).not.toContain("none are published yet");
  });

  it("adds the published track to the CollectionPage ItemList", () => {
    const { container } = renderHub();
    const data = JSON.parse(
      container.querySelector("#stacks-collection-jsonld")?.textContent ?? "{}"
    );
    expect(data.mainEntity).toBeDefined();
    expect(data.mainEntity["@type"]).toBe("ItemList");
    expect(data.mainEntity.numberOfItems).toBe(1);
    expect(data.mainEntity.itemListElement[0].url).toBe(
      `${getBaseUrl()}/blog/solo-saas-stack`
    );
    // The planned track is never advertised as a URL.
    expect(JSON.stringify(data)).not.toContain("fast-mvp");
  });
});
