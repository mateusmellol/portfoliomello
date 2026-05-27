import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { CaseDecision, CaseStudy, CaseVisual } from "@/lib/case-study-data";

type CaseStudyTemplateProps = {
  caseStudy: CaseStudy;
  nextCaseStudy?: CaseStudy;
};

export function CaseStudyTemplate({
  caseStudy,
  nextCaseStudy,
}: CaseStudyTemplateProps) {
  const metadata = [
    { label: "Ano", value: caseStudy.year },
    { label: "Duração", value: caseStudy.duration },
    { label: "Tipo", value: caseStudy.projectType },
    { label: "Escopo", value: caseStudy.scope },
    { label: "Papel", value: caseStudy.role },
    { label: "Equipe", value: caseStudy.team },
  ];

  return (
    <main className="bg-[#0c0a09] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 md:px-12 lg:px-[120px]">
        <Link
          href="/#projetos"
          className="mb-6 mt-8 inline-flex items-center gap-2 font-display text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Projetos
        </Link>

        <h1 className="sr-only">{caseStudy.title}</h1>

        <section className="relative aspect-[5/3] w-full overflow-hidden bg-white md:aspect-[1200/720]">
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.thumbnailAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1024px) 1200px, calc(100vw - 48px)"
          />
        </section>

        <section className="flex flex-col gap-8 border-b border-white/10 py-8 lg:flex-row lg:items-end lg:justify-between">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3 lg:flex lg:flex-wrap lg:gap-x-16 xl:gap-x-24">
            {metadata.map((item) => (
              <div key={item.label} className="min-w-[112px] space-y-2">
                <dt className="font-display text-sm tracking-[-0.02em] text-white/55">
                  {item.label}
                </dt>
                <dd className="font-display text-base tracking-[-0.02em] text-white md:text-lg">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/35 px-4 py-2 font-display text-base tracking-[-0.02em] text-white/45">
            Visitar site
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </div>
        </section>

        <CaseTextSection title="Overview" paragraphs={caseStudy.overview} />
        <CaseTextSection title="Problema" paragraphs={caseStudy.problem} />
        <CaseTextSection title="Solução" paragraphs={caseStudy.solution} />

        <section className="border-t border-white/10">
          {caseStudy.decisions.map((decision) => (
            <DecisionSection key={decision.number} decision={decision} />
          ))}
        </section>

        {caseStudy.result ? (
          <CaseTextSection title="Resultado" paragraphs={caseStudy.result} />
        ) : null}

        <CaseTextSection title="Reflexão" paragraphs={caseStudy.reflection} />

        {nextCaseStudy ? (
          <section className="border-t border-white/10 pt-12">
            <Link
              href={`/projects/${nextCaseStudy.slug}`}
              className="group flex flex-col gap-6 overflow-hidden border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <div className="space-y-2">
                <p className="font-display text-sm tracking-[-0.02em] text-white/50">
                  Próximo case
                </p>
                <p className="font-display text-3xl font-bold tracking-[-0.02em] text-white">
                  {nextCaseStudy.title}
                </p>
                <p className="max-w-[680px] text-base leading-relaxed tracking-[-0.02em] text-white/65">
                  {nextCaseStudy.subtitle}
                </p>
              </div>
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-white/25 transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </span>
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function CaseTextSection({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <section className="grid gap-8 border-b border-white/10 py-14 md:py-16 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-[72px]">
      <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[32px]">
        {title}
      </h2>
      <div className="max-w-[920px] space-y-5 text-[17px] leading-relaxed tracking-[-0.02em] text-white/80 md:text-xl">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

function DecisionSection({ decision }: { decision: CaseDecision }) {
  return (
    <article className="grid gap-8 border-b border-white/10 py-14 md:py-16 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-[72px]">
      <div className="space-y-3">
        <p className="font-display text-sm tracking-[0.12em] text-white/40">
          DECISÃO {decision.number}
        </p>
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-white md:text-[32px]">
          {decision.title}
        </h2>
      </div>

      <div className="space-y-8">
        <div className="max-w-[920px] space-y-5 text-[17px] leading-relaxed tracking-[-0.02em] text-white/80 md:text-xl">
          {decision.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {decision.quotes ? (
          <div className="grid gap-3 md:grid-cols-2">
            {decision.quotes.map((quote) => (
              <blockquote
                key={quote}
                className="border-l border-white/25 bg-white/[0.03] px-5 py-4 text-base leading-relaxed text-white/70 md:text-lg"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        ) : null}

        <VisualPlaceholder visual={decision.visual} />
      </div>
    </article>
  );
}

function VisualPlaceholder({ visual }: { visual: CaseVisual }) {
  return (
    <figure className="group relative aspect-[16/9] overflow-hidden border border-white/10 bg-white/[0.035]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0)_42%),repeating-linear-gradient(90deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_80px)]"
      />
      <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-8">
        <span className="w-fit rounded-full border border-white/15 px-3 py-1 font-display text-xs uppercase tracking-[0.14em] text-white/45">
          {visual.format}
        </span>
        <figcaption className="max-w-[720px] font-display text-xl font-medium leading-tight tracking-[-0.02em] text-white md:text-2xl">
          {visual.label}
        </figcaption>
      </div>
    </figure>
  );
}
