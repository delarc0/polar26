"use client";

import { useState } from "react";

// Stop 0 means "not set", so the field stays optional and the handle doesn't
// start on a price and anchor the answer. Brackets start at the lowest
// "From" price on /upcoming.
const BRACKETS = ["€1,000 to €2,500", "€2,500 to €5,000", "€5,000 to €10,000", "€10,000+"];

export function InvestmentSlider({ onChange }: { onChange: (value: string | undefined) => void }) {
	const [stop, setStop] = useState(0);
	const value = stop > 0 ? BRACKETS[stop - 1] : undefined;

	return (
		<div>
			<div className="flex items-baseline justify-between gap-4">
				<label htmlFor="budget" className="text-sm text-muted-foreground">
					Investment size (optional)
				</label>
				<span
					key={stop}
					className={`investment-pop font-display text-base sm:text-lg font-bold uppercase ${value ? "text-polar-lime" : "text-muted-foreground"}`}
					aria-hidden="true"
				>
					{value ?? "Drag to set"}
				</span>
			</div>
			<input
				id="budget"
				type="range"
				min={0}
				max={BRACKETS.length}
				step={1}
				value={stop}
				onChange={(e) => {
					const next = Number(e.target.value);
					setStop(next);
					onChange(next > 0 ? BRACKETS[next - 1] : undefined);
				}}
				aria-valuetext={value ?? "Not set"}
				data-unset={stop === 0}
				className="investment-range mt-1"
				style={{ "--fill": `${(stop / BRACKETS.length) * 100}%` } as React.CSSProperties}
			/>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>Not set</span>
				<span>€10,000+</span>
			</div>
		</div>
	);
}
