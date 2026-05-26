import Image from "next/image";
import { TextAnimate } from "@/components/text-animate";

interface CaseCardProps {
  label: string;
  title: string;
  description: string;
  href: string;
  children: React.ReactNode;
}

export function CaseCard({
  label,
  title,
  description,
  href,
  children,
}: CaseCardProps) {
  return (
    <article className="relative flex flex-col items-center justify-between gap-8 overflow-hidden lg:h-[317px] lg:flex-row">
      {/* Text */}
      <div className="flex w-full flex-col gap-4 lg:w-[452px]">
        <TextAnimate className="font-body text-sm text-white/50" as="p" animation="blurInUp" by="word">
          {label}
        </TextAnimate>
        <TextAnimate className="font-body text-xl text-white" as="p" animation="blurInUp" by="word" delay={0.05}>
          {title}
        </TextAnimate>
        <TextAnimate className="font-body text-base text-white/80" as="p" animation="blurInUp" by="word" delay={0.1}>
          {description}
        </TextAnimate>
        <a
          href={href}
          className="inline-flex w-fit items-center gap-1 rounded-lg border border-[#696969] px-4 py-2 font-display text-base tracking-[-0.02em] text-white transition-colors hover:border-white/40"
        >
          Ler mais <span>↗</span>
        </a>
      </div>

      {/* Mockup */}
      {children}
    </article>
  );
}

/* ── Energisa: 3 laptops sobrepostos com gradient verde ── */

export function EnergisaMockup() {
  return (
    <div
      className="relative h-[260px] w-full overflow-hidden rounded-lg border border-white/10 sm:h-[317px] lg:max-w-[595px]"
      style={{
        backgroundColor: "#0c0a09",
        backgroundImage:
          "radial-gradient(ellipse at 30% 40%, rgba(163,181,34,0.11) 0%, transparent 70%)",
        isolation: "isolate",
        contain: "paint",
      }}
    >
      {/* Back-left laptop */}
      <div className="absolute left-0 top-[22%] h-[56.4%] w-[52%] overflow-hidden rounded-[4px]">
        <Image
          src="/cases/laptop-frame.png"
          alt=""
          fill
          className="object-cover"
          sizes="310px"
        />
        <div className="absolute left-[13%] top-[7.7%] h-[81.6%] w-[74.2%] overflow-hidden">
          <Image
            src="/cases/energisa-screen-2.png"
            alt="Energisa — tela institucional"
            fill
            className="object-cover"
            sizes="230px"
          />
        </div>
      </div>

      {/* Center laptop (front, larger) */}
      <div className="absolute left-[19.1%] top-[19%] z-10 h-[62.3%] w-[57.5%] overflow-hidden rounded-[4px]">
        <Image
          src="/cases/laptop-frame.png"
          alt=""
          fill
          className="object-cover"
          sizes="342px"
        />
        <div className="absolute left-[13%] top-[8.8%] h-[79.9%] w-[74.1%] overflow-hidden">
          <Image
            src="/cases/energisa-screen-3.png"
            alt="Energisa — hero principal do redesign"
            fill
            className="object-cover"
            sizes="254px"
          />
        </div>
      </div>

      {/* Back-right laptop */}
      <div className="absolute left-[47.9%] top-[21.9%] h-[56.4%] w-[52%] overflow-hidden rounded-[4px]">
        <Image
          src="/cases/laptop-frame.png"
          alt=""
          fill
          className="object-cover"
          sizes="310px"
        />
        <div className="absolute left-[12.8%] top-[8%] h-[81.3%] w-[74.6%] overflow-hidden">
          <Image
            src="/cases/energisa-screen-1.png"
            alt="Energisa — seção sobre a empresa"
            fill
            className="object-cover"
            sizes="231px"
          />
        </div>
      </div>
    </div>
  );
}

/* ── NinaSeg: 1 laptop grande com gradient branco ── */

export function NinaSegMockup() {
  return (
    <div
      className="relative h-[260px] w-full overflow-hidden rounded-lg border border-white/10 sm:h-[317px] lg:max-w-[595px]"
      style={{
        backgroundImage:
          "linear-gradient(179deg, rgb(255,255,255) 39%, rgb(204,204,204) 99%)",
        isolation: "isolate",
        contain: "paint",
      }}
    >
      {/* Laptop frame */}
      <div className="absolute left-[2%] top-[5%] h-[95%] w-[96%] overflow-hidden rounded-lg" style={{ position: "absolute" }}>
        <Image
          src="/cases/laptop-frame.png"
          alt=""
          fill
          className="object-contain"
          sizes="631px"
        />
      </div>

      {/* Screenshot */}
      <div className="absolute left-[14%] top-[14%] h-[76%] w-[72%] overflow-hidden" style={{ position: "absolute" }}>
        <Image
          src="/cases/ninaseg-screen.png"
          alt="NinaSeg — landing page completa"
          fill
          className="object-cover object-top"
          sizes="466px"
        />
      </div>
    </div>
  );
}
