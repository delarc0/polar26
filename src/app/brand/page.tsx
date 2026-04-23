import type { Metadata } from "next";
import { BrandPageContent } from "./brand-content";

export const metadata: Metadata = {
  title: "Brand",
  description: "Polar26 brand one-pager — colors, type, voice, and process.",
};

export default function BrandPage() {
  return <BrandPageContent />;
}
