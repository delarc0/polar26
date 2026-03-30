import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { z } from "zod";
import { escapeHtml } from "@/lib/sanitize";

const editSchema = z.object({
  pageSection: z.string().min(1).max(50),
  requestType: z.string().min(1).max(50),
  priority: z.string().min(1).max(20),
  summary: z.string().min(1, "Summary is required").max(200),
  description: z.string().min(1, "Description is required").max(2000),
});

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = process.env.NOTION_EDIT_DB_ID;

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = editSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    after(async () => {
      if (!NOTION_API_KEY || !NOTION_DB_ID) {
        console.error("Notion env vars not configured");
        return;
      }
      try {
        await createNotionPage(parsed.data);
      } catch (err) {
        console.error("Notion page creation failed:", err);
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