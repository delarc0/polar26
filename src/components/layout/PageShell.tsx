import dynamic from "next/dynamic";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

const SmoothScrollProvider = dynamic(() =>
	import("@/components/providers/SmoothScrollProvider").then((m) => m.SmoothScrollProvider),
);

export function PageShell({ children }: { children: React.ReactNode }) {
	return (
		<SmoothScrollProvider>
			<div className="film-grain" />
			<Navbar />
			<main className="flex-1">{children}</main>
			<Footer />
		</SmoothScrollProvider>
	);
}
