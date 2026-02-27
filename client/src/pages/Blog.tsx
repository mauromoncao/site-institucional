import { useState, useMemo } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import {
  Calendar, ArrowRight, Tag, BookOpen, Search, ChevronRight,
  Play, Shield, Scale, Gavel, Building2, FileText, Users,
  MessageCircle, TrendingUp, Clock, Star, ChevronDown, ChevronUp,
} from "lucide-react";
import SEOHead, { buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const DARK = "#07182e";

/* ──────────────────────────────────────────────
   CATEGORY CONFIG
────────────────────────────────────────────── */
const CATEGORIES = [
  { slug: "tributario",       label: "Tributário",           icon: Shield },
  { slug: "bancario",         label: "Bancário",             icon: Building2 },
  { slug: "previdenciario",   label: "Previdenciário",       icon: Users },
  { slug: "imobiliario",      label: "Imobiliário",          icon: Gavel },
  { slug: "publico",          label: "Advocacia Pública",    icon: Scale },
  { slug: "consumidor",       label: "Consumidor",           icon: FileText },
  { slug: "sucessorio",       label: "Sucessório",           icon: Star },
  { slug: "trabalhista",      label: "Trabalhista",          icon: TrendingUp },
  { slug: "familia",          label: "Família",              icon: MessageCircle },
];

function getCategoryLabel(slug: string | null | undefined) {
  if (!slug) return null;
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? "Artigo";
}

/* ──────────────────────────────────────────────
   VIDEO SECTION DATA
────────────────────────────────────────────── */
const VIDEOS = [
  {
    id: "dQw4w9WgXcQ",
    title: "Planejamento Tributário 2025: O que mudou com a Reforma?",
    duration: "18:42",
    views: "4.2 mil",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Holding Familiar: como proteger seu patrimônio com segurança jurídica",
    duration: "22:10",
    views: "3.8 mil",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Autuação Fiscal: Como agir nas primeiras 72 horas",
    duration: "15:55",
    views: "6.1 mil",
  },
];

/* ──────────────────────────────────────────────
   FAQ DATA
────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Os artigos do blog substituem consulta jurídica?",
    a: "Não. Os artigos são informativos e educativos. Cada caso é único e requer análise personalizada. Para orientação específica ao seu caso, recomendamos agendar uma consulta com nossa equipe.",
  },
  {
    q: "Com que frequência vocês publicam novos artigos?",
    a: "Publicamos semanalmente novos artigos sobre Direito Tributário, Previdenciário, Bancário, Imobiliário e Empresarial. Assine nossa newsletter para receber as novidades primeiro.",
  },
  {
    q: "Posso compartilhar os artigos do blog?",
    a: "Sim, com atribuição ao autor e link para o artigo original. O conteúdo é de autoria do escritório Mauro Monção Advogados Associados.",
  },
  {
    q: "Como posso sugerir um tema para novo artigo?",
    a: "Entre em contato pelo WhatsApp ou formulário de contato. Adoramos receber sugestões de temas que sejam relevantes para o cotidiano jurídico dos nossos leitores.",
  },
];

/* ──────────────────────────────────────────────
   CARD component
────────────────────────────────────────────── */
function PostCard({ post }: { post: any }) {
  const category = post.categorySlug || null;
  const categoryLabel = getCategoryLabel(category);
  const date = post.publishedAt || post.createdAt;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Imagem */}
      {post.coverImage ? (
        <div className="aspect-video overflow-hidden relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {categoryLabel && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: GOLD, color: NAVY }}
            >
              {categoryLabel}
            </div>
          )}
        </div>
      ) : (
        <div
          className="aspect-video flex items-center justify-center relative"
          style={{ background: `linear-gradient(135deg, ${DARK}, ${NAVY})` }}
        >
          <BookOpen className="w-10 h-10 opacity-10 text-white" />
          {categoryLabel && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{ background: GOLD, color: NAVY }}
            >
              {categoryLabel}
            </div>
          )}
        </div>
      )}

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-1">
        {/* Data + tempo de leitura */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(date).toLocaleDateString("pt-BR")}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            5 min
          </span>
        </div>

        {/* Título */}
        <h2
          className="font-serif text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#E8B84B] transition-colors leading-snug"
          style={{ color: NAVY }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* CTA */}
        <span
          className="inline-flex items-center gap-1.5 text-sm font-semibold mt-auto group-hover:gap-3 transition-all"
          style={{ color: GOLD }}
        >
          Ler artigo completo <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   HIGHLIGHT CARD — usado nos 3 destaques
   Variantes: "large" (card principal) e "small"
────────────────────────────────────────────── */
function HighlightCard({ post, variant = "small", badge }: { post: any; variant?: "large" | "small"; badge?: string }) {
  const category = post.categorySlug || null;
  const categoryLabel = getCategoryLabel(category);
  const date = post.publishedAt || post.createdAt;
  const minH = variant === "large" ? "420px" : "260px";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative rounded-2xl overflow-hidden flex flex-col justify-end"
      style={{ minHeight: minH }}
    >
      {/* Background */}
      {post.coverImage ? (
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${DARK}, ${NAVY})` }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(7,24,46,0.96) 0%, rgba(7,24,46,0.65) 55%, rgba(7,24,46,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {badge && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em]"
              style={{ background: GOLD, color: NAVY }}
            >
              {badge}
            </span>
          )}
          {categoryLabel && (
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        <h2
          className="font-serif font-bold text-white leading-snug mb-3 group-hover:text-[#E8B84B] transition-colors"
          style={{ fontSize: variant === "large" ? "clamp(1.25rem, 2.5vw, 1.6rem)" : "1rem" }}
        >
          {post.title}
        </h2>

        {variant === "large" && post.excerpt && (
          <p className="text-white/65 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-white/50 text-xs">
            {date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8 min
            </span>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full group-hover:brightness-110 transition-all"
            style={{ background: GOLD, color: NAVY }}
          >
            Ler <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────── */
export default function Blog() {
  const { data: posts } = trpc.blog.listPublic.useQuery();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const allPosts: any[] = posts || [];

  // 3 posts mais recentes → destaques
  const highlights = allPosts.slice(0, 3);
  // restante dos posts → grade
  const remainingPosts = allPosts.slice(3);

  const filtered = useMemo(() => {
    let result = allPosts;
    if (activeCategory) {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allPosts, activeCategory, search]);

  return (
    <SiteLayout>
      <SEOHead
        title="Blog Jurídico — Artigos sobre Direito Tributário e Empresarial"
        description="Artigos, análises e notícias sobre Direito Tributário, Planejamento Patrimonial, Previdenciário e Empresarial. Conteúdo produzido pela equipe Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/blog"
        keywords="blog jurídico, artigos direito tributário, recuperação tributária, planejamento fiscal, advocacia Piauí"
        jsonLd={[
          buildBreadcrumbLD([
            { name: "Início", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
          buildOrganizationLD(),
        ]}
      />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${DARK} 0%, ${NAVY} 60%, #1e4a78 100%)`,
          paddingTop: "5rem",
          paddingBottom: "5rem",
        }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-8">
            <Link href="/" className="hover:text-white/80 transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/80">Blog</span>
          </nav>

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6"
            style={{
              background: `${GOLD}15`,
              border: `1px solid ${GOLD}50`,
              color: GOLD,
            }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Canal de Conhecimento Jurídico
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            {/* Left: título */}
            <div>
              <h1
                className="font-serif font-bold text-white leading-tight mb-4"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3.25rem)" }}
              >
                Blog Jurídico
                <br />
                <em
                  className="not-italic"
                  style={{ color: GOLD }}
                >
                  Mauro Monção
                </em>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-xl">
                Artigos aprofundados, análises legais e orientações práticas sobre
                Tributário, Previdenciário, Bancário, Imobiliário e Empresarial.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-8">
                {[
                  { v: allPosts.length || "30+", l: "artigos publicados" },
                  { v: "8", l: "áreas do direito" },
                  { v: "Semanal", l: "novas publicações" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <strong
                      className="text-2xl font-bold font-serif"
                      style={{ color: GOLD }}
                    >
                      {s.v}
                    </strong>
                    <span className="text-xs text-white/55 mt-0.5">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: busca */}
            <div>
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(232,184,75,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <p className="text-white/70 text-sm mb-3 font-medium">Buscar artigos</p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Digite palavras-chave..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E8B84B]/60 transition-colors"
                  />
                </div>

                <p className="text-white/50 text-xs mt-3">
                  Ex: "planejamento tributário", "holding familiar", "INSS"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORIES FILTER BAR
      ══════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100 sticky top-[72px] z-40 shadow-sm">
        <div className="container">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {/* Todos */}
            <button
              onClick={() => setActiveCategory(null)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
              style={
                !activeCategory
                  ? { background: NAVY, color: "white" }
                  : { background: "#f3f4f6", color: "#6b7280" }
              }
            >
              Todos ({allPosts.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = allPosts.filter(
                (p) => p.categorySlug === cat.slug
              ).length;
              if (count === 0) return null;
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() =>
                    setActiveCategory(isActive ? null : cat.slug)
                  }
                  className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
                  style={
                    isActive
                      ? { background: GOLD, color: NAVY }
                      : { background: "#f3f4f6", color: "#6b7280" }
                  }
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          ÚLTIMAS PUBLICAÇÕES — 3 destaques
      ══════════════════════════════════════ */}
      {highlights.length > 0 && !activeCategory && !search && (
        <section className="py-12 bg-gray-50">
          <div className="container">
            {/* Título da seção */}
            <div className="flex items-center justify-between mb-7">
              <div>
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] mb-1"
                  style={{ color: GOLD }}
                >
                  <span
                    className="w-4 h-0.5 rounded-full inline-block"
                    style={{ background: GOLD }}
                  />
                  Últimas Publicações
                </div>
                <h2
                  className="font-serif font-bold text-2xl"
                  style={{ color: NAVY }}
                >
                  Em Destaque
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:flex text-sm font-semibold items-center gap-1 hover:gap-2 transition-all"
                style={{ color: GOLD }}
                onClick={() => { setSearch(""); setActiveCategory(null); }}
              >
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Layout: 1 grande + 2 menores */}
            {highlights.length === 1 && (
              <HighlightCard post={highlights[0]} variant="large" badge="Destaque" />
            )}

            {highlights.length === 2 && (
              <div className="grid md:grid-cols-2 gap-5">
                <HighlightCard post={highlights[0]} variant="large" badge="Destaque" />
                <HighlightCard post={highlights[1]} variant="large" />
              </div>
            )}

            {highlights.length >= 3 && (
              <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
                {/* Card principal — maior */}
                <HighlightCard post={highlights[0]} variant="large" badge="Mais Recente" />

                {/* Coluna direita — 2 cards empilhados */}
                <div className="grid grid-rows-2 gap-5">
                  <HighlightCard post={highlights[1]} variant="small" />
                  <HighlightCard post={highlights[2]} variant="small" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          POSTS GRID — todos os artigos
      ══════════════════════════════════════ */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          {/* Header da seção */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2
                className="font-serif font-bold text-2xl mb-1"
                style={{ color: NAVY }}
              >
                {activeCategory
                  ? `${CATEGORIES.find((c) => c.slug === activeCategory)?.label || "Artigos"}`
                  : search
                  ? `Resultados para "${search}"`
                  : "Todos os Artigos"}
              </h2>
              <p className="text-gray-400 text-sm">
                {(activeCategory || search ? filtered : remainingPosts).length} artigo
                {(activeCategory || search ? filtered : remainingPosts).length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Grid */}
          {(activeCategory || search ? filtered : remainingPosts).length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg mb-2">
                {search ? "Nenhum artigo encontrado para sua busca." : "Nenhum artigo nessa categoria ainda."}
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); }}
                className="text-sm font-semibold mt-2"
                style={{ color: GOLD }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(activeCategory || search ? filtered : remainingPosts).map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORIES SHOWCASE
      ══════════════════════════════════════ */}
      {!activeCategory && !search && (
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                }}
              >
                <Tag className="w-3.5 h-3.5" />
                Áreas do Conhecimento
              </div>
              <h2
                className="font-serif font-bold text-3xl mb-3"
                style={{ color: NAVY }}
              >
                Explore por Área Jurídica
              </h2>
              <p className="text-gray-500 text-base max-w-lg mx-auto">
                Encontre conteúdo especializado nas principais áreas do Direito que impactam sua vida e negócio.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {CATEGORIES.map((cat) => {
                const count = allPosts.filter(
                  (p) => p.categorySlug === cat.slug
                ).length;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className="group p-5 rounded-2xl border text-left hover:shadow-lg transition-all"
                    style={{
                      background: "white",
                      borderColor: "#e5e7eb",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ background: `${GOLD}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: GOLD }} />
                    </div>
                    <p
                      className="font-semibold text-sm leading-tight mb-1 group-hover:text-[#E8B84B] transition-colors"
                      style={{ color: NAVY }}
                    >
                      {cat.label}
                    </p>
                    <p className="text-xs text-gray-400">
                      {count} artigo{count !== 1 ? "s" : ""}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          VIDEO SECTION
      ══════════════════════════════════════ */}
      {!activeCategory && !search && (
        <section
          className="py-16"
          style={{
            background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
          }}
        >
          <div className="container">
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                }}
              >
                <Play className="w-3.5 h-3.5" />
                Canal do YouTube
              </div>
              <h2
                className="font-serif font-bold text-3xl mb-3 text-white"
              >
                Conteúdo em Vídeo
              </h2>
              <p className="text-white/60 text-base max-w-lg mx-auto">
                Aulas, análises e orientações jurídicas em vídeo no nosso canal do YouTube.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {VIDEOS.map((v) => (
                <a
                  key={v.id + v.title}
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl overflow-hidden border transition-all hover:border-[#E8B84B]/50 hover:shadow-xl"
                  style={{ border: `1px solid rgba(232,184,75,0.15)` }}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                      alt={v.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ background: GOLD }}
                      >
                        <Play className="w-5 h-5 ml-1" style={{ color: NAVY }} />
                      </div>
                    </div>
                    {/* Duration */}
                    <div
                      className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: "rgba(0,0,0,0.8)", color: "white" }}
                    >
                      {v.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div
                    className="p-4"
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  >
                    <h3 className="text-white text-sm font-semibold leading-snug mb-2 line-clamp-2 group-hover:text-[#E8B84B] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-white/40 text-xs">
                      {v.views} visualizações
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* CTA YouTube */}
            <div className="text-center">
              <a
                href="https://www.youtube.com/@mauromoncao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:brightness-110"
                style={{
                  border: `1px solid ${GOLD}50`,
                  color: GOLD,
                  background: "transparent",
                }}
              >
                Ver todos os vídeos <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          AUTHORITY BLOCK
      ══════════════════════════════════════ */}
      {!activeCategory && !search && (
        <section className="py-16 bg-white">
          <div className="container">
            <div
              className="rounded-3xl p-8 lg:p-12 grid lg:grid-cols-2 gap-10 items-center"
              style={{
                background: `linear-gradient(135deg, ${DARK} 0%, ${NAVY} 100%)`,
              }}
            >
              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                  style={{
                    background: `${GOLD}20`,
                    border: `1px solid ${GOLD}40`,
                    color: GOLD,
                  }}
                >
                  <Star className="w-3.5 h-3.5" />
                  Autoridade Jurídica
                </div>

                <h2
                  className="font-serif font-bold text-white mb-4"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)" }}
                >
                  Por que confiar no
                  <br />
                  <span style={{ color: GOLD }}>Blog Mauro Monção?</span>
                </h2>

                <p className="text-white/70 leading-relaxed mb-6">
                  Todo conteúdo é produzido por advogados com vasta experiência em suas respectivas áreas, com base em legislação atualizada, jurisprudência dos tribunais superiores e cases reais.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: "+15 anos", l: "de experiência" },
                    { v: "3 estados", l: "PI · CE · MA" },
                    { v: "OAB/PI", l: "22.291" },
                    { v: "100%", l: "conteúdo jurídico" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <strong
                        className="text-lg font-bold font-serif block"
                        style={{ color: GOLD }}
                      >
                        {s.v}
                      </strong>
                      <span className="text-white/55 text-xs">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: autor card */}
              <div
                className="rounded-2xl p-8 flex flex-col items-center text-center"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${GOLD}25`,
                }}
              >
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-4 mb-5"
                  style={{ borderColor: GOLD }}
                >
                  <img
                    src="/dr-mauro.jpg"
                    alt="Dr. Mauro Monção"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <h3
                  className="font-serif font-bold text-xl text-white mb-1"
                >
                  Dr. Mauro Monção
                </h3>
                <p className="text-sm mb-4" style={{ color: GOLD }}>
                  Advogado — OAB/PI 22.291
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Especialista em Direito Tributário, Planejamento Patrimonial e Previdenciário. Mais de 15 anos de atuação em Piauí, Ceará e Maranhão.
                </p>
                <a
                  href="https://wa.me/5586994820054?text=Olá!%20Li%20o%20blog%20e%20gostaria%20de%20uma%20consulta."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: GOLD, color: NAVY }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Agendar Consulta
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      {!activeCategory && !search && (
        <section className="py-16 bg-gray-50">
          <div className="container max-w-3xl">
            <div className="text-center mb-10">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{
                  background: `${GOLD}15`,
                  border: `1px solid ${GOLD}40`,
                  color: GOLD,
                }}
              >
                FAQ
              </div>
              <h2
                className="font-serif font-bold text-3xl mb-3"
                style={{ color: NAVY }}
              >
                Perguntas Frequentes
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border overflow-hidden"
                  style={{ borderColor: openFaq === i ? `${GOLD}40` : "#e5e7eb" }}
                >
                  <button
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span
                      className="font-semibold text-sm leading-snug"
                      style={{ color: NAVY }}
                    >
                      {item.q}
                    </span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0 text-gray-400" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════ */}
      <section
        className="py-16 text-white"
        style={{
          background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
        }}
      >
        <div className="container text-center max-w-2xl">
          <h2 className="font-serif text-3xl font-bold mb-4">
            Precisa de orientação jurídica personalizada?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Nossos artigos são informativos, mas cada caso é único. Fale com nossos especialistas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5586994820054?text=Olá!%20Li%20o%20blog%20e%20gostaria%20de%20uma%20orientação%20jurídica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:brightness-110 transition-all shadow-lg"
              style={{ background: GOLD, color: NAVY }}
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Especialista
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 hover:bg-white/5 transition-all"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
            >
              Agendar Consulta <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
