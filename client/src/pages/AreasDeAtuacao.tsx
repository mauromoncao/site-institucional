import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { useSettings } from "@/hooks/useSettings";
import {
  Scale, Shield, Building2, Home, Users, Leaf, ShoppingCart,
  HeartHandshake, ChevronDown, MessageCircle, ArrowRight, CheckCircle,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const areas = [
  {
    id: "tributario",
    icon: Scale,
    title: "Direito Tributário",
    resumo:
      "Defesa estratégica em autuações e processos fiscais, com foco em segurança jurídica e proteção patrimonial.",
    completo:
      "Atuação técnica e estratégica na prevenção e solução de litígios fiscais, com foco em segurança jurídica, redução de riscos e eficiência financeira. Abrange consultoria, planejamento, compliance, defesa em autuações, processos administrativos, dívida ativa/execuções fiscais e medidas para proteger caixa e patrimônio diante de constrições.",
    color: "#1e4a7a",
  },
  {
    id: "planejamento-patrimonial",
    icon: Shield,
    title: "Planejamento Patrimonial, Societário e Sucessório",
    resumo:
      "Estruturação de holdings e governança para organizar patrimônio, sucessão e continuidade empresarial com previsibilidade.",
    completo:
      "Estruturação de soluções para organização do patrimônio e continuidade familiar/empresarial, com governança, proteção patrimonial e racionalidade tributária. Inclui holdings, reorganizações societárias, acordos de sócios, sucessão planejada e instrumentos jurídicos voltados à previsibilidade e estabilidade.",
    color: "#0f3a6e",
  },
  {
    id: "advocacia-publica",
    icon: Building2,
    title: "Advocacia Pública Municipal",
    resumo:
      "Atuação consultiva e contenciosa para municípios, com conformidade, gestão de riscos e respaldo técnico nas decisões.",
    completo:
      "Assessoria e atuação contenciosa voltadas à Administração Pública municipal, com foco em conformidade, gestão de riscos e tomada de decisões com respaldo jurídico. Apoio em processos administrativos, orientação normativa, controle de legalidade e defesa institucional em demandas judiciais.",
    color: "#193060",
  },
  {
    id: "imobiliario",
    icon: Home,
    title: "Direito Imobiliário",
    resumo:
      "Segurança jurídica em contratos, regularizações e negociações imobiliárias, com análise documental e redução de riscos.",
    completo:
      "Apoio jurídico em negociações e regularizações imobiliárias com foco em segurança documental e redução de riscos. Atuação em compra e venda, contratos, due diligence, registros, posse/propriedade, locações e solução de conflitos relacionados ao imóvel.",
    color: "#1a4060",
  },
  {
    id: "familia-sucessoes",
    icon: Users,
    title: "Família e Sucessões",
    resumo:
      "Soluções técnicas e sensíveis para inventários, partilhas e planejamento sucessório, preservando direitos e estabilidade.",
    completo:
      "Atuação sensível e técnica na estruturação e resolução de questões familiares e sucessórias, com foco em proteção de direitos, patrimônio e estabilidade. Abrange inventários, partilhas, testamentos, pactos, planejamento sucessório e demandas correlatas, sempre buscando soluções juridicamente seguras.",
    color: "#1c3d5e",
  },
  {
    id: "ambiental",
    icon: Leaf,
    title: "Direito Ambiental",
    resumo:
      "Assessoria preventiva e defesa em procedimentos e autuações ambientais, com foco em conformidade e mitigação de riscos.",
    completo:
      "Assessoria preventiva e contenciosa para pessoas físicas e empresas, orientada à conformidade e à mitigação de riscos regulatórios. Abrange licenciamento, autos e sanções administrativas, termos de ajustamento, responsabilidade ambiental e defesa em procedimentos fiscalizatórios.",
    color: "#1a4050",
  },
  {
    id: "consumidor",
    icon: ShoppingCart,
    title: "Direito do Consumidor",
    resumo:
      "Prevenção e resolução de conflitos de consumo com estratégia processual, revisão de contratos e proteção reputacional.",
    completo:
      "Atuação na prevenção e resolução de conflitos de consumo, com enfoque em estratégia processual e segurança jurídica. Inclui análise de risco, defesa e propositura de demandas, revisão de práticas e contratos, além de suporte em situações com impacto reputacional e financeiro.",
    color: "#1b3c5c",
  },
  {
    id: "previdenciario",
    icon: HeartHandshake,
    title: "Direito Previdenciário",
    resumo:
      "Atuação administrativa e judicial em benefícios e revisões previdenciárias, com análise criteriosa e condução técnica.",
    completo:
      "Orientação e atuação em demandas previdenciárias com foco em análise documental, estratégia e segurança do pedido. Abrange requerimentos administrativos e judiciais, revisões, benefícios e questões correlatas, com condução técnica e linguagem clara ao cliente.",
    color: "#1d3a58",
  },
];

function AreaCard({ area, phone }: { area: typeof areas[0]; phone: string }) {
  const [open, setOpen] = useState(false);
  const Icon = area.icon;

  const waMsg = encodeURIComponent(
    `Olá! Gostaria de uma orientação sobre ${area.title}.`
  );

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border flex flex-col"
      style={{ borderColor: `${GOLD}25`, background: "#fff" }}
    >
      {/* Cabeçalho colorido */}
      <div
        className="px-6 pt-6 pb-5"
        style={{ background: `linear-gradient(135deg, ${area.color}, ${NAVY})` }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${GOLD}20`, border: `1.5px solid ${GOLD}40` }}
        >
          <Icon className="w-6 h-6" style={{ color: GOLD }} />
        </div>
        <h3 className="font-serif font-bold text-white text-lg leading-snug">
          {area.title}
        </h3>
      </div>

      {/* Corpo */}
      <div className="px-6 py-5 flex-1 flex flex-col">

        {/* Resumo sempre visível */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {area.resumo}
        </p>

        {/* Texto completo expansível */}
        {open && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 pt-3 border-t border-gray-100">
            {area.completo}
          </p>
        )}

        {/* Botão Saiba mais */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-sm font-bold transition-colors mb-5 w-fit"
          style={{ color: open ? "#6b7280" : NAVY }}
        >
          <ChevronDown
            className="w-4 h-4 transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: open ? "#6b7280" : GOLD }}
          />
          {open ? "Ocultar" : "Saiba mais →"}
        </button>

        {/* CTA WhatsApp */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all hover:brightness-110"
            style={{ background: NAVY, color: GOLD, border: `1.5px solid ${GOLD}30` }}
          >
            <MessageCircle className="w-4 h-4" />
            Falar com um Especialista
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AreasDeAtuacao() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "5586994820054";

  return (
    <SiteLayout>

      {/* ── HERO ── */}
      <section
        className="relative text-white overflow-hidden py-20 lg:py-28"
        style={{ background: `linear-gradient(135deg, #0b1e35 0%, ${NAVY} 60%, #1a4060 100%)` }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-6"
              style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}50`, color: GOLD }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: GOLD }} />
              Escritório Mauro Monção
            </span>

            <h1
              className="font-serif font-bold leading-tight mb-5 text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Áreas de Atuação
            </h1>

            <p className="text-white/80 text-lg leading-relaxed max-w-2xl mb-8">
              Assessoria jurídica especializada nos principais ramos do Direito —
              com atuação em Ceará, Piauí e Maranhão. Cada área conta com expertise
              técnica, abordagem estratégica e atendimento humanizado.
            </p>

            <div className="flex flex-wrap gap-6">
              {[
                { v: "8", l: "Ramos do Direito" },
                { v: "+15", l: "Anos de Experiência" },
                { v: "3", l: "Estados" },
              ].map((s) => (
                <div key={s.l} className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-serif" style={{ color: GOLD }}>{s.v}</span>
                  <span className="text-white/70 text-sm">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID DE ÁREAS ── */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container">
          <div className="text-center mb-14">
            <span
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3 block"
              style={{ color: GOLD }}
            >
              Especialidades Jurídicas
            </span>
            <h2
              className="font-serif text-3xl lg:text-4xl font-bold mb-3"
              style={{ color: NAVY }}
            >
              Ramos do Direito em que atuamos
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Clique em <strong className="text-gray-600">"Saiba mais →"</strong> em cada área
              para conhecer a atuação completa e falar diretamente com um especialista.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {areas.map((area) => (
              <AreaCard key={area.id} area={area} phone={phone} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ── */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-[0.25em] block mb-3"
                style={{ color: GOLD }}
              >
                Por que nos escolher
              </span>
              <h2 className="font-serif text-3xl font-bold mb-6" style={{ color: NAVY }}>
                Advocacia técnica com{" "}
                <span style={{ color: GOLD }}>foco no seu resultado</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Mais de 15 anos de experiência com atuação estratégica em múltiplas
                áreas do Direito. Cada caso recebe atenção individualizada e condução técnica de excelência.
              </p>
              <div className="space-y-3">
                {[
                  "Atendimento 24h via assistente jurídico Dr. Ben",
                  "Equipe especializada em múltiplas áreas",
                  "Atuação em CE, PI e MA",
                  "Tecnologia jurídica aplicada a cada caso",
                  "Planejamento preventivo e resolução estratégica",
                  "Sigilo absoluto e ética em todos os casos",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card CTA */}
            <div
              className="rounded-3xl p-8 text-white shadow-2xl"
              style={{ background: `linear-gradient(135deg, #0f2340, ${NAVY})` }}
            >
              <Scale className="w-10 h-10 mb-5" style={{ color: GOLD }} />
              <h3 className="font-serif text-2xl font-bold mb-3">Consulta Inicial</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Apresente seu caso a um dos nossos advogados especializados.
                Análise rápida, orientação clara e sem compromisso.
              </p>
              <a
                href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta jurídica.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                style={{ background: GOLD, color: NAVY }}
              >
                <MessageCircle className="w-4 h-4" />
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-bold text-white mb-4">
            Não encontrou sua área?
          </h2>
          <p className="text-white/75 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Nosso escritório atende demandas específicas e casos multidisciplinares.
            Entre em contato e apresente sua situação.
          </p>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Tenho uma dúvida jurídica e gostaria de orientação.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg"
            style={{ background: GOLD, color: NAVY }}
          >
            <MessageCircle className="w-5 h-5" />
            Falar com um Advogado
          </a>
        </div>
      </section>

    </SiteLayout>
  );
}
