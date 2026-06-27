import type { Metadata } from "next";
import { ByggmarkGallery } from "./byggmark-content";

export const metadata: Metadata = {
  title: "Byggmark Racing",
  description:
    "Photos from Byggmark Racing, shot by Polar26. Browse the gallery, download your favourites, or grab them all in one click.",
  alternates: {
    canonical: "https://polar26.com/byggmarkracing",
  },
  openGraph: {
    url: "https://polar26.com/byggmarkracing",
    title: "Byggmark Racing | Polar26",
    description:
      "Photos from Byggmark Racing, shot by Polar26. Browse, download your favourites, or grab them all.",
    images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
  },
  robots: {
    // Private event gallery: keep it out of search results.
    index: false,
    follow: false,
  },
};

export default function ByggmarkRacingPage() {
  return <ByggmarkGallery />;
}
