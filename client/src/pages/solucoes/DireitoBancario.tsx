import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, AlertCircle, FileText, Shield, ArrowRight,
  MessageCircle, Phone, ChevronDown, Award, Play,
  CreditCard, TrendingDown, Ban, AlertTriangle, Landmark, Lock,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA   = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página sobre Direito Bancário e gostaria de analisar meu contrato.");

/* ─── Sticky CTA mobile ─── */
function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}
      style={{ background: NAVY, borderTop: `2px solid ${GOLD}` }}>
      <div className="flex gap-2 p-3">
        <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: "#25D366", color: "#fff" }}>
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <a href="#formulario"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
          style={{ background: GOLD, color: NAVY }}>
          <FileText className="w-4 h-4" /> Analisar Contrato
        </a>
      </div>
    </div>
  );
}

/* ─── FAQ ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all"
      style={{ borderColor: open ? `${GOLD}40` : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <span className="text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown className="w-5 h-5 shrink-0 transition-transform"
          style={{ color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && <div className="px-6 pb-5"><p className="text-white/70 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

/* ─── Formulário ─── */
function Formulario() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", tipo: "pf", problema: "", valor: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero analisar meu contrato bancário.\n\n` +
      `📋 *Nome:* ${form.nome}\n` +
      `👤 *Tipo:* ${form.tipo === "pf" ? "Pessoa Física" : "Pessoa Jurídica"}\n` +
      `⚠️ *Problema:* ${form.problema}\n` +
      `💰 *Valor da dívida:* ${form.valor || "Não informado"}\n` +
      `📍 *Cidade/UF:* ${form.cidade}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };

  if (sent) return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
      <h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3>
      <p className="text-white/70 text-sm">Nossa equipe entrará em contato para analisar seu caso.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome",      label: "Nome completo",      placeholder: "Seu nome",           type: "text" },
        { name: "whatsapp",  label: "WhatsApp",           placeholder: "(86) 99999-9999",    type: "tel"  },
        { name: "valor",     label: "Valor aproximado da dívida (opcional)", placeholder: "Ex: R$ 50.000", type: "text" },
        { name: "cidade",    label: "Cidade / UF",        placeholder: "Ex: Parnaíba – PI",  type: "text" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
          <input required={f.name !== "valor"} type={f.type} name={f.name} placeholder={f.placeholder}
            value={(form as any)[f.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)}
            onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")} />
        </div>
      ))}
      {/* Tipo */}
      <div>
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Pessoa Física ou Jurídica</label>
        <select name="tipo" value={form.tipo} onChange={handle}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}>
          <option value="pf">Pessoa Física</option>
          <option value="pj">Pessoa Jurídica</option>
        </select>
      </div>
      {/* Problema */}
      <div>
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de problema</label>
        <select name="problema" value={form.problema} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.problema ? "#fff" : "#ffffff60" }}>
          <option value="" disabled>Selecione...</option>
          <option value="Juros abusivos">Juros abusivos</option>
          <option value="Negativação indevida">Negativação indevida</option>
          <option value="Fraude bancária">Fraude bancária</option>
          <option value="Revisão de financiamento">Revisão de financiamento</option>
          <option value="Renegociação de dívida">Renegociação de dívida</option>
        </select>
      </div>
      <button type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}>
        Quero analisar meu contrato →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

/* ═══════════════ PÁGINA ═══════════════ */
export default function DireitoBancario() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || WA;

  return (
    <SiteLayout>
      <SEOHead
        title="Direito Bancário — Revisão de Contratos e Defesa contra Bancos"
        description="Revise contratos bancários abusivos, juros excessivos, cobranças indevidas e negativação injusta. Mauro Monção Advogados especialistas em Direito Bancário."
        canonical="https://mauromoncao.adv.br/solucoes/direito-bancario"
        keywords="revisão contrato bancário, juros abusivos, negativação indevida, advogado bancário Piauí"
        jsonLd={[
          buildServiceLD({ name: "Direito Bancário — Revisão de Contratos e Defesa contra Bancos", description: "Revise contratos bancários abusivos, juros excessivos, cobranças indevidas e negativação injusta. Mauro Monção Advogados especialistas em Direito Bancário.", url: "https://mauromoncao.adv.br/solucoes/direito-bancario" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Direito Bancário", url: "/solucoes/direito-bancario" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-direito-bancario-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(7,24,46,0.97) 0%, rgba(7,24,46,0.88) 45%, rgba(7,24,46,0.30) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,24,46,0.85) 0%, transparent 40%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Esquerda */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}>
                <CreditCard className="w-3.5 h-3.5" />
                Direito Bancário · CDC · Proteção do Consumidor
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)" }}>
                O banco pode estar cobrando{" "}
                <em className="not-italic" style={{ color: GOLD }}>mais do que deveria.</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                Defesa jurídica contra <strong className="text-white">juros abusivos</strong>, cláusulas ilegais,
                fraudes e negativação indevida, com base no Código de Defesa do Consumidor.
              </p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield,   text: "Base no CDC" },
                  { icon: Award,    text: "+15 anos de experiência" },
                  { icon: Lock,     text: "Sigilo garantido" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} /> {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}>
                  <FileText className="w-4 h-4" /> Solicitar análise contratual
                </a>
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}>
                  <MessageCircle className="w-4 h-4" /> Falar com especialista agora
                </a>
              </div>
            </div>

            {/* Direita — cards flutuantes */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="w-72 rounded-3xl p-6 shadow-2xl"
                style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Você passa por isso?</p>
                <div className="space-y-3">
                  {[
                    "Dívida que não diminui pagando",
                    "Nome negativado sem aviso",
                    "Juros acima do mercado",
                    "Descontos indevidos em conta",
                    "Fraude ou golpe digital",
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
                  <a href="#formulario"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all"
                    style={{ background: GOLD, color: NAVY }}>
                    <FileText className="w-4 h-4" /> Analisar meu contrato
                  </a>
                </div>
              </div>
              <div className="w-72 rounded-2xl px-5 py-4 flex items-center gap-4"
                style={{ background: "rgba(7,24,46,0.75)", border: `1px solid ${GOLD}30`, backdropFilter: "blur(12px)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${GOLD}20` }}>
                  <Landmark className="w-5 h-5" style={{ color: GOLD }} />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Relação bancária é de consumo</p>
                  <p className="text-white/55 text-xs mt-0.5">CDC aplica-se integralmente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/30" />
        </div>
      </section>

      {/* ── DOR ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Problema</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              O contrato bancário não pode ser{" "}
              <span style={{ color: GOLD }}>instrumento de abuso.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              { icon: TrendingDown, title: "Juros que não param de crescer",    text: "Empréstimos e financiamentos com taxas acima do mercado — a dívida cresce mais rápido que os pagamentos." },
              { icon: Ban,          title: "Nome negativado sem aviso",          text: "Inscrição no SPC/Serasa sem comunicação prévia adequada gera direito à indenização por dano moral." },
              { icon: CreditCard,   title: "Descontos indevidos em conta",       text: "Descontos em benefícios do INSS, conta salário ou conta corrente realizados sem autorização expressa." },
              { icon: AlertTriangle,title: "Fraudes e golpes digitais",          text: "Bancos têm responsabilidade objetiva por fraudes e transações não reconhecidas. A lei protege o consumidor." },
              { icon: FileText,     title: "Cláusulas impossíveis de entender",  text: "Contratos com linguagem técnica inacessível e condições que favorecem exclusivamente a instituição." },
              { icon: TrendingDown, title: "Dívida que não diminui",             text: "Parcelas pagas regularmente e o saldo devedor continua igual ou maior — sinal claro de abuso contratual." },
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
          <div className="rounded-2xl p-6 text-center"
            style={{ background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `1px solid ${GOLD}30` }}>
            <p className="text-white font-serif text-xl font-bold">
              "O contrato bancário não pode ser instrumento de abuso.{" "}
              <span style={{ color: GOLD }}>Você tem direitos."</span>
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
              Silenciar diante do abuso{" "}
              <span style={{ color: GOLD }}>só fortalece o problema.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Endividamento progressivo",     text: "Juros sobre juros aumentam a dívida exponencialmente." },
              { n: "02", title: "Comprometimento da renda",       text: "Parcelas crescentes comprometem cada vez mais sua renda mensal." },
              { n: "03", title: "Restrição de crédito",           text: "Negativação impede acesso a crédito, financiamentos e oportunidades." },
              { n: "04", title: "Execução judicial",              text: "Banco pode mover ação de execução e penhorar bens e contas." },
              { n: "05", title: "Perda de patrimônio",            text: "Garantias reais podem ser executadas — imóveis, veículos, equipamentos." },
              { n: "06", title: "Dano moral e financeiro",        text: "Negativação indevida e cobrança abusiva geram danos indenizáveis." },
            ].map(({ n, title, text }) => (
              <div key={n} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: `${GOLD}20` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mb-3"
                  style={{ background: NAVY, color: GOLD }}>{n}</div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BASE LEGAL ── */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Base Jurídica</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              A lei está do{" "}
              <span style={{ color: GOLD }}>seu lado</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              "Relações bancárias são reguladas pelo Código de Defesa do Consumidor",
              "Cláusulas abusivas podem ser revistas e anuladas judicialmente",
              "Juros excessivos podem ser contestados com base na legislação vigente",
              "Negativação indevida gera direito à reparação por dano moral",
              "Fraudes bancárias exigem responsabilidade objetiva da instituição",
              "O consumidor não pode ser surpreendido por cobranças não autorizadas",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}20` }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                  style={{ background: `${GOLD}20`, color: GOLD }}>{i + 1}</div>
                <span className="text-white/85 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6 text-center" style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}>
            <p className="font-serif text-lg font-bold text-white">
              "Nem toda dívida é justa.{" "}
              <span style={{ color: GOLD }}>Nem toda cobrança é legal."</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── COMO TRABALHAMOS ── */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como trabalhamos o seu caso</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              O objetivo é reequilibrar a relação contratual dentro da lei.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { n: "01", title: "Análise contratual completa",     text: "Revisão integral do contrato bancário identificando cláusulas abusivas, juros ilegais e irregularidades." },
              { n: "02", title: "Revisão de cláusulas abusivas",    text: "Identificação e contestação de cláusulas que violam o CDC ou a boa-fé objetiva." },
              { n: "03", title: "Contestação de juros excessivos",  text: "Análise comparativa das taxas aplicadas versus taxas legais e de mercado." },
              { n: "04", title: "Defesa contra negativação",        text: "Ação para remoção imediata do nome dos cadastros e pedido de indenização, quando cabível." },
              { n: "05", title: "Fraudes e golpes digitais",        text: "Apuração de responsabilidade da instituição e medidas para ressarcimento dos valores." },
              { n: "06", title: "Renegociação estratégica",         text: "Condução técnica de renegociação para alcançar condições justas e sustentáveis." },
              { n: "07", title: "Revisão judicial de contratos",    text: "Ação revisional para readequação contratual com base na legislação e jurisprudência." },
              { n: "08", title: "Pedido de indenização",            text: "Quando cabível, ação indenizatória por danos morais e materiais decorrentes do abuso." },
              { n: "09", title: "Defesa em execuções bancárias",    text: "Atuação técnica em embargos à execução e medidas para proteger patrimônio e renda." },
            ].map(({ n, title, text }) => (
              <div key={n} className="rounded-2xl p-6 border hover:shadow-md transition-all"
                style={{ borderColor: `${GOLD}25`, background: "#fafaf9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4"
                  style={{ background: NAVY, color: GOLD }}>{n}</div>
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
              Antes de aceitar o contrato ou a cobrança,<br />entenda seus direitos.
            </h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg, #0f2340, ${NAVY})`, border: `2px solid ${GOLD}30` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl"
                style={{ background: GOLD }}>
                <Play className="w-8 h-8 ml-1" style={{ color: NAVY }} />
              </div>
              <p className="text-white/80 text-sm font-medium">Vídeo institucional · 60–90 segundos</p>
              <p className="text-white/40 text-xs">Compatível com YouTube, Vimeo e outros players</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Dr. Mauro Monção explica como a lei protege você nas relações bancárias.
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
              { icon: Shield,       title: "Atendimento individualizado",        text: "Cada caso é analisado de forma única. Estratégia personalizada para sua situação específica." },
              { icon: FileText,     title: "Linguagem clara e objetiva",         text: "Explicamos tudo de forma acessível. Você entende cada etapa do processo." },
              { icon: Award,        title: "Base no CDC e jurisprudência",        text: "Atuação fundamentada em legislação vigente e precedentes favoráveis ao consumidor." },
              { icon: Lock,         title: "Compatível com normas da OAB",       text: "Conduta ética, responsável, sem promessas de resultado. Transparência em cada etapa." },
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
              { q: "É possível contestar juros já pagos?",                  a: "Em alguns casos é possível pedir a revisão de valores pagos a maior, com restituição ou compensação. A viabilidade depende da análise contratual e do prazo prescricional." },
              { q: "O banco pode me negativar sem aviso prévio?",           a: "Não. A legislação exige comunicação prévia ao devedor. A negativação sem aviso pode gerar direito à indenização por dano moral." },
              { q: "Posso revisar o contrato mesmo já tendo assinado?",     a: "Sim. Cláusulas abusivas podem ser revistas judicialmente a qualquer tempo, independentemente da assinatura. O CDC prevalece sobre o contrato." },
              { q: "E se o problema for com uma financeira, não um banco?", a: "As financeiras também estão sujeitas ao CDC e às mesmas regras de proteção ao consumidor. A atuação é a mesma." },
              { q: "Fraude bancária — o banco é responsável?",              a: "Sim. As instituições financeiras têm responsabilidade objetiva por fraudes e falhas de segurança em suas plataformas. A análise do caso é fundamental." },
            ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA + FORMULÁRIO ── */}
      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg, #07182e, ${NAVY})` }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise Contratual</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Você não precisa enfrentar o banco{" "}
                <span style={{ color: GOLD }}>sozinho.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Nossa equipe analisa seu contrato com rigor técnico e apresenta um diagnóstico claro
                sobre a viabilidade jurídica do seu caso.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Análise contratual completa",
                  "Identificação de cláusulas abusivas",
                  "Estratégia jurídica personalizada",
                  "Defesa contra negativação indevida",
                  "Atuação em fraudes bancárias",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: "#25D366", color: "#fff" }}>
                  <MessageCircle className="w-4 h-4" /> Falar pelo WhatsApp
                </a>
                <a href="tel:+5586994820054"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: `${GOLD}50`, color: GOLD }}>
                  <Phone className="w-4 h-4" /> (86) 99482-0054
                </a>
              </div>
            </div>
            <div className="rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Analise seu contrato bancário.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados para uma análise personalizada do seu caso.</p>
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
