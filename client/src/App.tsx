import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import { CookieBanner } from "./components/site/CookieBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
// SiteLayout é usado por TODAS as páginas públicas — importação eager para evitar waterfall
import SiteLayout from "@/components/site/SiteLayout";

// Loading spinner — fundo branco para não parecer erro no mobile
function PageLoader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", background: "#ffffff" }}>
      <div style={{ width: 48, height: 48, border: "4px solid #E8B84B", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", marginBottom: 16 }} />
      <p style={{ color: "#19385C", fontFamily: "system-ui,sans-serif", fontSize: 14, margin: 0 }}>Carregando...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// Public pages — lazy loaded
const Home = lazy(() => import("./pages/Home"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contato = lazy(() => import("./pages/Contato"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Faq = lazy(() => import("./pages/Faq"));
const SolucoesJuridicas = lazy(() => import("./pages/SolucoesJuridicas"));
const AreasDeAtuacao = lazy(() => import("./pages/AreasDeAtuacao"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const PageView = lazy(() => import("./pages/PageView"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PoliticaDePrivacidade = lazy(() => import("./pages/PoliticaDePrivacidade"));
const TermosDeUso = lazy(() => import("./pages/TermosDeUso"));

// Soluções pages — lazy loaded
const IrpfAutismo = lazy(() => import("./pages/solucoes/IrpfAutismo"));
const DireitoBancario = lazy(() => import("./pages/solucoes/DireitoBancario"));
const DireitoPrevidenciario = lazy(() => import("./pages/solucoes/DireitoPrevidenciario"));
const Institucional = lazy(() => import("./pages/solucoes/Institucional"));
const RecuperacaoPrevidenciaria = lazy(() => import("./pages/solucoes/RecuperacaoPrevidenciaria"));
const TransacaoTributaria = lazy(() => import("./pages/solucoes/TransacaoTributaria"));
const RecuperacaoTributaria = lazy(() => import("./pages/solucoes/RecuperacaoTributaria"));
const PlanejamentoTributario = lazy(() => import("./pages/solucoes/PlanejamentoTributario"));
const ClinicasLucroPresumido = lazy(() => import("./pages/solucoes/ClinicasLucroPresumido"));
const DefesaFiscal = lazy(() => import("./pages/solucoes/DefesaFiscal"));
const DrBen = lazy(() => import("./pages/solucoes/DrBen"));

// Admin pages — lazy loaded (separate chunk)
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPages = lazy(() => import("./pages/admin/AdminPages"));
const AdminPracticeAreas = lazy(() => import("./pages/admin/AdminPracticeAreas"));
const AdminLandingPages = lazy(() => import("./pages/admin/AdminLandingPages"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminFaq = lazy(() => import("./pages/admin/AdminFaq"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminMedia = lazy(() => import("./pages/admin/AdminMedia"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminVideos = lazy(() => import("./pages/admin/AdminVideos"));
const AdminDrBen = lazy(() => import("./pages/admin/AdminDrBen"));

function AdminRouter() {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<PageLoader />}>
        <AdminLayout>
          <Switch>
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/admin/pages" component={AdminPages} />
            <Route path="/admin/practice-areas" component={AdminPracticeAreas} />
            <Route path="/admin/landing-pages" component={AdminLandingPages} />
            <Route path="/admin/blog" component={AdminBlog} />
            <Route path="/admin/faq" component={AdminFaq} />
            <Route path="/admin/leads" component={AdminLeads} />
            <Route path="/admin/media" component={AdminMedia} />
            <Route path="/admin/videos" component={AdminVideos} />
            <Route path="/admin/dr-ben" component={AdminDrBen} />
            <Route path="/admin/settings" component={AdminSettings} />
            <Route component={NotFound} />
          </Switch>
        </AdminLayout>
      </Suspense>
    </AdminAuthProvider>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Admin routes */}
        <Route path="/admin/:rest*" component={AdminRouter} />
        <Route path="/admin" component={AdminRouter} />

        {/* Public routes */}
        <Route path="/" component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/contato" component={Contato} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/faq" component={Faq} />
        <Route path="/areas-de-atuacao" component={AreasDeAtuacao} />
        <Route path="/solucoes-juridicas" component={SolucoesJuridicas} />
        <Route path="/solucoes-juridicas/irpf-educacao-autismo" component={IrpfAutismo} />
        <Route path="/solucoes-juridicas/direito-bancario" component={DireitoBancario} />
        <Route path="/solucoes-juridicas/direito-previdenciario" component={DireitoPrevidenciario} />
        <Route path="/solucoes-juridicas/institucional" component={Institucional} />
        <Route path="/solucoes-juridicas/recuperacao-previdenciaria" component={RecuperacaoPrevidenciaria} />
        <Route path="/solucoes-juridicas/transacao-tributaria" component={TransacaoTributaria} />
        <Route path="/solucoes-juridicas/recuperacao-tributaria" component={RecuperacaoTributaria} />
        <Route path="/solucoes-juridicas/planejamento-tributario" component={PlanejamentoTributario} />
        <Route path="/solucoes-juridicas/clinicas-lucro-presumido" component={ClinicasLucroPresumido} />
        <Route path="/solucoes-juridicas/defesa-fiscal" component={DefesaFiscal} />
        <Route path="/assistente-juridico" component={DrBen} />
        <Route path="/dr-ben" component={DrBen} />
        <Route path="/solucoes-juridicas/:slug" component={LandingPage} />

        {/* Dynamic pages managed by admin */}
        <Route path="/pagina/:slug" component={PageView} />

        <Route path="/politica-de-privacidade" component={PoliticaDePrivacidade} />
        <Route path="/termos-de-uso" component={TermosDeUso} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
