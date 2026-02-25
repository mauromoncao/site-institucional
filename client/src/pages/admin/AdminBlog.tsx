import React, { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, Loader2, BookOpen, Eye, EyeOff,
  Image, Video, Search, ExternalLink, Calendar, Tag,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const CATEGORIES = [
  { value: "tributario",   label: "Tributário" },
  { value: "previdenciario", label: "Previdenciário" },
  { value: "bancario",     label: "Bancário" },
  { value: "imobiliario",  label: "Imobiliário" },
  { value: "sucessorio",   label: "Sucessório / Família" },
  { value: "publico",      label: "Advocacia Pública" },
  { value: "empresarial",  label: "Empresarial" },
  { value: "geral",        label: "Geral" },
];

function categoryLabel(slug: string) {
  return CATEGORIES.find((c) => c.value === slug)?.label ?? slug;
}

// All category badges use brand palette: navy bg or gold bg variants
function categoryColor(_slug: string) {
  // Unified brand style — navy background, no off-brand colors
  return "";
}

function categoryStyle(slug: string): React.CSSProperties {
  // Even slots: gold tint; odd slots: navy tint — consistent brand
  const light: Record<string, React.CSSProperties> = {
    tributario:     { background: "#E8B84B22", color: "#19385C" },
    previdenciario: { background: "#19385C18", color: "#19385C" },
    bancario:       { background: "#E8B84B22", color: "#19385C" },
    imobiliario:    { background: "#19385C18", color: "#19385C" },
    sucessorio:     { background: "#E8B84B22", color: "#19385C" },
    publico:        { background: "#19385C18", color: "#19385C" },
    empresarial:    { background: "#E8B84B22", color: "#19385C" },
    geral:          { background: "#f1f5f9",   color: "#64748b"  },
  };
  return light[slug] ?? { background: "#f1f5f9", color: "#64748b" };
}

/** Extrai ID do vídeo do YouTube ou Vimeo */
function parseVideoEmbed(url: string): string | null {
  if (!url) return null;
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  // Já é embed
  if (url.includes("youtube.com/embed") || url.includes("player.vimeo.com")) return url;
  return null;
}

export default function AdminBlog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const utils = trpc.useUtils();
  const upsertMutation = trpc.blog.upsert.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post salvo com sucesso!"); setOpen(false); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post removido!"); },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");

  const filtered = (posts || []).filter((p: any) => {
    const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.categorySlug === filterCat || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const published = filtered.filter((p: any) => p.isPublished).length;
  const drafts = filtered.filter((p: any) => !p.isPublished).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Blog</h1>
          <p className="text-muted-foreground mt-1">
            {published} publicados · {drafts} rascunhos
          </p>
        </div>
        <Button
          onClick={() => { setEditing(null); setOpen(true); }}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          <Plus className="h-4 w-4 mr-2" />Novo Post
        </Button>
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterCat} onValueChange={setFilterCat}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Lista de posts ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((post: any) => (
            <Card
              key={post.id}
              className="border shadow-sm hover:shadow-md transition-all"
              style={{ borderColor: post.isPublished ? `${GOLD}30` : "rgba(0,0,0,0.08)" }}
            >
              <CardContent className="flex items-center gap-4 py-3 px-4">

                {/* Thumb ou placeholder */}
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                  {post.featuredImage || post.coverImage ? (
                    <img
                      src={post.featuredImage || post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm truncate" style={{ color: NAVY }}>{post.title}</p>
                    {(post.videoUrl || post.video_url) && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
                        <Video className="h-2.5 w-2.5" />Vídeo
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">/blog/{post.slug}</span>
                    {(post.categorySlug || post.category) && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={categoryStyle(post.categorySlug || post.category)}
                      >
                        {categoryLabel(post.categorySlug || post.category)}
                      </span>
                    )}
                    {post.publishedAt && (
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Calendar className="h-2.5 w-2.5" />
                        {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1"
                    style={post.isPublished
                      ? { background: `${GOLD}25`, color: NAVY }
                      : { background: "#f1f5f9", color: "#64748b" }
                    }
                  >
                    {post.isPublished ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {post.isPublished ? "Publicado" : "Rascunho"}
                  </span>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                    title="Ver no site"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => { setEditing(post); setOpen(true); }}
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost" size="icon"
                    onClick={() => { if (confirm(`Remover "${post.title}"?`)) deleteMutation.mutate({ id: post.id }); }}
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filtered.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                {search || filterCat !== "all"
                  ? "Nenhum post encontrado com esses filtros."
                  : "Nenhum post publicado. Clique em \"Novo Post\" para começar."}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* ── Modal editor ── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle style={{ color: NAVY }}>
              {editing ? `Editar: ${editing.title}` : "Novo Post"}
            </DialogTitle>
          </DialogHeader>
          <BlogForm
            post={editing}
            onSubmit={(data) => upsertMutation.mutate(data)}
            loading={upsertMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ════════════════════════════════════════
   FORMULÁRIO DO POST
════════════════════════════════════════ */
function BlogForm({
  post, onSubmit, loading,
}: { post: any; onSubmit: (data: any) => void; loading: boolean }) {

  const [form, setForm] = useState({
    id: post?.id,
    slug: post?.slug || "",
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    featuredImage: post?.featuredImage || post?.coverImage || "",
    videoUrl: post?.videoUrl || post?.video_url || "",
    author: post?.author || "Dr. Mauro Monção",
    categorySlug: post?.categorySlug || post?.category || "tributario",
    tags: Array.isArray(post?.tags) ? post.tags.join(", ") : (post?.tags || ""),
    publishedAt: post?.publishedAt || new Date().toISOString().split("T")[0],
    metaTitle: post?.metaTitle || "",
    metaDescription: post?.metaDescription || "",
    metaKeywords: post?.metaKeywords || "",
    isPublished: post?.isPublished ?? false,
  });

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  // Auto-gera slug a partir do título
  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

  const embedUrl = parseVideoEmbed(form.videoUrl);

  const handleSubmit = () => {
    const data = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
    };
    onSubmit(data);
  };

  return (
    <Tabs defaultValue="content" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="content">📝 Conteúdo</TabsTrigger>
        <TabsTrigger value="media">🎬 Mídia & Vídeo</TabsTrigger>
        <TabsTrigger value="seo">🔍 SEO</TabsTrigger>
      </TabsList>

      {/* ── Aba Conteúdo ── */}
      <TabsContent value="content" className="space-y-5 mt-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Título <span className="text-red-500">*</span></Label>
            <Input
              value={form.title}
              onChange={(e) => {
                update("title", e.target.value);
                if (!form.id) update("slug", autoSlug(e.target.value));
              }}
              placeholder="Ex: Planejamento Tributário 2025"
            />
          </div>
          <div className="space-y-2">
            <Label>Slug (URL)</Label>
            <div className="flex gap-2">
              <Input
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                placeholder="planejamento-tributario-2025"
                className="font-mono text-sm"
              />
              <Button
                variant="outline" size="icon" type="button"
                onClick={() => update("slug", autoSlug(form.title))}
                title="Gerar slug automático"
              >
                <Tag className="h-4 w-4" />
              </Button>
            </div>
            {form.slug && (
              <p className="text-xs text-muted-foreground">/blog/<strong>{form.slug}</strong></p>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={form.categorySlug} onValueChange={(v) => update("categorySlug", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Autor</Label>
            <Input value={form.author} onChange={(e) => update("author", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Data de Publicação</Label>
            <Input type="date" value={form.publishedAt} onChange={(e) => update("publishedAt", e.target.value)} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tags (separadas por vírgula)</Label>
          <Input
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            placeholder="planejamento tributário, IRPF, reforma tributária"
          />
        </div>

        <div className="space-y-2">
          <Label>Resumo / Excerpt</Label>
          <Textarea
            value={form.excerpt}
            onChange={(e) => update("excerpt", e.target.value)}
            rows={3}
            placeholder="Breve descrição do artigo (aparece na listagem do blog e no SEO)"
          />
        </div>

        <div className="space-y-2">
          <Label>Conteúdo do Artigo</Label>
          <Textarea
            value={form.content}
            onChange={(e) => update("content", e.target.value)}
            rows={18}
            placeholder="Conteúdo em HTML. Ex: <h2>Título</h2><p>Parágrafo...</p>"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Suporte a HTML. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;blockquote&gt;.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t">
          <Switch
            checked={form.isPublished}
            onCheckedChange={(v) => update("isPublished", v)}
          />
          <div>
            <Label className="cursor-pointer" onClick={() => update("isPublished", !form.isPublished)}>
              {form.isPublished ? (
                <span className="flex items-center gap-1.5 font-semibold" style={{ color: NAVY }}>
                  <Eye className="h-4 w-4" style={{ color: GOLD }} />Publicado — visível no site
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <EyeOff className="h-4 w-4" />Rascunho — não aparece no blog
                </span>
              )}
            </Label>
          </div>
        </div>
      </TabsContent>

      {/* ── Aba Mídia & Vídeo ── */}
      <TabsContent value="media" className="space-y-6 mt-5">

        {/* Imagem de capa */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Image className="h-4 w-4" />Imagem de Capa
          </Label>
          <Input
            value={form.featuredImage}
            onChange={(e) => update("featuredImage", e.target.value)}
            placeholder="https://... (cole a URL da imagem)"
          />
          <p className="text-xs text-muted-foreground">
            Cole o URL de uma imagem do painel Mídia, ou use um link externo. Tamanho ideal: 1200×630px.
          </p>
          {form.featuredImage && (
            <div className="rounded-xl overflow-hidden border max-w-md">
              <img
                src={form.featuredImage}
                alt="Preview da capa"
                className="w-full h-48 object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <p className="text-xs text-center text-muted-foreground py-1.5 bg-muted/30">
                Preview da capa
              </p>
            </div>
          )}
        </div>

        {/* Vídeo */}
        <div className="space-y-3 pt-4 border-t">
          <Label className="flex items-center gap-2 text-base font-semibold">
            <Video className="h-4 w-4" />Vídeo (YouTube ou Vimeo)
          </Label>
          <Input
            value={form.videoUrl}
            onChange={(e) => update("videoUrl", e.target.value)}
            placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX"
          />
          <p className="text-xs text-muted-foreground">
            Cole o link do YouTube ou Vimeo. O vídeo aparecerá incorporado no artigo.
            Exemplos: <code>youtube.com/watch?v=ID</code> · <code>youtu.be/ID</code> · <code>vimeo.com/ID</code>
          </p>

          {form.videoUrl && !embedUrl && (
            <p className="text-xs text-red-500">
              ⚠️ URL não reconhecida. Use um link do YouTube ou Vimeo.
            </p>
          )}

          {embedUrl && (
            <div className="rounded-xl overflow-hidden border bg-black max-w-md">
              <div className="relative" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={embedUrl}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Preview do vídeo"
                />
              </div>
              <p className="text-xs text-center text-muted-foreground py-1.5 bg-muted/30">
                ✅ Vídeo incorporado — aparecerá assim no artigo
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      {/* ── Aba SEO ── */}
      <TabsContent value="seo" className="space-y-4 mt-5">
        <div className="p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
          💡 O SEO aparece nos resultados do Google e no compartilhamento em redes sociais.
          Se deixar em branco, o título e o resumo do artigo serão usados automaticamente.
        </div>
        <div className="space-y-2">
          <Label>Meta Title (Google) <span className="text-muted-foreground text-xs">— máx. 60 caracteres</span></Label>
          <Input
            value={form.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
            placeholder={form.title || "Título para o Google"}
            maxLength={70}
          />
          <p className="text-xs text-muted-foreground">{form.metaTitle.length}/60 caracteres</p>
        </div>
        <div className="space-y-2">
          <Label>Meta Description <span className="text-muted-foreground text-xs">— máx. 155 caracteres</span></Label>
          <Textarea
            value={form.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            rows={3}
            placeholder={form.excerpt || "Descrição que aparece no Google"}
            maxLength={160}
          />
          <p className="text-xs text-muted-foreground">{form.metaDescription.length}/155 caracteres</p>
        </div>
        <div className="space-y-2">
          <Label>Palavras-chave (Keywords)</Label>
          <Input
            value={form.metaKeywords}
            onChange={(e) => update("metaKeywords", e.target.value)}
            placeholder="planejamento tributário, advogado tributarista, IRPF 2025"
          />
        </div>

        {/* Preview Google */}
        {(form.metaTitle || form.title) && (
          <div className="mt-4 p-4 rounded-xl border bg-white space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Preview no Google</p>
            <p className="text-[#1a0dab] text-base font-medium leading-tight hover:underline cursor-default">
              {form.metaTitle || form.title}
            </p>
            <p className="text-[#006621] text-xs">mauromoncao.adv.br/blog/{form.slug}</p>
            <p className="text-[#545454] text-sm leading-relaxed">
              {form.metaDescription || form.excerpt || "Descrição do artigo aparecerá aqui."}
            </p>
          </div>
        )}
      </TabsContent>

      {/* ── Botão salvar ── */}
      <div className="flex items-center justify-between pt-4 border-t mt-4">
        <p className="text-xs text-muted-foreground">
          {form.isPublished ? "✅ Será publicado no blog" : "💾 Será salvo como rascunho"}
        </p>
        <Button
          onClick={handleSubmit}
          disabled={loading || !form.title || !form.slug}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110 min-w-32"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading ? "Salvando..." : "Salvar Post"}
        </Button>
      </div>
    </Tabs>
  );
}
