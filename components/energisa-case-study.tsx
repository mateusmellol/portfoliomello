import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* ─── Figma asset URLs (valid ~7 days) ─── */
const FRAME =
  "https://www.figma.com/api/mcp/asset/8a8a0db5-6666-4c93-be4f-db915ec27834";
const SHOT_175 =
  "https://www.figma.com/api/mcp/asset/43d83128-1676-4ed8-ae77-f8de078b8c00";
const SHOT_173 =
  "https://www.figma.com/api/mcp/asset/0a366063-8064-44bb-8529-cc97c4b78b7f";
const SHOT_174 =
  "https://www.figma.com/api/mcp/asset/3b19db22-c80d-459d-a4e2-7fec634c5cc8";
const THUMB =
  "https://www.figma.com/api/mcp/asset/cb260769-6514-4b78-886f-aae64ef4cc35";

/* ─── Content ─── */
const METADATA = [
  { label: "Duração", value: "3 Semanas" },
  { label: "Escopo", value: "Design e Build" },
  { label: "Equipe", value: "Solo" },
];

const TEXT_COLS = [
  {
    title: "Overview",
    body: "A Energisa é uma das maiores distribuidoras de energia do Brasil.\n\nO site atual, porém, não comunica essa escala.",
  },
  {
    title: "Problema",
    body: "A página atual apresenta diversos erros de padrões de design na arquitetura da informação.\n\nGerando assim possíveis erros ao encontrar os serviços e as características da empresa.",
  },
  {
    title: "Solução",
    body: "A direção do redesign partiu da mudança na hierarquia das seções.\n\nAlém disso, transformei a flexibilidade energética como a narrativa do conteúdo.",
  },
];

const SECTIONS = [
  {
    title: "Priorização das seções centradas no usuário",
    body: "A análise UX revelou o problema estrutural, o site tratava tudo com o mesmo peso. \u200B\n\nA separação entre as necessidades dos usuários foi ajustada, e os componentes ganharam identidade consistente com o design system do projeto.",
  },
  {
    title: "Energia limpa sendo\na protagonista",
    body: "FlexLab é uma plataforma de inovação aberta, sendo o produto mais estratégico da Energisa nos últimos anos.\n\nA Hero foi refeita pensando em manter ainda a possibilidade de atualizações, porém dando prioridade à narrativa do momento da empresa.",
  },
  {
    title: "Refletindo o impacto da Energisa",
    body: "Os números da Energisa são expressivos, porém estavam apresentados de forma flat e mais abaixo na arquitetura atual.\n\nO globo interativo na seção de trajetória mostra o alcance geográfico da empresa de forma dinâmica, atraindo mais olhares para a história da empresa.",
  },
];

/* ─── Component ─── */
export function EnergisaCaseStudy() {
  return (
    <main className="bg-[#0c0a09] text-white">

      {/* ── Hero — white box with overlapping laptop mockups ── */}
      <div className="site-shell">
        {/*
          Figma source: 1200 × 720 px container.
          All children positioned absolutely using % of container.
          Layer order (z): left frame → right frame → center frame (top).
        */}
        <div className="relative aspect-[5/3] w-full overflow-hidden bg-white">

          {/* LEFT laptop frame */}
          <div
            className="absolute"
            style={{ left: "2.77%", top: "24.83%", width: "47.77%", height: "45.52%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FRAME} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
          </div>
          {/* LEFT screenshot */}
          <div
            className="absolute overflow-hidden"
            style={{ left: "9.09%", top: "28.76%", width: "35.18%", height: "36.88%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SHOT_175}
              alt=""
              className="absolute h-full max-w-none pointer-events-none"
              style={{ left: "-17.71%", width: "134.63%" }}
            />
          </div>

          {/* RIGHT laptop frame */}
          <div
            className="absolute"
            style={{ left: "48%", top: "24.46%", width: "49.36%", height: "47.04%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FRAME} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
          </div>
          {/* RIGHT screenshot 173 */}
          <div
            className="absolute overflow-hidden"
            style={{ left: "54.53%", top: "28.52%", width: "36.34%", height: "37.27%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SHOT_173}
              alt=""
              className="absolute h-full max-w-none pointer-events-none"
              style={{ left: "-16.31%", width: "131.68%" }}
            />
          </div>
          {/* RIGHT screenshot 174 (layered on top of 173) */}
          <div
            className="absolute overflow-hidden"
            style={{ left: "54.53%", top: "28.52%", width: "36.37%", height: "37.63%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SHOT_174}
              alt=""
              className="absolute h-full max-w-none pointer-events-none"
              style={{ left: "-15.68%", width: "133.65%" }}
            />
          </div>

          {/* CENTER laptop frame (top layer, z-10) */}
          <div
            className="absolute z-10"
            style={{ left: "19.85%", top: "21.02%", width: "60.80%", height: "57.94%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={FRAME} alt="" className="absolute inset-0 size-full object-cover pointer-events-none" />
          </div>
          {/* CENTER screenshot (z-10) */}
          <div
            className="absolute z-10 overflow-hidden"
            style={{ left: "27.92%", top: "25.97%", width: "44.75%", height: "45.97%" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SHOT_173}
              alt="Energisa redesign"
              className="absolute h-full max-w-none pointer-events-none"
              style={{ left: "-16.31%", width: "131.68%" }}
            />
          </div>

        </div>
      </div>

      {/* ── Metadata bar ── */}
      <div className="site-shell">
        <div className="flex flex-col gap-6 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-16 gap-y-6">
            {METADATA.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-2">
                <span className="font-display text-[20px] leading-tight tracking-[-0.02em] text-white/70">
                  {label}
                </span>
                <span className="font-display text-[20px] leading-tight tracking-[-0.02em] text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="https://energisa.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white px-4 py-2 font-display text-base tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-[#0c0a09]"
          >
            Visitar site
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ── Three text columns: Overview / Problema / Solução ── */}
      <div className="site-shell">
        <div className="flex flex-col gap-10 border-b border-white/10 py-8 lg:flex-row lg:gap-10">
          {TEXT_COLS.map(({ title, body }) => (
            <div key={title} className="flex flex-col gap-[17px] lg:flex-1">
              <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
                {title}
              </h2>
              <p className="font-display text-[18px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Decision sections ── */}
      {SECTIONS.map(({ title, body }, i) => (
        <div key={i} className="site-shell">
          <div className="flex flex-col gap-2 py-16">
            {/* Title + body row */}
            <div className="flex flex-col gap-8 py-8 lg:flex-row lg:gap-16">
              <h2
                className="shrink-0 font-display text-[20px] font-bold leading-snug tracking-[-0.02em] text-white whitespace-pre-line lg:w-[281px]"
              >
                {title}
              </h2>
              <p className="font-display text-[20px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line">
                {body}
              </p>
            </div>

            {/* Full-width image */}
            <div className="relative aspect-[5/3] w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={THUMB}
                alt={`Energisa redesign — ${title}`}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      {/* ── Reflexão ── */}
      <div className="site-shell pb-24">
        <div className="flex flex-col gap-8 py-16 lg:flex-row lg:gap-16">
          <div className="flex shrink-0 flex-col gap-2 lg:w-[281px]">
            <h2 className="font-display text-[32px] font-bold leading-tight tracking-[-0.04em] text-white">
              Reflexão
            </h2>
            <p className="font-display text-[20px] leading-snug tracking-[-0.02em] text-white">
              O que eu aprendi?
            </p>
          </div>
          <p className="font-display text-[20px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line">
            {`Em certo momento, tive que priorizar os recursos que o site poderia ter visando a performance geral. \u200B\n\nTeria feito algumas decisões diferentes, principalmente sobre a hero; entre manter a essência do site oficial e as minhas ideias perdi preciosas horas que poderiam ter sido investidas em outros refinamentos.`}
          </p>
        </div>
      </div>

    </main>
  );
}
