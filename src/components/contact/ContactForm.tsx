"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	company: z.string().optional(),
	projectType: z.string().optional(),
	message: z.string().min(1, "Message is required"),
	turnstileToken: z.string().min(1, "Please complete the security check"),
});

type FormData = z.infer<typeof schema>;

const PROJECT_TYPES = ["Film", "Brand", "Digital", "Events", "Other"];

function FloatingField({
	id,
	label,
	error,
	children,
}: {
	id: string;
	label: string;
	error?: string;
	children: React.ReactNode;
}) {
	return (
		<div className="floating-field">
			{children}
			<label htmlFor={id}>{label}</label>
			{error && (
				<p role="alert" className="mt-1 text-xs text-red-400">{error}</p>
			)}
		</div>
	);
}

export function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const buttonRef = useMagnetic<HTMLButtonElement>(0.2);
	const turnstileRef = useRef<TurnstileInstance>(null);
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [error, setError] = useState("");

	const onSubmit = async (data: FormData) => {
		setError("");
		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			turnstileRef.current?.reset();
			if (res.ok) {
				reset();
				setSubmitted(true);
			} else {
				try {
					const body = await res.json();
					setError(body.error || "Something went wrong. Please try again.");
				} catch {
					setError("Something went wrong. Please try again.");
				}
			}
		} catch {
			setError("Could not send message. Please try again.");
			turnstileRef.current?.reset();
		}
	};

	if (submitted) {
		return (
			<div className="py-12 text-center" role="status" aria-live="polite">
				<p className="text-lg font-display font-bold uppercase text-polar-lime">
					Message sent
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					We will get back to you soon.
				</p>
			</div>
		);
	}

	const inputClasses = "w-full h-12 bg-secondary border border-white/[0.06] px-3 text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-polar-lime transition-all";
	const textareaClasses = "w-full bg-secondary border border-white/[0.06] px-3 pt-6 pb-3 text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-polar-lime transition-all resize-none";

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
			<FloatingField id="name" label="Name *" error={errors.name?.message}>
				<input
					id="name"
					{...register("name")}
					placeholder="Name"
					className={inputClasses}
				/>
			</FloatingField>

			<FloatingField id="email" label="Email *" error={errors.email?.message}>
				<input
					id="email"
					type="email"
					{...register("email")}
					placeholder="Email"
					className={inputClasses}
				/>
			</FloatingField>

			<FloatingField id="company" label="Company">
				<input
					id="company"
					{...register("company")}
					placeholder="Company"
					className={inputClasses}
				/>
			</FloatingField>

			<FloatingField id="projectType" label="Project Type">
				<div className="relative">
					<select
						id="projectType"
						{...register("projectType")}
						className={cn(inputClasses, "appearance-none cursor-pointer pr-10")}
						defaultValue=""
					>
						<option value="" disabled hidden></option>
						{PROJECT_TYPES.map((type) => (
							<option key={type} value={type}>
								{type}
							</option>
						))}
					</select>
					<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
							<path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" />
						</svg>
					</div>
				</div>
			</FloatingField>

			<FloatingField id="message" label="Message *" error={errors.message?.message}>
				<textarea
					id="message"
					{...register("message")}
					placeholder="Message"
					rows={4}
					className={textareaClasses}
				/>
			</FloatingField>

			<div>
				<Turnstile
					ref={turnstileRef}
					siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA"}
					onSuccess={(token) => setValue("turnstileToken", token)}
					onExpire={() => setValue("turnstileToken", "")}
					options={{ theme: "dark" }}
				/>
				{errors.turnstileToken && (
					<p role="alert" className="mt-1 text-xs text-red-400">{errors.turnstileToken.message}</p>
				)}
				<input type="hidden" {...register("turnstileToken")} />
			</div>

			{error && (
				<p role="alert" className="text-sm text-red-400 text-center">{error}</p>
			)}

			<button
				ref={buttonRef}
				type="submit"
				disabled={isSubmitting}
				className="w-full bg-polar-lime text-[#0A0A0A] px-8 py-3.5 text-sm font-bold tracking-[0.1em] uppercase hover:bg-polar-lime/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-polar-lime focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
			>
				{isSubmitting ? "Sending..." : "Send Message"}
			</button>
		</form>
	);
}
