
import SiteShell from "@/components/SiteShell";
import { Suspense } from "react";
import HomeMagazineFeedServer from "@/components/home/HomeMagazineFeedServer";
import { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Home",
  description: `${SITE.name} builds powerful marketing websites, SaaS platforms, and web tools designed for real-world business needs. Websites built like products, not brochures.`,
  openGraph: {
    title: `${SITE.name} - ${SITE.tagline}`,
    description: `${SITE.name} builds powerful marketing websites, SaaS platforms, and web tools designed for real-world business needs. Websites built like products, not brochures.`,
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
    title: `${SITE.name} - ${SITE.tagline}`,
    description: `${SITE.name} builds powerful marketing websites, SaaS platforms, and web tools designed for real-world business needs.`,
    images: ["/images/tranquil-scene-grass-meadow-sky-sunset-mountain-water-webcraft-labs-hero-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <SiteShell>
      <Suspense
        fallback={
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-300 border-t-transparent rounded-full animate-spin motion-reduce:animate-none" role="status" aria-live="polite">
              <span className="sr-only">Loading…</span>
            </div>
          </div>
        }
      >
        <HomeMagazineFeedServer />
      </Suspense>
    </SiteShell>
  );
}
