export type MaintenancePlanId = "none" | "care" | "growth" | "priority";
export type ProjectType = "service" | "agency" | "ecommerce" | "content" | "other";
export type Goal = "leads" | "sales" | "brand" | "seo";
export type DesignLevel = "template" | "custom";
export type Timeline = "standard" | "rush";

export type ContentReadiness = "ready" | "assist" | "full";

export type FeatureId =
  | "advancedContact"
  | "booking"
  | "emailCapture"
  | "blog"
  | "news"
  | "seo"
  | "gbp"
  | "analytics"
  | "crm"
  | "payments"
  | "membership"
  | "funnel";

export type AddOn = {
  id: FeatureId;
  label: string;
  price: number; // USD
  hours: number; // decimals allowed
  description: string;
};

export type TierId = "starter" | "growth" | "full";

export type Tier = {
  id: TierId;
  label: string;
  minPages: number;
  maxPages: number;
  basePrice: number; // USD
  baseHours: number; // hours
  includes: string[];
};

export type BuildSpec = {
  projectType: ProjectType;
  goal: Goal;
  pages: number; // user input 1–10
  design: DesignLevel;
  timeline: Timeline;
  content: ContentReadiness;
  features: FeatureId[];
};

export type QuoteDetails = {
  name: string;
  email: string;
  business: string;
  website: string;
  notes: string;
  frameworkPref:
    | "none"
    | "nextjs"
    | "wordpress"
    | "shopify"
    | "webflow"
    | "squarespace"
    | "other";
  frameworkOther: string;
  maintenancePlan: MaintenancePlanId;
};

export type Estimate = {
  tier: Tier;
  normalizedPages: number; // after page rules
  hours: number; // total internal
  hoursRushAdjusted: number; // after rush time reduction (if any)
  weeksLow: number;
  weeksHigh: number;
  priceBase: number; // before range multipliers
  priceLow: number;
  priceHigh: number;
  reasons: string[]; // why pages were bumped
  pageStructure: string[]; // suggested pages/templates
  buildSheetText: string;
};
