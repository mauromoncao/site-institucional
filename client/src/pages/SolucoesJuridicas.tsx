import { Link } from "wouter";
import SiteLayout from "@/components/site/SiteLayout";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildOrganizationLD, buildBreadcrumbLD } from "@/components/SEOHead";
import {
  Scale, Shield, Building2, Home, Users, Leaf, ShoppingCart,
  HeartHandshake, ArrowRight, MessageCircle, Clock, Zap, Heart,
  BarChart2, RefreshCw, Handshake, Stethoscope, Bot,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

/* Cada LP — status: "live" = publicada | "em_breve" = em construção | "ia" = destaque IA */
const solucoes = [
  {
    id: "assistente-juridico",
    icon: Bot,
    title: "Dr. Ben — Assistente Jurídico Digital 24h",
    pitch: "Atendimento imediato, qualificação de demandas e direcionamento para o especialista correto. Disponível 24h, 7 dias por semana.",
    status: "ia",
    tag: "IA · Atendimento 24h",
  },
  {
    id: "irpf-educacao-autismo",
    icon: Heart,
    title: "IRPF · Educação Autismo (TEA)",
    pitch: "Despesas com educação especializada de pessoa autista podem ser deduzidas integralmente como despesa médica no IRPF.",
    status: "live",
    tag: "Tributário · IRPF",
  },
  {
    id: "direito-bancario",
    icon: Scale,
    title: "Direito Bancário",
    pitch: "Defesa contra juros abusivos, cláusulas ilegais, fraudes e negativação indevida com base no CDC.",
    status: "live",
    tag: "Bancário · CDC",
  },
  {
    id: "direito-previdenciario",
    icon: HeartHandshake,
    title: "Direito Previdenciário",
    pitch: "Defesa dos direitos do segurado — concessão, revisão e ações contra negativas indevidas do INSS.",
    status: "live",
    tag: "Previdenciário · INSS",
  },
  {
    id: "recuperacao-previdenciaria",
    icon: RefreshCw,
    title: "Recuperação Previdenciária por Múltiplos Vínculos",
    pitch: "Restituição de contribuições previdenciárias recolhidas acima do teto por trabalhadores com dois ou mais empregos.",
    status: "live",
    tag: "Previdenciário · Restituição",
  },
  {
    id: "transacao-tributaria",
    icon: Handshake,
    title: "Transação Tributária",
    pitch: "Negociação estratégica para regularizar débitos fiscais com redução de multas e segurança jurídica.",
    status: "live",
    tag: "Tributário · Regularização",
  },
  {
    id: "recuperacao-tributaria",
    icon: RefreshCw,
    title: "Recuperação Tributária",
    pitch: "Revisão de tributos, identificação de créditos e teses para restituição e compensação fiscal.",
    status: "live",
    tag: "Tributário · Créditos",
  },
  {
    id: "planejamento-tributario",
    icon: BarChart2,
    title: "Planejamento Tributário",
    pitch: "Estruturação preventiva para reduzir legalmente a carga fiscal e proteger o patrimônio empresarial.",
    status: "live",
    tag: "Tributário · Planejamento",
  },
  {
    id: "clinicas-lucro-presumido",
    icon: Stethoscope,
    title: "Tese Tributária para Clínicas (Lucro Presumido)",
    pitch: "Equiparação de clínicas a serviços hospitalares no Lucro Presumido para redução da base de cálculo e recuperação tributária.",
    status: "live",
    tag: "Tributário · Saúde",
  },
  {
    id: "defesa-fiscal",
    icon: Shield,
    title: "Defesa Fiscal Administrativa e Judicial",
    pitch: "Defesa técnica contra autuações, execuções fiscais, bloqueios e redirecionamentos patrimoniais.",
    status: "live",
    tag: "Tributário · Contencioso",
  },
  {
    id: "planejamento-patrimonial",
    icon: Shield,
    title: "Planejamento Patrimonial & Sucessório",
    pitch: "Preserve e transfira seu patrimônio com eficiência e sem conflitos.",
    status: "em_breve",
    tag: "Patrimonial",
  },
  {
    id: "advocacia-publica",
    icon: Building2,
    title: "Advocacia Pública Municipal",
    pitch: "Assessoria jurídica completa para gestores e administrações municipais.",
    status: "em_breve",
    tag: "Público",
  },
  {
    id: "imobiliario",
    icon: Home,
    title: "Direito Imobiliário",
    pitch: "Feche negócios imobiliários com total segurança jurídica.",
    status: "em_breve",
    tag: "Imobiliário",
  },
  {
    id: "familia-sucessoes",
    icon: Users,
    title: "Família e Sucessões",
    pitch: "Inventários, divórcio e planejamento sucessório com cuidado e agilidade.",
    status: "em_breve",
    tag: "Família",
  },
  {
    id: "ambiental",
    icon: Leaf,
    title: "Direito Ambiental",
    pitch: "Licenciamento, defesa em autos e conformidade ambiental para sua empresa.",
    status: "em_breve",
    tag: "Ambiental",
  },
  {
    id: "consumidor",
    icon: ShoppingCart,
    title: "Direito do Consumidor",
    pitch: "Proteção dos seus direitos e resolução ágil de conflitos de consumo.",
    status: "em_breve",
    tag: "Consumidor",
  },
];

export default function SolucoesJuridicas() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "5586994820054";
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <SiteLayout>
      <SEOHead
        title="Soluções Jurídicas — Áreas de Atuação"
        description="Conheça as soluções jurídicas do escritório Mauro Monção: Direito Tributário, Previdenciário, Bancário, Empresarial, Imobiliário, Eleitoral e Advocacia Pública."
        canonical="https://mauromoncao.adv.br/solucoes-juridicas"
        keywords="soluções jurídicas, áreas de atuação, direito tributário, advocacia empresarial, escritório Piauí"
        jsonLd={[buildOrganizationLD(), buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }])]}
      />

      {/* ── HERO ── */}
      <section
        className="relative text-white overflow-hidden py-20 lg:py-28"
        style={{ background: `linear-gradient(135deg, #0b1e35 0%, ${NAVY} 60%, #1a4060 100%)` }}
      >
        {/* Grid sutil */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Glow dourado */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${GOLD}08 0%, transparent 70%)` }}
        />

        <div className="container relative z-10 text-center">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-6"
            style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}50`, color: GOLD }}
          >
            <Zap className="w-3.5 h-3.5" />
            Alta Performance Jurídica
          </span>

          <h1
            className="font-serif font-bold leading-tight text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
          >
            Soluções Jurídicas
          </h1>

          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Cada solução é uma <strong className="text-white">landing page especializada</strong> —
            com conteúdo estratégico, provas sociais e CTA de alta conversão.
            Em construção. <span style={{ color: GOLD }}>Em breve disponíveis.</span>
          </p>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Olá! Gostaria de mais informações sobre as soluções jurídicas do escritório.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
            style={{ background: GOLD, color: NAVY }}
          >
            <MessageCircle className="w-4 h-4" />
            Falar com um Especialista
          </a>
        </div>
      </section>

      {/* ── GRID DE LPs ── */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container">

          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Soluções Jurídicas Especializadas
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-3" style={{ color: NAVY }}>
              Cada área, uma solução completa
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Landing pages dedicadas com proposta de valor clara, fundamentação jurídica e
              CTA de alta conversão. Novas soluções sendo publicadas continuamente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {solucoes.map((sol) => {
              const Icon = sol.icon;
              const isLive = sol.status === "live";
              const isIA = sol.status === "ia";
              const Wrapper = (isLive || isIA) ? Link : "div";
              const wrapperProps = isLive ? { href: `/solucoes-juridicas/${sol.id}` } : isIA ? { href: `/${sol.id}` } : {};

              /* ── Card especial Dr. Ben (IA) ── */
              if (isIA) {
                return (
                  <Link
                    key={sol.id}
                    href={`/${sol.id}`}
                    className="relative bg-white rounded-2xl overflow-hidden border shadow-sm flex flex-col transition-all group hover:shadow-xl cursor-pointer sm:col-span-2 lg:col-span-3 xl:col-span-4"
                    style={{ borderColor: `${GOLD}60` }}
                  >
                    <div className="flex flex-col lg:flex-row items-stretch">
                      {/* Lado esquerdo — fundo navy */}
                      <div
                        className="lg:w-2/3 px-8 py-8 flex flex-col justify-center gap-4"
                        style={{ background: `linear-gradient(135deg, #07182e, ${NAVY})` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: `${GOLD}18`, border: `1.5px solid ${GOLD}50` }}>
                            <Bot className="w-6 h-6" style={{ color: GOLD }} />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: `${GOLD}90` }}>{sol.tag}</span>
                            <h3 className="font-serif font-bold text-white text-lg leading-snug">{sol.title}</h3>
                          </div>
                          {/* Online badge */}
                          <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            Online agora
                          </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed max-w-2xl">{sol.pitch}</p>
                        <div className="flex flex-wrap gap-4">
                          {[
                            { label: "24h · 7 dias" },
                            { label: "Sigilo garantido" },
                            { label: "Sem compromisso" },
                            { label: "Grátis" },
                          ].map(({ label }) => (
                            <span key={label} className="text-xs font-semibold px-3 py-1 rounded-full"
                              style={{ background: `${GOLD}18`, color: GOLD, border: `1px solid ${GOLD}30` }}>{label}</span>
                          ))}
                        </div>
                      </div>
                      {/* Lado direito — CTA dourado */}
                      <div
                        className="lg:w-1/3 px-8 py-8 flex flex-col items-center justify-center gap-4"
                        style={{ background: `linear-gradient(135deg, ${GOLD}18, ${GOLD}08)`, borderLeft: `1px solid ${GOLD}30` }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-3 rounded-full blur-xl opacity-20" style={{ background: GOLD }} />
                          <div className="relative rounded-full overflow-hidden shadow-xl"
                            style={{ width: 96, height: 96, border: `2px solid ${GOLD}` }}>
                            <img src="/dr-ben.jpg" alt="Dr. Ben" className="w-full h-full object-cover object-top" />
                          </div>
                        </div>
                        <div
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all group-hover:brightness-110 shadow-lg"
                          style={{ background: GOLD, color: NAVY }}
                        >
                          <MessageCircle className="w-4 h-4" />Falar com Dr. Ben
                        </div>
                        <p className="text-center text-xs" style={{ color: `${NAVY}80` }}>
                          Resposta imediata · Atendimento humanizado pela IA
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              }

              return (
                <Wrapper
                  key={sol.id}
                  {...(wrapperProps as any)}
                  className={`relative bg-white rounded-2xl overflow-hidden border shadow-sm flex flex-col transition-all group ${isLive ? "hover:shadow-xl cursor-pointer hover:border-[#E8B84B]/50" : "hover:shadow-lg"}`}
                  style={{ borderColor: isLive ? `${GOLD}40` : `${GOLD}20` }}
                >
                  {/* Badge status */}
                  <div
                    className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10"
                    style={isLive
                      ? { background: "#16a34a", color: "#fff" }
                      : { background: NAVY, color: GOLD, border: `1px solid ${GOLD}40` }
                    }
                  >
                    {isLive
                      ? <><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />Disponível</>
                      : <><Clock className="w-2.5 h-2.5" />Em breve</>
                    }
                  </div>

                  {/* Cabeçalho */}
                  <div
                    className="px-6 pt-8 pb-5"
                    style={{ background: isLive
                      ? `linear-gradient(135deg, #0f2340, ${NAVY})`
                      : `linear-gradient(135deg, #0f2340, ${NAVY})`
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${GOLD}18`, border: `1.5px solid ${GOLD}35` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                    {sol.tag && (
                      <span className="text-[10px] font-bold uppercase tracking-wider mb-2 block" style={{ color: `${GOLD}90` }}>
                        {sol.tag}
                      </span>
                    )}
                    <h3 className="font-serif font-bold text-white text-base leading-snug">
                      {sol.title}
                    </h3>
                  </div>

                  {/* Corpo */}
                  <div className="px-6 py-5 flex-1 flex flex-col">
                    <p className="text-gray-500 text-sm leading-relaxed flex-1">
                      {sol.pitch}
                    </p>

                    {isLive ? (
                      /* LP publicada — botão acessar */
                      <div
                        className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all group-hover:brightness-110"
                        style={{ background: GOLD, color: NAVY }}
                      >
                        Acessar solução
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    ) : (
                      /* Em construção */
                      <>
                        <div className="mt-5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                              Em produção
                            </span>
                            <span className="text-[10px] font-bold" style={{ color: GOLD }}>Em breve</span>
                          </div>
                          <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: "35%", background: `linear-gradient(90deg, ${GOLD}60, ${GOLD})` }} />
                          </div>
                        </div>
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Olá! Tenho interesse na solução de ${sol.title}.`)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                          style={{ background: `${GOLD}15`, color: NAVY, border: `1.5px solid ${GOLD}40` }}
                        >
                          <MessageCircle className="w-4 h-4" style={{ color: GOLD }} />
                          Quero saber mais
                        </a>
                      </>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AVISO / EXPECTATIVA ── */}
      <section className="py-16 bg-white">
        <div className="container">
          <div
            className="rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto"
            style={{ background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `1px solid ${GOLD}25` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: `${GOLD}18` }}
            >
              <Zap className="w-7 h-7" style={{ color: GOLD }} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">
              Landing pages de alta conversão
            </h2>
            <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Cada página será construída com proposta de valor clara, prova social,
              perguntas frequentes, depoimentos e CTA direto para atendimento especializado.
              <br /><br />
              <span style={{ color: GOLD }} className="font-semibold">
                Enquanto isso, fale diretamente com nossa equipe.
              </span>
            </p>
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent("Olá! Gostaria de falar com um advogado especializado.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg"
              style={{ background: GOLD, color: NAVY }}
            >
              <MessageCircle className="w-5 h-5" />
              Falar com um Advogado Agora
            </a>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
