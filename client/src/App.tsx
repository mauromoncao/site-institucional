import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";

// Public pages
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Faq from "./pages/Faq";
import SolucoesJuridicas from "./pages/SolucoesJuridicas";
import AreasDeAtuacao from "./pages/AreasDeAtuacao";
import IrpfAutismo from "./pages/solucoes/IrpfAutismo";
import DireitoBancario from "./pages/solucoes/DireitoBancario";
import DireitoPrevidenciario from "./pages/solucoes/DireitoPrevidenciario";
import Institucional from "./pages/solucoes/Institucional";
import RecuperacaoPrevidenciaria from "./pages/solucoes/RecuperacaoPrevidenciaria";
import TransacaoTributaria from "./pages/solucoes/TransacaoTributaria";
import RecuperacaoTributaria from "./pages/solucoes/RecuperacaoTributaria";
import PlanejamentoTributario from "./pages/solucoes/PlanejamentoTributario";
import ClinicasLucroPresumido from "./pages/solucoes/ClinicasLucroPresumido";
import DefesaFiscal from "./pages/solucoes/DefesaFiscal";
import DrBen from "./pages/solucoes/DrBen";
import LandingPage from "./pages/LandingPage";
import PageView from "./pages/PageView";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPages from "./pages/admin/AdminPages";
import AdminPracticeAreas from "./pages/admin/AdminPracticeAreas";
import AdminLandingPages from "./pages/admin/AdminLandingPages";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminFaq from "./pages/admin/AdminFaq";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminVideos from "./pages/admin/AdminVideos";
import AdminDrBen from "./pages/admin/AdminDrBen";

function AdminRouter() {
  return (
    <AdminAuthProvider>
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
    </AdminAuthProvider>
  );
}

function Router() {
  return (
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

      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
