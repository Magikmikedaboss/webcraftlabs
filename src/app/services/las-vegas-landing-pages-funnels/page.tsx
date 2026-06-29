import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import LocalServiceStubPage from "@/components/services/LocalServiceStubPage";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas Landing Pages + Funnels | ${SITE.name}`,
  description:
    "Las Vegas landing page design and funnel development for local lead generation across Summerlin, Henderson, and North Las Vegas, including paid traffic campaigns and appointment booking flows.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-landing-pages-funnels`,
  },
};

export default function LasVegasLandingPagesFunnelsPage() {
  return (
    <LocalServiceStubPage
      title="Las Vegas Landing Pages + Funnels"
      intro="Conversion-focused local landing pages and funnels for Las Vegas campaigns, quote requests, and booked calls."
      heading="Local campaign pages built to convert"
      body="We build focused landing pages for Las Vegas service offers, ad campaigns, and lead funnels. Each page is structured for mobile conversion and measurable campaign performance."
      relatedLinks={[
        { href: "/las-vegas-web-design", label: "Las Vegas Web Design" },
        { href: "/services/las-vegas-custom-website-development", label: "Las Vegas Custom Website Development" },
        { href: "/services/las-vegas-seo-technical-optimization", label: "Las Vegas SEO + Technical Optimization" },
      ]}
    />
  );
}
