"use client";

import Image from "next/image";
import { useRef } from "react";
import { RevealText } from "@/components/shared/RevealText";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
	CAUSEFRAME,
	COMMUNITY_NEEDS,
	CORPORATE_PILLARS,
	GEORGIA_PHOTOS,
	GEORGIA_VIDEO_ID,
	GHANA_HERO,
	GHANA_PARTNERS,
	GHANA_PHOTOS,
	GHANA_PORTRAITS,
	GHANA_STATS,
} from "@/data/causeframe";
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
	const needsRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.1, children: true });
	const companiesRef = useScrollReveal<HTMLDivElement>({ y: 24, stagger: 0.08, children: true });
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
						preload
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
					<div className="mt-12 sm:mt-16 relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-secondary">
						<Image
							src={`/images/causeframe/ghana/${GHANA_HERO.file}`}
							alt={GHANA_HERO.alt}
							fill
							preload
							sizes="(max-width: 1280px) 100vw, 1216px"
							className="object-cover object-[50%_40%]"
						/>
					</div>
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
							Delivered &middot; Ekumfi, Ghana &middot; October 2026
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
									In October, Patrik and Nathaniel traveled to the Ekumfi region of Ghana and
									handed over 30 bicycles to kids from three different communities, together
									with our partner Boys &amp; Girls Club of Ghana. Along with the bikes came 10 soccer
									balls and other sports equipment.
								</p>
								<p>
									For many kids, distance is the biggest barrier between them and school.
									A bicycle turns a long walk into a short ride, and frees up time and
									energy for everything that comes after.
								</p>
							</div>
							<div className="grid grid-cols-3 gap-4 sm:gap-6">
								{GHANA_STATS.map((stat) => (
									<div key={stat.label} className="border-t border-polar-lime/40 pt-4">
										<p className="text-3xl sm:text-4xl font-display font-bold uppercase text-foreground">
											{stat.value}
										</p>
										<p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
											{stat.label}
										</p>
									</div>
								))}
							</div>
						</div>

						<div className="mt-14 border-t border-white/[0.06] pt-10">
							<p className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
								Made Possible With
							</p>
							<div className="mt-6 grid sm:grid-cols-2 gap-8 sm:gap-10">
								{GHANA_PARTNERS.map((partner) => (
									<div key={partner.name}>
										<p className="text-lg font-display font-bold uppercase text-foreground">
											{partner.name}
										</p>
										<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
											{partner.role}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
						{GHANA_PHOTOS.map((photo) => (
							<div key={photo.file} className="relative aspect-[3/2] overflow-hidden bg-secondary">
								<Image
									src={`/images/causeframe/ghana/${photo.file}`}
									alt={photo.alt}
									fill
									sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="object-cover"
								/>
							</div>
						))}
					</div>
					<div className="mt-2 sm:mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
						{GHANA_PORTRAITS.map((photo) => (
							<div key={photo.file} className="relative aspect-[3/4] overflow-hidden bg-secondary">
								<Image
									src={`/images/causeframe/ghana/${photo.file}`}
									alt={photo.alt}
									fill
									sizes="(max-width: 1024px) 50vw, 25vw"
									className="object-cover"
								/>
							</div>
						))}
					</div>

					<GhanaImpactSteps />
				</div>
			</section>

			{/* Community needs */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
						<SectionHeading eyebrow="Community Needs" title="What we saw on the ground" />
						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
							Bikes were the start. Spending time in the communities around Ekumfi, we saw
							what is needed next. These are concrete, costed projects we want to fund and deliver the same
							way: in person.
						</p>
					</div>
					<div ref={needsRef} className="mt-12 grid sm:grid-cols-2 gap-8 sm:gap-10">
						{COMMUNITY_NEEDS.map((need) => (
							<div key={need.title} className="border-t border-polar-lime/40 pt-5">
								<div className="flex items-baseline justify-between gap-4">
									<p className="text-base sm:text-lg font-display font-bold uppercase text-foreground">
										{need.title}
									</p>
									<p className="shrink-0 text-2xl sm:text-3xl font-display font-bold text-polar-lime">
										{need.cost}
									</p>
								</div>
								<p className="mt-3 text-sm text-muted-foreground leading-relaxed">{need.body}</p>
								<a
									href={`/contact?fund=${need.id}`}
									className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
								>
									{need.cta}
								</a>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* For companies */}
			<section id="for-companies" className="scroll-mt-20 py-20 sm:py-28 border-t border-white/[0.06] bg-card">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16">
						<SectionHeading eyebrow="For Companies" title="Impact you can stand behind" />
						<p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
							Funding a project like Ghana isn&apos;t charity on the side. Done right, it&apos;s
							an investment: real change on the ground, and a story your company has earned
							the right to tell. Through Polar26, every CauseFrame project can come with the
							PR and CSR work to make that story count.
						</p>
					</div>
					<div ref={companiesRef} className="mt-12 grid sm:grid-cols-3 gap-8 sm:gap-10">
						{CORPORATE_PILLARS.map((pillar) => (
							<div key={pillar.title} className="border-t border-polar-lime/40 pt-5">
								<p className="text-base font-display font-bold uppercase text-foreground">
									{pillar.title}
								</p>
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pillar.body}</p>
							</div>
						))}
					</div>
					<p className="mt-12 max-w-3xl text-base sm:text-lg text-foreground leading-relaxed">
						We only partner with companies that want the work to be real. If it&apos;s just
						for show, we&apos;re not the right fit.
					</p>
					<div className="mt-8">
						<a
							href="/contact?project=CauseFrame"
							className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
						>
							Partner with CauseFrame
						</a>
					</div>
				</div>
			</section>

			{/* Journey so far / Georgia */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div ref={journeyRef}>
						<SectionHeading eyebrow="Since 2025" title="The journey so far" />
						<p className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
							CauseFrame has worked hands-on with nonprofits across the Balkans, the Caucasus
							and West Africa: {CAUSEFRAME.pastWork.map((p, i) => (
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
								<div className="mt-5 flex flex-wrap items-start justify-between gap-4">
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

			{/* What's next */}
			<section className="py-20 sm:py-28 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<SectionHeading eyebrow="What's Next" title="Get Involved" />
					<p className="mt-6 max-w-3xl text-base sm:text-lg text-muted-foreground leading-relaxed">
						Ghana was the first of many. We&apos;re continuing to deliver bikes and empower
						movement through sports, one community at a time.
					</p>
					<div ref={involvedRef} className="mt-12 grid sm:grid-cols-3 gap-8 sm:gap-10">
						{[
							{
								title: "Fund a Need",
								body: "Cover the toilets or the water pump we saw in Ghana.",
							},
							{
								title: "Back the Next Delivery",
								body: "Bikes and sports equipment for the next community.",
							},
							{
								title: "Partner With Us",
								body: "For companies who want their name on real change, not just a project page.",
								href: "#for-companies",
							},
						].map((item) => (
							<div key={item.title} className="border-t border-polar-lime/40 pt-5">
								<p className="text-base font-display font-bold uppercase text-foreground">
									{item.title}
								</p>
								<p className="mt-2 text-sm text-muted-foreground leading-relaxed">
									{item.body}
								</p>
								{"href" in item && (
									<a
										href={item.href}
										className="mt-3 inline-block text-sm text-foreground underline underline-offset-4 hover:text-polar-lime transition-colors"
									>
										How it works&nbsp;&uarr;
									</a>
								)}
							</div>
						))}
					</div>
					<div className="mt-12">
						<a
							href="mailto:hello@polar26.com?subject=CauseFrame"
							className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground text-xs font-display font-bold uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
						>
							Get Involved &middot; hello@polar26.com
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
