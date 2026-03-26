import type { Metadata } from "next";
import { WorkPageContent } from "./work-content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore selected projects across film, brand strategy, and digital content from Polar26, a creative agency in Sweden making work that cuts through the noise.",
  alternates: {
    canonical: "https://polar26.com/work",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
