import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
