import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useSettings } from "@/hooks/useSettings";
import { useParams } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function LandingPage() {
  const params = useParams<{ slug: string }>();
  const { data: lp, isLoading } = trpc.landingPages.getBySlug.useQuery({ slug: params.slug || "" });
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "(86) 99482-0054";

  // Update document title for SEO
  useEffect(() => {
    if (lp) {
      document.title = lp.metaTitle || lp.title || "Mauro Monção Advogados";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && lp.metaDescription) {
        metaDesc.setAttribute("content", lp.metaDescription);
      }
    }
  }, [lp]);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#E8B84B] border-t-transparent rounded-full mx-auto" />
        </div>
      </SiteLayout>
    );
  }

  if (!lp) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <h1 className="text-2xl font-bold font-serif text-gray-800 mb-4">Página não encontrada</h1>
          <Link href="/solucoes-juridicas" className="text-[#E8B84B] hover:underline">
            Ver todas as soluções jurídicas
          </Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#19385C] via-[#19385C] to-[#19385C] text-white py-16 lg:py-24">
        <div className="container">
          <Link href="/solucoes-juridicas" className="inline-flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para Soluções Jurídicas
          </Link>
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">{lp.title}</h1>
            {lp.subtitle && (
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{lp.subtitle}</p>
            )}
            <a
              href={`https://wa.me/55${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${lp.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E8B84B] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#E8B84B] transition-colors"
            >
              Fale com um Especialista
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {lp.heroImage && (
              <img src={lp.heroImage} alt={lp.title} className="w-full rounded-xl mb-8 shadow-lg" />
            )}
            {lp.content && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-[#19385C] prose-a:text-[#E8B84B]"
                dangerouslySetInnerHTML={{ __html: lp.content.replace(/\n/g, "<br/>") }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Benefits section - extracted from content */}

      {/* CTA */}
      <section className="py-16 bg-[#E8B84B]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">
            {lp.ctaText || "Precisa de orientação jurídica?"}
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato agora e fale com um especialista em {lp.title}.
          </p>
          <a
            href={`https://wa.me/55${phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${lp.title}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#19385C] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Falar com Especialista
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
