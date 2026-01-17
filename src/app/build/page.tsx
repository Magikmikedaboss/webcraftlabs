import type { Metadata } from "next";
import BuildCalculatorClient from "./BuildCalculatorClient";

export const metadata: Metadata = {
  title: "Build Configurator | WebCraft",
  description: "Estimate your website project cost and timeline with our interactive build configurator.",
};

export default function BuildPage() {
  return <BuildCalculatorClient />;
}
