import { useEffect } from "react";
import SiteLayout from "@/components/site/SiteLayout";

export default function PoliticaDePrivacidade() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Política de Privacidade | Mauro Monção Advogados";
  }, []);

  return (
    <SiteLayout>
      <div style={{ background: "#1a1a2e", minHeight: "100vh", paddingTop: "2rem" }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderBottom: "1px solid #c8a45a33", padding: "3rem 1rem" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
            <h1 style={{ color: "#c8a45a", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
              Política de Privacidade
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
              1. Quem somos
            </h2>
            <p>
              <strong style={{ color: "#e2e8f0" }}>Mauro Monção Advogados Associados</strong> é um escritório de advocacia especializado em Direito Tributário, Previdenciário e Bancário, com sede em Teresina/PI, inscrito na OAB/PI.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              <strong style={{ color: "#e2e8f0" }}>Site:</strong> www.mauromoncao.adv.br<br />
              <strong style={{ color: "#e2e8f0" }}>E-mail:</strong> mauromoncaoadv.escritorio@gmail.com<br />
              <strong style={{ color: "#e2e8f0" }}>WhatsApp:</strong> (86) 99482-0054
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              2. Dados que coletamos
            </h2>
            <p>Coletamos os seguintes dados pessoais:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Dados de contato:</strong> nome, e-mail, telefone e mensagem, quando você preenche o formulário de contato.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Dados do assistente Dr. Ben:</strong> mensagens trocadas no chat para triagem jurídica.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Dados de navegação:</strong> páginas visitadas, tempo de permanência, dispositivo e localização aproximada (via cookies analíticos, somente com seu consentimento).</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Dados técnicos:</strong> endereço IP, tipo de navegador e sistema operacional.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              3. Como usamos seus dados
            </h2>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Responder às suas solicitações de contato e consultas jurídicas iniciais.</li>
              <li style={{ marginBottom: "0.5rem" }}>Realizar triagem inicial através do assistente virtual Dr. Ben.</li>
              <li style={{ marginBottom: "0.5rem" }}>Melhorar a experiência de navegação no site.</li>
              <li style={{ marginBottom: "0.5rem" }}>Enviar comunicações relacionadas aos nossos serviços (somente com seu consentimento).</li>
              <li style={{ marginBottom: "0.5rem" }}>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              4. Cookies
            </h2>
            <p>Utilizamos os seguintes tipos de cookies:</p>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem", borderLeft: "3px solid #22c55e" }}>
                <strong style={{ color: "#e2e8f0" }}>🔒 Essenciais</strong>
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.9rem" }}>Necessários para o funcionamento básico do site (sessão, segurança). Não podem ser desativados.</p>
              </div>
              <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem", marginBottom: "0.75rem", borderLeft: "3px solid #3b82f6" }}>
                <strong style={{ color: "#e2e8f0" }}>📊 Analíticos (Google Analytics)</strong>
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.9rem" }}>Nos ajudam a entender como os visitantes interagem com o site. Ativados somente com seu consentimento.</p>
              </div>
              <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem", borderLeft: "3px solid #f59e0b" }}>
                <strong style={{ color: "#e2e8f0" }}>🎯 Marketing (Google Ads)</strong>
                <p style={{ margin: "0.3rem 0 0", fontSize: "0.9rem" }}>Utilizados para exibir anúncios relevantes. Ativados somente com seu consentimento explícito.</p>
              </div>
            </div>
            <p style={{ marginTop: "1rem" }}>
              Você pode alterar suas preferências de cookies a qualquer momento clicando em "Preferências de Cookies" no rodapé do site.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              5. Compartilhamento de dados
            </h2>
            <p>Não vendemos seus dados pessoais. Podemos compartilhar dados com:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Google LLC:</strong> para serviços de análise (Analytics) e publicidade (Ads), mediante seu consentimento.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Prestadores de infraestrutura:</strong> Railway (hospedagem), Neon (banco de dados), sujeitos a acordos de confidencialidade.</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#e2e8f0" }}>Autoridades competentes:</strong> quando exigido por lei ou ordem judicial.</li>
            </ul>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              6. Seus direitos (LGPD — Lei 13.709/2018)
            </h2>
            <p>Nos termos da Lei Geral de Proteção de Dados, você tem direito a:</p>
            <ul style={{ paddingLeft: "1.5rem", marginTop: "0.75rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Confirmação e acesso:</strong> saber se tratamos seus dados e acessá-los.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Correção:</strong> solicitar a correção de dados incompletos ou desatualizados.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Exclusão:</strong> solicitar a eliminação de dados desnecessários.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Portabilidade:</strong> receber seus dados em formato estruturado.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento.</li>
              <li style={{ marginBottom: "0.5rem" }}>✅ <strong style={{ color: "#e2e8f0" }}>Oposição:</strong> opor-se ao tratamento em determinadas circunstâncias.</li>
            </ul>
            <p style={{ marginTop: "1rem" }}>
              Para exercer seus direitos, entre em contato: <a href="mailto:mauromoncaoadv.escritorio@gmail.com" style={{ color: "#c8a45a" }}>mauromoncaoadv.escritorio@gmail.com</a>
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              7. Retenção de dados
            </h2>
            <p>
              Mantemos seus dados pelo tempo necessário para a finalidade coletada ou conforme exigido por lei. Dados de leads e consultas são mantidos por até <strong style={{ color: "#e2e8f0" }}>5 anos</strong>. Dados de navegação (cookies analíticos) são retidos por até <strong style={{ color: "#e2e8f0" }}>26 meses</strong>.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              8. Segurança
            </h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo criptografia SSL/TLS, autenticação segura e acesso restrito aos dados. Nossos servidores estão localizados nos Estados Unidos (Railway/Neon), em conformidade com padrões internacionais de segurança.
            </p>
          </section>

          <section style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ color: "#c8a45a", fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid #c8a45a33", paddingBottom: "0.5rem" }}>
              9. Contato e DPO
            </h2>
            <p>
              Para questões relacionadas à privacidade e proteção de dados:<br /><br />
              <strong style={{ color: "#e2e8f0" }}>Mauro Monção Advogados Associados</strong><br />
              E-mail: <a href="mailto:mauromoncaoadv.escritorio@gmail.com" style={{ color: "#c8a45a" }}>mauromoncaoadv.escritorio@gmail.com</a><br />
              WhatsApp: <a href="https://wa.me/5586994820054" style={{ color: "#c8a45a" }}>(86) 99482-0054</a>
            </p>
          </section>

          <div style={{ background: "#0f0f1a", borderRadius: 8, padding: "1rem 1.5rem", borderLeft: "3px solid #c8a45a", marginTop: "2rem" }}>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
              Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas serão comunicadas no site. O uso continuado do site após as alterações implica aceitação da nova política.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
