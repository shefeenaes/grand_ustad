import { NextResponse } from "next/server";

/**
 * Receives contact form and newsletter submissions.
 * By default it logs the message on the server. Set CONTACT_WEBHOOK_URL in .env.local
 * to forward submissions (e.g. to an n8n / Zapier / Make webhook that emails you).
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid email is required" }, { status: 400 });
  }
  if (body.source === "contact") {
    if (!String(body.name ?? "").trim() || !String(body.message ?? "").trim()) {
      return NextResponse.json({ ok: false, error: "Name and message are required" }, { status: 400 });
    }
    if (String(body.message).trim().split(/\s+/).length > 100) {
      return NextResponse.json({ ok: false, error: "Message must be 100 words or fewer" }, { status: 400 });
    }
  }

  const payload = { ...body, receivedAt: new Date().toISOString() };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  } else {
    console.log("[contact]", payload);
  }

  return NextResponse.json({ ok: true });
}
