import type { Metadata } from "next";
import { COMMUNITY_NEEDS } from "@/data/causeframe";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact - Start Your Next Project",
  description:
    "Get in touch with Polar26, a creative agency in Sweden. Tell us about your project and we will get back to you with a plan within 24 hours.",
  alternates: {
    canonical: "https://polar26.com/contact",
  },
  openGraph: {
    url: "https://polar26.com/contact",
    images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
  },
};

// `?project=` comes from the "Get involved" links on /upcoming and switches the
// page into a partnership enquiry. Read on the server so the regular intro
// never flashes before the partnership one. `?fund=` comes from the Community
// Needs buttons on /causeframe and names one of COMMUNITY_NEEDS by id.
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string | string[]; fund?: string | string[] }>;
}) {
  const { project, fund } = await searchParams;
  const name = typeof project === "string" ? project.trim().slice(0, 120) : "";
  const need = name ? undefined : COMMUNITY_NEEDS.find((n) => n.id === fund);
  return (
    <ContactPageContent
      project={name || undefined}
      need={need && { title: need.title, cost: need.cost }}
    />
  );
}
