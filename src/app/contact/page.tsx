import type { Metadata } from "next";
import { ContactPageContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Polar26, a creative agency in Sweden. Tell us about your project and our team will get back to you with a plan within 24 hours.",
  alternates: {
    canonical: "https://polar26.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
