import { useState, useEffect, useRef } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { useSettings } from "@/hooks/useSettings";
import { VideoEmbed } from "@/components/VideoEmbed";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, AlertCircle, FileText, Scale, Shield, ArrowRight,
  MessageCircle, Phone, ChevronDown, Star, BookOpen, Gavel,
  Heart, Users, Clock, Search, Award, Play,
} from "lucide-react";

const GOLD  = "#E8B84B";
const NAVY  = "#19385C";
const WA    = "5586994820054";
const SLUG  = "irpf-educacao-autismo";

const WA_MSG = encodeURIComponent(
  "Olá! Vi a página sobre IRPF e educação de pessoa autista e gostaria de analisar o meu caso."
);

/* ─── Sticky CTA mobile ─── */
function StickyCTA({ phone }: { phone: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ background: NAVY, borderTop: `2px solid ${GOLD}` }}
    >
      <div className="flex gap-2 p-3">
        <a
          href={`https://wa.me/${WA}?text=${WA_MSG}`}
          target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: "#25D366", color: "#fff" }}
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a
          href="#formulario"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: GOLD, color: NAVY }}
        >
          <FileText className="w-4 h-4" /> Analisar Caso
        </a>
      </div>
    </div>
  );
}

/* ─── Formulário de qualificação ─── */
function Formulario({ phone }: { phone: string }) {
  const [form, setForm] = useState({
    nome: "", whatsapp: "", anos: "", instituicao: "", valor: "", cidade: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero analisar minha declaração de IRPF.\n\n` +
      `📋 *Nome:* ${form.nome}\n` +
      `📅 *Ano(s):* ${form.anos}\n` +
      `🏫 *Instituição:* ${form.instituicao}\n` +
      `💰 *Valor anual:* ${form.valor}\n` +
      `📍 *Cidade/UF:* ${form.cidade}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };

  if (sent) return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
      <h3 className="font-serif text-2xl font-bold text-white mb-2">Recebemos sua solicitação!</h3>
      <p className="text-white/70 text-sm">Nossa equipe entrará em contato em breve para analisar seu caso.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome",        label: "Nome completo",               placeholder: "Seu nome",              type: "text" },
        { name: "whatsapp",    label: "WhatsApp",                    placeholder: "(86) 99999-9999",        type: "tel"  },
        { name: "anos",        label: "Ano(s) da declaração",        placeholder: "Ex: 2022, 2023, 2024",   type: "text" },
        { name: "instituicao", label: "Tipo de instituição",         placeholder: "Escola especializada, ABA, etc.", type: "text" },
        { name: "valor",       label: "Valor anual aproximado (R$)", placeholder: "Ex: R$ 30.000",          type: "text" },
        { name: "cidade",      label: "Cidade / UF",                 placeholder: "Ex: Parnaíba – PI",      type: "text" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">
            {f.label}
          </label>
          <input
            required
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
            value={(form as any)[f.name]}
            onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(232,184,75,0.25)",
              color: "#fff",
            }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)}
            onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")}
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Quero analisar minha declaração →
      </button>
      <p className="text-center text-white/40 text-xs">
        🔒 Seus dados são confidenciais e utilizados apenas para análise do caso.
      </p>
    </form>
  );
}

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all"
      style={{ borderColor: open ? `${GOLD}40` : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left"
      >
        <span className="text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform"
          style={{ color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-white/70 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PÁGINA PRINCIPAL
═══════════════════════════════════════════ */
export default function IrpfAutismo() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || WA;

  return (
    <SiteLayout>
      <SEOHead
        title="IRPF com Filho Autista — Isenção e Restituição de Imposto de Renda"
        description="Famílias com filhos autistas têm direito à isenção do IRPF e restituição de até 5 anos. Entenda a tese jurídica e consulte grátis com Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/solucoes/irpf-autismo"
        keywords="IRPF autismo, isenção imposto de renda TEA, restituição IRPF filho autista, advogado tributário"
        jsonLd={[
          buildServiceLD({ name: "IRPF com Filho Autista — Isenção e Restituição de Imposto de Renda", description: "Famílias com filhos autistas têm direito à isenção do IRPF e restituição de até 5 anos. Entenda a tese jurídica e consulte grátis com Mauro Monção Advogados.", url: "https://mauromoncao.adv.br/solucoes/irpf-autismo" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "IRPF com Filho Autista", url: "/solucoes/irpf-autismo" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA phone={phone} />

      {/* ════════════════════════════════
          A. HERO SECTION
      ════════════════════════════════ */}
      <section
        className="relative overflow-hidden text-white"
        style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}
      >
        {/* ── IMAGEM DE FUNDO ÉPICA ── */}
        <div className="absolute inset-0">
          <img
            src="/lp-irpf-autismo-hero.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Overlay em camadas para legibilidade */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,24,46,0.97) 0%, rgba(7,24,46,0.88) 45%, rgba(7,24,46,0.35) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,24,46,0.85) 0%, transparent 40%)" }} />
        </div>

        {/* Grid decorativo sobre a imagem */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Esquerda */}
            <div>
              {/* Badge tese jurídica */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}
              >
                <Scale className="w-3.5 h-3.5" />
                Tese Jurídica · Direito Tributário · IRPF
              </div>

              <h1
                className="font-serif font-bold leading-[1.1] text-white mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)" }}
              >
                Despesas com educação de{" "}
                <em className="not-italic" style={{ color: GOLD }}>pessoa autista</em>{" "}
                podem ultrapassar o limite de dedução do{" "}
                <em className="not-italic" style={{ color: GOLD }}>Imposto de Renda.</em>
              </h1>

              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                Quando a despesa possui natureza terapêutica e multidisciplinar, ela pode ser
                equiparada a despesa médica — permitindo <strong className="text-white">dedução integral no IRPF</strong>,
                sem o limite anual da categoria educação.
              </p>

              {/* Trust bar */}
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield,  text: "Base constitucional sólida" },
                  { icon: Scale,   text: "Jurisprudência favorável" },
                  { icon: Award,   text: "+15 anos de experiência" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                    {text}
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#formulario"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}
                >
                  <FileText className="w-4 h-4" />
                  Solicitar análise do meu caso
                </a>
                <a
                  href={`https://wa.me/${WA}?text=${WA_MSG}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar com especialista tributário
                </a>
              </div>
            </div>

            {/* Direita — card flutuante sobre a imagem de fundo */}
            <div className="hidden lg:flex flex-col gap-4 items-end">

              {/* Card principal — checklist */}
              <div
                className="w-72 rounded-3xl p-6 shadow-2xl"
                style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>
                  Você se enquadra?
                </p>
                <div className="space-y-3">
                  {[
                    "Escola especializada em TEA",
                    "Terapia ABA integrada",
                    "Fonoaudiologia / Terapia Ocupacional",
                    "Valores acima do limite anual",
                    "Declarações dos últimos 5 anos",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}25` }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      </div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: `${GOLD}25` }}>
                  <a
                    href="#formulario"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    <FileText className="w-4 h-4" />
                    Analisar meu caso
                  </a>
                </div>
              </div>

              {/* Card badge credibilidade */}
              <div
                className="w-72 rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ background: "rgba(7,24,46,0.75)", border: `1px solid ${GOLD}30`, backdropFilter: "blur(12px)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${GOLD}20` }}>
                  <Award className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">+15 anos de experiência</p>
                  <p className="text-white/55 text-xs mt-0.5">Tributário · CE · PI · MA</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Seta scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/30" />
        </div>
      </section>


      {/* ════════════════════════════════
          B. BLOCO DA DOR
      ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              O problema
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              O limite anual de educação pode estar sendo<br />
              <span style={{ color: GOLD }}>aplicado de forma indevida.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Pais e responsáveis que custeiam educação especializada para pessoas com TEA
              frequentemente enfrentam a mesma situação:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: AlertCircle,
                title: "Pagam valores elevados",
                text: "Escola especializada, terapias integradas e acompanhamento multidisciplinar geram custos muito acima do limite anual de dedução educacional.",
              },
              {
                icon: FileText,
                title: "Superam o teto da categoria",
                text: "O limite legal de dedução com educação é aplicado sobre todas as despesas, sem distinção — mesmo quando a natureza do serviço é terapêutica.",
              },
              {
                icon: Search,
                title: "Não conhecem a tese",
                text: "A maioria dos contribuintes desconhece que a natureza da despesa pode alterar o seu enquadramento tributário na declaração.",
              },
              {
                icon: Clock,
                title: "Perdem o prazo de restituição",
                text: "É possível revisar declarações dos últimos anos e pedir restituição — mas o tempo corre e cada ano fechado representa valores não recuperados.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex gap-4 p-6 rounded-2xl border"
                style={{ borderColor: "#e5e7eb", background: "#fafaf9" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${NAVY}10` }}
                >
                  <Icon className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem-chave */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `1px solid ${GOLD}30` }}
          >
            <p className="text-white font-serif text-xl font-bold leading-snug">
              "O problema não é o valor pago.{" "}
              <span style={{ color: GOLD }}>É a classificação incorreta da despesa."</span>
            </p>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          C. FUNDAMENTAÇÃO JURÍDICA
      ════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Fundamento Jurídico
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              A natureza terapêutica da<br />educação especializada
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: Scale,
                title: "Legislação do IRPF",
                text: "O IRPF permite dedução integral de despesas médicas. Não há limite para despesas de saúde — apenas para despesas educacionais. A natureza da despesa é determinante.",
              },
              {
                icon: Heart,
                title: "TEA como Deficiência",
                text: "O Transtorno do Espectro Autista é reconhecido legalmente como deficiência para todos os efeitos legais no Brasil, assegurando proteção jurídica diferenciada.",
              },
              {
                icon: Shield,
                title: "Constituição Federal",
                text: "A CF assegura proteção especial à pessoa com deficiência. O Estatuto da Pessoa com Deficiência reforça o tratamento inclusivo e diferenciado em todas as áreas.",
              },
              {
                icon: BookOpen,
                title: "Caráter Multidisciplinar",
                text: "Quando a instituição presta serviço com caráter clínico, terapêutico e multidisciplinar, a despesa pode ser enquadrada como despesa de saúde, não educação.",
              },
              {
                icon: Gavel,
                title: "Jurisprudência Favorável",
                text: "Há precedentes administrativos e judiciais reconhecendo a natureza terapêutica de despesas com educação especializada para pessoas com deficiência.",
              },
              {
                icon: Users,
                title: "Dignidade Humana",
                text: "O princípio da dignidade da pessoa humana e da capacidade contributiva amparam a tese de que o Estado não pode onerar excessivamente quem arca com cuidados especiais.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all"
                style={{ borderColor: `${GOLD}20` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: NAVY }}
                >
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          D. TESE JURÍDICA
      ════════════════════════════════ */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Tese Jurídica
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4 text-white">
              O que sustenta a{" "}
              <span style={{ color: GOLD }}>dedução integral</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              "Interpretação sistemática da legislação do IRPF",
              "Princípio da dignidade da pessoa humana",
              "Princípio da capacidade contributiva",
              "Proteção constitucional à pessoa com deficiência",
              "Natureza híbrida (educacional-terapêutica) da despesa",
              "Jurisprudência favorável em casos semelhantes",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}20` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: `${GOLD}20`, color: GOLD }}
                >
                  {i + 1}
                </div>
                <span className="text-white/85 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Mensagem-chave */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}
          >
            <p className="font-serif text-lg font-bold text-white">
              "Não se trata de benefício fiscal.{" "}
              <span style={{ color: GOLD }}>Trata-se de correta qualificação jurídica da despesa."</span>
            </p>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          E. COMO TRABALHAMOS
      ════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Nossa Atuação
            </span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              Como trabalhamos o seu caso
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Cada caso exige análise documental minuciosa. Este é o nosso processo:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { n: "01", title: "Análise documental",       text: "Avaliamos toda a documentação da instituição: contrato, notas fiscais, relatórios terapêuticos e pedagógicos." },
              { n: "02", title: "Natureza dos serviços",     text: "Verificamos se os serviços prestados têm caráter clínico, terapêutico e multidisciplinar — determinante para o enquadramento." },
              { n: "03", title: "Estrutura da instituição",  text: "Estudamos a estrutura pedagógica e terapêutica da escola para identificar o enquadramento correto." },
              { n: "04", title: "Enquadramento jurídico",    text: "Elaboramos o parecer individualizado com fundamentação técnica sólida, com base nos documentos e na legislação vigente." },
              { n: "05", title: "Estratégia definida",       text: "Definimos a melhor estratégia: retificação administrativa, pedido de restituição ou via judicial, conforme o caso." },
              { n: "06", title: "Defesa técnica",            text: "Representamos o contribuinte em eventual questionamento ou autuação fiscal, com defesa fundamentada em cada etapa." },
            ].map(({ n, title, text }) => (
              <div
                key={n}
                className="rounded-2xl p-6 border hover:shadow-md transition-all"
                style={{ borderColor: `${GOLD}25`, background: "#fafaf9" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4"
                  style={{ background: NAVY, color: GOLD }}
                >
                  {n}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Mensagem-chave */}
          <div className="text-center">
            <p
              className="inline-block px-8 py-4 rounded-2xl font-serif text-base font-semibold"
              style={{ background: `${NAVY}08`, color: NAVY, border: `1px solid ${NAVY}15` }}
            >
              "Cada caso exige análise documental minuciosa."
            </p>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          F. VÍDEO INSTITUCIONAL
      ════════════════════════════════ */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Entenda a Tese
            </span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Entenda quando a educação especializada<br />pode ser tratada como despesa médica
            </h2>
          </div>

          {/* Player responsivo — YouTube/Vimeo via painel admin → Vídeos */}
          <VideoEmbed
            videoUrl={settings.video_irpf_autismo}
            title="IRPF Educação Autismo (TEA)"
            caption="Dr. Mauro Monção explica a tese jurídica com clareza e autoridade técnica."
          />
        </div>
      </section>


      {/* ════════════════════════════════
          G. BLOCO DE RESPONSABILIDADE
      ════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div
            className="rounded-3xl p-8 border"
            style={{ borderColor: `${GOLD}30`, background: `${NAVY}05` }}
          >
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: NAVY }}
              >
                <Shield className="w-6 h-6" style={{ color: GOLD }} />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg mb-1" style={{ color: NAVY }}>
                  Tese jurídica exige cautela e técnica.
                </h3>
                <p className="text-gray-500 text-sm">
                  Atuamos com responsabilidade e rigor técnico em cada análise.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Nem toda despesa educacional é dedutível integralmente",
                "É necessária análise da estrutura da instituição",
                "A documentação é determinante para o enquadramento",
                "A estratégia deve ser personalizada caso a caso",
                "Não há garantia de êxito — cada caso é único",
                "A decisão final cabe ao contribuinte, orientado tecnicamente",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} />
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          FAQ
      ════════════════════════════════ */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
              Dúvidas Frequentes
            </span>
            <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Qualquer escola especializada em TEA se enquadra na tese?",
                a: "Não necessariamente. É preciso analisar se a instituição presta serviços com caráter clínico, terapêutico e multidisciplinar. A estrutura e a documentação da instituição são determinantes.",
              },
              {
                q: "Posso revisar declarações de anos anteriores?",
                a: "Sim, é possível retificar declarações dos últimos 5 anos e solicitar restituição de valores, quando a análise do caso indicar cabimento. O prazo decadencial deve ser observado.",
              },
              {
                q: "Existe risco de a Receita Federal autuar meu caso?",
                a: "Toda tese jurídica envolve risco de questionamento fiscal. Por isso atuamos com documentação sólida e fundamentação técnica robusta, e estamos preparados para a defesa em caso de autuação.",
              },
              {
                q: "O diagnóstico de TEA é suficiente para a tese?",
                a: "O laudo diagnóstico é um dos elementos do caso, mas não é suficiente sozinho. A análise da natureza dos serviços prestados pela instituição é igualmente importante para o enquadramento.",
              },
              {
                q: "A tese já foi reconhecida pela Receita Federal?",
                a: "Há precedentes administrativos e judiciais favoráveis. A tese é fundamentada em legislação vigente e princípios constitucionais, e vem sendo aplicada com sucesso em casos devidamente documentados.",
              },
              {
                q: "Qual o valor mínimo para valer a pena analisar?",
                a: "Não há um valor fixo mínimo. A análise considera o montante pago, os anos passíveis de revisão e a documentação disponível. Realizamos a avaliação prévia sem compromisso.",
              },
            ].map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════
          H. CTA FINAL + FORMULÁRIO
      ════════════════════════════════ */}
      <section
        id="formulario"
        className="py-20 text-white"
        style={{ background: `linear-gradient(150deg, #07182e, ${NAVY})` }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Esquerda — copy */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>
                Análise Individualizada
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Você pode estar deixando de recuperar{" "}
                <span style={{ color: GOLD }}>valores importantes.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Cada caso é único. Nossa equipe analisa a documentação com rigor técnico e apresenta
                um parecer claro sobre o enquadramento tributário da sua situação.
              </p>

              {/* Benefícios */}
              <div className="space-y-3 mb-8">
                {[
                  "Análise documental completa",
                  "Enquadramento jurídico individualizado",
                  "Estratégia administrativa ou judicial",
                  "Pedido de restituição dos últimos anos, se cabível",
                  "Defesa técnica em caso de autuação fiscal",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Contato direto */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WA}?text=${WA_MSG}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar pelo WhatsApp
                </a>
                <a
                  href="tel:+558699482-0054"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: `${GOLD}50`, color: GOLD }}
                >
                  <Phone className="w-4 h-4" />
                  (86) 99482-0054
                </a>
              </div>
            </div>

            {/* Direita — formulário */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}
            >
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                Analise a dedução do IRPF.
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Preencha os dados abaixo para uma análise personalizada do seu caso.
              </p>
              <Formulario phone={phone} />
            </div>

          </div>
        </div>
      </section>

      {/* ── Rodapé da LP ── */}
      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}>
        <div className="container text-center">
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">
            Esta página tem caráter exclusivamente informativo e educacional. Não constitui aconselhamento jurídico.
            A análise de cada caso é individualizada e não há garantia de êxito. A atuação observa
            integralmente as normas do Código de Ética e Disciplina da OAB.
          </p>
          <p className="text-white/25 text-xs mt-3">
            © {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA
          </p>
        </div>
      </section>

    </SiteLayout>
  );
}
