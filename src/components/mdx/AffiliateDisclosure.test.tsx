import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AffiliateDisclosure from "./AffiliateDisclosure";
import EditorialTemplateV2 from "@/components/blog/EditorialTemplateV2";

describe("AffiliateDisclosure", () => {
  it("states the commission, the no-extra-cost promise, and the independence rule", () => {
    render(<AffiliateDisclosure />);
    const text = screen.getByLabelText("Affiliate disclosure").textContent ?? "";
    expect(text).toContain("may contain affiliate links");
    expect(text).toContain("no additional cost to you");
    expect(text).toContain("never determines what we recommend");
  });

  it("does not claim we personally used or tested anything", () => {
    render(<AffiliateDisclosure />);
    const text = (screen.getByLabelText("Affiliate disclosure").textContent ?? "").toLowerCase();
    for (const claim of ["we use", "we tested", "we've tested", "personally"]) {
      expect(text).not.toContain(claim);
    }
  });

  it("links to the full /disclosure page", () => {
    render(<AffiliateDisclosure />);
    expect(screen.getByRole("link", { name: "How this works" }).getAttribute("href")).toBe(
      "/disclosure"
    );
  });

  it("exposes an accessible landmark rather than an unlabeled block", () => {
    render(<AffiliateDisclosure />);
    expect(screen.getByLabelText("Affiliate disclosure").tagName).toBe("ASIDE");
  });
});

/**
 * The disclosure has to be automatic — an author sets `affiliate: true`
 * and writes nothing. These cover both directions of that switch, and
 * that untouched articles are genuinely untouched.
 */
describe("EditorialTemplateV2 affiliate disclosure", () => {
  const renderPost = (affiliate?: boolean) =>
    render(
      <EditorialTemplateV2
        post={{ title: "A Test Article", author: "WebCraft Labz", affiliate }}
        readMins={4}
      >
        <p>Body copy.</p>
      </EditorialTemplateV2>
    );

  it("renders the disclosure when affiliate is true", () => {
    renderPost(true);
    expect(screen.getByLabelText("Affiliate disclosure")).toBeTruthy();
  });

  it("renders nothing when affiliate is false", () => {
    renderPost(false);
    expect(screen.queryByLabelText("Affiliate disclosure")).toBeNull();
  });

  it("renders nothing when affiliate is absent — every existing article", () => {
    renderPost(undefined);
    expect(screen.queryByLabelText("Affiliate disclosure")).toBeNull();
  });

  it("places the disclosure above the article body, not below it", () => {
    renderPost(true);
    const disclosure = screen.getByLabelText("Affiliate disclosure");
    const body = screen.getByText("Body copy.");
    // Node.DOCUMENT_POSITION_FOLLOWING === 4: body comes after the disclosure.
    expect(disclosure.compareDocumentPosition(body) & 4).toBeTruthy();
  });
});
