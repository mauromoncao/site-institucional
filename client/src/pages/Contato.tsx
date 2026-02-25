import SiteLayout from "@/components/site/SiteLayout";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send, Building2 } from "lucide-react";
import SEOHead, { buildOrganizationLD, buildBreadcrumbLD } from "@/components/SEOHead";

const GOLD           = "#E8B84B";
const NAVY           = "#19385C";
const DR_BEN_WA      = "5586994820054";
const PHONE_DRBEN    = "(86) 99482-0054";
const PHONE_MAURO    = "(86) 99948-4761";
const PHONE_OFFICE   = "(86) 99519-8919";
const EMAIL          = "contato@mauromoncao.adv.br";

const escritorios = [
  {
    estado: "PIAUÍ",
    endereco: "Av. Leonardo de Carvalho Castelo Branco, nº 2835, Sala 12",
    bairro: "Bairro São Benedito",
    cidade: "Parnaíba – PI",
  },
  {
    estado: "CEARÁ",
    endereco: "Rua Monsenhor Bruno, nº 1153, Sala 1423",
    bairro: "B. Aldeota – Centro Empresarial Scopa Platinum Corporate",
    cidade: "Fortaleza – CE",
  },
];

export default function Contato() {
  const [form, setForm]           = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError("Por favor, informe seu nome."); return; }
    setError("");
    const lines = [
      `Olá! Vim pelo site mauromoncao.adv.br e gostaria de falar com um advogado.`,
      ``,
      `*Nome:* ${form.name}`,
    ];
    if (form.email)   lines.push(`*E-mail:* ${form.email}`);
    if (form.phone)   lines.push(`*Telefone:* ${form.phone}`);
    if (form.message) lines.push(``, `*Mensagem:* ${form.message}`);
    window.open(`https://wa.me/${DR_BEN_WA}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <SEOHead
        title="Contato — Fale com um Advogado Especialista"
        description="Entre em contato com Mauro Monção Advogados Associados. Atendimento em Parnaíba/PI e São Luís/MA. WhatsApp, e-mail ou visita presencial. Consulta inicial gratuita."
        canonical="https://mauromoncao.adv.br/contato"
        keywords="contato advogado Parnaíba, consulta gratuita, advogado tributário Piauí, WhatsApp advogado"
        jsonLd={[buildOrganizationLD(), buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Contato", url: "/contato" }])]}
      />
      <section className="bg-[#19385C] text-white py-16 lg:py-20">
        <div className="container">
          <span className="inline-block text-sm font-bold uppercase tracking-[0.25em] mb-4" style={{ color: GOLD }}>
            Fale Conosco
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Entre em Contato
          </h1>
          <p className="text-white/85 text-lg max-w-2xl leading-relaxed">
            Estamos prontos para atender você. Fale pelo WhatsApp, ligue ou envie uma mensagem.
          </p>
        </div>
      </section>

      {/* ── DR. BEN — CARD VERDE DESTAQUE ── */}
      <section className="py-10 bg-[#0f2340]">
        <div className="container">
          <a
            href={`https://wa.me/${DR_BEN_WA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0fa968 0%, #12c47a 40%, #0d9e61 70%, #0b8a52 100%)",
                boxShadow: "0 20px 60px rgba(15,169,104,0.35)",
              }}
            >
              {/* Efeitos de luz de fundo */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 left-1/4 w-72 h-72 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7fffd4, transparent)" }} />
                <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-white/20" />
                <div className="absolute top-20 left-32 w-2 h-2 rounded-full bg-white/15" />
                <div className="absolute bottom-10 left-20 w-3 h-3 rounded-full bg-white/15" />
                <div className="absolute bottom-20 left-48 w-2 h-2 rounded-full bg-white/10" />
                <div className="absolute top-14 left-56 w-3 h-3 rounded-full bg-white/10" />
              </div>

              <div className="relative flex flex-col md:flex-row items-center gap-8 px-10 py-10 md:py-12">

                {/* Esquerda — conteúdo */}
                <div className="flex-1 text-center md:text-left">
                  {/* Ícone WhatsApp */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black/20 mb-5">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.324-2.236l-.442-.37-3.063 1.027 1.027-3.063-.37-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                  </div>

                  <h2 className="text-white font-bold text-3xl lg:text-4xl mb-1 leading-tight">
                    WhatsApp Direto
                  </h2>
                  <p className="text-white font-black text-3xl lg:text-4xl mb-3 tracking-wide">
                    {PHONE_DRBEN}
                  </p>
                  <p className="text-white/85 text-base mb-6 leading-relaxed max-w-sm">
                    Atendimento rápido e personalizado.<br />
                    Clique para iniciar uma conversa agora mesmo.
                  </p>

                  {/* Botão */}
                  <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                    <span
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-base border-2 border-white text-white group-hover:bg-white transition-all"
                      style={{ ["color" as string]: undefined }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.838-6.324-2.236l-.442-.37-3.063 1.027 1.027-3.063-.37-.442A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                      </svg>
                      <span className="group-hover:text-[#0fa968] transition-colors">Iniciar Conversa</span>
                    </span>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        24h disponível
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        Respostas instantâneas
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direita — foto Dr. Ben */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <div className="relative">
                    <div
                      className="w-44 h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
                    >
                      <img
                        src="/dr-ben.jpg"
                        alt="Dr. Ben — Assistente Jurídico Virtual"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* ponto verde online */}
                    <span className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-green-400 border-2 border-white animate-pulse" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold text-lg leading-tight">Dr. Ben</p>
                    <p className="text-white/75 text-sm">Assistente Virtual</p>
                  </div>
                </div>

              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ── NOSSOS ESCRITÓRIOS ── */}
      <section className="py-14 bg-[#f7f5f0]">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Nossos Escritórios
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#19385C] mt-2">
              Onde Estamos
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {escritorios.map((e) => (
              <div
                key={e.estado}
                className="bg-white rounded-2xl p-7 shadow-sm border-2 flex flex-col gap-4"
                style={{ borderColor: `${GOLD}55` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: NAVY }}>
                    <Building2 className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <span className="font-bold text-lg tracking-widest uppercase" style={{ color: GOLD }}>{e.estado}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: GOLD }} />
                  <div>
                    <p className="text-[#19385C] font-semibold text-sm leading-snug">{e.endereco}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{e.bairro}</p>
                    <p className="font-bold text-sm mt-1 text-[#19385C]">{e.cidade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TELEFONES + FORMULÁRIO ── */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* ── Coluna esquerda: telefones + email + horário ── */}
            <div className="space-y-5">
              <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5" style={{ color: GOLD }} />
                Telefones & Contatos
              </h2>

              {/* Dr. Mauro — card azul destaque */}
              <div
                className="flex items-center gap-4 rounded-2xl px-6 py-5 border-2"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: `${GOLD}50` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: GOLD }}>
                  <Phone className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <p className="text-white font-black text-xl tracking-wide">{PHONE_MAURO}</p>
                  <p className="text-white/70 text-sm mt-0.5">Dr. Mauro Monção</p>
                </div>
              </div>

              {/* Escritório — card azul destaque */}
              <div
                className="flex items-center gap-4 rounded-2xl px-6 py-5 border-2"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: `${GOLD}50` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: GOLD }}>
                  <Phone className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <p className="text-white font-black text-xl tracking-wide">{PHONE_OFFICE}</p>
                  <p className="text-white/70 text-sm mt-0.5">Atendimento do Escritório</p>
                </div>
              </div>

              {/* E-mail */}
              <div
                className="flex items-center gap-4 rounded-2xl px-6 py-5 border-2"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: `${GOLD}50` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ background: GOLD }}>
                  <Mail className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-white font-bold text-base hover:underline transition-colors"
                    style={{ color: GOLD }}
                  >
                    {EMAIL}
                  </a>
                  <p className="text-white/70 text-sm mt-0.5">E-mail</p>
                </div>
              </div>

              {/* Horário */}
              <div
                className="flex items-start gap-4 rounded-2xl px-6 py-5 border-2"
                style={{ background: "rgba(255,255,255,0.07)", borderColor: `${GOLD}50` }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: GOLD }}>
                  <Clock className="w-5 h-5" style={{ color: NAVY }} />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Horário de Atendimento</p>
                  <p className="text-white/75 text-sm mt-1">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-white/75 text-sm">WhatsApp 24h via Dr. Ben</p>
                </div>
              </div>
            </div>

            {/* ── Coluna direita: formulário azul premium ── */}
            <div>
              <div
                className="rounded-2xl p-8 border-2"
                style={{ background: "rgba(255,255,255,0.06)", borderColor: `${GOLD}50` }}
              >
                <h2 className="font-serif text-2xl font-bold text-white mb-2">Envie sua Mensagem</h2>
                <p className="text-white/70 text-sm mb-6">
                  Preencha o formulário — abriremos o WhatsApp com sua mensagem já preparada para o Dr. Ben.
                </p>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: GOLD }} />
                    <h3 className="font-serif text-xl font-bold text-white mb-2">WhatsApp Aberto!</h3>
                    <p className="text-white/70 text-sm mb-6">
                      Sua mensagem foi preparada. Caso não tenha aberto,{" "}
                      <a href={`https://wa.me/${DR_BEN_WA}`} target="_blank" rel="noopener noreferrer"
                        className="underline font-semibold" style={{ color: GOLD }}>
                        clique aqui
                      </a>.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                      className="text-sm font-semibold underline"
                      style={{ color: GOLD }}
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="text-red-300 text-sm bg-red-900/30 border border-red-500/40 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-1.5">Nome completo *</label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-white placeholder-white/30 font-medium"
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-1.5">E-mail</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-white placeholder-white/30 font-medium"
                          style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                          onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                          placeholder="seu@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/90 mb-1.5">Telefone</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors text-white placeholder-white/30 font-medium"
                          style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                          onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                          onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                          placeholder="(00) 00000-0000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white/90 mb-1.5">Mensagem</label>
                      <textarea
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 outline-none transition-colors resize-none text-white placeholder-white/30 font-medium"
                        style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)" }}
                        onFocus={e => (e.currentTarget.style.borderColor = GOLD)}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
                        placeholder="Descreva brevemente como podemos ajudar..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg"
                      style={{ background: GOLD, color: NAVY }}
                    >
                      <Send className="w-4 h-4" />
                      Enviar via WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
