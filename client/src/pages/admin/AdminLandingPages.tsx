import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Megaphone, ExternalLink, Eye, EyeOff } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminLandingPages() {
  const { data: lpList, isLoading } = trpc.landingPages.list.useQuery();
  const utils = trpc.useUtils();
  const upsertMutation = trpc.landingPages.upsert.useMutation({
    onSuccess: () => { utils.landingPages.list.invalidate(); toast.success("Landing page salva!"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.landingPages.delete.useMutation({
    onSuccess: () => { utils.landingPages.list.invalidate(); toast.success("Landing page removida!"); },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const published = (lpList || []).filter((lp: any) => lp.isPublished && !lp.isExternal).length;
  const external = (lpList || []).filter((lp: any) => lp.isExternal).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Landing Pages</h1>
          <p className="text-muted-foreground mt-1">
            {published} publicadas · {external} externas · Páginas de captação de leads.
          </p>
        </div>
        <Button
          onClick={() => { setEditing(null); setOpen(true); }}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110 gap-2"
        >
          <Plus className="h-4 w-4" />Nova Landing Page
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="grid gap-3">
          {(lpList || []).map((lp: any) => (
            <div
              key={lp.id}
              className="flex items-center justify-between p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all"
              style={{
                borderColor: `${GOLD}25`,
                borderLeftWidth: 3,
                borderLeftColor: lp.isExternal ? NAVY : lp.isPublished ? GOLD : "#cbd5e1",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: lp.isPublished ? `${NAVY}12` : "#f1f5f9" }}
                >
                  {lp.isExternal
                    ? <ExternalLink className="h-5 w-5" style={{ color: NAVY }} />
                    : <Megaphone className="h-5 w-5" style={{ color: lp.isPublished ? NAVY : "#94a3b8" }} />
                  }
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: NAVY }}>{lp.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {lp.isExternal ? lp.externalUrl : `/solucoes-juridicas/${lp.slug}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={
                    lp.isExternal
                      ? { background: `${NAVY}12`, color: NAVY }
                      : lp.isPublished
                        ? { background: `${GOLD}20`, color: NAVY }
                        : { background: "#f1f5f9", color: "#64748b" }
                  }
                >
                  {lp.isExternal
                    ? <ExternalLink className="h-3 w-3" />
                    : lp.isPublished
                      ? <Eye className="h-3 w-3" />
                      : <EyeOff className="h-3 w-3" />}
                  {lp.isExternal ? "Externa" : lp.isPublished ? "Publicada" : "Rascunho"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { setEditing(lp); setOpen(true); }}
                >
                  <Pencil className="h-4 w-4" style={{ color: NAVY }} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { if (confirm("Remover esta landing page?")) deleteMutation.mutate({ id: lp.id }); }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          {(lpList || []).length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                Nenhuma landing page criada. Clique em "Nova Landing Page" para começar.
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>{editing ? "Editar Landing Page" : "Nova Landing Page"}</DialogTitle>
          </DialogHeader>
          <LandingPageForm lp={editing} onSubmit={(data) => upsertMutation.mutate(data)} loading={upsertMutation.isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LandingPageForm({ lp, onSubmit, loading }: { lp: any; onSubmit: (data: any) => void; loading: boolean }) {
  const [form, setForm] = useState({
    id: lp?.id,
    slug: lp?.slug || "",
    title: lp?.title || "",
    subtitle: lp?.subtitle || "",
    heroImage: lp?.heroImage || "",
    heroVideoUrl: lp?.heroVideoUrl || "",
    content: lp?.content || "",
    ctaText: lp?.ctaText || "Fale com um especialista",
    ctaWhatsapp: lp?.ctaWhatsapp || "5586994820054",
    metaTitle: lp?.metaTitle || "",
    metaDescription: lp?.metaDescription || "",
    metaKeywords: lp?.metaKeywords || "",
    ogTitle: lp?.ogTitle || "",
    ogDescription: lp?.ogDescription || "",
    ogImage: lp?.ogImage || "",
    canonical: lp?.canonical || "",
    externalUrl: lp?.externalUrl || "",
    isExternal: lp?.isExternal ?? false,
    isPublished: lp?.isPublished ?? true,
    sortOrder: lp?.sortOrder ?? 0,
  });

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">Conteúdo</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
        <TabsTrigger value="config">Configuração</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 mt-4">
        <div
          className="flex items-center gap-3 p-3 rounded-xl border"
          style={{ borderColor: `${GOLD}30`, background: `${GOLD}06` }}
        >
          <Switch checked={form.isExternal} onCheckedChange={(v) => update("isExternal", v)} />
          <div>
            <Label className="font-semibold">Landing page externa</Label>
            <p className="text-xs text-muted-foreground">Ativa apenas um link externo, sem conteúdo interno.</p>
          </div>
        </div>

        {form.isExternal ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título (para referência interna)</Label>
              <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Nome da landing page" />
            </div>
            <div className="space-y-2">
              <Label>URL Externa</Label>
              <Input value={form.externalUrl} onChange={(e) => update("externalUrl", e.target.value)} placeholder="https://exemplo.com/minha-landing" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Direito Previdenciário" />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="direito-previdenciario" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Input value={form.subtitle} onChange={(e) => update("subtitle", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Imagem Hero (URL)</Label>
                <Input value={form.heroImage} onChange={(e) => update("heroImage", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Vídeo Hero (Vimeo/YouTube URL)</Label>
                <Input value={form.heroVideoUrl} onChange={(e) => update("heroVideoUrl", e.target.value)} placeholder="https://vimeo.com/..." />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Conteúdo</Label>
              <Textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={10} placeholder="Conteúdo em HTML ou Markdown..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Texto do CTA</Label>
                <Input value={form.ctaText} onChange={(e) => update("ctaText", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp do CTA (com DDI)</Label>
                <Input value={form.ctaWhatsapp} onChange={(e) => update("ctaWhatsapp", e.target.value)} placeholder="5586994820054" />
              </div>
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent value="seo" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} rows={3} />
        </div>
        <div className="space-y-2">
          <Label>Meta Keywords</Label>
          <Input value={form.metaKeywords} onChange={(e) => update("metaKeywords", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>OG Title</Label>
            <Input value={form.ogTitle} onChange={(e) => update("ogTitle", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>OG Image URL</Label>
            <Input value={form.ogImage} onChange={(e) => update("ogImage", e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>OG Description</Label>
          <Textarea value={form.ogDescription} onChange={(e) => update("ogDescription", e.target.value)} rows={2} />
        </div>
        <div className="space-y-2">
          <Label>Canonical URL</Label>
          <Input value={form.canonical} onChange={(e) => update("canonical", e.target.value)} />
        </div>
      </TabsContent>

      <TabsContent value="config" className="space-y-4 mt-4">
        <div className="flex items-center gap-3">
          <Switch checked={form.isPublished} onCheckedChange={(v) => update("isPublished", v)} />
          <Label>Publicada</Label>
        </div>
        <div className="space-y-2">
          <Label>Ordem de exibição</Label>
          <Input type="number" value={form.sortOrder} onChange={(e) => update("sortOrder", parseInt(e.target.value) || 0)} />
        </div>
      </TabsContent>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => onSubmit(form)}
          disabled={loading || !form.title}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Salvar Landing Page
        </Button>
      </div>
    </Tabs>
  );
}
