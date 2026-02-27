import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PlusCircle, Edit2, Trash2, Loader2, Tag, BookOpen, GripVertical } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const DEFAULT_CATEGORIES = [
  { slug: "tributario",               name: "Direito Tributário",       description: "Impostos, PGFN, parcelamentos e planejamento fiscal" },
  { slug: "defesa-fiscal",            name: "Defesa Fiscal",            description: "Autuações fiscais, recursos e impugnações" },
  { slug: "planejamento-patrimonial", name: "Planejamento Patrimonial", description: "Holding familiar, proteção de bens e sucessão" },
  { slug: "sucessorio",               name: "Direito Sucessório",       description: "Herança, inventário, testamento e partilha" },
  { slug: "imobiliario",              name: "Direito Imobiliário",      description: "Compra, venda, locação e regularização de imóveis" },
  { slug: "publico",                  name: "Advocacia Pública",        description: "Servidores públicos, concursos e administrativo" },
  { slug: "previdenciario",           name: "Direito Previdenciário",   description: "INSS, aposentadoria e benefícios previdenciários" },
  { slug: "bancario",                 name: "Direito Bancário",         description: "Contratos bancários, juros abusivos e superendividamento" },
  { slug: "trabalhista",              name: "Direito Trabalhista",      description: "Rescisão, verbas trabalhistas e reclamações" },
  { slug: "consumidor",               name: "Direito do Consumidor",    description: "CDC, cobranças indevidas e reparação de danos" },
  { slug: "familia",                  name: "Direito de Família",       description: "Divórcio, guarda, pensão alimentícia e adoção" },
  { slug: "empresarial",              name: "Direito Empresarial",      description: "Contratos, sociedades, recuperação judicial" },
  { slug: "atualidades",              name: "Atualidades Jurídicas",    description: "Novidades legislativas e decisões relevantes" },
];

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

interface CatForm {
  id?: number;
  slug: string;
  name: string;
  description: string;
  sortOrder: number;
}

function CategoryFormModal({
  open,
  onClose,
  category,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  category?: any;
  onSaved: () => void;
}) {
  const utils = trpc.useUtils();
  const upsertMutation = trpc.blog.categories.upsert.useMutation({
    onSuccess: () => {
      utils.blog.categories.list.invalidate();
      toast.success(category?.id ? "Categoria atualizada!" : "Categoria criada!");
      onSaved();
    },
    onError: (e) => toast.error(e.message),
  });

  const [form, setForm] = useState<CatForm>({
    id: category?.id,
    slug: category?.slug ?? "",
    name: category?.name ?? "",
    description: category?.description ?? "",
    sortOrder: category?.sortOrder ?? 0,
  });
  const [slugEdited, setSlugEdited] = useState(!!category?.id);

  const set = (k: keyof CatForm, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleNameChange = (v: string) => {
    set("name", v);
    if (!slugEdited) set("slug", generateSlug(v));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle style={{ color: NAVY }}>{category?.id ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          <DialogDescription>Categorias organizam o conteúdo do blog por área jurídica.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>Nome *</Label>
            <Input
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Direito Tributário"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Slug / URL</Label>
            <Input
              value={form.slug}
              onChange={(e) => { setSlugEdited(true); set("slug", e.target.value); }}
              placeholder="direito-tributario"
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">Usado na URL: /blog?categoria={form.slug || "slug"}</p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descrição (opcional)</Label>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Breve descrição desta categoria"
              rows={2}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ordem de Exibição</Label>
            <Input
              type="number"
              value={form.sortOrder}
              onChange={(e) => set("sortOrder", parseInt(e.target.value) || 0)}
              min={0}
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>Cancelar</Button>
            <Button
              className="flex-1 font-bold"
              style={{ background: GOLD, color: NAVY }}
              disabled={!form.name || !form.slug || upsertMutation.isPending}
              onClick={() => upsertMutation.mutate(form as any)}
            >
              {upsertMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminCategories() {
  const { data: categories, isLoading } = trpc.blog.categories.list.useQuery();
  const { data: posts } = trpc.blog.list.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.blog.categories.delete.useMutation({
    onSuccess: () => { utils.blog.categories.list.invalidate(); toast.success("Categoria excluída!"); },
    onError: (e) => toast.error(e.message),
  });
  const upsertMutation = trpc.blog.categories.upsert.useMutation({
    onSuccess: () => { utils.blog.categories.list.invalidate(); toast.success("Categorias padrão importadas!"); },
    onError: (e) => toast.error(e.message),
  });

  const [editCat, setEditCat] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const catList = (categories as any[]) ?? [];
  const postList = (posts as any[]) ?? [];

  const postCountByCategory = (slug: string) =>
    postList.filter((p) => p.category === slug).length;

  const handleSeedDefaults = async () => {
    for (const c of DEFAULT_CATEGORIES) {
      await upsertMutation.mutateAsync({ slug: c.slug, name: c.name, description: c.description, sortOrder: DEFAULT_CATEGORIES.indexOf(c) });
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Categorias do Blog</h1>
          <p className="text-muted-foreground mt-1">
            {catList.length} categoria{catList.length !== 1 ? "s" : ""} cadastrada{catList.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {catList.length === 0 && (
            <Button
              variant="outline"
              onClick={handleSeedDefaults}
              disabled={upsertMutation.isPending}
              className="gap-2"
            >
              {upsertMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Tag className="h-4 w-4" />}
              Importar padrões
            </Button>
          )}
          <Button
            onClick={() => { setEditCat(null); setShowForm(true); }}
            style={{ background: GOLD, color: NAVY }}
            className="font-bold gap-2 hover:brightness-110"
          >
            <PlusCircle className="h-4 w-4" />
            Nova Categoria
          </Button>
        </div>
      </div>

      {/* ── List ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : catList.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-20 text-center">
            <Tag className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground text-sm mb-4">
              Nenhuma categoria cadastrada. Clique em "Importar padrões" para criar as 13 categorias jurídicas pré-definidas ou crie manualmente.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" onClick={handleSeedDefaults} disabled={upsertMutation.isPending}>
                Importar padrões
              </Button>
              <Button onClick={() => { setEditCat(null); setShowForm(true); }} style={{ background: GOLD, color: NAVY }}>
                Criar manualmente
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: `${GOLD}25` }}>
          {/* Table header */}
          <div
            className="grid grid-cols-[1fr_160px_80px_120px] gap-4 px-5 py-3 border-b text-xs font-bold uppercase tracking-wider text-muted-foreground"
            style={{ background: `${NAVY}05`, borderColor: `${GOLD}20` }}
          >
            <span>Categoria</span>
            <span className="text-center">Posts vinculados</span>
            <span className="text-center">Ordem</span>
            <span className="text-right">Ações</span>
          </div>

          {catList.map((cat, idx) => {
            const count = postCountByCategory(cat.slug);
            return (
              <div
                key={cat.id}
                className={`grid grid-cols-[1fr_160px_80px_120px] gap-4 px-5 py-4 items-center hover:bg-slate-50 transition-colors ${idx < catList.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: `${GOLD}15` }}
              >
                {/* Name + slug */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${GOLD}20` }}>
                      <Tag className="h-4 w-4" style={{ color: NAVY }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: NAVY }}>{cat.name}</p>
                      <p className="text-xs font-mono text-muted-foreground">{cat.slug}</p>
                      {cat.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{cat.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post count */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-semibold" style={{ color: count > 0 ? NAVY : "#94a3b8" }}>
                      {count}
                    </span>
                  </div>
                </div>

                {/* Sort order */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">{cat.sortOrder}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => { setEditCat(cat); setShowForm(true); }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="h-4 w-4" style={{ color: NAVY }} />
                  </button>
                  <button
                    onClick={() => setDeleteId(cat.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title={count > 0 ? `${count} post(s) vinculado(s) — excluir mesmo assim?` : "Excluir"}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Default categories info ── */}
      <div className="rounded-2xl border p-5" style={{ borderColor: `${GOLD}30`, background: `${NAVY}04` }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: NAVY }}>
          Categorias Jurídicas Disponíveis
        </p>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_CATEGORIES.map((c) => (
            <span key={c.slug} className="text-xs px-2 py-1 rounded-full font-medium"
              style={{ background: `${GOLD}20`, color: NAVY }}>
              {c.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Modals ── */}
      {showForm && (
        <CategoryFormModal
          open={showForm}
          onClose={() => { setShowForm(false); setEditCat(null); }}
          category={editCat}
          onSaved={() => { setShowForm(false); setEditCat(null); }}
        />
      )}

      <AlertDialog open={deleteId !== null} onOpenChange={(o) => { if (!o) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir categoria?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível. Os posts vinculados a esta categoria não serão excluídos, mas ficarão sem categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (deleteId !== null) deleteMutation.mutate({ id: deleteId });
                setDeleteId(null);
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
