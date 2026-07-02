"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealText } from "@/components/shared/RevealText";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { CAUSEFRAME, GEORGIA_PHOTOS, GEORGIA_VIDEO_ID } from "@/data/causeframe";
import { GhanaImpactSteps } from "./ghana-impact-steps";

function LinkedInIcon() {
	return (
		<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
			<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
		</svg>
	);
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
	return (
		<div>
			<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
				{eyebrow}
			</span>
			<RevealText
				as="h2"
				className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] font-display font-bold uppercase"
			>
				{title}
			</RevealText>
		</div>
	);
}

export function CauseFrameContent() {
	const whoRef = useScrollReveal<HTMLDivElement>({ y: 30 });
	const ghanaRef = useScrollReveal<HTMLDivElement>({ y: 30 });
	const journeyRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.08, children: true });
	const foundersRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.1, children: true });
	const involvedRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.08, children: true });
	const galleryRef = useRef<HTMLDivElement>(null);

	return (
		<>
			{/* Hero */}
			<section className="pt-32 sm:pt-40 pb-20 sm:pb-28">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						Polar26 Supports
					</span>
					<Image
						src="/images/causeframe/logo/causeframe-wordmark.svg"
						alt="CauseFrame"
						width={420}
						height={98}
						priority
						className="mt-4 h-auto w-[220px] sm:w-[300px]"
					/>
					<RevealText
						as="h1"
						className="mt-6 text-[clamp(2.5rem,8vw,6rem)] font-display font-bold uppercase leading-[0.95]"
					>
						We show up.
					</RevealText>
					<p className="mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
						CauseFrame is a nonprofit initiative that turns support into real, hands-on
						projects, delivered in person to the people who need them.
					</p>
				</div>
			</section>

			{/* Who we are */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div ref={whoRef} className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
						<SectionHeading eyebrow="Who We Are" title="From storytelling to showing up" />
						<div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
							<p>
								CauseFrame was founded by Patrik Nordström and Nathaniel Fleischmann. It started
								as a mobile storytelling project, driving over 10,000 km from Sweden through
								the Balkans and into the Caucasus to produce video and photography for local
								nonprofits, free of charge.
							</p>
							<p>
								That work is still part of what CauseFrame does. But increasingly, CauseFrame
								has moved from documenting other people&apos;s projects to running its own,
								going directly to the people it wants to help instead of pointing a camera
								at someone else doing it.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Flagship: Ghana */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06] bg-card overflow-hidden">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div ref={ghanaRef}>
						<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
							Current Project &middot; Ghana &middot; October 2026
						</span>
						<RevealText
							as="h2"
							className="mt-4 text-[clamp(2rem,5.5vw,4rem)] font-display font-bold uppercase"
						>
							The Ghana Pedaling Initiative
						</RevealText>
						<div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-start">
							<div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
								<p>
									This October, CauseFrame is donating bicycles to a local after-school
									program in Ghana. Patrik and Nathaniel are traveling there to hand over the
									bikes in person and spend a day with the kids, teaching them to ride.
								</p>
								<p>
									For many kids, distance is the biggest barrier between them and school.
									A bicycle can turn a long walk into a short ride, and free up time and
									energy for everything that comes after.
								</p>
							</div>
							<div className="grid grid-cols-3 gap-4 sm:gap-6">
								{[
									{ label: "Location", value: "Ghana" },
									{ label: "Timing", value: "Oct 2026" },
									{ label: "Delivered", value: "In Person" },
								].map((stat) => (
									<div key={stat.label} className="border-t border-polar-lime/40 pt-4">
										<p className="text-lg sm:text-xl font-display font-bold uppercase text-foreground">
											{stat.value}
										</p>
										<p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</div>
						<GhanaImpactSteps />

						<div className="mt-14 grid sm:grid-cols-2 gap-8 sm:gap-10 border-t border-white/[0.06] pt-10">
							<div>
								<p className="text-sm font-display font-bold uppercase tracking-[0.1em] text-foreground">
									For Individuals
								</p>
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
									Chip in toward the bikes and the cost of getting to Ghana, or just follow
									along and help spread the word before, during, and after the trip.
								</p>
							</div>
							<div>
								<p className="text-sm font-display font-bold uppercase tracking-[0.1em] text-foreground">
									For Companies
								</p>
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
									Sponsor this trip, or the next one. Not just a logo on a project page,
									but a genuine investment in real change and lasting brand impact for
									your company.
								</p>
							</div>
						</div>
						<div className="mt-8">
							<a
								href="mailto:hello@polar26.com?subject=CauseFrame%20-%20Ghana%20Bikes"
								className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
							>
								Get Involved &middot; hello@polar26.com
							</a>
							<p className="mt-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
								Swish donations: to come
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Journey so far / Georgia */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div ref={journeyRef}>
						<SectionHeading eyebrow="Since 2025" title="The journey so far" />
						<p className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
							Before Ghana, CauseFrame worked hands-on with nonprofits across the Balkans and
							the Caucasus: {CAUSEFRAME.pastWork.map((p, i) => (
								<span key={p.name}>
									<span className="text-foreground">{p.name}</span> ({p.location})
									{i < CAUSEFRAME.pastWork.length - 1 ? ", " : "."}
								</span>
							))}
						</p>

						<div className="mt-12">
							<p className="text-sm font-medium tracking-[0.15em] uppercase text-foreground">
								Society Biliki &middot; Gori, Georgia
							</p>
							<div
								ref={galleryRef}
								className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3"
							>
								{GEORGIA_PHOTOS.map((photo) => (
									<div
										key={photo.file}
										className="relative aspect-[3/4] overflow-hidden bg-secondary"
									>
										<Image
											src={`/images/causeframe/georgia/${photo.file}`}
											alt={photo.alt}
											fill
											sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
											className="object-cover"
										/>
									</div>
								))}
							</div>

							<div className="mt-8 relative w-full aspect-video overflow-hidden bg-secondary">
								<iframe
									className="absolute inset-0 h-full w-full"
									src={`https://www.youtube.com/embed/${GEORGIA_VIDEO_ID}`}
									title="CauseFrame x Society Biliki, Gori, Georgia"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerPolicy="strict-origin-when-cross-origin"
									allowFullScreen
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Founders */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06] bg-card">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<SectionHeading eyebrow="Founders" title="Two people, global impact" />
					<div ref={foundersRef} className="mt-12 grid sm:grid-cols-2 gap-8 sm:gap-10">
						{CAUSEFRAME.founders.map((founder) => (
							<div key={founder.name} className="group">
								<div className="relative aspect-[4/5] overflow-hidden bg-secondary">
									<Image
										src={founder.image}
										alt={founder.name}
										fill
										sizes="(max-width: 640px) 100vw, 50vw"
										className="object-cover"
										style={{ objectPosition: founder.focus }}
									/>
								</div>
								<div className="mt-5 flex items-start justify-between gap-4">
									<div>
										<p className="text-lg font-display font-bold uppercase text-foreground">
											{founder.name}
										</p>
										<p className="mt-1 text-sm text-muted-foreground">{founder.role}</p>
									</div>
									<a
										href={founder.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`${founder.name} on LinkedIn`}
										className="group/btn inline-flex shrink-0 items-center gap-2 px-4 py-2.5 border border-white/15 text-xs font-display font-bold uppercase tracking-[0.15em] text-foreground hover:border-polar-lime hover:bg-polar-lime hover:text-background transition-colors duration-300"
									>
										<LinkedInIcon />
										LinkedIn
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Get involved */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<SectionHeading eyebrow="Get Involved" title="Get Involved" />
					<div ref={involvedRef} className="mt-12 grid sm:grid-cols-3 gap-8 sm:gap-10">
						{[
							{
								title: "Support the Trip",
								body: "Contribute toward the bikes and the journey to Ghana.",
							},
							{
								title: "Follow Along",
								body: "Updates before, during, and after the trip.",
							},
							{
								title: "Partner With Us",
								body: "For companies who want to back a hands-on project.",
							},
						].map((item) => (
							<div key={item.title} className="border-t border-polar-lime/40 pt-5">
								<p className="text-base font-display font-bold uppercase text-foreground">
									{item.title}
								</p>
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
									{item.body}
								</p>
							</div>
						))}
					</div>
					<div className="mt-12">
						<a
							href="mailto:hello@polar26.com?subject=CauseFrame%20-%20Ghana%20Bikes"
							className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
						>
							hello@polar26.com
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
