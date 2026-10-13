import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ContactUsForm } from "./ContactForms";
import { PinIcon, MailIcon, PhoneIcon, WhatsAppIcon, ArrowIcon } from "./Illustrations";

function Row({ href, icon, title, children, external }: { href: string; icon: React.ReactNode; title: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="group flex items-start gap-3 rounded-2xl px-1 py-3 text-white no-underline transition-colors hover:bg-white/5 sm:gap-4 sm:p-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-saffron text-ink transition-transform group-hover:scale-105 sm:h-11 sm:w-11">{icon}</span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-white/55">{title}</span>
        <span className="text-[15px] leading-snug text-white/90 [overflow-wrap:anywhere] sm:text-[16px]">{children}</span>
      </span>
    </a>
  );
}

export default function ContactUs() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  const waHref = `https://api.whatsapp.com/send?phone=${site.whatsapp}`;
  return (
    <section id="contactus" className="mx-auto max-w-[1320px] px-5 py-20 md:px-10 md:py-24">
      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="relative isolate box-border flex min-w-0 flex-col gap-5 overflow-hidden rounded-[32px] border border-line bg-[linear-gradient(160deg,#E7F0EC_0%,#D3E3DA_100%)] p-7 sm:p-11">
          {/* Decorative rings */}
          <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full border-[28px] border-white/35" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-40 w-40 rounded-full bg-saffron/15" />
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#2F6B55]">Contact</span>
            <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[46px]">{site.contact.title}</h2>
            <p className="m-0 max-w-[460px] text-base leading-relaxed text-muted">{site.contact.text}</p>
          </div>
          <ContactUsForm />
        </Reveal>

        <Reveal className="relative isolate flex min-w-0 flex-col justify-between gap-6 overflow-hidden rounded-[32px] bg-ink p-5 text-white sm:p-8">
          <span aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-saffron/20 blur-3xl" />
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 -z-10 h-64 w-64 rounded-full bg-chili/20 blur-3xl" />
          <div className="flex flex-col gap-2 px-3 pt-2 sm:px-4">
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-saffron">Reach us</span>
            <h3 className="m-0 font-display text-[26px] font-bold leading-tight tracking-tight">We&rsquo;re in Musaffah, Abu Dhabi</h3>
          </div>
          <div className="flex flex-col gap-1">
            <Row href={mapsHref} external icon={<PinIcon />} title="Address">
              {site.address}
            </Row>
            <Row href={`mailto:${site.email}`} icon={<MailIcon />} title="Email">
              {site.email}
            </Row>
            <Row href={`tel:${site.phoneHref}`} icon={<PhoneIcon />} title="Phone">
              {site.phone}
            </Row>
          </div>
          <div className="flex flex-wrap gap-3 px-3 pb-2 sm:px-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              className="gu-btn inline-flex h-12 items-center gap-2 rounded-full bg-saffron px-5 text-[15px] font-bold text-ink no-underline"
            >
              <WhatsAppIcon />
              WhatsApp us
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-[15px] font-bold text-white no-underline transition-colors hover:bg-white/10"
            >
              Open in Maps
              <ArrowIcon className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
