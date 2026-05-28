import { TextAnimate } from "@/components/text-animate";

export function About() {
  return (
    <section
      id="sobre"
      className="border-b border-white/[0.19] pb-10 pt-16"
    >
      <div className="site-shell flex flex-col gap-[22px]">
        <TextAnimate
          as="h2"
          className="font-display text-4xl font-bold tracking-[-0.02em] text-white"
          animation="blurInUp"
          by="word"
        >
          Sobre
        </TextAnimate>
        <div className="flex flex-col gap-6 text-xl tracking-[-0.02em] text-white/80">
          <TextAnimate animation="blurInUp" by="word" delay={0.1}>
            Me chamo Mateus Mello e sou apaixonado por design antes mesmo de saber o que significava quando fazia thumbnails para meus vídeos aos 10 anos. Sempre fui curioso, passando anos ao lado do Cinema4D, Sony Vegas e Photoshop.
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="word" delay={0.15}>
            Acredito que isso criou um bom caminho para transformar minha criatividade em algo que não vive apenas na pasta de projetos no meu PC. Me dediquei ao design gráfico há 6 anos através de artes para os artistas que eu admiro e também na criação de identidades visuais.
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="word" delay={0.2}>
            Sentia que poderia estar fazendo mais, principalmente algo que não fosse só para mim, mas para meus amigos e para qualquer pessoa que viesse a ver o que fiz. Encontrei essa oportunidade no Product Design, resolvendo problemas que têm muito mais valor do que qualquer outro que eu pudesse pensar de dentro do meu quarto.
          </TextAnimate>
          <TextAnimate animation="blurInUp" by="word" delay={0.25}>
            Aprendi que nenhuma interface vale mais do que a pesquisa que é feita com aqueles que vão usar o produto no dia a dia. Atualmente, estou aberto a oportunidades em que eu possa trabalhar em produtos digitais.
          </TextAnimate>
        </div>
      </div>
    </section>
  );
}
