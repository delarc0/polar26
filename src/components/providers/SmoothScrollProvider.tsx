"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const lenis = new Lenis({
			lerp: 0.1,
			smoothWheel: true,
		});
		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time: number) => {
			lenis.raf(time * 1000);
		});
		gsap.ticker.lagSmoothing(0);

		return () => {
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return <>{children}</>;
}
