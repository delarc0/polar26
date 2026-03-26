import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Patrik Nordstrom and the Polar26 creative agency. We specialize in videography, brand strategy, and content that moves people.",
  alternates: {
    canonical: "https://polar26.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE.founder.name,
            jobTitle: SITE.founder.title,
            worksFor: {
              "@type": "Organization",
              name: SITE.name,
              url: SITE.url,
            },
          }),
        }}
      />
      <AboutPageContent />
    </>
  );
}
