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
			autoRaf: false,
		});
		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		const tickerCallback = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);

		// Refresh ScrollTrigger after dynamic components mount
		const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);

		const onResize = () => ScrollTrigger.refresh();
		window.addEventListener("resize", onResize);

		return () => {
			clearTimeout(refreshTimer);
			window.removeEventListener("resize", onResize);
			gsap.ticker.remove(tickerCallback);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, []);

	return <>{children}</>;
}
