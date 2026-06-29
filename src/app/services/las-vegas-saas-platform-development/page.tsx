import type { Metadata } from "next";
import { SITE, getBaseUrl } from "@/lib/site";
import LocalServiceStubPage from "@/components/services/LocalServiceStubPage";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: `Las Vegas SaaS Platform Development | ${SITE.name}`,
  description:
    "Las Vegas SaaS platform development for founders and teams in Summerlin, Henderson, and North Las Vegas building MVPs, subscription tools, client portals, and scalable product architecture.",
  alternates: {
    canonical: `${baseUrl}/services/las-vegas-saas-platform-development`,
  },
};

export default function LasVegasSaasPlatformDevelopmentPage() {
  return (
    <LocalServiceStubPage
      title="Las Vegas SaaS Platform Development"
      intro="SaaS MVP and platform development for Las Vegas teams building digital products, portals, and subscription experiences."
      heading="From product idea to launchable SaaS"
      body="We help local founders and teams design MVP scope, build core SaaS workflows, and launch platform foundations that can scale with customer demand."
      secondCtaLabel="Book a SaaS consult"
      relatedLinks={[
        { href: "/services/las-vegas-custom-website-development", label: "Las Vegas Custom Website Development" },
        { href: "/services/las-vegas-seo-technical-optimization", label: "Las Vegas SEO + Technical Optimization" },
        { href: "/services/saas-platform-development", label: "SaaS Platform Development" },
      ]}
    />
  );
}
