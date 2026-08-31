import { describe, it, expect } from "vitest";

import { estimate, calculateRequiredPages } from "./engine";
import { TIERS, ADDONS, CONTENT, DESIGN, RANGE, TIME, pickTier } from "./config";
import type { BuildSpec, FeatureId } from "./types";

/**
 * These tests pin the LOCKED v1 pricing model to exact values.
 *
 * They exist because /build previously shipped a placeholder estimator with its
 * own hardcoded constants, which quoted up to $6,500 less than this model for
 * the same scope. The published pricing guide is written against these numbers,
 * so an accidental change here silently desynchronises the site from the
 * article. If a value below changes, that must be a deliberate pricing decision
 * — update the article in the same change.
 */

const spec = (over: Partial<BuildSpec> = {}): BuildSpec => ({
  pages: 5,
  design: "template",
  content: "ready",
  timeline: "standard",
  features: [],
  ...over,
});

describe("config integrity", () => {
  it("has three non-overlapping, ascending tiers covering 1–10 pages", () => {
    expect(TIERS).toHaveLength(3);
    expect(TIERS.map(t => [t.minPages, t.maxPages])).toEqual([[1, 3], [4, 7], [8, 10]]);
    expect(TIERS.map(t => t.basePrice)).toEqual([900, 3100, 5000]);
    expect(TIERS.map(t => t.baseHours)).toEqual([18, 34, 52]);
    // price and hours must both increase with tier
    for (let i = 1; i < TIERS.length; i += 1) {
      expect(TIERS[i].basePrice).toBeGreaterThan(TIERS[i - 1].basePrice);
      expect(TIERS[i].baseHours).toBeGreaterThan(TIERS[i - 1].baseHours);
    }
  });

  it("pins the multipliers the pricing guide quotes", () => {
    expect(DESIGN.template.priceMultiplier).toBe(1.0);
    expect(DESIGN.custom.priceMultiplier).toBe(1.35);
    expect(CONTENT.ready.price).toBe(0);
    expect(CONTENT.assist.price).toBe(400);
    expect(CONTENT.full.price).toBe(1200);
    expect(RANGE.low).toBe(0.9);
    expect(RANGE.high).toBe(1.15);
    expect(TIME.rushPriceMultiplier).toBe(1.25);
  });

  it("selects tiers by page count at the boundaries", () => {
    expect(pickTier(1).id).toBe("starter");
    expect(pickTier(3).id).toBe("starter");
    expect(pickTier(4).id).toBe("growth");
    expect(pickTier(7).id).toBe("growth");
    expect(pickTier(8).id).toBe("full");
    expect(pickTier(10).id).toBe("full");
  });

  it("gives every add-on a positive price and hours", () => {
    for (const a of ADDONS) {
      expect(a.price).toBeGreaterThan(0);
      expect(a.hours).toBeGreaterThan(0);
    }
  });
});

describe("page normalisation", () => {
  it("floors at 3 pages", () => {
    expect(calculateRequiredPages(1, []).pages).toBe(3);
    expect(calculateRequiredPages(2, []).pages).toBe(3);
  });

  it("passes through counts already at or above the floor", () => {
    expect(calculateRequiredPages(5, []).pages).toBe(5);
  });

  it("adds pages for features that need their own surfaces", () => {
    // blog adds an index + a post template
    expect(calculateRequiredPages(5, ["blog"]).pages).toBe(7);
    expect(calculateRequiredPages(5, ["blog"]).reasons.length).toBeGreaterThan(0);
  });

  it("applies compound floors and clamps at 10", () => {
    expect(calculateRequiredPages(3, ["membership"]).pages).toBe(8);
    expect(calculateRequiredPages(10, ["blog", "news"]).pages).toBe(10);
  });
});

describe("base pricing", () => {
  it("prices a 3-page template build from the starter tier", () => {
    const e = estimate(spec({ pages: 3 }));
    expect(e.tier.id).toBe("starter");
    expect(e.priceBase).toBe(900);
    expect(e.priceLow).toBeCloseTo(810, 5);
    expect(e.priceHigh).toBeCloseTo(1035, 5);
    expect(e.hours).toBe(18);
  });

  it("moves to the growth tier at 4 pages", () => {
    const e = estimate(spec({ pages: 4 }));
    expect(e.tier.id).toBe("growth");
    expect(e.priceBase).toBe(3100);
  });

  it("moves to the full tier at 8 pages", () => {
    const e = estimate(spec({ pages: 8 }));
    expect(e.tier.id).toBe("full");
    expect(e.priceBase).toBe(5000);
  });
});

describe("modifiers", () => {
  it("applies the custom design multiplier to the whole subtotal", () => {
    const e = estimate(spec({ pages: 6, design: "custom" }));
    expect(e.priceBase).toBeCloseTo(3100 * 1.35, 5); // 4185
    expect(e.priceLow).toBeCloseTo(3766.5, 5);
    expect(e.priceHigh).toBeCloseTo(4812.75, 5);
    expect(e.hours).toBe(34 + 8); // design adds 8h
  });

  it("adds content cost before the design multiplier", () => {
    const e = estimate(spec({ pages: 6, design: "custom", content: "full" }));
    expect(e.priceBase).toBeCloseTo((3100 + 1200) * 1.35, 5); // 5805
    expect(e.hours).toBe(34 + 18 + 8);
  });

  it("adds add-on cost before the design multiplier", () => {
    const e = estimate(spec({ pages: 5, features: ["seo"] })); // seo = $450, 4.5h
    expect(e.priceBase).toBeCloseTo(3100 + 450, 5);
    expect(e.hours).toBe(34 + 4.5);
  });

  it("applies the rush multiplier last and shortens hours", () => {
    const std = estimate(spec({ pages: 6 }));
    const rush = estimate(spec({ pages: 6, timeline: "rush" }));
    expect(rush.priceBase).toBeCloseTo(std.priceBase * 1.25, 5);
    expect(rush.hoursRushAdjusted).toBeCloseTo(std.hours * 0.75, 5);
    expect(rush.weeksLow).toBeGreaterThanOrEqual(TIME.minRushWeeks);
  });

  it("derives the low/high range from priceBase", () => {
    const e = estimate(spec({ pages: 6, design: "custom" }));
    expect(e.priceLow).toBeCloseTo(e.priceBase * 0.9, 5);
    expect(e.priceHigh).toBeCloseTo(e.priceBase * 1.15, 5);
    expect(e.priceLow).toBeLessThan(e.priceHigh);
  });
});

describe("realistic end-to-end scenarios", () => {
  it("1 — simple small-business site: 3 pages, template, content ready", () => {
    const e = estimate(spec({ pages: 3 }));
    expect(Math.round(e.priceLow)).toBe(810);
    expect(Math.round(e.priceHigh)).toBe(1035);
    expect(e.tier.label).toBe("Starter Static");
  });

  it("2 — 6-page custom marketing site, content ready", () => {
    const e = estimate(spec({ pages: 6, design: "custom" }));
    expect(Math.round(e.priceLow)).toBe(3767);
    expect(Math.round(e.priceHigh)).toBe(4813);
    expect(e.normalizedPages).toBe(6);
    expect(e.tier.label).toBe("Growth Site");
  });

  it("3 — 9-page custom + full copy + blog/seo/analytics/crm", () => {
    const features: FeatureId[] = ["blog", "seo", "analytics", "crm"];
    const e = estimate(spec({ pages: 9, design: "custom", content: "full", features }));
    // blog pushes 9 -> 11, clamped to 10; still the full tier
    expect(e.normalizedPages).toBe(10);
    expect(e.tier.id).toBe("full");
    expect(Math.round(e.priceLow)).toBe(9902);
    expect(Math.round(e.priceHigh)).toBe(12653);
  });

  it("4 — advanced build: 10 pages, custom, full copy, 5 add-ons, rush", () => {
    const features: FeatureId[] = ["membership", "payments", "crm", "booking", "blog"];
    const e = estimate(spec({ pages: 10, design: "custom", content: "full", timeline: "rush", features }));
    expect(Math.round(e.priceLow)).toBe(14732);
    expect(Math.round(e.priceHigh)).toBe(18824);
  });

  it("prices increase monotonically across the four scenarios", () => {
    const a = estimate(spec({ pages: 3 }));
    const b = estimate(spec({ pages: 6, design: "custom" }));
    const c = estimate(spec({ pages: 9, design: "custom", content: "full", features: ["blog", "seo", "analytics", "crm"] }));
    const d = estimate(spec({ pages: 10, design: "custom", content: "full", timeline: "rush", features: ["membership", "payments", "crm", "booking", "blog"] }));
    expect(a.priceLow).toBeLessThan(b.priceLow);
    expect(b.priceLow).toBeLessThan(c.priceLow);
    expect(c.priceLow).toBeLessThan(d.priceLow);
  });
});

describe("build sheet", () => {
  it("includes tier, price range and selected add-ons", () => {
    const e = estimate(spec({ pages: 6, design: "custom", features: ["seo"] }));
    expect(e.buildSheetText).toContain("WEBCRAFT LABZ — BUILD SHEET");
    expect(e.buildSheetText).toContain("Growth Site");
    expect(e.buildSheetText).toContain("SEO setup (technical baseline)");
    expect(e.buildSheetText).toContain("Price range (client)");
  });

  it("omits business type and goal when the caller does not supply them", () => {
    // /build does not collect these, so the sheet must not print fabricated values.
    const e = estimate(spec());
    expect(e.buildSheetText).not.toContain("Business type:");
    expect(e.buildSheetText).not.toContain("Goal:");
  });

  it("includes them when supplied", () => {
    const e = estimate(spec({ projectType: "service", goal: "leads" }));
    expect(e.buildSheetText).toContain("Business type: service");
    expect(e.buildSheetText).toContain("Goal: leads");
  });

  it("reports the selected maintenance plan with its monthly price", () => {
    const e = estimate(spec(), {
      name: "", email: "", business: "", website: "", notes: "",
      frameworkPref: "none", frameworkOther: "", maintenancePlan: "growth",
    });
    expect(e.buildSheetText).toContain("Growth Plan");
    expect(e.buildSheetText).toContain("$299/mo");
  });

  it("states no maintenance when none is selected", () => {
    const e = estimate(spec());
    expect(e.buildSheetText).toContain("No maintenance");
  });
});

/**
 * Add-on price disclosure.
 *
 * The /build feature cards label each add-on "+$N base". These tests pin why
 * that wording is required: the engine adds N to the subtotal *before* the
 * design, rush and range multipliers, so the final total never moves by
 * exactly N once any modifier is active — and page-affecting features can also
 * push the build into a higher tier.
 *
 * These assert the CURRENT LOCKED v1 behaviour. They must not be "fixed" by
 * moving add-ons after the multipliers; that would change every quoted price.
 */
describe("add-on price is a base amount, not the final increment", () => {
  const delta = (over: Partial<BuildSpec>, feature: FeatureId) => {
    const a = estimate(spec(over));
    const b = estimate(spec({ ...over, features: [feature] }));
    return { low: b.priceLow - a.priceLow, high: b.priceHigh - a.priceHigh, before: a, after: b };
  };

  it("configured add-on prices are unchanged", () => {
    expect(ADDONS.find(a => a.id === "seo")?.price).toBe(450);
    expect(ADDONS.find(a => a.id === "blog")?.price).toBe(650);
  });

  it("A — template/standard: $450 add-on moves the range by ~$405–$518", () => {
    const d = delta({ pages: 5 }, "seo");
    expect(d.low).toBeCloseTo(405, 2);
    expect(d.high).toBeCloseTo(517.5, 2);
    expect(d.low).not.toBeCloseTo(450, 2); // the card's figure is not the increment
  });

  it("B — custom/standard: the same add-on moves it by ~$547–$699", () => {
    const d = delta({ pages: 5, design: "custom" }, "seo");
    expect(d.low).toBeCloseTo(546.75, 2);
    expect(d.high).toBeCloseTo(698.625, 2);
  });

  it("C — custom/rush: the same add-on moves it by ~$683–$873", () => {
    const d = delta({ pages: 5, design: "custom", timeline: "rush" }, "seo");
    expect(d.low).toBeCloseTo(683.4375, 2);
    expect(d.high).toBeCloseTo(873.28125, 2);
  });

  it("D — blog at 6 pages crosses Growth → Full, moving the range far beyond $650", () => {
    const d = delta({ pages: 6, design: "custom" }, "blog");
    expect(d.before.tier.id).toBe("growth");
    expect(d.after.tier.id).toBe("full");
    expect(d.before.normalizedPages).toBe(6);
    expect(d.after.normalizedPages).toBe(8);
    expect(d.low).toBeCloseTo(3098.25, 2);
    // ~4.8x the base price — this is what the reasons[] panel exists to explain
    expect(d.low).toBeGreaterThan(650 * 4);
  });

  it("supplies customer-readable reasons whenever the page count is adjusted", () => {
    const e = estimate(spec({ pages: 6, design: "custom", features: ["blog"] }));
    expect(e.normalizedPages).toBeGreaterThan(6);
    expect(e.reasons.length).toBeGreaterThan(0);
    expect(e.reasons.join(" ")).toContain("Blog");
  });

  it("stays quiet for ordinary selections that do not change the page count", () => {
    // seo has no page impact, so there is nothing to explain and the panel hides.
    expect(estimate(spec({ pages: 5, features: ["seo"] })).reasons).toHaveLength(0);
    expect(estimate(spec({ pages: 5 })).reasons).toHaveLength(0);
  });
});
