import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AffiliateLink from "./AffiliateLink";

describe("AffiliateLink", () => {
  afterEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  it("renders rel=\"sponsored noopener noreferrer\" and opens in a new tab", () => {
    render(
      <AffiliateLink href="https://supabase.com/pricing" tool="supabase">
        Supabase
      </AffiliateLink>
    );
    const link = screen.getByRole("link", { name: /Supabase/ });
    expect(link.getAttribute("rel")).toBe("sponsored noopener noreferrer");
    expect(link.getAttribute("target")).toBe("_blank");
  });

  it("shows the real destination — no redirect route, no cloaking", () => {
    render(<AffiliateLink href="https://neon.tech/pricing">Neon</AffiliateLink>);
    expect(screen.getByRole("link", { name: /Neon/ }).getAttribute("href")).toBe(
      "https://neon.tech/pricing"
    );
  });

  it("announces the new tab to screen readers", () => {
    render(<AffiliateLink href="https://vercel.com">Vercel</AffiliateLink>);
    expect(
      screen.getByRole("link", { name: "Vercel (opens in a new tab)" })
    ).toBeTruthy();
  });

  it("fires affiliate_click with the tool, destination host, and article path", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(
      <AffiliateLink
        href="https://supabase.com/pricing?ref=webcraftlabz"
        tool="supabase"
        article="/blog/solo-saas-stack"
      >
        Supabase
      </AffiliateLink>
    );
    fireEvent.click(screen.getByRole("link", { name: /Supabase/ }));

    expect(gtag).toHaveBeenCalledTimes(1);
    const [, eventName, params] = gtag.mock.calls[0];
    expect(eventName).toBe("affiliate_click");
    expect(params).toEqual({
      tool: "supabase",
      destination: "supabase.com",
      article: "/blog/solo-saas-stack",
    });
  });

  it("sends the host only, never the affiliate/tracking query string", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(
      <AffiliateLink href="https://example.com/plans?ref=secret-code&utm_source=x">
        Example
      </AffiliateLink>
    );
    fireEvent.click(screen.getByRole("link", { name: /Example/ }));

    const [, , params] = gtag.mock.calls[0];
    expect(JSON.stringify(params)).not.toContain("secret-code");
    expect(params.destination).toBe("example.com");
    // No explicit `tool` supplied — falls back to the destination host.
    expect(params.tool).toBe("example.com");
  });

  it("falls back to the current pathname when no article is supplied", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(<AffiliateLink href="https://example.com">Example</AffiliateLink>);
    fireEvent.click(screen.getByRole("link", { name: /Example/ }));

    const [, , params] = gtag.mock.calls[0];
    expect(params.article).toBe(window.location.pathname);
  });

  it("still navigates when analytics is unavailable (no gtag, malformed href)", () => {
    // No window.gtag at all, and a href that URL() cannot parse — neither
    // may throw, because a tracking failure must never break the click.
    render(<AffiliateLink href="not a url">Broken</AffiliateLink>);
    const link = screen.getByRole("link", { name: /Broken/ });
    expect(() => fireEvent.click(link)).not.toThrow();
    expect(link.getAttribute("href")).toBe("not a url");
  });
});
