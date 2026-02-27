import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useParams, Link } from "wouter";
import {
  Calendar, ArrowLeft, User, Tag, ArrowRight, BookOpen,
  ChevronRight, Clock, MessageCircle, Share2, Star,
  Copy, Check, Facebook, Twitter,
} from "lucide-react";
import { useState } from "react";
import SEOHead, { buildArticleLD, buildBreadcrumbLD } from "@/components/SEOHead";

const GOLD = "#E8B84B";
const NAVY = "#19385C";
const DARK = "#07182e";

const CATEGORY_LABELS: Record<string, string> = {
  tributario: "Tributário",
  sucessorio: "Sucessório",
  bancario: "Bancário",
  previdenciario: "Previdenciário",
  imobiliario: "Imobiliário",
  publico: "Advocacia Pública",
  trabalhista: "Trabalhista",
  familia: "Família",
  consumidor: "Consumidor",
};

/* ──────────────────────────────────────────────
   SHARE BAR
────────────────────────────────────────────── */
function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  function copy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-1">
        Compartilhar:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#1877F2] hover:opacity-80 transition-opacity"
        title="Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#1DA1F2] hover:opacity-80 transition-opacity"
        title="Twitter/X"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:opacity-80 transition-opacity"
        title="WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
      <button
        onClick={copy}
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
        title="Copiar link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────
   RELATED POST card
────────────────────────────────────────────── */
function RelatedCard({ post }: { post: any }) {
  const date = post.publishedAt || post.createdAt;
  const cat = post.categorySlug;
  const catLabel = cat ? (CATEGORY_LABELS[cat] || "Artigo") : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-start p-4 rounded-xl border border-gray-100 hover:border-[#E8B84B]/30 hover:shadow-sm transition-all bg-white"
    >
      {/* Thumbnail */}
      <div className="shrink-0 w-20 h-16 rounded-lg overflow-hidden bg-gray-100">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${DARK}, ${NAVY})` }}
          >
            <BookOpen className="w-5 h-5 opacity-20 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {catLabel && (
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: GOLD }}>
            {catLabel}
          </span>
        )}
        <h4
          className="text-sm font-semibold line-clamp-2 leading-snug mt-0.5 group-hover:text-[#E8B84B] transition-colors"
          style={{ color: NAVY }}
        >
          {post.title}
        </h4>
        {date && (
          <p className="text-xs text-gray-400 mt-1">
            {new Date(date).toLocaleDateString("pt-BR")}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────── */
export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({
    slug: params.slug || "",
  });
  const { data: allPosts } = trpc.blog.listPublic.useQuery();

  /* ── Loading ── */
  if (isLoading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <div
            className="animate-spin w-10 h-10 border-4 border-t-transparent rounded-full mx-auto"
            style={{ borderColor: `${GOLD} transparent transparent transparent` }}
          />
          <p className="text-gray-400 text-sm mt-4">Carregando artigo...</p>
        </div>
      </SiteLayout>
    );
  }

  /* ── Not found ── */
  if (!post) {
    return (
      <SiteLayout>
        <div className="py-32 text-center max-w-md mx-auto px-4">
          <BookOpen className="w-14 h-14 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold font-serif mb-3" style={{ color: NAVY }}>
            Artigo não encontrado
          </h1>
          <p className="text-gray-500 mb-6">
            O artigo que você procura não existe ou foi removido.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
            style={{ background: GOLD, color: NAVY }}
          >
            <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const category = (post as any).categorySlug || null;
  const categoryLabel = category ? (CATEGORY_LABELS[category] || "Artigo") : null;
  const date = post.publishedAt || (post as any).createdAt;
  const hasCover = !!post.coverImage;

  /* Related posts: same category, different article */
  const related = (allPosts || [])
    .filter(
      (p: any) =>
        p.id !== post.id &&
        (category ? p.categorySlug === category : true)
    )
    .slice(0, 3);

  /* All recent posts for sidebar (excluding current) */
  const recentSidebar = (allPosts || [])
    .filter((p: any) => p.id !== post.id)
    .slice(0, 4);

  return (
    <SiteLayout>
      <SEOHead
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt || undefined}
        canonical={`https://mauromoncao.adv.br/blog/${post.slug}`}
        ogImage={post.coverImage || post.featuredImage || undefined}
        ogType="article"
        author={post.author || "Mauro Monção"}
        publishedAt={post.publishedAt || undefined}
        modifiedAt={(post as any).updatedAt || post.publishedAt || undefined}
        keywords={post.tags ? post.tags.join(", ") : undefined}
        jsonLd={[
          buildArticleLD({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt || "",
            author: post.author || "Mauro Monção",
            publishedAt: post.publishedAt || undefined,
            updatedAt: (post as any).updatedAt || undefined,
            featuredImage: post.coverImage || post.featuredImage || undefined,
            category: post.categorySlug || post.category || undefined,
          }),
          buildBreadcrumbLD([
            { name: "Início", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{ minHeight: hasCover ? "520px" : "320px", display: "flex", alignItems: "flex-end" }}
      >
        {/* Background */}
        {hasCover ? (
          <>
            <img
              src={post.coverImage!}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,24,46,0.97) 0%, rgba(7,24,46,0.82) 50%, rgba(7,24,46,0.3) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
            }}
          />
        )}

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="container max-w-5xl relative z-10 py-12 lg:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-white/50 mb-6">
            <Link href="/" className="hover:text-white/80 transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/70 line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category badge */}
          {categoryLabel && (
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: `${GOLD}20`,
                  border: `1px solid ${GOLD}50`,
                  color: GOLD,
                }}
              >
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="font-serif font-bold text-white leading-tight mb-5 max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-white/70 text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
              {post.excerpt}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-white/55 text-sm">
            {(post as any).authorName && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {(post as any).authorName}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              8 min de leitura
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTEÚDO + SIDEBAR
      ══════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">

            {/* ── ARTICLE CONTENT ── */}
            <article>
              {/* Excerpt box com borda dourada */}
              {post.excerpt && (
                <div
                  className="rounded-xl p-6 mb-8"
                  style={{
                    background: `${GOLD}08`,
                    borderLeft: `4px solid ${GOLD}`,
                  }}
                >
                  <p
                    className="text-base font-medium leading-relaxed italic"
                    style={{ color: NAVY }}
                  >
                    "{post.excerpt}"
                  </p>
                </div>
              )}

              {/* Main content */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-[#19385C]
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-3
                  prose-h2:border-b-2 prose-h2:border-[#E8B84B]/30
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-5
                  prose-li:text-gray-600 prose-li:mb-2
                  prose-strong:text-[#19385C] prose-strong:font-semibold
                  prose-a:text-[#E8B84B] prose-a:no-underline hover:prose-a:underline
                  prose-ol:pl-6 prose-ul:pl-6
                  prose-blockquote:border-l-4 prose-blockquote:border-[#E8B84B]/50
                  prose-blockquote:bg-[#E8B84B]/05 prose-blockquote:rounded-r-xl
                  prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic
                  prose-code:text-[#E8B84B] prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* ── CTA inline ── */}
              <div
                className="my-12 rounded-2xl p-7 lg:p-8"
                style={{
                  background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="flex-1">
                    <p className="font-serif font-bold text-white text-lg mb-1">
                      Este artigo esclareceu suas dúvidas?
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Cada situação jurídica é única. Fale agora com nossa equipe e receba orientação personalizada para o seu caso.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/5586994820054?text=Olá!%20Li%20um%20artigo%20do%20blog%20e%20preciso%20de%20orientação%20jurídica."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>

              {/* ── Tags ── */}
              {(post as any).tags && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {String((post as any).tags)
                      .split(",")
                      .map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${NAVY}08`,
                            color: NAVY,
                            border: `1px solid ${NAVY}20`,
                          }}
                        >
                          {tag.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* ── Share ── */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <ShareBar title={post.title} />
              </div>

              {/* ── Author box ── */}
              <div
                className="mt-10 rounded-2xl p-7 lg:p-8 flex flex-col sm:flex-row items-start gap-6"
                style={{
                  background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
                  border: `1px solid ${GOLD}25`,
                }}
              >
                <div
                  className="w-20 h-20 rounded-full overflow-hidden border-2 shrink-0"
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
                <div className="flex-1">
                  <p
                    className="font-bold text-white font-serif text-lg mb-0.5"
                  >
                    Dr. Mauro Monção
                  </p>
                  <p className="text-xs mb-3" style={{ color: GOLD }}>
                    Advogado — OAB/PI 22.291 · CE · MA
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    Especialista em Direito Tributário, Planejamento Patrimonial e Previdenciário.
                    Mais de 15 anos de experiência na defesa de empresas e pessoas físicas em
                    Piauí, Ceará e Maranhão.
                  </p>
                  <a
                    href="https://wa.me/5586994820054?text=Olá!%20Li%20um%20artigo%20do%20Dr.%20Mauro%20Monção%20e%20gostaria%20de%20uma%20consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all"
                    style={{ background: GOLD, color: NAVY }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Consultar o Advogado
                  </a>
                </div>
              </div>

              {/* ── Back link ── */}
              <div className="mt-10">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: GOLD }}
                >
                  <ArrowLeft className="w-4 h-4" /> Ver todos os artigos
                </Link>
              </div>
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-24">

              {/* Author card */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg, ${DARK}, ${NAVY})`,
                  border: `1px solid ${GOLD}25`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full mb-4 overflow-hidden border-2"
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
                <p className="text-white font-bold font-serif text-sm mb-0.5">
                  Dr. Mauro Monção
                </p>
                <p className="text-xs mb-4" style={{ color: GOLD }}>
                  Advogado · OAB/PI · CE · MA
                </p>
                <p className="text-white/60 text-xs leading-relaxed mb-5">
                  +15 anos de experiência em Direito Tributário, Previdenciário e Bancário.
                  Atua em Piauí, Ceará, Maranhão e em todo o Brasil.
                </p>
                <a
                  href="https://wa.me/5586994820054?text=Olá!%20Li%20o%20blog%20e%20gostaria%20de%20uma%20orientação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all"
                  style={{ background: GOLD, color: NAVY }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar agora
                </a>
              </div>

              {/* Share */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "#f8f9fa", border: "1px solid #e5e7eb" }}
              >
                <p className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: NAVY }}>
                  <Share2 className="w-4 h-4" style={{ color: GOLD }} />
                  Compartilhe este artigo
                </p>
                <ShareBar title={post.title} />
              </div>

              {/* Categories */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "#f8f9fa", border: "1px solid #e5e7eb" }}
              >
                <p className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                  <Tag className="w-4 h-4" style={{ color: GOLD }} />
                  Categorias
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    "Tributário", "Bancário", "Previdenciário",
                    "Imobiliário", "Sucessório", "Consumidor",
                  ].map((cat) => (
                    <Link
                      key={cat}
                      href="/blog"
                      className="flex items-center justify-between py-2 text-sm text-gray-600 hover:text-[#E8B84B] transition-colors border-b border-gray-100 last:border-0"
                    >
                      <span>{cat}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              {recentSidebar.length > 0 && (
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "#f8f9fa", border: "1px solid #e5e7eb" }}
                >
                  <p className="font-semibold text-sm mb-4 flex items-center gap-2" style={{ color: NAVY }}>
                    <Star className="w-4 h-4" style={{ color: GOLD }} />
                    Artigos Recentes
                  </p>
                  <div className="flex flex-col gap-3">
                    {recentSidebar.map((p: any) => (
                      <RelatedCard key={p.id} post={p} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "#f7f5f0", border: `1px solid ${GOLD}30` }}
              >
                <p
                  className="font-serif font-bold text-base mb-2"
                  style={{ color: NAVY }}
                >
                  Precisa de orientação personalizada?
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  Cada caso é único. Agende uma análise com nossa equipe.
                </p>
                <a
                  href="/contato"
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: GOLD }}
                >
                  Falar com especialista <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RELATED ARTICLES
      ══════════════════════════════════════════ */}
      {related.length > 0 && (
        <section className="py-14 bg-gray-50">
          <div className="container max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="font-serif font-bold text-2xl"
                style={{ color: NAVY }}
              >
                Artigos Relacionados
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold flex items-center gap-1"
                style={{ color: GOLD }}
              >
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p: any) => {
                const relCat = p.categorySlug;
                const relLabel = relCat ? (CATEGORY_LABELS[relCat] || "Artigo") : null;
                const relDate = p.publishedAt || p.createdAt;
                return (
                  <Link
                    key={p.id}
                    href={`/blog/${p.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                  >
                    {p.coverImage ? (
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {relLabel && (
                          <div
                            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                            style={{ background: GOLD, color: NAVY }}
                          >
                            {relLabel}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="aspect-video flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${DARK}, ${NAVY})` }}
                      >
                        <BookOpen className="w-8 h-8 opacity-10 text-white" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        {relDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(relDate).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>
                      <h3
                        className="font-serif font-semibold text-base line-clamp-2 mb-3 group-hover:text-[#E8B84B] transition-colors leading-snug"
                        style={{ color: NAVY }}
                      >
                        {p.title}
                      </h3>
                      <span
                        className="inline-flex items-center gap-1 text-sm font-semibold mt-auto"
                        style={{ color: GOLD }}
                      >
                        Ler artigo <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section
        className="py-14 text-white"
        style={{ background: `linear-gradient(135deg, ${DARK}, ${NAVY})` }}
      >
        <div className="container text-center max-w-2xl">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-3">
            Este artigo foi útil para você?
          </h2>
          <p className="text-white/70 mb-8 text-base">
            Fale com nossa equipe e descubra como podemos ajudar no seu caso específico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5586994820054?text=Olá!%20Li%20um%20artigo%20do%20blog%20e%20gostaria%20de%20uma%20orientação%20jurídica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:brightness-110 transition-all shadow-lg"
              style={{ background: GOLD, color: NAVY }}
            >
              <MessageCircle className="w-5 h-5" />
              Falar pelo WhatsApp
            </a>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 hover:bg-white/5 transition-all"
              style={{ borderColor: `${GOLD}50`, color: GOLD }}
            >
              Ver mais artigos
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
