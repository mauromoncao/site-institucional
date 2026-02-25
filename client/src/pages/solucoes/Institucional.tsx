import { useState, useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { VideoEmbed } from "@/components/VideoEmbed";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildServiceLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";
import {
  CheckCircle, FileText, Shield, MessageCircle, Phone,
  ChevronDown, Award, Play, Lock, Users, Star,
  Briefcase, Globe, TrendingUp, Building2, ArrowRight, Zap,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const WA = "5586994820054";
const WA_MSG = encodeURIComponent("Olá! Vi a página do escritório e gostaria de agendar uma consulta.");

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
          <FileText className="w-4 h-4" /> Falar Agora
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
  const [form, setForm] = useState({ nome: "", whatsapp: "", area: "", cidade: "" });
  const [sent, setSent] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Olá! Gostaria de falar com um especialista.\n\n📋 *Nome:* ${form.nome}\n⚖️ *Área de interesse:* ${form.area}\n📍 *Cidade/UF:* ${form.cidade}`
    );
    window.open(`https://wa.me/${WA}?text=${msg}`, "_blank");
    setSent(true);
  };
  if (sent) return (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
      <h3 className="font-serif text-2xl font-bold text-white mb-2">Solicitação recebida!</h3>
      <p className="text-white/70 text-sm">Nossa equipe entrará em contato para agendar sua consulta.</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="space-y-4">
      {[
        { name: "nome", label: "Nome completo", placeholder: "Seu nome", type: "text" },
        { name: "whatsapp", label: "WhatsApp", placeholder: "(86) 99999-9999", type: "tel" },
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
        <label className="block text-white/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">Área de interesse</label>
        <select name="area" value={form.area} onChange={handle} required
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "#0f2340", border: "1.5px solid rgba(232,184,75,0.25)", color: form.area ? "#fff" : "#ffffff60" }}>
          <option value="" disabled>Selecione a área...</option>
          <option value="Direito Tributário">Direito Tributário</option>
          <option value="Planejamento Patrimonial">Planejamento Patrimonial</option>
          <option value="Direito Bancário">Direito Bancário</option>
          <option value="Direito Previdenciário">Direito Previdenciário</option>
          <option value="Advocacia Pública Municipal">Advocacia Pública Municipal</option>
          <option value="Direito Imobiliário">Direito Imobiliário</option>
          <option value="Família e Sucessões">Família e Sucessões</option>
          <option value="Outra área">Outra área</option>
        </select>
      </div>
      <button type="submit"
        className="w-full py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg mt-2"
        style={{ background: GOLD, color: NAVY }}>
        Quero agendar minha consulta →
      </button>
      <p className="text-center text-white/40 text-xs">🔒 Seus dados são confidenciais.</p>
    </form>
  );
}

export default function Institucional() {
  const { settings } = useSettings();
  return (
    <SiteLayout>
      <SEOHead
        title="Assessoria Jurídica Institucional — Prefeituras e Órgãos Públicos"
        description="Assessoria jurídica especializada para municípios, autarquias e entidades públicas. Direito Administrativo, Licitações, Contratos Públicos e Advocacia Municipal."
        canonical="https://mauromoncao.adv.br/solucoes/institucional"
        keywords="assessoria jurídica municipal, advocacia pública, licitações, contratos administrativos, prefeitura"
        jsonLd={[
          buildServiceLD({ name: "Assessoria Jurídica Institucional — Prefeituras e Órgãos Públicos", description: "Assessoria jurídica especializada para municípios, autarquias e entidades públicas. Direito Administrativo, Licitações, Contratos Públicos e Advocacia Municipal.", url: "https://mauromoncao.adv.br/solucoes/institucional" }),
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Soluções Jurídicas", url: "/solucoes-juridicas" }, { name: "Assessoria Jurídica Institucional", url: "/solucoes/institucional" }]),
          buildOrganizationLD(),
        ]}
      />

      <StickyCTA />

      {/* HERO — pôster cinematográfico A ARQUITETURA DA VITÓRIA */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0">
          <img src="/lp-institucional-hero.jpg" alt="A Arquitetura da Vitória – Série Campo Estratégico" className="w-full h-full object-cover object-top" />
          {/* overlay: topo totalmente transparente, escurece só na metade inferior */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(7,24,46,0.75) 65%, rgba(7,24,46,0.96) 100%)" }} />
        </div>
        <div className="container relative z-10 pb-16 pt-0">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}60`, color: GOLD }}>
                <Building2 className="w-3.5 h-3.5" />
                Advocacia Estratégica · Técnica · Confiável
              </div>
              <h1 className="font-serif font-bold leading-[1.1] text-white mb-4"
                style={{ fontSize: "clamp(1.6rem,3vw,2.6rem)", textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}>
                Soluções jurídicas que{" "}
                <em className="not-italic" style={{ color: GOLD }}>protegem, regularizam e fazem crescer.</em>
              </h1>
              <p className="text-white/90 text-sm leading-relaxed mb-6 max-w-xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
                Assessoria jurídica técnica e estratégica para pessoas físicas, empresários, gestores, famílias e agentes públicos que precisam de segurança e resultado.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Shield, text: "Atuação em 8 áreas do Direito" },
                  { icon: Award, text: "+15 anos de experiência" },
                  { icon: Globe, text: "PI · CE · MA e todo o Brasil" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-white/90">
                    <Icon className="w-4 h-4 shrink-0" style={{ color: GOLD }} /> {text}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#formulario"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                  style={{ background: GOLD, color: NAVY }}>
                  <FileText className="w-4 h-4" /> Agendar consulta estratégica
                </a>
                <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm border-2 hover:bg-white/5 transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.40)", color: "rgba(255,255,255,0.95)", backdropFilter: "blur(4px)" }}>
                  <MessageCircle className="w-4 h-4" /> Falar com especialista
                </a>
              </div>
            </div>
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="w-72 rounded-3xl p-6 shadow-2xl"
                style={{ background: "rgba(7,24,46,0.80)", border: `1.5px solid ${GOLD}40`, backdropFilter: "blur(16px)" }}>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GOLD }}>Áreas de atuação</p>
                <div className="space-y-3">
                  {["Direito Tributário", "Planejamento Patrimonial", "Advocacia Pública Municipal", "Direito Bancário", "Direito Previdenciário", "Família e Sucessões"].map((item) => (
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
                    <ArrowRight className="w-4 h-4" /> Consultar agora
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

      {/* SOBRE O ESCRITÓRIO */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>O Escritório</span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{ color: NAVY }}>
              Advocacia de resultado com{" "}
              <span style={{ color: GOLD }}>base técnica sólida.</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              O escritório Mauro Monção Advogados Associados atua há mais de 15 anos na assessoria jurídica estratégica de pessoas físicas, empresas, famílias e administrações públicas municipais, com presença nos estados do Piauí, Ceará e Maranhão.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Briefcase, title: "+15 anos de atuação", text: "Trajetória consolidada na advocacia empresarial, tributária, previdenciária e pública, com histórico de casos complexos." },
              { icon: Globe, text: "Presença em PI, CE e MA, com atendimento remoto para todo o Brasil. Clientes em múltiplos estados e setores.", title: "Atuação nacional" },
              { icon: Users, title: "Atendimento multidisciplinar", text: "Equipe especializada em diferentes ramos do Direito, garantindo cobertura jurídica completa para cada cliente." },
              { icon: Shield, title: "Ética e conformidade OAB", text: "Atuação transparente, responsável e compatível com o Código de Ética da OAB. Sem promessas de resultado." },
              { icon: TrendingUp, title: "Foco em resultado estratégico", text: "Cada caso recebe análise técnica individualizada e estratégia personalizada para alcançar o melhor resultado possível." },
              { icon: Star, title: "Credibilidade e confiança", text: "Relacionamento de longo prazo com clientes, construído sobre transparência, comunicação clara e entrega consistente." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 p-6 rounded-2xl border" style={{ borderColor: `${GOLD}20`, background: "#fafaf9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: NAVY }}>
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

      {/* PORTFÓLIO DE SERVIÇOS */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Portfólio Jurídico</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>
              Soluções para cada necessidade jurídica
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Direito Tributário", text: "Defesa fiscal, planejamento e recuperação de créditos." },
              { n: "02", title: "Planejamento Patrimonial", text: "Holdings, sucessão e proteção do patrimônio familiar." },
              { n: "03", title: "Advocacia Pública Municipal", text: "Assessoria completa para gestores e prefeituras." },
              { n: "04", title: "Direito Bancário", text: "Defesa contra abusos, revisão contratual e CDC." },
              { n: "05", title: "Direito Previdenciário", text: "INSS, concessão, revisão e ações de benefícios." },
              { n: "06", title: "Direito Imobiliário", text: "Compra, venda, due diligence e contratos." },
              { n: "07", title: "Família e Sucessões", text: "Inventários, divórcio, testamentos e partilha." },
              { n: "08", title: "Direito do Consumidor", text: "Defesa de direitos e resolução de conflitos." },
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

      {/* BASE / AUTORIDADE */}
      <section className="py-20 text-white" style={{ background: `linear-gradient(135deg,#0b1e35,${NAVY})` }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Nossa Abordagem</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Por que assessoria jurídica{" "}
              <span style={{ color: GOLD }}>estratégica faz diferença</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              "Prevenção de litígios é mais eficiente e barata do que a litigância reativa",
              "Planejamento jurídico reduz riscos fiscais, societários e patrimoniais",
              "Defesa técnica especializada aumenta as chances de resultado favorável",
              "Assessoria contínua garante conformidade legal e segurança nas decisões",
              "Atuação integrada entre áreas evita lacunas jurídicas no negócio ou na vida pessoal",
              "Parceria de longo prazo constrói proteção jurídica sólida e consistente",
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
              "Advocacia estratégica não é custo.{" "}
              <span style={{ color: GOLD }}>É investimento em segurança e resultado."</span>
            </p>
          </div>
        </div>
      </section>

      {/* VÍDEO */}
      <section className="py-20" style={{ background: "#f7f5f0" }}>
        <div className="container max-w-3xl">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Conheça o Escritório</span>
            <h2 className="font-serif text-2xl font-bold mb-3" style={{ color: NAVY }}>
              Quem somos e como podemos<br />ajudar você ou sua empresa.
            </h2>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ paddingBottom: "56.25%", background: `linear-gradient(135deg,#0f2340,${NAVY})`, border: `2px solid ${GOLD}30` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-2xl"
                style={{ background: GOLD }}>
                <Play className="w-8 h-8 ml-1" style={{ color: NAVY }} />
              </div>
              <p className="text-white/80 text-sm font-medium">Apresentação institucional · 60–90 segundos</p>
              <p className="text-white/40 text-xs">Compatível com YouTube e Vimeo</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">Dr. Mauro Monção apresenta o escritório e as áreas de atuação.</p>
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Diferenciais</span>
            <h2 className="font-serif text-3xl font-bold mb-4" style={{ color: NAVY }}>Por que nos escolher?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Zap, title: "Resposta ágil e comunicação clara", text: "Atualizações constantes, linguagem acessível e presença em todos os estágios do caso." },
              { icon: Shield, title: "Estratégia personalizada", text: "Cada cliente recebe uma análise individualizada. Não existe solução genérica para problema jurídico real." },
              { icon: Award, title: "Equipe especializada por área", text: "Advogados dedicados a cada ramo do Direito, com atualização técnica constante e foco em resultado." },
              { icon: Lock, title: "Conformidade total com a OAB", text: "Ética, transparência e responsabilidade em cada etapa. Sem promessas de resultado, com máximo comprometimento." },
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
              { q: "O escritório atende fora do Piauí?", a: "Sim. Atuamos com presença física no PI, CE e MA, e atendemos remotamente para todo o Brasil, especialmente nas áreas tributária, previdenciária e de planejamento patrimonial." },
              { q: "Como funciona a primeira consulta?", a: "A primeira conversa é uma análise diagnóstica do seu caso. O objetivo é entender a situação, avaliar a viabilidade jurídica e indicar as melhores alternativas. Pode ser feita por videoconferência ou presencialmente." },
              { q: "O escritório atende pessoas físicas e empresas?", a: "Sim. Nossa atuação abrange pessoas físicas (famílias, trabalhadores, contribuintes), empresas de todos os portes, profissionais liberais e administrações públicas municipais." },
              { q: "Como é feito o acompanhamento do caso?", a: "O cliente recebe atualizações regulares sobre o andamento, com comunicação direta com o advogado responsável. Não há intermediários desnecessários." },
              { q: "O escritório garante resultado?", a: "Não. Nenhum advogado ético pode garantir resultado. O que garantimos é análise técnica rigorosa, estratégia bem fundamentada e total comprometimento com o seu caso." },
            ].map((item) => <FaqItem key={item.q} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* CTA + FORMULÁRIO */}
      <section id="formulario" className="py-20 text-white" style={{ background: `linear-gradient(150deg,#07182e,${NAVY})` }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3" style={{ color: GOLD }}>Consulta Estratégica</span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                Seu próximo passo jurídico começa{" "}
                <span style={{ color: GOLD }}>aqui.</span>
              </h2>
              <p className="text-white/75 text-base leading-relaxed mb-8">
                Agende uma consulta com nossa equipe e receba um diagnóstico claro sobre sua situação jurídica.
              </p>
              <div className="space-y-3 mb-8">
                {["Atendimento personalizado", "Análise técnica individualizada", "Estratégia jurídica clara", "Comunicação direta e ágil", "Conformidade total com a OAB"].map((item) => (
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
              <h3 className="font-serif text-xl font-bold text-white mb-2">Agende sua consulta.</h3>
              <p className="text-white/60 text-sm mb-6">Preencha os dados e entraremos em contato para organizar seu atendimento.</p>
              <Formulario />
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ LEGAL */}
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
