import { CaseCard, EnergisaMockup, NinaSegMockup } from "@/components/case-card";

export function CaseStudies() {
  return (
    <section
      id="projetos"
      className="border-b border-white/[0.19] pb-10 pt-16"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 lg:px-[120px]">
        <div className="flex flex-col gap-16">
          <CaseCard
            label="Energisa | 2026"
            title="Reimaginando a Energisa para o futuro"
            description="Redesign que transforma um site institucional em uma experiência de marca com visão próspera."
            href="/projects/energisa"
          >
            <EnergisaMockup />
          </CaseCard>

          <CaseCard
            label="NinaSeg | 2026"
            title="Contratação de seguros eficiente na NinaSeg"
            description="Landing page da empresa com foco em centralizar novos leads e comunicar os serviços oferecidos."
            href="/projects/ninaseg"
          >
            <NinaSegMockup />
          </CaseCard>
        </div>
      </div>
    </section>
  );
}
