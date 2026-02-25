import { useState } from "react";
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
import { Plus, Pencil, Trash2, Loader2, Scale, ExternalLink, Link, Eye, EyeOff } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminPracticeAreas() {
  const { data: areas, isLoading } = trpc.practiceAreas.list.useQuery();
  const { data: landingPagesList } = trpc.landingPages.list.useQuery();
  const utils = trpc.useUtils();
  const upsertMutation = trpc.practiceAreas.upsert.useMutation({
    onSuccess: () => { utils.practiceAreas.list.invalidate(); toast.success("Área salva!"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.practiceAreas.delete.useMutation({
    onSuccess: () => { utils.practiceAreas.list.invalidate(); toast.success("Área removida!"); },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const published = (areas || []).filter((a: any) => a.isPublished).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Soluções Jurídicas</h1>
          <p className="text-muted-foreground mt-1">
            {published} áreas publicadas · Gerencie e vincule landing pages.
          </p>
        </div>
        <Button
          onClick={() => { setEditing(null); setOpen(true); }}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110 gap-2"
        >
          <Plus className="h-4 w-4" />Nova Área
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="grid gap-3">
          {(areas || []).map((area: any) => (
            <div
              key={area.id}
              className="flex items-center justify-between p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: `${GOLD}25`, borderLeftWidth: 3, borderLeftColor: area.isPublished ? GOLD : "#cbd5e1" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: area.isPublished ? `${NAVY}12` : "#f1f5f9" }}
                >
                  <Scale className="h-5 w-5" style={{ color: area.isPublished ? NAVY : "#94a3b8" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: NAVY }}>{area.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">/{area.slug}</span>
                    {area.externalLandingUrl && (
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: GOLD }}>
                        <ExternalLink className="h-3 w-3" />Link externo
                      </span>
                    )}
                    {area.landingPageId && !area.externalLandingUrl && (
                      <span className="flex items-center gap-1 text-xs font-medium" style={{ color: NAVY }}>
                        <Link className="h-3 w-3" />LP interna
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={
                    area.isPublished
                      ? { background: `${GOLD}20`, color: NAVY }
                      : { background: "#f1f5f9", color: "#64748b" }
                  }
                >
                  {area.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  {area.isPublished ? "Publicada" : "Oculta"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { setEditing(area); setOpen(true); }}
                >
                  <Pencil className="h-4 w-4" style={{ color: NAVY }} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { if (confirm("Remover esta área?")) deleteMutation.mutate({ id: area.id }); }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          {(areas || []).length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                Nenhuma área criada ainda. Clique em "Nova Área" para começar.
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>{editing ? "Editar Área" : "Nova Área"}</DialogTitle>
          </DialogHeader>
          <PracticeAreaForm
            area={editing}
            landingPages={landingPagesList || []}
            onSubmit={(data) => upsertMutation.mutate(data)}
            loading={upsertMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PracticeAreaForm({ area, landingPages, onSubmit, loading }: {
  area: any; landingPages: any[]; onSubmit: (data: any) => void; loading: boolean;
}) {
  const [form, setForm] = useState({
    id: area?.id,
    slug: area?.slug || "",
    name: area?.name || "",
    shortDescription: area?.shortDescription || "",
    icon: area?.icon || "",
    landingPageId: area?.landingPageId || null,
    externalLandingUrl: area?.externalLandingUrl || "",
    isPublished: area?.isPublished ?? true,
    sortOrder: area?.sortOrder ?? 0,
  });
  const [linkType, setLinkType] = useState<"none" | "internal" | "external">(
    area?.externalLandingUrl ? "external" : area?.landingPageId ? "internal" : "none"
  );

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    const data = { ...form };
    if (linkType === "external") {
      data.landingPageId = null;
    } else if (linkType === "internal") {
      data.externalLandingUrl = "";
    } else {
      data.landingPageId = null;
      data.externalLandingUrl = "";
    }
    onSubmit(data);
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome da Área</Label>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Direito Tributário" />
        </div>
        <div className="space-y-2">
          <Label>Slug (URL)</Label>
          <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="direito-tributario" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Descrição Curta</Label>
        <Textarea value={form.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} rows={3} />
      </div>
      <div className="space-y-2">
        <Label>Ícone (nome Lucide)</Label>
        <Input value={form.icon} onChange={(e) => update("icon", e.target.value)} placeholder="scale, shield, gavel..." />
      </div>

      <div
        className="rounded-xl p-4 space-y-3 border"
        style={{ borderColor: `${GOLD}30`, background: `${GOLD}06` }}
      >
        <Label className="text-sm font-semibold" style={{ color: NAVY }}>Vinculação de Landing Page</Label>
        <Select value={linkType} onValueChange={(v: any) => setLinkType(v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Sem landing page vinculada</SelectItem>
            <SelectItem value="internal">Landing page interna (do CMS)</SelectItem>
            <SelectItem value="external">Landing page externa (link manual)</SelectItem>
          </SelectContent>
        </Select>
        {linkType === "internal" && (
          <div className="space-y-2">
            <Label>Selecionar Landing Page</Label>
            <Select value={form.landingPageId?.toString() || ""} onValueChange={(v) => update("landingPageId", parseInt(v))}>
              <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                {landingPages.map((lp: any) => (
                  <SelectItem key={lp.id} value={lp.id.toString()}>{lp.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {linkType === "external" && (
          <div className="space-y-2">
            <Label>URL Externa</Label>
            <Input value={form.externalLandingUrl} onChange={(e) => update("externalLandingUrl", e.target.value)} placeholder="https://exemplo.com/minha-landing-page" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={form.isPublished} onCheckedChange={(v) => update("isPublished", v)} />
        <Label>Publicada</Label>
      </div>

      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.slug}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Salvar Área
        </Button>
      </div>
    </div>
  );
}
