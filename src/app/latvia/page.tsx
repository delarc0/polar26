import type { Metadata } from "next";
import { LatviaGallery } from "./latvia-content";

export const metadata: Metadata = {
  title: "Latvia",
  description:
    "Photos from Latvia, shot by Polar26. Browse the gallery, download your favourites, or grab them all in one click.",
  alternates: {
    canonical: "https://polar26.com/latvia",
  },
  openGraph: {
    url: "https://polar26.com/latvia",
    title: "Latvia | Polar26",
    description:
      "Photos from Latvia, shot by Polar26. Browse, download your favourites, or grab them all.",
    images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LatviaPage() {
  return <LatviaGallery />;
}
