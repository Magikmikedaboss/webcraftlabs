import type { Metadata } from "next";
import BuildCalculatorClient from "./BuildCalculatorClient";

export const metadata: Metadata = {
  title: "Website Cost Calculator | Get Instant Quote - WebCraft LabZ",
  description: "Calculate your website project cost and timeline instantly. Use our interactive configurator to choose pages, design, and features for an accurate estimate. Get started today!",
};

export default function BuildPage() {
  return <BuildCalculatorClient />;
}
