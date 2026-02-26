import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useSettings } from "@/hooks/useSettings";
import SEOHead, { buildOrganizationLD, buildWebSiteLD } from "@/components/SEOHead";
import { Link } from "wouter";
import { Shield, Scale, Gavel, BookOpen, Building2, FileText, Vote, Users, Landmark, Home, Leaf, ShoppingCart, HeartHandshake, ArrowRight, CheckCircle, Calendar, Tag, MessageCircle } from "lucide-react";

const iconMap: Record<string, any> = {
  shield: Shield, scale: Scale, gavel: Gavel, bookopen: BookOpen,
  building2: Building2, filetext: FileText, vote: Vote, users: Users, landmark: Landmark,
};
// iconMap mantido para uso futuro em outras seções

export default function Home() {
  const { data: blogPosts } = trpc.blog.listPublic.useQuery(undefined, {
    staleTime: 5 * 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "(86) 99482-0054";
  const latestPosts = blogPosts?.slice(0, 5) || [];

  return (
    <SiteLayout>
      <SEOHead
        title="Advocacia Tributária e Patrimonial em Parnaíba e São Luís"
        description="Mauro Monção Advogados Associados — Direito Tributário, Planejamento Patrimonial, Previdenciário e Empresarial. Atuação em Piauí e Maranhão. Consulta gratuita."
        canonical="https://mauromoncao.adv.br/"
        ogImage="/logo-brand.png"
        keywords="advogado tributário Parnaíba, escritório advocacia Piauí, planejamento tributário, defesa fiscal, recuperação tributária, direito previdenciário"
        jsonLd={[buildOrganizationLD(), buildWebSiteLD()]}
      />
      <section
        className="relative text-white overflow-hidden"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        {/* Hero cinematográfico */}
        <div className="absolute inset-0">
          <img src="/home-hero.jpg" alt="" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg,rgba(7,24,46,0.97) 0%,rgba(7,24,46,0.90) 50%,rgba(7,24,46,0.55) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(7,24,46,0.80) 0%,transparent 50%)" }} />
        </div>
        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(#E8B84B 1px,transparent 1px),linear-gradient(90deg,#E8B84B 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        <div className="container relative z-10 h-full">
          <div
            className="grid lg:grid-cols-2 gap-8 xl:gap-16 items-center"
            style={{ minHeight: "calc(100vh - 72px)", paddingTop: "4rem", paddingBottom: "4rem" }}
          >
            {/* ────────── ESQUERDA ────────── */}
            <div className="flex flex-col justify-center order-2 lg:order-1">

              {/* Badge topo */}
              <div className="inline-flex items-center gap-2 border border-[#E8B84B]/60 bg-[#E8B84B]/15 rounded-full px-4 py-2 text-sm text-[#E8B84B] font-bold tracking-[0.2em] uppercase mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B] animate-pulse shrink-0" />
                Advocacia · CE · PI · MA
              </div>

              {/* H1 */}
              <h1
                className="font-serif font-bold leading-[1.05] mb-5 tracking-tight text-white"
                style={{ fontSize: "clamp(2.4rem, 4vw, 3.75rem)" }}
              >
                Advocacia com{" "}
                <em className="not-italic text-[#E8B84B]">inovação</em>
                <br />e{" "}
                <em className="not-italic text-[#E8B84B]">compromisso</em>
              </h1>

              <p className="text-white/85 text-[1rem] leading-relaxed mb-2 max-w-[480px]">
                Atuação técnica para garantir segurança jurídica nas suas decisões e preservar o seu patrimônio.
              </p>

              {/* Stats inline */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 mt-4">
                {[
                  { v: "+15", l: "anos de experiência" },
                  { v: "3", l: "estados" },
                  { v: "24h", l: "atendimento" },
                ].map((s, i) => (
                  <span key={i} className="flex items-baseline gap-1.5 text-sm text-white/80">
                    <strong className="text-[#E8B84B] font-bold text-xl font-serif leading-none">{s.v}</strong>
                    {s.l}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E8B84B] text-[#19385C] px-7 py-3.5 rounded-full text-sm font-bold hover:brightness-110 transition-all shadow-lg shadow-[#E8B84B]/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  Quero uma Consulta
                </a>
                <Link
                  href="/solucoes-juridicas"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/85 px-7 py-3.5 rounded-full text-sm font-semibold hover:border-[#E8B84B]/40 hover:text-white transition-all"
                >
                  Nossas Soluções
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* OAB info */}
              <p className="text-white/70 text-sm mt-8 tracking-wide">
                OAB/PI · Atendimento nacional · Sedes em CE, PI e MA
              </p>
            </div>

            {/* ────────── DIREITA — card visual ────────── */}
            <div className="relative order-1 lg:order-2 flex justify-center items-center pb-8 lg:pb-0">
              {/* Card principal */}
              <div
                className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#E8B84B]/15"
                style={{ background: "linear-gradient(160deg, #1d4170 0%, #19385C 50%, #0f2340 100%)" }}
              >
                {/* Topo: LOGOMARCA REAL */}
                <div className="px-6 pt-5 pb-4 border-b border-white/10">
                  <img
                    src="/logo-mm-crop.png"
                    alt="Mauro Monção Advogados Associados"
                    className="h-12 w-auto object-contain"
                  />
                </div>

                {/* Skyline SVG — ocupa 55% da largura */}
                <div className="relative w-full" style={{ paddingBottom: "48%" }}>
                  <svg viewBox="0 0 500 240" className="absolute inset-0 w-full h-full" fill="none">
                    <defs>
                      <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0b1e35"/>
                        <stop offset="100%" stopColor="#19385C"/>
                      </linearGradient>
                      <linearGradient id="hGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E8B84B" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#E8B84B" stopOpacity="0.2"/>
                      </linearGradient>
                      <linearGradient id="hFade" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#0f2340" stopOpacity="0.95"/>
                        <stop offset="100%" stopColor="#0f2340" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <rect width="500" height="240" fill="url(#hSky)"/>
                    {/* Stars */}
                    {[15,45,80,120,160,200,245,285,325,370,410,455,30,65,105,145,185,230,270,315,360,405,450].map((x,i)=>(
                      <circle key={i} cx={x} cy={5+(i%8)*6} r={i%4===0?1.3:0.7} fill="#E8B84B" opacity={0.35+(i%3)*0.1}/>
                    ))}
                    {/* Buildings — cityscape */}
                    <rect x="0"   y="160" width="40"  height="80"  fill="url(#hGold)" opacity="0.4"/>
                    <rect x="45"  y="120" width="50"  height="120" fill="url(#hGold)" opacity="0.6"/>
                    <rect x="55"  y="95"  width="30"  height="25"  fill="url(#hGold)" opacity="0.6"/>
                    <rect x="62"  y="72"  width="16"  height="23"  fill="url(#hGold)" opacity="0.5"/>
                    <rect x="100" y="140" width="38"  height="100" fill="url(#hGold)" opacity="0.4"/>
                    <rect x="143" y="80"  width="70"  height="160" fill="url(#hGold)" opacity="0.9"/>
                    <rect x="155" y="55"  width="46"  height="25"  fill="url(#hGold)" opacity="0.9"/>
                    <rect x="164" y="32"  width="28"  height="23"  fill="url(#hGold)" opacity="0.9"/>
                    <rect x="170" y="14"  width="16"  height="18"  fill="url(#hGold)" opacity="0.9"/>
                    <rect x="218" y="108" width="52"  height="132" fill="url(#hGold)" opacity="0.55"/>
                    <rect x="229" y="82"  width="30"  height="26"  fill="url(#hGold)" opacity="0.55"/>
                    <rect x="275" y="90"  width="60"  height="150" fill="url(#hGold)" opacity="0.65"/>
                    <rect x="287" y="64"  width="36"  height="26"  fill="url(#hGold)" opacity="0.65"/>
                    <rect x="340" y="118" width="48"  height="122" fill="url(#hGold)" opacity="0.45"/>
                    <rect x="350" y="95"  width="28"  height="23"  fill="url(#hGold)" opacity="0.45"/>
                    <rect x="393" y="138" width="55"  height="102" fill="url(#hGold)" opacity="0.35"/>
                    <rect x="455" y="155" width="45"  height="85"  fill="url(#hGold)" opacity="0.3"/>
                    {/* Ground */}
                    <rect x="0" y="235" width="500" height="5" fill="#E8B84B" opacity="0.2"/>
                    {/* Bottom overlay */}
                    <rect x="0" y="170" width="500" height="70" fill="url(#hFade)"/>
                  </svg>
                  {/* Caption overlay */}
                  <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between z-10">
                    <span className="text-[#E8B84B] font-serif text-xs font-semibold tracking-wider">
                      Advocacia Especializada
                    </span>
                    <span className="text-white/70 text-[11px] tracking-widest">CE · PI · MA</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 divide-x divide-white/8 border-t border-white/8">
                  {[
                    { v: "+15", l: "Anos" },
                    { v: "500+", l: "Clientes" },
                    { v: "3", l: "Estados" },
                    { v: "24h", l: "Online" },
                  ].map((s) => (
                    <div key={s.l} className="py-4 text-center">
                      <p className="text-[#E8B84B] font-bold text-lg font-serif leading-none">{s.v}</p>
                      <p className="text-white/75 text-xs mt-1 uppercase tracking-wider">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge — Dr. Ben */}
              <div className="absolute -bottom-3 -right-2 lg:-right-6 bg-[#0f2340] border border-[#E8B84B]/35 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 shadow-2xl">
                <div className="w-8 h-8 rounded-full bg-[#E8B84B] flex items-center justify-center text-[#19385C] font-black text-[10px] shrink-0">Dr</div>
                <div>
                  <p className="text-white text-xs font-bold leading-none">Dr. Ben</p>
                  <p className="text-white/75 text-xs mt-0.5">Assistente 24h</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse ml-1 shrink-0" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#112845] border-y border-[#E8B84B]/15 py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { v: "15+", l: "Anos de Experiência" },
              { v: "3", l: "Estados de Atuação" },
              { v: "500+", l: "Clientes Atendidos" },
              { v: "24h", l: "Atendimento" },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-bold text-[#E8B84B] font-serif">{s.v}</p>
                <p className="text-sm text-white/75 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ÁREAS ═══ */}
      <section className="py-20 bg-[#f7f5f0]">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#E8B84B] text-sm font-bold uppercase tracking-[0.2em]">Especialidades</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#19385C] mt-2 font-serif">Áreas de Atuação</h2>
            <p className="text-gray-500 max-w-xl mx-auto mt-3 text-sm leading-relaxed">
              Atuamos nos principais ramos do Direito com expertise técnica e dedicação para proteger seus direitos e interesses.
            </p>
          </div>

          {/* Cards fixos — 8 ramos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Scale,         title: "Direito Tributário",                     sub: "Defesa fiscal, planejamento e compliance." },
              { icon: Shield,        title: "Planejamento Patrimonial",               sub: "Holdings, sucessão e proteção de patrimônio." },
              { icon: Building2,     title: "Advocacia Pública Municipal",            sub: "Assessoria e contencioso para municípios." },
              { icon: Home,          title: "Direito Imobiliário",                    sub: "Due diligence, contratos e regularizações." },
              { icon: Users,         title: "Família e Sucessões",                   sub: "Inventários, divórcio e planejamento." },
              { icon: Leaf,          title: "Direito Ambiental",                     sub: "Licenciamento, autos e TAC ambiental." },
              { icon: ShoppingCart,  title: "Direito do Consumidor",                 sub: "Proteção de direitos e revisão contratual." },
              { icon: HeartHandshake,title: "Direito Previdenciário",                sub: "Aposentadoria, revisões e benefícios INSS." },
            ].map(({ icon: Icon, title, sub }) => (
              <Link
                key={title}
                href="/areas-de-atuacao"
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-[#E8B84B]/40"
              >
                <div className="w-12 h-12 bg-[#19385C] rounded-xl flex items-center justify-center text-[#E8B84B] mb-4 group-hover:bg-[#E8B84B] group-hover:text-[#19385C] transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#19385C] mb-2 group-hover:text-[#E8B84B] transition-colors font-serif leading-snug">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{sub}</p>
                <span className="inline-flex items-center gap-1 text-[#E8B84B] text-sm font-semibold mt-4">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Botão ver todas */}
          <div className="text-center mt-10">
            <Link
              href="/areas-de-atuacao"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm border-2 transition-all hover:bg-[#19385C] hover:text-white"
              style={{ borderColor: "#19385C", color: "#19385C" }}
            >
              Ver todas as áreas de atuação
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ POR QUE ESCOLHER ═══ */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#E8B84B] text-sm font-bold uppercase tracking-[0.2em]">Diferenciais</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#19385C] mt-2 mb-6 font-serif">
                Por que escolher o escritório{" "}
                <span className="text-[#E8B84B]">Mauro Monção?</span>
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                Com mais de 15 anos de dedicação à prática jurídica, nosso escritório oferece
                atendimento personalizado e soluções eficientes para cada caso.
              </p>
              <div className="space-y-3.5">
                {[
                  "Atendimento personalizado e humanizado",
                  "Experiência em administração pública municipal",
                  "Atuação em 3 estados: Ceará, Piauí e Maranhão",
                  "Equipe especializada em múltiplas áreas do Direito",
                  "Atendimento 24 horas via assistente jurídico Dr. Ben",
                  "Planejamento estratégico e preventivo",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#E8B84B] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#19385C] rounded-3xl p-8 text-white shadow-2xl">
              <div className="w-12 h-12 bg-[#E8B84B]/15 rounded-2xl flex items-center justify-center mb-5">
                <Scale className="w-7 h-7 text-[#E8B84B]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 font-serif">Consulta Inicial Gratuita</h3>
              <p className="text-white/85 mb-6 leading-relaxed text-sm">
                Agende uma consulta sem compromisso e descubra como podemos ajudar no seu caso.
              </p>
              <a
                href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E8B84B] text-[#19385C] px-6 py-3 rounded-full font-bold hover:brightness-110 transition-colors text-sm"
              >
                Agendar Consulta <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      {latestPosts.length > 0 && (
        <section className="py-20 bg-[#f7f5f0]">
          <div className="container">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-[#E8B84B] text-sm font-bold uppercase tracking-[0.2em]">Conteúdo</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#19385C] mt-2 font-serif">Insights Jurídicos</h2>
                <p className="text-gray-500 mt-1 text-sm">Artigos e análises da nossa equipe especializada</p>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-2 text-[#E8B84B] font-semibold hover:underline shrink-0 text-sm">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestPosts.slice(0, 3).map((post: any, i: number) => (
                <Link key={post.id || i} href={`/blog/${post.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-[#E8B84B]/30 flex flex-col"
                >
                  <div className="aspect-video bg-[#19385C] flex items-center justify-center overflow-hidden">
                    {post.coverImage
                      ? <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <Scale className="w-10 h-10 text-[#E8B84B]/30" />}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {post.categorySlug && (
                        <span className="text-xs text-[#E8B84B] font-bold bg-[#E8B84B]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />{post.categorySlug}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-2.5 h-2.5" />
                          {new Date(post.publishedAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-[#19385C] mb-2 group-hover:text-[#E8B84B] transition-colors leading-snug font-serif">{post.title}</h3>
                    {post.excerpt && <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>}
                    <span className="inline-flex items-center gap-1 text-[#E8B84B] text-sm font-semibold mt-4">
                      Ler artigo <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-20 bg-[#19385C] text-white">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8B84B]/20 border border-[#E8B84B]/60 rounded-full px-4 py-2 text-sm text-[#E8B84B] font-bold uppercase tracking-[0.15em] mb-6">
            Atendimento 24h
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-serif">Precisa de orientação jurídica?</h2>
          <p className="text-white/85 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Entre em contato agora e fale com nosso assistente jurídico Dr. Ben. Disponível 24 horas.
          </p>
          <a
            href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E8B84B] text-[#19385C] px-8 py-4 rounded-full text-base font-bold hover:brightness-110 transition-colors shadow-lg shadow-[#E8B84B]/20"
          >
            <MessageCircle className="w-5 h-5" />
            Falar com Dr. Ben
          </a>
        </div>
      </section>

    </SiteLayout>
  );
}
