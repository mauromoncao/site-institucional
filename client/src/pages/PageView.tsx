import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import { Link } from "wouter";
import { useEffect } from "react";

export default function PageView() {
  const params = useParams<{ slug: string }>();
  const { data: page, isLoading } = trpc.pages.getBySlug.useQuery({ slug: params.slug || "" });

  useEffect(() => {
    if (page) {
      document.title = page.metaTitle || page.title || "Mauro Monção Advogados";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && page.metaDescription) {
        metaDesc.setAttribute("content", page.metaDescription);
      }
    }
  }, [page]);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#E8B84B] border-t-transparent rounded-full mx-auto" />
        </div>
      </SiteLayout>
    );
  }

  if (!page) {
    return (
      <SiteLayout>
        <div className="py-32 text-center">
          <h1 className="font-serif text-2xl font-bold text-gray-800 mb-4">Página não encontrada</h1>
          <Link href="/" className="text-[#E8B84B] hover:underline">Voltar para o início</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="bg-gradient-to-br from-[#19385C] to-[#19385C] text-white py-16">
        <div className="container">
          <h1 className="font-serif text-4xl font-bold mb-4">{page.title}</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {page.content && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-[#19385C] prose-a:text-[#E8B84B]"
                dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, "<br/>") }}
              />
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
