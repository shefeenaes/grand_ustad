"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "gu-field h-[54px] rounded-[14px] border-[1.5px] border-field bg-white px-4 text-base text-ink placeholder:text-faint";
const area = "gu-field rounded-[14px] border-[1.5px] border-field bg-white px-4 py-3.5 text-base text-ink placeholder:text-faint resize-y";
const label = "flex flex-col gap-2 text-sm font-semibold text-muted";

async function send(form: HTMLFormElement, source: string): Promise<boolean> {
  const data = Object.fromEntries(new FormData(form).entries());
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source }),
  });
  return res.ok;
}

function Notice({ status }: { status: Status }) {
  if (status === "sent") return <p role="status" className="m-0 text-sm font-semibold text-[#1F7A5A]">Message sent. We&rsquo;ll get back to you soon.</p>;
  if (status === "error") return <p role="alert" className="m-0 text-sm font-semibold text-chili">Couldn&rsquo;t send right now. Please try WhatsApp or email instead.</p>;
  return null;
}

/** Contact form: Name, Email, Phone, Message (max 100 words). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await send(form, "contact");
      setStatus(ok ? "sent" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid min-w-0 gap-[18px] sm:grid-cols-2" noValidate={false}>
      <label className={label}>
        Name
        <input name="name" type="text" placeholder="Your name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" placeholder="you@example.com" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Phone
        <input name="phone" type="tel" placeholder="+971 5X XXX XXXX" autoComplete="tel" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Message (max 100 words)
        <textarea name="message" rows={5} placeholder="Tell us about your event, date and number of guests…" required maxLength={700} className={area} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="gu-btn h-14 rounded-full bg-saffron px-[30px] text-base font-bold text-ink disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Message"}
        </button>
        <Notice status={status} />
      </div>
    </form>
  );
}
