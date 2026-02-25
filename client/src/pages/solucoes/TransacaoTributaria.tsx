import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import { CheckCircle, FileText, Shield, MessageCircle, Phone, ChevronDown, Award, Play, Lock, TrendingUp, AlertTriangle, Handshake, Building2, ArrowRight, RefreshCw } from "lucide-react";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";

const GOLD = "#E8B84B"; const NAVY = "#19385C"; const WA = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página sobre Transação Tributária e gostaria de analisar meu caso.");

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const h = () => setVisible(window.scrollY > 400); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`} style={{ background: NAVY, borderTop: `2px solid ${GOLD}` }}>
      <div className="flex gap-2 p-3">
        <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ background: "#25D366", color: "#fff" }}><MessageCircle className="w-4 h-4" /> WhatsApp</a>
        <a href="#formulario" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm" style={{ background: GOLD, color: NAVY }}><FileText className="w-4 h-4" /> Analisar Débitos</a>
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
  const [form, setForm] = useState({ nome: "", whatsapp: "", tipo: "", divida: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Olá! Preciso analisar minha situação fiscal para transação tributária.\n\n📋 *Nome:* ${form.nome}\n🏢 *Tipo:* ${form.tipo}\n💰 *Valor do débito:* ${form.divida}\n📍 *Cidade/UF:* ${form.cidade}`);
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank"); setSent(true);
  };
  if (sent) return (<div className="text-center py-12"><CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} /><h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3><p className="text-white/70 text-sm">Nossa equipe analisará sua situação fiscal.</p></div>);
  return (
    <form onSubmit={submit} className="space-y-4">
      {[{ name: "nome", label: "Nome / Razão Social", placeholder: "Seu nome ou empresa", type: "text" }, { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" }, { name: "divida", label: "Valor aproximado do débito", placeholder: "Ex: R$ 200.000", type: "text" }, { name: "cidade", label: "Cidade / UF", placeholder: "Ex: Parnaíba – PI", type: "text" }].map((f) => (
        <div key={f.name}><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
          <input required type={f.type} name={f.name} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)} onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")} /></div>
      ))}
      <div><label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de contribuinte</label>
        <select name="tipo" value={form.tipo} onChange={handle} required className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.tipo ? "#fff" : "#ffffff60" }}>
          <option value="" disabled>Selecione...</option>
          <option value="Pessoa Física">Pessoa Física</option>
          <option value="MEI / Microempresa">MEI / Microempresa</option>
          <option value="Empresa de Pequeno Porte">Empresa de Pequeno Porte</option>
          <option value="Empresa de Médio / Grande Porte">Empresa de Médio / Grande Porte</option>
        </select>
      </div>
      <button type="submit" className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2" style={{ background: GOLD, color: NAVY }}>Quero analisar minha situação fiscal →</button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

export default function TransacaoTributaria() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Transação Tributária — Negocie sua Dívida com a Receita Federal"
        description="Regularize dívidas tributárias federais com a Transação Tributária (Receita Federal e PGFN). Condições especiais, descontos e parcelamento. Consulte já."
        canonical="https://mauromoncao.adv.br/solucoes/transacao-tributaria"
        keywords="transação tributária, negociação dívida fiscal, PGFN, parcelamento receita federal, regularização fiscal"
        jsonLd={[
          buildServiceLD({ name: "Transação Tributária — Negocie sua Dívida com a Receita Federal", description: "Regularize dívidas tributárias federais com a Transação Tributária (Receita Federal e PGFN). Condições especiais, descontos e parcelamento. Consulte já.", url: "https://mauromoncao.adv.br/solucoes/transacao-tributaria" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Transação Tributária", url: "/solucoes/transacao-tributaria" }]),
          buildOrganizationLD(),
        ]}
      />
<StickyCTA />
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-transacao-tributaria-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(7,24,46,0.97) 0%,rgba(7,24,46,0.88) 45%,rgba(7,24,46,0.30) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,24,46,0.85) 0%,transparent 40%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}>
                <Handshake className="w-3.5 h-3.5" />Direito Tributário · Transação · Regularização Fiscal
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
                Débito fiscal não precisa ser{" "}<em className="not-italic" style={{ color: GOLD }}>o fim do negócio.</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">A transação tributária é um mecanismo legal de negociação com o Fisco que permite <strong className="text-white">reduzir encargos, parcelar e regularizar débitos</strong> com segurança jurídica.</p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[{ icon: Shield, text: "Base na Lei 13.988/2020" }, { icon: Award, text: "+15 anos de experiência tributária" }, { icon: Lock, text: "Análise sigilosa e individualizada" }].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75"><Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} /> {text}</div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg" style={{ background: GOLD, color: NAVY }}><FileText className="w-4 h-4" /> Analisar minha situação fiscal</a>
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}><MessageCircle className="w-4 h-4" /> Falar com especialista</a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="w-72 rounded-3xl p-6 shadow-2xl" style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Você tem esse problema?</p>
                <div className="space-y-3">
                  {["Débitos na Receita Federal", "Inscrição em dívida ativa", "Execução fiscal em andamento", "Passivo tributário elevado", "Certidão negativa bloqueada"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}25` }}><CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} /></div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: `${GOLD}25` }}>
                  <a href="#formulario" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all" style={{ background: GOLD, color: NAVY }}><ArrowRight className="w-4 h-4" /> Analisar meus débitos</a>
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
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>Passivo fiscal acumulado{" "}<span style={{ color: GOLD }}>paralisa negócios e pessoas.</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {[
            { icon: AlertTriangle, title: "Juros e multas que multiplicam o débito", text: "Débitos tributários acumulam encargos que podem dobrar ou triplicar o valor original, tornando o pagamento à vista impossível." },
            { icon: Building2, title: "Certidão negativa bloqueada", text: "Sem regularidade fiscal, a empresa não emite CND, não participa de licitações e não contrai financiamentos." },
            { icon: TrendingUp, title: "Execução fiscal e risco patrimonial", text: "Com a inscrição em dívida ativa, o Fisco pode ajuizar execução e penhorar bens, contas e direitos." },
            { icon: RefreshCw, title: "Ciclo de irregularidade que se perpetua", text: "Sem saída estruturada, a empresa acumula mais débitos a cada ano e a situação se torna crescentemente inviável." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: "#e5e7eb", background: "#fafaf9" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${NAVY}10` }}><Icon className="w-5 h-5" style={{ color: NAVY }} /></div>
              <div><h3 className="font-bold text-sm mb-1" style={{ color: NAVY }}>{title}</h3><p className="text-gray-500 text-sm leading-relaxed">{text}</p></div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `1px solid ${GOLD}30` }}>
          <p className="text-white font-serif text-xl font-bold">"Transação tributária não é perdão de dívida.{" "}<span style={{ color: GOLD }}>É reorganização fiscal com segurança jurídica."</span></p>
        </div>
      </div></section>

      <section className="py-20" style={{ background: "#f7f5f0" }}><div className="container max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Riscos de Não Agir</span>
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Débito fiscal não tratado{" "}<span style={{ color: GOLD }}>tende a crescer e complicar.</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { n: "01", title: "Bloqueio de ativos via BACENJUD", text: "O Fisco pode solicitar bloqueio judicial de contas e investimentos sem aviso prévio." },
            { n: "02", title: "Penhora de bens", text: "Imóveis, veículos e equipamentos podem ser penhorados para garantia da execução fiscal." },
            { n: "03", title: "Restrições ao sócio", text: "Em casos de responsabilização, os sócios podem ser incluídos na execução fiscal individualmente." },
            { n: "04", title: "Impossibilidade de crescimento", text: "Sem CND, crédito, licitação e parcerias estratégicas ficam inacessíveis." },
            { n: "05", title: "Encargos crescentes", text: "SELIC + multa sobre o débito original aumenta a dívida mês a mês enquanto não há acordo." },
            { n: "06", title: "Perda de oportunidades de negócio", text: "Contratos que exigem certidão negativa são perdidos para concorrentes regularizados." },
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
          <h2 className="font-serif text-3xl font-bold text-white mb-4">Fundamento legal{" "}<span style={{ color: GOLD }}>consolidado</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {["Lei 13.988/2020 – institui a transação tributária federal como modalidade de extinção de crédito", "PGFN e Receita Federal oferecem modalidades específicas com desconto de encargos e parcelamento", "Transação individual para contribuintes com passivo elevado e transação em massa para perfis definidos", "Redução de multas, juros e encargos de mora como resultado da negociação", "Regularidade fiscal e emissão de certidões após celebração do acordo", "CTN art. 156 – transação como forma de extinção do crédito tributário"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}20` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm" style={{ background: `${GOLD}20`, color: GOLD }}>{i + 1}</div>
              <span className="text-white/85 text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-6 text-center" style={{ background: `${GOLD}12`, border: `1.5px solid ${GOLD}40` }}>
          <p className="font-serif text-lg font-bold text-white">"A regularização fiscal abre portas.{" "}<span style={{ color: GOLD }}>A estratégia correta define o custo disso."</span></p>
        </div>
      </div></section>

      <section className="py-20 bg-white"><div className="container max-w-5xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
          <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como conduzimos seu caso</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { n: "01", title: "Diagnóstico fiscal completo", text: "Levantamento de todos os débitos, certidões, execuções e situação perante a Receita Federal e PGFN." },
            { n: "02", title: "Análise de elegibilidade", text: "Identificação das modalidades de transação aplicáveis ao perfil do contribuinte e ao tipo de débito." },
            { n: "03", title: "Estudo de capacidade de pagamento", text: "Avaliação econômico-financeira para definição do melhor cenário de negociação junto ao Fisco." },
            { n: "04", title: "Elaboração da proposta", text: "Preparação técnica da proposta de transação com argumentos jurídicos e documentação necessária." },
            { n: "05", title: "Negociação e acompanhamento", text: "Condução do processo perante a Receita Federal ou PGFN até a formalização do acordo." },
            { n: "06", title: "Manutenção da regularidade", text: "Orientação pós-transação para manutenção do acordo e prevenção de novos débitos." },
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
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda a Transação</span>
          <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>Como funciona a transação tributária<br />e o que ela pode fazer pelo seu negócio.</h2>
        </div>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `2px solid ${GOLD}30` }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl" style={{ background: GOLD }}><Play className="w-8 h-8 ml-1" style={{ color: NAVY }} /></div>
            <p className="text-white/80 text-sm font-medium">Vídeo explicativo · 60–90 segundos</p>
            <p className="text-white/40 text-xs">Compatível com YouTube e Vimeo</p>
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção explica como a transação tributária funciona na prática.</p>
      </div></section>

      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}><div className="container max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Dúvidas Frequentes</span>
          <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
        </div>
        <div className="space-y-3">
          {[
            { q: "Transação tributária é o mesmo que parcelamento?", a: "Não. O parcelamento apenas dilui o débito no tempo sem reduzir encargos. A transação envolve negociação de multas, juros e condições de pagamento, podendo resultar em redução significativa do valor total." },
            { q: "Quem pode fazer transação tributária federal?", a: "Empresas e pessoas físicas com débitos inscritos na dívida ativa da União ou com débitos perante a Receita Federal, dentro das modalidades disponíveis. Há programas específicos por perfil de contribuinte e tipo de débito." },
            { q: "A transação gera quitação total dos débitos?", a: "Sim. Com o cumprimento integral do acordo, o débito é extinto e a regularidade fiscal é restabelecida, permitindo emissão de certidões." },
            { q: "E débitos estaduais e municipais?", a: "A transação federal trata de tributos federais. Para débitos estaduais (ICMS) e municipais (ISS, IPTU), existem mecanismos próprios em cada ente federativo. Atuamos também nesses âmbitos." },
            { q: "Posso fazer transação mesmo com execução fiscal em andamento?", a: "Em muitos casos, sim. A transação pode suspender ou encerrar a execução fiscal como parte do acordo. Cada situação exige análise individualizada." },
          ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
        </div>
      </div></section>

      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg,#07182e,${NAVY})` }}><div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise Fiscal</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">Regularize sua situação fiscal{" "}<span style={{ color: GOLD }}>com estratégia.</span></h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">Nossa equipe analisa seu passivo fiscal e identifica a melhor estratégia de regularização dentro das opções legais disponíveis.</p>
            <div className="space-y-3 mb-8">
              {["Diagnóstico fiscal completo", "Análise de elegibilidade para transação", "Negociação junto à Receita Federal ou PGFN", "Redução de multas e encargos", "Manutenção da regularidade após acordo"].map((item) => (
                <div key={item} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 shrink-0" style={{ color: GOLD }} /><span className="text-white/80 text-sm">{item}</span></div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm hover:brightness-110 transition-all" style={{ background: "#25D366", color: "#fff" }}><MessageCircle className="w-4 h-4" /> Falar pelo WhatsApp</a>
              <a href="tel:+5586994820054" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all" style={{ borderColor: `${GOLD}50`, color: GOLD }}><Phone className="w-4 h-4" /> (86) 99482-0054</a>
            </div>
          </div>
          <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}>
            <h3 className="font-serif text-xl font-bold text-white mb-2">Analise sua situação tributária.</h3>
            <p className="text-white/60 text-sm mb-6">Preencha os dados para um diagnóstico personalizado do seu passivo fiscal.</p>
            <Formulario />
          </div>
        </div>
      </div></section>

      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}><div className="container text-center">
        <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">Esta página tem caráter exclusivamente informativo. Não constitui aconselhamento jurídico. Sem garantia de resultado. Atuação em conformidade com o Código de Ética e Disciplina da OAB.</p>
        <p className="text-white/25 text-xs mt-3">© {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA</p>
      </div></section>
    </SiteLayout>
  );
}
