import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml, encodeNonAsciiHtml } from "@/lib/sanitize";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(254),
  company: z.string().max(100).optional(),
  projectType: z.string().max(100).optional(),
  message: z.string().min(1, "Message is required").max(5000),
});

const TO = "hello@polar26.com";

function buildEmail({
  name,
  email,
  company,
  projectType,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}) {
  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:-apple-system,sans-serif;">
  <table width="100%" style="background:#0A0A0A;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:32px;">
          <span style="font-size:20px;font-weight:700;letter-spacing:4px;color:#BDFF00;">POLAR26</span>
        </td></tr>
        <tr><td style="padding-bottom:24px;">
          <h1 style="margin:0;font-size:22px;color:#fff;">New contact message</h1>
        </td></tr>
        <tr><td>
          <table width="100%" style="background:#121212;border:1px solid #333;">
            <tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Name</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Email</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(email)}</td>
            </tr>
            ${company ? `<tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Company</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(company)}</td>
            </tr>` : ""}
            ${projectType ? `<tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Project Type</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(projectType)}</td>
            </tr>` : ""}
            <tr><td colspan="2" style="padding:16px;border-top:1px solid #333;">
              <p style="color:#999;font-size:13px;margin:0 0 8px;">Message</p>
              <p style="color:#FAFAFA;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(message)}</p>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:13px;color:#666;">
            Reply to: <a href="mailto:${escapeHtml(email)}" style="color:#BDFF00;">${escapeHtml(email)}</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return encodeNonAsciiHtml(html);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { name, email, company, projectType, message } = parsed.data;

    const subject = `Contact form: ${name}`;
    const html = buildEmail({ name, email, company, projectType, message });

    after(async () => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error("RESEND_API_KEY is not configured");
        return;
      }
      try {
        const resend = new Resend(apiKey);
        const from =
          process.env.RESEND_FROM || "Polar26 <onboarding@resend.dev>";
        await resend.emails.send({
          from,
          to: TO,
          replyTo: email,
          subject,
          html,
        });
      } catch (err) {
        console.error("Email send failed:", err);
      }
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
