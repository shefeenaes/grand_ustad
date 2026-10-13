import Reveal from "./Reveal";
import { Chef } from "./Illustrations";
import { GetInTouchForm } from "./ContactForms";

export default function GetInTouch() {
  return (
    <section id="getintouch" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-start gap-10 px-5 py-20 md:gap-14 md:px-10 md:py-24">
        <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col items-center gap-4 text-center sm:items-start sm:text-left">
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-saffron">Get in Touch</span>
          <h2 className="m-0 text-[40px] font-extrabold leading-none tracking-[-0.03em] sm:text-[52px]">Send us a message</h2>
          <p className="m-0 max-w-[380px] text-base leading-relaxed text-muted">
            Tell us about your event, camp or facility and our team will come back to you within one working day.
          </p>
          {/* Chef sits in a soft saffron blob so it reads as a focal point on phones */}
          <div className="gu-blob relative mt-6 flex h-[260px] w-[260px] items-center justify-center sm:mt-8 sm:h-[300px] sm:w-[300px]">
            <Chef className="gu-float relative z-10 h-[200px] w-[200px] sm:h-[230px] sm:w-[230px]" />
          </div>
        </Reveal>
        <Reveal className="min-w-0 flex-[1.5_1_480px]">
          <GetInTouchForm />
        </Reveal>
      </div>
    </section>
  );
}
