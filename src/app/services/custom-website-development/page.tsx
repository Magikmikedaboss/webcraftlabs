import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import ServicePageTemplate, { type ServicePageConfig } from "@/components/services/ServicePageTemplate";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Custom Website Development Services | ${SITE.name}`,
  description:
    "Custom website development services for businesses that need fast, scalable, SEO-friendly websites built to generate leads and grow online.",
  alternates: {
    canonical: `${baseUrl}/services/custom-website-development`,
  },
};

const includedFeatures = [
  "Custom Next.js website architecture",
  "Responsive mobile-friendly design",
  "Reusable page components",
  "Conversion-focused page layouts",
  "Technical SEO foundations",
  "Schema markup setup",
  "Core Web Vitals optimization",
  "Contact forms and lead capture",
  "Analytics-ready structure",
  "Scalable codebase for future growth",
];

const processSteps = [
  {
    title: "Discovery",
    description:
      "We learn about your business, your customers, your services, and what your website needs to accomplish.",
  },
  {
    title: "Strategy",
    description:
      "We plan the site structure, page flow, SEO targets, calls to action, and content sections before development begins.",
  },
  {
    title: "Design & Development",
    description:
      "We build a fast, responsive website using modern tools like Next.js, clean components, and performance-focused layouts.",
  },
  {
    title: "Launch & Optimize",
    description:
      "We test the site, prepare it for search engines, connect key tools, and help you launch with a strong foundation.",
  },
];

const industries = [
  "Contractors",
  "Home service businesses",
  "Restaurants",
  "Local service companies",
  "Artists and creators",
  "Event brands",
  "Professional services",
  "Startups",
];

const faqs = [
  {
    question: "What is custom website development?",
    answer:
      "Custom website development means your website is built around your business goals instead of being forced into a generic template. The design, structure, pages, and features are created to support your brand, customers, and growth plan.",
  },
  {
    question: "How much does a custom website cost?",
    answer:
      "Pricing depends on the number of pages, features, content needs, integrations, and design complexity. A simple business website costs less than a custom platform, ecommerce site, or advanced web application.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most small business websites can be completed in a few weeks, while larger custom websites or platforms may take longer depending on the scope.",
  },
  {
    question: "Will my website be mobile friendly?",
    answer:
      "Yes. Every website should be designed to work smoothly across phones, tablets, laptops, and desktop screens.",
  },
  {
    question: "Can you redesign my existing website?",
    answer:
      "Yes. If your current website is outdated, slow, hard to update, or not generating leads, a redesign can improve performance, trust, and user experience.",
  },
  {
    question: "Do you build SEO-friendly websites?",
    answer:
      "Yes. We build with SEO structure in mind, including clean page organization, metadata, headings, internal linking, performance, and technical foundations.",
  },
];

const config: ServicePageConfig = {
  shellTitle: "Custom Website Development Services",
  shellIntro:
    "Fast, scalable, SEO-friendly websites built to help your business attract customers, generate leads, and grow online.",
  hero: {
    src: "/images/web-development-cross-platform-solutions-design-and-development.webp",
    alt: "Custom website development architecture and cross-platform delivery",
  },
  eyebrow: "Custom Web Development",
  heading: "Your Website Should Work Like a Business Tool, Not Just a Digital Flyer",
  paragraphs: [
    "A good website should do more than look nice. It should load fast, explain what you offer, build trust, guide visitors, and help turn search traffic into real leads.",
    `At ${SITE.name}, we build custom websites for businesses that need more flexibility, better performance, and stronger search visibility than basic template builders can provide.`,
    "Whether you are launching a new business, upgrading an outdated site, or building a more advanced online platform, custom website development gives your brand a stronger foundation to grow.",
  ],
  bestFitTitle: "Best fit for",
  bestFitItems: [
    "Businesses replacing outdated websites",
    "Local companies that need more leads",
    "Brands that want better SEO structure",
    "Companies needing custom pages or integrations",
    "Startups building scalable web platforms",
  ],
  primaryItems: {
    title: "What's Included",
    subtitle:
      "Every project is different, but a strong custom website usually includes the core pieces needed for performance, usability, search visibility, and future growth.",
    items: includedFeatures,
  },
  highlightCards: {
    sectionTitle: "Built for Speed, SEO, and Conversions",
    cards: [
      {
        heading: "Performance First",
        body: "Fast websites create better user experiences and reduce the chances of visitors leaving before they contact you.",
      },
      {
        heading: "SEO-Friendly Structure",
        body: "We organize pages, headings, metadata, internal links, and technical foundations so search engines can better understand your site.",
      },
      {
        heading: "Conversion-Focused UX",
        body: "Your pages should guide visitors toward action, whether that means calling, booking, requesting a quote, or starting a project.",
      },
    ],
  },
  processSteps: {
    title: "Our Website Development Process",
    steps: processSteps,
  },
  localSection: {
    title: "Custom Websites for Local Businesses",
    paragraphs: [
      "If your business depends on local customers, your website needs to be built around how people actually search. A Las Vegas contractor, restaurant, event brand, or service company needs pages that clearly explain services, locations, trust signals, and calls to action.",
      "We help businesses create websites that are easier to understand, easier to navigate, and better prepared for local SEO. That means your site can support searches like custom website development, web design services, small business website design, and local business websites.",
    ],
    items: { items: industries, cols: 4, itemStyle: "medium" },
  },
  whyChoose: {
    reasons: [
      {
        heading: "Custom Instead of Cookie-Cutter",
        body: "Your business is not generic, so your website should not feel generic. We build around your brand, services, customers, and goals.",
      },
      {
        heading: "Built to Grow With You",
        body: "A clean development foundation makes it easier to add landing pages, service pages, blog content, integrations, and new features later.",
      },
      {
        heading: "Search Visibility Matters",
        body: "We think about SEO from the start, so your website has stronger bones before you begin publishing content or running campaigns.",
      },
      {
        heading: "Designed for Real Customers",
        body: "The goal is not just pretty pixels. The goal is helping visitors understand your offer and take the next step.",
      },
    ],
  },
  faqs,
  relatedLinks: [
    { href: "/services/seo-technical-optimization", label: "SEO + Technical Optimization" },
    { href: "/services/landing-pages-funnels", label: "Landing Pages + Funnels" },
    { href: "/services/saas-platform-development", label: "SaaS Platform Development" },
    { href: "/services/las-vegas-custom-website-development", label: "Las Vegas Custom Website Development" },
    { href: "/las-vegas-web-design", label: "Las Vegas Web Design" },
  ],
  cta: {
    title: "Ready to Build a Better Website?",
    body: `Whether you need a new business website, a redesign, or a custom web platform, ${SITE.name} can help you build something fast, professional, and ready to grow.`,
  },
};

export default function CustomWebsiteDevelopmentPage() {
  return <ServicePageTemplate config={config} />;
}