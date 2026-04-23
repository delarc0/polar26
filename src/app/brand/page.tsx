import type { Metadata } from "next";
import { BrandPageContent } from "./brand-content";

export const metadata: Metadata = {
  title: "Brand",
  description: "Polar26 brand one-pager — colors, type, voice, and process.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function BrandPage() {
  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <BrandPageContent />
    </>
  );
}
