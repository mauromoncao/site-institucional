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
import { Plus, Pencil, Trash2, Loader2, FileText, Eye, EyeOff } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminPages() {
  const { data: pagesList, isLoading } = trpc.pages.list.useQuery();
  const utils = trpc.useUtils();
  const upsertMutation = trpc.pages.upsert.useMutation({
    onSuccess: () => { utils.pages.list.invalidate(); toast.success("Página salva!"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.pages.delete.useMutation({
    onSuccess: () => { utils.pages.list.invalidate(); toast.success("Página removida!"); },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const openNew = () => { setEditing(null); setOpen(true); };
  const openEdit = (page: any) => { setEditing(page); setOpen(true); };

  const published = (pagesList || []).filter((p: any) => p.isPublished).length;
  const drafts = (pagesList || []).filter((p: any) => !p.isPublished).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Páginas</h1>
          <p className="text-muted-foreground mt-1">
            {published} publicadas · {drafts} rascunhos
          </p>
        </div>
        <Button
          onClick={openNew}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110 gap-2"
        >
          <Plus className="h-4 w-4" />Nova Página
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="grid gap-3">
          {(pagesList || []).map((page: any) => (
            <div
              key={page.id}
              className="flex items-center justify-between p-4 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: `${GOLD}25`, borderLeftWidth: 3, borderLeftColor: page.isPublished ? GOLD : "#cbd5e1" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: page.isPublished ? `${NAVY}12` : "#f1f5f9" }}
                >
                  <FileText className="h-5 w-5" style={{ color: page.isPublished ? NAVY : "#94a3b8" }} />
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: NAVY }}>{page.title}</p>
                  <p className="text-xs text-muted-foreground">/{page.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={
                    page.isPublished
                      ? { background: `${GOLD}20`, color: NAVY }
                      : { background: "#f1f5f9", color: "#64748b" }
                  }
                >
                  {page.isPublished
                    ? <Eye className="h-3 w-3" />
                    : <EyeOff className="h-3 w-3" />}
                  {page.isPublished ? "Publicada" : "Rascunho"}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => openEdit(page)}
                >
                  <Pencil className="h-4 w-4" style={{ color: NAVY }} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => { if (confirm("Remover esta página?")) deleteMutation.mutate({ id: page.id }); }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}

          {(pagesList || []).length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                Nenhuma página criada ainda. Clique em "Nova Página" para começar.
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>{editing ? "Editar Página" : "Nova Página"}</DialogTitle>
          </DialogHeader>
          <PageForm page={editing} onSubmit={(data) => upsertMutation.mutate(data)} loading={upsertMutation.isPending} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PageForm({ page, onSubmit, loading }: { page: any; onSubmit: (data: any) => void; loading: boolean }) {
  const [form, setForm] = useState({
    id: page?.id,
    slug: page?.slug || "",
    title: page?.title || "",
    content: page?.content || "",
    metaTitle: page?.metaTitle || "",
    metaDescription: page?.metaDescription || "",
    metaKeywords: page?.metaKeywords || "",
    ogTitle: page?.ogTitle || "",
    ogDescription: page?.ogDescription || "",
    ogImage: page?.ogImage || "",
    canonical: page?.canonical || "",
    isPublished: page?.isPublished ?? true,
    sortOrder: page?.sortOrder ?? 0,
  });

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="content">Conteúdo</TabsTrigger>
        <TabsTrigger value="seo">SEO</TabsTrigger>
      </TabsList>

      <TabsContent value="content" className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Sobre Nós" />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="sobre" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Conteúdo</Label>
          <Textarea value={form.content} onChange={(e) => update("content", e.target.value)} rows={12} placeholder="Conteúdo da página em HTML ou Markdown..." />
        </div>
        <div className="flex items-center gap-3">
          <Switch checked={form.isPublished} onCheckedChange={(v) => update("isPublished", v)} />
          <Label>Publicada</Label>
        </div>
      </TabsContent>

      <TabsContent value="seo" className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input value={form.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} placeholder="Título para SEO" />
        </div>
        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea value={form.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} rows={3} placeholder="Descrição para SEO (160 caracteres)" />
        </div>
        <div className="space-y-2">
          <Label>Meta Keywords</Label>
          <Input value={form.metaKeywords} onChange={(e) => update("metaKeywords", e.target.value)} placeholder="palavra1, palavra2, palavra3" />
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
          <Input value={form.canonical} onChange={(e) => update("canonical", e.target.value)} placeholder="https://mauromoncao.adv.br/sobre" />
        </div>
      </TabsContent>

      <div className="flex justify-end mt-6">
        <Button
          onClick={() => onSubmit(form)}
          disabled={loading || !form.title || !form.slug}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Salvar Página
        </Button>
      </div>
    </Tabs>
  );
}
