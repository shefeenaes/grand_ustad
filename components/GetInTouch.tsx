import Reveal from "./Reveal";
import { Chef } from "./Illustrations";
import { GetInTouchForm } from "./ContactForms";

export default function GetInTouch() {
  return (
    <section id="getintouch" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-10 px-5 py-20 md:gap-14 md:px-10 md:py-24">
        <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-saffron">Get in Touch</span>
          <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[52px]">Send us a message</h2>
          <Chef className="gu-float mt-5 h-[200px] w-[200px] sm:h-[240px] sm:w-[240px]" />
        </Reveal>
        <Reveal className="min-w-0 flex-[1.5_1_480px]">
          <GetInTouchForm />
        </Reveal>
      </div>
    </section>
  );
}
