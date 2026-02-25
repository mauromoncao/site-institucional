import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, FileText, Shield, MessageCircle, Phone,
  ChevronDown, Award, Play, TrendingUp, Building2,
  ArrowRight, BarChart2, Layers, Briefcase, Lock,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA = "5586994820054";
const WA_MSG = encodeURIComponent(
  "Olá! Vi a página sobre Planejamento Tributário e gostaria de analisar a situação da minha empresa."
);

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
          <FileText className="w-4 h-4" /> Planejar agora
        </a>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden border transition-all"
      style={{ borderColor: open ? `${GOLD}40` : "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
        <span className="text-white font-semibold text-sm pr-4">{q}</span>
        <ChevronDown
          className="w-5 h-5 shrink-0 transition-transform"
          style={{ color: GOLD, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="px-6 pb-5"><p className="text-white/70 text-sm leading-relaxed">{a}</p></div>}
    </div>
  );
}

function Formulario() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", tipo: "", faturamento: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero fazer um planejamento tributário.\n\n📋 *Nome/Empresa:* ${form.nome}\n🏢 *Tipo de negócio:* ${form.tipo}\n💰 *Faturamento anual:* ${form.faturamento}\n📍 *Cidade/UF:* ${form.cidade}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };
  if (sent)
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
        <h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3>
        <p className="text-white/70 text-sm">Nossa equipe entrará em contato para iniciar o diagnóstico tributário.</p>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome", label: "Nome / Razão Social", placeholder: "Seu nome ou empresa", type: "text" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" },
        { name: "faturamento", label: "Faturamento anual aproximado", placeholder: "Ex: R$ 2.400.000", type: "text" },
        { name: "cidade", label: "Cidade / UF", placeholder: "Ex: Teresina – PI", type: "text" },
      ].map((fi) => (
        <div key={fi.name}>
          <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{fi.label}</label>
          <input
            required
            type={fi.type} name={fi.name} placeholder={fi.placeholder}
            value={(form as any)[fi.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)}
            onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")}
          />
        </div>
      ))}
      <div>
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de negócio</label>
        <select
          name="tipo" value={form.tipo} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.tipo ? "#fff" : "#ffffff60" }}
        >
          <option value="" disabled>Selecione...</option>
          <option>Empresa (Lucro Real)</option>
          <option>Empresa (Lucro Presumido)</option>
          <option>Empresa (Simples Nacional)</option>
          <option>Holding patrimonial ou familiar</option>
          <option>Clínica médica / odontológica</option>
          <option>Profissional liberal / PF</option>
          <option>Outro</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Quero iniciar meu planejamento tributário →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

const painItems = [
  { icon: BarChart2, title: "Regime tributário inadequado", text: "Muitas empresas pagam tributos desnecessários porque nunca revisaram se o regime atual — Simples, Presumido ou Real — é o mais eficiente para seu porte e atividade." },
  { icon: Building2, title: "Estrutura societária ineficiente", text: "A falta de uma holding ou de uma estrutura societária planejada expõe o patrimônio familiar e gera carga tributária evitável na distribuição de lucros e no inventário." },
  { icon: TrendingUp, title: "Crescimento sem reorganização", text: "Empresas que crescem sem planejamento tributário acumulam passivos fiscais, perdem competitividade e ficam expostas a riscos patrimoniais e autuações." },
  { icon: Layers, title: "Planejamento feito sem base legal", text: "Estratégias mal fundamentadas geram riscos de autuação e desconsideração pelo Fisco. Planejamento tributário eficaz exige técnica jurídica, não apenas contabilidade." },
];

const services = [
  { n: "01", title: "Diagnóstico tributário", text: "Análise do regime atual, carga efetiva e comparação com alternativas, identificando ineficiências e oportunidades." },
  { n: "02", title: "Escolha do regime ideal", text: "Estudo técnico entre Simples Nacional, Lucro Presumido e Lucro Real com projeção de carga tributária para cada cenário." },
  { n: "03", title: "Estruturação de holdings", text: "Constituição de holding patrimonial ou familiar para proteção de bens, planejamento sucessório e eficiência fiscal na distribuição de lucros." },
  { n: "04", title: "Reorganização societária", text: "Reestruturação de contratos sociais, participações e grupamentos societários com foco em eficiência tributária e proteção patrimonial." },
  { n: "05", title: "Planejamento de pró-labore e dividendos", text: "Estruturação da remuneração dos sócios de forma fiscalmente eficiente, respeitando limites legais e minimizando contribuições previdenciárias." },
  { n: "06", title: "Gestão de benefícios fiscais", text: "Identificação e aproveitamento de incentivos, isenções e regimes especiais aplicáveis à atividade — federais, estaduais e municipais." },
  { n: "07", title: "Planejamento na transmissão patrimonial", text: "Estruturação prévia de herança, doações e sucessão empresarial para reduzir o custo tributário e garantir continuidade dos negócios." },
  { n: "08", title: "Monitoramento e adequação contínua", text: "Acompanhamento das mudanças legislativas e revisão periódica do planejamento para manter sua eficiência ao longo do tempo." },
  { n: "09", title: "Treinamento e orientação gerencial", text: "Capacitação dos gestores e sócios para tomada de decisões financeiras com visão tributária, reduzindo riscos e melhorando resultados." },
];

const legalBasis = [
  "CTN – arts. 116 e 149: limites e fundamentos do planejamento tributário lícito (elisão fiscal)",
  "Lei 6.404/76 e CC/02: base legal para reorganizações societárias, holdings e cisões",
  "Lei 9.249/95 e 9.430/96: isenção de IRPF sobre dividendos e regras do Lucro Presumido",
  "LC 123/2006: Simples Nacional, limites, vedações e opção anual",
  "Lei 9.718/98 e RIR/2018: tributação pelo Lucro Real, Presumido e Arbitrado",
  "Código Civil – arts. 981–1.195: estrutura das sociedades e holding como instrumento de planejamento",
];

const differentials = [
  { icon: Shield, title: "Legalidade garantida", text: "Todo planejamento é fundamentado em normas vigentes, evitando riscos de autuação ou desconsideração pelo Fisco." },
  { icon: Award, title: "Visão jurídica e estratégica", text: "Atuamos além da contabilidade: estruturamos soluções jurídicas que protegem o patrimônio e geram eficiência fiscal real." },
  { icon: Lock, title: "Confidencialidade total", text: "Todas as informações da sua empresa são tratadas com sigilo absoluto e ética profissional." },
  { icon: Briefcase, title: "Acompanhamento contínuo", text: "O planejamento não termina com o diagnóstico. Acompanhamos sua empresa e revisamos a estrutura conforme a legislação evolui." },
];

const faqItems = [
  { q: "Planejamento tributário é legal?", a: "Sim. O planejamento tributário lícito (elisão fiscal) é garantido pelo CTN e consiste em escolher, dentro das opções oferecidas pela lei, o caminho menos oneroso. É diferente de evasão fiscal, que é crime." },
  { q: "Vale a pena para minha empresa?", a: "Na maioria dos casos, sim. Empresas que nunca fizeram uma revisão do regime tributário costumam pagar entre 15% e 40% a mais do que precisariam. A análise diagnóstica mostra o potencial de economia específico para sua situação." },
  { q: "O que é uma holding e para que serve?", a: "Uma holding é uma empresa criada para ser titular de participações societárias ou de bens. Ela permite planejar a sucessão, proteger o patrimônio, reduzir o imposto sobre dividendos e organizar a estrutura familiar de forma eficiente." },
  { q: "Quando devo trocar de regime tributário?", a: "A escolha do regime deve ser revisada anualmente, antes de janeiro. Empresas que crescem, mudam de atividade ou alteram sua margem de lucro geralmente precisam migrar de regime para reduzir a carga tributária." },
  { q: "O planejamento tributário reduz impostos imediatamente?", a: "Alguns efeitos são imediatos, como a adequação do regime ou da distribuição de lucros. Outros, como a reorganização societária e a holding, têm efeitos de médio prazo mas geram benefícios contínuos ao longo dos anos." },
  { q: "Preciso trocar meu contador para fazer o planejamento?", a: "Não necessariamente. Atuamos em parceria com a contabilidade da empresa, oferecendo a visão jurídica estratégica que complementa o trabalho contábil. O objetivo é integração, não substituição." },
];

export default function PlanejamentoTributario() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Planejamento Tributário — Reduza a Carga Fiscal da sua Empresa"
        description="Reduza legalmente os impostos da sua empresa com planejamento tributário estratégico. Escolha do regime correto, benefícios fiscais e elisão fiscal."
        canonical="https://mauromoncao.adv.br/solucoes/planejamento-tributario"
        keywords="planejamento tributário, redução de impostos, regime tributário, elisão fiscal, simples nacional"
        jsonLd={[
          buildServiceLD({ name: "Planejamento Tributário — Reduza a Carga Fiscal da sua Empresa", description: "Reduza legalmente os impostos da sua empresa com planejamento tributário estratégico. Escolha do regime correto, benefícios fiscais e elisão fiscal.", url: "https://mauromoncao.adv.br/solucoes/planejamento-tributario" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Planejamento Tributário", url: "/solucoes/planejamento-tributario" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-planejamento-tributario-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(7,24,46,0.97) 0%,rgba(7,24,46,0.88) 45%,rgba(7,24,46,0.30) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,24,46,0.85) 0%,transparent 40%)" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
                style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}>
                <BarChart2 className="w-3.5 h-3.5" /> Direito Tributário · Planejamento Estratégico
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
                Pague apenas o tributo que você <em className="not-italic" style={{ color: GOLD }}>realmente deve pagar.</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                O planejamento tributário estratégico reduz legalmente a carga fiscal da sua empresa, protege o patrimônio e garante segurança jurídica para crescer com previsibilidade.
              </p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield, text: "Planejamento 100% dentro da lei" },
                  { icon: Award, text: "+15 anos em direito tributário" },
                  { icon: TrendingUp, text: "Resultado mensurável e duradouro" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} />{text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}>
                  <FileText className="w-4 h-4" /> Quero iniciar meu planejamento
                </a>
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.9)" }}>
                  <MessageCircle className="w-4 h-4" /> Falar com especialista
                </a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="w-72 rounded-3xl p-6 shadow-2xl"
                style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Quem se beneficia</p>
                <div className="space-y-3">
                  {["Empresas em qualquer regime tributário", "Holdings patrimoniais e familiares", "Clínicas, consultórios e laboratórios", "Profissionais liberais e autônomos", "Negócios em fase de crescimento ou reestruturação"].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${GOLD}25` }}>
                        <CheckCircle className="w-3.5 h-3.5" style={{ color: GOLD }} />
                      </div>
                      <span className="text-white/85 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t" style={{ borderColor: `${GOLD}25` }}>
                  <a href="#formulario" className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm hover:brightness-110 transition-all"
                    style={{ background: GOLD, color: NAVY }}>
                    <ArrowRight className="w-4 h-4" /> Iniciar diagnóstico
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/30" />
        </div>
      </section>

      {/* DOR */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Problema</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Sua empresa está pagando <span style={{ color: GOLD }}>mais tributos do que deveria?</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">Esses são os sinais mais comuns de que o planejamento tributário é urgente.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {painItems.map(({ icon: Icon, title, text }) => (
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
          <div className="rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `1px solid ${GOLD}30` }}>
            <p className="text-white font-serif text-xl font-bold">
              "O problema não é pagar tributos. <span style={{ color: GOLD }}>É pagar além do que a lei exige."</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONSEQUÊNCIA */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Consequências</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              O custo de <span style={{ color: GOLD }}>não planejar</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Carga tributária acima do mínimo legal", text: "Sem planejamento, a empresa recolhe tributos no regime padrão, ignorando deduções, créditos e regimes mais favoráveis disponíveis por lei." },
              { n: "02", title: "Exposição patrimonial desnecessária", text: "Bens dos sócios ficam expostos às dívidas da empresa e a conflitos sucessórios que poderiam ser evitados com estruturação adequada." },
              { n: "03", title: "Risco de autuações e fiscalizações", text: "Empresas sem organização tributária apresentam inconsistências em declarações, tornando-se alvo mais fácil para autuações fiscais." },
              { n: "04", title: "Perda de competitividade", text: "Concorrentes com planejamento eficiente têm custos tributários menores, permitindo preços mais competitivos e maior margem de lucro." },
              { n: "05", title: "Dificuldade na sucessão empresarial", text: "A transmissão da empresa sem estrutura prévia pode gerar tributação elevada, conflitos entre herdeiros e até a descontinuidade do negócio." },
              { n: "06", title: "Bloqueios, protestos e execuções fiscais", text: "Débitos tributários acumulados resultam em certidões negativas de efeito positivo, impedindo crédito, licitações e alienação de bens." },
            ].map(({ n, title, text }) => (
              <div key={n} className="rounded-2xl p-6 border hover:shadow-md transition-all"
                style={{ borderColor: `${GOLD}25`, background: "#fff" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base mb-4"
                  style={{ background: NAVY, color: GOLD }}>{n}</div>
                <h3 className="font-bold text-sm mb-2" style={{ color: NAVY }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BASE JURÍDICA */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Base Jurídica</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Fundamentação <span style={{ color: GOLD }}>legal e técnica</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {legalBasis.map((item, i) => (
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
              "O CTN autoriza o contribuinte a escolher o caminho <span style={{ color: GOLD }}>menos oneroso dentro da lei."</span>
            </p>
          </div>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como estruturamos o planejamento</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ n, title, text }) => (
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

      {/* VÍDEO */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda o Planejamento</span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Como reduzir tributos legalmente<br />e proteger o patrimônio da sua empresa.
            </h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `2px solid ${GOLD}30` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl"
                style={{ background: GOLD }}>
                <Play className="w-8 h-8 ml-1" style={{ color: NAVY }} />
              </div>
              <p className="text-white/80 text-sm font-medium">Vídeo explicativo · 60–90 segundos</p>
              <p className="text-white/40 text-xs">Compatível com YouTube e Vimeo</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção explica as principais estratégias de planejamento tributário para empresas e famílias.</p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Por que nos escolher</span>
            <h2 className="font-serif text-3xl font-bold text-white">Nossos diferenciais</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentials.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl p-6 text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${GOLD}25` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${GOLD}20` }}>
                  <Icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 className="font-bold text-sm mb-2 text-white">{title}</h3>
                <p className="text-white/65 text-xs leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#07182e,${NAVY})` }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Dúvidas Frequentes</span>
            <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg,#07182e,${NAVY})` }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Diagnóstico Tributário</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Reduza legalmente a carga da sua empresa. <span style={{ color: GOLD }}>Comece pelo diagnóstico.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Analisamos seu regime, estrutura e atividade para identificar oportunidades reais de economia tributária e proteção patrimonial.
              </p>
              <div className="space-y-3 mb-8">
                {["Diagnóstico de regime tributário", "Identificação de ineficiências e oportunidades", "Estudo de holding e reorganização societária", "Planejamento de distribuição de lucros e sucessão", "Orientação contínua e revisão periódica"].map((item) => (
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
            <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.05)", border: `1.5px solid ${GOLD}30`, backdropFilter: "blur(10px)" }}>
              <h3 className="font-serif text-xl font-bold text-white mb-2">Inicie seu planejamento tributário.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados para um diagnóstico personalizado da situação tributária da sua empresa.</p>
              <Formulario />
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ OAB */}
      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}>
        <div className="container text-center">
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">
            Esta página tem caráter exclusivamente informativo. Não constitui aconselhamento jurídico. Os resultados dependem da análise individualizada de cada caso. Sem garantia de resultado. Atuação em conformidade com o Código de Ética e Disciplina da OAB.
          </p>
          <p className="text-white/25 text-xs mt-3">
            © {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
