import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import { CheckCircle, FileText, Shield, MessageCircle, Phone, ChevronDown, Award, Play, Lock, TrendingUp, Search, Coins, RefreshCw, ArrowRight } from "lucide-react";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";

const GOLD = "#E8B84B"; const NAVY = "#19385C"; const WA = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página sobre Recuperação Tributária e gostaria de analisar créditos da minha empresa.");

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const h = () => setVisible(window.scrollY > 400); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`} style={{ background: NAVY, borderTop: `2px solid ${GOLD}` }}>
      <div className="flex gap-2 p-3">
        <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ background: "#25D366", color: "#fff" }}><MessageCircle className="w-4 h-4" /> WhatsApp</a>
        <a href="#formulario" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ background: GOLD, color: NAVY }}><FileText className="w-4 h-4" /> Analisar Créditos</a>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden border transition-all" style={{ borderColor: open ? `${GOLD}40` : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <span className="text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown className="w-5 h-5 shrink-0 transition-transform" style={{ color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
      </button>
      {open && <div className="px-6 pb-5"><p className="text-white/70 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

function Formulario() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", regime: "", setor: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Olá! Quero analisar oportunidades de recuperação tributária.\n\n📋 *Nome/Empresa:* ${form.nome}\n📊 *Regime tributário:* ${form.regime}\n🏭 *Setor:* ${form.setor}\n📍 *Cidade/UF:* ${form.cidade}`);
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank"); setSent(true);
  };
  if (sent) return (<div className="text-center py-12"><CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} /><h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3><p className="text-white/70 text-sm">Nossa equipe iniciará a análise de créditos tributários.</p></div>);
  return (
    <form onSubmit={submit} className="space-y-4">
      {[{ name: "nome", label: "Nome / Razão Social", placeholder: "Sua empresa", type: "text" }, { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" }, { name: "setor", label: "Setor de atuação", placeholder: "Ex: Comércio, Serviços, Indústria", type: "text" }, { name: "cidade", label: "Cidade / UF", placeholder: "Ex: Parnaíba – PI", type: "text" }].map((f) => (
        <div key={f.name}><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
          <input required type={f.type} name={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all" style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)} onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")} /></div>
      ))}
      <div><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Regime tributário atual</label>
        <select name="regime" value={form.regime} onChange={handle} required className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.regime ? "#fff" : "#ffffff60" }}>
          <option value="" disabled>Selecione...</option>
          <option value="Simples Nacional">Simples Nacional</option>
          <option value="Lucro Presumido">Lucro Presumido</option>
          <option value="Lucro Real">Lucro Real</option>
          <option value="Pessoa Física / MEI">Pessoa Física / MEI</option>
          <option value="Não sei informar">Não sei informar</option>
        </select>
      </div>
      <button type="submit" className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2" style={{ background: GOLD, color: NAVY }}>Quero identificar meus créditos →</button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

export default function RecuperacaoTributaria() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Recuperação Tributária — Créditos de PIS, COFINS, ICMS e Mais"
        description="Identifique e recupere tributos pagos indevidamente: PIS, COFINS, ICMS, IRPJ, CSLL. Análise gratuita da sua empresa com Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/solucoes/recuperacao-tributaria"
        keywords="recuperação tributária, créditos PIS COFINS, restituição ICMS, tributos pagos a mais"
        jsonLd={[
          buildServiceLD({ name: "Recuperação Tributária — Créditos de PIS, COFINS, ICMS e Mais", description: "Identifique e recupere tributos pagos indevidamente: PIS, COFINS, ICMS, IRPJ, CSLL. Análise gratuita da sua empresa com Mauro Monção Advogados.", url: "https://mauromoncao.adv.br/solucoes/recuperacao-tributaria" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Recuperação Tributária", url: "/solucoes/recuperacao-tributaria" }]),
          buildOrganizationLD(),
        ]}
      />
<StickyCTA />
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-recuperacao-tributaria-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(7,24,46,0.97) 0%,rgba(7,24,46,0.88) 45%,rgba(7,24,46,0.30) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,24,46,0.85) 0%,transparent 40%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}>
                <Search className="w-3.5 h-3.5" />Direito Tributário · Recuperação de Créditos · Eficiência Fiscal
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
                Sua empresa pode estar pagando{" "}<em className="not-italic" style={{ color: GOLD }}>mais tributos do que deve.</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">Revisão de recolhimentos, identificação de créditos e teses tributárias aplicáveis para <strong className="text-white">recuperar o que foi pago a maior</strong> e reduzir a carga fiscal futura.</p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[{ icon: Shield, text: "Análise técnica e individualizada" }, { icon: Award, text: "+15 anos de experiência tributária" }, { icon: Coins, text: "Identificação de créditos e teses" }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75"><Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} /> {text}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg" style={{ background: GOLD, color: NAVY }}><FileText className="w-4 h-4" /> Analisar créditos tributários</a>
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}><MessageCircle className="w-4 h-4" /> Falar com especialista</a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="w-72 rounded-3xl p-6 shadow-2xl" style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Oportunidades comuns</p>
                <div className="space-y-3">
                  {["PIS/COFINS recolhidos a maior", "IRPJ/CSLL com base de cálculo incorreta", "Tributos sobre receitas excluídas", "Exclusão do ICMS do PIS/COFINS", "Créditos de insumos não aproveitados"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}25` }}><CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} /></div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: `${GOLD}25` }}>
                  <a href="#formulario" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all" style={{ background: GOLD, color: NAVY }}><ArrowRight className="w-4 h-4" /> Identificar meus créditos</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"><ChevronDown className="w-6 h-6 text-white/30" /></div>
      </section>

      <section className="py-20 bg-white"><div className="container max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Problema</span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>A maioria das empresas paga mais{" "}<span style={{ color: GOLD }}>do que a lei exige.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {[
            { icon: Search, title: "Recolhimentos feitos sem análise técnica", text: "Declarações e guias preenchidas sem revisão profunda frequentemente resultam em pagamentos acima do necessário." },
            { icon: Coins, title: "Teses tributárias não aproveitadas", text: "Decisões do STF e STJ criam oportunidades legítimas de recuperação que passam despercebidas sem orientação especializada." },
            { icon: RefreshCw, title: "Créditos de insumos não compensados", text: "Créditos de PIS/COFINS, IPI e ICMS gerados em operações normais e não aproveitados geram acúmulo desnecessário." },
            { icon: TrendingUp, title: "Regime tributário inadequado para o perfil", text: "Muitas empresas operam no regime errado e pagam sistematicamente mais tributos do que pagariam com a estrutura correta." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "#e5e7eb", background: "#fafaf9" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${NAVY}10` }}><Icon className="w-5 h-5" style={{ color: NAVY }} /></div>
              <div><h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{text}</p></div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `1px solid ${GOLD}30` }}>
          <p className="text-white font-serif text-xl font-bold">"Recuperar tributos pagos indevidamente{" "}<span style={{ color: GOLD }}>não é agressividade fiscal. É direito."</span></p>
        </div>
      </div></section>

      <section className="py-20" style={{ background: "#f7f5f0" }}><div className="container max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Consequências</span>
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Cada ano sem revisão{" "}<span style={{ color: GOLD }}>é caixa perdido.</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Prescrição quinquenal", text: "Créditos com mais de 5 anos não podem ser recuperados. A análise anual é estratégica." },
            { n: "02", title: "Capital de giro drenado", text: "Tributos pagos a maior comprometem o fluxo de caixa e a capacidade de investimento." },
            { n: "03", title: "Desvantagem competitiva", text: "Concorrentes com planejamento fiscal eficiente operam com custos menores e preços mais competitivos." },
            { n: "04", title: "Oportunidades de tese perdidas", text: "Janelas de aproveitamento de teses tributárias têm prazo. A inação tem custo financeiro direto." },
            { n: "05", title: "Créditos acumulados sem uso", text: "Créditos de PIS/COFINS e outros tributos não aproveitados representam capital imobilizado e ineficiente." },
            { n: "06", title: "Planejamento fiscal reativo", text: "Sem revisão periódica, a empresa apenas responde a cobranças em vez de construir eficiência fiscal proativa." },
          ].map(({ n, title, text }) => (
            <div key={n} className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: `${GOLD}20` }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm mb-3" style={{ background: NAVY, color: GOLD }}>{n}</div>
              <h3 className="font-bold text-sm mb-1.5" style={{ color: NAVY }}>{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}><div className="container max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Base Jurídica</span>
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Fundamentos legais{" "}<span style={{ color: GOLD }}>consolidados</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {["Código Tributário Nacional – art. 165: direito à restituição de tributo pago indevidamente", "Prazo prescricional de 5 anos para pedido de restituição ou compensação (CTN art. 168)", "Tese da exclusão do ICMS da base do PIS/COFINS – STF RE 574.706 (Tema 69)", "Lei 9.430/96 – compensação de créditos tributários federais via DCOMP", "Jurisprudência consolidada no STJ sobre restituição de recolhimentos indevidos", "PER/DCOMP (Pedido Eletrônico de Restituição, Ressarcimento ou Reembolso e Declaração de Compensação)"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}20` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm" style={{ background: `${GOLD}20`, color: GOLD }}>{i + 1}</div>
              <span className="text-white/85 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}>
          <p className="font-serif text-lg font-bold text-white">"Quem pagou a mais tem o direito de receber de volta.{" "}<span style={{ color: GOLD }}>A análise técnica revela o quanto."</span></p>
        </div>
      </div></section>

      <section className="py-20 bg-white"><div className="container max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como identificamos e recuperamos seus créditos</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { n: "01", title: "Revisão fiscal dos últimos 5 anos", text: "Análise das declarações, guias e recolhimentos realizados para identificar valores pagos além do exigível." },
            { n: "02", title: "Mapeamento de teses aplicáveis", text: "Verificação das teses tributárias reconhecidas judicialmente que podem gerar créditos para o contribuinte." },
            { n: "03", title: "Identificação de créditos acumulados", text: "Levantamento de créditos de PIS/COFINS, IPI, ICMS e outros tributos não aproveitados nas escriturações." },
            { n: "04", title: "Pedido de restituição (PER/DCOMP)", text: "Elaboração e protocolo eletrônico do pedido de restituição ou compensação na Receita Federal." },
            { n: "05", title: "Ação judicial quando necessário", text: "Ingresso com ação de repetição de indébito tributário quando o caminho administrativo não é eficiente." },
            { n: "06", title: "Estrutura para eficiência futura", text: "Orientações para evitar novos recolhimentos indevidos e construir rotina de revisão fiscal preventiva." },
          ].map(({ n, title, text }) => (
            <div key={n} className="rounded-2xl p-6 border hover:shadow-md transition-all" style={{ borderColor: `${GOLD}25`, background: "#fafaf9" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4" style={{ background: NAVY, color: GOLD }}>{n}</div>
              <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="py-20" style={{ background: "#f7f5f0" }}><div className="container max-w-3xl">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda o Processo</span>
          <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>Como recuperamos tributos pagos<br />indevidamente pela sua empresa.</h2>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `2px solid ${GOLD}30` }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl" style={{ background: GOLD }}><Play className="w-8 h-8 ml-1" style={{ color: NAVY }} /></div>
            <p className="text-white/80 text-sm font-medium">Vídeo explicativo · 60–90 segundos</p>
            <p className="text-white/40 text-xs">Compatível com YouTube e Vimeo</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção explica como funciona a recuperação tributária na prática.</p>
      </div></section>

      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}><div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Dúvidas Frequentes</span>
          <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
        </div>
        <div className="space-y-3">
          {[
            { q: "Qualquer empresa pode recuperar tributos?", a: "A viabilidade depende da análise das declarações e recolhimentos. Empresas de todos os regimes (Simples, Lucro Presumido, Lucro Real) podem ter oportunidades, mas cada caso é diferente." },
            { q: "O processo de recuperação afeta o relacionamento com a Receita Federal?", a: "Não. O pedido de restituição ou compensação é um direito legal e segue rito administrativo formal. Quando corretamente fundamentado, é um procedimento regular perante a Receita." },
            { q: "Quanto tempo demora para receber os créditos?", a: "Pedidos administrativos (DCOMP) podem ser homologados em meses. Ações judiciais variam de 1 a 3 anos dependendo do tribunal. A compensação com tributos correntes é geralmente a via mais ágil." },
            { q: "Há risco de a Receita Federal autuar a empresa pelo pedido?", a: "O pedido bem fundamentado, com documentação adequada, é um direito legal e não gera risco de autuação. A análise técnica prévia é essencial para garantir a solidez do pedido." },
            { q: "O que é necessário para iniciar a análise?", a: "Acesso às declarações dos últimos 5 anos (ECD, ECF, SPED), guias de recolhimento, contratos e informações operacionais. A análise define o potencial antes de qualquer pedido formal." },
          ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </div></section>

      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg,#07182e,${NAVY})` }}><div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise de Créditos</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">Sua empresa pode ter créditos{" "}<span style={{ color: GOLD }}>esperando para ser recuperados.</span></h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">Nossa equipe faz o levantamento completo das oportunidades tributárias aplicáveis ao seu negócio.</p>
            <div className="space-y-3 mb-8">
              {["Revisão fiscal dos últimos 5 anos", "Identificação de teses aplicáveis", "Levantamento de créditos acumulados", "Pedido de restituição ou compensação", "Estratégia para eficiência fiscal futura"].map((item) => (
                <div key={item} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} /><span className="text-white/80 text-sm">{item}</span></div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all" style={{ background: "#25D366", color: "#fff" }}><MessageCircle className="w-4 h-4" /> Falar pelo WhatsApp</a>
              <a href="tel:+5586994820054" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{ borderColor: `${GOLD}50`, color: GOLD }}><Phone className="w-4 h-4" /> (86) 99482-0054</a>
            </div>
          </div>
          <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Analise os créditos tributários da sua empresa.</h3>
            <p className="text-white/60 text-sm mb-6">Preencha os dados para uma análise preliminar das oportunidades de recuperação.</p>
            <Formulario />
          </div>
        </div>
      </div></section>

      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}><div className="container text-center">
        <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">Esta página tem caráter exclusivamente informativo. Não constitui aconselhamento jurídico. A viabilidade de recuperação depende de análise individualizada de cada caso. Sem garantia de resultado. Atuação em conformidade com o Código de Ética e Disciplina da OAB.</p>
        <p className="text-white/25 text-xs mt-3">© {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA</p>
      </div></section>
    </SiteLayout>
  );
}
