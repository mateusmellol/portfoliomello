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
    <article className="relative flex flex-col items-center justify-between gap-8 overflow-hidden lg:h-[390px] lg:flex-row">
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

/* ── Energisa: thumb ── */

export function EnergisaMockup() {
  return (
    <div className="relative h-[195px] w-full overflow-hidden rounded-lg border border-white/10 sm:h-[260px] lg:h-[390px] lg:max-w-[650px]">
      <Image
        src="/cases/energisa-thumb.webp"
        alt="Energisa — thumbnail do case"
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 650px, 100vw"
      />
    </div>
  );
}

/* ── NinaSeg: thumb ── */

export function NinaSegMockup() {
  return (
    <div className="relative h-[195px] w-full overflow-hidden rounded-lg border border-white/10 sm:h-[260px] lg:h-[390px] lg:max-w-[650px]">
      <Image
        src="/cases/ninaseg-thumb.webp"
        alt="NinaSeg — thumbnail do case"
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 650px, 100vw"
      />
    </div>
  );
}
