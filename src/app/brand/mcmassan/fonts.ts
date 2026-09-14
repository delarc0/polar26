import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

/**
 * Scoped to this route so the MC-Mässan faces never load on the rest of the
 * site. All three are self-hosted by next/font, which also keeps them inside
 * the `font-src 'self'` CSP in next.config.ts — the source spec linked
 * fonts.googleapis.com directly, which that policy would have blocked.
 */

export const mcSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--mc-sans",
	display: "swap",
});

export const mcMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--mc-mono",
	display: "swap",
});

// Same file the page offers for download, so there is only one copy to keep.
export const mcDisplay = localFont({
	src: "../../../../public/fonts/mcmassan/Designer.otf",
	variable: "--mc-display",
	display: "swap",
});
