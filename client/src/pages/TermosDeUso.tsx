import { useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";

export default function TermosDeUso() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Termos de Uso | Mauro Monção Advogados";
  }, []);

  return (
    <SiteLayout>
      <div style={{ background: "#1a1a2e", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderBottom: "1px solid #c8a45a33", padding: "3rem 1rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ color: "#c8a45a", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Termos de Uso
            </h1>
            <p style={{ color: "#94a3b8", fontSize: "0.95rem" }}>
              Última atualização: 26 de fevereiro de 2025
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.5rem", color: "#cbd5e1", lineHeight: 1.8 }}>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar o site <strong style={{ color: "#e2e8f0" }}>www.mauromoncao.adv.br</strong>, você concorda com os presentes Termos de Uso. Caso não concorde com alguma disposição, recomendamos que não utilize o site.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              2. Natureza do conteúdo — Não é consultoria jurídica
            </h2>
            <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem 1.5rem", borderLeft: "3px solid #ef4444", marginBottom: "1rem" }}>
              <p style={{ color: "#fca5a5", margin: 0, fontWeight: 600 }}>⚠️ AVISO IMPORTANTE</p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem" }}>
                O conteúdo deste site, incluindo artigos, textos informativos e as respostas do assistente virtual Dr. Ben, tem caráter <strong>exclusivamente informativo e educacional</strong>. Não constitui consultoria jurídica, parecer legal ou orientação profissional individualizada.
              </p>
            </div>
            <p>
              Para obter orientação jurídica sobre seu caso específico, entre em contato diretamente com o escritório. A relação advogado-cliente somente se estabelece mediante contrato formal de prestação de serviços.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              3. Assistente Virtual Dr. Ben
            </h2>
            <p>O assistente virtual Dr. Ben é uma ferramenta de triagem inicial que:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Auxilia na identificação do tipo de demanda jurídica do usuário.</li>
              <li style={{ marginBottom: "0.5rem" }}>Fornece informações gerais sobre áreas do direito.</li>
              <li style={{ marginBottom: "0.5rem" }}>Facilita o contato inicial com o escritório.</li>
              <li style={{ marginBottom: "0.5rem" }}>NÃO substitui a análise jurídica profissional de um advogado.</li>
              <li style={{ marginBottom: "0.5rem" }}>NÃO cria vínculo contratual com o escritório.</li>
            </ul>
            <p style={{ marginTop: "0.75rem" }}>
              As conversas com o Dr. Ben são armazenadas para fins de triagem e contato. Ao interagir com o assistente, você consente com o armazenamento das mensagens conforme nossa <a href="/politica-de-privacidade" style={{ color: "#c8a45a" }}>Política de Privacidade</a>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              4. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo deste site — textos, imagens, logotipos, marcas, layout e código — é de propriedade exclusiva de <strong style={{ color: "#e2e8f0" }}>Mauro Monção Advogados Associados</strong> e está protegido pela Lei de Direitos Autorais (Lei 9.610/98).
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              É vedada a reprodução, cópia, modificação ou distribuição do conteúdo sem autorização prévia e expressa do escritório.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              5. Uso Permitido
            </h2>
            <p>Ao utilizar este site, você se compromete a:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>✅ Fornecer informações verdadeiras nos formulários de contato.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Utilizar o site apenas para fins lícitos.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Não tentar comprometer a segurança ou funcionamento do site.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Não enviar conteúdo ofensivo, ilegal ou spam.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ Não realizar engenharia reversa ou tentativas de acesso não autorizado.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              6. Limitação de Responsabilidade
            </h2>
            <p>
              O escritório não se responsabiliza por:
            </p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Decisões tomadas com base no conteúdo informativo do site ou nas respostas do Dr. Ben.</li>
              <li style={{ marginBottom: "0.5rem" }}>Eventuais imprecisões no conteúdo, considerando que o direito está sujeito a constantes alterações legislativas.</li>
              <li style={{ marginBottom: "0.5rem" }}>Indisponibilidade temporária do site por manutenção ou problemas técnicos.</li>
              <li style={{ marginBottom: "0.5rem" }}>Conteúdo de sites externos vinculados.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              7. Links Externos
            </h2>
            <p>
              Este site pode conter links para sites externos. Esses links são fornecidos para conveniência do usuário e não implicam endosso ou responsabilidade pelo conteúdo de terceiros.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              8. Foro e Lei Aplicável
            </h2>
            <p>
              Estes Termos de Uso são regidos pela legislação brasileira. Eventuais conflitos serão submetidos ao foro da comarca de <strong style={{ color: "#e2e8f0" }}>Teresina/PI</strong>, com renúncia expressa a qualquer outro foro, por mais privilegiado que seja.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              9. Contato
            </h2>
            <p>
              Dúvidas sobre estes termos:<br /><br />
              <strong style={{ color: "#e2e8f0" }}>Mauro Monção Advogados Associados</strong><br />
              E-mail: <a href="mailto:mauromoncaoadv.escritorio@gmail.com" style={{ color: "#c8a45a" }}>mauromoncaoadv.escritorio@gmail.com</a><br />
              WhatsApp: <a href="https://wa.me/5586994820054" style={{ color: "#c8a45a" }}>(86) 99482-0054</a>
            </p>
          </section>

          <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem 1.5rem", borderLeft: "3px solid #c8a45a", marginTop: "2rem" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Estes Termos de Uso podem ser atualizados a qualquer momento. Recomendamos revisão periódica. O uso continuado do site após alterações implica aceitação dos novos termos.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
