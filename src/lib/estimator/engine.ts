import { ADDONS, COMPOUND_PAGE_RULES, CONTENT, DESIGN, FEATURE_PAGE_RULES, RANGE, TIME, pickTier, MAINTENANCE_PLANS } from "./config";
import type { BuildSpec, Estimate, FeatureId, QuoteDetails } from "./types";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

function selectedAddonMap(features: FeatureId[]) {
  const set = new Set(features);
  return ADDONS.filter((a) => set.has(a.id));
}

export function calculateRequiredPages(userPages: number, features: FeatureId[]) {
  const reasons: string[] = [];
  let required = clamp(userPages, 1, 10);

  // recommended minimum
  if (required < 3) required = 3;

  // per-feature additions
  for (const f of features) {
    const rule = FEATURE_PAGE_RULES[f];
    if (rule?.minPagesAdded) {
      required += rule.minPagesAdded;
      reasons.push(rule.reason);
    }
  }

  // compound floors
  for (const rule of COMPOUND_PAGE_RULES) {
    const hit = rule.when.every((x) => features.includes(x as FeatureId));
    if (hit && required < rule.minTotalPages) {
      required = rule.minTotalPages;
      reasons.push(rule.reason);
    }
  }

  required = clamp(required, 1, 10);
  return { pages: required, reasons: uniq(reasons) };
}

function hoursToWeekRange(hours: number) {
  const weeks = Math.max(1, Math.ceil(hours / TIME.hoursPerWeek));
  return { low: Math.max(1, weeks - 1), high: weeks + 1 };
}

function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function suggestedPages(spec: BuildSpec, normalizedPages: number) {
  const pages: string[] = ["Home", "Services", "Contact"];
  if (normalizedPages >= 4) pages.splice(2, 0, "About");

  if (spec.features.includes("booking")) pages.push("Booking");
  if (spec.features.includes("blog")) pages.push("Blog Index", "Blog Post Template");
  if (spec.features.includes("news")) pages.push("News Index", "News Article Template");
  if (spec.features.includes("payments")) pages.push("Payments / Checkout");
  if (spec.features.includes("membership")) pages.push("Login", "Member Area");
  if (spec.features.includes("funnel")) pages.push("Landing Page (Funnel)");

  return pages.slice(0, Math.max(3, normalizedPages + 2));
}

function frameworkLabel(q: QuoteDetails) {
  const map: Record<string, string> = {
    none: "No preference",
    nextjs: "Next.js",
    wordpress: "WordPress",
    shopify: "Shopify",
    webflow: "Webflow",
    squarespace: "Squarespace",
    other: "Other",
  };
  if (q.frameworkPref === "other") return q.frameworkOther?.trim() ? `Other: ${q.frameworkOther.trim()}` : "Other";
  return map[q.frameworkPref] ?? "No preference";
}

export function estimate(spec: BuildSpec, quote?: QuoteDetails): Estimate {
  const features = uniq(spec.features);

  const { pages: normalizedPages, reasons } = calculateRequiredPages(spec.pages, features);
  const tier = pickTier(normalizedPages);

  const addons = selectedAddonMap(features);
  const addonsPrice = addons.reduce((s, a) => s + a.price, 0);
  const addonsHours = addons.reduce((s, a) => s + a.hours, 0);

  const content = CONTENT[spec.content];
  const design = DESIGN[spec.design];

  let priceBase = tier.basePrice + addonsPrice + content.price;
  let hours = tier.baseHours + addonsHours + content.hours + design.hoursAdd;

  // design multiplier
  priceBase = priceBase * design.priceMultiplier;

  // rush
  let hoursRushAdjusted = hours;
  if (spec.timeline === "rush") {
    priceBase = priceBase * TIME.rushPriceMultiplier;
    hoursRushAdjusted = Math.max(0.1, hours * TIME.rushTimeMultiplier);
  }

  // ranges
  const priceLow = priceBase * RANGE.low;
  const priceHigh = priceBase * RANGE.high;

  const hoursForTimeline = spec.timeline === "rush" ? hoursRushAdjusted : hours;
  const wr = hoursToWeekRange(hoursForTimeline);
  const weeksLow = spec.timeline === "rush" ? Math.max(TIME.minRushWeeks, wr.low) : wr.low;
  const weeksHigh = spec.timeline === "rush" ? Math.max(TIME.minRushWeeks, wr.high) : wr.high;

  const pageStructure = suggestedPages(spec, normalizedPages);

  // Build sheet
  const lines: string[] = [];
  lines.push("WEBCRAFT LABS — BUILD SHEET");
  lines.push("====================================");
  lines.push(`Business type: ${spec.projectType}`);
  lines.push(`Goal: ${spec.goal}`);
  lines.push(`Tier: ${tier.label}`);
  lines.push(`Pages (requested → normalized): ${spec.pages} → ${normalizedPages}`);
  lines.push(`Design: ${spec.design}`);
  lines.push(`Timeline: ${spec.timeline}`);
  lines.push(`Content: ${spec.content}`);
  lines.push("");


  if (quote) {
    lines.push("Client details:");
    if (quote.name) lines.push(`- Name: ${quote.name}`);
    if (quote.email) lines.push(`- Email: ${quote.email}`);
    if (quote.business) lines.push(`- Business: ${quote.business}`);
    if (quote.website) lines.push(`- Website: ${quote.website}`);
    lines.push(`- Preferred platform/framework: ${frameworkLabel(quote)}`);
    if (quote.notes) lines.push(`- Notes: ${quote.notes}`);
    lines.push("");
  }

  // Maintenance plan output
  const mpId = quote?.maintenancePlan ?? "none";
  const mp =
    MAINTENANCE_PLANS.find((p) => p.id === mpId) ?? MAINTENANCE_PLANS[0];

  lines.push("Maintenance plan (optional):");
  lines.push(`- ${mp.label}${mp.monthly ? ` ($${mp.monthly}/mo)` : ""}`);
  if (mp.includes.length) {
    for (const item of mp.includes) lines.push(`  • ${item}`);
  }
  lines.push("");

  lines.push("Included foundation:");
  for (const x of tier.includes) lines.push(`- ${x}`);
  lines.push("");

  if (addons.length) {
    lines.push("Selected add-ons:");
    for (const a of addons) lines.push(`- ${a.label} (${money(a.price)}, ${a.hours} hrs)`);
    lines.push("");
  } else {
    lines.push("Selected add-ons: none");
    lines.push("");
  }

  lines.push("Estimated page structure:");
  for (const p of pageStructure) lines.push(`- ${p}`);
  lines.push("");

  if (reasons.length) {
    lines.push("Page adjustments (why we recommended more pages):");
    for (const r of reasons) lines.push(`- ${r}`);
    lines.push("");
  }

  lines.push("Estimate summary:");
  lines.push(`- Total hours (internal): ${hours.toFixed(1)} hrs`);
  if (spec.timeline === "rush") lines.push(`- Rush-adjusted hours: ${hoursRushAdjusted.toFixed(1)} hrs`);
  lines.push(`- Timeline (client): ${weeksLow}–${weeksHigh} weeks`);
  lines.push(`- Price range (client): ${money(priceLow)} – ${money(priceHigh)}`);
  lines.push("");
  lines.push("Milestones:");
  lines.push("- Discovery & scope");
  lines.push("- Design system & page layouts");
  lines.push("- Build & integrations");
  lines.push("- QA & launch");
  lines.push("- Post-launch support (optional)");

  const buildSheetText = lines.join("\n");

  return {
    tier,
    normalizedPages,
    hours,
    hoursRushAdjusted,
    weeksLow,
    weeksHigh,
    priceBase,
    priceLow,
    priceHigh,
    reasons,
    pageStructure,
    buildSheetText,
  };
}
