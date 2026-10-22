"use client";

import { useEffect, useState, type FormEvent, type FocusEvent, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/content/site";
import type { Country, CountryCode } from "./phone";

type Status = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<FieldName, string>>;
type PhoneRules = typeof import("./phone");

const FIELDS: FieldName[] = ["name", "email", "phone", "message"];
const MIN_WORDS = 3;
const MAX_WORDS = 100;
/** The UAE is preselected; these cover the moment before the phone rules finish loading. */
const DEFAULT_COUNTRY: Country = { code: "AE", name: "United Arab Emirates", dial: "971" };
const DEFAULT_EXAMPLE = "50 123 4567";

// EmailJS keys are public by design; set them in .env.local (see .env.example).
const EMAILJS = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

const field =
  "gu-field h-[54px] rounded-[14px] border-[1.5px] border-field bg-white px-4 text-base text-ink placeholder:text-faint";
const area = "gu-field rounded-[14px] border-[1.5px] border-field bg-white px-4 py-3.5 text-base text-ink placeholder:text-faint resize-y";
const label = "text-sm font-semibold text-muted";

/**
 * Drops anything a phone number can't contain as it's typed or pasted, keeping the caret where it was.
 * Arabic and Persian digits (٠١٢ / ۰۱۲) from Arabic keyboards become 0-9 instead of being dropped.
 */
function keepPhoneCharacters(input: HTMLInputElement | HTMLTextAreaElement) {
  const clean = (text: string) =>
    text
      .replace(/[٠-٩۰-۹]/g, (d) => String(d.charCodeAt(0) & 0xf))
      .replace(/[^\d\s()+-]/g, "")
      .replace(/(?!^)\+/g, "");
  const { value, selectionStart } = input;
  const cleaned = clean(value);
  if (cleaned === value) return;
  const caret = clean(value.slice(0, selectionStart ?? value.length)).length;
  input.value = cleaned;
  input.setSelectionRange(caret, caret);
}

const countWords = (text: string) => (text.trim() ? text.trim().split(/\s+/).length : 0);
const isField = (name: string): name is FieldName => (FIELDS as string[]).includes(name);

/** Returns the error for one field, or "" when the value is fine. Phone checks need the loaded rules. */
function validate(name: FieldName, value: string, country: CountryCode, rules: PhoneRules | null): string {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name should be at least 2 characters.";
      if (v.length > 60) return "Name should be 60 characters or fewer.";
      // Digits and symbols only, so Arabic and other scripts still pass
      if (/[0-9@#$%^&*_=+!?<>{}[\]|\\/~`";:]/.test(v)) return "Name can only contain letters, spaces, hyphens and apostrophes.";
      return "";
    case "email":
      if (!v) return "Please enter your email address.";
      if (v.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address, like you@example.com.";
      return "";
    case "phone":
      return v && rules ? rules.validatePhone(v, country) : "";
    case "message": {
      const words = countWords(v);
      if (!v) return "Please tell us a little about your event or order.";
      if (words < MIN_WORDS) return `Please add a little more detail (at least ${MIN_WORDS} words).`;
      if (words > MAX_WORDS) return `Please keep your message to ${MAX_WORDS} words or fewer.`;
      return "";
    }
  }
}

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
  if (status === "error") return <p role="alert" className="m-0 text-sm font-semibold text-chili">Couldn&rsquo;t send right now. Please try WhatsApp or email instead.</p>;
  return null;
}

/** Label, control and its error message. The error sits outside the label so it isn't read as part of the field's name. */
function Field({ name, title, error, aside, className = "", children }: { name: FieldName; title: string; error?: string; aside?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={`contact-${name}`} className={label}>
          {title}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={`contact-${name}-error`} className="m-0 text-[13px] font-semibold text-chili">
          {error}
        </p>
      )}
    </div>
  );
}

const countryOption = (c: Country) => (
  <option key={c.code} value={c.code}>
    {c.name} (+{c.dial})
  </option>
);

/** Contact form: Name, Email, Phone (optional, checked against the chosen country), Message (3 to 100 words). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [words, setWords] = useState(0);
  const [country, setCountry] = useState<CountryCode>(DEFAULT_COUNTRY.code);
  const [rules, setRules] = useState<PhoneRules | null>(null);
  const [countries, setCountries] = useState<Country[]>([DEFAULT_COUNTRY]);

  // Fetch the phone rules after the page renders; they're ready long before anyone scrolls to the form
  useEffect(() => {
    import("./phone").then((mod) => {
      setRules(mod);
      setCountries(mod.buildCountries());
    });
  }, []);

  const dial = rules ? rules.callingCode(country) : DEFAULT_COUNTRY.dial;
  const check = (name: FieldName, value: string, code = country) => validate(name, value, code, rules);

  // Props shared by every control: id, error wiring, and re-checking a field once it has shown an error
  const control = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    onInput: (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (name === "phone") keepPhoneCharacters(e.currentTarget);
      const { value } = e.currentTarget;
      if (name === "message") setWords(countWords(value));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: check(name, value) }));
    },
  });

  function onCountryChange(code: CountryCode, form: HTMLFormElement | null) {
    setCountry(code);
    // Re-check a number already typed against the newly chosen country
    const phone = form?.querySelector<HTMLInputElement>("#contact-phone")?.value ?? "";
    if (phone.trim()) setErrors((prev) => ({ ...prev, phone: check("phone", phone, code) }));
  }

  // Check a field when the visitor leaves it, but don't nag about empty fields they've only tabbed through
  function onBlur(e: FocusEvent<HTMLFormElement>) {
    const target: EventTarget = e.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;
    const { name, value } = target;
    if (!isField(name) || (!value.trim() && !errors[name])) return;
    const error = check(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    // Tidy a valid number into its local format; a "+" number also switches to its own country
    const formatted = name === "phone" && value.trim() && !error ? rules?.formatPhone(value, country) : null;
    if (formatted) {
      setCountry(formatted.country);
      target.value = formatted.local;
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = Object.fromEntries(Array.from(new FormData(form), ([k, v]) => [k, String(v).trim()]));
    // Honeypot: real visitors never see this field, bots fill it in
    if (data.company) {
      setStatus("sent");
      form.reset();
      return;
    }
    const phoneRules = rules ?? (await import("./phone"));
    const found: Errors = {};
    for (const name of FIELDS) {
      const error = validate(name, data[name] ?? "", country, phoneRules);
      if (error) found[name] = error;
    }
    setErrors(found);
    const firstInvalid = FIELDS.find((name) => found[name]);
    if (firstInvalid) {
      setStatus("idle");
      form.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
      return;
    }
    // Send the full international number so the team can call it from anywhere, e.g. "+971 50 123 4567"
    if (data.phone) data.phone = phoneRules.formatPhone(data.phone, country)?.international ?? data.phone;
    setStatus("sending");
    try {
      await send(data);
      setStatus("sent");
      setWords(0);
      setCountry(DEFAULT_COUNTRY.code);
      form.reset();
    } catch (err) {
      console.error("[contact]", err);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} onBlur={onBlur} className="grid min-w-0 gap-[18px] sm:grid-cols-2" noValidate>
      <Field name="name" title="Name" error={errors.name}>
        <input {...control("name")} type="text" placeholder="Your name" required maxLength={60} autoComplete="name" className={field} />
      </Field>
      <Field name="email" title="Email" error={errors.email}>
        <input {...control("email")} type="email" inputMode="email" placeholder="you@example.com" required maxLength={254} autoComplete="email" className={field} />
      </Field>
      <Field name="phone" title="Phone (optional)" error={errors.phone}>
        <div className="flex min-w-0 gap-2">
          {/* Native select for keyboard, screen reader and mobile pickers, drawn as a compact "AE +971" chip */}
          <div className="relative shrink-0">
            <select
              name="country"
              aria-label="Country code"
              value={country}
              onChange={(e) => onCountryChange(e.target.value as CountryCode, e.target.form)}
              className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            >
              {rules ? (
                <>
                  <optgroup label="Popular">{countries.slice(0, rules.POPULAR.length).map(countryOption)}</optgroup>
                  <optgroup label="All countries">{countries.slice(rules.POPULAR.length).map(countryOption)}</optgroup>
                </>
              ) : (
                countries.map(countryOption)
              )}
            </select>
            <span
              aria-hidden="true"
              className={`${field} flex items-center gap-1.5 pr-3 font-semibold peer-focus-visible:border-brand peer-focus-visible:shadow-[0_0_0_4px_rgba(50,74,72,0.2)]`}
            >
              <span className="text-[13px] text-faint">{country}</span>
              <span className="tabular-nums">+{dial}</span>
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-faint" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 4.5 6 7.5 9 4.5" />
              </svg>
            </span>
          </div>
          <input
            {...control("phone")}
            type="tel"
            inputMode="tel"
            placeholder={rules ? rules.exampleNumber(country) : DEFAULT_EXAMPLE}
            maxLength={20}
            autoComplete="tel"
            className={`${field} min-w-0 flex-1`}
          />
        </div>
      </Field>
      <Field
        name="message"
        title="Message"
        error={errors.message}
        className="sm:col-span-2"
        aside={<span className={`text-[13px] font-semibold tabular-nums ${words > MAX_WORDS ? "text-chili" : "text-faint"}`}>{words}/{MAX_WORDS} words</span>}
      >
        <textarea {...control("message")} rows={5} placeholder="Tell us about your event, date and number of guests…" required maxLength={1000} className={area} />
      </Field>
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
