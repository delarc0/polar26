import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `Privacy policy for ${SITE.name}. Learn how we collect, use, and protect your personal information.`,
	alternates: {
		canonical: "https://polar26.com/privacy",
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
							project type (optional), and your message. We do not collect any other personal data.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">How We Use Your Information</h2>
						<p>
							We use the information you provide solely to respond to your inquiry and discuss potential projects.
							We do not sell, share, or distribute your personal information to third parties.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Analytics</h2>
						<p>
							We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies and
							does not collect personal data. All data is aggregated and cannot be used to identify you.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Cookies</h2>
						<p>
							This website does not use cookies for tracking. No personal data is stored in your browser.
						</p>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-display font-bold text-foreground">Contact</h2>
						<p>
							If you have questions about this privacy policy, contact us at{" "}
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
