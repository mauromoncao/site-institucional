import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, HelpCircle, Eye, EyeOff, GripVertical } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const FAQ_CATEGORIES = [
  { value: "geral",          label: "Geral" },
  { value: "tributario",     label: "Tributário" },
  { value: "previdenciario", label: "Previdenciário" },
  { value: "bancario",       label: "Bancário" },
  { value: "dr-ben",         label: "Dr. Ben (Assistente IA)" },
  { value: "honorarios",     label: "Honorários" },
  { value: "processo",       label: "Processo / Prazo" },
];

function categoryLabel(slug: string) {
  return FAQ_CATEGORIES.find((c) => c.value === slug)?.label ?? slug;
}

function categoryColor(_slug: string) { return ""; }
function categoryStyle(slug: string): React.CSSProperties {
  const light: Record<string, React.CSSProperties> = {
    tributario:     { background: "#E8B84B22", color: "#19385C" },
    previdenciario: { background: "#19385C18", color: "#19385C" },
    bancario:       { background: "#E8B84B22", color: "#19385C" },
    "dr-ben":       { background: "#19385C18", color: "#19385C" },
    honorarios:     { background: "#E8B84B22", color: "#19385C" },
    processo:       { background: "#19385C18", color: "#19385C" },
    geral:          { background: "#f1f5f9",   color: "#64748b"  },
  };
  return light[slug] ?? { background: "#f1f5f9", color: "#64748b" };
}

export default function AdminFaq() {
  const { data: faqs, isLoading } = trpc.faq.list.useQuery();
  const utils = trpc.useUtils();
  const upsertMutation = trpc.faq.upsert.useMutation({
    onSuccess: () => { utils.faq.list.invalidate(); toast.success("FAQ salva!"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.faq.delete.useMutation({
    onSuccess: () => { utils.faq.list.invalidate(); toast.success("FAQ removida!"); },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const published = (faqs || []).filter((f: any) => f.isPublished).length;
  const drafts = (faqs || []).filter((f: any) => !f.isPublished).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>FAQ</h1>
          <p className="text-muted-foreground mt-1">
            {published} publicadas · {drafts} ocultas
          </p>
        </div>
        <Button
          onClick={() => { setEditing(null); setOpen(true); }}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          <Plus className="h-4 w-4 mr-2" />Nova FAQ
        </Button>
      </div>

      {/* ── Lista ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="space-y-2">
          {(faqs || []).map((faq: any, idx: number) => (
            <Card
              key={faq.id}
              className="border shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: faq.isPublished ? `${GOLD}30` : "rgba(0,0,0,0.06)" }}
            >
              <CardContent className="flex items-center gap-4 py-3 px-4">
                {/* Drag handle visual */}
                <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden sm:block" />

                {/* Number badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: `${NAVY}10`, color: NAVY }}
                >
                  {faq.sortOrder ?? idx + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm" style={{ color: NAVY }}>{faq.question}</p>
                    {faq.category && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={categoryStyle(faq.category)}
                      >
                        {categoryLabel(faq.category)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{faq.answer}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="hidden sm:flex items-center gap-1 text-xs px-2 py-1 rounded-full font-semibold"
                    style={faq.isPublished
                      ? { background: `${GOLD}25`, color: NAVY }
                      : { background: "#f1f5f9", color: "#64748b" }
                    }
                  >
                    {faq.isPublished ? <><Eye className="h-3 w-3" />Visível</> : <><EyeOff className="h-3 w-3" />Oculta</>}
                  </span>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => { setEditing(faq); setOpen(true); }}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => { if (confirm(`Remover "${faq.question}"?`)) deleteMutation.mutate({ id: faq.id }); }}
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {(faqs || []).length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                Nenhuma FAQ criada ainda. Clique em "Nova FAQ" para começar.
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Modal editor ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>
              {editing ? "Editar FAQ" : "Nova Pergunta Frequente"}
            </DialogTitle>
          </DialogHeader>
          <FaqForm
            faq={editing}
            onSubmit={(data) => upsertMutation.mutate(data)}
            loading={upsertMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FaqForm({
  faq, onSubmit, loading,
}: { faq: any; onSubmit: (data: any) => void; loading: boolean }) {
  const [form, setForm] = useState({
    id: faq?.id,
    question: faq?.question || "",
    answer: faq?.answer || "",
    category: faq?.category || "geral",
    isPublished: faq?.isPublished ?? true,
    sortOrder: faq?.sortOrder ?? 0,
  });
  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label>Pergunta <span className="text-red-500">*</span></Label>
        <Input
          value={form.question}
          onChange={(e) => update("question", e.target.value)}
          placeholder="Ex: Quanto custa uma consulta?"
        />
      </div>

      <div className="space-y-2">
        <Label>Resposta <span className="text-red-500">*</span></Label>
        <Textarea
          value={form.answer}
          onChange={(e) => update("answer", e.target.value)}
          rows={6}
          placeholder="Escreva a resposta completa..."
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Categoria</Label>
          <Select value={form.category} onValueChange={(v) => update("category", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {FAQ_CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Ordem de exibição</Label>
          <Input
            type="number"
            min={0}
            value={form.sortOrder}
            onChange={(e) => update("sortOrder", parseInt(e.target.value) || 0)}
            placeholder="0 = primeiro"
          />
          <p className="text-xs text-muted-foreground">Menor número aparece primeiro.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t">
        <Switch
          checked={form.isPublished}
          onCheckedChange={(v) => update("isPublished", v)}
        />
        <div>
          <Label className="cursor-pointer" onClick={() => update("isPublished", !form.isPublished)}>
            {form.isPublished ? (
              <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <Eye className="h-4 w-4" />Visível no site
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <EyeOff className="h-4 w-4" />Oculta
              </span>
            )}
          </Label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => onSubmit(form)}
          disabled={loading || !form.question || !form.answer}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110 min-w-28"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Salvar FAQ
        </Button>
      </div>
    </div>
  );
}
