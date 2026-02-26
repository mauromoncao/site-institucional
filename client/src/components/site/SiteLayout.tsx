import { lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

// DrBenWidget carregado de forma lazy — não bloqueia o render inicial
const DrBenWidget = lazy(() => import("@/components/DrBenWidget"));

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <Suspense fallback={null}>
        <DrBenWidget />
      </Suspense>
    </div>
  );
}
