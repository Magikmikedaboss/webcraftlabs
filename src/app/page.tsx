import { Suspense } from "react";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/home/Hero";
import AudiencePaths from "@/components/home/AudiencePaths";
import ProofHighlights from "@/components/home/ProofHighlights";
import ApproachSection from "@/components/home/ApproachSection";
import ProcessSteps from "@/components/ProcessSteps";
import ResourceCenterIntro from "@/components/home/ResourceCenterIntro";
import HomeMagazineFeedServer from "@/components/home/HomeMagazineFeedServer";
import FinalCta from "@/components/home/FinalCta";
import { Metadata } from "next";
import { getBaseUrl, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "WebCraft Labz designs high-converting websites, custom software, and practical automation for growing businesses, startups, and organizations.",
  openGraph: {
    title: `${SITE.name} — Websites, Software, and AI Automation`,
    description:
      "WebCraft Labz designs high-converting websites, custom software, and practical automation for growing businesses, startups, and organizations.",
    type: "website",
    images: [
      {
        url: "/images/tranquil-scene-grass-meadow-sky-sunset-mountain-water-webcraft-labs-hero-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Professional Web Development`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Websites, Software, and AI Automation`,
    description:
      "WebCraft Labz designs high-converting websites, custom software, and practical automation for growing businesses, startups, and organizations.",
    images: ["/images/tranquil-scene-grass-meadow-sky-sunset-mountain-water-webcraft-labs-hero-image.jpg"],
  },
  alternates: {
    canonical: getBaseUrl(),
  },
};

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <AudiencePaths />
      <ProofHighlights />
      <ApproachSection />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ProcessSteps />
      </section>
      <ResourceCenterIntro />
      <Suspense fallback={null}>
        <HomeMagazineFeedServer />
      </Suspense>
      <FinalCta />
    </SiteShell>
  );
}
