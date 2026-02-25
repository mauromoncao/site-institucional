import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText, Users, Megaphone, BookOpen, HelpCircle, Scale,
  Loader2, ArrowRight, PlusCircle, Eye, Image, Settings,
  TrendingUp, Clock, CheckCircle, AlertCircle, Video,
} from "lucide-react";
import { useLocation } from "wouter";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminDashboard() {
  const { data: stats, isLoading } = trpc.dashboard.stats.useQuery();
  const { data: leads } = trpc.leads.list.useQuery();
  const [, setLocation] = useLocation();

  const recentLeads = (leads || []).slice(0, 5);
  const newLeads = (leads || []).filter((l: any) => l.status === "new").length;

  const statCards = [
    { title: "Posts do Blog",       value: stats?.totalPosts ?? 0,                    icon: BookOpen,  iconBg: `${GOLD}18`,  iconColor: GOLD,          path: "/admin/blog",           action: "Gerenciar" },
    { title: "Landing Pages",       value: stats?.totalLandingPages ?? 0,             icon: Megaphone, iconBg: `${NAVY}12`,  iconColor: NAVY,          path: "/admin/landing-pages",  action: "Gerenciar" },
    { title: "Leads Recebidos",     value: stats?.totalLeads ?? 0,                    icon: Users,     iconBg: `${GOLD}18`,  iconColor: GOLD,          path: "/admin/leads",          action: "Ver leads", badge: newLeads > 0 ? `${newLeads} novos` : undefined },
    { title: "Soluções Jurídicas",  value: (stats as any)?.totalPracticeAreas ?? 0,   icon: Scale,     iconBg: `${NAVY}12`,  iconColor: NAVY,          path: "/admin/practice-areas", action: "Gerenciar" },
    { title: "FAQs",                value: (stats as any)?.totalFaqs ?? 0,            icon: HelpCircle,iconBg: `${GOLD}18`,  iconColor: GOLD,          path: "/admin/faq",            action: "Gerenciar" },
    { title: "Imagens (Mídia)",     value: 0,                                         icon: Image,     iconBg: `${NAVY}12`,  iconColor: NAVY,          path: "/admin/media",          action: "Gerenciar" },
  ];

  const quickActions = [
    { icon: PlusCircle, label: "Novo Post",          desc: "Publicar artigo no blog",      path: "/admin/blog",           iconBg: `${GOLD}18`,  iconColor: GOLD },
    { icon: Video,      label: "Adicionar Vídeo",    desc: "Vimeo ou YouTube nas LPs",      path: "/admin/videos",         iconBg: `${NAVY}12`,  iconColor: NAVY },
    { icon: Image,      label: "Upload de Imagem",   desc: "Adicionar foto ao site",        path: "/admin/media",          iconBg: `${GOLD}18`,  iconColor: GOLD },
    { icon: Settings,   label: "Configurações",      desc: "WhatsApp, GA4, Pixel",          path: "/admin/settings",       iconBg: `${NAVY}12`,  iconColor: NAVY },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral do site Mauro Monção Advogados.</p>
        </div>
        <Button
          onClick={() => window.open("/", "_blank")}
          variant="outline"
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Ver site
        </Button>
      </div>

      {/* ── Alerta leads novos ── */}
      {newLeads > 0 && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer hover:brightness-95 transition-all"
          style={{ background: `${GOLD}15`, borderColor: `${GOLD}50` }}
          onClick={() => setLocation("/admin/leads")}
        >
          <AlertCircle className="h-5 w-5 shrink-0" style={{ color: GOLD }} />
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: NAVY }}>
              {newLeads} {newLeads === 1 ? "novo lead recebido" : "novos leads recebidos"} — aguardando atendimento
            </p>
            <p className="text-xs text-muted-foreground">Clique para ver e atualizar o status</p>
          </div>
          <ArrowRight className="h-4 w-4" style={{ color: GOLD }} />
        </div>
      )}

      {/* ── Stat cards ── */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group p-5"
            style={{ borderColor: `${GOLD}25`, borderLeftWidth: 3, borderLeftColor: GOLD }}
            onClick={() => setLocation(card.path)}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium" style={{ color: "#64748b" }}>{card.title}</p>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: card.iconBg }}>
                <card.icon className="h-5 w-5" style={{ color: card.iconColor }} />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold" style={{ color: NAVY }}>{card.value}</div>
              <div className="flex items-center gap-2">
                {card.badge && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: GOLD, color: NAVY }}>
                    {card.badge}
                  </span>
                )}
                <span className="text-xs font-medium group-hover:underline flex items-center gap-1" style={{ color: GOLD }}>
                  {card.action} <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Ações rápidas ── */}
      <div>
        <h2 className="text-base font-semibold mb-4" style={{ color: NAVY }}>Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <button
              key={a.label}
              onClick={() => setLocation(a.path)}
              className="flex flex-col items-start gap-3 p-4 rounded-2xl border bg-white hover:shadow-md transition-all text-left group"
              style={{ borderColor: `${GOLD}25` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.iconBg }}>
                <a.icon className="h-5 w-5" style={{ color: a.iconColor }} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: NAVY }}>{a.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{a.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Últimos leads ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold" style={{ color: NAVY }}>Últimos Leads</h2>
          <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => setLocation("/admin/leads")}>
            Ver todos <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        {recentLeads.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center text-muted-foreground text-sm">
              Nenhum lead recebido ainda. Os contatos dos formulários aparecerão aqui.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentLeads.map((lead: any) => (
              <div
                key={lead.id}
                className="flex items-center justify-between p-3 rounded-xl border bg-white hover:shadow-sm transition-all cursor-pointer"
                style={{ borderColor: `${GOLD}20` }}
                onClick={() => setLocation("/admin/leads")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: NAVY }}>
                    {lead.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.phone || lead.email || "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {lead.status === "new" && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: GOLD, color: NAVY }}>Novo</span>
                  )}
                  {lead.status === "converted" && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle className="h-3 w-3" />Convertido
                    </span>
                  )}
                  {lead.status === "contacted" && (
                    <span className="flex items-center gap-1 text-xs text-yellow-600">
                      <Clock className="h-3 w-3" />Contatado
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("pt-BR") : "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Guia de uso ── */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${GOLD}25` }}>
        <div className="px-5 py-4 flex items-center gap-2 border-b" style={{ borderColor: `${GOLD}20`, background: `${NAVY}05` }}>
          <TrendingUp className="h-4 w-4" style={{ color: GOLD }} />
          <span className="font-bold text-sm" style={{ color: NAVY }}>Guia do Painel</span>
        </div>
        <div className="bg-white p-4">
          <div className="grid sm:grid-cols-2 gap-1">
            {[
              { icon: BookOpen, label: "Blog",           desc: "Publicar artigos, vídeos Vimeo/YouTube, capa e SEO",    path: "/admin/blog" },
              { icon: Video,    label: "Vídeos",         desc: "Gerenciar vídeos Vimeo das landing pages",              path: "/admin/videos" },
              { icon: Image,    label: "Mídia",          desc: "Upload de fotos para artigos e páginas",                path: "/admin/media" },
              { icon: Users,    label: "Leads",          desc: "Ver contatos, atualizar funil, exportar CSV",           path: "/admin/leads" },
              { icon: HelpCircle,label: "FAQ",           desc: "Gerenciar perguntas frequentes por categoria",          path: "/admin/faq" },
              { icon: Settings, label: "Configurações",  desc: "WhatsApp, GA4, Meta Pixel, redes sociais",              path: "/admin/settings" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setLocation(item.path)}
                className="flex items-start gap-3 p-3 rounded-xl text-left transition-colors hover:brightness-95"
                style={{ background: "transparent" }}
                onMouseEnter={e => (e.currentTarget.style.background = `${GOLD}10`)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${NAVY}10` }}>
                  <item.icon className="h-4 w-4" style={{ color: NAVY }} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: NAVY }}>{item.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#64748b" }}>{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
