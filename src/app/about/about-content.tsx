"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/shared/RevealText";
import { SITE } from "@/data/site";

const VALUES = [
	{
		title: "Bold Over Safe",
		description:
			"Playing it safe is the riskiest thing a brand can do. We push creative boundaries because that is where the magic happens.",
		number: "01",
	},
	{
		title: "Strategy Meets Story",
		description:
			"Every project starts with a clear strategy. Then we wrap it in a story that makes people feel something.",
		number: "02",
	},
	{
		title: "Every Action Matters",
		description:
			"From the negotiating table to the final deadline, nothing is wasted. We move fast, decide sharply, and make every action count.",
		number: "03",
	},
];

const CAPABILITIES = [
	"Brand Activation",
	"Product Strategy",
	"Strategic Partnerships",
	"Athlete Management",
	"Content Production",
];

function ValueCard({ value, index }: { value: typeof VALUES[number]; index: number }) {
	const cardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = cardRef.current;
		if (!el) return;

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 85%",
			once: true,
			onEnter: () => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 60, rotateX: 15 },
					{
						opacity: 1,
						y: 0,
						rotateX: 0,
						duration: 1,
						delay: index * 0.15,
						ease: "power3.out",
					}
				);
				const line = el.querySelector(".value-line");
				if (line) {
					gsap.fromTo(
						line,
						{ scaleX: 0 },
						{ scaleX: 1, duration: 0.8, delay: index * 0.15 + 0.3, ease: "power2.inOut" }
					);
				}
			},
		});

		return () => trigger.kill();
	}, [index]);

	return (
		<div ref={cardRef} className="relative group opacity-0 cursor-pointer" style={{ perspective: "1000px" }}>
			<div className="absolute -top-4 -left-2 text-[5rem] sm:text-[6rem] font-display font-extrabold text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-500">
				{value.number}
			</div>
			<div className="relative pt-4">
				<h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-polar-lime">
					{value.title}
				</h3>
				<p className="mt-4 text-sm text-muted-foreground leading-relaxed">
					{value.description}
				</p>
				<div className="value-line mt-6 h-px bg-gradient-to-r from-polar-lime/40 to-transparent origin-left" />
			</div>
		</div>
	);
}

function CapabilityItem({ cap, index }: { cap: string; index: number }) {
	const itemRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = itemRef.current;
		if (!el) return;

		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 90%",
			once: true,
			onEnter: () => {
				gsap.fromTo(
					el,
					{ opacity: 0, x: -30 },
					{
						opacity: 1,
						x: 0,
						duration: 0.6,
						delay: index * 0.08,
						ease: "power3.out",
					}
				);
				const dot = el.querySelector(".cap-dot");
				if (dot) {
					gsap.fromTo(
						dot,
						{ scale: 0 },
						{ scale: 1, duration: 0.4, delay: index * 0.08 + 0.2, ease: "back.out(2)" }
					);
				}
				const line = el.querySelector(".cap-line");
				if (line) {
					gsap.fromTo(
						line,
						{ scaleX: 0 },
						{ scaleX: 1, duration: 0.6, delay: index * 0.08 + 0.1, ease: "power2.out" }
					);
				}
			},
		});

		return () => trigger.kill();
	}, [index]);

	return (
		<div
			ref={itemRef}
			className="flex items-center gap-3 py-4 border-b border-white/[0.06] group cursor-pointer opacity-0"
		>
			<div className="cap-dot h-2 w-2 bg-polar-lime flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
			<span className="text-sm sm:text-base text-foreground group-hover:text-polar-lime transition-colors duration-300 uppercase tracking-wide">
				{cap}
			</span>
			<div className="cap-line flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent origin-left" />
		</div>
	);
}

export function AboutPageContent() {
	const founderImageRef = useRef<HTMLDivElement>(null);
	const imageInnerRef = useRef<HTMLDivElement>(null);
	const bioRef = useScrollReveal<HTMLDivElement>({ delay: 0.1 });

	useEffect(() => {
		const container = founderImageRef.current;
		const inner = imageInnerRef.current;
		if (!container || !inner) return;

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const scaleTween = gsap.fromTo(
			inner,
			{ scale: 1.15 },
			{
				scale: 1,
				ease: "none",
				scrollTrigger: {
					trigger: container,
					start: "top bottom",
					end: "bottom top",
					scrub: true,
				},
			}
		);

		const revealTrigger = ScrollTrigger.create({
			trigger: container,
			start: "top 80%",
			once: true,
			onEnter: () => {
				gsap.fromTo(
					container,
					{ clipPath: "inset(100% 0 0 0)" },
					{ clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut" }
				);
			},
		});

		return () => {
			scaleTween.scrollTrigger?.kill();
			scaleTween.kill();
			revealTrigger.kill();
		};
	}, []);

	useEffect(() => {
		const paragraphs = document.querySelectorAll(".bio-paragraph");
		const triggers: ScrollTrigger[] = [];

		paragraphs.forEach((p, i) => {
			gsap.set(p, { opacity: 0, y: 30 });
			const trigger = ScrollTrigger.create({
				trigger: p,
				start: "top 85%",
				once: true,
				onEnter: () => {
					gsap.to(p, {
						opacity: 1,
						y: 0,
						duration: 0.8,
						delay: i * 0.15,
						ease: "power3.out",
					});
				},
			});
			triggers.push(trigger);
		});

		return () => triggers.forEach((t) => t.kill());
	}, []);

	return (
		<>
			<section className="pt-32 sm:pt-40 pb-8 sm:pb-10">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						About
					</span>
					<RevealText
						as="h1"
						className="mt-4 text-[clamp(2rem,6vw,5rem)] font-display font-bold uppercase"
						scrollTrigger={false}
						delay={0.3}
					>
						About Polar26
					</RevealText>
					<RevealText
						as="p"
						className="mt-6 text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-display uppercase"
						scrollTrigger={false}
						delay={0.6}
						stagger={0.04}
					>
						From brand to business.
					</RevealText>
				</div>
			</section>

			<section className="pt-6 sm:pt-10 pb-16 sm:pb-24">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
						<div ref={bioRef}>
							<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
								The Founder
							</span>
							<RevealText
								as="h2"
								className="mt-4 text-[clamp(1.75rem,3vw,2.75rem)] font-display font-bold uppercase"
							>
								Patrik Nordstrom
							</RevealText>
							<div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
								<p className="bio-paragraph">
									Patrik is a brand consultant and content producer with over a
									decade of experience in project management. From advertising
									campaigns and large-scale events to building personal brands for
									athletes, he has built reputations and developed businesses across
									every medium.
								</p>
								<p className="bio-paragraph">
									With a postgraduate degree in communication and digital
									creation from BAU in Barcelona, and deep roots in Swedish
									creative culture, Patrik brings a unique blend of strategic
									thinking and raw creative instinct to every project.
								</p>
								<p className="bio-paragraph">
									He is a former Swedish 3x3 Basketball Champion (gold 2016,
									2017), a motorcycle racer, and a seasoned adventurer at home
									far off the map. That world runs deep, which is why Polar26
									manages athletes with the same care it builds brands: he knows
									what it takes to perform, and how to turn a name into an icon.
								</p>
								<p className="bio-paragraph">
									He founded Polar26 with a clear mission: help brands stop
									blending in. Today the agency works with clients across
									motorsport, lifestyle, and consumer goods, from initial brand
									strategy to long-term growth. Every project is built on
									the belief that the best work does not just look good, it
									drives real business results.
								</p>
							</div>
								<div className="mt-8 flex flex-wrap items-center gap-3">
									<a
										href={SITE.social.instagram}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Patrik on Instagram"
										className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/15 text-xs font-display font-bold uppercase tracking-[0.15em] text-foreground hover:border-polar-lime hover:bg-polar-lime hover:text-background transition-colors duration-300"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
											<rect x="2" y="2" width="20" height="20" rx="5" />
											<circle cx="12" cy="12" r="4" />
											<circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
										</svg>
										Instagram
									</a>
									<a
										href={SITE.social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Patrik on LinkedIn"
										className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-white/15 text-xs font-display font-bold uppercase tracking-[0.15em] text-foreground hover:border-polar-lime hover:bg-polar-lime hover:text-background transition-colors duration-300"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
											<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
										</svg>
										LinkedIn
									</a>
								</div>
							<div className="mt-8 pt-6 border-t border-white/[0.06]">
								<p className="text-xs text-muted-foreground">
									<span className="text-foreground font-medium">Patrik Nordstrom</span>
									{", "}Founder &amp; Creative Director, Polar26
								</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Published June 2026
								</p>
							</div>
						</div>

						<div
							ref={founderImageRef}
							className="relative aspect-[3/4] overflow-hidden w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
							style={{ clipPath: "inset(100% 0 0 0)" }}
						>
							<div ref={imageInnerRef} className="absolute inset-0 will-change-transform">
								<Image
									src="/images/patrik-portrait-bw.webp"
									alt="Patrik Nordstrom"
									width={1024}
									height={2048}
									priority
									sizes="(max-width: 1024px) 100vw, 384px"
									className="object-cover absolute inset-0 w-full h-full"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/30 to-transparent" />
						</div>
					</div>
				</div>
			</section>

			<section className="py-24 sm:py-32 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<div>
						<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
							Our Approach
						</span>
						<RevealText
							as="h2"
							className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase"
						>
							Values
						</RevealText>
					</div>

					<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-14">
						{VALUES.map((value, i) => (
							<ValueCard key={value.title} value={value} index={i} />
						))}
					</div>
				</div>
			</section>

			<section className="py-24 sm:py-32 border-t border-white/[0.06]">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
						What We Do
					</span>
					<RevealText
						as="h2"
						className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-display font-bold uppercase"
					>
						Capabilities
					</RevealText>

					<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-12">
						{CAPABILITIES.map((cap, i) => (
							<CapabilityItem key={cap} cap={cap} index={i} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}
