import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import LocalServiceStubPage from "@/components/services/LocalServiceStubPage";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas Custom Website Development | ${SITE.name}`,
  description:
    "Las Vegas custom website development for local businesses in Summerlin, Henderson, North Las Vegas, and the surrounding valley that need faster websites, stronger SEO, and better lead conversion.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-custom-website-development`,
  },
};

export default function LasVegasCustomWebsiteDevelopmentPage() {
  return (
    <LocalServiceStubPage
      title="Las Vegas Custom Website Development"
      intro="Custom website development for Las Vegas businesses that need stronger visibility, better conversion flow, and scalable website structure."
      heading="Built for local growth in Las Vegas"
      body="We build custom websites for Las Vegas service businesses, contractors, and local brands that need more than a template. Focus areas include page speed, local SEO architecture, and clear conversion paths."
      relatedLinks={[
        { href: "/las-vegas-web-design", label: "Las Vegas Web Design" },
        { href: "/services/las-vegas-seo-technical-optimization", label: "Las Vegas SEO + Technical Optimization" },
        { href: "/services/las-vegas-landing-pages-funnels", label: "Las Vegas Landing Pages + Funnels" },
      ]}
    />
  );
}
