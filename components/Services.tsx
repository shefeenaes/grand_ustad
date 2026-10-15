import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";
import { ServiceIcon, ArrowIcon } from "./Illustrations";

export default function Services() {
  return (
    <>
      <div className="mx-auto flex max-w-[1320px] items-center gap-[18px] px-5 md:px-10" aria-hidden="true">
        <span className="h-px flex-1 bg-line" />
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-card">
          <Image src="/images/stickerr.png" alt="" width={1417} height={1417} sizes="44px" className="h-11 w-11" />
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <section id="services" className="mx-auto flex max-w-[1320px] flex-col gap-11 px-5 pb-24 pt-10 md:px-10 md:pb-32">
        <Reveal className="flex flex-col gap-3">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand">Services</span>
          <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[56px]">What we do</h2>
        </Reveal>

        <div className="grid gap-[22px] sm:grid-cols-2 xl:grid-cols-3">
          {site.services.map((s, i) => (
            <Reveal key={s.slug} as="article" className="gu-card flex flex-col overflow-hidden rounded-[28px] border border-line bg-white">
              <div className="gu-img relative h-60">
                <Image src={s.image} alt={s.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 420px" className="gu-zoom object-cover" />
                <span className="absolute left-4 top-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-white shadow-card" aria-hidden="true">
                  <ServiceIcon kind={s.icon} />
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-grow flex-col gap-3.5 p-7">
                <h3 className="m-0 text-[26px] font-bold tracking-tight">{s.title}</h3>
                <p className="m-0 flex-grow text-[15px] leading-[1.65] text-muted">{s.description}</p>
                <a href="#contactus" className="gu-btn self-start rounded-full bg-brand px-5 py-3 text-sm font-bold text-white no-underline">
                  Book Now
                </a>
              </div>
            </Reveal>
          ))}

          <Reveal className="gu-card box-border flex flex-col justify-between gap-5 rounded-[28px] border border-brand bg-brand p-8 text-white sm:col-span-2 xl:col-span-3">
            <a href="#contactus" className="flex h-full flex-col justify-between gap-5 text-white no-underline sm:flex-row sm:items-center">
              <span className="font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Planning something? Get in touch.</span>
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-brand-deep">
                <ArrowIcon />
              </span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
