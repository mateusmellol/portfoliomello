import { TextAnimate } from "@/components/text-animate";

const experiences = [
  { period: "25 - 26", name: "MAC", role: "Designer" },
  { period: "25 -", name: "Uffinance", role: "Diretor de Design" },
  { period: "25 -", name: "TELAS", role: "Diretor de Design" },
];

export function About() {
  return (
    <section
      id="sobre"
      className="border-b border-white/[0.19] pb-16 pt-16"
    >
      <div className="site-shell flex flex-col gap-[22px]">
        <TextAnimate
          as="p"
          className="font-wordmark text-[20px] font-normal tracking-[-0.02em] text-white"
          animation="blurInUp"
          by="word"
        >
          Olá, eu sou o Mateus
        </TextAnimate>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          <div className="flex flex-col gap-6 text-base tracking-[-0.02em] text-white/70 max-w-[880px]">
            <TextAnimate className="font-wordmark" animation="blurInUp" by="word" delay={0.1}>
              Product Designer com base em comunicação visual, combinando sensibilidade estética e pensamento estratégico para criar interfaces que fazem sentido para os usuários e para os stakeholders.
            </TextAnimate>
            <TextAnimate className="font-wordmark" animation="blurInUp" by="word" delay={0.15}>
              Além do cuidado com o design e craft, me importo com a compreensão do problema a fundo através de processos de UX research, me movendo a tomar decisões melhores a cada produto que desenvolvo.
            </TextAnimate>
            <TextAnimate className="font-wordmark" animation="blurInUp" by="word" delay={0.2}>
              Atualmente cursando Estudos de Mídia na UFF, onde construo minha base em pesquisa, comunicação e design.
            </TextAnimate>
          </div>
          <div className="shrink-0 flex flex-col gap-5 font-wordmark text-[14px] text-white mt-[2px]">
            {experiences.map((exp) => (
              <div key={exp.name} className="flex items-center gap-0">
                <span className="w-[80px] text-white/50">{exp.period}</span>
                <span className="w-[120px]">{exp.name}</span>
                <span>{exp.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
