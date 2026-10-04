import type { Metadata } from "next";
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
// never flashes before the partnership one.
export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string | string[] }>;
}) {
  const { project } = await searchParams;
  const name = typeof project === "string" ? project.trim().slice(0, 120) : "";
  return <ContactPageContent project={name || undefined} />;
}
