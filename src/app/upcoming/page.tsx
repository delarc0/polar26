import type { Metadata } from "next";
import { UpcomingProjects } from "./upcoming-content";

export const metadata: Metadata = {
  title: "Upcoming projects",
  description:
    "Moto productions Polar26 is shooting this fall and developing next, with room for partners.",
  alternates: {
    canonical: "https://polar26.com/upcoming",
  },
  openGraph: {
    url: "https://polar26.com/upcoming",
    title: "Upcoming projects | Polar26",
    description:
      "Moto productions Polar26 is shooting this fall and developing next, with room for partners.",
    images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
  },
  robots: {
    // Unlisted partner page: shared by link only, keep it out of search results.
    index: false,
    follow: false,
  },
};

export default function UpcomingPage() {
  return <UpcomingProjects />;
}
