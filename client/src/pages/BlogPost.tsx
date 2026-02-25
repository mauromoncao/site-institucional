import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import { Link } from "wouter";
import { Calendar, ArrowLeft, User, Tag, ArrowRight, BookOpen } from "lucide-react";
import SEOHead, { buildArticleLD, buildBreadcrumbLD } from "@/components/SEOHead";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

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

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.getBySlug.useQuery({ slug: params.slug || "" });

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#E8B84B] border-t-transparent rounded-full mx-auto" />
        </div>
      </SiteLayout>
    );
  }

  if (!post) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold font-serif text-gray-800 mb-4">Artigo não encontrado</h1>
          <Link href="/blog" className="text-[#E8B84B] hover:underline font-semibold">← Voltar para o Blog</Link>
        </div>
      </SiteLayout>
    );
  }

  const category = (post as any).categorySlug || null;
  const categoryLabel = category ? (CATEGORY_LABELS[category] || "Artigo") : null;
  const date = post.publishedAt || (post as any).createdAt;
  const hasCover = !!post.coverImage;

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
          HERO — imagem de capa como fundo quando disponível
          Sem imagem → gradiente navy sólido
      ══════════════════════════════════════════ */}
      <section
        className="relative text-white overflow-hidden"
        style={{ minHeight: hasCover ? "480px" : "auto", display: "flex", alignItems: "flex-end" }}
      >
        {/* Fundo: imagem ou gradiente */}
        {hasCover ? (
          <>
            <img
              src={post.coverImage!}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Overlay escuro de baixo para cima — protege o texto */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,24,46,0.97) 0%, rgba(7,24,46,0.80) 45%, rgba(7,24,46,0.25) 100%)",
              }}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}
          />
        )}

        {/* Conteúdo do hero */}
        <div className="container max-w-4xl relative z-10 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
          </Link>

          {categoryLabel && (
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}50`, color: GOLD }}
              >
                <Tag className="w-3 h-3" />
                {categoryLabel}
              </span>
            </div>
          )}

          <h1 className="text-3xl lg:text-4xl font-bold font-serif mb-5 leading-tight max-w-3xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-5 text-gray-400 text-sm">
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </span>
            )}
            {post.authorName && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.authorName}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTEÚDO DO ARTIGO + SIDEBAR
      ══════════════════════════════════════════ */}
      <section className="py-12 bg-white">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* Texto principal */}
            <article>
              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-[#19385C]
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-gray-600 prose-li:mb-1
                  prose-strong:text-[#19385C]
                  prose-a:text-[#E8B84B] prose-a:no-underline hover:prose-a:underline
                  prose-ol:pl-6 prose-ul:pl-6"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />

              {/* Tags */}
              {(post as any).tags && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {String((post as any).tags).split(",").map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: `${NAVY}08`, color: NAVY, border: `1px solid ${NAVY}20` }}
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Voltar */}
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

            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-24">

              {/* Card autor */}
              <div
                className="rounded-2xl p-6 mb-6"
                style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})`, border: `1px solid ${GOLD}25` }}
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
                <p className="text-white font-bold font-serif text-sm mb-1">Dr. Mauro Monção</p>
                <p className="text-xs mb-4" style={{ color: GOLD }}>Advogado · OAB/PI · CE · MA</p>
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
                  Consultar agora →
                </a>
              </div>

              {/* Card CTA */}
              <div
                className="rounded-2xl p-6"
                style={{ background: "#f7f5f0", border: `1px solid ${GOLD}30` }}
              >
                <p className="font-serif font-bold text-base mb-2" style={{ color: NAVY }}>
                  Precisa de orientação personalizada?
                </p>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">
                  Cada caso é único. Agende uma análise gratuita com nossa equipe.
                </p>
                <a
                  href="/contato"
                  className="inline-flex items-center gap-1 text-sm font-semibold"
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
          CTA INFERIOR
      ══════════════════════════════════════════ */}
      <section className="py-14 text-white" style={{ background: `linear-gradient(135deg, #07182e, ${NAVY})` }}>
        <div className="container text-center max-w-2xl">
          <h2 className="font-serif text-2xl lg:text-3xl font-bold mb-3">
            Este artigo foi útil para você?
          </h2>
          <p className="text-gray-300 mb-8 text-base">
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
              Falar pelo WhatsApp →
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
