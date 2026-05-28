import Image from "next/image";
import { VideoMockup } from "@/components/video-mockup";

/* ─── Content ─── */

const METADATA = [
  { label: "Duração", value: "3 Semanas" },
  { label: "Escopo", value: "Design e Build" },
  { label: "Equipe", value: "Solo" },
];

const TEXT_SECTIONS = [
  {
    title: "Overview",
    body: "A Energisa é uma das maiores distribuidoras de energia do Brasil.\nO site atual, porém, não comunica essa escala.",
  },
  {
    title: "Problema",
    body: "A página atual apresenta diversos erros de padrões de design na arquitetura da informação.\nGerando assim possíveis erros ao encontrar os serviços e as características da empresa.",
  },
  {
    title: "Solução",
    body: "A direção do redesign partiu da mudança na hierarquia das seções.\nAlém disso, transformei a flexibilidade energética como a narrativa do conteúdo.",
  },
];

const DECISIONS = [
  {
    label: "Decisões do projeto",
    title: "Priorização das seções\ncentradas no usuário",
    body: "A análise UX revelou o problema estrutural, o site tratava tudo com o mesmo peso.\n\nA separação entre as necessidades dos usuários foi ajustada, e os componentes ganharam identidade consistente com o design system do projeto.",
    video: "/videos/Services.mp4",
  },
  {
    title: "Energia limpa sendo\na protagonista",
    body: "FlexLab é uma plataforma de inovação aberta, sendo o produto mais estratégico da Energisa nos últimos anos.\n\nA Hero foi refeita pensando em manter ainda a possibilidade de atualizações, porém dando prioridade à narrativa do momento da empresa.",
    video: undefined,
    image: "/cases/heroenergisa.png",
  },
  {
    title: "Grupo Energisa",
    body: "Além disso, a seção de Ecossistema apresenta os principais atores do Grupo Energisa, focados também no progresso para a flexibilidade energética.",
    video: "/videos/Ecossistema3.mp4",
  },
  {
    title: "Refletindo o impacto\nda empresa",
    body: "Os números da Energisa são expressivos, porém estavam apresentados de forma flat e mais abaixo na arquitetura atual.",
    video: "/videos/Impacto.mp4",
  },
  {
    title: "Apresentando\na história",
    body: "O globo interativo na seção de trajetória mostra o alcance geográfico da empresa de forma dinâmica, atraindo mais olhares para a história da empresa.",
    video: "/videos/Globo.mp4",
  },
];

/* ─── Main component ─── */

export function EnergisaCaseStudy() {
  return (
    <main className="bg-[#0c0a09] text-white">
      {/*
        Grid: 12 colunas, margem 120px, gutter 24px.
        Outer: margem do grid (px-120, igual ao header).
        Inner: pula 2 colunas (ml-204px) → conteúdo começa na coluna 3.
        Resultado: 120 + 204 = 324px da borda esquerda do viewport em 1440px.
      */}
      <div className="mx-auto w-full max-w-[996px] px-4 lg:px-0">

          {/* ── Hero image ── */}
          <div className="w-full">
            <Image
              src="/cases/energisa-case.png"
              alt="Energisa redesign"
              width={996}
              height={600}
              priority
              className="w-full h-auto"
            />
          </div>

          {/* ── Metadata bar ── */}
          <div className="flex flex-col gap-6 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-x-[104px] gap-y-6">
              {METADATA.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="font-display text-[18px] leading-tight tracking-[-0.02em] text-white/70">
                    {label}
                  </span>
                  <span className="font-display text-[18px] leading-tight tracking-[-0.02em] text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="https://mateusmellol.github.io/energisa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1 rounded-lg border border-white px-4 py-2 font-display text-[18px] tracking-[-0.02em] text-white transition-colors hover:bg-white hover:text-[#0c0a09]"
            >
              Visitar site ↗
            </a>
          </div>

          {/* ── Text sections: Overview / Problema / Solução ── */}
          <div className="flex flex-col gap-10 border-b border-white/10 py-8">
            {TEXT_SECTIONS.map(({ title, body }) => (
              <div key={title} className="flex flex-col gap-4">
                <h2 className="font-display text-[18px] font-bold tracking-[-0.02em] text-white">
                  {title}
                </h2>
                <p className="font-display text-[18px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line">
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* ── Decision sections ── */}
          {DECISIONS.map(({ label, title, body, video, image }, i) => (
            <div key={i} className="flex flex-col gap-2 border-b border-white/10 py-8">
              {/* Two-column header: label+title left, body right */}
              <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex shrink-0 flex-col gap-2 sm:w-[216px]">
                  <span className="font-display text-[13px] tracking-[-0.02em] text-white/50">
                    {label}
                  </span>
                  <h2 className="font-display text-[20px] font-bold leading-snug tracking-[-0.04em] text-white whitespace-pre-line">
                    {title}
                  </h2>
                </div>
                <p className="font-display text-[16px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line sm:w-[388px]">
                  {body}
                </p>
              </div>
              {video && <VideoMockup videoSrc={video} cropBottom={title === "Refletindo o impacto\nda empresa" ? 5 : 0} />}
              {!video && image && (
                <Image
                  src={image}
                  alt={title}
                  width={996}
                  height={600}
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          ))}

          {/* ── O que aprendi ── */}
          <div className="flex flex-col gap-2 py-8 pb-24">
            <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex shrink-0 flex-col gap-2 sm:w-[178px]">
                <h2 className="font-display text-[20px] font-bold leading-snug tracking-[-0.04em] text-white">
                  O que aprendi com esse projeto?
                </h2>
              </div>
              <p className="font-display text-[16px] leading-snug tracking-[-0.02em] text-white/70 whitespace-pre-line sm:w-[388px]">
                {"Esse projeto me ensinou muito sobre o processo de craft com parceria do Claude Code e Codex.\n\nO que levo dele são diversas lições sobre como lidar com documentação sobre o processo de pesquisa que foi se perdendo ao longo dos dias."}
              </p>
            </div>
          </div>


      </div>
    </main>
  );
}
