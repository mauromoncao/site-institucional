import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save, Video, Play, ExternalLink, CheckCircle, X, Info } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

/** Landing pages com seção de vídeo */
const LP_VIDEOS = [
  {
    key: "video_irpf_autismo",
    label: "IRPF · Educação Autismo (TEA)",
    slug: "/irpf-educacao-autismo",
    description: "Explique a tese de dedução de despesas com autismo no IRPF.",
  },
  {
    key: "video_direito_bancario",
    label: "Direito Bancário",
    slug: "/direito-bancario",
    description: "Apresente as principais teses de defesa do consumidor bancário.",
  },
  {
    key: "video_previdenciario",
    label: "Direito Previdenciário",
    slug: "/direito-previdenciario",
    description: "Explique como funciona a análise de benefícios previdenciários.",
  },
  {
    key: "video_recuperacao_previdenciaria",
    label: "Recuperação Previdenciária",
    slug: "/recuperacao-previdenciaria",
    description: "Mostre como múltiplos vínculos geram restituição ao segurado.",
  },
  {
    key: "video_transacao_tributaria",
    label: "Transação Tributária",
    slug: "/transacao-tributaria",
    description: "Explique como funciona a negociação e regularização de dívidas fiscais.",
  },
  {
    key: "video_recuperacao_tributaria",
    label: "Recuperação Tributária",
    slug: "/recuperacao-tributaria",
    description: "Apresente o processo de identificação e recuperação de créditos tributários.",
  },
  {
    key: "video_planejamento_tributario",
    label: "Planejamento Tributário",
    slug: "/planejamento-tributario",
    description: "Explique como a reestruturação societária reduz a carga tributária.",
  },
  {
    key: "video_clinicas",
    label: "Tese para Clínicas (Lucro Presumido)",
    slug: "/clinicas-lucro-presumido",
    description: "Apresente a tese tributária específica para clínicas médicas.",
  },
  {
    key: "video_defesa_fiscal",
    label: "Defesa Fiscal",
    slug: "/defesa-fiscal",
    description: "Explique como é feita a defesa em processos de autuação fiscal.",
  },
  {
    key: "video_institucional",
    label: "Institucional (Sobre o escritório)",
    slug: "/institucional",
    description: "Vídeo de apresentação do escritório Mauro Monção Advogados.",
  },
  {
    key: "video_dr_ben",
    label: "Dr. Ben — Assistente Jurídico IA",
    slug: "/assistente-juridico",
    description: "Vídeo de apresentação e demonstração do Dr. Ben.",
  },
];

/**
 * Extrai embed URL de qualquer link YouTube/Vimeo.
 * Formatos Vimeo suportados:
 *   https://vimeo.com/123456789
 *   https://vimeo.com/video/123456789
 *   https://vimeo.com/123456789/abcdef1234   ← vídeo privado com hash
 *   https://player.vimeo.com/video/123456789 ← embed direto
 */
function parseVideo(url: string): { embedUrl: string; watchUrl: string } | null {
  if (!url?.trim()) return null;
  const u = url.trim();

  // ── YouTube ──
  const yt = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (yt) return {
    embedUrl: `https://www.youtube.com/embed/${yt[1]}?rel=0`,
    watchUrl: `https://www.youtube.com/watch?v=${yt[1]}`,
  };

  // ── Vimeo player.vimeo.com já pronto ──
  if (u.includes("player.vimeo.com/video/")) return { embedUrl: u, watchUrl: u };

  // ── Vimeo privado: vimeo.com/ID/HASH ──
  const vmPrivate = u.match(/vimeo\.com\/(\d+)\/([a-f0-9]+)/i);
  if (vmPrivate) return {
    embedUrl: `https://player.vimeo.com/video/${vmPrivate[1]}?h=${vmPrivate[2]}&badge=0&autopause=0`,
    watchUrl: `https://vimeo.com/${vmPrivate[1]}`,
  };

  // ── Vimeo público: vimeo.com/ID ou vimeo.com/video/ID ──
  const vmPublic = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vmPublic) return {
    embedUrl: `https://player.vimeo.com/video/${vmPublic[1]}?badge=0&autopause=0`,
    watchUrl: `https://vimeo.com/${vmPublic[1]}`,
  };

  return null;
}

export default function AdminVideos() {
  const { data: settings, isLoading } = trpc.settings.getAll.useQuery();
  const utils = trpc.useUtils();
  const updateMutation = trpc.settings.set.useMutation({
    onSuccess: () => { utils.settings.getAll.invalidate(); toast.success("Vídeos salvos!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const [form, setForm] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      const s = settings as Record<string, string>;
      const initial: Record<string, string> = {};
      LP_VIDEOS.forEach(({ key }) => { initial[key] = s[key] || ""; });
      setForm(initial);
    }
  }, [settings]);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const handleSave = () => updateMutation.mutate({ settings: form });

  const filled = LP_VIDEOS.filter(({ key }) => !!form[key]).length;
  const empty = LP_VIDEOS.length - filled;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Vídeos das Landing Pages</h1>
          <p className="text-muted-foreground mt-1">
            {filled} vídeos configurados · {empty} aguardando vídeo
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {updateMutation.isPending
            ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
            : <Save className="h-4 w-4 mr-2" />}
          Salvar Vídeos
        </Button>
      </div>

      {/* ── Info ── */}
      <div
        className="flex gap-3 p-4 rounded-xl border"
        style={{ borderColor: `${GOLD}40`, background: `${GOLD}08` }}
      >
        <Info className="h-5 w-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
        <div className="text-sm space-y-2">
          <p className="font-semibold" style={{ color: NAVY }}>Como usar — Vimeo ou YouTube:</p>
          <div className="space-y-1 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Vimeo público:</span>{" "}
              <code className="bg-muted px-1 rounded">https://vimeo.com/123456789</code>
            </p>
            <p>
              <span className="font-medium text-foreground">Vimeo privado (com senha/hash):</span>{" "}
              <code className="bg-muted px-1 rounded">https://vimeo.com/123456789/abc123def</code>
            </p>
            <p>
              <span className="font-medium text-foreground">YouTube:</span>{" "}
              <code className="bg-muted px-1 rounded">https://youtu.be/ABC123</code>{" "}
              ou{" "}
              <code className="bg-muted px-1 rounded">https://www.youtube.com/watch?v=ABC123</code>
            </p>
          </div>
          <p className="text-muted-foreground pt-1 border-t" style={{ borderColor: `${GOLD}30` }}>
            Cole qualquer um dos formatos acima — o sistema converte automaticamente para embed.
            O vídeo deve ter entre 60 e 90 segundos, formato horizontal (16:9).
          </p>
        </div>
      </div>

      {/* ── Cards por LP ── */}
      <div className="space-y-4">
        {LP_VIDEOS.map(({ key, label, slug, description }) => {
          const videoUrl = form[key] || "";
          const parsed = parseVideo(videoUrl);
          const hasVideo = !!parsed;

          return (
            <Card
              key={key}
              className="border shadow-sm"
              style={{ borderColor: hasVideo ? `${GOLD}40` : "rgba(0,0,0,0.08)" }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: hasVideo ? GOLD : `${NAVY}10` }}
                    >
                      {hasVideo
                        ? <CheckCircle className="h-5 w-5" style={{ color: NAVY }} />
                        : <Video className="h-5 w-5" style={{ color: `${NAVY}60` }} />
                      }
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold" style={{ color: NAVY }}>{label}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">{description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {hasVideo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-xs h-8"
                        onClick={() => setPreview(preview === key ? null : key)}
                      >
                        <Play className="h-3.5 w-3.5" />
                        {preview === key ? "Fechar" : "Preview"}
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5 text-xs h-8 text-muted-foreground"
                      onClick={() => window.open(slug, "_blank")}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ver página
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <Label className="text-xs">URL do Vídeo (YouTube ou Vimeo)</Label>
                    <div className="flex gap-2">
                      <Input
                        value={videoUrl}
                        onChange={(e) => update(key, e.target.value)}
                        placeholder="https://vimeo.com/123456789  ou  https://youtu.be/ABC123"
                        className="text-sm"
                      />
                      {videoUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 h-10 w-10"
                          onClick={() => update(key, "")}
                          title="Remover vídeo"
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      )}
                    </div>
                    {videoUrl && !hasVideo && (
                      <p className="text-xs text-red-500">
                        ⚠️ URL não reconhecida. Use um link do YouTube ou Vimeo.
                      </p>
                    )}
                    {hasVideo && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Vídeo identificado — será exibido na landing page
                      </p>
                    )}
                  </div>
                </div>

                {/* Preview */}
                {preview === key && parsed && (
                  <div className="rounded-xl overflow-hidden border bg-black max-w-lg">
                    <div className="relative" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        src={parsed.embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Preview - ${label}`}
                      />
                    </div>
                    <p className="text-xs text-center text-muted-foreground py-2 bg-muted/30">
                      Preview — aparecerá assim na landing page
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Botão salvar bottom */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {updateMutation.isPending
            ? <Loader2 className="h-4 w-4 animate-spin mr-2" />
            : <Save className="h-4 w-4 mr-2" />}
          Salvar Todos os Vídeos
        </Button>
      </div>
    </div>
  );
}
