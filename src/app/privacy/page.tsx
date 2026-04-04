import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
	title: "Privacy Policy - Creative Agency",
	description: `Privacy policy for ${SITE.name}. How we handle your data, what we collect through our contact form, and why we use cookie-free analytics. No tracking, no nonsense.`,
	alternates: {
		canonical: "https://polar26.com/privacy",
	},
	openGraph: {
		url: "https://polar26.com/privacy",
		images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
	},
};

export default function PrivacyPage() {
	return (
		<section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
			<div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					Legal
				</span>
				<h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold uppercase">
					Privacy Policy
				</h1>

				<div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
					<p>
						Last updated: March 2026
					</p>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Information We Collect</h2>
						<p>
							When you use our contact form, we collect your name, email address, company name (optional),
							project type (optional), and your message. We do not collect any other personal data beyond
							what you voluntarily provide. We will never request sensitive personal information such as
							payment details, passwords, or government identification through this website.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">How We Use Your Information</h2>
						<p>
							We use the information you provide solely to respond to your inquiry and discuss potential
							projects. We do not sell, share, or distribute your personal information to third parties.
							Your contact details are stored only as long as necessary to manage our business relationship
							and are deleted upon request. We may occasionally follow up on an existing conversation, but
							we will never add you to a mailing list without your explicit consent.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Analytics</h2>
						<p>
							We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies and
							does not collect personal data. All data is aggregated and anonymised — it is impossible to
							identify individual visitors. Plausible is hosted in the EU and is fully compliant with GDPR,
							CCPA, and PECR. We use this data only to understand overall traffic trends and improve the
							website experience.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Cookies</h2>
						<p>
							This website does not use cookies for tracking or advertising. No personal data is stored in
							your browser by Polar26. Certain third-party services integrated into the site (such as
							Cloudflare for security) may set functional cookies that are strictly necessary for the
							website to operate correctly. These are not used to track your behaviour across other sites.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Data Retention</h2>
						<p>
							Contact form submissions are retained only for as long as required to manage the business
							enquiry. If you would like your data removed, simply send a deletion request to our email
							and we will action it within 30 days. You have the right to access, correct, or request
							deletion of any personal data we hold about you under GDPR.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Third-Party Services</h2>
						<p>
							We use Resend to process and deliver contact form emails. Resend acts as a data processor
							on our behalf and is bound by a data processing agreement. We do not use any advertising
							networks, social media pixels, or behavioural tracking tools on this website.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Contact</h2>
						<p>
							If you have questions about this privacy policy or wish to exercise your data rights,
							contact us at{" "}
							<a href={`mailto:${SITE.email}`} className="text-polar-lime hover:underline">
								{SITE.email}
							</a>
							. We will respond within 5 business days.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
