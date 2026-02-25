import SiteLayout from "@/components/site/SiteLayout";
import { useSettings } from "@/hooks/useSettings";
import { MessageCircle, MapPin, BookOpen, Award, Briefcase, GraduationCap, Target, Eye, Heart, Star, Lightbulb, Shield, Users, Scale } from "lucide-react";
import SEOHead, { buildOrganizationLD, buildBreadcrumbLD } from "@/components/SEOHead";

const especializacoes = [
  "Direito e Processo Eleitoral",
  "Políticas Públicas",
  "Direito Tributário",
  "Orçamento Público",
  "Direito Legislativo",
  "Direito Administrativo",
  "Gestão Pública",
  "Direito Constitucional",
];

const trajetoria = [
  {
    icon: Briefcase,
    titulo: "Fundador & Diretor Executivo",
    desc: "Mauro Monção Advogados Associados — escritório focado em Direito Tributário, Planejamento Sucessório, Societário e Advocacia Pública Municipal.",
  },
  {
    icon: MapPin,
    titulo: "Atuação Nacional",
    desc: "Presença nos Estados do Ceará, Piauí e Maranhão, com atendimento a pessoas físicas, empresas e administrações públicas municipais.",
  },
  {
    icon: GraduationCap,
    titulo: "Magistério — UESPI",
    desc: "Exerceu o magistério no Curso de Direito da Universidade Estadual do Piauí, ministrando Direito Administrativo, Constitucional e Financeiro.",
  },
  {
    icon: Award,
    titulo: "+15 Anos de Experiência",
    desc: "Trajetória sólida, técnica e comprometida com o interesse público, com atuação consultiva e contenciosa de alto nível.",
  },
];

const valores = [
  { icon: Star,       label: "Excelência" },
  { icon: Lightbulb, label: "Inovação" },
  { icon: Shield,     label: "Ética" },
  { icon: Users,      label: "Comprometimento com o Cliente" },
  { icon: Eye,        label: "Transparência" },
  { icon: Scale,      label: "Responsabilidade Social" },
];

// Dourado vivo — usado em todo o arquivo
const GOLD = "#E8B84B";

export default function Sobre() {
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "5586994820054";

  return (
    <SiteLayout>
      <SEOHead
        title="Dr. Mauro Monção — Adv. Tributário e Especialista em Direito Público"
        description="Conheça a trajetória do Dr. Mauro Monção: advogado especialista em Direito Tributário, Planejamento Patrimonial, Eleitoral e Advocacia Pública Municipal. OAB/PI."
        canonical="https://mauromoncao.adv.br/sobre"
        keywords="Mauro Monção advogado, OAB Piauí, direito tributário, advogado eleitoral, advocacia pública"
        jsonLd={[buildOrganizationLD(), buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Sobre", url: "/sobre" }])]}
      />
      <section className="bg-[#19385C] text-white py-16 lg:py-20">
        <div className="container">
          <span
            className="inline-block text-sm font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: GOLD }}
          >
            Nossa Trajetória
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Quem é o Dr. Mauro Monção
          </h1>
          <p className="text-white/85 text-lg max-w-2xl leading-relaxed">
            Fundador e Diretor Executivo do escritório Mauro Monção Advogados Associados.
          </p>
        </div>
      </section>

      {/* ── PERFIL PRINCIPAL ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">

            {/* Foto */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative">
                <div
                  className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden shadow-2xl border-4"
                  style={{ borderColor: `${GOLD}55` }}
                >
                  <img
                    src="/dr-mauro.jpg"
                    alt="Dr. Mauro Monção da Silva"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Badge OAB */}
                <div
                  className="absolute -bottom-4 -right-4 bg-[#19385C] rounded-xl px-4 py-2.5 shadow-xl border-2"
                  style={{ borderColor: `${GOLD}70` }}
                >
                  <p className="text-white text-sm font-bold tracking-wide">OAB – CE/PI/MA</p>
                </div>
              </div>

              {/* Nome e cargo */}
              <div className="mt-8 text-center lg:text-left">
                <h2 className="font-serif text-2xl font-bold text-[#19385C] leading-tight">
                  Mauro Monção da Silva
                </h2>
                {/* Badge cargo — VIVO */}
                <div
                  className="inline-flex items-center gap-2 font-bold text-sm tracking-wide mt-3 px-4 py-2 rounded-full border-2"
                  style={{
                    background: "#19385C",
                    color: GOLD,
                    borderColor: GOLD,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: GOLD }}
                  />
                  Fundador &amp; Diretor Executivo
                </div>
                <div
                  className="flex items-center gap-1.5 mt-3 font-semibold text-sm justify-center lg:justify-start"
                  style={{ color: "#19385C" }}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: GOLD }} />
                  CE · PI · MA
                </div>
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all shadow-md"
                style={{ background: GOLD, color: "#19385C" }}
              >
                <MessageCircle className="w-4 h-4" />
                Falar com o Dr. Mauro
              </a>
            </div>

            {/* Biografia */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full mb-6 border-2"
                style={{
                  background: `${GOLD}25`,
                  borderColor: GOLD,
                  color: "#A07820",
                }}
              >
                <BookOpen className="w-3.5 h-3.5" style={{ color: GOLD }} />
                Biografia
              </div>

              <div className="space-y-5 text-gray-600 leading-relaxed text-[0.95rem]">
                <p>
                  <strong className="text-[#19385C]">Mauro Monção da Silva</strong> é advogado com mais de 15 anos de dedicação à prática jurídica, atuando nos Estados do Ceará, Piauí e Maranhão. Fundou o escritório <strong className="text-[#19385C]">Mauro Monção Advogados Associados</strong>, focado em consultoria e assessoria jurídica para administrações públicas municipais, além de Direito Tributário e Planejamento Sucessório, Societário e Tributário. É o responsável pela liderança das operações e supervisiona a equipe executiva do escritório.
                </p>
                <p>
                  Ao longo de sua trajetória profissional, também exerceu o magistério no Curso de Direito da <strong className="text-[#19385C]">Universidade Estadual do Piauí – UESPI</strong>, ministrando disciplinas como Direito Administrativo, Direito Constitucional e Direito Financeiro, contribuindo para a formação de novos profissionais.
                </p>
                <p>
                  Sua qualificação inclui diversas especializações em nível de pós-graduação, abrangendo áreas essenciais que consolidam uma atuação sólida, técnica e comprometida com o interesse público.
                </p>
              </div>

              {/* Especializações */}
              <div className="mt-8">
                <h3 className="font-serif text-lg font-bold text-[#19385C] mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" style={{ color: GOLD }} />
                  Especializações (Pós-Graduação)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {especializacoes.map((e, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-[#f7f5f0] rounded-lg px-4 py-2.5">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: GOLD }} />
                      <span className="text-[#19385C] text-sm font-semibold">{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSÃO / VISÃO / VALORES ── */}
      <section className="py-20 bg-[#19385C] text-white">
        <div className="container">
          {/* Cabeçalho */}
          <div className="text-center mb-14">
            <span
              className="inline-block text-sm font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: GOLD }}
            >
              Pilares Estratégicos
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white">
              Aspirações e Princípios que Guiam Nossas Ações
            </h2>
          </div>

          {/* Missão + Visão */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Missão */}
            <div
              className="rounded-2xl p-8 border-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: `${GOLD}60`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: GOLD }}
              >
                <Target className="w-6 h-6 text-[#19385C]" />
              </div>
              <h3
                className="font-serif text-2xl font-bold mb-3"
                style={{ color: GOLD }}
              >
                Missão
              </h3>
              <p className="text-white/90 leading-relaxed">
                Oferecer soluções jurídicas inovadoras e personalizadas, utilizando tecnologia de ponta e a expertise de nossos profissionais para garantir a máxima satisfação e resultados para nossos clientes.
              </p>
            </div>

            {/* Visão */}
            <div
              className="rounded-2xl p-8 border-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                borderColor: `${GOLD}60`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: GOLD }}
              >
                <Eye className="w-6 h-6 text-[#19385C]" />
              </div>
              <h3
                className="font-serif text-2xl font-bold mb-3"
                style={{ color: GOLD }}
              >
                Visão
              </h3>
              <p className="text-white/90 leading-relaxed">
                Ser referência nacional em advocacia inteligente, reconhecido pela excelência, ética e inovação, transformando o mercado jurídico e impactando positivamente a sociedade.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div
            className="rounded-2xl p-8 border-2"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderColor: `${GOLD}60`,
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: GOLD }}
              >
                <Heart className="w-6 h-6 text-[#19385C]" />
              </div>
              <h3
                className="font-serif text-2xl font-bold"
                style={{ color: GOLD }}
              >
                Valores
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {valores.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-xl p-4 text-center border"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderColor: `${GOLD}35`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${GOLD}25`, border: `1.5px solid ${GOLD}` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: GOLD }} />
                  </div>
                  <span className="text-white font-semibold text-xs leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAJETÓRIA ── */}
      <section className="py-16 bg-[#f7f5f0]">
        <div className="container">
          <div className="text-center mb-12">
            <span
              className="text-sm font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              Carreira
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#19385C] mt-2">
              Trajetória Profissional
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {trajetoria.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                  style={{ borderColor: undefined }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${GOLD}60`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: "#19385C", color: GOLD }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#19385C] mb-2">{item.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 bg-[#19385C] text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: "+15", l: "Anos de Experiência" },
              { v: "3",   l: "Estados de Atuação" },
              { v: "8+",  l: "Especializações" },
              { v: "24h", l: "Atendimento" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-serif text-3xl font-bold" style={{ color: GOLD }}>{s.v}</p>
                <p className="text-white/80 text-sm mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="font-serif text-3xl font-bold text-[#19385C] mb-4">
            Pronto para proteger seu patrimônio?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Entre em contato com o escritório e agende uma consulta. Atendimento nacional com sedes em CE, PI e MA.
          </p>
          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all shadow-lg"
            style={{ background: GOLD, color: "#19385C" }}
          >
            <MessageCircle className="w-5 h-5" />
            Agendar Consulta
          </a>
        </div>
      </section>

    </SiteLayout>
  );
}
