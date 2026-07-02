import type { Metadata } from "next";
import { CauseFrameContent } from "./causeframe-content";

export const metadata: Metadata = {
  title: "CauseFrame - Nonprofit Initiative Supported by Polar26",
  description:
    "CauseFrame is a nonprofit initiative co-founded by Patrik Nordström. This October, CauseFrame is donating bicycles to a local after-school program in Ghana.",
  alternates: {
    canonical: "https://polar26.com/causeframe",
  },
  openGraph: {
    url: "https://polar26.com/causeframe",
    title: "CauseFrame - Nonprofit Initiative Supported by Polar26",
    description:
      "CauseFrame is a nonprofit initiative co-founded by Patrik Nordström. This October, CauseFrame is donating bicycles to a local after-school program in Ghana.",
    images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
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
              "CauseFrame is a nonprofit initiative delivering hands-on community projects, including bicycle donations to a local after-school program in Ghana.",
            url: "https://polar26.com/causeframe",
            founder: [
              { "@type": "Person", name: "Patrik Nordström" },
              { "@type": "Person", name: "Nate Fleischmann" },
            ],
          }),
        }}
      />
      <CauseFrameContent />
    </>
  );
}
