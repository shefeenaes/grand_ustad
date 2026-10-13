"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { WhatsAppIcon, MailIcon } from "./Illustrations";

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

/** "Get in Touch" form: Name, Email, Phone, Message (max 100 words). */
export function GetInTouchForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await send(form, "get-in-touch");
      setStatus(ok ? "sent" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid min-w-0 flex-[1.5_1_480px] gap-[18px] sm:grid-cols-2" noValidate={false}>
      <label className={label}>
        Name
        <input name="name" type="text" placeholder="Name" required autoComplete="name" className={field} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" placeholder="Email" required autoComplete="email" className={field} />
      </label>
      <label className={label}>
        Phone
        <input name="phone" type="tel" placeholder="Phone" autoComplete="tel" className={field} />
      </label>
      <label className={`${label} sm:col-span-2`}>
        Message (max 100 words)
        <textarea name="message" rows={5} placeholder="Message (max 100 words)" required maxLength={700} className={area} />
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

/** "Contact Us" form: Full Name, Email, Message → WhatsApp or Email Now. */
export function ContactUsForm() {
  const [values, setValues] = useState({ fullName: "", email: "", message: "" });
  const text = `Hello Grand Ustad,%0A%0AName: ${encodeURIComponent(values.fullName)}%0AEmail: ${encodeURIComponent(values.email)}%0A%0A${encodeURIComponent(values.message)}`;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3.5">
      <label className={label}>
        Full Name
        <input name="fullName" type="text" placeholder="Full Name" autoComplete="name" className={field} value={values.fullName} onChange={(e) => setValues({ ...values, fullName: e.target.value })} />
      </label>
      <label className={label}>
        Email
        <input name="email" type="email" placeholder="Email" autoComplete="email" className={field} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
      </label>
      <label className={label}>
        Message
        <textarea name="message" rows={4} placeholder="Message" className={area} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} />
      </label>
      <div className="flex flex-wrap gap-3 pt-1.5">
        <a
          href={`https://api.whatsapp.com/send?phone=${site.whatsapp}&text=${text}`}
          target="_blank"
          rel="noopener"
          className="gu-btn inline-flex h-[54px] items-center gap-2.5 rounded-full bg-saffron px-[26px] text-[15px] font-bold text-ink no-underline"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent("Enquiry from " + (values.fullName || "website"))}&body=${text}`}
          className="gu-btn inline-flex h-[54px] items-center gap-2.5 rounded-full border-[1.5px] border-field bg-white px-[26px] text-[15px] font-bold text-ink no-underline"
        >
          <MailIcon />
          Email Now
        </a>
      </div>
    </form>
  );
}

/** Newsletter: "Join our family". */
export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await send(form, "newsletter");
      setStatus(ok ? "sent" : "error");
      if (ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-wrap items-end gap-2.5 pt-1.5">
      <label className="flex flex-[1_1_260px] flex-col gap-2 text-[13px] text-faint">
        Email address
        <input name="email" type="email" required placeholder="Enter your email address" autoComplete="email" className="gu-field h-[54px] rounded-full border-[1.5px] border-field bg-white px-5 text-base text-ink placeholder:text-faint" />
      </label>
      <button
        type="submit"
        aria-label="Subscribe"
        disabled={status === "sending"}
        className="gu-btn flex h-[54px] w-[54px] items-center justify-center rounded-full bg-saffron text-ink disabled:opacity-60"
      >
        <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
        </svg>
      </button>
      <div className="basis-full">{status === "sent" ? <p role="status" className="m-0 text-sm font-semibold text-[#1F7A5A]">You&rsquo;re on the list.</p> : <Notice status={status} />}</div>
    </form>
  );
}
