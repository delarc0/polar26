import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
	title: "Terms of Service - Creative Agency",
	description: `Terms of service for ${SITE.name}. Usage terms, intellectual property rights, and liability info for polar26.com. Straightforward legal stuff, no surprises.`,
	alternates: {
		canonical: "https://polar26.com/terms",
	},
	openGraph: {
		url: "https://polar26.com/terms",
		images: [{ url: "https://polar26.com/opengraph-image", width: 1200, height: 630, alt: "Polar26 - Creative Agency" }],
	},
};

export default function TermsPage() {
	return (
		<section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
			<div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					Legal
				</span>
				<h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold uppercase">
					Terms of Service
				</h1>

				<div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed">
					<p>
						Last updated: March 2026
					</p>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Overview</h2>
						<p>
							This website is operated by {SITE.name}, a creative agency registered in Sweden. By accessing
							and using this website, you accept and agree to be bound by these terms of service. If you do
							not agree with any part of these terms, please do not use the website. These terms apply to all
							visitors, users, and anyone who accesses or uses the service.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Intellectual Property</h2>
						<p>
							All content on this website — including but not limited to text, images, videos, brand identity,
							motion graphics, and design — is the property of {SITE.name} and is protected by Swedish and
							international copyright laws. You may not reproduce, distribute, modify, transmit, republish, or
							use any content without prior written permission from {SITE.name}. Unauthorised use may result in
							legal action. Requests for licensing or collaboration should be directed to our contact email.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Acceptable Use</h2>
						<p>
							You agree to use this website only for lawful purposes and in a manner that does not infringe
							the rights of others. You must not use this website to transmit any unsolicited commercial
							communications, attempt to gain unauthorised access to any part of the website, or engage in
							any conduct that restricts or inhibits anyone else from using or enjoying the website.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Disclaimer of Warranties</h2>
						<p>
							{SITE.name} provides this website on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
							We make no representations or warranties of any kind, express or implied, regarding the accuracy,
							completeness, reliability, or suitability of the information and materials on this website. The
							information is provided for general informational purposes only and does not constitute professional
							advice of any kind.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Limitation of Liability</h2>
						<p>
							To the fullest extent permitted by applicable law, {SITE.name} shall not be liable for any
							indirect, incidental, special, consequential, or punitive damages arising from your use of, or
							inability to use, this website. This includes but is not limited to loss of data, loss of revenue,
							or business interruption. Our total liability for any claim arising from your use of the website
							shall not exceed the amount paid by you, if any, for accessing the website.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Governing Law</h2>
						<p>
							These terms are governed by and construed in accordance with the laws of Sweden. Any disputes
							arising in connection with these terms shall be subject to the exclusive jurisdiction of the
							Swedish courts.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Changes to These Terms</h2>
						<p>
							{SITE.name} reserves the right to update these terms at any time. Changes will be posted on this
							page with an updated date. Your continued use of the website following any changes constitutes
							acceptance of the revised terms.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Contact</h2>
						<p>
							Questions about these terms? Contact us at{" "}
							<a href={`mailto:${SITE.email}`} className="text-polar-lime hover:underline">
								{SITE.email}
							</a>.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
