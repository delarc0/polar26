import type { Metadata } from "next";
import { HomeContent } from "./home-content";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Polar26 | From Brand to Business",
  description:
    "Polar26 is a creative agency in Sweden specializing in videography, brand activation, content strategy, digital marketing, and commercial photography.",
  alternates: {
    canonical: "https://polar26.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            description: SITE.description,
            address: {
              "@type": "PostalAddress",
              addressCountry: "SE",
            },
            sameAs: [SITE.social.instagram, SITE.social.linkedin],
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
