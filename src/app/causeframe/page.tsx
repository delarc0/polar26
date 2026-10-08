import type { Metadata } from "next";
import { CauseFrameContent } from "./causeframe-content";

export const metadata: Metadata = {
  title: "CauseFrame - Nonprofit Initiative Supported by Polar26",
  description:
    "CauseFrame is a nonprofit initiative co-founded by Patrik Nordström. In October 2026, CauseFrame delivered 30 bicycles to kids from three communities in Ekumfi, Ghana, with Boys & Girls Club of Ghana.",
  alternates: {
    canonical: "https://polar26.com/causeframe",
  },
  openGraph: {
    url: "https://polar26.com/causeframe",
    title: "CauseFrame - Nonprofit Initiative Supported by Polar26",
    description:
      "CauseFrame is a nonprofit initiative co-founded by Patrik Nordström. In October 2026, CauseFrame delivered 30 bicycles to kids from three communities in Ekumfi, Ghana, with Boys & Girls Club of Ghana.",
    images: [{ url: "https://polar26.com/images/causeframe/ghana/og-ghana.jpg", width: 1200, height: 630, alt: "Patrik and Nathaniel with the kids and bikes on handover day in Ghana" }],
  },
};

export default function CauseFramePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NGO",
            name: "CauseFrame",
            description:
              "CauseFrame is a nonprofit initiative delivering hands-on community projects, including 30 bicycles delivered to kids from three communities in Ekumfi, Ghana.",
            url: "https://polar26.com/causeframe",
            founder: [
              { "@type": "Person", name: "Patrik Nordström" },
              { "@type": "Person", name: "Nathaniel Fleischmann" },
            ],
          }),
        }}
      />
      <CauseFrameContent />
    </>
  );
}
