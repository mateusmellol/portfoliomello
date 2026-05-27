export type CaseVisual = {
  label: string;
  format: "imagem" | "video" | "comparativo";
};

export type CaseDecision = {
  number: string;
  title: string;
  paragraphs: string[];
  quotes?: string[];
  visual: CaseVisual;
};

export type CaseStudy = {
  slug: "energisa" | "ninaseg";
  title: string;
  subtitle: string;
  year: string;
  duration: string;
  projectType: string;
  role: string;
  scope: string;
  team: string;
  thumbnail: string;
  thumbnailAlt: string;
  overview: string[];
  problem: string[];
  solution: string[];
  decisions: CaseDecision[];
  result?: string[];
  reflection: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "energisa",
    title: "Energisa",
    subtitle:
      "Redesign que transforma um site institucional em uma experiência de marca com visão de futuro.",
    year: "2026",
    duration: "2 semanas",
    projectType: "Redesign de site",
    role: "Design Engineer",
    scope: "Design e build",
    team: "Solo",
    thumbnail: "/cases/energisa-thumb.webp",
    thumbnailAlt: "Thumbnail do case Energisa com mockups do redesign.",
    overview: [
      "A Energisa é uma das maiores distribuidoras de energia do Brasil - presente em 97% do território nacional, atendendo mais de 20 milhões de pessoas. O site atual, porém, não comunica essa escala: o ecossistema da empresa (FlexLab, Reenergisa, ESgas, Instituto) fica enterrado em camadas sem hierarquia, e a narrativa de inovação e energia renovável que a marca já vive internamente não aparece na interface.",
      "Redesenhei o site de ponta a ponta - análise UX, design no Figma e build com código - com o objetivo de fazer o canal digital representar quem a Energisa é hoje.",
    ],
    problem: [
      "O site recebe o usuário com ações promocionais temporárias: um carrossel de 4 slides que mistura concurso de prêmios, livro comemorativo e, enterrado no último slide, o FlexLab: o produto mais inovador e estratégico da marca. A hierarquia visual não distingue o momentâneo do estrutural.",
      "A seção mais acessada do site, Resolva seu dia a dia, tinha o design mais fraco: sem identidade visual consistente, separação confusa entre casa e empresa e problemas de acessibilidade. O ecossistema do Grupo aparecia como ícones sem descrição, sem indicação de que eram clicáveis. Dados expressivos como 97% do território nacional e 20 milhões de pessoas atendidas estavam apresentados sem peso visual.",
    ],
    solution: [
      "A direção do redesign partiu de uma reorganização de peso: serviços cotidianos primeiro, porque quem entra no site quer resolver algo, e depois a visão institucional, com a narrativa de energia renovável como fio condutor.",
    ],
    decisions: [
      {
        number: "01",
        title: "Hierarquia antes de pixel",
        paragraphs: [
          "A análise UX revelou um problema estrutural antes de qualquer problema visual: o site tratava tudo com o mesmo peso. Concurso de prêmios, FlexLab, segunda via e história da empresa competiam pelo mesmo espaço sem critério de prioridade.",
          "A reorganização partiu da lógica de uso: o que o usuário precisa resolver vem primeiro, quem a Energisa é vem depois. A navegação foi reduzida de 7 itens para 4, a pesquisa duplicada eliminada, e o suporte, antes invisível, virou CTA visível. A estrutura inteira mudou antes do primeiro pixel ser desenhado.",
        ],
        visual: {
          format: "comparativo",
          label: "Before/after da navegação ou visão geral da estrutura de seções",
        },
      },
      {
        number: "02",
        title: "O protagonista errado",
        paragraphs: [
          "O FlexLab, plataforma de inovação aberta e produto estratégico da Energisa, estava enterrado no quarto slide de um carrossel que abria com concurso de prêmios. O conteúdo temporário era o protagonista; o estrutural, coadjuvante.",
          "O hero foi reestruturado em duas camadas com funções distintas. Na parte superior, o posicionamento da marca: headline, subtítulo e CTAs, sem concorrência visual. Na parte inferior, uma imagem dinâmica ancora a seção com presença e movimento. O card de notícias resolve o problema do carrossel sem repeti-lo: mantém a atualidade acessível num espaço secundário, sem comprometer o que precisa aparecer primeiro.",
        ],
        visual: {
          format: "imagem",
          label: "Hero redesenhado com duas camadas e card de notícias",
        },
      },
      {
        number: "03",
        title: "A seção mais acessada com o design mais fraco",
        paragraphs: [
          "Resolva seu dia a dia é onde o usuário vai quando entra no site: segunda via, falta de energia, negociação de débitos. Era a seção de maior valor funcional e, ao mesmo tempo, a com pior execução: componentes sem identidade, separação confusa entre Casa e Empresa, problemas de acessibilidade e um espaço visual que não condizia com a importância das ações.",
          "As ações de autoatendimento foram reorganizadas com hierarquia e equilíbrio visual para facilitar o acesso rápido. A separação entre perfis de usuário foi clarificada, e os componentes ganharam identidade consistente com o design system do projeto.",
        ],
        visual: {
          format: "comparativo",
          label: "Before/after da seção de serviços",
        },
      },
      {
        number: "04",
        title: "Dados que pesam",
        paragraphs: [
          "97% do território nacional. 939 municípios. Mais de 20 milhões de pessoas. Os números da Energisa são expressivos e estavam apresentados de forma flat, sem tratamento visual que traduzisse essa escala.",
          "As barras animadas que acompanham os dados não são decoração: são a representação visual dos números. À medida que aparecem, criam movimento e ancoragem para os dados de escala, transformando estatística em narrativa. O conteúdo não mudou; o peso visual, sim.",
        ],
        visual: {
          format: "video",
          label: "Seção de impacto com barras animadas",
        },
      },
      {
        number: "05",
        title: "Interatividade como linguagem",
        paragraphs: [
          "A decisão de usar componentes interativos, como globo, background de ruas e animações de texto, não foi técnica. Foi narrativa: a Energisa se posiciona como empresa de energia do futuro, e um site estático não comunica isso.",
          "O globo interativo mostra o alcance geográfico da empresa de uma forma que um mapa estático não consegue. O background de ruas cria profundidade e movimento, ancorando a experiência na infraestrutura que a empresa representa. Cada interação precisou justificar seu peso em performance: interatividade que trava não é linguagem, é ruído.",
        ],
        visual: {
          format: "video",
          label: "Globo interativo ou background de ruas em ação",
        },
      },
    ],
    result: [
      "O resultado é um site navegável publicado, construído com Next.js, Tailwind, Framer Motion e hospedado na Vercel. A interatividade não é demo técnica: é a linguagem visual da marca. O design system está documentado no Figma como entregável paralelo.",
    ],
    reflection: [
      "O que funcionou bem foi a fundação: partir da análise UX antes de qualquer pixel garantiu que cada decisão de design tivesse uma justificativa rastreável. A escolha de fazer o FlexLab protagonista do hero foi a mais clara e a que mais transforma a percepção do site.",
      "O ponto de atenção foi o build: trabalhar com componentes interativos trouxe mais variáveis do que o planejado. A restrição foi proposital: cada interação precisava justificar seu peso em performance. A regra de começar pelo componente mais complexo foi a decisão certa de processo.",
      "O que ficou em aberto: as seções de menor prioridade receberam menos atenção. Num projeto com mais tempo, teriam uma iteração própria.",
    ],
  },
  {
    slug: "ninaseg",
    title: "NinaSeg",
    subtitle:
      "Landing page da empresa com foco em centralizar novos leads e comunicar os serviços oferecidos.",
    year: "2026",
    duration: "4 semanas",
    projectType: "Landing page",
    role: "Product Designer",
    scope: "Design e build",
    team: "Solo",
    thumbnail: "/cases/ninaseg-thumb.webp",
    thumbnailAlt: "Thumbnail do case NinaSeg com interface da landing page.",
    overview: [
      "A NinaSeg é uma corretora de seguros em Nova Friburgo. O projeto foi o redesign completo da landing page, corrigindo falhas do site anterior e construindo um canal próprio capaz de centralizar o primeiro contato com novos clientes.",
    ],
    problem: [
      "A NinaSeg dependia quase exclusivamente de indicação para chegar a novos clientes. Sem um canal próprio, o crescimento era imprevisível.",
    ],
    solution: [
      "O site precisava ser um canal funcional, confiável e capaz de converter um visitante que ainda não conhece a corretora em um cliente.",
    ],
    decisions: [
      {
        number: "01",
        title: "Entrando no mercado independente",
        paragraphs: [
          "Mapeei o mercado a partir de dois ângulos. As grandes seguradoras parceiras têm sites editoriais, densos, construídos para quem já sabe o que quer.",
          "Em Nova Friburgo, onde a Nina atua, não tem praticamente nenhum corretor independente com presença digital relevante.",
          "Com base nisso, construí a página com uma visão mais simples, pensando na facilidade de leitura e compreensão, sem expor informações que iriam além do que o cliente espera nesse primeiro momento.",
        ],
        visual: {
          format: "video",
          label: "Vídeo do site scrollando",
        },
      },
      {
        number: "02",
        title: "Falando de seguros da maneira certa",
        paragraphs: [
          "Seguros é um produto que exige muito esforço por parte de quem contrata. Escrever no tom de uma seguradora, impessoal e orientado ao produto, reforça ainda mais essa resistência.",
          "O tom escolhido foi humano, explicativo, mantendo a formalidade. Cada título foi ajustado para responder antes de colocar mais uma dúvida sobre o que estava sendo dito. O ajuste foi pensado com base em SEO e GEO.",
        ],
        visual: {
          format: "imagem",
          label: "Hero com H1 animado e as três variações do título",
        },
      },
      {
        number: "03",
        title: "Como estruturar a página?",
        paragraphs: [
          "Através de um teste de usabilidade não moderado com dois usuários, os cenários de entender o que a NinaSeg oferece e solicitar um orçamento revelaram consistência nos pontos de dúvida. O site precisava responder algumas perguntas antes de pedir qualquer ação.",
          "Isso orientou a ordem das seções, a hierarquia de informação e quais conteúdos precisavam aparecer com mais destaque.",
        ],
        quotes: [
          "Qual seguro que eu posso pedir? - Participante 1",
          "Tenho que ler muito para saber o que escolher - Participante 2",
        ],
        visual: {
          format: "imagem",
          label: "Scroll longo da página ou visão geral da estrutura de seções",
        },
      },
      {
        number: "04",
        title: "Mostrando dinamicamente como a corretora funciona",
        paragraphs: [
          "Em uma entrevista curta com a cliente, perguntei o que acontece quando um cliente chega pelo formulário.",
          "A resposta dela, descrita naturalmente, pode ser resumida em pequenos passos, se tornando a seção Veja Como Funciona, um scroll-based com carregamento progressivo.",
          "Na versão anterior, essa resposta estava no FAQ. Ao tornar o processo visível, é possível reduzir o atrito de conversão de clique na CTA principal.",
        ],
        visual: {
          format: "imagem",
          label: "Seção HowItWorks com os 4 passos, desktop ou mobile",
        },
      },
      {
        number: "05",
        title: "O caminho para pedir o orçamento",
        paragraphs: [
          "O modal de orçamento foi revisado, contando com ajustes de responsividade, transições, estrutura dos campos, copy e feedback em todos os estados: preenchimento, erro e conclusão.",
          "O mesmo formulário foi replicado no CTA Footer, no final da página, eliminando a necessidade de rolar de volta ao topo, seguindo o UI pattern de diversas landing pages.",
          "Os dados do formulário são enviados diretamente ao Supabase e notificam a corretora em tempo real, eliminando intermediários no primeiro contato.",
        ],
        visual: {
          format: "imagem",
          label: "Modal aberto, estado padrão, estado de conclusão e mobile",
        },
      },
    ],
    reflection: [
      "O principal aprendizado foi o workflow de build. Começar no Figma e migrar para o Figma Make gerou iterações que hoje resolvo muito mais rápido com a minha stack atual de trabalho.",
      "Documentaria mais também. Algumas decisões se perderam no caminho e precisei rever meus passos na construção do case.",
      "Esse foi o primeiro projeto end-to-end que tive o prazer de fazer design e build. O que ainda está em aberto é o comportamento real dos usuários: heatmap, scroll e cliques no CTA ainda não foram analisados. Esses dados podem, e devem, mudar a estrutura do site.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export function getNextCaseStudy(slug: string) {
  const currentIndex = caseStudies.findIndex((caseStudy) => caseStudy.slug === slug);
  if (currentIndex === -1) return undefined;

  return caseStudies[(currentIndex + 1) % caseStudies.length];
}
