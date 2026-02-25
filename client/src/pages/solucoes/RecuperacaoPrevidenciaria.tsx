import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, FileText, Shield, MessageCircle, Phone,
  ChevronDown, Award, Play, Lock, TrendingUp, AlertCircle,
  Coins, UserCheck, Clock, ArrowRight,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página sobre recuperação previdenciária por múltiplos vínculos e gostaria de analisar meu caso.");

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
          <FileText className="w-4 h-4" /> Analisar Meu Caso
        </a>
      </div>
    </div>
  );
}

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

function Formulario() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", profissao: "", vinculos: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Quero analisar minha situação previdenciária por múltiplos vínculos.\n\n📋 *Nome:* ${form.nome}\n💼 *Profissão:* ${form.profissao}\n🔗 *Nº de vínculos:* ${form.vinculos}\n📍 *Cidade/UF:* ${form.cidade}`
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
        { name: "nome", label: "Nome completo", placeholder: "Seu nome", type: "text" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" },
        { name: "profissao", label: "Profissão / Cargo", placeholder: "Ex: Médico, Professor, Servidor", type: "text" },
        { name: "cidade", label: "Cidade / UF", placeholder: "Ex: Parnaíba – PI", type: "text" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">{f.label}</label>
          <input required type={f.type} name={f.name} placeholder={f.placeholder}
            value={(form as any)[f.name]} onChange={handle}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(232,184,75,0.25)", color: "#fff" }}
            onFocus={(e) => (e.target.style.borderColor = GOLD)}
            onBlur={(e) => (e.target.style.borderColor = "rgba(232,184,75,0.25)")} />
        </div>
      ))}
      <div>
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Número de vínculos empregatícios simultâneos</label>
        <select name="vinculos" value={form.vinculos} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.vinculos ? "#fff" : "#ffffff60" }}>
          <option value="" disabled>Selecione...</option>
          <option value="2 vínculos">2 vínculos</option>
          <option value="3 vínculos">3 vínculos</option>
          <option value="4 ou mais vínculos">4 ou mais vínculos</option>
          <option value="Não tenho certeza">Não tenho certeza</option>
        </select>
      </div>
      <button type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}>
        Quero analisar meu caso →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

export default function RecuperacaoPrevidenciaria() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Recuperação Previdenciária — Restituição de Contribuições ao INSS"
        description="Sua empresa pode ter contribuições previdenciárias pagas a mais. Recupere créditos do INSS de forma legal e segura com Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/solucoes/recuperacao-previdenciaria"
        keywords="recuperação previdenciária, créditos INSS, contribuição indevida, restituição INSS empresa"
        jsonLd={[
          buildServiceLD({ name: "Recuperação Previdenciária — Restituição de Contribuições ao INSS", description: "Sua empresa pode ter contribuições previdenciárias pagas a mais. Recupere créditos do INSS de forma legal e segura com Mauro Monção Advogados.", url: "https://mauromoncao.adv.br/solucoes/recuperacao-previdenciaria" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Recuperação Previdenciária", url: "/solucoes/recuperacao-previdenciaria" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* HERO */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "92vh", display: "flex", alignItems: "center" }}>
        <div className="absolute inset-0">
          <img src="/lp-recuperacao-previdenciaria-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
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
                <Coins className="w-3.5 h-3.5" />
                Direito Previdenciário · Múltiplos Vínculos · Restituição
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-6"
                style={{ fontSize: "clamp(1.8rem,3.5vw,2.9rem)" }}>
                Você pagou INSS a mais por ter{" "}
                <em className="not-italic" style={{ color: GOLD }}>mais de um emprego?</em>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-8 max-w-xl">
                Médicos, professores e outros profissionais com múltiplos vínculos muitas vezes recolhem contribuições previdenciárias <strong className="text-white">acima do teto legal</strong> — e têm direito à restituição desse excesso.
              </p>
              <div className="flex flex-wrap gap-5 mb-10">
                {[
                  { icon: Shield, text: "Base constitucional e legal sólida" },
                  { icon: Award, text: "+15 anos de experiência tributária" },
                  { icon: Lock, text: "Análise individualizada e sigilosa" },
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
                  <FileText className="w-4 h-4" /> Solicitar análise do meu caso
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
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Você se enquadra?</p>
                <div className="space-y-3">
                  {["Médico com dois ou mais empregos", "Professor em mais de uma escola/faculdade", "Servidor público com vínculo CLT", "Profissional liberal com múltiplos contratos", "Contribuições somadas excedem o teto"].map((item) => (
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
                    <ArrowRight className="w-4 h-4" /> Analisar meu caso
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
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Problema</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              O desconto no contracheque não garante{" "}
              <span style={{ color: GOLD }}>que o limite foi respeitado.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            {[
              { icon: AlertCircle, title: "O teto previdenciário é por contribuinte, não por vínculo", text: "Cada empregador desconta sua parte sem saber das demais fontes. O total acumulado pode ultrapassar o teto legal sem que ninguém perceba." },
              { icon: Coins, title: "O excesso foi recolhido — mas não deveria ter sido", text: "A contribuição previdenciária tem um limite máximo mensal. Tudo que ultrapasse esse teto pode ser recuperado pelo contribuinte." },
              { icon: Clock, title: "Cada mês que passa é dinheiro que prescreve", text: "O prazo para recuperação de valores recolhidos indevidamente é limitado. Adiar a análise pode custar parte ou todo o valor a recuperar." },
              { icon: UserCheck, title: "Poucos profissionais sabem que têm esse direito", text: "Médicos, professores, servidores e profissionais liberais raramente são orientados sobre esse mecanismo de recuperação previdenciária." },
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
            style={{ background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `1px solid ${GOLD}30` }}>
            <p className="text-white font-serif text-xl font-bold">
              "Contribuição acima do teto não é obrigação.{" "}
              <span style={{ color: GOLD }}>É excesso recuperável."</span>
            </p>
          </div>
        </div>
      </section>

      {/* CONSEQUÊNCIA */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Riscos de Não Agir</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              Cada ano de espera{" "}
              <span style={{ color: GOLD }}>pode custar parte do valor.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { n: "01", title: "Prescrição quinquenal", text: "Valores com mais de 5 anos podem ser irrecuperáveis. O prazo corre independentemente de você saber do direito." },
              { n: "02", title: "Acúmulo mensal do excesso", text: "Enquanto a situação persiste, novos excessos continuam sendo recolhidos sem necessidade." },
              { n: "03", title: "Perda silenciosa de renda", text: "Sem perceber, o profissional perde renda mensal que poderia estar na conta ou investida." },
              { n: "04", title: "Erro de planejamento tributário", text: "Sem análise técnica, o contribuinte paga mais do que deve e não otimiza sua estrutura contributiva." },
              { n: "05", title: "Recolhimentos futuros excessivos", text: "Sem orientação jurídica, os empregadores continuarão descontando o excesso nos meses seguintes." },
              { n: "06", title: "Oportunidade de recuperação perdida", text: "A restituição ou compensação dos valores é direito reconhecido. Não exercê-lo é deixar dinheiro para trás." },
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

      {/* BASE LEGAL */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Base Jurídica</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Fundamentos legais{" "}
              <span style={{ color: GOLD }}>bem consolidados</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              "Art. 28 da Lei 8.212/91 – o salário-de-contribuição tem teto máximo mensal",
              "Instrução Normativa RFB nº 971/2009 – regras para apuração e restituição do excesso",
              "Contribuição previdenciária é de natureza tributária – sujeita ao prazo prescricional de 5 anos",
              "STJ e Receita Federal reconhecem o direito à restituição nos casos de excesso por múltiplos vínculos",
              "Pedido de restituição (PER/DCOMP) ou ação judicial como caminhos disponíveis",
              "Análise individualizada por CNIS, contracheques e vínculos é indispensável",
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
              "Quem recolheu a mais tem direito de receber de volta.{" "}
              <span style={{ color: GOLD }}>A análise técnica define o caminho."</span>
            </p>
          </div>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Atuação</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Como conduzimos seu caso</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { n: "01", title: "Levantamento do histórico contributivo", text: "Consulta ao CNIS, contracheques e documentos de todos os vínculos para mapear o histórico completo de recolhimentos." },
              { n: "02", title: "Identificação dos excessos", text: "Cálculo comparativo entre o total recolhido e o teto previdenciário vigente em cada competência." },
              { n: "03", title: "Análise de viabilidade", text: "Verificação dos prazos, valores em aberto e estratégia mais adequada: restituição administrativa ou ação judicial." },
              { n: "04", title: "Pedido de restituição (PER/DCOMP)", text: "Elaboração e protocolo do pedido eletrônico de restituição ou compensação perante a Receita Federal." },
              { n: "05", title: "Ação judicial, se necessário", text: "Impetração de ação de repetição de indébito previdenciário com pedido de levantamento do valor recolhido a maior." },
              { n: "06", title: "Estratégia para vínculos futuros", text: "Orientação para que os recolhimentos futuros não ultrapassem o teto e o excesso não se repita." },
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

      {/* VÍDEO */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Entenda a Tese</span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Você sabia que pode ter direito<br />a receber esse dinheiro de volta?
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
          <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção explica a tese de recuperação previdenciária por múltiplos vínculos.</p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Diferenciais</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Por que escolher nossa equipe?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: TrendingUp, title: "Especialização em direito tributário e previdenciário", text: "Equipe com experiência consolidada em restituições, PER/DCOMP e ações de repetição de indébito." },
              { icon: UserCheck, title: "Análise técnica e individualizada", text: "Cada caso é diferente. O levantamento do CNIS e contracheques define com precisão se há e quanto há a recuperar." },
              { icon: Award, title: "Atuação administrativa e judicial", text: "Cobrimos todas as vias: pedido à Receita Federal ou ação judicial, conforme a estratégia mais eficiente." },
              { icon: Lock, title: "Conformidade com normas da OAB", text: "Ética total, sem promessas de resultado. Apresentamos a análise com clareza e conduzimos com responsabilidade." },
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

      {/* FAQ */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Dúvidas Frequentes</span>
            <h2 className="font-serif text-3xl font-bold text-white">Perguntas e Respostas</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Qualquer profissional com dois empregos tem direito à restituição?", a: "Não necessariamente. É preciso que a soma das contribuições previdenciárias de todos os vínculos ultrapasse o teto do salário-de-contribuição no mesmo mês. A análise do CNIS e dos contracheques é indispensável para verificar." },
              { q: "Qual o prazo para pedir a restituição?", a: "O prazo prescricional é de 5 anos a partir do recolhimento indevido. Cada mês que passa elimina os valores mais antigos. Por isso a análise imediata é estratégica." },
              { q: "O pedido é feito junto à Receita Federal ou na Justiça?", a: "Há dois caminhos: o pedido administrativo (PER/DCOMP) na Receita Federal, que é mais ágil quando aceito, ou a ação judicial de repetição de indébito, usada quando há negativa ou controvérsia sobre o valor." },
              { q: "Médicos e professores são os únicos afetados?", a: "Não. Qualquer trabalhador com dois ou mais vínculos empregatícios simultâneos pode estar nessa situação — servidores públicos com emprego privado, enfermeiros, advogados, consultores e outros profissionais." },
              { q: "O INSS vai cobrar alguma coisa depois?", a: "Não. A restituição ou compensação dos valores pagos a maior não cria nenhum débito futuro com a Previdência Social. O benefício previdenciário não é afetado pela recuperação do excesso." },
            ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA + FORMULÁRIO */}
      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg,#07182e,${NAVY})` }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Análise do Caso</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Você pode ter dinheiro para{" "}
                <span style={{ color: GOLD }}>receber de volta.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Nossa equipe faz a análise do seu caso, calcula o potencial de recuperação e apresenta a estratégia mais eficiente para você.
              </p>
              <div className="space-y-3 mb-8">
                {["Levantamento do histórico contributivo", "Cálculo do excesso por competência", "Análise de prazo prescricional", "Estratégia administrativa ou judicial", "Condução técnica do pedido"].map((item) => (
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
              <h3 className="font-serif text-xl font-bold text-white mb-2">Analise sua situação previdenciária.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados para uma análise personalizada do potencial de recuperação.</p>
              <Formulario />
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ LEGAL */}
      <section className="py-8 border-t" style={{ background: "#07182e", borderColor: `${GOLD}15` }}>
        <div className="container text-center">
          <p className="text-white/40 text-xs leading-relaxed max-w-2xl mx-auto">
            Esta página tem caráter exclusivamente informativo e não constitui aconselhamento jurídico. A viabilidade de cada caso depende de análise individualizada. Sem garantia de resultado. Atuação em conformidade com o Código de Ética e Disciplina da OAB.
          </p>
          <p className="text-white/25 text-xs mt-3">© {new Date().getFullYear()} Mauro Monção Advogados Associados · OAB/PI · CE · MA</p>
        </div>
      </section>
    </SiteLayout>
  );
}
