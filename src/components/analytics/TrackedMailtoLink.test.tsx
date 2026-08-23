import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import TrackedMailtoLink from "./TrackedMailtoLink";

describe("TrackedMailtoLink", () => {
  afterEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  it("renders a normal mailto: link that opens the mail client (href untouched)", () => {
    render(
      <TrackedMailtoLink email="info@webcraftlabz.com">info@webcraftlabz.com</TrackedMailtoLink>
    );
    const link = screen.getByRole("link", { name: "info@webcraftlabz.com" });
    expect(link.getAttribute("href")).toBe("mailto:info@webcraftlabz.com");
  });

  it("fires mailto_click with no email address or mailto URL in the payload", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    render(
      <TrackedMailtoLink email="info@webcraftlabz.com">info@webcraftlabz.com</TrackedMailtoLink>
    );
    fireEvent.click(screen.getByRole("link", { name: "info@webcraftlabz.com" }));

    expect(gtag).toHaveBeenCalledTimes(1);
    const [, eventName, params] = gtag.mock.calls[0];
    expect(eventName).toBe("mailto_click");
    expect(params).toEqual({ contact_method: "email" });

    const serialized = JSON.stringify(params);
    expect(serialized).not.toContain("info@webcraftlabz.com");
    expect(serialized).not.toContain("mailto:");
  });
});
