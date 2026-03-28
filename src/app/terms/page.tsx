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
							This website is operated by {SITE.name}. By accessing and using this website, you accept
							and agree to be bound by these terms.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Intellectual Property</h2>
						<p>
							All content on this website, including but not limited to text, images, videos, and design,
							is the property of {SITE.name} and protected by copyright laws. You may not reproduce,
							distribute, or use any content without prior written permission.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Limitation of Liability</h2>
						<p>
							{SITE.name} provides this website on an &ldquo;as is&rdquo; basis and makes no representations or
							warranties of any kind. We shall not be liable for any damages arising from the use of this website.
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
