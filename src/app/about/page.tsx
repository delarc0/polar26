import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "About - Creative Agency & Brand Studio",
  description:
    "Meet Patrik Nordstrom, founder of Polar26. Brand consultant, videographer, and content strategist with over a decade of experience.",
  alternates: {
    canonical: "https://polar26.com/about",
  },
  openGraph: {
    url: "https://polar26.com/about",
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
