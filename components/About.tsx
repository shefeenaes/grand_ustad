import Image from "next/image";
import { site } from "@/content/site";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="aboutus" className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-12 px-5 pb-20 pt-24 md:gap-16 md:px-10 md:pt-32">
      <Reveal className="relative min-w-0 flex-[1_1_320px]">
        <div className="flex items-center justify-center rounded-[32px] bg-cream px-8 py-10 shadow-lift sm:px-12 sm:py-14">
          <Image
            src="/images/stickerr.png"
            alt={`${site.name} — Restaurant & Catering Services`}
            width={1417}
            height={1417}
            sizes="(max-width: 640px) 70vw, 360px"
            className="h-auto w-full max-w-[360px] drop-shadow-[0_18px_30px_rgba(11,42,31,0.25)]"
          />
        </div>
        <div className="gu-float-b absolute -right-3 -top-6 rounded-[18px] bg-brand px-[18px] py-3.5 font-display text-[15px] font-bold text-white shadow-card sm:-right-6">
          Two decades in the UAE
        </div>
      </Reveal>
      <Reveal className="flex min-w-0 flex-[1.3_1_480px] flex-col gap-5">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-brand">About us</span>
        <h2 className="m-0 text-[22px] font-semibold leading-[1.35] tracking-tight sm:text-[28px]">{site.about[0]}</h2>
        {site.about.slice(1).map((p) => (
          <p key={p.slice(0, 24)} className="m-0 text-[17px] leading-[1.7] text-muted">
            {p}
          </p>
        ))}
      </Reveal>
    </section>
  );
}
