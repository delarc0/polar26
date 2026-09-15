/**
 * MC-Mässan 2027 brand guide (/brand/mcmassan).
 *
 * All copy lives here so the page component stays presentation only. The
 * boilerplate in `BOILERPLATE` is still a draft pending sign-off from Niklas
 * Kristoffersson (McRF); when it is approved, replace the texts here, drop the
 * `pendingApproval` note and collapse `oneliners` to the single chosen option.
 *
 * Source of truth for structure, copy and tokens:
 * ~/Documents/Claude/Projects/Susan/McRF MC Mässan/brand-page-build/
 */

const IMG = "/images/brand-mcmassan";

export const MCMASSAN = {
	wordmark: "MC-MÄSSAN 2027",
	badge: "Varumärkesguide · Endast för partners",
	venue: "Elmia, Jönköping — Januari 2027",
	tagline: "Vem tar du med dig?",
	footerMark: "MC-MÄSSAN 2027 — ELMIA, JÖNKÖPING",
	footerNote: "Varumärkesguide för partners · Polar26",
	hero: {
		src: `${IMG}/bildsprak-crop-v2.jpg`,
		alt: "Förare i sliten motocrosshjälm, referensbild för MC-Mässans bildspråk",
	},
} as const;

export const BOILERPLATE = {
	pendingApproval:
		"Text för bios, presentationer och press. Klicka för att kopiera. Förslag, skall godkännas av Niklas.",
	oneliners: [
		{
			id: "oneliner-a",
			label: "Alternativ A",
			text: "Sveriges största MC-mässa, nu med en helt ny Actionarena.",
		},
		{
			id: "oneliner-b",
			label: "Alternativ B",
			text: "600 motorcyklar, 140 utställare: MC-mässan.",
		},
	],
	kort: {
		id: "kort",
		label: "Kort presentation",
		paragraphs: [
			"MC-Mässan är Sveriges största mässa för motorcyklar, mopeder och tillbehör. Fyra fulla hallar, över 140 utställare, mer än 600 motorcyklar samt nyheter från hela MC-världen.",
			"Nytt för 2027: Actionarena med landets bästa stuntshow, utomhusracing, barer och artister.",
		],
	},
	lang: {
		id: "lang",
		label: "Lång presentation",
		paragraphs: [
			"MC-Mässan är Sveriges största mässa för motorcyklar, mopeder och tillbehör. Fyra fulla hallar, över 140 utställare och mer än 600 motorcyklar. Här ställer alla stora och de flesta små motorcykelleverantörer ut, tillsammans med tillbehörsföretag, försäkrings- och finansbolag, mc-klubbar, SMC och de stora handlarna. Här ser och provsitter du årets nyheter, från motorcyklar till produkter och utrustning, innan de når resten av marknaden.",
			"Nytt för 2027: Actionarena med landets bästa stuntshow, utomhusracing, barer och artister. Dessutom en stor customhoj-utställning, fler scener, tävlingar och upplevelser än någonsin, och fler restauranger än tidigare år.",
		],
	},
} as const;

export const LOGOS = [
	{
		src: `${IMG}/logo.png`,
		width: 264,
		height: 264,
		alt: "MC-Mässan 2027, kvadratisk logotyp",
		caption: "Kvadratisk · primär",
		filename: "MC-Massan-2027-logotyp-kvadratisk.png",
	},
	{
		src: `${IMG}/logo-liggande-rod.png`,
		width: 1417,
		height: 399,
		alt: "MC-Mässan 2027, liggande logotyp, röd",
		caption: "Liggande · primär",
		filename: "MC-Massan-2027-logotyp-liggande-rod.png",
	},
	{
		src: `${IMG}/logo-liggande-negativ.png`,
		width: 6222,
		height: 1754,
		alt: "MC-Mässan 2027, liggande logotyp, negativ vit",
		caption: "Liggande · negativ",
		filename: "MC-Massan-2027-logotyp-negativ.png",
	},
] as const;

export const LOGO_NOTE =
	"Två logotyper, kvadratisk och liggande, i två låsta färgversioner. Röd används mot mörk botten. Vit (negativ) används mot rött eller mot bilder där den röda versionen inte syns. Ingen av dem roteras eller färgändras utanför dessa två versioner.";

export const TAGLINE_NOTE = "Fast rad, hör alltid ihop med logotypen. Skrivs aldrig om.";

/** Swatch text colours are baked in: these three pairings are the locked ones. */
export const COLORS = [
	{ name: "Antracit", hex: "#221F20", nameColor: "#FFFFFF", hexColor: "#E7E2DF" },
	{ name: "Mässröd", hex: "#C01A32", nameColor: "#FFFFFF", hexColor: "#FFFFFF" },
	{ name: "Vit", hex: "#FFFFFF", nameColor: "#221F20", hexColor: "#221F20" },
] as const;

export const TYPOGRAPHY = {
	glyphs: "Aa 2027",
	lockup: "MC-MÄSSAN",
	meta: ["Designer — versaler, kondenserad", "Används i wordmark, rubriker och kampanjmaterial"],
	note: "Reserverad för rubriker och identitetsbärande moment. Brödtext sätts i en neutral sans, aldrig i Designer.",
	file: "/fonts/mcmassan/Designer.otf",
	filename: "Designer.otf",
} as const;

export const IMAGERY = {
	rules: [
		"Verklig plats. Aldrig studio eller AI-generering.",
		"Personligt och emotionellt. Om människan, inte bara maskinen.",
		"Autentiskt. In action.",
		"Slitage får synas. Inget som är städat.",
	],
	gallery: [
		{
			src: `${IMG}/bildsprak-crop-v2.jpg`,
			width: 1221,
			height: 747,
			alt: "Referensporträtt, bildspråk",
			caption: "Referensbild · underlag för Riktiga möten",
		},
		{
			src: `${IMG}/byggmark-full.jpg`,
			width: 1145,
			height: 700,
			alt: "Exempel: Jens Byggmark-reveal",
			caption: "Tillämpat · Jens Byggmark-reveal",
		},
	],
} as const;

export const VOICE = {
	statements: [
		"Vi ber aldrig om ursäkt.",
		"Självsäkra. Aldrig defensiva.",
		"Vi låter som människor. Inte ett företag.",
		"Vi tar plats utan att trycka ner någon.",
		"Beröm förtjänar alltid ett svar.",
		"Riktiga svar. Aldrig en FAQ-länk.",
	],
	closing: "Inte en jakt på följare. Vi mäter mot biljettförsäljning, inte mot vanity-mått.",
	wrong: {
		label: "Fel röst",
		text: '"Vi är otroligt glada att kunna meddela att vi har säkrat en av världens mest eftertraktade stuntförare till vårt evenemang i januari 2027. Håll utkik för mer information."',
	},
	right: {
		label: "Rätt röst",
		text: '"Bekräftat: [Stuntförare] är tillbaka till 2027. Samma förare som fick taket att lyfta förra året. Ni som vet ni vet."',
	},
} as const;

/** Fixed showcase, deliberately not a live feed of the campaign. */
export const CAMPAIGN = {
	intro:
		"Ett urval ur årets sociala kampanj, som exempel på tonalitet och bildspråk i praktiken.",
	note: "Fler inlägg tillkommer löpande i kanalerna, urvalet ovan uppdateras inte per automatik.",
	posts: [1, 2, 3, 4, 5].map((n) => ({
		src: `${IMG}/marquee-${n}.jpg`,
		width: 700,
		height: 875,
		alt: `Kampanjmaterial ${n}`,
	})),
} as const;
