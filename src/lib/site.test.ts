import { describe, it, expect, afterEach, vi } from "vitest";

const ORIGINAL_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

async function loadSite() {
  vi.resetModules();
  return import("./site");
}

describe("SITE.url / getBaseUrl — canonical domain", () => {
  afterEach(() => {
    if (ORIGINAL_SITE_URL === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_SITE_URL;
    }
    vi.resetModules();
  });

  it("defaults to the canonical www production domain when NEXT_PUBLIC_SITE_URL is unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { SITE, getBaseUrl } = await loadSite();
    expect(SITE.url).toBe("https://www.webcraftlabz.com");
    expect(getBaseUrl()).toBe("https://www.webcraftlabz.com");
  });

  it("honors a valid NEXT_PUBLIC_SITE_URL override", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://staging.example.com";
    const { SITE, getBaseUrl } = await loadSite();
    expect(SITE.url).toBe("https://staging.example.com");
    expect(getBaseUrl()).toBe("https://staging.example.com");
  });

  it("never falls back to the redirecting apex domain", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { getBaseUrl } = await loadSite();
    expect(getBaseUrl()).not.toBe("https://webcraftlabz.com");
  });
});
