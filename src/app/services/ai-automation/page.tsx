import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import ServicePageTemplate, { type ServicePageConfig } from "@/components/services/ServicePageTemplate";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `AI & Automation Services | ${SITE.name}`,
  description:
    "Practical workflow automation and AI-assisted systems for businesses that want less manual work — built with clear limitations, human review, and real integrations, not hype.",
  alternates: {
    canonical: `${baseUrl}/services/ai-automation`,
  },
};

const includedFeatures = [
  "Workflow mapping and automation scoping",
  "Rule-based automation for repetitive tasks",
  "AI-assisted tools for judgment-heavy or unstructured work",
  "Custom agents, where the task genuinely justifies one",
  "Integrations with your existing tools and data",
  "Human-review checkpoints on anything consequential",
  "Documentation your team can actually maintain",
  "Monitoring and handoff after launch",
];

const automationVsAi = [
  "Repetitive, rule-based tasks (data entry, notifications, scheduled reports) usually need ordinary automation — not AI",
  "Unstructured input, judgment calls, or pattern-matching across messy data is where AI-assisted systems earn their cost",
  "Most businesses need a mix: automate what's deterministic, apply AI only where structure genuinely doesn't exist yet",
  "We'll tell you when a workflow doesn't need AI at all — that's a legitimate outcome of the discovery process",
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We map your current workflow end to end — what's manual, what's repetitive, and where decisions actually require judgment.",
  },
  {
    title: "Design",
    description:
      "We decide, task by task, what's ordinary automation and what genuinely benefits from an AI-assisted approach — and say so plainly either way.",
  },
  {
    title: "Build & Integrate",
    description:
      "We build against your real tools and data, with human-review checkpoints on any step that affects customers, money, or compliance.",
  },
  {
    title: "Review & Handoff",
    description:
      "We test against real cases, document how it works, and hand off a system your team can monitor and adjust — not a black box.",
  },
];

const faqs = [
  {
    question: "Does my business actually need AI, or just automation?",
    answer:
      "Often just automation. A lot of workflows are repetitive and rule-based — those are cheaper and more reliable to automate directly. We only recommend AI-assisted approaches where the task involves unstructured input or judgment that plain automation can't handle. We'll tell you directly if AI isn't the right fit for what you're trying to solve.",
  },
  {
    question: "What are the realistic limitations of AI-assisted systems?",
    answer:
      "AI-assisted tools can misread ambiguous input, don't reliably handle edge cases they haven't seen, and shouldn't make unsupervised decisions on anything consequential — money, compliance, or customer-facing commitments. We build human-review checkpoints into any workflow where a mistake would actually matter.",
  },
  {
    question: "Do you build custom AI agents?",
    answer:
      "Where the task genuinely justifies it — yes. Most business problems don't need a custom agent; they need a well-scoped automation or a narrower AI-assisted tool. We scope this honestly during discovery rather than defaulting to the most complex option.",
  },
  {
    question: "What does WebCraft Labz's own experience with this look like?",
    answer:
      "We built Axon in-house as a research and signal-analysis tool — an internal experiment in applying AI to structured technical research, not a packaged product we resell. It's one example of how we think about scoping AI-assisted systems honestly: solving a specific, real problem rather than adding AI for its own sake.",
  },
  {
    question: "How do you handle integrations with our existing tools?",
    answer:
      "We work with whatever you already run — CRMs, spreadsheets, internal databases, third-party APIs. Discovery includes mapping what data actually needs to move where, before any automation or AI component gets designed.",
  },
  {
    question: "What does this cost and how long does it take?",
    answer:
      "It depends entirely on scope — a single automated workflow is a much smaller project than a multi-step AI-assisted system with several integrations. We'll give you a realistic estimate after discovery, not before we understand what you actually need.",
  },
];

const config: ServicePageConfig = {
  shellTitle: "AI & Automation",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "AI & Automation" },
  ],
  shellIntro:
    "Practical workflow automation and AI-assisted systems for businesses that want less manual work — not more hype.",
  eyebrow: "AI & Automation",
  heading: "Automation Built Around What Your Workflow Actually Needs",
  paragraphs: [
    "Not every workflow needs AI. Some just need to be automated — reliably, predictably, and without surprises. Others involve unstructured input or judgment calls where a plain rule-based script falls apart, and that's where an AI-assisted approach earns its cost.",
    `At ${SITE.name}, we start by figuring out which is which. That means mapping your actual workflow, identifying what's repetitive versus what requires judgment, and being direct about where AI genuinely helps and where it would just add complexity.`,
    "Where AI-assisted systems or custom agents are the right call, we build them with human-review checkpoints on anything consequential, real integrations with the tools you already use, and documentation your team can actually maintain after we hand it off.",
  ],
  bestFitTitle: "Best fit for",
  bestFitItems: [
    "Teams drowning in repetitive manual work",
    "Businesses with workflows that involve judgment calls or messy, unstructured input",
    "Startups that need internal tools before they need a full product",
    "Organizations that want a second opinion on whether AI is even the right tool",
  ],
  primaryItems: {
    title: "What's Included",
    subtitle:
      "Every engagement starts with discovery. What gets built depends on what the workflow actually needs — not a default AI-everything package.",
    items: includedFeatures,
  },
  highlightCards: {
    sectionTitle: "How We Think About This",
    cards: [
      {
        heading: "Automation First",
        body: "If a rule-based script solves the problem, that's what we build. It's cheaper, more predictable, and easier to maintain than an AI-assisted system that wasn't necessary.",
      },
      {
        heading: "AI Where It Earns Its Cost",
        body: "AI-assisted tools come in for genuinely unstructured or judgment-heavy work — not as a default upgrade to every workflow we touch.",
      },
      {
        heading: "Human Review, Always",
        body: "Anything that affects customers, money, or compliance gets a human-review checkpoint. We don't ship unsupervised decision-making on consequential tasks.",
      },
    ],
  },
  secondaryItems: {
    title: "Ordinary Automation vs. AI-Assisted Systems",
    subtitle: "A quick way to tell which one your workflow actually needs.",
    items: automationVsAi,
    cols: 2,
  },
  processSteps: {
    title: "Our Discovery-First Process",
    steps: processSteps,
  },
  whyChoose: {
    reasons: [
      {
        heading: "Honest Scoping",
        body: "We'll tell you when a workflow doesn't need AI at all. That's a normal, expected outcome of discovery — not a missed sales opportunity.",
      },
      {
        heading: "Real Integration Experience",
        body: "We build against the tools and data you already have, including internal systems, CRMs, and custom databases — not just off-the-shelf APIs.",
      },
      {
        heading: "Built-In Oversight",
        body: "Human-review checkpoints are part of the design, not an afterthought, for anything with real consequences if it gets something wrong.",
      },
      {
        heading: "Maintainable, Not a Black Box",
        body: "Documentation and a clear handoff mean your team can actually understand and adjust what we build, long after launch.",
      },
    ],
  },
  faqs,
  relatedLinks: [
    { href: "/services/saas-platform-development", label: "Custom Software & SaaS" },
    { href: "/services/custom-website-development", label: "Custom Website Development" },
    { href: "/services", label: "All Services" },
  ],
  cta: {
    title: "Not Sure If You Need Automation or AI?",
    body: "That's exactly what discovery is for. Tell us about the workflow, and we'll give you a straight answer — including if the honest answer is neither.",
    primaryCtaLabel: "Book a Discovery Call",
  },
};

export default function AiAutomationPage() {
  return <ServicePageTemplate config={config} />;
}
