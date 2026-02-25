import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, FileText, Shield, MessageCircle, Phone,
  ChevronDown, Award, Play, TrendingUp, AlertTriangle,
  Building2, ArrowRight, Lock, BookOpen, Briefcase,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA = "5586994820054";
const WA_MSG = encodeURIComponent(
  "Olá! Vi a página sobre Defesa Fiscal e gostaria de analisar minha situação."
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
          <FileText className="w-4 h-4" /> Analisar autuação
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
  const [form, setForm] = useState({ nome: "", whatsapp: "", tipo: "", valor: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Preciso de defesa fiscal.\n\n📋 *Nome/Empresa:* ${form.nome}\n⚠️ *Tipo de situação:* ${form.tipo}\n💰 *Valor envolvido:* ${form.valor}\n📍 *Cidade/UF:* ${form.cidade}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };
  if (sent)
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
        <h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3>
        <p className="text-white/70 text-sm">Nossa equipe analisará sua situação fiscal com urgência.</p>
      </div>
    );
  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome", label: "Nome / Razão Social", placeholder: "Seu nome ou empresa", type: "text" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" },
        { name: "valor", label: "Valor envolvido (aproximado)", placeholder: "Ex: R$ 300.000", type: "text" },
        { name: "cidade", label: "Cidade / UF", placeholder: "Ex: Parnaíba – PI", type: "text" },
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
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Tipo de situação</label>
        <select
          name="tipo" value={form.tipo} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.tipo ? "#fff" : "#ffffff60" }}
        >
          <option value="" disabled>Selecione...</option>
          <option>Auto de infração / autuação fiscal</option>
          <option>Notificação de lançamento tributário</option>
          <option>Inscrição em dívida ativa</option>
          <option>Execução fiscal em andamento</option>
          <option>Bloqueio de contas ou penhora</option>
          <option>Parcelamento negado ou rompido</option>
          <option>Outro</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}
      >
        Quero analisar minha defesa fiscal →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

const riskItems = [
  { icon: AlertTriangle, title: "Auto de infração e autuação fiscal", text: "Recebeu notificação ou auto de infração da Receita Federal, Secretaria da Fazenda ou Prefeitura? Cada dia sem resposta técnica reduz suas chances de defesa e aumenta o débito com multas." },
  { icon: Building2, title: "Inscrição em dívida ativa e execução fiscal", text: "A dívida ativa resulta em execução judicial com bloqueio de contas (BACEN JUD), penhora de bens, protesto e impossibilidade de obter certidão negativa." },
  { icon: TrendingUp, title: "Bloqueios e constrições patrimoniais", text: "Bloqueios judiciais podem paralisar o fluxo de caixa, inviabilizar operações comerciais e comprometer o patrimônio pessoal dos sócios por redirecionamento fiscal." },
  { icon: BookOpen, title: "Nulidades e vícios no processo administrativo", text: "Autuações frequentemente contêm vícios formais, erros de cálculo ou ausência de fundamentação adequada — falhas que podem anular total ou parcialmente o crédito tributário exigido." },
];

const services = [
  { n: "01", title: "Análise urgente da situação", text: "Revisão imediata do auto de infração, notificação ou execução para identificar o risco real, os prazos e as melhores estratégias de defesa." },
  { n: "02", title: "Defesa administrativa (impugnação)", text: "Elaboração de impugnação técnica ao auto de infração, com análise de vícios formais, nulidades, erros de cálculo e teses defensivas aplicáveis." },
  { n: "03", title: "Recurso ao CARF e tribunais administrativos", text: "Interposição de recursos nos órgãos administrativos de julgamento (DRJ, CARF, CSRF) com fundamentação jurídica especializada." },
  { n: "04", title: "Mandado de segurança e liminares", text: "Ação judicial para suspender exigibilidade do crédito tributário, obstar bloqueios ou garantir direitos negados administrativamente." },
  { n: "05", title: "Exceção de pré-executividade", text: "Instrumento processual para suscitar nulidades ou questões de ordem pública na execução fiscal sem necessidade de garantia prévia do juízo." },
  { n: "06", title: "Embargos à execução fiscal", text: "Defesa judicial completa nos embargos à execução, com análise de prescrição, decadência, vícios, erros de cálculo e teses materiais." },
  { n: "07", title: "Defesa do redirecionamento para sócios", text: "Contestação técnica do redirecionamento da execução fiscal para o patrimônio pessoal dos sócios, com base na responsabilidade tributária." },
  { n: "08", title: "Negociação e transação tributária", text: "Avaliação estratégica da possibilidade de transação ou parcelamento como alternativa à defesa contenciosa, sempre com foco em proteção patrimonial." },
  { n: "09", title: "Regularização e certidão negativa", text: "Planejamento para regularização do passivo fiscal e obtenção de certidão de regularidade fiscal (CND) para retomada de atividades e acesso a crédito." },
];

const legalBasis = [
  "CTN – arts. 142–174: lançamento tributário, decadência e prescrição como instrumentos de defesa",
  "CPC/2015 – Lei de Execução Fiscal (LEF 6.830/80): prazos e procedimentos da execução fiscal",
  "Lei 9.784/99: processo administrativo federal e garantias do contribuinte",
  "STJ – Súmulas 430, 435 e 568: critérios para redirecionamento da execução aos sócios",
  "CF/88 – art. 5º e 150: garantias individuais e limitações ao poder de tributar",
  "PGFN e regimentos das Fazendas estaduais: normas do processo administrativo tributário",
];

const faqItems = [
  { q: "Recebi um auto de infração. O que devo fazer imediatamente?", a: "O primeiro passo é verificar o prazo para apresentar impugnação administrativa — geralmente 30 dias. Nenhuma decisão deve ser tomada sem análise técnica. Procure um advogado tributarista imediatamente, pois perder o prazo de impugnação implica na cobrança automática do crédito sem possibilidade de discussão administrativa." },
  { q: "A execução fiscal pode penhorar minha conta e meus bens pessoais?", a: "Sim. A execução fiscal pode resultar em bloqueio de contas via BACEN JUD, penhora de imóveis, veículos e outros bens. Em casos de redirecionamento, o patrimônio pessoal dos sócios também pode ser atingido. A defesa técnica imediata é essencial para minimizar esses riscos." },
  { q: "O que é exceção de pré-executividade?", a: "É um instrumento processual que permite ao executado suscitar nulidades formais e questões de ordem pública na execução fiscal — como prescrição, decadência ou ilegitimidade passiva — sem precisar garantir o juízo previamente. É uma defesa ágil e estratégica em determinadas situações." },
  { q: "Toda autuação fiscal deve ser paga sem contestação?", a: "Não. Muitas autuações contêm vícios formais, erros de cálculo, falta de fundamentação adequada ou incorreta aplicação da legislação. A análise técnica de cada caso pode identificar fundamentos para redução ou anulação do crédito tributário exigido." },
  { q: "Posso contestar a dívida mesmo estando na fase de execução judicial?", a: "Sim. Os embargos à execução fiscal permitem a contestação completa do débito mesmo após o ajuizamento da execução. Além disso, em determinados casos, a exceção de pré-executividade pode ser utilizada para questionar aspectos formais sem prévia garantia do juízo." },
  { q: "Qual a diferença entre a defesa administrativa e a judicial?", a: "A defesa administrativa é apresentada antes da inscrição em dívida ativa, perante órgãos como DRJ, CARF e câmaras estaduais. A judicial ocorre após o ajuizamento da execução fiscal ou por meio de mandado de segurança. Idealmente, a defesa começa na fase administrativa, onde há mais argumentos disponíveis." },
];

export default function DefesaFiscal() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Defesa Fiscal — Autuações, Auto de Infração e Contencioso Tributário"
        description="Defenda sua empresa de autuações fiscais, autos de infração, execuções fiscais e cobranças indevidas. Contencioso tributário especializado — Mauro Monção."
        canonical="https://mauromoncao.adv.br/solucoes/defesa-fiscal"
        keywords="defesa fiscal, auto de infração, contencioso tributário, execução fiscal, advogado tributário"
        jsonLd={[
          buildServiceLD({ name: "Defesa Fiscal — Autuações, Auto de Infração e Contencioso Tributário", description: "Defenda sua empresa de autuações fiscais, autos de infração, execuções fiscais e cobranças indevidas. Contencioso tributário especializado — Mauro Monção.", url: "https://mauromoncao.adv.br/solucoes/defesa-fiscal" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Defesa Fiscal", url: "/solucoes/defesa-fiscal" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-defesa-fiscal-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
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
                <Shield className="w-3.5 h-3.5" /> Direito Tributário · Defesa Fiscal · Contencioso
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6" style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
                Autuação fiscal? Execução? <em className="not-italic" style={{ color: GOLD }}>Defend-se com técnica e estratégia.</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                Cada notificação fiscal é uma batalha que começa com prazos. Atuamos na defesa administrativa e judicial contra autuações, execuções, bloqueios e redirecionamentos — com análise técnica que protege seu patrimônio.
              </p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield, text: "Defesa administrativa e judicial" },
                  { icon: Award, text: "+15 anos em contencioso tributário" },
                  { icon: Lock, text: "Proteção patrimonial estratégica" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/75">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} />{text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario" className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}>
                  <FileText className="w-4 h-4" /> Analisar minha situação fiscal
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Situações que atendemos</p>
                <div className="space-y-3">
                  {["Auto de infração (federal, estadual, municipal)", "Notificação de lançamento tributário", "Inscrição em dívida ativa", "Execução fiscal em andamento", "Bloqueio BACEN JUD e penhora de bens", "Redirecionamento para sócios"].map((item) => (
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
                    <ArrowRight className="w-4 h-4" /> Quero minha defesa
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Risco</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Cada prazo perdido é <span style={{ color: GOLD }}>uma derrota técnica.</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-base">O Fisco age com prazos e procedimentos rígidos. A defesa precisa ser imediata e tecnicamente fundamentada.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {riskItems.map(({ icon: Icon, title, text }) => (
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
              "O auto de infração não é o fim. <span style={{ color: GOLD }}>É o começo da defesa técnica."</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONSEQUÊNCIAS */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Consequências</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              O que acontece quando <span style={{ color: GOLD }}>não há defesa</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Certidão positiva de débitos", text: "A dívida tributária impede a obtenção de CND, bloqueando licitações, financiamentos, abertura de contas bancárias e operações de crédito." },
              { n: "02", title: "Bloqueio e penhora de ativos", text: "Via BACEN JUD, o Fisco pode bloquear contas correntes, poupanças e aplicações financeiras, comprometendo o caixa da empresa instantaneamente." },
              { n: "03", title: "Penhora de imóveis e veículos", text: "Bens imóveis e veículos podem ser penhorados e levados a leilão para satisfação do crédito tributário executado." },
              { n: "04", title: "Responsabilidade pessoal dos sócios", text: "O redirecionamento da execução fiscal ao patrimônio pessoal dos sócios pode ocorrer em casos de dissolução irregular ou prática de atos com excesso de poderes." },
              { n: "05", title: "Protesto do crédito tributário", text: "A Fazenda pode protestar o débito em cartório, negativando o nome da empresa e dos sócios, afetando o acesso a crédito e a reputação perante fornecedores." },
              { n: "06", title: "Encerramento forçado das atividades", text: "Débitos tributários elevados, combinados com bloqueios e restrições, podem inviabilizar as operações da empresa e forçar seu encerramento." },
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
              Fundamentos que amparam <span style={{ color: GOLD }}>sua defesa</span>
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
              "A Constituição garante o contraditório e a ampla defesa. <span style={{ color: GOLD }}>Usamos cada instrumento disponível."</span>
            </p>
          </div>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como conduzimos sua defesa fiscal</h2>
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
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda sua Situação</span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Como funciona a defesa fiscal<br />e como proteger seu patrimônio.
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
          <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção explica os instrumentos da defesa fiscal e como agir diante de uma autuação ou execução.</p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Por que nos escolher</span>
            <h2 className="font-serif text-3xl font-bold text-white">Nossos diferenciais na defesa fiscal</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Shield, title: "Defesa técnica especializada", text: "Atuamos com domínio do processo administrativo tributário e do contencioso judicial, identificando vícios e nulidades que outros perdem." },
              { icon: Award, title: "Experiência em contencioso tributário", text: "+15 anos de atuação em defesa fiscal nas esferas federal, estadual e municipal, com casos em todo o Brasil." },
              { icon: Briefcase, title: "Estratégia integrada", text: "Analisamos cada caso em conjunto: defesa administrativa, judicial e possibilidade de transação — sem visão de túnel." },
              { icon: Lock, title: "Proteção patrimonial", text: "Além da defesa do crédito, atuamos para proteger o patrimônio pessoal dos sócios e garantir a continuidade das operações." },
            ].map(({ icon: Icon, title, text }) => (
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
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise Urgente</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Sua defesa começa <span style={{ color: GOLD }}>agora.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Analisamos sua notificação ou execução fiscal com urgência e apresentamos a melhor estratégia de defesa antes que os prazos expirem.
              </p>
              <div className="space-y-3 mb-8">
                {["Análise urgente do caso e dos prazos", "Defesa administrativa (impugnação)", "Recurso ao CARF e tribunais administrativos", "Mandado de segurança e liminares judiciais", "Embargos à execução e exceção de pré-executividade", "Proteção patrimonial e orientação estratégica"].map((item) => (
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
              <h3 className="font-serif text-xl font-bold text-white mb-2">Analise sua situação fiscal agora.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados para uma análise técnica e urgente da sua autuação ou execução fiscal.</p>
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
