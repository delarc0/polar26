"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

interface ScrollContextValue {
	lockScroll: () => void;
	unlockScroll: () => void;
}

const ScrollContext = createContext<ScrollContextValue>({
	lockScroll: () => {},
	unlockScroll: () => {},
});

export function useScrollLock() {
	return useContext(ScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<Lenis | null>(null);
	const lockCountRef = useRef(0);
	const pathname = usePathname();

	const lockScroll = useCallback(() => {
		lockCountRef.current++;
		if (lockCountRef.current === 1) {
			lenisRef.current?.stop();
			document.body.style.overflow = "hidden";
		}
	}, []);

	const unlockScroll = useCallback(() => {
		lockCountRef.current = Math.max(0, lockCountRef.current - 1);
		if (lockCountRef.current === 0) {
			lenisRef.current?.start();
			document.body.style.overflow = "";
		}
	}, []);

	useEffect(() => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const isMobile = window.innerWidth < 768;

		const lenis = new Lenis({
			lerp: isMobile ? 0.12 : 0.08,
			smoothWheel: true,
			autoRaf: false,
			touchMultiplier: isMobile ? 1.5 : 1,
		});
		lenisRef.current = lenis;

		lenis.on("scroll", ScrollTrigger.update);

		const tickerCallback = (time: number) => {
			lenis.raf(time * 1000);
		};
		gsap.ticker.add(tickerCallback);
		gsap.ticker.lagSmoothing(0);

		const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 800);

		let resizeTimer: ReturnType<typeof setTimeout>;
		const onResize = () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
		};
		window.addEventListener("resize", onResize);

		return () => {
			clearTimeout(refreshTimer);
			clearTimeout(resizeTimer);
			window.removeEventListener("resize", onResize);
			gsap.ticker.remove(tickerCallback);
			lenis.destroy();
			lenisRef.current = null;
			lockCountRef.current = 0;
			document.body.style.overflow = "";
		};
	}, []);

	// Reset scroll and refresh triggers on route change
	useEffect(() => {
		const lenis = lenisRef.current;
		if (lenis) {
			lenis.scrollTo(0, { immediate: true });
		} else {
			window.scrollTo(0, 0);
		}

		const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<ScrollContext.Provider value={{ lockScroll, unlockScroll }}>
			{children}
		</ScrollContext.Provider>
	);
}
