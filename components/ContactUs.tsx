import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ContactUsForm } from "./ContactForms";
import { PinIcon, MailIcon, PhoneIcon } from "./Illustrations";

function Card({ href, icon, title, children, external }: { href: string; icon: React.ReactNode; title: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="gu-card flex items-start gap-[18px] rounded-3xl border border-line bg-white p-[26px] text-ink no-underline"
    >
      <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-2xl bg-saffron text-ink">{icon}</span>
      <span className="flex flex-col gap-1">
        <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-faint">{title}</span>
        <span className="text-[17px] leading-normal break-words">{children}</span>
      </span>
    </a>
  );
}

export default function ContactUs() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
  return (
    <section id="contactus" className="mx-auto flex max-w-[1320px] flex-wrap gap-8 px-5 py-20 md:px-10 md:py-24">
      <Reveal className="box-border flex min-w-0 flex-[1.2_1_420px] flex-col gap-[22px] rounded-[32px] border border-line bg-[linear-gradient(160deg,#E4EEEA,#D5E4DD)] p-7 sm:p-11">
        <h2 className="m-0 text-[40px] font-extrabold tracking-[-0.03em]">Contact Us</h2>
        <ContactUsForm />
      </Reveal>
      <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col gap-[18px]">
        <Card href={mapsHref} external icon={<PinIcon />} title="Address">
          {site.address}
        </Card>
        <Card href={`mailto:${site.email}`} icon={<MailIcon />} title="Email">
          {site.email}
        </Card>
        <Card href={`tel:${site.phoneHref}`} icon={<PhoneIcon />} title="Phone">
          {site.phone}
        </Card>
      </Reveal>
    </section>
  );
}
