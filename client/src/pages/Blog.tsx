import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Calendar, ArrowRight, Tag, BookOpen } from "lucide-react";
import SEOHead, { buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";

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

export default function Blog() {
  const { data: posts } = trpc.blog.listPublic.useQuery();

  return (
    <SiteLayout>
      <SEOHead
        title="Blog Jurídico — Artigos sobre Direito Tributário e Empresarial"
        description="Artigos, análises e notícias sobre Direito Tributário, Planejamento Patrimonial, Previdenciário e Empresarial. Conteúdo produzido pela equipe Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/blog"
        keywords="blog jurídico, artigos direito tributário, recuperação tributária, planejamento fiscal, advocacia Piauí"
        jsonLd={[buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "Blog", url: "/blog" }]), buildOrganizationLD()]}
      />
      {/* Hero */}
      <section className="text-white py-20" style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
        <div className="container">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-5"
            style={{ background: `${GOLD}15`, border: `1px solid ${GOLD}50`, color: GOLD }}>
            <BookOpen className="w-3.5 h-3.5" />
            Canal de Conhecimento Jurídico
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold font-serif mb-4">Blog Jurídico</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Artigos, análises e orientações sobre tributário, previdenciário, bancário,
            imobiliário e muito mais — em linguagem clara e objetiva.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {!posts || posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 text-lg">Nenhum artigo publicado ainda.</p>
              <p className="text-gray-400 mt-2">Em breve teremos novidades!</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-400 mb-8">{posts.length} artigos publicados</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(posts as any[]).map((post) => {
                  const category = post.categorySlug || (post.categoryId ? "artigo" : null);
                  const categoryLabel = category ? (CATEGORY_LABELS[category] || "Artigo") : null;
                  const date = post.publishedAt || post.createdAt;
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                    >
                      {post.coverImage ? (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video flex items-center justify-center"
                          style={{ background: `linear-gradient(135deg, #0b1e35, ${NAVY})` }}>
                          <BookOpen className="w-10 h-10 opacity-20 text-white" />
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          {date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(date).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                          {categoryLabel && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: `${GOLD}15`, color: GOLD }}>
                              <Tag className="w-3 h-3" />
                              {categoryLabel}
                            </span>
                          )}
                        </div>
                        <h2 className="font-serif text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[#E8B84B] transition-colors"
                          style={{ color: NAVY }}>
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
                        )}
                        <span className="inline-flex items-center gap-1 text-sm font-semibold mt-auto"
                          style={{ color: GOLD }}>
                          Ler artigo completo <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, #07182e, ${NAVY})` }}>
        <div className="container text-center max-w-2xl">
          <h2 className="font-serif text-3xl font-bold mb-4">Precisa de orientação jurídica personalizada?</h2>
          <p className="text-gray-300 mb-8">Nossos artigos são informativos, mas cada caso é único. Fale com nossos especialistas.</p>
          <a
            href="https://wa.me/5586994820054?text=Olá!%20Li%20o%20blog%20e%20gostaria%20de%20uma%20orientação%20jurídica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base hover:brightness-110 transition-all shadow-lg"
            style={{ background: GOLD, color: NAVY }}
          >
            Falar com Especialista →
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
