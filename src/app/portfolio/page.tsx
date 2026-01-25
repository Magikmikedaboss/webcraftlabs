import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";
import { PROJECTS } from "./projects";

export const metadata: Metadata = {
  title: "Portfolio | WebCraft Labz",
  description:
    "Showcase of projects built by WebCraft Labz, including client work, personal projects, and case studies.",
  openGraph: {
    title: "Portfolio | WebCraft Labz",
    description:
      "Showcase of projects built by WebCraft Labz, including client work, personal projects, and case studies.",
    type: "website",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient projects={PROJECTS} />;
}
