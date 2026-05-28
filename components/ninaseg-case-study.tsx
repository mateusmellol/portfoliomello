import Image from "next/image";
import { VideoMockup } from "@/components/video-mockup";

/* ─── Content ─── */

const METADATA = [
  { label: "Duração", value: "6 semanas" },
  { label: "Escopo", value: "Design e build" },
  { label: "Equipe", value: "Solo" },
];

const TEXT_SECTIONS = [
  {
    title: "Overview",
    body: "A NinaSeg é uma corretora de seguros em Nova Friburgo.\n O projeto foi o redesign completo da landing page, construindo um canal próprio para captacção de clientes. ",
  },
  {
    title: "Problema",
    body: "A NinaSeg dependia quase exclusivamente de indicação para chegar a novos clientes. \n Sem um canal próprio, o crescimento era imprevisível.",
  },
  {
    title: "Solução",
    body: "O site precisava ser um canal funcional, confiável e capaz de converter um visitante\n que ainda não conhece a corretora em um cliente.",
  },
];

const DECISIONS: { label?: string; title: string; body: string; video?: string; image?: string }[] = [
  {
    label: "Decisões do projeto",
    title: "Entrando no mercado independente",
    body: "Construí a página com a visão na facilidade de leitura e compreensão, sem expor informações que vão além do que o cliente espera de primeira.\n \n E isso nos leva à próxima decisão.",
    video: "/videos/Heroservices.mp4",
    image: undefined,
  },
  {
    title: "Falando de seguros da maneira certa",
    body: "O tom escolhido foi humano, explicativo, mantendo a formalidade. Pensando em SEO e GEO.\n \n Cada título foi pensado para responder possísveis dúvidas sobre o que estava sendo ou seria dito. ",
    video: "/videos/Herofocus.mp4",
    image: undefined,
  },
  {
    title: "Como estruturar a página?",
    body: "Através de um teste de usabilidade não-moderado com dois usuários, os cenários revelaram certa consistência de conclusão.\n \n 'Qual seguro que eu posso pedir?' - Participante 1\n \n'Tenho que ler muito para saber' - Participante 2\n \nIsso orientou a ordem das seções, a hierarquia de informação e quais conteúdos precisavam aparecer e também ter mais destaque.",
    video: "/videos/Fullpage.mp4",
    image: undefined,
  },
  {
    title: "Mostrando como a corretora funciona",
    body: "Na versão anterior, o processo estava no FAQ.\n \nAo tornar o processo visível, é possível reduzir o atrito de conversão de clique na CTA principal.",
    video: "/videos/Servicesfocus.mp4",
    image: undefined,
  },
  {
    title: "O caminho para pedir o orçamento",
    body: "O modal de orçamento foi revisado, contando com ajustes de responsividade, transições, estrutura dos campos, copy e feedback em todos os estados, preenchimento, erro e conclusão.",
    video: undefined,
    image: "/cases/modal.png",
  },
];

/* ─── Main component ─── */

export function NinasegCaseStudy() {
  return (
    <main className="bg-[#0c0a09] text-white">
      <div className="mx-auto w-full max-w-[996px] px-4 lg:px-0">

        {/* ── Hero image ── */}
        <div className="w-full">
          <Image
            src="/cases/ninaseg-case.png"
            alt="NinaSeg redesign"
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
            href="https://ninaseg.com.br/"
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
              <p className="font-display text-[16px] leading-snug tracking-[-0.02em] text-white/70 sm:w-[388px]">
                {body.split('\n').map((line, j) => {
                  const trimmed = line.trim();
                  if (trimmed === '') return <span key={j} className="block h-4" />;
                  if (trimmed.startsWith("'")) return <span key={j} className="block text-white">{trimmed}</span>;
                  return <span key={j} className="block">{trimmed}</span>;
                })}
              </p>
            </div>
            {video && (
              <div className="rounded-lg overflow-hidden">
                <VideoMockup videoSrc={video} />
              </div>
            )}
            {!video && image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-lg"
              />
            )}
            {!video && !image && (
              <div className="rounded-lg overflow-hidden">
                <VideoMockup />
              </div>
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
              {"O principal seria documentar mais. Algumas decisões se perderam no caminho e precisei rever meus passos na construção do case.\n\nO que ainda está em aberto é o comportamento real dos usuários, heatmap, scroll e cliques no CTA ainda não foram analisados. Esses dados podem e devem mudar a estrutura."}
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
