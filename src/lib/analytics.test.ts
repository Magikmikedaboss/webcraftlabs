import { describe, it, expect, vi, afterEach } from "vitest";
import { trackEvent } from "./analytics";

describe("trackEvent", () => {
  afterEach(() => {
    delete (window as unknown as { gtag?: unknown }).gtag;
  });

  it("calls window.gtag with the event name and params when gtag is present", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackEvent("generate_lead", { form_id: "contact_form" });

    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form_id: "contact_form" });
  });

  it("does not throw when window.gtag is missing", () => {
    expect(() => trackEvent("generate_lead")).not.toThrow();
  });

  it("does not throw when gtag itself throws", () => {
    window.gtag = () => {
      throw new Error("blocked by client");
    };
    expect(() => trackEvent("generate_lead")).not.toThrow();
  });
});
