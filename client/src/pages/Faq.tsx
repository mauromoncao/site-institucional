import SiteLayout from "@/components/site/SiteLayout";
import { trpc } from "@/lib/trpc";
import { useSettings } from "@/hooks/useSettings";
import { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import SEOHead, { buildFAQLD, buildBreadcrumbLD, buildOrganizationLD } from "@/components/SEOHead";

function FaqAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-[#19385C] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#E8B84B] shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          <div dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, "<br/>") }} />
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const { data: faqs } = trpc.faq.listPublic.useQuery();
  const { settings } = useSettings();
  const phone = settings.phone_whatsapp || "(86) 99482-0054";

  // Group FAQs by category
  const grouped = (faqs || []).reduce((acc: Record<string, typeof faqs>, faq: any) => {
    const cat = faq.category || "Geral";
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <SiteLayout>
      <SEOHead
        title="Perguntas Frequentes — Tire suas Dúvidas Jurídicas"
        description="Respostas sobre Direito Tributário, Recuperação de Tributos, Direito Previdenciário, Bancário e mais. Tire suas dúvidas com os especialistas da Mauro Monção Advogados."
        canonical="https://mauromoncao.adv.br/faq"
        keywords="perguntas frequentes advogado, dúvidas jurídicas, recuperação tributos, IRPF autismo, direito previdenciário"
        jsonLd={[
          buildBreadcrumbLD([{ name: "Início", url: "/" }, { name: "FAQ", url: "/faq" }]),
          buildOrganizationLD(),
          ...(faqs && faqs.length > 0 ? [buildFAQLD(faqs.slice(0, 10).map((f: any) => ({ question: f.question, answer: f.answer })))] : []),
        ]}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#19385C] via-[#19385C] to-[#19385C] text-white py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm mb-6">
              <HelpCircle className="w-4 h-4 text-[#E8B84B]" />
              <span>Perguntas Frequentes</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-6">FAQ</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Encontre respostas para as dúvidas mais comuns sobre nossos serviços jurídicos.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {!faqs || faqs.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhuma pergunta frequente cadastrada ainda.</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-10">
                  {Object.keys(grouped).length > 1 && (
                    <h2 className="font-serif text-xl font-bold text-[#19385C] mb-4">{category}</h2>
                  )}
                  <div className="space-y-3">
                    {(items as any[]).map((faq: any) => (
                      <FaqAccordion key={faq.id} question={faq.question} answer={faq.answer} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#E8B84B]">
        <div className="container text-center">
          <h2 className="text-3xl font-bold font-serif text-white mb-4">
            Não encontrou sua resposta?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e tire suas dúvidas diretamente com nossa equipe.
          </p>
          <a
            href={`https://wa.me/55${phone.replace(/\D/g, "")}`}
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
