import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Loader2, Users, Mail, Phone, Calendar, MessageSquare,
  Search, Download, Filter, ArrowRight, CheckCircle, Clock,
  Archive, Sparkles,
} from "lucide-react";
import React, { useState, useMemo } from "react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

// Brand-palette status config — uses inline styles via STATUS_STYLE below
const STATUS_CONFIG: Record<string, { label: string; bg: string; text: string; icon: any }> = {
  new:       { label: "Novo",       bg: "",  text: "",  icon: Sparkles },
  contacted: { label: "Contatado",  bg: "",  text: "",  icon: Clock },
  converted: { label: "Convertido", bg: "",  text: "",  icon: CheckCircle },
  archived:  { label: "Arquivado",  bg: "",  text: "",  icon: Archive },
};

const STATUS_STYLE: Record<string, React.CSSProperties> = {
  new:       { background: "#E8B84B28", color: "#19385C" },   // gold tint
  contacted: { background: "#19385C18", color: "#19385C" },   // navy tint
  converted: { background: "#19385C22", color: "#19385C" },   // navy medium
  archived:  { background: "#f1f5f9",   color: "#64748b"  },  // neutral
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  const Icon = cfg.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={STATUS_STYLE[status] ?? STATUS_STYLE.new}
    >
      <Icon className="h-3 w-3" />{cfg.label}
    </span>
  );
}

function exportCsv(leads: any[]) {
  const header = ["Nome", "Email", "Telefone", "Origem", "Status", "Mensagem", "Data"];
  const rows = leads.map((l) => [
    l.name || "",
    l.email || "",
    l.phone || "",
    l.source || "site",
    STATUS_CONFIG[l.status]?.label ?? l.status,
    (l.message || "").replace(/\n/g, " "),
    l.createdAt ? new Date(l.createdAt).toLocaleDateString("pt-BR") : "",
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((c: string) => `"${String(c).replace(/"/g, '""')}"`).join(";"))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminLeads() {
  const { data: leadsList, isLoading } = trpc.leads.list.useQuery();
  const utils = trpc.useUtils();
  const updateStatusMutation = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { utils.leads.list.invalidate(); toast.success("Status atualizado!"); },
  });

  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    const all = leadsList || [];
    return all.filter((l: any) => {
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch = !q ||
        l.name?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.message?.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [leadsList, search, statusFilter]);

  const counts = useMemo(() => {
    const all = leadsList || [];
    return {
      total: all.length,
      new: all.filter((l: any) => l.status === "new").length,
      contacted: all.filter((l: any) => l.status === "contacted").length,
      converted: all.filter((l: any) => l.status === "converted").length,
      archived: all.filter((l: any) => l.status === "archived").length,
    };
  }, [leadsList]);

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Leads</h1>
          <p className="text-muted-foreground mt-1">
            {counts.total} contatos recebidos · {counts.new} novos aguardando atendimento
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => filtered.length ? exportCsv(filtered) : toast.error("Sem leads para exportar.")}
          disabled={!filtered.length}
        >
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      {/* ── Contadores por status ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {(["new", "contacted", "converted", "archived"] as const).map((s) => {
          const cfg = STATUS_CONFIG[s];
          const Icon = cfg.icon;
          const isActive = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(isActive ? "all" : s)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm ${isActive ? "ring-2" : ""}`}
              style={{
                borderColor: isActive ? GOLD : `${GOLD}20`,
                ringColor: GOLD,
                background: isActive ? `${GOLD}12` : "white",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={STATUS_STYLE[s]}
              >
                <Icon className="h-4 w-4" style={{ color: NAVY }} />
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: NAVY }}>{counts[s]}</p>
                <p className="text-xs text-muted-foreground">{cfg.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, e-mail, telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Lista ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((lead: any) => (
            <Card
              key={lead.id}
              className="border shadow-sm cursor-pointer hover:shadow-md transition-all"
              style={{ borderColor: lead.status === "new" ? `${GOLD}50` : `${GOLD}15` }}
              onClick={() => setSelected(lead)}
            >
              <CardContent className="flex items-center gap-4 py-3 px-4">

                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{ background: NAVY, color: GOLD }}
                >
                  {lead.name?.charAt(0).toUpperCase() || "?"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: NAVY }}>{lead.name}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {lead.email && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />{lead.email}
                      </span>
                    )}
                    {lead.phone && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />{lead.phone}
                      </span>
                    )}
                    {lead.source && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                        {lead.source}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status + date + change */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:block">
                    <StatusBadge status={lead.status} />
                  </div>
                  <p className="text-xs text-muted-foreground hidden md:block">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("pt-BR") : "—"}
                  </p>
                  <Select
                    value={lead.status}
                    onValueChange={(v) => {
                      updateStatusMutation.mutate({ id: lead.id, status: v as any });
                    }}
                  >
                    <SelectTrigger
                      className="w-32 h-8 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                        <SelectItem key={k} value={k}>{v.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ArrowRight className="h-4 w-4 text-muted-foreground hidden sm:block" />
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                {search || statusFilter !== "all"
                  ? "Nenhum lead encontrado com esses filtros."
                  : "Nenhum lead recebido ainda. Os contatos dos formulários aparecerão aqui."}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Modal detalhe ── */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>Detalhes do Lead</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
                  style={{ background: NAVY, color: GOLD }}
                >
                  {selected.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-bold" style={{ color: NAVY }}>{selected.name}</p>
                  <StatusBadge status={selected.status} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">E-mail</p>
                  <p className="font-medium text-sm">{selected.email || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Telefone</p>
                  <p className="font-medium text-sm">{selected.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Origem</p>
                  <p className="font-medium text-sm">{selected.source || "site"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Recebido em</p>
                  <p className="font-medium text-sm flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selected.createdAt ? new Date(selected.createdAt).toLocaleString("pt-BR") : "—"}
                  </p>
                </div>
              </div>

              {selected.message && (
                <div className="p-3 rounded-xl border" style={{ borderColor: `${GOLD}30`, background: `${GOLD}08` }}>
                  <p className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1" style={{ color: NAVY }}>
                    <MessageSquare className="h-3 w-3" />Mensagem
                  </p>
                  <p className="text-sm leading-relaxed">{selected.message}</p>
                </div>
              )}

              {/* Atualizar status no modal */}
              <div className="flex items-center gap-3 pt-2 border-t">
                <p className="text-sm text-muted-foreground flex-1">Atualizar status:</p>
                <Select
                  value={selected.status}
                  onValueChange={(v) => {
                    updateStatusMutation.mutate({ id: selected.id, status: v as any });
                    setSelected({ ...selected, status: v });
                  }}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* WhatsApp quick action */}
              {selected.phone && (
                <Button
                  className="w-full gap-2"
                  style={{ background: "#25D366", color: "white" }}
                  onClick={() => {
                    const msg = encodeURIComponent(`Olá ${selected.name}, recebi seu contato pelo site. Como posso ajudá-lo?`);
                    const phone = selected.phone.replace(/\D/g, "");
                    const fullPhone = phone.startsWith("55") ? phone : `55${phone}`;
                    window.open(`https://wa.me/${fullPhone}?text=${msg}`, "_blank");
                  }}
                >
                  <Phone className="h-4 w-4" />
                  Responder pelo WhatsApp
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
