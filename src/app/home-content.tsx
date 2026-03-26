import dynamic from "next/dynamic";
import { HeroSection } from "@/components/home/HeroSection";
import { ClientLogoMarquee } from "@/components/home/ClientLogoMarquee";

const ServicesSection = dynamic(() =>
	import("@/components/home/ServicesSection").then((m) => m.ServicesSection),
);
const MarketingFramework = dynamic(() =>
	import("@/components/home/MarketingFramework").then((m) => m.MarketingFramework),
);
const PhotoGrid = dynamic(() =>
	import("@/components/home/PhotoGrid").then((m) => m.PhotoGrid),
);
const AboutPreview = dynamic(() =>
	import("@/components/home/AboutPreview").then((m) => m.AboutPreview),
);

export function HomeContent() {
	return (
		<>
			<HeroSection />
			<ClientLogoMarquee />
			<ServicesSection />
			<MarketingFramework />
			<PhotoGrid />
			<AboutPreview />
		</>
	);
}
