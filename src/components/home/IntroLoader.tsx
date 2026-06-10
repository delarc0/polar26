"use client";

import { useEffect, useState } from "react";

export function IntroLoader() {
	const [show, setShow] = useState(true);
	const [ready, setReady] = useState(false);
	const [exiting, setExiting] = useState(false);

	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let seen = false;
		try {
			seen = sessionStorage.getItem("p26-intro") === "1";
		} catch {
			seen = false;
		}

		if (reduced || seen) {
			setShow(false);
			return;
		}

		try {
			sessionStorage.setItem("p26-intro", "1");
		} catch {
			/* ignore */
		}

		document.body.style.overflow = "hidden";

		const t0 = window.setTimeout(() => setReady(true), 60);
		const t1 = window.setTimeout(() => setExiting(true), 1500);
		const t2 = window.setTimeout(() => {
			setShow(false);
			document.body.style.overflow = "";
		}, 2250);

		return () => {
			window.clearTimeout(t0);
			window.clearTimeout(t1);
			window.clearTimeout(t2);
			document.body.style.overflow = "";
		};
	}, []);

	if (!show) return null;

	return (
		<div
			aria-hidden="true"
			className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
			style={{
				transform: exiting ? "translateY(-100%)" : "translateY(0)",
				transition: "transform 750ms cubic-bezier(0.76, 0, 0.24, 1)",
			}}
		>
			<div className="flex flex-col items-center">
				<div
					className="font-display font-extrabold uppercase tracking-[-0.03em] text-[clamp(2.5rem,12vw,9rem)] leading-none text-[#FAFAFA]"
					style={{
						filter: ready ? "blur(0px)" : "blur(22px)",
						opacity: ready ? 1 : 0,
						transform: ready ? "scale(1)" : "scale(1.06)",
						transition:
							"filter 900ms cubic-bezier(0.22,1,0.36,1), opacity 700ms ease, transform 900ms cubic-bezier(0.22,1,0.36,1)",
					}}
				>
					Polar26
				</div>
				<div
					className="mt-5 h-[3px] bg-polar-lime"
					style={{
						width: ready ? "180px" : "0px",
						opacity: ready ? 1 : 0,
						transition: "width 850ms cubic-bezier(0.22,1,0.36,1) 120ms, opacity 400ms ease 120ms",
					}}
				/>
			</div>
		</div>
	);
}
