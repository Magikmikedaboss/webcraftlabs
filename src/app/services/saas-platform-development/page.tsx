import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import ServicePageTemplate, { type ServicePageConfig } from "@/components/services/ServicePageTemplate";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `SaaS Platform Development Services | ${SITE.name}`,
  description:
    "SaaS platform development services for MVPs, dashboards, authentication, billing, subscriptions, customer workflows, and scalable product foundations.",
  alternates: {
    canonical: `${baseUrl}/services/saas-platform-development`,
  },
};

const buildScope = [
  "SaaS MVP development",
  "User authentication",
  "Account roles and permissions",
  "Subscription billing setup",
  "Payment integrations",
  "Customer dashboards",
  "Admin dashboards",
  "Database architecture",
  "Product onboarding flows",
  "Analytics and event tracking",
];

const platformTypes = [
  "Customer portals",
  "Membership platforms",
  "Internal business tools",
  "Subscription products",
  "Booking platforms",
  "AI-powered tools",
  "Marketplace MVPs",
  "Admin dashboards",
];

const processSteps = [
  {
    title: "Product Discovery",
    description:
      "We clarify the problem, audience, core features, user roles, business model, and first version of the product.",
  },
  {
    title: "MVP Planning",
    description:
      "We define the smallest useful version of the platform so you can launch faster without building unnecessary features.",
  },
  {
    title: "Design & Development",
    description:
      "We build the core user flows, dashboards, authentication, database structure, and product experience.",
  },
  {
    title: "Launch Foundation",
    description:
      "We prepare the platform for testing, payments, analytics, feedback, and future feature expansion.",
  },
];

const faqs = [
  {
    question: "What is SaaS platform development?",
    answer:
      "SaaS platform development is the process of building a web-based software product that users can access online, often through accounts, subscriptions, dashboards, and recurring services.",
  },
  {
    question: "Can you build a SaaS MVP?",
    answer:
      "Yes. An MVP focuses on the smallest useful version of your product so you can test the idea, collect feedback, and improve before investing in a larger build.",
  },
  {
    question: "Can you add authentication and user accounts?",
    answer:
      "Yes. SaaS platforms often include login systems, user accounts, roles, permissions, onboarding, and secure account flows.",
  },
  {
    question: "Can you connect subscriptions and payments?",
    answer:
      "Yes. A SaaS platform can include subscription billing, payment forms, plan tiers, checkout flows, and customer account management depending on the project needs.",
  },
  {
    question: "How long does a SaaS platform take to build?",
    answer:
      "Timeline depends on the scope. A focused MVP may take weeks, while a larger platform with complex workflows, integrations, and user roles can take longer.",
  },
  {
    question: "Do I need every feature in the first version?",
    answer:
      "No. Most SaaS products are better launched in stages. The first version should prove the core value before adding advanced features.",
  },
];

const config: ServicePageConfig = {
  shellTitle: "SaaS Platform Development Services",
  shellIntro:
    "Launch and grow SaaS products with clean architecture, secure user flows, dashboards, billing, and scalable product foundations.",
  hero: {
    src: "/images/structure-database-software-development.jpg",
    alt: "SaaS architecture with data and software platform components",
  },
  eyebrow: "SaaS Development",
  heading: "Build the First Version Without Building the Whole Castle",
  paragraphs: [
    "A SaaS product does not need every feature on day one. It needs the right foundation, the right user flows, and a clear path from idea to usable product.",
    `At ${SITE.name}, we help founders and teams build SaaS platforms, MVPs, customer portals, dashboards, and subscription-based products with clean architecture and practical growth in mind.`,
    "Whether you are starting with a rough idea, replacing spreadsheets, creating a paid tool, or building a custom platform for your business, we can help shape the product into something users can actually use.",
  ],
  bestFitTitle: "Who this is for",
  bestFitItems: [
    "Founders building an MVP",
    "Teams launching a subscription product",
    "Businesses replacing manual workflows",
    "Agencies needing client portals",
    "Startups testing a product idea",
    "Companies building internal tools",
  ],
  primaryItems: {
    title: "SaaS Build Scope",
    subtitle:
      "A strong SaaS platform needs more than screens. It needs account flows, data structure, user permissions, payment logic, dashboards, and a product experience that feels clear from the first login.",
    items: buildScope,
  },
  highlightCards: {
    sectionTitle: "Built for Product Growth",
    cards: [
      {
        heading: "MVP First",
        body: "We help focus the first version around the core value instead of burying the product under features nobody has tested yet.",
      },
      {
        heading: "User-Friendly Dashboards",
        body: "Dashboards should make tasks easier, not create a maze. We focus on clear navigation, useful data, and simple customer workflows.",
      },
      {
        heading: "Scalable Structure",
        body: "Clean architecture makes it easier to add new features, user roles, billing options, integrations, and product improvements later.",
      },
    ],
  },
  secondaryItems: {
    title: "Platforms We Can Help Build",
    subtitle:
      "SaaS development can take many forms. Some products start as a simple dashboard. Others become full subscription platforms, portals, tools, or internal operating systems.",
    items: platformTypes,
    cols: 4,
    itemStyle: "medium",
  },
  processSteps: {
    title: "Our SaaS Development Process",
    steps: processSteps,
  },
  localSection: {
    title: "From Idea to MVP to Product Foundation",
    paragraphs: [
      "Many SaaS ideas begin as a messy spreadsheet, a manual process, a repeated customer request, or a workflow that takes too much time. The first version of a platform should turn that problem into a usable tool.",
      "Instead of trying to build everything at once, we help shape the product around the most important user journey. That keeps the build leaner, easier to test, and easier to improve.",
      "Once the MVP is working, the platform can grow with better onboarding, billing options, admin tools, customer dashboards, reports, automations, and integrations.",
    ],
  },
  whyChoose: {
    reasons: [
      {
        heading: "Product Thinking",
        body: "We look beyond pages and buttons. We think about the user journey, the business model, the core feature set, and the product path.",
      },
      {
        heading: "Clean Technical Foundation",
        body: "SaaS platforms need structure. Authentication, permissions, data, dashboards, billing, and workflows should be planned carefully.",
      },
      {
        heading: "Launch Without Feature Bloat",
        body: "We help focus the build around what matters first so you can test, learn, and grow without wasting time on unnecessary complexity.",
      },
      {
        heading: "Built for Future Iteration",
        body: "Your first version should not trap you. A strong foundation gives you room to improve the product as real users give feedback.",
      },
    ],
  },
  faqs,
  relatedLinks: [
    { href: "/services/custom-website-development", label: "Custom Website Development" },
    { href: "/services/seo-technical-optimization", label: "SEO + Technical Optimization" },
    { href: "/services/landing-pages-funnels", label: "Landing Pages + Funnels" },
    { href: "/services/las-vegas-saas-platform-development", label: "Las Vegas SaaS Platform Development" },
    {
      href: "/services/las-vegas-custom-website-development",
      label: "Las Vegas Custom Website Development",
    },
  ],
  cta: {
    title: "Ready to Build Your SaaS MVP?",
    body: `If you have a software idea, customer portal, subscription product, or internal tool you want to bring to life, ${SITE.name} can help shape it into a focused first version.`,
    primaryCtaLabel: "Book a SaaS consult",
  },
};

export default function SaasPlatformDevelopmentPage() {
  return <ServicePageTemplate config={config} />;
}