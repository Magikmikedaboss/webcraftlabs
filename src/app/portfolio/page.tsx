import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { PROJECTS } from "./projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Showcase of projects built by WebCraft Labz, including client work, personal projects, and case studies.",
  openGraph: {
    title: "Portfolio | WebCraft Labz",
    description:
      "Showcase of projects built by WebCraft Labz, including client work, personal projects, and case studies.",
    type: "website",
    images: [
      {
        url: "/images/modern-computer-display-on-an-office-desk-with-a-web-design.jpg",
        width: 1200,
        height: 630,
        alt: "WebCraft Labz Portfolio - Our Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | WebCraft Labz",
    description:
      "Showcase of projects built by WebCraft Labz, including client work, personal projects, and case studies.",
    images: ["/images/modern-computer-display-on-an-office-desk-with-a-web-design.jpg"],
  },
};

export default function PortfolioPage() {
  return <PortfolioClient projects={PROJECTS} />;
}
