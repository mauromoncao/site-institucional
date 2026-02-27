import { useState, useMemo, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  PlusCircle, Edit2, Trash2, Eye, Loader2, Search, X, BookOpen,
  Calendar, Tag, User, Link2, Image as ImageIcon, Video, Globe,
  Save, Send, Archive, Clock, CheckCircle, AlertCircle, Star,
  FileText, BarChart3, ChevronDown, ExternalLink, Copy,
} from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

const CATEGORIES = [
  { slug: "tributario",              label: "Direito Tributário" },
  { slug: "defesa-fiscal",           label: "Defesa Fiscal" },
  { slug: "planejamento-patrimonial",label: "Planejamento Patrimonial" },
  { slug: "sucessorio",              label: "Direito Sucessório" },
  { slug: "imobiliario",             label: "Direito Imobiliário" },
  { slug: "publico",                 label: "Advocacia Pública" },
  { slug: "previdenciario",          label: "Direito Previdenciário" },
  { slug: "bancario",                label: "Direito Bancário" },
  { slug: "trabalhista",             label: "Direito Trabalhista" },
  { slug: "consumidor",              label: "Direito do Consumidor" },
  { slug: "familia",                 label: "Direito de Família" },
  { slug: "empresarial",             label: "Direito Empresarial" },
  { slug: "atualidades",             label: "Atualidades Jurídicas" },
];

function categoryLabel(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  published: { label: "Publicado",  color: "#16a34a", bg: "#dcfce7", icon: CheckCircle },
  draft:     { label: "Rascunho",   color: "#9333ea", bg: "#f3e8ff", icon: FileText },
  scheduled: { label: "Agendado",   color: "#2563eb", bg: "#dbeafe", icon: Clock },
  archived:  { label: "Arquivado",  color: "#64748b", bg: "#f1f5f9", icon: Archive },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG["draft"];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ color: cfg.color, background: cfg.bg }}>
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

function parseVideoEmbed(url: string): string {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

function wordCount(text: string): number {
  if (!text) return 0;
  return text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

function readingTime(text: string): number {
  return Math.max(1, Math.ceil(wordCount(text) / 200));
}

// ─── Blog Form ─────────────────────────────────────────────────────────────
interface PostForm {
  id?: number;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  videoUrl: string;
  authorName: string;
  category: string;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  ctaText: string;
  ctaUrl: string;
  status: "draft" | "published" | "scheduled" | "archived";
  isFeatured: boolean;
  publishedAt: string;
  scheduledAt: string;
}

const EMPTY_FORM: PostForm = {
  slug: "", title: "", subtitle: "", excerpt: "", content: "",
  coverImage: "", coverImageAlt: "", videoUrl: "", authorName: "Dr. Mauro Monção",
  category: "", tags: "", metaTitle: "", metaDescription: "", metaKeywords: "",
  ogImage: "", ctaText: "", ctaUrl: "", status: "draft", isFeatured: false,
  publishedAt: "", scheduledAt: "",
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function BlogFormModal({
  open,
  onClose,
  post,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  post?: any;
  onSaved: () => void;
}) {
  const utils = trpc.useUtils();
  const upsertMutation = trpc.blog.upsert.useMutation({
    onSuccess: () => {
      utils.blog.list.invalidate();
      toast.success(post?.id ? "Post atualizado!" : "Post criado!");
      onSaved();
    },
    onError: (e) => toast.error(e.message),
  });

  const [form, setForm] = useState<PostForm>(() => {
    if (!post) return EMPTY_FORM;
    return {
      id: post.id,
      slug: post.slug ?? "",
      title: post.title ?? "",
      subtitle: post.subtitle ?? "",
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      coverImage: post.coverImage ?? "",
      coverImageAlt: post.coverImageAlt ?? "",
      videoUrl: post.videoUrl ?? "",
      authorName: post.authorName ?? "Dr. Mauro Monção",
      category: post.category ?? "",
      tags: post.tags ?? "",
      metaTitle: post.metaTitle ?? "",
      metaDescription: post.metaDescription ?? "",
      metaKeywords: post.metaKeywords ?? "",
      ogImage: post.ogImage ?? "",
      ctaText: post.ctaText ?? "",
      ctaUrl: post.ctaUrl ?? "",
      status: (post.status ?? (post.isPublished ? "published" : "draft")) as PostForm["status"],
      isFeatured: post.isFeatured ?? false,
      publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0, 16) : "",
      scheduledAt: post.scheduledAt ? new Date(post.scheduledAt).toISOString().slice(0, 16) : "",
    };
  });

  const [slugEdited, setSlugEdited] = useState(!!post?.id);
  const [previewMode, setPreviewMode] = useState(false);

  const set = (key: keyof PostForm, val: any) => setForm((f) => ({ ...f, [key]: val }));

  const handleTitleChange = (v: string) => {
    set("title", v);
    if (!slugEdited) set("slug", generateSlug(v));
    if (!form.metaTitle) set("metaTitle", v);
  };

  const handleSubmit = (targetStatus?: PostForm["status"]) => {
    const status = targetStatus ?? form.status;
    const isPublished = status === "published";
    upsertMutation.mutate({
      ...form,
      status,
      isPublished,
      publishedAt: isPublished && !form.publishedAt ? new Date().toISOString() : form.publishedAt || undefined,
      scheduledAt: form.scheduledAt || undefined,
    } as any);
  };

  const wc = wordCount(form.content);
  const rt = readingTime(form.content);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-5xl w-full max-h-[96vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-bold" style={{ color: NAVY }}>
                {post?.id ? "Editar Post" : "Novo Post"}
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-xs">
                {form.title || "Sem título"} · {wc} palavras · {rt} min de leitura
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors"
                style={previewMode ? { background: NAVY, color: "white", borderColor: NAVY } : { borderColor: "#e2e8f0" }}
              >
                <Eye className="h-3.5 w-3.5" />
                {previewMode ? "Editar" : "Preview"}
              </button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSubmit("draft")}
                disabled={upsertMutation.isPending}
                className="text-xs gap-1"
              >
                <Save className="h-3.5 w-3.5" />
                Rascunho
              </Button>
              <Button
                size="sm"
                onClick={() => handleSubmit("published")}
                disabled={upsertMutation.isPending}
                className="text-xs gap-1 font-bold"
                style={{ background: GOLD, color: NAVY }}
              >
                {upsertMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                Publicar
              </Button>
            </div>
          </div>
          {/* Status bar */}
          <div className="flex items-center gap-3 mt-3">
            <StatusBadge status={form.status} />
            {form.isFeatured && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{ color: "#b45309", background: "#fef3c7" }}>
                <Star className="h-3 w-3" />Destaque
              </span>
            )}
            {form.content && (
              <span className="text-xs text-muted-foreground">{wc} palavras · ~{rt} min</span>
            )}
          </div>
        </DialogHeader>

        {previewMode ? (
          <BlogPreview form={form} />
        ) : (
          <div className="p-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="content">
                  <FileText className="h-3.5 w-3.5 mr-1.5" />Conteúdo
                </TabsTrigger>
                <TabsTrigger value="media">
                  <ImageIcon className="h-3.5 w-3.5 mr-1.5" />Mídia
                </TabsTrigger>
                <TabsTrigger value="seo">
                  <Globe className="h-3.5 w-3.5 mr-1.5" />SEO
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <BarChart3 className="h-3.5 w-3.5 mr-1.5" />Config
                </TabsTrigger>
              </TabsList>

              {/* ── TAB: CONTEÚDO ── */}
              <TabsContent value="content" className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Título *
                  </Label>
                  <Input
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Ex: Planejamento Tributário para PMEs em 2025"
                    className="h-12 text-base font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Subtítulo (opcional)
                  </Label>
                  <Input
                    value={form.subtitle}
                    onChange={(e) => set("subtitle", e.target.value)}
                    placeholder="Uma frase complementar ao título"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                      <Link2 className="h-3 w-3 inline mr-1" />Slug / URL
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={form.slug}
                        onChange={(e) => { setSlugEdited(true); set("slug", e.target.value); }}
                        placeholder="meu-artigo-juridico"
                        className="font-mono text-sm"
                      />
                      {form.slug && (
                        <a href={`/blog/${form.slug}`} target="_blank" rel="noreferrer"
                          className="text-muted-foreground hover:text-primary shrink-0">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">/blog/{form.slug || "seu-slug"}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                      <Tag className="h-3 w-3 inline mr-1" />Categoria
                    </Label>
                    <Select value={form.category} onValueChange={(v) => set("category", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a área jurídica" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>{c.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Tags (separadas por vírgula)
                  </Label>
                  <Input
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="tributário, PGFN, parcelamento, 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Resumo / Excerpt
                  </Label>
                  <Textarea
                    value={form.excerpt}
                    onChange={(e) => set("excerpt", e.target.value)}
                    placeholder="Resumo para listagem e redes sociais (2–3 frases)..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                      Corpo do Artigo (HTML)
                    </Label>
                    <span className="text-xs text-muted-foreground">{wc} palavras · ~{rt} min</span>
                  </div>
                  <Textarea
                    value={form.content}
                    onChange={(e) => set("content", e.target.value)}
                    placeholder="<h2>Introdução</h2><p>Conteúdo completo do artigo...</p>"
                    rows={18}
                    className="font-mono text-sm leading-relaxed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Aceita HTML completo: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;, &lt;strong&gt;, &lt;a&gt;, etc.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Texto do CTA
                    </Label>
                    <Input
                      value={form.ctaText}
                      onChange={(e) => set("ctaText", e.target.value)}
                      placeholder="Consulte gratuitamente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      URL do CTA
                    </Label>
                    <Input
                      value={form.ctaUrl}
                      onChange={(e) => set("ctaUrl", e.target.value)}
                      placeholder="https://wa.me/5586994820054"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    <User className="h-3 w-3 inline mr-1" />Autor
                  </Label>
                  <Input
                    value={form.authorName}
                    onChange={(e) => set("authorName", e.target.value)}
                    placeholder="Dr. Mauro Monção"
                  />
                </div>
              </TabsContent>

              {/* ── TAB: MÍDIA ── */}
              <TabsContent value="media" className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    <ImageIcon className="h-3 w-3 inline mr-1" />URL da Imagem de Capa
                  </Label>
                  <Input
                    value={form.coverImage}
                    onChange={(e) => set("coverImage", e.target.value)}
                    placeholder="https://... ou /assets/imagem.jpg"
                  />
                  {form.coverImage && (
                    <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor: `${GOLD}30` }}>
                      <img
                        src={form.coverImage}
                        alt="preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Alt Text da Imagem (SEO)
                  </Label>
                  <Input
                    value={form.coverImageAlt}
                    onChange={(e) => set("coverImageAlt", e.target.value)}
                    placeholder="Descrição da imagem para acessibilidade e SEO"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    <Video className="h-3 w-3 inline mr-1" />URL do Vídeo (YouTube / Vimeo)
                  </Label>
                  <Input
                    value={form.videoUrl}
                    onChange={(e) => set("videoUrl", e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... ou https://vimeo.com/..."
                  />
                  {form.videoUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden border aspect-video" style={{ borderColor: `${GOLD}30` }}>
                      <iframe
                        src={parseVideoEmbed(form.videoUrl)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl border-dashed border-2 text-center" style={{ borderColor: `${GOLD}40` }}>
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" style={{ color: `${GOLD}80` }} />
                  <p className="text-sm font-medium" style={{ color: NAVY }}>Biblioteca de Mídia</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Faça upload de imagens em{" "}
                    <a href="/admin/media" target="_blank" className="underline" style={{ color: GOLD }}>
                      Mídia
                    </a>
                    {" "}e cole a URL acima.
                  </p>
                </div>
              </TabsContent>

              {/* ── TAB: SEO ── */}
              <TabsContent value="seo" className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Meta Title
                  </Label>
                  <Input
                    value={form.metaTitle}
                    onChange={(e) => set("metaTitle", e.target.value)}
                    placeholder={form.title || "Título para o Google (≤ 60 caracteres)"}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground text-right">{form.metaTitle.length}/60</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Meta Description
                  </Label>
                  <Textarea
                    value={form.metaDescription}
                    onChange={(e) => set("metaDescription", e.target.value)}
                    placeholder="Descrição para o Google (≤ 160 caracteres)"
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground text-right">{form.metaDescription.length}/160</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Meta Keywords
                  </Label>
                  <Input
                    value={form.metaKeywords}
                    onChange={(e) => set("metaKeywords", e.target.value)}
                    placeholder="tributário, PGFN, recuperação fiscal, 2025"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    OG Image (compartilhamento social)
                  </Label>
                  <Input
                    value={form.ogImage}
                    onChange={(e) => set("ogImage", e.target.value)}
                    placeholder="URL da imagem social (1200×630px recomendado)"
                  />
                </div>

                {/* Google SERP preview */}
                {(form.metaTitle || form.title) && (
                  <div className="rounded-xl border p-4 space-y-1" style={{ borderColor: `${GOLD}30` }}>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Prévia no Google</p>
                    <p className="text-blue-600 text-base font-medium leading-snug line-clamp-1">
                      {form.metaTitle || form.title}
                    </p>
                    <p className="text-green-700 text-xs">
                      mauromoncao.adv.br/blog/{form.slug || "seu-slug"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {form.metaDescription || form.excerpt || "Sem descrição configurada."}
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* ── TAB: CONFIGURAÇÕES ── */}
              <TabsContent value="settings" className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                    Status de Publicação
                  </Label>
                  <Select value={form.status} onValueChange={(v) => set("status", v as PostForm["status"])}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">
                        <span className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />Rascunho
                        </span>
                      </SelectItem>
                      <SelectItem value="published">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />Publicado
                        </span>
                      </SelectItem>
                      <SelectItem value="scheduled">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />Agendado
                        </span>
                      </SelectItem>
                      <SelectItem value="archived">
                        <span className="flex items-center gap-2">
                          <Archive className="h-4 w-4 text-gray-500" />Arquivado
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {form.status === "scheduled" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider" style={{ color: NAVY }}>
                      <Calendar className="h-3 w-3 inline mr-1" />Data de Publicação Agendada
                    </Label>
                    <Input
                      type="datetime-local"
                      value={form.scheduledAt}
                      onChange={(e) => set("scheduledAt", e.target.value)}
                    />
                  </div>
                )}

                {(form.status === "published" || form.publishedAt) && (
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Data de Publicação
                    </Label>
                    <Input
                      type="datetime-local"
                      value={form.publishedAt}
                      onChange={(e) => set("publishedAt", e.target.value)}
                    />
                  </div>
                )}

                <div className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: `${GOLD}30` }}>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: NAVY }}>Artigo em Destaque</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Aparece no topo da listagem do blog
                    </p>
                  </div>
                  <Switch
                    checked={form.isFeatured}
                    onCheckedChange={(v) => set("isFeatured", v)}
                  />
                </div>

                <div className="p-4 rounded-xl" style={{ background: `${NAVY}08` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: NAVY }}>
                    Resumo do Conteúdo
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Palavras no corpo</span>
                      <span className="font-bold" style={{ color: NAVY }}>{wc}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tempo de leitura</span>
                      <span className="font-bold" style={{ color: NAVY }}>~{rt} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta title</span>
                      <span className={form.metaTitle.length > 60 ? "text-red-500 font-bold" : "font-bold"} style={{ color: form.metaTitle.length > 60 ? undefined : NAVY }}>
                        {form.metaTitle.length}/60
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meta description</span>
                      <span className={form.metaDescription.length > 160 ? "text-red-500 font-bold" : "font-bold"} style={{ color: form.metaDescription.length > 160 ? undefined : NAVY }}>
                        {form.metaDescription.length}/160
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Footer actions */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSubmit("archived")}
              disabled={upsertMutation.isPending}
              className="text-xs gap-1"
            >
              <Archive className="h-3.5 w-3.5" />Arquivar
            </Button>
            {form.status === "draft" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubmit("scheduled")}
                disabled={upsertMutation.isPending}
                className="text-xs gap-1 text-blue-600 border-blue-200"
              >
                <Clock className="h-3.5 w-3.5" />Agendar
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>Cancelar</Button>
            <Button
              size="sm"
              onClick={() => handleSubmit("draft")}
              disabled={upsertMutation.isPending}
              variant="outline"
              className="gap-1"
            >
              <Save className="h-3.5 w-3.5" />Salvar Rascunho
            </Button>
            <Button
              size="sm"
              onClick={() => handleSubmit("published")}
              disabled={upsertMutation.isPending}
              className="gap-1 font-bold"
              style={{ background: GOLD, color: NAVY }}
            >
              {upsertMutation.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
              Publicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Blog Preview ────────────────────────────────────────────────────────────
function BlogPreview({ form }: { form: PostForm }) {
  const embedUrl = form.videoUrl ? parseVideoEmbed(form.videoUrl) : null;
  return (
    <div className="p-6 overflow-auto max-h-[70vh]">
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <div className="rounded-2xl overflow-hidden mb-6">
          {form.coverImage ? (
            <img src={form.coverImage} alt={form.coverImageAlt || form.title} className="w-full h-56 object-cover" />
          ) : (
            <div className="w-full h-56 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${NAVY}, #1e4a78)` }}>
              <BookOpen className="h-16 w-16 opacity-20 text-white" />
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          {form.category && (
            <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: GOLD, color: NAVY }}>
              {categoryLabel(form.category)}
            </span>
          )}
          {form.isFeatured && (
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-amber-100 text-amber-800">⭐ Destaque</span>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2 leading-tight" style={{ color: NAVY }}>{form.title || "Título do Artigo"}</h1>
        {form.subtitle && <p className="text-base text-muted-foreground mb-4">{form.subtitle}</p>}

        {form.excerpt && (
          <div className="p-4 rounded-xl mb-6 border-l-4" style={{ background: `${GOLD}10`, borderColor: GOLD }}>
            <p className="text-sm italic">{form.excerpt}</p>
          </div>
        )}

        {form.content && (
          <div
            className="prose prose-sm max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: form.content }}
          />
        )}

        {/* Video */}
        {embedUrl && (
          <div className="aspect-video rounded-xl overflow-hidden mb-6 border" style={{ borderColor: `${GOLD}30` }}>
            <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
          </div>
        )}

        {/* CTA */}
        {form.ctaText && (
          <div className="p-5 rounded-2xl text-center mb-6" style={{ background: NAVY }}>
            <a
              href={form.ctaUrl || "#"}
              className="inline-block px-6 py-3 rounded-xl font-bold text-sm"
              style={{ background: GOLD, color: NAVY }}
            >
              {form.ctaText}
            </a>
          </div>
        )}

        {/* Tags */}
        {form.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {form.tags.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full border" style={{ borderColor: `${GOLD}40`, color: NAVY }}>
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 p-4 rounded-2xl border" style={{ borderColor: `${GOLD}30` }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: NAVY }}>
            {(form.authorName || "M").charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: NAVY }}>{form.authorName || "Autor"}</p>
            <p className="text-xs text-muted-foreground">Mauro Monção Advogados Associados</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main AdminBlog ──────────────────────────────────────────────────────────
export default function AdminBlog() {
  const { data: posts, isLoading } = trpc.blog.list.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); toast.success("Post excluído!"); },
    onError: (e) => toast.error(e.message),
  });
  const upsertMutation = trpc.blog.upsert.useMutation({
    onSuccess: () => { utils.blog.list.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editPost, setEditPost] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const list = posts as any[] ?? [];
    return list.filter((p) => {
      const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
      const postStatus = p.status ?? (p.isPublished ? "published" : "draft");
      const matchStatus = filterStatus === "all" || postStatus === filterStatus;
      const matchCat = filterCategory === "all" || p.category === filterCategory;
      return matchSearch && matchStatus && matchCat;
    });
  }, [posts, search, filterStatus, filterCategory]);

  const list = posts as any[] ?? [];
  const counts = {
    total: list.length,
    published: list.filter((p) => p.isPublished || p.status === "published").length,
    draft: list.filter((p) => !p.isPublished && (p.status === "draft" || !p.status)).length,
    scheduled: list.filter((p) => p.status === "scheduled").length,
    archived: list.filter((p) => p.status === "archived").length,
  };

  const quickPublish = (post: any) => {
    upsertMutation.mutate({
      ...post,
      status: "published",
      isPublished: true,
      publishedAt: post.publishedAt ?? new Date().toISOString(),
      category: post.category ?? "",
    } as any);
    toast.success("Post publicado!");
  };

  const quickUnpublish = (post: any) => {
    upsertMutation.mutate({
      ...post,
      status: "draft",
      isPublished: false,
      category: post.category ?? "",
    } as any);
    toast.success("Post despublicado!");
  };

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>
            Blog Jurídico
          </h1>
          <p className="text-muted-foreground mt-1">
            {counts.total} artigo{counts.total !== 1 ? "s" : ""} · {counts.published} publicado{counts.published !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          onClick={() => { setEditPost(null); setShowForm(true); }}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold gap-2 hover:brightness-110"
        >
          <PlusCircle className="h-4 w-4" />
          Novo Post
        </Button>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { key: "all",       label: "Todos",      count: counts.total },
          { key: "published", label: "Publicados", count: counts.published },
          { key: "draft",     label: "Rascunhos",  count: counts.draft },
          { key: "scheduled", label: "Agendados",  count: counts.scheduled },
          { key: "archived",  label: "Arquivados", count: counts.archived },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border"
            style={
              filterStatus === tab.key
                ? { background: NAVY, color: "white", borderColor: NAVY }
                : { background: "white", color: "#64748b", borderColor: "#e2e8f0" }
            }
          >
            {tab.label}
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
              style={filterStatus === tab.key ? { background: GOLD, color: NAVY } : { background: "#f1f5f9", color: "#64748b" }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título ou categoria..."
            className="pl-9 h-10"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48 h-10">
            <SelectValue placeholder="Todas as categorias" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {CATEGORIES.map((c) => (
              <SelectItem key={c.slug} value={c.slug}>{c.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ── Posts list ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-20 text-center">
            <BookOpen className="h-10 w-10 mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground text-sm">
              {search || filterStatus !== "all" || filterCategory !== "all"
                ? "Nenhum post encontrado com esses filtros."
                : "Nenhum post ainda. Clique em Novo Post para começar."}
            </p>
            {(search || filterStatus !== "all" || filterCategory !== "all") && (
              <Button variant="ghost" size="sm" className="mt-3"
                onClick={() => { setSearch(""); setFilterStatus("all"); setFilterCategory("all"); }}>
                Limpar filtros
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-2xl border overflow-hidden bg-white" style={{ borderColor: `${GOLD}25` }}>
          {/* Table header */}
          <div className="grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-3 border-b text-xs font-bold uppercase tracking-wider text-muted-foreground"
            style={{ background: `${NAVY}05`, borderColor: `${GOLD}20` }}>
            <span>Artigo</span>
            <span className="text-center">Categoria</span>
            <span className="text-center">Status</span>
            <span className="text-right">Ações</span>
          </div>

          {filtered.map((post, idx) => {
            const status = post.status ?? (post.isPublished ? "published" : "draft");
            const cat = post.category;
            return (
              <div
                key={post.id}
                className={`grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-4 items-center transition-colors hover:bg-slate-50 ${idx < filtered.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: `${GOLD}15` }}
              >
                {/* Title + meta */}
                <div className="min-w-0">
                  <div className="flex items-start gap-2">
                    {post.isFeatured && <Star className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-500" />}
                    <div className="min-w-0">
                      <p className="font-semibold text-sm leading-snug truncate" style={{ color: NAVY }}>
                        {post.title}
                      </p>
                      {post.subtitle && (
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{post.subtitle}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground font-mono">/blog/{post.slug}</span>
                        {post.content && (
                          <span className="text-xs text-muted-foreground">
                            {wordCount(post.content)} palavras
                          </span>
                        )}
                        {post.publishedAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="text-center">
                  {cat ? (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${GOLD}20`, color: NAVY }}>
                      {categoryLabel(cat)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </div>

                {/* Status */}
                <div className="flex justify-center">
                  <StatusBadge status={status} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1">
                  {/* Preview */}
                  {post.slug && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Ver no blog"
                    >
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </a>
                  )}
                  {/* Quick publish/unpublish */}
                  {status === "published" ? (
                    <button
                      onClick={() => quickUnpublish(post)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Despublicar"
                    >
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => quickPublish(post)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Publicar"
                    >
                      <Send className="h-4 w-4 text-green-600" />
                    </button>
                  )}
                  {/* Edit */}
                  <button
                    onClick={() => { setEditPost(post); setShowForm(true); }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    title="Editar"
                  >
                    <Edit2 className="h-4 w-4" style={{ color: NAVY }} />
                  </button>
                  {/* Delete */}
                  <button
                    onClick={() => setDeleteId(post.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Form modal ── */}
      {showForm && (
        <BlogFormModal
          open={showForm}
          onClose={() => { setShowForm(false); setEditPost(null); }}
          post={editPost}
          onSaved={() => { setShowForm(false); setEditPost(null); }}
        />
      )}

      {/* ── Delete confirmation ── */}
      <AlertDialog open={deleteId !== null} onOpenChange={(o) => { if (!o) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir post?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível. O artigo será permanentemente excluído.
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
