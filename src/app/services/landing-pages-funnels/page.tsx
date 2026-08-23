import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import ServicePageTemplate, { type ServicePageConfig } from "@/components/services/ServicePageTemplate";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Landing Page Design + Sales Funnels | ${SITE.name}`,
  description:
    "Landing page design and funnel development for lead generation, paid ads, service offers, launches, and conversion-focused campaigns.",
  alternates: {
    canonical: `${baseUrl}/services/landing-pages-funnels`,
  },
};

const deliverables = [
  "Custom landing page design",
  "Offer-first page strategy",
  "Lead generation forms",
  "Calendar booking integrations",
  "CRM-ready form structure",
  "Persuasive section flow",
  "Mobile-responsive layouts",
  "GA4 and event tracking setup",
  "Conversion-focused calls to action",
  "A/B testing-ready structure",
];

const funnelTypes = [
  "Google Ads landing pages",
  "Facebook and Instagram ad funnels",
  "Lead magnet landing pages",
  "Service offer pages",
  "Booking funnels",
  "Product launch pages",
  "Webinar registration pages",
  "Email campaign landing pages",
];

const processSteps = [
  {
    title: "Offer Strategy",
    description:
      "We clarify the offer, audience, pain points, trust signals, and main action you want visitors to take.",
  },
  {
    title: "Page Structure",
    description:
      "We map the sections, messaging flow, calls to action, proof points, and form placement before development.",
  },
  {
    title: "Design & Build",
    description:
      "We create a fast, mobile-friendly landing page built to keep visitors focused and moving toward conversion.",
  },
  {
    title: "Tracking & Launch",
    description:
      "We prepare analytics, conversion events, form testing, and launch support so you can measure performance.",
  },
];

const faqs = [
  {
    question: "What is a landing page?",
    answer:
      "A landing page is a focused web page built around one campaign, offer, or action. Instead of sending visitors to a general homepage, a landing page guides them toward a specific conversion like booking a call, filling out a form, downloading a guide, or requesting a quote.",
  },
  {
    question: "How is a funnel different from a regular website?",
    answer:
      "A regular website gives visitors many paths to explore. A funnel is more focused. It is designed to move people through a specific journey from attention to interest to action.",
  },
  {
    question: "Do I need a landing page for paid ads?",
    answer:
      "Most paid campaigns perform better when traffic is sent to a focused landing page instead of a general homepage. The message can match the ad, the offer is clearer, and the page is easier to measure.",
  },
  {
    question: "Can you connect forms, calendars, or CRM tools?",
    answer:
      "Yes. Landing pages can be connected to contact forms, booking calendars, email tools, CRM systems, analytics platforms, and other business tools depending on your needs.",
  },
  {
    question: "Can landing pages help local businesses?",
    answer:
      "Yes. Local businesses can use landing pages for specific services, seasonal offers, city-based campaigns, lead generation, quote requests, and appointment booking.",
  },
  {
    question: "Can you improve an existing landing page?",
    answer:
      "Yes. If you already have a landing page that is not converting well, we can improve the layout, copy structure, calls to action, page speed, mobile experience, and tracking setup.",
  },
];

const config: ServicePageConfig = {
  shellTitle: "Landing Page Design + Sales Funnels",
  shellIntro:
    "Conversion-focused landing pages and funnels built to turn campaign traffic into leads, bookings, quote requests, and sales opportunities.",
  hero: {
    src: "/images/dynamic-website-speed-light-trails-with-long-exposure-.webp",
    alt: "High-converting landing page and funnel performance",
  },
  eyebrow: "Landing Pages + Funnels",
  heading: "Send Traffic Somewhere Built to Convert",
  paragraphs: [
    "A homepage has too many doors. A landing page gives visitors one clear path. That makes it one of the most useful tools for paid ads, lead generation, service offers, launches, and local campaigns.",
    `At ${SITE.name}, we design and build landing pages that focus on the offer, the audience, and the action you want people to take. That could be booking a call, requesting a quote, joining a list, or starting a project.`,
    "Whether you are running Google Ads, social media campaigns, email promotions, or local Las Vegas service campaigns, your landing page should make the next step obvious.",
  ],
  bestFitTitle: "Best fit for",
  bestFitItems: [
    "Paid traffic campaigns",
    "Local service offers",
    "Lead magnet downloads",
    "Appointment booking funnels",
    "Launches and promotions",
    "Quote request campaigns",
  ],
  primaryItems: {
    title: "Conversion-Focused Deliverables",
    subtitle:
      "A strong landing page is not just a prettier page. It is a focused campaign asset with the right message, layout, tracking, and call to action.",
    items: deliverables,
  },
  highlightCards: {
    sectionTitle: "Built for Campaigns, Not Guesswork",
    cards: [
      {
        heading: "Clear Offer",
        body: "Visitors should understand what you offer, why it matters, and what to do next without hunting through your site.",
      },
      {
        heading: "Focused User Flow",
        body: "The page structure guides people from problem to solution to proof to action, with fewer distractions along the way.",
      },
      {
        heading: "Measurable Results",
        body: "Tracking setup helps you understand form submissions, clicks, bookings, campaign performance, and conversion paths.",
      },
    ],
  },
  secondaryItems: {
    title: "Landing Pages We Can Build",
    subtitle:
      "Different campaigns need different pages. A lead magnet page should not feel like a contractor quote page, and a booking funnel should not feel like a product launch page.",
    items: funnelTypes,
    cols: 4,
    itemStyle: "medium",
  },
  processSteps: {
    title: "Our Funnel Development Process",
    steps: processSteps,
  },
  localSection: {
    title: "Landing Pages for Local Businesses and Online Campaigns",
    paragraphs: [
      "Landing pages are especially useful for small businesses and local companies that want to promote one service, one location, or one offer at a time. Instead of sending every visitor to a general homepage, you can create a page around the exact thing they searched for or clicked on.",
      "For Las Vegas businesses, this can work well for contractor services, home service campaigns, event promotions, restaurant offers, professional services, consultations, and appointment-based businesses.",
      "The goal is simple: match the visitor's intent, remove confusion, and make the next step easy.",
    ],
  },
  whyChoose: {
    reasons: [
      {
        heading: "Built Around the Offer",
        body: "We focus the page around the campaign goal instead of forcing your traffic into a generic website layout.",
      },
      {
        heading: "Designed for Real Action",
        body: "Calls to action, form placement, trust signals, and section flow are planned around what visitors need before they convert.",
      },
      {
        heading: "Ready for Tracking",
        body: "Funnels should be measurable. We can structure pages for analytics, event tracking, form tracking, and campaign reporting.",
      },
      {
        heading: "Fast and Mobile-Friendly",
        body: "Most campaign traffic comes from mobile devices, so landing pages need to load quickly and feel simple on smaller screens.",
      },
    ],
  },
  faqs,
  relatedLinks: [
    { href: "/services/seo-technical-optimization", label: "SEO + Technical Optimization" },
    { href: "/services/custom-website-development", label: "Custom Website Development" },
    { href: "/las-vegas-web-design", label: "Las Vegas Web Design" },
    { href: "/las-vegas-web-design#landing-pages-funnels", label: "Las Vegas Landing Pages + Funnels" },
    {
      href: "/las-vegas-web-design#seo-technical-optimization",
      label: "Las Vegas SEO + Technical Optimization",
    },
  ],
  cta: {
    title: "Ready to Turn More Traffic Into Leads?",
    body: `If you are running ads, launching an offer, or promoting a service, ${SITE.name} can help you build a landing page that gives your traffic a clearer path to action.`,
  },
};

export default function LandingPagesFunnelsPage() {
  return <ServicePageTemplate config={config} />;
}