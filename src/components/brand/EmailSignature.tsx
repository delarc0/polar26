"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

const FIELD =
	"w-full bg-[#0A0A0A] border border-white/10 px-3 py-2.5 text-sm text-foreground placeholder:text-white/30 focus:border-polar-lime focus:outline-none transition-colors";

function buildSignatureHtml(d: {
	name: string;
	title: string;
	email: string;
	phone: string;
}) {
	const name = d.name || "Your Name";
	const title = d.title || "Your Title";
	const email = d.email || "you@polar26.com";
	const phone = d.phone.trim();
	return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#0A0A0A;border-collapse:collapse;">
  <tr>
    <td style="padding-right:18px;border-right:3px solid #BDFF00;vertical-align:top;">
      <div style="font-size:16px;font-weight:bold;color:#0A0A0A;line-height:1.2;">${name}</div>
      <div style="font-size:13px;color:#6b6b6b;padding-top:2px;">${title}</div>
    </td>
    <td style="padding-left:18px;vertical-align:top;font-size:12px;line-height:1.7;color:#0A0A0A;">
      <div style="font-weight:bold;letter-spacing:1.5px;font-size:13px;">POLAR26</div>
      <div><a href="mailto:${email}" style="color:#0A0A0A;text-decoration:none;">${email}</a></div>${
		phone
			? `\n      <div><a href="tel:${phone.replace(/\s+/g, "")}" style="color:#0A0A0A;text-decoration:none;">${phone}</a></div>`
			: ""
	}
      <div><a href="https://polar26.com" style="color:#5f7d00;text-decoration:none;font-weight:bold;">polar26.com</a></div>
    </td>
  </tr>
</table>`;
}

export function EmailSignature() {
	const [name, setName] = useState("");
	const [title, setTitle] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [copied, setCopied] = useState<null | "rich" | "html">(null);

	const html = useMemo(
		() => buildSignatureHtml({ name, title, email, phone }),
		[name, title, email, phone]
	);

	const flash = (which: "rich" | "html") => {
		setCopied(which);
		setTimeout(() => setCopied(null), 1200);
	};

	const copyRich = async () => {
		const plain = `${name || "Your Name"}\n${title || "Your Title"}\nPolar26\n${
			email || "you@polar26.com"
		}${phone ? "\n" + phone : ""}\npolar26.com`;
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					"text/html": new Blob([html], { type: "text/html" }),
					"text/plain": new Blob([plain], { type: "text/plain" }),
				}),
			]);
			flash("rich");
		} catch {
			try {
				await navigator.clipboard.writeText(plain);
				flash("rich");
			} catch {
				/* no-op */
			}
		}
	};

	const copyHtml = async () => {
		try {
			await navigator.clipboard.writeText(html);
			flash("html");
		} catch {
			/* no-op */
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Inputs */}
			<div className="border border-white/10 bg-card p-6 flex flex-col gap-4">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
							Name
						</label>
						<input
							className={FIELD}
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Patrik Nordstrom"
						/>
					</div>
					<div>
						<label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
							Title
						</label>
						<input
							className={FIELD}
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Founder & CEO"
						/>
					</div>
					<div>
						<label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
							Email
						</label>
						<input
							className={FIELD}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="patrik@polar26.com"
						/>
					</div>
					<div>
						<label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
							Phone <span className="text-white/25">(optional)</span>
						</label>
						<input
							className={FIELD}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+46 70 000 00 00"
						/>
					</div>
				</div>

				<div className="flex flex-wrap gap-3 mt-1">
					<button
						type="button"
						onClick={copyRich}
						className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-display font-bold tracking-[0.12em] uppercase bg-polar-lime text-background hover:bg-white transition-colors"
					>
						{copied === "rich" ? (
							<Check size={14} strokeWidth={3} />
						) : (
							<Copy size={14} strokeWidth={2.5} />
						)}
						{copied === "rich" ? "Copied" : "Copy signature"}
					</button>
					<button
						type="button"
						onClick={copyHtml}
						className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-display font-bold tracking-[0.12em] uppercase border border-white/15 text-foreground hover:border-polar-lime hover:text-polar-lime transition-colors"
					>
						{copied === "html" ? (
							<Check size={14} strokeWidth={3} />
						) : (
							<Copy size={14} strokeWidth={2.5} />
						)}
						{copied === "html" ? "Copied" : "Copy HTML"}
					</button>
				</div>
				<p className="text-[11px] text-white/30 leading-relaxed">
					Paste straight into Gmail (Settings &rarr; Signature) or Outlook. Use
					&ldquo;Copy signature&rdquo; for formatting, or &ldquo;Copy HTML&rdquo;
					for the raw markup.
				</p>
			</div>

			{/* Preview (white, as it appears in an email) */}
			<div className="flex flex-col">
				<div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-2">
					Preview
				</div>
				<div className="flex-1 bg-white p-6 flex items-center min-h-[160px]">
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</div>
			</div>
		</div>
	);
}
