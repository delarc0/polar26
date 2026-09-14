import type { Metadata } from "next";
import { McMassanContent } from "./mcmassan-content";

const DESCRIPTION =
	"Varumärkesguide för MC-Mässan 2027 på Elmia i Jönköping. Logotyper, färger, typsnitt, bildspråk och tonalitet, med filer att ladda ner för partners och samarbetspartners.";

export const metadata: Metadata = {
	title: "MC-Mässan 2027 Varumärkesguide",
	description: DESCRIPTION,
	alternates: {
		canonical: "https://polar26.com/brand/mcmassan",
	},
	openGraph: {
		url: "https://polar26.com/brand/mcmassan",
		locale: "sv_SE",
		title: "MC-Mässan 2027 Varumärkesguide | Polar26",
		description: DESCRIPTION,
		images: [
			{
				url: "https://polar26.com/opengraph-image",
				width: 1200,
				height: 630,
				alt: "Polar26 - Creative Agency",
			},
		],
	},
	// Partner-facing guide with unreleased campaign material on it: keep it out
	// of search, same treatment as the private event galleries. No JSON-LD for
	// the same reason — nothing here is meant to be indexed or shown as a rich
	// result.
	robots: {
		index: false,
		follow: false,
	},
};

export default function McMassanPage() {
	return <McMassanContent />;
}
