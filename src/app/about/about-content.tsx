"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/shared/RevealText";

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
		title: "Every Frame Matters",
		description:
			"Whether it is a 15-second reel or a full brand film, we obsess over the details that separate good from unforgettable.",
		number: "03",
	},
];

const CAPABILITIES = [
	"Videography",
	"Advertising",
	"Brand Consulting",
	"Content Strategy",
	"Event Production",
	"Content Marketing",
	"Digital Marketing",
	"Commercial Photography",
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
			<section className="pt-32 sm:pt-40 pb-16 sm:pb-24">
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
						We believe in creative that moves people.
					</RevealText>
				</div>
			</section>

			<section className="py-16 sm:py-24">
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
									Patrik is a brand consultant, videographer and content
									strategist with over a decade of experience in creative
									production. From advertising campaigns to large-scale event
									production, he has built brands and told stories across every
									medium.
								</p>
								<p className="bio-paragraph">
									With a postgraduate degree in communication and digital
									creation from BAU in Barcelona, and deep roots in Swedish
									creative culture, Patrik brings a unique blend of strategic
									thinking and raw creative instinct to every project.
								</p>
								<p className="bio-paragraph">
									Outside work, he is a former Swedish 3x3 Basketball Champion
									(gold 2016, 2017) and has competed in several motorcycle
									racing series.
								</p>
							</div>
						</div>

						<div
							ref={founderImageRef}
							className="relative aspect-[3/4] overflow-hidden"
							style={{ clipPath: "inset(100% 0 0 0)" }}
						>
							<div ref={imageInnerRef} className="absolute inset-0 will-change-transform">
								<Image
									src="/images/patrik-portrait.webp"
									alt="Patrik Nordstrom"
									fill
									sizes="(max-width: 1024px) 100vw, 50vw"
									className="object-cover"
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
