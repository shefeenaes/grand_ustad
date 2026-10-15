"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error" | "too-long";

const MAX_WORDS = 100;

// EmailJS keys are public by design; set them in .env.local (see .env.example).
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

const field =
  "gu-field h-[54px] rounded-[14px] border-[1.5px] border-field bg-white px-4 text-base text-ink placeholder:text-faint";
const area = "gu-field rounded-[14px] border-[1.5px] border-field bg-white px-4 py-3.5 text-base text-ink placeholder:text-faint resize-y";
const label = "flex flex-col gap-2 text-sm font-semibold text-muted";

/** Sends the form through EmailJS. Variable names match docs/emailjs-contact-template.html. */
async function send(data: Record<string, string>) {
  if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
    throw new Error("EmailJS is not configured: set NEXT_PUBLIC_EMAILJS_* in .env.local");
  }
  await emailjs.send(
    EMAILJS.serviceId,
    EMAILJS.templateId,
    {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      message: data.message,
      time: new Date().toLocaleString("en-GB", { timeZone: "Asia/Dubai", dateStyle: "medium", timeStyle: "short" }),
      site_name: site.name,
    },
    { publicKey: EMAILJS.publicKey },
  );
}

function Notice({ status }: { status: Status }) {
  if (status === "sent") return <p role="status" className="m-0 text-sm font-semibold text-brand">Message sent. We&rsquo;ll get back to you soon.</p>;
  if (status === "too-long") return <p role="alert" className="m-0 text-sm font-semibold text-chili">Please keep your message to {MAX_WORDS} words or fewer.</p>;
  if (status === "error") return <p role="alert" className="m-0 text-sm font-semibold text-chili">Couldn&rsquo;t send right now. Please try WhatsApp or email instead.</p>;
  return null;
}

/** Contact form: Name, Email, Phone, Message (max 100 words). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(Array.from(new FormData(form), ([k, v]) => [k, String(v).trim()]));
    // Honeypot: real visitors never see this field, bots fill it in
    if (data.company) {
      setStatus("sent");
      form.reset();
      return;
    }
    if (data.message.split(/\s+/).length > MAX_WORDS) {
      setStatus("too-long");
      return;
    }
    setStatus("sending");
    try {
      await send(data);
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("[contact]", err);
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
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="gu-btn h-14 rounded-full bg-brand px-[30px] text-base font-bold text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Submit Message"}
        </button>
        <Notice status={status} />
      </div>
    </form>
  );
}
