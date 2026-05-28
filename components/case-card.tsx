import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TextAnimate } from "@/components/text-animate";

interface CaseCardProps {
  label: string;
  title: string;
  description: string;
  href: string;
  children: React.ReactNode;
}

interface CaseMockupLinkProps {
  href: string;
  src: string;
  alt: string;
}

function CaseMockupLink({ href, src, alt }: CaseMockupLinkProps) {
  return (
    <Link
      href={href}
      aria-label={alt}
      className="group relative block h-[195px] w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 transition-colors duration-300 hover:border-white/20 focus-visible:border-white/30 focus-visible:outline-none sm:h-[260px] lg:h-[390px] lg:max-w-[650px]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
        sizes="(min-width: 1024px) 650px, 100vw"
      />
    </Link>
  );
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
      <div className="flex w-full flex-col gap-4 lg:w-[452px]">
        <TextAnimate
          className="font-wordmark text-sm text-white/50"
          as="p"
          animation="blurInUp"
          by="word"
        >
          {label}
        </TextAnimate>
        <TextAnimate
          className="font-wordmark text-xl text-white"
          as="p"
          animation="blurInUp"
          by="word"
          delay={0.05}
        >
          {title}
        </TextAnimate>
        <TextAnimate
          className="font-wordmark text-base text-white/80"
          as="p"
          animation="blurInUp"
          by="word"
          delay={0.1}
        >
          {description}
        </TextAnimate>
        <Link
          href={href}
          className="inline-flex w-fit items-center gap-1 rounded-lg border border-[#696969] px-4 py-2 font-display text-base tracking-[-0.02em] text-white transition-colors hover:border-white/40"
        >
          Ler mais <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {children}
    </article>
  );
}

export function EnergisaMockup() {
  return (
    <CaseMockupLink
      href="/projects/energisa"
      src="/cases/energisa-thumb.webp"
      alt="Energisa - thumbnail do case"
    />
  );
}

export function NinaSegMockup() {
  return (
    <CaseMockupLink
      href="/projects/ninaseg"
      src="/cases/ninaseg-thumb.webp"
      alt="NinaSeg - thumbnail do case"
    />
  );
}
