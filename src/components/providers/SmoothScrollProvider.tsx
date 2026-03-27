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
			lerp: 0.08,
			smoothWheel: true,
			autoRaf: false,
		});
		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		const tickerCallback = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);

		const timers = [
			setTimeout(() => ScrollTrigger.refresh(), 300),
			setTimeout(() => ScrollTrigger.refresh(), 1000),
			setTimeout(() => ScrollTrigger.refresh(), 2500),
		];

		let resizeTimer: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
		};
		window.addEventListener("resize", onResize);

		return () => {
			timers.forEach(clearTimeout);
			clearTimeout(resizeTimer);
			window.removeEventListener("resize", onResize);
			gsap.ticker.remove(tickerCallback);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return <>{children}</>;
}
