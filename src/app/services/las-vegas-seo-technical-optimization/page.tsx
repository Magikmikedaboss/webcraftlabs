import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import LocalServiceStubPage from "@/components/services/LocalServiceStubPage";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas SEO + Technical Optimization | ${SITE.name}`,
  description:
    "Las Vegas technical SEO services for businesses in Summerlin, Henderson, and North Las Vegas, focused on crawlability, Core Web Vitals, internal linking, and stronger local search visibility.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-seo-technical-optimization`,
  },
};

export default function LasVegasSeoTechnicalOptimizationPage() {
  return (
    <LocalServiceStubPage
      title="Las Vegas SEO + Technical Optimization"
      intro="Technical SEO and local optimization for Las Vegas websites that need better rankings, speed, and search-ready structure."
      heading="Technical SEO for local service visibility"
      body="Improve your Las Vegas search footprint with better indexation, stronger internal linking, and performance-focused page architecture that supports service and location intent."
      relatedLinks={[
        { href: "/las-vegas-web-design", label: "Las Vegas Web Design" },
        { href: "/services/las-vegas-custom-website-development", label: "Las Vegas Custom Website Development" },
        { href: "/services/las-vegas-landing-pages-funnels", label: "Las Vegas Landing Pages + Funnels" },
      ]}
    />
  );
}
