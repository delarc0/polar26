"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
	const heroRef = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const el = heroRef.current;
		const video = videoRef.current;
		if (!el) return;

		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		if (prefersReducedMotion) {
			gsap.set([".hero-overline", ".hero-title .line", ".hero-tagline", ".hero-scroll"], { opacity: 1, y: 0 });
			return;
		}

		if (video) {
			gsap.to(video, {
				yPercent: 30,
				ease: "none",
				scrollTrigger: {
					trigger: el,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});
		}

		gsap.set([".hero-overline", ".hero-title .line", ".hero-tagline", ".hero-scroll"], {
			opacity: 0,
			y: 30,
		});
		gsap.set(".hero-title .line", { y: "120%" });

		const tl = gsap.timeline({ delay: 0.5 });

		tl.to(".hero-overline", {
			opacity: 1,
			y: 0,
			duration: 0.8,
			ease: "power3.out",
		})
			.to(
				".hero-title .line",
				{
					y: "0%",
					duration: 1.4,
					ease: "power4.out",
					stagger: 0.2,
				},
				"-=0.4"
			)
			.to(
				".hero-tagline",
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
				},
				"-=0.7"
			)
			.to(
				".hero-scroll",
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
				},
				"-=0.3"
			);

		const fadeOut = ScrollTrigger.create({
			trigger: el,
			start: "top top",
			end: "60% top",
			scrub: true,
			onUpdate: (self) => {
				const content = el.querySelector(".hero-content");
				if (content) {
					gsap.set(content, {
						opacity: 1 - self.progress * 1.5,
						y: self.progress * -60,
					});
				}
			},
		});

		return () => {
			tl.kill();
			fadeOut.kill();
		};
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 lg:px-12 pt-20 overflow-hidden"
		>
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				poster="/videos/hero-banner-poster.webp"
				className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover will-change-transform"
			>
				<source src="/videos/hero-banner.mp4" type="video/mp4" />
			</video>

			<div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent" />
			<div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

			<div className="hero-content relative z-[3] mx-auto max-w-7xl w-full will-change-transform">
				<p className="hero-overline text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-polar-lime mb-6 sm:mb-8">
					Creative Agency
				</p>

				<div className="hero-title overflow-hidden">
					<div className="overflow-hidden">
						<h1 className="line text-[clamp(2.75rem,10vw,10rem)] font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.85]">
							Polar26
						</h1>
					</div>
				</div>

				<p className="hero-tagline mt-6 sm:mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg">
					From brand to business.
				</p>
			</div>

			<div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
				<span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
					Scroll
				</span>
				<ArrowDown size={16} className="text-muted-foreground animate-bounce" />
			</div>
		</section>
	);
}
