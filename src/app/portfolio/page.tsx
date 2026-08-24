import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { PROJECTS } from "./projects";
import { getBaseUrl } from "@/lib/site";

const PORTFOLIO_DESCRIPTION =
  "Live websites, tailored business demonstrations, and digital products in development by WebCraft Labz.";

export const metadata: Metadata = {
  title: "Selected Builds",
  description: PORTFOLIO_DESCRIPTION,
  openGraph: {
    title: "Selected Builds | WebCraft Labz",
    description: PORTFOLIO_DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/images/modern-computer-display-on-an-office-desk-with-a-web-design.jpg",
        width: 1200,
        height: 630,
        alt: "WebCraft Labz Selected Builds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Builds | WebCraft Labz",
    description: PORTFOLIO_DESCRIPTION,
    images: ["/images/modern-computer-display-on-an-office-desk-with-a-web-design.jpg"],
  },
  alternates: {
    canonical: `${getBaseUrl()}/portfolio`,
  },
};

export default function PortfolioPage() {
  return <PortfolioClient projects={PROJECTS} />;
}
