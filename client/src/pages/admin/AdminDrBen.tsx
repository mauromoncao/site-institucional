import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Bot, User, Phone, Mail, Trash2, MessageSquare,
  AlertTriangle, CheckCircle2, Clock, Zap, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const AREA_LABEL: Record<string, string> = {
  tributario: "Tributário",
  previdenciario: "Previdenciário",
  bancario: "Bancário",
  imobiliario: "Imobiliário",
  familia: "Família e Sucessões",
  publico: "Advocacia Pública",
  trabalhista: "Trabalhista",
  consumidor: "Consumidor",
  outros: "Outros",
};

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string; Icon: any }> = {
  open:        { bg: `${GOLD}18`, text: GOLD,       label: "Em aberto",    Icon: Clock },
  qualified:   { bg: "#22c55e18", text: "#22c55e",  label: "Qualificado",  Icon: CheckCircle2 },
  transferred: { bg: "#3b82f618", text: "#3b82f6",  label: "Transferido",  Icon: ChevronRight },
  closed:      { bg: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.4)", label: "Encerrado", Icon: CheckCircle2 },
};

const URGENCY_STYLE: Record<string, { color: string; label: string; Icon: any }> = {
  low:      { color: "rgba(255,255,255,0.35)", label: "Baixa",    Icon: Clock },
  medium:   { color: GOLD,                     label: "Média",    Icon: Clock },
  high:     { color: "#f97316",                label: "Alta",     Icon: AlertTriangle },
  critical: { color: "#ef4444",                label: "Crítica",  Icon: Zap },
};

export default function AdminDrBen() {
  const [selected, setSelected] = useState<number | null>(null);

  const { data: conversations = [], isLoading, refetch } = trpc.drBen.listConversations.useQuery();
  const { data: detail } = trpc.drBen.getConversation.useQuery(
    { id: selected! },
    { enabled: selected !== null }
  );
  const deleteMut = trpc.drBen.deleteConversation.useMutation({
    onSuccess: () => { toast.success("Conversa excluída"); refetch(); setSelected(null); },
    onError: () => toast.error("Erro ao excluir conversa"),
  });

  const total = conversations.length;
  const qualified = conversations.filter((c: any) => c.status === "qualified" || c.status === "transferred").length;
  const open = conversations.filter((c: any) => c.status === "open").length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold" style={{ color: NAVY }}>
            Dr. Ben — Conversas
          </h1>
          <p className="text-gray-400 text-sm mt-1">Atendimentos realizados pelo assistente jurídico IA</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total de Conversas", value: total, color: NAVY },
          { label: "Em Aberto", value: open, color: GOLD },
          { label: "Leads Qualificados", value: qualified, color: "#22c55e" },
        ].map(s => (
          <Card key={s.label} className="p-4 border-0 shadow-sm" style={{ borderLeft: `3px solid ${s.color}` }}>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: `${GOLD} transparent ${GOLD} transparent` }} />
        </div>
      ) : conversations.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Bot className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-semibold">Nenhuma conversa ainda</p>
          <p className="text-sm mt-1">As conversas do Dr. Ben aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv: any) => {
            const st = STATUS_STYLE[conv.status] ?? STATUS_STYLE.open;
            const urg = URGENCY_STYLE[conv.urgencyLevel ?? "low"];
            return (
              <Card
                key={conv.id}
                className="p-4 cursor-pointer hover:shadow-md transition-all border hover:border-yellow-300"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
                onClick={() => setSelected(conv.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${NAVY}10`, border: `2px solid ${NAVY}20` }}>
                    <Bot className="w-5 h-5" style={{ color: NAVY }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm" style={{ color: NAVY }}>
                        {conv.visitorName || "Visitante anônimo"}
                      </span>
                      {conv.visitorPhone && (
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" />{conv.visitorPhone}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {conv.legalArea && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${NAVY}10`, color: NAVY }}>
                          {AREA_LABEL[conv.legalArea] ?? conv.legalArea}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {conv.messageCount} msgs · {new Date(conv.createdAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: urg.color + "18", color: urg.color }}>
                      <urg.Icon className="w-3 h-3" />{urg.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: st.bg, color: st.text }}>
                      <st.Icon className="w-3 h-3" />{st.label}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); if (confirm("Excluir esta conversa?")) deleteMut.mutate({ id: conv.id }); }}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={selected !== null} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col overflow-hidden p-0">
          <DialogHeader className="px-6 py-4 shrink-0" style={{ background: `linear-gradient(135deg, ${NAVY}, #0f2d4a)` }}>
            <DialogTitle className="text-white font-serif text-lg">
              {detail?.visitorName ? `Conversa — ${detail.visitorName}` : "Detalhes da Conversa"}
            </DialogTitle>
            {detail && (
              <div className="flex flex-wrap gap-2 mt-2">
                {detail.visitorPhone && (
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)" }}>
                    <Phone className="w-3 h-3" />{detail.visitorPhone}
                  </span>
                )}
                {detail.legalArea && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${GOLD}25`, color: GOLD }}>
                    {AREA_LABEL[detail.legalArea] ?? detail.legalArea}
                  </span>
                )}
                {detail.urgencyLevel && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)", color: URGENCY_STYLE[detail.urgencyLevel]?.color }}>
                    Urgência: {URGENCY_STYLE[detail.urgencyLevel]?.label}
                  </span>
                )}
              </div>
            )}
          </DialogHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ background: "#07182e" }}>
            {detail?.messages?.map((msg: any, i: number) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className="shrink-0 mt-1">
                  {msg.role === "assistant" ? (
                    <div className="w-7 h-7 rounded-full overflow-hidden" style={{ border: `1px solid ${GOLD}40` }}>
                      <img src="/dr-ben.jpg" alt="Dr. Ben" className="w-full h-full object-cover object-top" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${GOLD}20`, border: `1px solid ${GOLD}30` }}>
                      <User className="w-3.5 h-3.5" style={{ color: GOLD }} />
                    </div>
                  )}
                </div>
                <div
                  className="max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === "assistant"
                      ? { background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.85)", borderRadius: "4px 16px 16px 16px", border: `1px solid ${GOLD}15` }
                      : { background: `${GOLD}CC`, color: NAVY, fontWeight: 500, borderRadius: "16px 4px 16px 16px" }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {(!detail?.messages || detail.messages.length === 0) && (
              <p className="text-center text-white/30 text-sm py-8">Nenhuma mensagem registrada</p>
            )}
          </div>

          <div className="px-5 py-3 shrink-0 flex justify-between items-center" style={{ background: "#0d1f35", borderTop: `1px solid ${GOLD}15` }}>
            {detail?.visitorPhone ? (
              <a
                href={`https://wa.me/${detail.visitorPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl hover:brightness-110 transition-all"
                style={{ background: "#25D36620", color: "#25D366", border: "1px solid #25D36630" }}
              >
                <Phone className="w-3.5 h-3.5" />Contatar no WhatsApp
              </a>
            ) : <span />}
            <Button variant="outline" size="sm" onClick={() => setSelected(null)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
