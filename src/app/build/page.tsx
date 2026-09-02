import type { Metadata } from "next";
import BuildCalculatorClient from "./BuildCalculatorClient";
import { getBaseUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Build Calculator",
  description: "Calculate your website project cost and timeline instantly. Use our interactive configurator to choose pages, design, and features for an accurate estimate. Get started today!",
  openGraph: {
    title: "Website Cost Calculator | Get Instant Quote - WebCraft Labz",
    description: "Calculate your website project cost and timeline instantly. Use our interactive configurator to choose pages, design, and features for an accurate estimate. Get started today!",
    type: "website",
    images: [
      {
        url: "/images/og-build.jpg",
        width: 1200,
        height: 630,
        alt: "WebCraft Labz Build Calculator - Get Your Quote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Cost Calculator | Get Instant Quote - WebCraft Labz",
    description: "Calculate your website project cost and timeline instantly. Use our interactive configurator to choose pages, design, and features for an accurate estimate.",
    images: ["/images/og-build.jpg"],
  },
  alternates: {
    canonical: `${getBaseUrl()}/build`,
  },
};
export default function BuildPage() {
  return <BuildCalculatorClient />;
}
