"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EditRequestForm } from "@/components/edit/EditRequestForm";

export function EditPageContent() {
	const headingRef = useScrollReveal<HTMLDivElement>();
	const formRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });

	return (
		<section className="pt-32 sm:pt-40 pb-24 sm:pb-32 lg:pb-40">
			<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				<div ref={headingRef} className="mb-12 sm:mb-16">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Edit Request
					</span>
					<h1 className="mt-4 text-[clamp(2rem,6vw,5rem)] font-display font-bold uppercase">
						Request a Change
					</h1>
					<p className="mt-4 text-lg text-muted-foreground max-w-lg">
						Use this form to submit website changes, new features, or bug reports.
					</p>
				</div>

				<div ref={formRef} className="max-w-2xl">
					<EditRequestForm />
				</div>
			</div>
		</section>
	);
}
