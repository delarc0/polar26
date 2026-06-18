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

		let videoTween: gsap.core.Tween | undefined;
		// Parallax only on desktop, where the video is a full-bleed background.
		if (video && window.innerWidth >= 640) {
			videoTween = gsap.to(video, {
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
					opacity: 1,
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
			videoTween?.scrollTrigger?.kill();
			videoTween?.kill();
			tl.kill();
			fadeOut.kill();
		};
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative sm:min-h-screen flex flex-col justify-start sm:justify-center sm:pt-20 pb-14 sm:pb-0 overflow-hidden"
		>
			{/* Media: mobile = full-bleed landscape band with gradient + overlaid
			    label; desktop = full-bleed cover background. */}
			<div className="relative z-[1] w-full mb-8 sm:mb-0 sm:absolute sm:inset-0 sm:z-0">
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					poster="/videos/hero-banner-v3-poster.webp"
					className="w-full aspect-video object-cover will-change-transform sm:absolute sm:inset-x-0 sm:-top-[15%] sm:h-[130%] sm:w-full sm:aspect-auto"
				>
					<source src="/videos/hero-banner-v3.mp4" type="video/mp4" />
				</video>

				{/* Gradient under the header for legibility (mobile only) */}
				<div className="sm:hidden absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#0A0A0A]/85 to-transparent" />

				{/* Gradient over the bottom of the video band (mobile only) */}
				<div className="sm:hidden absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/15 to-transparent" />

				{/* Overline laid over the video (mobile only) */}
				<p className="hero-overline sm:hidden absolute bottom-4 left-6 z-[2] text-xs font-medium tracking-[0.2em] uppercase text-polar-lime">
					Creative Agency
				</p>
			</div>

			{/* Legibility gradients for the full-bleed desktop layout */}
			<div className="hidden sm:block absolute inset-0 z-[2] bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent" />
			<div className="hidden sm:block absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />

			<div className="hero-content relative z-[3] mx-auto max-w-7xl w-full px-6 sm:px-8 lg:px-12 will-change-transform">
				<p className="hero-overline hidden sm:block text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-polar-lime mb-6 sm:mb-8">
					Creative Agency
				</p>

				<div className="hero-title overflow-hidden">
					<div className="overflow-hidden">
						<h1 className="line text-[clamp(2.75rem,8vw,7.5rem)] font-display font-extrabold uppercase tracking-[-0.03em] leading-[0.85]">
							Polar26
						</h1>
					</div>
				</div>

				<p className="hero-tagline mt-6 sm:mt-8 text-lg sm:text-xl text-muted-foreground max-w-lg">
					From brand to business.
				</p>
			</div>

			<div className="hero-scroll relative mt-14 self-center z-[3] flex flex-col items-center gap-2 sm:absolute sm:bottom-8 sm:left-1/2 sm:mt-0 sm:self-auto sm:-translate-x-1/2">
				<span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
					Scroll
				</span>
				<ArrowDown size={16} className="text-muted-foreground animate-bounce" />
			</div>
		</section>
	);
}
