"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

const schema = z.object({
	pageSection: z.string().min(1, "Please select a page"),
	requestType: z.string().min(1, "Please select a type"),
	priority: z.string().min(1, "Please select a priority"),
	summary: z.string().min(1, "Summary is required").max(200),
	description: z.string().min(1, "Description is required").max(2000),
});

type FormData = z.infer<typeof schema>;

const PAGE_SECTIONS = ["Homepage", "About", "Contact", "Footer", "Navigation", "Other"];
const REQUEST_TYPES = ["Change", "New Feature", "Bug Fix", "Content Update"];
const PRIORITIES = ["Low", "Medium", "High"];

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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_FILES = 5;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf", "image/gif"];

export function EditRequestForm() {
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const [files, setFiles] = useState<File[]>([]);
	const buttonRef = useMagnetic<HTMLButtonElement>(0.2);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = Array.from(e.target.files || []);
		const valid = selected.filter(
			(f) => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE
		);
		setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES));
		e.target.value = "";
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = async (data: FormData) => {
		setError("");
		try {
			const body = new globalThis.FormData();
			Object.entries(data).forEach(([k, v]) => body.append(k, v));
			files.forEach((f) => body.append("files", f));

			const res = await fetch("/api/edit", {
				method: "POST",
				body,
			});
			if (res.ok) {
				reset();
				setFiles([]);
				setSubmitted(true);
			} else {
				setError("Something went wrong. Please try again.");
			}
		} catch {
			setError("Could not send request. Please try again.");
		}
	};

	if (submitted) {
		return (
			<div className="py-12 text-center" role="status" aria-live="polite">
				<p className="text-lg font-display font-bold uppercase text-polar-lime">
					Request submitted
				</p>
				<p className="mt-2 text-sm text-muted-foreground">
					We will review your request and get back to you.
				</p>
				<button
					onClick={() => setSubmitted(false)}
					className="mt-6 text-sm text-polar-lime underline underline-offset-4 hover:text-polar-lime/80 transition-colors cursor-pointer"
				>
					Submit another request
				</button>
			</div>
		);
	}

	const inputClasses = "w-full h-12 bg-secondary border border-white/[0.06] px-3 text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-polar-lime transition-all";
	const textareaClasses = "w-full bg-secondary border border-white/[0.06] px-3 pt-6 pb-3 text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-1 focus:ring-polar-lime transition-all resize-none";

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
				<FloatingField id="pageSection" label="Page / Section *" error={errors.pageSection?.message}>
					<select
						id="pageSection"
						{...register("pageSection")}
						className={cn(inputClasses, "appearance-none cursor-pointer")}
						defaultValue=""
					>
						<option value="" disabled hidden></option>
						{PAGE_SECTIONS.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</FloatingField>

				<FloatingField id="requestType" label="Request Type *" error={errors.requestType?.message}>
					<select
						id="requestType"
						{...register("requestType")}
						className={cn(inputClasses, "appearance-none cursor-pointer")}
						defaultValue=""
					>
						<option value="" disabled hidden></option>
						{REQUEST_TYPES.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</FloatingField>

				<FloatingField id="priority" label="Priority *" error={errors.priority?.message}>
					<select
						id="priority"
						{...register("priority")}
						className={cn(inputClasses, "appearance-none cursor-pointer")}
						defaultValue=""
					>
						<option value="" disabled hidden></option>
						{PRIORITIES.map((opt) => (
							<option key={opt} value={opt}>{opt}</option>
						))}
					</select>
				</FloatingField>
			</div>

			<FloatingField id="summary" label="Summary *" error={errors.summary?.message}>
				<input
					id="summary"
					{...register("summary")}
					placeholder="Summary"
					className={inputClasses}
				/>
			</FloatingField>

			<FloatingField id="description" label="Description *" error={errors.description?.message}>
				<textarea
					id="description"
					{...register("description")}
					placeholder="Description"
					rows={6}
					className={textareaClasses}
				/>
			</FloatingField>

			<div>
				<label
					htmlFor="files"
					className="flex items-center justify-center gap-2 w-full h-24 border border-dashed border-white/[0.12] bg-secondary/50 text-sm text-muted-foreground hover:border-polar-lime/40 hover:text-foreground transition-all cursor-pointer"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
					{files.length > 0 ? `${files.length} file${files.length > 1 ? "s" : ""} attached` : "Attach files (optional)"}
				</label>
				<input
					id="files"
					type="file"
					multiple
					accept={ALLOWED_TYPES.join(",")}
					onChange={handleFiles}
					className="sr-only"
				/>
				<p className="mt-1.5 text-[11px] text-white/25">
					PNG, JPG, WebP, SVG, PDF, GIF. Max 10MB each, up to 5 files.
				</p>
				{files.length > 0 && (
					<div className="mt-3 flex flex-wrap gap-2">
						{files.map((f, i) => (
							<span
								key={`${f.name}-${i}`}
								className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-secondary border border-white/[0.06] text-foreground"
							>
								{f.name.length > 25 ? `${f.name.slice(0, 22)}...` : f.name}
								<button
									type="button"
									onClick={() => removeFile(i)}
									className="text-white/40 hover:text-red-400 transition-colors cursor-pointer"
									aria-label={`Remove ${f.name}`}
								>
									&times;
								</button>
							</span>
						))}
					</div>
				)}
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
				{isSubmitting ? "Submitting..." : "Submit Request"}
			</button>
		</form>
	);
}
