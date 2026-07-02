"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { RevealText } from "@/components/shared/RevealText";
import { Footprints, Bike, GraduationCap, ArrowRight } from "lucide-react";

const STEPS = [
	{
		title: "Distance",
		tag: "The Barrier Today",
		description:
			"In much of rural Ghana, the nearest school can be an hour or more away on foot. For a lot of kids, that walk is the single biggest reason attendance slips.",
		icon: Footprints,
		number: "01",
		details: ["Long daily walks", "Lost study time", "Higher dropout risk"],
	},
	{
		title: "Access",
		tag: "What A Bike Changes",
		description:
			"A bicycle cuts that commute down to a fraction of the time, turning an exhausting walk into a short, manageable ride.",
		icon: Bike,
		number: "02",
		details: ["Shorter commute", "More energy for class", "Independence for kids"],
	},
	{
		title: "Opportunity",
		tag: "What It Unlocks",
		description:
			"More time in school and less exhaustion compounds over years: better attendance, stronger outcomes, and a real shot at breaking the cycle of poverty.",
		icon: GraduationCap,
		number: "03",
		details: ["Better attendance", "Stronger outcomes", "Long-term impact"],
	},
];

function ConnectionLine() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const line = el.querySelector<HTMLElement>(".gis-line");
		const nodes = el.querySelectorAll<HTMLElement>(".gis-node");
		const pulse = el.querySelector<HTMLElement>(".gis-pulse");

		if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
		gsap.set(nodes, { scale: 0, opacity: 0 });
		if (pulse) gsap.set(pulse, { left: "0%", opacity: 0 });

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (reduced) {
			if (line) gsap.set(line, { scaleX: 1 });
			gsap.set(nodes, { scale: 1, opacity: 1 });
			return;
		}

		let pulseTween: gsap.core.Tween | null = null;
		const trigger = ScrollTrigger.create({
			trigger: el,
			start: "top 75%",
			once: true,
			onEnter: () => {
				const tl = gsap.timeline();
				if (line) tl.to(line, { scaleX: 1, duration: 1.4, ease: "power2.inOut" });
				tl.to(nodes, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.18, ease: "back.out(2)" }, "-=0.8");
				if (pulse) {
					tl.set(pulse, { opacity: 1 });
					pulseTween = gsap.to(pulse, { left: "100%", duration: 3.2, ease: "none", repeat: -1 });
				}
			},
		});

		return () => {
			trigger.kill();
			pulseTween?.kill();
		};
	}, []);

	return (
		<div
			ref={ref}
			className="hidden md:block absolute top-2 left-[16.66%] right-[16.66%] h-[2px] z-0"
		>
			<div className="absolute inset-0 bg-white/10" />
			<div className="gis-line absolute inset-0 bg-gradient-to-r from-polar-lime/60 via-polar-lime to-polar-lime/60" />
			<span className="gis-pulse absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-polar-lime shadow-[0_0_12px_4px_rgba(189,255,0,0.55)]" />
			{[0, 50, 100].map((pct) => (
				<span
					key={pct}
					className="gis-node absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-polar-lime bg-[#0A0A0A]"
					style={{ left: `${pct}%` }}
				/>
			))}
		</div>
	);
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
	const Icon = step.icon;
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
					{ opacity: 0, y: 40 },
					{ opacity: 1, y: 0, duration: 0.8, delay: index * 0.15, ease: "power3.out" }
				);
			},
		});

		return () => trigger.kill();
	}, [index]);

	return (
		<div ref={cardRef} className="relative group z-[1] opacity-0">
			<span className="absolute -top-8 -left-2 text-[8rem] sm:text-[10rem] font-display font-extrabold uppercase text-white/[0.04] select-none pointer-events-none leading-none">
				{step.number}
			</span>

			<div className="relative">
				<div className="flex items-center gap-4 mb-6">
					<div className="relative flex items-center justify-center w-14 h-14 border border-polar-lime/40 bg-polar-lime/5 group-hover:bg-polar-lime/10 transition-colors duration-500">
						<Icon size={22} className="text-polar-lime" />
						<div className="absolute inset-0 border border-polar-lime/20 scale-[1.3] opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500" />
					</div>
					{index < STEPS.length - 1 && (
						<ArrowRight size={16} className="hidden md:block text-polar-lime/40 ml-auto" />
					)}
				</div>

				<span className="text-xs font-medium tracking-[0.15em] uppercase text-polar-lime/70">
					{step.tag}
				</span>
				<h3 className="mt-2 text-2xl sm:text-3xl font-display font-extrabold uppercase">
					{step.title}
				</h3>
				<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
					{step.description}
				</p>

				<ul className="mt-5 space-y-2">
					{step.details.map((detail) => (
						<li key={detail} className="flex items-center gap-2 text-xs text-white/50">
							<div className="h-px w-3 bg-polar-lime/50" />
							{detail}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export function GhanaImpactSteps() {
	return (
		<div className="mt-20 sm:mt-24">
			<div className="text-center max-w-3xl mx-auto">
				<span className="text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					From Distance To Opportunity
				</span>
				<RevealText
					as="h2"
					className="mt-4 text-[clamp(2rem,5vw,4rem)] font-display font-extrabold uppercase"
				>
					How A Bike Changes The Equation
				</RevealText>
				<p className="mt-4 text-muted-foreground max-w-xl mx-auto">
					One bike. Three steps. A real shot at staying in school.
				</p>
			</div>

			<div className="relative mt-20 sm:mt-24">
				<ConnectionLine />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 md:pt-16">
					{STEPS.map((step, i) => (
						<StepCard key={step.title} step={step} index={i} />
					))}
				</div>
			</div>
		</div>
	);
}
