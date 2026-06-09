import type { Metadata } from "next";
import { BrandPageContent } from "./brand-content";

export const metadata: Metadata = {
  title: "Brand",
  description: "The Polar26 brand kit: colors, typography, voice, logos, stickers, email signatures, and templates. Everything your team needs to stay on-brand.",
};

export default function BrandPage() {
  return <BrandPageContent />;
}
