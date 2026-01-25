import { AddOn, Tier, MaintenancePlanId } from "./types";

// Global time rules
export const TIME = {
  hoursPerDay: 6,
  daysPerWeek: 5,
  hoursPerWeek: 30, // 6*5
  rushTimeMultiplier: 0.75, // -25%
  rushPriceMultiplier: 1.25,
  minRushWeeks: 1,
};

// Estimate range multipliers
export const RANGE = {
  low: 0.9,
  high: 1.15,
};

// Design modifiers
export const DESIGN = {
  template: { priceMultiplier: 1.0, hoursAdd: 0.0 },
  custom: { priceMultiplier: 1.35, hoursAdd: 8.0 },
} as const;

// Base tiers (LOCKED v1)
export const TIERS: Tier[] = [
  {
    id: "starter",
    label: "Starter Static",
    minPages: 1,
    maxPages: 3,
    basePrice: 900,
    baseHours: 18.0,
    includes: [
      "Responsive layout",
      "CTA sections",
      "Basic contact form (name/email/message)",
      "Basic on-page SEO (title/meta/OG)",
      "Deployment + QA",
    ],
  },
  {
    id: "growth",
    label: "Growth Site",
    minPages: 4,
    maxPages: 7,
    basePrice: 3100,
    baseHours: 34.0,
    includes: [
      "Everything in Starter",
      "Expanded layouts",
      "Navigation + content hierarchy",
      "Reusable components",
    ],
  },
  {
    id: "full",
    label: "Full Site",
    minPages: 8,
    maxPages: 10,
    basePrice: 5000,
    baseHours: 52.0,
    includes: ["Everything in Growth", "Additional layout variants", "Deeper QA & polish"],
  },
];

// Add-ons (LOCKED v1)
export const ADDONS: AddOn[] = [
  { id: "advancedContact", label: "Advanced contact form", price: 250, hours: 1.5, description: "Validation, routing, spam upgrades." },
  { id: "booking", label: "Booking / scheduling", price: 450, hours: 6.0, description: "Calendly embed or booking flow + CTA wiring." },
  { id: "emailCapture", label: "Email capture", price: 300, hours: 3.0, description: "Email form + provider wiring + basic automation." },
  { id: "blog", label: "Blog system", price: 650, hours: 10.5, description: "Blog index + post template + basic tags." },
  { id: "news", label: "News / updates system", price: 550, hours: 8.0, description: "News feed + article template." },
  { id: "seo", label: "SEO setup (technical baseline)", price: 450, hours: 4.5, description: "Sitemap/robots, metadata patterns, structure checks." },
  { id: "gbp", label: "Google Business Profile setup", price: 250, hours: 2.0, description: "Setup or optimization checklist." },
  { id: "analytics", label: "Analytics + conversion events", price: 250, hours: 2.5, description: "GA4 + baseline conversion events + verification." },
  { id: "analyticsResearch", label: "Analytics research", price: 350, hours: 4.0, description: "In-depth analytics setup and research." },
  { id: "crm", label: "CRM integration", price: 600, hours: 9.0, description: "Lead routing + field mapping + testing." },
  { id: "payments", label: "Payments", price: 700, hours: 9.5, description: "Payment page/flow + confirmations." },
  { id: "membership", label: "Membership / login", price: 1100, hours: 18.0, description: "Auth + protected area scaffolding." },
  { id: "funnel", label: "Funnel / landing page", price: 450, hours: 6.0, description: "Dedicated conversion landing page + routing." },
  { id: "blackHatWelders", label: "Black Hat Welders service site", price: 800, hours: 12.0, description: "Custom service site for Black Hat Welders." },
];

// Content readiness pricing (LOCKED v1)
export const CONTENT = {
  ready: { label: "Content ready", price: 0, hours: 0 },
  assist: { label: "Copy assistance", price: 400, hours: 6.0 },
  full: { label: "Full copywriting", price: 1200, hours: 18.0 },
} as const;

// Feature → page impact
export const FEATURE_PAGE_RULES: Record<string, { minPagesAdded: number; reason: string }> = {
  blog: { minPagesAdded: 2, reason: "Blog requires an index page and a post template." },
  news: { minPagesAdded: 2, reason: "News requires a listing page and an article template." },
  booking: { minPagesAdded: 1, reason: "Booking typically lives on a dedicated page." },
  emailCapture: { minPagesAdded: 0, reason: "Email capture is usually embedded." },
  seo: { minPagesAdded: 0, reason: "SEO affects structure, not page count." },
  analytics: { minPagesAdded: 0, reason: "Analytics is backend-only." },
  analyticsResearch: { minPagesAdded: 0, reason: "Analytics research is backend-only." },
  gbp: { minPagesAdded: 0, reason: "GBP is external." },
  crm: { minPagesAdded: 0, reason: "CRM is an integration, not a page." },
  payments: { minPagesAdded: 1, reason: "Payments typically require a checkout/payment page." },
  membership: { minPagesAdded: 2, reason: "Membership requires login and protected area surfaces." },
  funnel: { minPagesAdded: 1, reason: "Funnels typically require a dedicated landing page." },
  advancedContact: { minPagesAdded: 0, reason: "Advanced contact form doesn't require a new page." },
  blackHatWelders: { minPagesAdded: 1, reason: "Service site requires a dedicated service page." },
};

// Compound overrides
export const COMPOUND_PAGE_RULES: Array<{ when: string[]; minTotalPages: number; reason: string }> = [
  { when: ["blog", "news"], minTotalPages: 7, reason: "Blog + News requires multiple content surfaces." },
  { when: ["membership"], minTotalPages: 8, reason: "Membership requires auth and protected views." },
  { when: ["payments"], minTotalPages: 6, reason: "Payments often require additional context pages." },
  { when: ["booking", "blog"], minTotalPages: 5, reason: "Content + conversion flow works best with separation." },
];

// Maintenance plans (LOCKED v1)
export const MAINTENANCE_PLANS = [
  {
    id: "none",
    label: "No maintenance (self-managed)",
    monthly: 0,
    hours: 0,
    includes: [],
  },
  {
    id: "care",
    label: "Care Plan",
    monthly: 149,
    hours: 0.75,
    includes: [
      "Security updates (monthly)",
      "Uptime monitoring",
      "Small text/image edits (up to 45 min)",
      "Monthly performance check",
    ],
  },
  {
    id: "growth",
    label: "Growth Plan",
    monthly: 299,
    hours: 1.5,
    includes: [
      "Everything in Care",
      "SEO upkeep (indexing checks + metadata review)",
      "Content assist (1 publish/month: blog or news)",
      "Conversion review (basic)",
    ],
  },
  {
    id: "priority",
    label: "Priority Plan",
    monthly: 599,
    hours: 3.0,
    includes: [
      "Everything in Growth",
      "Priority support window",
      "Landing page iteration (1/mo)",
      "Monthly analytics summary",
    ],
  },
] as const;

// MaintenancePlanId type is now imported from types.ts

// Tier picker
export function pickTier(pages: number): Tier {
  const found = TIERS.find((t) => pages >= t.minPages && pages <= t.maxPages);
  return found ?? TIERS[TIERS.length - 1];
}
