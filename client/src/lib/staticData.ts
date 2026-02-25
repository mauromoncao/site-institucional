/**
 * Client-side static data fallback for Mauro Monção Advogados
 * Used when the tRPC backend is not available (Hostinger static hosting)
 */

import superjson from "superjson";

export const STATIC_PRACTICE_AREAS = [
  {
    id: 101, slug: "tributario", name: "Direito Tributário",
    shortDescription: "Defesa estratégica em autuações e processos fiscais, com foco em segurança jurídica e proteção patrimonial.",
    fullDescription: "Atuação técnica e estratégica na prevenção e solução de litígios fiscais, com foco em segurança jurídica, redução de riscos e eficiência financeira. Abrange consultoria, planejamento, compliance, defesa em autuações, processos administrativos, dívida ativa/execuções fiscais e medidas para proteger caixa e patrimônio diante de constrições.",
    icon: "landmark", isPublished: true, sortOrder: 1, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 102, slug: "planejamento-patrimonial", name: "Planejamento Patrimonial, Societário e Sucessório",
    shortDescription: "Estruturação de holdings e governança para organizar patrimônio, sucessão e continuidade empresarial com previsibilidade.",
    fullDescription: "Estruturação de soluções para organização do patrimônio e continuidade familiar/empresarial, com governança, proteção patrimonial e racionalidade tributária. Inclui holdings, reorganizações societárias, acordos de sócios, sucessão planejada e instrumentos jurídicos voltados à previsibilidade e estabilidade.",
    icon: "users", isPublished: true, sortOrder: 2, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 103, slug: "advocacia-publica", name: "Advocacia Pública Municipal",
    shortDescription: "Atuação consultiva e contenciosa para municípios, com conformidade, gestão de riscos e respaldo técnico nas decisões.",
    fullDescription: "Assessoria e atuação contenciosa voltadas à Administração Pública municipal, com foco em conformidade, gestão de riscos e tomada de decisões com respaldo jurídico. Apoio em processos administrativos, orientação normativa, controle de legalidade e defesa institucional em demandas judiciais.",
    icon: "building2", isPublished: true, sortOrder: 3, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 104, slug: "imobiliario", name: "Direito Imobiliário",
    shortDescription: "Segurança jurídica em contratos, regularizações e negociações imobiliárias, com análise documental e redução de riscos.",
    fullDescription: "Apoio jurídico em negociações e regularizações imobiliárias com foco em segurança documental e redução de riscos. Atuação em compra e venda, contratos, due diligence, registros, posse/propriedade, locações e solução de conflitos relacionados ao imóvel.",
    icon: "landmark", isPublished: true, sortOrder: 4, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 105, slug: "familia-sucessoes", name: "Família e Sucessões",
    shortDescription: "Soluções técnicas e sensíveis para inventários, partilhas e planejamento sucessório, preservando direitos e estabilidade.",
    fullDescription: "Atuação sensível e técnica na estruturação e resolução de questões familiares e sucessórias, com foco em proteção de direitos, patrimônio e estabilidade. Abrange inventários, partilhas, testamentos, pactos, planejamento sucessório e demandas correlatas, sempre buscando soluções juridicamente seguras.",
    icon: "shield", isPublished: true, sortOrder: 5, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 106, slug: "ambiental", name: "Direito Ambiental",
    shortDescription: "Assessoria preventiva e defesa em procedimentos e autuações ambientais, com foco em conformidade e mitigação de riscos.",
    fullDescription: "Assessoria preventiva e contenciosa para pessoas físicas e empresas, orientada à conformidade e à mitigação de riscos regulatórios. Abrange licenciamento, autos e sanções administrativas, termos de ajustamento, responsabilidade ambiental e defesa em procedimentos fiscalizatórios.",
    icon: "bookopen", isPublished: true, sortOrder: 6, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 107, slug: "consumidor", name: "Direito do Consumidor",
    shortDescription: "Prevenção e resolução de conflitos de consumo com estratégia processual, revisão de contratos e proteção reputacional.",
    fullDescription: "Atuação na prevenção e resolução de conflitos de consumo, com enfoque em estratégia processual e segurança jurídica. Inclui análise de risco, defesa e propositura de demandas, revisão de práticas e contratos, além de suporte em situações com impacto reputacional e financeiro.",
    icon: "scale", isPublished: true, sortOrder: 7, landingPageId: null, externalLandingUrl: null,
  },
  {
    id: 108, slug: "previdenciario", name: "Direito Previdenciário",
    shortDescription: "Atuação administrativa e judicial em benefícios e revisões previdenciárias, com análise criteriosa e condução técnica.",
    fullDescription: "Orientação e atuação em demandas previdenciárias com foco em análise documental, estratégia e segurança do pedido. Abrange requerimentos administrativos e judiciais, revisões, benefícios e questões correlatas, com condução técnica e linguagem clara ao cliente.",
    icon: "gavel", isPublished: true, sortOrder: 8, landingPageId: null, externalLandingUrl: null,
  },
];

export const STATIC_LANDING_PAGES = [
  {
    id: 201, slug: "tributario",
    title: "Direito Tributário",
    subtitle: "Blindagem fiscal estratégica: reduza tributos, recupere créditos e proteja sua empresa com segurança jurídica.",
    content: `<h2>Por que o planejamento tributário é essencial para sua empresa?</h2><p>No Brasil, a carga tributária representa entre 34% e 42% do faturamento das empresas. Sem planejamento, você paga mais do que deve. Com estratégia jurídica adequada, é possível reduzir significativamente esse impacto — dentro da lei.</p><h2>Nossas Soluções em Direito Tributário</h2><ul><li><strong>Revisão de Enquadramento Tributário</strong> — Análise completa do regime mais vantajoso para o seu negócio.</li><li><strong>Recuperação de Créditos Tributários</strong> — Identificamos tributos pagos a maior nos últimos 5 anos.</li><li><strong>Defesa em Autuações Fiscais</strong> — Representação técnica perante Receita Federal e SEFAZ.</li><li><strong>Planejamento Tributário Preventivo</strong> — Estruturação de operações para minimizar o impacto fiscal.</li><li><strong>Incentivos Fiscais</strong> — Mapeamento e utilização de benefícios fiscais disponíveis para o seu setor.</li><li><strong>Reestruturação Societária Tributária</strong> — Reorganização com foco na eficiência fiscal e proteção patrimonial.</li></ul><h2>Resultados para Nossos Clientes</h2><ul><li>Redução média de 20% a 35% na carga tributária após planejamento</li><li>Recuperação de créditos tributários pagos indevidamente</li><li>Defesa bem-sucedida em autuações fiscais</li><li>Compliance tributário com redução de riscos de penalidades</li></ul>`,
    ctaText: "Solicite uma Análise Tributária Gratuita", isPublished: true,
  },
  {
    id: 202, slug: "planejamento-sucessorio",
    title: "Planejamento Sucessório",
    subtitle: "Proteja seu patrimônio e garanta que seu legado chegue às mãos certas, com eficiência e segurança jurídica.",
    content: `<h2>Por que planejar a sucessão é uma decisão inteligente?</h2><p>O inventário judicial pode consumir de 8% a 20% do patrimônio em impostos e custas, além de levar anos para ser concluído. O planejamento sucessório antecipa essas questões, reduz custos e evita conflitos familiares.</p><h2>Nossas Soluções</h2><ul><li><strong>Holding Familiar</strong> — Criação de estrutura societária para gestão e proteção do patrimônio familiar.</li><li><strong>Testamento e Codicilo</strong> — Elaboração de testamento estratégico respeitando a legítima.</li><li><strong>Doação com Usufruto</strong> — Transferência planejada de bens em vida, com preservação do usufruto.</li><li><strong>Acordo de Sócios e Sucessão Empresarial</strong> — Regras claras para a continuidade dos negócios.</li><li><strong>Previdência Privada como Ferramenta Sucessória</strong> — Uso estratégico de PGBL/VGBL para transferência sem inventário.</li></ul><h2>Benefícios do Planejamento</h2><ul><li>Redução de até 50% no custo do inventário</li><li>Evitar brigas familiares e bloqueio judicial de bens</li><li>Proteção do patrimônio contra credores</li><li>Continuidade dos negócios da família</li></ul>`,
    ctaText: "Proteja Seu Patrimônio Agora", isPublished: true,
  },
  {
    id: 203, slug: "irpf",
    title: "IRPF – Imposto de Renda Pessoa Física",
    subtitle: "Maximize sua restituição, elimine riscos de malha fina e regularize sua situação na Receita Federal.",
    content: `<h2>A declaração pode guardar surpresas — positivas e negativas</h2><p>A maioria dos contribuintes deixa de recuperar deduções legais por desconhecimento. Erros na declaração levam à malha fina, multas e juros. Nossa equipe garante que você aproveite todas as deduções.</p><h2>Nossas Soluções</h2><ul><li><strong>Declaração Completa do IRPF</strong> — Elaboração profissional com todas as deduções legais.</li><li><strong>Revisão de Declarações Anteriores</strong> — Verificamos os últimos 5 anos e corrigimos erros.</li><li><strong>Defesa na Malha Fina</strong> — Representação perante a Receita Federal em processos de fiscalização.</li><li><strong>Planejamento do IRPF</strong> — Estratégias legais para reduzir o imposto a pagar.</li><li><strong>Regularização de CPF</strong> — Resolução de pendências e regularização cadastral.</li></ul><h2>Deduções que Muitos Ignoram</h2><ul><li>Gastos com instrução (escola, faculdade, cursos)</li><li>Despesas médicas e odontológicas sem limite</li><li>Contribuição ao INSS de empregados domésticos</li><li>Contribuições a planos de previdência privada (PGBL)</li></ul>`,
    ctaText: "Declare com Segurança e Maximize sua Restituição", isPublished: true,
  },
  {
    id: 204, slug: "bancario",
    title: "Direito Bancário",
    subtitle: "Defenda seus direitos contra cobranças abusivas, taxas ilegais e contratos bancários desvantajosos.",
    content: `<h2>Bancos lucram com a desinformação — nós protegemos seus direitos</h2><p>Contratos bancários com cláusulas abusivas, juros acima do permitido, tarifas cobradas indevidamente. Você não precisa aceitar. Com nossa assessoria, recupera o que pagou a mais.</p><h2>Nossas Soluções</h2><ul><li><strong>Revisão de Contratos de Empréstimo</strong> — Análise técnica para identificar juros abusivos e cláusulas ilegais.</li><li><strong>Revisão de Cartão de Crédito</strong> — Questionamento de taxas e juros superiores ao permitido pelo Banco Central.</li><li><strong>Negativação Indevida</strong> — Ação para retirada do SPC/Serasa com indenização por danos morais.</li><li><strong>Renegociação de Dívidas</strong> — Negociação estratégica para obter descontos e parcelamentos viáveis.</li><li><strong>Defesa em Execuções Bancárias</strong> — Representação técnica em ações de cobrança.</li></ul>`,
    ctaText: "Analise Seu Contrato Bancário Gratuitamente", isPublished: true,
  },
  {
    id: 205, slug: "previdenciario",
    title: "Direito Previdenciário",
    subtitle: "Conquiste o benefício que você merece: aposentadoria, pensão por morte, auxílios e revisão de benefícios negados.",
    content: `<h2>O INSS nega benefícios — mas você tem o direito de recorrer</h2><p>Milhares de brasileiros têm benefícios negados ou concedidos com valores inferiores ao correto. Com representação jurídica especializada, é possível reverter decisões e revisar benefícios já concedidos.</p><h2>Nossas Soluções</h2><ul><li><strong>Aposentadoria por Tempo de Contribuição</strong> — Análise do histórico previdenciário e cálculo da melhor data de requerimento.</li><li><strong>Aposentadoria por Invalidez</strong> — Representação em perícias médicas e recursos administrativos.</li><li><strong>Revisão de Benefícios</strong> — Recálculo com possibilidade de receber diferenças retroativas.</li><li><strong>Pensão por Morte</strong> — Representação para dependentes com pensão negada ou reduzida.</li><li><strong>BPC/LOAS</strong> — Análise de elegibilidade e processo para obter o benefício assistencial.</li></ul>`,
    ctaText: "Analise sua Situação Previdenciária Gratuitamente", isPublished: true,
  },
  {
    id: 206, slug: "irpf-autismo",
    title: "IRPF e Autismo – Benefícios Fiscais para Famílias TEA",
    subtitle: "Pessoas com TEA têm direito à isenção de Imposto de Renda. Conheça e reivindique seus direitos.",
    content: `<h2>A lei protege famílias com autistas — mas poucos conhecem seus direitos</h2><p>A Lei 12.764/2012 e a legislação tributária garantem isenção total do IRPF para portadores de TEA. Além disso, famílias podem recuperar valores pagos indevidamente nos últimos 5 anos.</p><h2>Benefícios Fiscais para Portadores de TEA</h2><ul><li><strong>Isenção Total do IRPF</strong> — Sobre rendimentos de aposentadoria, pensão e proventos.</li><li><strong>Dependente sem limite de idade</strong> — Filho com autismo pode ser declarado independentemente da idade.</li><li><strong>Despesas médicas ilimitadas</strong> — Psicólogos, fonoaudiólogos, terapeutas são totalmente dedutíveis.</li><li><strong>Recuperação Retroativa</strong> — Valores pagos indevidamente nos últimos 5 anos podem ser recuperados.</li></ul><h2>Como Obter a Isenção</h2><p>Obtenha o laudo médico adequado com CID-10 (F84.x), protocole na Receita Federal e, se necessário, entre com ação judicial para reconhecimento retroativo do direito.</p>`,
    ctaText: "Verifique Seu Direito à Isenção Gratuitamente", isPublished: true,
  },
  {
    id: 207, slug: "societario",
    title: "Direito Societário",
    subtitle: "Estruture, proteja e otimize sua empresa com estratégia jurídica para crescimento sustentável e segurança patrimonial.",
    content: `<h2>A estrutura jurídica da sua empresa determina seu sucesso e proteção</h2><p>Desde a escolha do tipo societário até operações de M&A, cada decisão tem impacto tributário, patrimonial e na governança corporativa. Nossa equipe orienta cada etapa com expertise e visão estratégica.</p><h2>Nossas Soluções</h2><ul><li><strong>Constituição de Empresas</strong> — Análise do melhor tipo societário e elaboração do contrato social estratégico.</li><li><strong>Acordo de Sócios</strong> — Acordos que previnem conflitos e regulam a saída de sócios.</li><li><strong>Reestruturação Societária</strong> — Fusão, cisão, incorporação com planejamento tributário integrado.</li><li><strong>Proteção Patrimonial</strong> — Holding familiar e blindagem contra riscos empresariais.</li><li><strong>Compra e Venda (M&A)</strong> — Due diligence e documentação para aquisições empresariais.</li></ul>`,
    ctaText: "Estruture sua Empresa com Segurança Jurídica", isPublished: true,
  },
  {
    id: 208, slug: "trabalhista",
    title: "Direito Trabalhista",
    subtitle: "Proteção jurídica completa nas relações de trabalho: defesa de empregados e empregadores.",
    content: `<h2>As relações de trabalho exigem conhecimento especializado</h2><p>Seja como empregado com direitos violados ou como empresa que precisa de conformidade trabalhista, nossa equipe oferece consultoria preventiva e representação contenciosa de alta qualidade.</p><h2>Nossas Soluções</h2><ul><li><strong>Defesa de Empregados</strong> — Reclamações trabalhistas para cobrar verbas rescisórias, horas extras e danos morais.</li><li><strong>Consultoria para Empresas</strong> — Adequação dos processos para minimizar riscos de passivo trabalhista.</li><li><strong>Acordos Trabalhistas</strong> — Negociação de acordos com segurança jurídica e redução de custos.</li><li><strong>Assédio Moral e Discriminação</strong> — Ação para reconhecimento e indenização por práticas abusivas.</li></ul>`,
    ctaText: "Consulte Seu Caso Trabalhista Gratuitamente", isPublished: true,
  },
  {
    id: 209, slug: "contratos",
    title: "Elaboração e Revisão de Contratos",
    subtitle: "Contratos sólidos que protegem seus interesses: elaboração, revisão e negociação com visão estratégica.",
    content: `<h2>Um bom contrato previne 90% dos litígios</h2><p>Muitos problemas jurídicos têm origem em contratos mal elaborados. Nossa equipe elabora e revisa contratos com precisão técnica e linguagem acessível, garantindo que seus interesses estejam protegidos.</p><h2>Tipos de Contratos</h2><ul><li><strong>Contratos Empresariais</strong> — Parceria, prestação de serviços, fornecimento e distribuição.</li><li><strong>Contratos Imobiliários</strong> — Compra e venda, locação, comodato e promessa de compra.</li><li><strong>Contratos de Trabalho Especiais</strong> — NDA, não-concorrência e contratos para executivos.</li><li><strong>Contratos Societários</strong> — Contrato social, estatuto e acordo de sócios.</li><li><strong>Termos Digitais (LGPD)</strong> — Termos de uso e política de privacidade para plataformas digitais.</li></ul>`,
    ctaText: "Solicite Elaboração ou Revisão do Seu Contrato", isPublished: true,
  },
];

export const STATIC_BLOG_POSTS = [
  // ── Artigos resgatados do MANUS ──────────────────────────────────
  {
    id: 306, slug: "reforma-tributaria-2025",
    title: "Reforma Tributária 2025: O Que Muda Para Empresas e Cidadãos",
    excerpt: "Entenda as principais mudanças trazidas pela reforma tributária e como elas impactam o planejamento fiscal de empresas e pessoas físicas.",
    content: `<h2>O que é a Reforma Tributária de 2025?</h2><p>A reforma tributária aprovada representa a maior mudança no sistema fiscal brasileiro em décadas. A unificação de tributos em um IVA Dual (CBS federal e IBS subnacional) altera profundamente a forma como empresas e cidadãos se relacionam com o Fisco.</p><h2>Principais Mudanças para Empresas</h2><ul><li><strong>Extinção do PIS/Cofins, IPI, ICMS e ISS</strong> — Substituídos pelo CBS (federal) e IBS (estados/municípios), com alíquota única por setor.</li><li><strong>Imposto Seletivo</strong> — Incide sobre bens e serviços considerados prejudiciais à saúde e ao meio ambiente.</li><li><strong>Não-cumulatividade plena</strong> — Créditos sobre todas as etapas da cadeia produtiva.</li><li><strong>Regime de transição de 7 anos</strong> — Empresas terão tempo para adaptar sistemas e processos.</li></ul><h2>Impactos para Pessoas Físicas</h2><p>O "cashback" tributário vai devolver parte dos tributos pagos por famílias de baixa renda. Para a classe média, as mudanças são mais neutras no curto prazo, mas o planejamento fiscal individual ganha ainda mais importância.</p><h2>O Que Fazer Agora</h2><p>Empresas devem revisar seus modelos de precificação, contratos de longo prazo e estrutura societária. O planejamento tributário preventivo nunca foi tão estratégico.</p>`,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "tributario",
    tags: "reforma tributária,IVA,CBS,IBS,2025,planejamento tributário",
    isPublished: true, publishedAt: new Date("2025-02-05"),
  },
  {
    id: 307, slug: "planejamento-sucessorio-patrimonio",
    title: "Planejamento Sucessório: Proteja Seu Patrimônio Familiar",
    excerpt: "Saiba como o planejamento sucessório pode evitar conflitos familiares e garantir a transmissão eficiente do patrimônio.",
    content: `<h2>Por que o planejamento sucessório é urgente?</h2><p>O inventário judicial pode consumir de 8% a 20% do patrimônio familiar em impostos e custas processuais, além de levar anos para ser concluído. Sem planejamento, bens ficam bloqueados, negócios param e famílias se desgastam.</p><h2>Principais Instrumentos de Planejamento</h2><h3>1. Holding Familiar</h3><p>A constituição de uma holding patrimonial permite centralizar os bens da família em uma pessoa jurídica, facilitando a gestão, reduzindo o ITCMD e garantindo a continuidade dos negócios sem necessidade de inventário.</p><h3>2. Doação com Usufruto</h3><p>Transferir bens em vida, com reserva do direito de uso pelo doador, reduz o valor sujeito ao ITCMD e simplifica o inventário futuro.</p><h3>3. Testamento Estratégico</h3><p>O testamento bem elaborado respeita a legítima dos herdeiros necessários, mas organiza a distribuição do patrimônio disponível conforme a vontade do testador.</p><h2>Quanto Custa não Planejar?</h2><p>Um patrimônio de R$ 3 milhões pode gerar entre R$ 240.000 e R$ 600.000 em custos de inventário. Com planejamento adequado, esse valor pode ser reduzido em até 60%.</p>`,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "sucessorio",
    tags: "planejamento sucessório,holding familiar,inventário,herança,ITCMD",
    isPublished: true, publishedAt: new Date("2025-01-28"),
  },
  {
    id: 308, slug: "itcmd-novas-regras",
    title: "ITCMD: Novas Regras e Impactos no Inventário",
    excerpt: "As recentes alterações no ITCMD podem afetar diretamente o custo do inventário. Entenda as mudanças e como se preparar.",
    content: `<h2>O que é o ITCMD e por que ele importa?</h2><p>O Imposto sobre Transmissão Causa Mortis e Doação (ITCMD) é cobrado pelos estados sobre heranças e doações. Com a Reforma Tributária, sua cobrança foi alterada significativamente.</p><h2>Principais Mudanças</h2><ul><li><strong>Progressividade obrigatória</strong> — A EC 132/2023 determina que o ITCMD seja progressivo, com alíquotas crescentes conforme o valor do patrimônio transmitido.</li><li><strong>Incidência sobre fundos fechados</strong> — Cotas de fundos de investimento exclusivos agora são tributadas, eliminando uma importante estratégia de planejamento.</li><li><strong>Alíquotas crescentes</strong> — Estados como PI e CE estão atualizando suas leis para alíquotas que podem chegar a 8% sobre os maiores patrimônios.</li></ul><h2>Estratégias para Reduzir o Impacto</h2><p>Doações realizadas antes das mudanças estaduais entrarem em vigor podem ser tributadas à alíquota atual, gerando economia significativa. Consulte um advogado para analisar a melhor janela de oportunidade.</p>`,
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "tributario",
    tags: "ITCMD,inventário,herança,reforma tributária,doação",
    isPublished: true, publishedAt: new Date("2025-01-20"),
  },
  {
    id: 309, slug: "holding-familiar-vantagens",
    title: "Holding Familiar: Vantagens e Cuidados Essenciais",
    excerpt: "A holding familiar é uma ferramenta poderosa para proteção patrimonial. Conheça os benefícios e os cuidados necessários.",
    content: `<h2>O que é uma Holding Familiar?</h2><p>Uma holding familiar é uma pessoa jurídica criada para ser titular das participações societárias ou dos bens da família, permitindo gestão centralizada, proteção patrimonial e planejamento tributário e sucessório.</p><h2>Principais Vantagens</h2><ul><li><strong>Proteção patrimonial</strong> — Bens pessoais dos sócios ficam protegidos de dívidas e execuções.</li><li><strong>Redução do ITCMD</strong> — A transferência de cotas pode ser feita com desconto de até 30% na base de cálculo.</li><li><strong>Distribuição de lucros isenta</strong> — Lucros e dividendos distribuídos pela holding são isentos de IR para os sócios.</li><li><strong>Sucessão sem inventário</strong> — A transmissão das cotas é feita conforme o contrato social, sem necessidade de inventário judicial.</li><li><strong>Eficiência tributária</strong> — Receitas de aluguéis e investimentos podem ser tributadas de forma mais favorável na pessoa jurídica.</li></ul><h2>Cuidados Importantes</h2><p>A holding não é para todos os casos. É preciso analisar o patrimônio, o perfil familiar e o custo de constituição e manutenção. Além disso, a estrutura precisa ter substância econômica real para não ser desconsiderada pelo Fisco.</p>`,
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "sucessorio",
    tags: "holding familiar,planejamento patrimonial,ITCMD,proteção patrimonial",
    isPublished: true, publishedAt: new Date("2025-01-15"),
  },
  {
    id: 310, slug: "direito-imobiliario-cuidados",
    title: "Direito Imobiliário: Cuidados na Compra e Venda de Imóveis",
    excerpt: "Conheça os principais cuidados jurídicos que devem ser observados em transações imobiliárias para evitar problemas futuros.",
    content: `<h2>A compra de um imóvel exige due diligence rigorosa</h2><p>A aquisição de um imóvel é, para a maioria das famílias, o maior investimento da vida. Sem análise jurídica adequada, riscos ocultos podem transformar o sonho em problema.</p><h2>Certidões Essenciais</h2><ul><li><strong>Matrícula atualizada do imóvel</strong> — Verifica a cadeia dominial, ônus reais e restrições.</li><li><strong>Certidões dos vendedores</strong> — Trabalhistas, fiscais, cíveis e de protesto.</li><li><strong>Certidão de ônus reais</strong> — Hipotecas, penhoras e alienações fiduciárias.</li><li><strong>Habite-se e regularidade perante a Prefeitura</strong> — Para imóveis urbanos.</li></ul><h2>Cláusulas Contratuais Críticas</h2><p>O contrato de compra e venda deve prever claramente: prazo de entrega, penalidades por descumprimento, forma de financiamento, responsabilidade pelos tributos incidentes e condições resolutivas.</p><h2>ITBI e Custos da Transação</h2><p>Além do ITBI (2% a 3% do valor do imóvel), é preciso considerar custas cartoriais, honorários advocatícios e eventuais custos de regularização. O planejamento financeiro da compra deve incluir todos esses itens.</p>`,
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "imobiliario",
    tags: "direito imobiliário,compra e venda,due diligence,ITBI,contrato",
    isPublished: true, publishedAt: new Date("2025-01-10"),
  },
  {
    id: 311, slug: "advocacia-publica-municipal",
    title: "Advocacia Pública Municipal: O Papel do Advogado no Município",
    excerpt: "Entenda a importância da assessoria jurídica municipal e como ela contribui para a gestão pública eficiente.",
    content: `<h2>O gestor municipal e os riscos jurídicos</h2><p>A gestão municipal envolve decisões diárias com profundo impacto jurídico. Contratos, licitações, servidores, convênios federais, responsabilidade fiscal — cada ato do gestor pode gerar consequências que vão além do mandato.</p><h2>O Papel da Advocacia Pública Municipal</h2><ul><li><strong>Consultoria preventiva</strong> — Análise jurídica antes das decisões de maior impacto.</li><li><strong>Conformidade na licitação</strong> — Orientação nos procedimentos licitatórios conforme a Nova Lei de Licitações (Lei 14.133/21).</li><li><strong>Defesa em TCE e TCU</strong> — Representação em processos de controle externo.</li><li><strong>Responsabilidade do gestor</strong> — Defesa em ações de improbidade e TCE perante o Ministério Público.</li><li><strong>Convênios federais</strong> — Análise de prestações de contas e defesa em tomadas de contas especiais.</li></ul><h2>Por que terceirizar a Procuradoria?</h2><p>Municípios de pequeno e médio porte frequentemente não possuem corpo jurídico adequado para a complexidade das demandas. A assessoria jurídica especializada reduz riscos, melhora a qualidade das decisões e protege o gestor.</p>`,
    coverImage: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800&h=450&fit=crop",
    authorName: "Dr. Mauro Monção", categorySlug: "publico",
    tags: "advocacia pública,gestão municipal,licitação,responsabilidade do gestor,TCE",
    isPublished: true, publishedAt: new Date("2025-01-05"),
  },
  // ── Artigos originais do projeto atual ──────────────────────────
  {
    id: 301, slug: "planejamento-tributario-2025",
    title: "Planejamento Tributário 2025: Estratégias Essenciais para Reduzir sua Carga Fiscal",
    excerpt: "Com a reforma tributária em andamento, 2025 traz oportunidades únicas para empresas e pessoas físicas reduzirem legalmente sua carga de impostos. Conheça as principais estratégias.",
    content: `<h2>O cenário tributário em 2025</h2><p>A reforma tributária aprovada traz mudanças significativas para empresas e pessoas físicas. Entender essas mudanças e se preparar antecipadamente pode representar economia substancial de recursos.</p><h2>Principais Estratégias para Pessoas Jurídicas</h2><h3>1. Revisão do Enquadramento Tributário</h3><p>O regime tributário ideal depende do faturamento, margem de lucro e atividade da empresa. Com as mudanças do IVA Dual (CBS e IBS), muitas empresas podem migrar de regime com vantagens.</p><h3>2. Aproveitamento de Créditos Tributários</h3><p>Empresas que não vinham aproveitando todos os créditos devem fazer uma revisão retroativa dos últimos 5 anos para recuperar valores pagos a maior.</p><h3>3. Benefícios Fiscais Regionais</h3><p>Estados do Norte e Nordeste, como o Piauí e Maranhão, oferecem incentivos fiscais de ICMS para indústrias e certas atividades comerciais.</p><h2>Estratégias para Pessoas Físicas</h2><p>Utilize o PGBL até 12% da renda bruta anual tributável e organize todas as despesas médicas (dedutíveis sem limite) para maximizar a restituição do IRPF.</p>`,
    coverImage: null, authorName: "Dr. Mauro Monção", categorySlug: "tributario",
    tags: "planejamento tributário,IRPF,reforma tributária,2025",
    isPublished: true, publishedAt: new Date("2025-01-15"),
  },
  {
    id: 302, slug: "inventario-heranca-guia-completo",
    title: "Inventário e Herança: Guia Completo para Reduzir Custos e Conflitos Familiares",
    excerpt: "O inventário pode consumir anos e parte significativa do patrimônio. O planejamento sucessório antecipado pode reduzir custos em até 50% e preservar a harmonia familiar.",
    content: `<h2>O que é o inventário e por que pode ser custoso</h2><p>O inventário é o processo legal de identificar, avaliar e transferir os bens de uma pessoa falecida para seus herdeiros. Sem planejamento, pode levar de 1 a 10 anos e consumir de 8% a 20% do patrimônio.</p><h2>ITCMD: O Imposto da Herança</h2><p>O ITCMD varia de 2% a 8% dependendo do estado. No Piauí, pode chegar a 8% sobre o valor total da herança. Em um patrimônio de R$ 2 milhões, isso representa R$ 160.000 apenas em impostos.</p><h2>Estratégias para Reduzir o Custo</h2><ul><li><strong>Holding Familiar</strong> — Transferência de cotas com desconto no ITCMD sem necessidade de inventário.</li><li><strong>Doação em Vida com Usufruto</strong> — O ITCMD incide sobre valor menor e o inventário futuro é simplificado.</li><li><strong>Inventário Extrajudicial</strong> — Quando todos os herdeiros estão em acordo, pode ser feito em cartório em semanas.</li></ul>`,
    coverImage: null, authorName: "Dr. Mauro Monção", categorySlug: "sucessorio",
    tags: "inventário,herança,planejamento sucessório,ITCMD",
    isPublished: true, publishedAt: new Date("2025-01-28"),
  },
  {
    id: 303, slug: "revisao-emprestimos-bancarios-direitos",
    title: "Revisão de Empréstimos: Seus Direitos Como Consumidor Bancário",
    excerpt: "Juros abusivos, tarifas ilegais e cláusulas leoninas: o Código de Defesa do Consumidor protege você contra práticas bancárias irregulares.",
    content: `<h2>Os bancos e a prática de juros abusivos</h2><p>O Brasil tem algumas das maiores taxas de juros do mundo. O rotativo do cartão de crédito pode ultrapassar 400% ao ano. O CDC e o Código Civil protegem o consumidor contra essas práticas.</p><h2>O que Pode Ser Revisado</h2><ul><li><strong>Capitalização de Juros</strong> — O anatocismo irregular pode ser contestado judicialmente.</li><li><strong>Tarifas Não Solicitadas</strong> — Tarifas e seguros não autorizados expressamente são ilegais.</li><li><strong>Spread Bancário Excessivo</strong> — Quando a taxa efetiva é muito superior à taxa de mercado.</li></ul><h2>Como Proceder</h2><ol><li>Solicite ao banco a Planilha de Evolução do Saldo Devedor e o Contrato completo</li><li>Compare a CET com o mercado</li><li>Consulte um advogado especializado para calcular o valor da revisão</li></ol>`,
    coverImage: null, authorName: "Dr. Mauro Monção", categorySlug: "bancario",
    tags: "direito bancário,revisão de contrato,juros abusivos,CDC",
    isPublished: true, publishedAt: new Date("2025-02-05"),
  },
  {
    id: 304, slug: "previdencia-complementar-planejamento",
    title: "Previdência Complementar: Como Planejar sua Aposentadoria com Inteligência Fiscal",
    excerpt: "PGBL ou VGBL? Como a previdência privada pode ser usada como instrumento de planejamento tributário e sucessório ao mesmo tempo.",
    content: `<h2>A previdência pública não será suficiente para a maioria dos brasileiros</h2><p>Com as reformas previdenciárias, a aposentadoria pelo INSS tem teto limitado. Para manter o padrão de vida, a previdência complementar é essencial.</p><h2>PGBL vs VGBL</h2><p><strong>PGBL</strong> — Ideal para declaração completa do IR. Contribuições dedutíveis até 12% da renda bruta anual. IR incide sobre o total resgatado.</p><p><strong>VGBL</strong> — Para declaração simplificada ou quem já atingiu o limite. IR incide apenas sobre os rendimentos. Não entra no inventário.</p><h2>Estratégia Recomendada</h2><ul><li>Use PGBL para o limite de 12% da renda bruta (dedução fiscal imediata)</li><li>Complemente com VGBL para benefício sucessório</li><li>Prefira tributação regressiva para prazos acima de 10 anos</li></ul>`,
    coverImage: null, authorName: "Dr. Mauro Monção", categorySlug: "previdenciario",
    tags: "previdência complementar,PGBL,VGBL,aposentadoria",
    isPublished: true, publishedAt: new Date("2025-02-12"),
  },
  {
    id: 305, slug: "irpf-autismo-beneficios-fiscais",
    title: "IRPF e Autismo: Benefícios Fiscais que as Famílias TEA Precisam Conhecer",
    excerpt: "Portadores de TEA têm direito à isenção total do Imposto de Renda. Muitas famílias desconhecem esse direito e pagam tributos indevidamente há anos.",
    content: `<h2>O direito à isenção existe — e poucos conhecem</h2><p>A Lei 12.764 de 2012 (Lei Berenice Piana) reconheceu o autismo como deficiência para todos os efeitos legais, abrindo o direito à isenção fiscal para pessoas com TEA.</p><h2>Quem Tem Direito</h2><ul><li>Portadores de TEA com diagnóstico médico (CID F84)</li><li>A isenção abrange rendimentos de aposentadoria, pensão por morte e proventos de reserva</li><li>Não há limite de renda para usufruir da isenção</li></ul><h2>Como Obter a Isenção</h2><ol><li>Laudo médico de neurologista com CID-10 F84.x e referência à Lei 12.764/2012</li><li>Protocolo na Receita Federal ou agência do INSS</li><li>Pedido de restituição para os últimos 5 anos, se aplicável</li></ol><h2>Deduções Adicionais</h2><ul><li>Filho com autismo pode ser declarado como dependente sem limite de idade</li><li>Todas as despesas de tratamento são dedutíveis sem limite</li></ul>`,
    coverImage: null, authorName: "Dr. Mauro Monção", categorySlug: "tributario",
    tags: "autismo,TEA,IRPF,isenção fiscal,Lei 12764",
    isPublished: true, publishedAt: new Date("2025-02-18"),
  },
];

export const STATIC_FAQ_ITEMS = [
  { id: 401, question: "Qual é o horário de atendimento do escritório?", answer: "Atendimento presencial de segunda a sexta, das 8h às 18h. Via WhatsApp, o assistente jurídico Dr. Ben está disponível 24 horas.", isPublished: true, sortOrder: 1 },
  { id: 402, question: "O escritório atende em quais estados?", answer: "Atuamos presencialmente em Teresina (PI) e remotamente no Ceará, Piauí e Maranhão. Para outras regiões, oferecemos consultoria online.", isPublished: true, sortOrder: 2 },
  { id: 403, question: "Como é feita a consulta inicial?", answer: "A consulta inicial é gratuita e pode ser presencial ou por videochamada. Você apresenta sua situação e nossos advogados indicam o melhor caminho jurídico, sem compromisso.", isPublished: true, sortOrder: 3 },
  { id: 404, question: "Quais são as formas de pagamento dos honorários?", answer: "Trabalhamos com honorários fixos para consultoria e fixos ou ad exitum (percentual sobre o resultado) para ações judiciais. Os valores são definidos após análise do caso.", isPublished: true, sortOrder: 4 },
  { id: 405, question: "Quanto tempo demora um processo judicial?", answer: "Depende da área. Previdenciários: 6 meses a 3 anos. Trabalhistas: 6 meses a 2 anos. Tributários administrativos: 6 a 18 meses. Sempre buscamos resolução extrajudicial primeiro.", isPublished: true, sortOrder: 5 },
];

// Batch response structure that tRPC expects
function makeTRPCResponse(data: unknown) {
  return [{ result: { data: superjson.serialize(data) } }];
}

/**
 * Returns static data for known tRPC queries when the API is unavailable
 */
export function getStaticFallback(input: string): unknown | null {
  // tRPC batch URL format: /api/trpc/procedure.name,procedure2.name?batch=1&input=...
  // Extract the procedure path from the URL
  const urlPart = input.split("?")[0];
  const queryPart = input.includes("?") ? input.split("?")[1] : "";

  // Extract procedure names from URL path after /api/trpc/
  const match = urlPart.match(/\/api\/trpc\/(.+)/);
  if (!match) return null;

  const procedures = match[1].split(",").map(p => p.trim());
  const results: unknown[] = [];

  for (const proc of procedures) {
    if (proc === "practiceAreas.listPublic") {
      results.push({ result: { data: superjson.serialize(STATIC_PRACTICE_AREAS) } });
    } else if (proc === "landingPages.listPublic") {
      results.push({ result: { data: superjson.serialize(STATIC_LANDING_PAGES) } });
    } else if (proc === "landingPages.getBySlug") {
      // Extract slug from input query parameter
      let slug = "";
      try {
        const inputParam = new URLSearchParams(queryPart).get("input");
        if (inputParam) {
          const parsed = JSON.parse(decodeURIComponent(inputParam));
          slug = parsed["0"]?.json?.slug || parsed?.json?.slug || "";
        }
      } catch { /* ignore */ }
      const lp = STATIC_LANDING_PAGES.find(l => l.slug === slug) ?? null;
      results.push({ result: { data: superjson.serialize(lp) } });
    } else if (proc === "blog.listPublic") {
      results.push({ result: { data: superjson.serialize(STATIC_BLOG_POSTS) } });
    } else if (proc === "blog.getBySlug") {
      let slug = "";
      try {
        const inputParam = new URLSearchParams(queryPart).get("input");
        if (inputParam) {
          const parsed = JSON.parse(decodeURIComponent(inputParam));
          slug = parsed["0"]?.json?.slug || parsed?.json?.slug || "";
        }
      } catch { /* ignore */ }
      const post = STATIC_BLOG_POSTS.find(p => p.slug === slug) ?? null;
      results.push({ result: { data: superjson.serialize(post) } });
    } else if (proc === "faq.listPublic") {
      results.push({ result: { data: superjson.serialize(STATIC_FAQ_ITEMS) } });
    } else if (proc === "settings.getAllPublic") {
      // Return static site settings so the WhatsApp number and contact info are correct
      const staticSettings = [
        { settingKey: "phone_whatsapp", settingValue: "(86) 99482-0054" },
        { settingKey: "phone_office", settingValue: "(86) 99519-8919" },
        { settingKey: "phone_personal", settingValue: "(86) 99948-4761" },
        { settingKey: "email", settingValue: "contato@mauromoncao.adv.br" },
        { settingKey: "address", settingValue: "Teresina - PI" },
        { settingKey: "instagram", settingValue: "https://www.instagram.com/mauromoncao.adv/" },
      ];
      results.push({ result: { data: superjson.serialize(staticSettings) } });
    } else {
      // Unknown query — return null result (not an error)
      results.push({ result: { data: superjson.serialize(null) } });
    }
  }

  return results;
}
