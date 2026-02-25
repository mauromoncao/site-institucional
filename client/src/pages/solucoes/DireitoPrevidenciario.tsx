import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, FileText, Shield, ArrowRight,
  MessageCircle, Phone, ChevronDown, Award, Play,
  Clock, AlertCircle, TrendingUp, Ban, Users, Lock,
  HeartPulse, Briefcase, UserCheck, Star,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA   = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página sobre Direito Previdenciário e gostaria de analisar meu benefício.");

/* ─── Sticky CTA mobile ─── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
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
          <FileText className="w-4 h-4" /> Analisar Benefício
        </a>
      </div>
    </div>
  );
}

/* ─── FAQ Item ─── */
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

/* ─── Formulário ─── */
function Formulario() {
  const [form, setForm] = useState({
    nome: "", whatsapp: "", situacao: "", cidade: "", idade: "", contribuicao: "",
  });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero analisar meu benefício previdenciário.\n\n` +
      `📋 *Nome:* ${form.nome}\n` +
      `⚠️ *Situação:* ${form.situacao}\n` +
      `📍 *Cidade/UF:* ${form.cidade}\n` +
      `🎂 *Idade:* ${form.idade || "Não informada"}\n` +
      `📅 *Tempo de contribuição:* ${form.contribuicao || "Não informado"}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };

  if (sent) return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
      <h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3>
      <p className="text-white/70 text-sm">Nossa equipe analisará seu caso e entrará em contato.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome",     label: "Nome completo",  placeholder: "Seu nome",          type: "text" },
        { name: "whatsapp", label: "WhatsApp",        placeholder: "(86) 99999-9999",   type: "tel"  },
        { name: "cidade",   label: "Cidade / UF",     placeholder: "Ex: Parnaíba – PI", type: "text" },
        { name: "idade",    label: "Idade (opcional)", placeholder: "Ex: 58 anos",       type: "text" },
        { name: "contribuicao", label: "Tempo de contribuição (opcional)", placeholder: "Ex: 30 anos", type: "text" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
          <input
            required={f.name !== "idade" && f.name !== "contribuicao"}
            type={f.type} name={f.name} placeholder={f.placeholder}
            value={(form as any)[f.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)}
            onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")}
          />
        </div>
      ))}
      {/* Situação */}
      <div>
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de situação</label>
        <select
          name="situacao" value={form.situacao} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.situacao ? "#fff" : "#ffffff60" }}
        >
          <option value="" disabled>Selecione sua situação...</option>
          <option value="Aposentadoria negada ou atrasada">Aposentadoria negada ou atrasada</option>
          <option value="Auxílio-doença negado ou cessado">Auxílio-doença negado ou cessado</option>
          <option value="Revisão de benefício com valor baixo">Revisão de benefício com valor baixo</option>
          <option value="BPC/LOAS negado">BPC/LOAS negado</option>
          <option value="Pensão por morte negada">Pensão por morte negada</option>
          <option value="Planejamento para aposentadoria">Planejamento para aposentadoria</option>
          <option value="Outro benefício ou situação">Outro benefício ou situação</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Quero analisar meu benefício →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

/* ═══════════════ PÁGINA PRINCIPAL ═══════════════ */
export default function DireitoPrevidenciario() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || WA;

  return (
    <SiteLayout>
      <SEOHead
        title="Direito Previdenciário — Aposentadoria, BPC e Benefícios do INSS"
        description="Solicite, revise ou recorra de benefícios do INSS: aposentadoria, BPC/LOAS, auxílio-doença. Especialistas em Direito Previdenciário — Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/solucoes/direito-previdenciario"
        keywords="advogado previdenciário, aposentadoria INSS, BPC LOAS, revisão benefício, Piauí Maranhão"
        jsonLd={[
          buildServiceLD({ name: "Direito Previdenciário — Aposentadoria, BPC e Benefícios do INSS", description: "Solicite, revise ou recorra de benefícios do INSS: aposentadoria, BPC/LOAS, auxílio-doença. Especialistas em Direito Previdenciário — Mauro Monção Advogados.", url: "https://mauromoncao.adv.br/solucoes/direito-previdenciario" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Direito Previdenciário", url: "/solucoes/direito-previdenciario" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden text-white"
        style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}
      >
        {/* Background image with overlays */}
        <div className="absolute inset-0">
          <img
            src="/lp-direito-previdenciario-hero.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(90deg, rgba(7,24,46,0.97) 0%, rgba(7,24,46,0.88) 45%, rgba(7,24,46,0.30) 100%)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(7,24,46,0.85) 0%, transparent 40%)" }}
          />
        </div>
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left – headline */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Direito Previdenciário · INSS · Defesa do Segurado
              </div>
              <h1
                className="font-serif font-bold leading-[1.1] text-white mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)" }}
              >
                O INSS negou ou cortou{" "}
                <em className="not-italic" style={{ color: GOLD }}>
                  seu benefício?
                </em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                Defesa técnica dos seus direitos previdenciários — concessão, revisão e ações judiciais
                contra negativas indevidas do INSS, conduzidas com rigor e experiência.
              </p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield,   text: "Atuação administrativa e judicial" },
                  { icon: Award,    text: "+15 anos de experiência" },
                  { icon: Lock,     text: "Sigilo garantido" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} /> {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#formulario"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}
                >
                  <FileText className="w-4 h-4" /> Analisar meu benefício
                </a>
                <a
                  href={`https://wa.me/${WA}?text=${WA_MSG}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}
                >
                  <MessageCircle className="w-4 h-4" /> Falar com especialista agora
                </a>
              </div>
            </div>

            {/* Right – floating glass card */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div
                className="w-72 rounded-3xl p-6 shadow-2xl"
                style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Você está nessa situação?</p>
                <div className="space-y-3">
                  {[
                    "Benefício negado pelo INSS",
                    "Auxílio-doença cortado indevidamente",
                    "Aposentadoria atrasada ou recusada",
                    "Valor do benefício abaixo do correto",
                    "Pensão por morte indeferida",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${GOLD}25` }}
                      >
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
                    <FileText className="w-4 h-4" /> Analisar meu benefício
                  </a>
                </div>
              </div>
              <div
                className="w-72 rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ background: "rgba(7,24,46,0.75)", border: `1px solid ${GOLD}30`, backdropFilter: "blur(12px)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${GOLD}20` }}
                >
                  <Users className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Você contribuiu — você tem direito</p>
                  <p className="text-white/55 text-xs mt-0.5">A negativa do INSS não é definitiva</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/30" />
        </div>
      </section>

      {/* ── BLOCO DA DOR ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Problema</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Quem trabalhou uma vida inteira{" "}
              <span style={{ color: GOLD }}>merece receber o que é seu.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              { icon: Ban,          title: "Benefício negado sem explicação clara",   text: "O INSS nega sem fundamentar adequadamente. Muitas negativas são ilegais e podem ser revertidas administrativa ou judicialmente." },
              { icon: HeartPulse,   title: "Auxílio-doença cortado precocemente",     text: "Perícias médicas conduzidas de forma inadequada resultam em cessação indevida. O trabalhador ainda incapaz perde sua renda." },
              { icon: TrendingUp,   title: "Aposentadoria com valor abaixo do correto", text: "Erros no cálculo, tempo de contribuição não reconhecido ou salários desconsiderados reduzem injustamente o benefício." },
              { icon: Clock,        title: "Anos de espera sem previsão de concessão", text: "Processos administrativos arrastam-se por meses ou anos, deixando o segurado sem renda e sem perspectiva." },
              { icon: AlertCircle,  title: "Tempo de serviço não reconhecido",         text: "Períodos rurais, informais, insalubres ou perigosos frequentemente não são contabilizados corretamente pelo INSS." },
              { icon: Briefcase,    title: "Trabalhador rural sem acesso ao benefício", text: "Pequenos agricultores, pescadores e trabalhadores rurais enfrentam dificuldades específicas para provar o tempo de trabalho." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "#e5e7eb", background: "#fafaf9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${NAVY}10` }}>
                  <Icon className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `1px solid ${GOLD}30` }}
          >
            <p className="text-white font-serif text-xl font-bold">
              "A negativa do INSS não é a última palavra.{" "}
              <span style={{ color: GOLD }}>A lei está do seu lado."</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── CONSEQUÊNCIA ── */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Riscos de Não Agir</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              Cada dia sem agir{" "}
              <span style={{ color: GOLD }}>pode custar mais do que você imagina.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Perda de competências",         text: "Prazos processuais correm independentemente. Perdê-los pode inviabilizar a ação." },
              { n: "02", title: "Prescrição de valores",          text: "Benefícios atrasados prescrevem. Quanto mais tempo, menos você pode recuperar." },
              { n: "03", title: "Insegurança financeira",         text: "Sem renda previdenciária, dívidas se acumulam e a qualidade de vida cai." },
              { n: "04", title: "Dependência de terceiros",       text: "Sem benefício, muitos ficam dependentes de familiares ou de outras fontes instáveis." },
              { n: "05", title: "Agravamento de saúde",           text: "Sem auxílio-doença, o trabalhador retorna ao trabalho antes de estar recuperado." },
              { n: "06", title: "Direitos definitivamente perdidos", text: "Sem representação técnica, direitos legítimos podem ser desconsiderados permanentemente." },
            ].map(({ n, title, text }) => (
              <div key={n} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: `${GOLD}20` }}>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mb-3"
                  style={{ background: NAVY, color: GOLD }}
                >{n}</div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTORIDADE / BASE LEGAL ── */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Base Jurídica</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Atuação fundamentada em{" "}
              <span style={{ color: GOLD }}>legislação e jurisprudência</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              "Constituição Federal – Art. 201: direitos do segurado e critérios de benefício",
              "Lei 8.213/91 (Lei de Benefícios da Previdência Social) e regulamento",
              "Lei 8.742/93 (LOAS) – Benefício de Prestação Continuada (BPC)",
              "Jurisprudência do STJ e TRF favorável ao segurado",
              "Reconhecimento de períodos especiais, rurais e de trabalho informal",
              "Prazos de recurso e mandados de segurança contra atos do INSS",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}20` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: `${GOLD}20`, color: GOLD }}
                >{i + 1}</div>
                <span className="text-white/85 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}>
            <p className="font-serif text-lg font-bold text-white">
              "Quem contribuiu tem direito.{" "}
              <span style={{ color: GOLD }}>Quem foi lesado tem recurso."</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── COMO TRABALHAMOS ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como conduzimos seu caso</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Cada caso previdenciário é único. Atuamos com análise técnica e estratégia personalizada.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { n: "01", title: "Análise documental completa",         text: "Levantamento do CNIS, carta de concessão ou negativa, laudos médicos, vínculos empregatícios e histórico contributivo." },
              { n: "02", title: "Avaliação da situação previdenciária", text: "Identificação dos benefícios aplicáveis, viabilidade de concessão ou revisão e estratégia mais adequada." },
              { n: "03", title: "Recurso administrativo ao INSS",       text: "Elaboração técnica de recurso ou pedido de reconsideração dentro dos prazos legais." },
              { n: "04", title: "Ação judicial se necessário",          text: "Impetração de ação previdenciária na Justiça Federal, com pedido de tutela de urgência quando cabível." },
              { n: "05", title: "Reconhecimento de tempo especial",     text: "Levantamento e comprovação de períodos em condições especiais, insalubres ou perigosas." },
              { n: "06", title: "Reconhecimento de trabalho rural",     text: "Documentação e estratégia específica para segurados especiais e trabalhadores rurais." },
              { n: "07", title: "Revisão e cálculo do benefício",       text: "Verificação da memória de cálculo, possíveis períodos desconsiderados e valores pagos a menor." },
              { n: "08", title: "Acompanhamento do processo",           text: "Monitoramento constante, atualizações periódicas e comunicação clara em cada etapa." },
              { n: "09", title: "Defesa em cessações indevidas",        text: "Impugnação imediata de cessação de auxílio-doença e demais benefícios por incapacidade." },
            ].map(({ n, title, text }) => (
              <div
                key={n}
                className="rounded-2xl p-6 border hover:shadow-md transition-all"
                style={{ borderColor: `${GOLD}25`, background: "#fafaf9" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4"
                  style={{ background: NAVY, color: GOLD }}
                >{n}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÍDEO ── */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda Seus Direitos</span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              O INSS negou? Saiba o que fazer<br />antes que os prazos se esgotem.
            </h2>
          </div>
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `2px solid ${GOLD}30` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl"
                style={{ background: GOLD }}
              >
                <Play className="w-8 h-8 ml-1" style={{ color: NAVY }} />
              </div>
              <p className="text-white/80 text-sm font-medium">Vídeo institucional · 60–90 segundos</p>
              <p className="text-white/40 text-xs">Compatível com YouTube, Vimeo e outros players</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Dr. Mauro Monção explica como proteger seus direitos perante o INSS.
          </p>
        </div>
      </section>

      {/* ── DIFERENCIAÇÃO ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Diferenciais</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              Por que escolher nossa equipe?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: UserCheck,  title: "Análise individualizada de cada caso",  text: "Não existe uma fórmula única. Cada segurado tem uma história, e a estratégia jurídica acompanha essa singularidade." },
              { icon: FileText,   title: "Linguagem clara e acessível",            text: "Direito Previdenciário tem muita burocracia. Explicamos cada passo em linguagem que você entende." },
              { icon: Star,       title: "Atuação administrativa e judicial",      text: "Cobrimos desde a fase administrativa no INSS até a ação judicial na Justiça Federal, sem lacunas de defesa." },
              { icon: Lock,       title: "Compatível com normas da OAB",          text: "Conduta ética e responsável, sem promessas de resultado. Transparência absoluta em cada etapa do processo." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: `${GOLD}20`, background: "#fafaf9" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: NAVY }}>
                  <Icon className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Dúvidas Frequentes</span>
            <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "O INSS negou meu benefício. Ainda tenho como receber?",     a: "Sim. A negativa administrativa não é definitiva. É possível interpor recurso ao Conselho de Recursos da Previdência Social (CRPS) ou ingressar com ação judicial. A análise do caso é o primeiro passo." },
              { q: "Meu auxílio-doença foi cortado mas ainda estou incapaz. E agora?", a: "Você pode impugnar a cessação imediatamente, com pedido de restabelecimento administrativo e, se necessário, ação judicial com pedido de tutela de urgência para suspender o corte." },
              { q: "Como provar tempo de trabalho rural para o INSS?",           a: "A legislação admite prova documental e testemunhal. Documentos como notas fiscais, contratos de arrendamento, declarações do sindicato rural e outros podem ser utilizados." },
              { q: "Posso pedir revisão da minha aposentadoria já concedida?",   a: "Sim. Revisões são possíveis quando há erro no cálculo, salários desconsiderados, tempo de serviço não computado ou benefício concedido com base em legislação mais restritiva." },
              { q: "Quanto tempo demora uma ação previdenciária?",               a: "O prazo varia. Ações na Justiça Federal com pedido de tutela de urgência podem resultar em restabelecimento em semanas. Casos mais complexos levam entre 1 a 3 anos. A análise prévia estima melhor o prazo." },
              { q: "O que é o BPC/LOAS e quem tem direito?",                    a: "É um benefício de R$ 1 salário mínimo mensal para idosos acima de 65 anos ou pessoas com deficiência que comprovem não ter meios de prover o próprio sustento. Não exige contribuição prévia ao INSS." },
            ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL + FORMULÁRIO ── */}
      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg, #07182e, ${NAVY})` }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Esquerda */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise Previdenciária</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Você não precisa enfrentar o INSS{" "}
                <span style={{ color: GOLD }}>sozinho.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Nossa equipe analisa sua situação previdenciária com rigor técnico e apresenta
                um diagnóstico claro sobre a viabilidade jurídica do seu caso.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Análise documental do seu caso",
                  "Avaliação de benefícios aplicáveis",
                  "Estratégia jurídica personalizada",
                  "Recurso administrativo ao INSS",
                  "Ação judicial com pedido de urgência",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${WA}?text=${WA_MSG}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  <MessageCircle className="w-4 h-4" /> Falar pelo WhatsApp
                </a>
                <a
                  href="tel:+5586994820054"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: `${GOLD}50`, color: GOLD }}
                >
                  <Phone className="w-4 h-4" /> (86) 99482-0054
                </a>
              </div>
            </div>

            {/* Direita – formulário */}
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}
            >
              <h3 className="font-serif text-xl font-bold text-white mb-2">Analise seu benefício previdenciário.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados para um diagnóstico personalizado do seu caso.</p>
              <Formulario />
            </div>
          </div>
        </div>
      </section>

      {/* ── Rodapé legal ── */}
      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}>
        <div className="container text-center">
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">
            Esta página tem caráter exclusivamente informativo. Não constitui aconselhamento jurídico. Sem garantia de resultado.
            Atuação em conformidade com o Código de Ética e Disciplina da OAB.
          </p>
          <p className="text-white/25 text-xs mt-3">© {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA</p>
        </div>
      </section>
    </SiteLayout>
  );
}
