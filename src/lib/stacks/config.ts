import type { StackTrack, StackCriterion, DecisionTopic } from "./types";

/**
 * Developer Stack Library content map.
 *
 * Every track is `planned` today — no stack guide is published yet. When one
 * ships as /blog/<slug>, flip its status to "published" and add the href;
 * nothing else changes. All Resources picks the article up on its own,
 * because it derives from the content collections rather than from this file.
 *
 * This config never invents a resource. It describes what the library covers
 * and what it will cover; it is not a source of links to things that do not
 * exist.
 */
export const STACK_TRACKS: readonly StackTrack[] = [
  {
    id: "solo-saas",
    title: "Solo SaaS",
    description:
      "A product one person can ship and keep running without a platform team. Optimises for the smallest number of moving parts you can still grow on.",
    useCase: "One founder or a very small team, running it themselves",
    shape: "Managed everything, few services, boring where it counts",
    status: "planned",
  },
  {
    id: "fast-mvp",
    title: "Fast MVP",
    description:
      "Get something real in front of users quickly, accepting specific debt on purpose and knowing which parts you'd replace first.",
    useCase: "Validating an idea before committing to a full build",
    shape: "Speed over flexibility, with a documented exit from each shortcut",
    status: "planned",
  },
  {
    id: "ai-application",
    title: "AI Application",
    description:
      "Anything with a model in the request path. The hard parts are streaming, cost control, and knowing whether output quality is getting better or worse.",
    useCase: "Products where a model does real work, not a chat bolt-on",
    shape: "Provider layer, background jobs, evaluation and observability",
    status: "planned",
  },
  {
    id: "marketing-website",
    title: "Marketing Website",
    description:
      "A site that has to load fast, rank, and stay editable by whoever actually owns it two years from now.",
    useCase: "Businesses whose site is a channel, not a product",
    shape: "Static-first, content workflow decided up front",
    status: "planned",
  },
];

/**
 * The dimensions every guide is expected to address. Publishing this makes
 * the comparisons auditable — a reader can check whether a guide actually
 * answered these, rather than trusting a verdict.
 */
export const STACK_CRITERIA: readonly StackCriterion[] = [
  {
    id: "speed",
    label: "Development speed",
    detail: "How quickly a competent team gets to something real and deployed.",
  },
  {
    id: "maintenance",
    label: "Maintenance burden",
    detail: "What breaks on its own, and who has to be awake when it does.",
  },
  {
    id: "infra",
    label: "Infrastructure complexity",
    detail: "How many separate services exist, and how many you operate yourself.",
  },
  {
    id: "cost",
    label: "Cost at small scale",
    detail: "What it costs at low traffic, and where the first real bill appears.",
  },
  {
    id: "scaling",
    label: "Scaling path",
    detail: "What you change first if it works, and whether that is a rewrite.",
  },
  {
    id: "ecosystem",
    label: "Ecosystem maturity",
    detail: "Whether answers exist when something goes wrong at 2am.",
  },
  {
    id: "auth",
    label: "Authentication",
    detail: "Accounts, sessions, and permissions — build, buy, or inherit.",
  },
  {
    id: "data",
    label: "Database & data layer",
    detail: "Where state lives, how it is queried, and how it is migrated.",
  },
  {
    id: "deployment",
    label: "Deployment",
    detail: "How code reaches production, and how quickly it can be reversed.",
  },
  {
    id: "observability",
    label: "Observability",
    detail: "Whether you find out from your monitoring or from a customer.",
  },
  {
    id: "commerce",
    label: "Payments & email",
    detail: "Where money and transactional email fit, when the build needs them.",
  },
  {
    id: "portability",
    label: "Lock-in & portability",
    detail: "What it costs to leave, and which pieces are genuinely replaceable.",
  },
];

/**
 * Cross-cutting comparisons the library will cover. All planned — these are
 * stated as scope, never rendered as links to unpublished pages.
 */
export const DECISION_TOPICS: readonly DecisionTopic[] = [
  {
    id: "database",
    label: "Postgres, Supabase, or Neon",
    detail: "Managed Postgres options, and what you give up choosing each.",
    status: "planned",
  },
  {
    id: "auth",
    label: "Authentication options",
    detail: "Hosted auth against rolling your own, and the migration cost between them.",
    status: "planned",
  },
  {
    id: "hosting",
    label: "Hosting choices",
    detail: "Platform hosting, containers, and where the boundary actually sits.",
    status: "planned",
  },
  {
    id: "email",
    label: "Email infrastructure",
    detail: "Transactional delivery, deliverability, and why it stops working.",
    status: "planned",
  },
  {
    id: "observability",
    label: "Monitoring & analytics",
    detail: "Error tracking and product analytics without instrumenting everything twice.",
    status: "planned",
  },
  {
    id: "payments",
    label: "Payments",
    detail: "Subscriptions, one-off charges, and the parts that are never just a checkout.",
    status: "planned",
  },
];

/**
 * Published resources genuinely adjacent to choosing a stack. Slugs are
 * resolved against real content at render time, so a renamed or unpublished
 * article drops out rather than becoming a dead link.
 */
export const RELATED_RESOURCE_SLUGS: readonly string[] = [
  "building-your-first-developer-workbench",
  "custom-software-vs-off-the-shelf-tools",
  "mvp-vs-prototype-vs-production-application",
];
