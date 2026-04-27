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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Polar26 Showreel",
            description:
              "Creative showreel by Polar26 - a Swedish agency specializing in videography, brand activation, and content strategy.",
            thumbnailUrl: `${SITE.url}/videos/hero-banner-poster.webp`,
            contentUrl: `${SITE.url}/videos/hero-banner.mp4`,
            uploadDate: "2026-01-01T00:00:00+01:00",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Yamaha Edvin - Motorsport Film",
            description: "Yamaha motorsport film by Polar26 featuring rider Edvin on track.",
            thumbnailUrl: `${SITE.url}/videos/yamaha-edvin-poster.webp`,
            contentUrl: `${SITE.url}/videos/yamaha-edvin.mp4`,
            uploadDate: "2026-01-01T00:00:00+01:00",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "Action Sports Slow Motion - Stivian",
            description: "Slow motion action sports film by Polar26.",
            thumbnailUrl: `${SITE.url}/videos/stivian-slowmo-poster.webp`,
            contentUrl: `${SITE.url}/videos/stivian-slowmo.mp4`,
            uploadDate: "2026-01-01T00:00:00+01:00",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: "TinyRidR Helmet - Motorsport",
            description: "Motorsport helmet close-up film by Polar26 for TinyRidR.",
            thumbnailUrl: `${SITE.url}/videos/tinyridr-helmet-poster.webp`,
            contentUrl: `${SITE.url}/videos/tinyridr-helmet.mp4`,
            uploadDate: "2026-01-01T00:00:00+01:00",
          }),
        }}
      />
      <HomeContent />
    </>
  );
}
