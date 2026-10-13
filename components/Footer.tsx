import { site } from "@/content/site";
import Reveal from "./Reveal";
import { NewsletterForm } from "./ContactForms";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-[#ECEDE9]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-12 px-5 pb-8 pt-16 md:px-10 md:pt-[72px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex max-w-[520px] flex-col gap-3.5">
            <h2 className="m-0 text-[36px] font-extrabold tracking-[-0.03em]">{site.newsletter.title}</h2>
            <p className="m-0 text-base leading-relaxed text-muted">{site.newsletter.text}</p>
            <NewsletterForm />
          </div>
          <address className="flex flex-col gap-3 text-[15px] not-italic text-muted">
            <a href={`mailto:${site.email}`} className="text-muted no-underline">{site.email}</a>
            <a href={`tel:${site.phoneHref}`} className="text-muted no-underline">{site.phone}</a>
            <span>{site.address}</span>
          </address>
        </Reveal>
        <div className="flex flex-wrap justify-between gap-3 border-t border-line pt-6 text-sm text-faint">
          <span>Copyright © {year} {site.name}</span>
          <nav aria-label="Footer" className="flex gap-5">
            {site.nav.slice(0, 4).map((l) => (
              <a key={l.href} href={l.href} className="text-faint no-underline">{l.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
