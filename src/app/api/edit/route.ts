import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { escapeHtml, encodeNonAsciiHtml } from "@/lib/sanitize";

const editSchema = z.object({
  pageSection: z.string().min(1).max(50),
  requestType: z.string().min(1).max(50),
  priority: z.string().min(1).max(20),
  summary: z.string().min(1, "Summary is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
});

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = process.env.NOTION_EDIT_DB_ID;
const TO = "erik@lab37.io";
const FROM = process.env.RESEND_FROM || "Polar26 <onboarding@resend.dev>";
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

async function createNotionPage(data: z.infer<typeof editSchema>) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        Title: {
          title: [{ text: { content: escapeHtml(data.summary) } }],
        },
        Type: {
          select: { name: data.requestType },
        },
        "Page/Section": {
          select: { name: data.pageSection },
        },
        Priority: {
          select: { name: data.priority },
        },
        Description: {
          rich_text: [{ text: { content: escapeHtml(data.description) } }],
        },
        Status: {
          select: { name: "New" },
        },
        "Submitted At": {
          date: { start: new Date().toISOString() },
        },
        "Submitted By": {
          rich_text: [
            {
              text: {
                content: "Patrik Nordstrom",
              },
            },
          ],
        },
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Notion API error ${res.status}: ${body}`);
  }
}

function buildEmail(data: z.infer<typeof editSchema>, hasFiles: boolean) {
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
          <h1 style="margin:0;font-size:22px;color:#fff;">Edit Request: ${escapeHtml(data.summary)}</h1>
        </td></tr>
        <tr><td>
          <table width="100%" style="background:#121212;border:1px solid #333;">
            <tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Page</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(data.pageSection)}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Type</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(data.requestType)}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;color:#999;font-size:13px;">Priority</td>
              <td style="padding:12px 16px;color:#FAFAFA;font-size:14px;">${escapeHtml(data.priority)}</td>
            </tr>
            <tr><td colspan="2" style="padding:16px;border-top:1px solid #333;">
              <p style="color:#999;font-size:13px;margin:0 0 8px;">Description</p>
              <p style="color:#FAFAFA;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap;">${escapeHtml(data.description)}</p>
            </td></tr>
            ${hasFiles ? `<tr><td colspan="2" style="padding:12px 16px;border-top:1px solid #333;">
              <p style="color:#BDFF00;font-size:13px;margin:0;">Files attached to this email</p>
            </td></tr>` : ""}
          </table>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <p style="margin:0;font-size:13px;color:#666;">From: Patrik Nordstrom</p>
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
    const formData = await req.formData();

    const fields = {
      pageSection: formData.get("pageSection") as string,
      requestType: formData.get("requestType") as string,
      priority: formData.get("priority") as string,
      summary: formData.get("summary") as string,
      description: formData.get("description") as string,
    };

    const parsed = editSchema.safeParse(fields);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const files = formData.getAll("files") as File[];
    const attachments: { filename: string; content: Buffer }[] = [];
    for (const file of files.slice(0, 5)) {
      if (file.size > 10 * 1024 * 1024) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({ filename: file.name, content: buffer });
    }

    // Create Notion entry (must complete before response on serverless)
    let notionError: string | null = null;
    if (NOTION_API_KEY && NOTION_DB_ID) {
      try {
        await createNotionPage(parsed.data);
      } catch (err) {
        notionError = err instanceof Error ? err.message : String(err);
        console.error("Notion page creation failed:", err);
      }
    } else {
      notionError = `Missing env: API_KEY=${!!NOTION_API_KEY}, DB_ID=${!!NOTION_DB_ID}`;
    }

    // Send email with attachments
    if (resend && attachments.length > 0) {
      try {
        await resend.emails.send({
          from: FROM,
          to: TO,
          subject: `Edit Request: ${parsed.data.summary}`,
          html: buildEmail(parsed.data, true),
          attachments,
        });
      } catch (err) {
        console.error("Email send failed:", err);
      }
    }

    return NextResponse.json({ success: true, notionError });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
