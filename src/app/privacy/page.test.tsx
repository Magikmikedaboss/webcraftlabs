import React from "react";
import fs from "fs";
import path from "path";
import { render, screen, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SITE, getBaseUrl } from "@/lib/site";
import PrivacyPage, {
  metadata,
  PRIVACY_LAST_UPDATED,
  formatPolicyDate,
} from "./page";
import sitemap from "../sitemap";
import SiteShell from "@/components/SiteShell";
import { ThemeProvider } from "@/components/ThemeProvider";

const src = (rel: string) =>
  fs.readFileSync(path.join(process.cwd(), "src", rel), "utf8");

/** Every non-test .ts/.tsx file under src/, for whole-tree assertions. */
function sourceFiles(dir = path.join(process.cwd(), "src")): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return sourceFiles(full);
    if (!/\.tsx?$/.test(e.name)) return [];
    if (/\.test\.tsx?$/.test(e.name)) return [];
    return [full];
  });
}

/** SiteShell renders ThemeToggle, which requires the provider. */
const renderInShell = (ui: React.ReactElement) =>
  render(<ThemeProvider>{ui}</ThemeProvider>);

/** The rendered policy text, lowercased, for claim assertions. */
const policyText = () => {
  const { container } = renderInShell(<PrivacyPage />);
  return (container.textContent ?? "").toLowerCase();
};

describe("/privacy metadata", () => {
  it("sets a canonical URL", () => {
    expect(metadata.alternates?.canonical).toBe(`${getBaseUrl()}/privacy`);
  });

  it("supplies only its own title text (the root layout appends the site name)", () => {
    expect(metadata.title).toBe("Privacy Policy");
    expect(metadata.title as string).not.toContain(SITE.name);
  });

  it("has a description, and OG/Twitter metadata consistent with /disclosure", () => {
    expect(typeof metadata.description).toBe("string");
    expect((metadata.description as string).length).toBeGreaterThan(0);
    expect(metadata.openGraph?.title).toBe(`Privacy Policy | ${SITE.name}`);
    expect(metadata.twitter?.title).toBe(`Privacy Policy | ${SITE.name}`);
  });
});

describe("/privacy is discoverable", () => {
  it("appears in the sitemap", async () => {
    const entries = await sitemap();
    const entry = entries.find((e) => e.url === `${getBaseUrl()}/privacy`);
    expect(entry).toBeDefined();
    expect(entry?.lastModified).toBeInstanceOf(Date);
  });

  it("uses the same low priority and frequency as /disclosure", async () => {
    const entries = await sitemap();
    const privacy = entries.find((e) => e.url === `${getBaseUrl()}/privacy`);
    const disclosure = entries.find((e) => e.url === `${getBaseUrl()}/disclosure`);
    expect(privacy?.priority).toBe(disclosure?.priority);
    expect(privacy?.changeFrequency).toBe(disclosure?.changeFrequency);
  });
});

describe("/privacy page structure", () => {
  it("renders exactly one h1, supplied by SiteShell", () => {
    const { container } = renderInShell(<PrivacyPage />);
    const h1s = container.querySelectorAll("h1");
    expect(h1s.length).toBe(1);
    expect(h1s[0].textContent).toBe("Privacy Policy");
  });

  it("uses h2 for every section — no heading level is skipped", () => {
    const { container } = renderInShell(<PrivacyPage />);
    expect(container.querySelectorAll("h2").length).toBeGreaterThanOrEqual(10);
    expect(container.querySelectorAll("h3, h4, h5, h6").length).toBe(0);
  });

  it("links to /contact", () => {
    renderInShell(<PrivacyPage />);
    const contactLinks = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href") === "/contact");
    expect(contactLinks.length).toBeGreaterThan(0);
  });

  it("links to /disclosure from the affiliate section", () => {
    renderInShell(<PrivacyPage />);
    expect(
      screen.getAllByRole("link").some((a) => a.getAttribute("href") === "/disclosure")
    ).toBe(true);
  });

  it("shows a machine-readable last-updated date matching the sitemap entry", () => {
    const { container } = renderInShell(<PrivacyPage />);
    const time = container.querySelector("time");
    expect(time?.getAttribute("datetime")).toBe(PRIVACY_LAST_UPDATED);
    expect(src("app/sitemap.ts")).toContain(`'/privacy': '${PRIVACY_LAST_UPDATED}'`);
  });

  it("derives the visible date from PRIVACY_LAST_UPDATED rather than hardcoding it", () => {
    const { container } = renderInShell(<PrivacyPage />);
    const time = container.querySelector("time");
    // Same constant on both sides: the label and the machine-readable value
    // cannot drift, because the label is computed from the attribute's source.
    expect(time?.textContent?.trim()).toBe(formatPolicyDate(PRIVACY_LAST_UPDATED));
    expect(src("app/privacy/page.tsx")).not.toMatch(/>August 31, 2026</);
  });

  it("formats the date deterministically in UTC, whatever the local timezone", () => {
    // A date-only string parsed locally renders as the previous day west of
    // UTC; pinning to T00:00:00Z + timeZone UTC keeps label and attribute
    // describing the same calendar day everywhere.
    expect(formatPolicyDate("2026-08-31")).toBe("August 31, 2026");
    expect(formatPolicyDate("2026-01-01")).toBe("January 1, 2026");
    expect(src("app/privacy/page.tsx")).toContain('timeZone: "UTC"');
  });
});

describe("footer legal links", () => {
  it("renders a Privacy Policy link alongside the Affiliate Disclosure link", () => {
    renderInShell(
      <SiteShell>
        <p>content</p>
      </SiteShell>
    );
    const footer = screen.getByRole("contentinfo");
    expect(
      within(footer)
        .getAllByRole("link")
        .some((a) => a.getAttribute("href") === "/privacy")
    ).toBe(true);
    expect(
      within(footer)
        .getAllByRole("link")
        .some((a) => a.getAttribute("href") === "/disclosure")
    ).toBe(true);
  });
});

/**
 * These are the tests that matter. Each one ties a claim in the policy back
 * to the code that has to remain true for the claim to be honest — so if the
 * site's data flows change, the policy fails CI instead of quietly becoming
 * inaccurate.
 */
describe("policy claims match actual site behavior", () => {
  it("mentions Google Analytics — and GA4 is genuinely present", () => {
    const ga = src("components/GoogleAnalytics.tsx");
    expect(ga).toMatch(/googletagmanager\.com\/gtag\/js/);
    expect(policyText()).toContain("google analytics");
  });

  it("does not claim IP anonymization, which the GA config does not enable", () => {
    const ga = src("components/GoogleAnalytics.tsx");
    expect(ga).not.toMatch(/anonymize_?ip/i);
    expect(policyText()).not.toContain("anonymiz");
    expect(policyText()).not.toContain("anonymis");
  });

  it("does not claim a cookie consent banner, because none exists", () => {
    // No consent-mode call and no banner component anywhere in src.
    const ga = src("components/GoogleAnalytics.tsx");
    expect(ga).not.toMatch(/consent/i);
    const text = policyText();
    expect(text).toContain("do not currently show a cookie consent banner");
  });

  it("says the site sets no cookies of its own — nothing in src sets one", () => {
    // Scans the whole source tree rather than one file: the claim is about
    // the site, so any new cookie-setting call anywhere should fail it.
    // Reads are fine — ContactForm only *reads* a legacy _csrfSecret cookie,
    // and the proxy does Origin/Referer checks and issues no Set-Cookie —
    // so this matches writes only.
    const setsCookie = /document\.cookie\s*=|cookies\(\)\s*\.\s*set\b|\.cookies\.set\b|["'`]set-cookie["'`]|headers\.(set|append)\(\s*["'`]set-cookie/i;
    const files = sourceFiles();
    // Guard against a vacuous pass if the walker ever stops finding files.
    expect(files.length).toBeGreaterThan(50);
    expect(setsCookie.test('document.cookie = "a=b"')).toBe(true);
    const offenders = files.filter((f) => setsCookie.test(fs.readFileSync(f, "utf8")));
    expect(offenders.map((f) => path.relative(process.cwd(), f))).toEqual([]);
    expect(policyText()).toContain("does not set any cookies of its own");
  });

  it("names the contact form fields the API actually accepts", () => {
    const route = src("app/api/contact/route.ts");
    for (const field of ["name:", "email:", "project:"]) {
      expect(route).toContain(field);
    }
    const text = policyText();
    expect(text).toContain("your name, your email address, and a description of your project");
  });

  it("describes IP use for rate limiting, matching the route and limiter", () => {
    expect(src("app/api/contact/route.ts")).toContain("checkRateLimit");
    expect(src("lib/rateLimit.ts")).toContain("RATE_LIMIT_WINDOW");
    expect(policyText()).toContain("rate limit");
  });

  /**
   * rateLimit.ts only deletes expired entries inside a lazy cleanup branch
   * gated on `ipMap.size > CLEANUP_THRESHOLD`. Below that threshold an
   * expired entry is simply overwritten on the IP's next request, so the
   * rate-limit *window* is ~60s while the stored entry can outlive it. The
   * policy must not collapse those two into "deleted after a minute".
   */
  it("does not claim the IP is deleted or held for only about a minute", () => {
    const limiter = src("lib/rateLimit.ts");
    // The premise: deletion is conditional on the cleanup threshold.
    expect(limiter).toMatch(/if \(ipMap\.size > CLEANUP_THRESHOLD\)/);
    const text = policyText();
    expect(text).not.toContain("held in the server's memory for about a minute");
    expect(text).not.toMatch(/deleted after (about )?(a|one) minute/);
    expect(text).not.toMatch(/only (a|one) minute/);
  });

  it("distinguishes the rate-limit window from how long the entry stays in memory", () => {
    const text = policyText();
    expect(text).toContain("rate-limit window itself is about a minute");
    expect(text).toContain("can stay in memory past that window");
    expect(text).toContain("cleanup pass");
    expect(text).toContain("server process restarts");
    // The two hard guarantees that *are* true stay stated.
    expect(text).toContain("never written to a database");
    expect(text).toContain("never included in the email");
  });

  it("keeps the contact route's source comment consistent with that behavior", () => {
    const route = src("app/api/contact/route.ts");
    expect(route).toContain("expired entries may remain until");
    expect(route).toContain("lazy cleanup pass or process restart");
    expect(route).toContain("no database-backed");
    // The stale claim this PR set out to remove must never come back.
    expect(route).not.toMatch(/Retention:\s*30 days/i);
    expect(route).not.toMatch(/lives only in the in-memory map in rateLimit\.ts,\s*\n\s*\/\/ whose window/);
  });

  /**
   * GoogleAnalytics renders unconditionally in production — nothing consults
   * cookie state — so deleting cookies clears stored identifiers but does not
   * stop GA4 loading again and setting new ones.
   */
  it("does not present deleting cookies as an analytics opt-out", () => {
    const ga = src("components/GoogleAnalytics.tsx");
    // No gate on existing cookies/consent anywhere in the component.
    expect(ga).not.toMatch(/document\.cookie|consent|opt[-_ ]?out/i);
    const text = policyText();
    expect(text).toContain("does not prevent google analytics from loading on your next visit");
    // Blocking-style mechanisms are what's offered as actually effective.
    expect(text).toContain("blocking cookies or scripts");
    expect(text).toContain("tracking protection");
    expect(text).toContain("opt-out browser add-on");
  });

  it("does not claim the site has its own analytics opt-out control", () => {
    // Nothing in the app renders an analytics toggle.
    expect(src("components/GoogleAnalytics.tsx")).not.toMatch(/toggle|checkbox|button/i);
    expect(policyText()).toContain("do not offer an opt-out toggle on the site itself");
  });

  it("does not quote a fixed retention period, since none is implemented", () => {
    const text = policyText();
    expect(text).not.toMatch(/\b\d+\s*(days?|months?|years?)\b/);
    expect(text).toContain("as long as reasonably necessary");
  });

  it("describes the affiliate_click payload exactly as AffiliateLink sends it", () => {
    const link = src("components/analytics/AffiliateLink.tsx");
    expect(link).toContain('trackEvent("affiliate_click"');
    // Host only — never the full URL or its query string.
    expect(link).toContain("new URL(href).hostname");
    const text = policyText();
    expect(text).toContain("hostname");
    expect(text).toContain("does not include the full affiliate url or its query string");
  });

  it("does not imply affiliate links are already published", () => {
    const text = policyText();
    expect(text).toContain("no published article currently uses one");
    expect(text).toMatch(/if and when affiliate links do appear/);
  });

  it("claims no sale of personal information — and no ad/data-broker integration exists", () => {
    // Nothing in the app loads an ad, remarketing, or data-broker script.
    const offenders = ["doubleclick", "facebook.net", "fbq(", "adsbygoogle", "hotjar", "segment.com"];
    const layout = src("app/layout.tsx") + src("components/GoogleAnalytics.tsx");
    for (const o of offenders) expect(layout).not.toContain(o);
    expect(policyText()).toContain("do not sell personal information");
  });

  it("makes no compliance guarantees the repository cannot support", () => {
    const text = policyText();
    for (const claim of ["gdpr", "ccpa", "hipaa", "pci", "iso 27001", "soc 2", "certified"]) {
      expect(text).not.toContain(claim);
    }
  });

  it("states the Build Calculator does not transmit what you type", () => {
    // The calculator has no fetch/POST at all — it is client-side only.
    expect(src("app/build/BuildCalculatorClient.tsx")).not.toMatch(/fetch\(|\/api\//);
    expect(policyText()).toContain("not transmitted to us");
  });

  it("does not claim a mailing list, because there is no signup anywhere", () => {
    const text = policyText();
    expect(text).toContain("there is no mailing list on this site");
  });
});
