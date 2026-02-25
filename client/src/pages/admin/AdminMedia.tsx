import { useState, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Trash2, Loader2, Image as ImageIcon, Copy, Check, Search, X } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminMedia() {
  const { data: mediaList, isLoading } = trpc.media.list.useQuery();
  const utils = trpc.useUtils();
  const uploadMutation = trpc.media.upload.useMutation({
    onSuccess: () => { utils.media.list.invalidate(); toast.success("Imagem enviada!"); },
    onError: (e) => toast.error(e.message),
  });
  const deleteMutation = trpc.media.delete.useMutation({
    onSuccess: () => { utils.media.list.invalidate(); toast.success("Imagem removida!"); },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const processFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    if (!arr.length) return;
    const allowed = arr.filter((f) => f.type.startsWith("image/"));
    if (!allowed.length) { toast.error("Selecione apenas imagens."); return; }
    if (arr.length !== allowed.length) toast.warning("Alguns arquivos não são imagens e foram ignorados.");

    setUploading(true);
    let success = 0;
    for (const file of allowed) {
      try {
        await new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async () => {
            try {
              const base64 = (reader.result as string).split(",")[1];
              await uploadMutation.mutateAsync({
                filename: file.name,
                mimeType: file.type,
                base64Data: base64,
                alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
              });
              success++;
              resolve();
            } catch (e) { reject(e); }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } catch {
        toast.error(`Erro ao enviar ${file.name}`);
      }
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (success > 0) toast.success(`${success} imagem${success > 1 ? "ns" : ""} enviada${success > 1 ? "s" : ""}!`);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const copyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      toast.success("URL copiada!");
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filtered = (mediaList || []).filter((m: any) =>
    !search || m.filename?.toLowerCase().includes(search.toLowerCase()) || m.altText?.toLowerCase().includes(search.toLowerCase())
  );

  const totalSize = (mediaList || []).length;

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Mídia</h1>
          <p className="text-muted-foreground mt-1">
            {totalSize} imagem{totalSize !== 1 ? "ns" : ""} · Formatos aceitos: JPG, PNG, WebP, GIF, SVG
          </p>
        </div>
        <div className="flex gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileInput} />
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ background: GOLD, color: NAVY }}
            className="font-bold hover:brightness-110 gap-2"
          >
            {uploading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Upload className="h-4 w-4" />}
            Upload
          </Button>
        </div>
      </div>

      {/* ── Drop zone ── */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
        style={{
          borderColor: isDragging ? GOLD : `${GOLD}40`,
          background: isDragging ? `${GOLD}10` : `${GOLD}04`,
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: isDragging ? GOLD : `${GOLD}20` }}
          >
            <Upload className="h-5 w-5" style={{ color: isDragging ? NAVY : GOLD }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: NAVY }}>
              {isDragging ? "Solte para enviar!" : "Arraste imagens aqui"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              ou <span style={{ color: GOLD }} className="font-semibold">clique para selecionar</span> — múltiplos arquivos aceitos
            </p>
          </div>
        </div>
      </div>

      {/* ── Busca ── */}
      {totalSize > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome do arquivo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
      )}

      {/* ── Grid de imagens ── */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} />
        </div>
      ) : (
        <>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((media: any) => (
                <Card
                  key={media.id}
                  className="border shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
                  style={{ borderColor: `${GOLD}20` }}
                >
                  {/* Image */}
                  <div
                    className="aspect-square bg-muted relative"
                    onClick={() => setSelectedImage(media)}
                  >
                    <img
                      src={media.url}
                      alt={media.altText || media.filename}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3C/svg%3E";
                      }}
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={(e) => { e.stopPropagation(); copyUrl(media.url, media.id); }}
                        title="Copiar URL"
                      >
                        {copiedId === media.id ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Remover esta imagem permanentemente?")) deleteMutation.mutate({ id: media.id });
                        }}
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Info */}
                  <CardContent className="p-2">
                    <p className="text-xs font-medium truncate" title={media.filename}>{media.filename}</p>
                    <button
                      className="text-[10px] truncate w-full text-left mt-0.5 hover:underline"
                      style={{ color: GOLD }}
                      onClick={() => copyUrl(media.url, media.id)}
                      title="Copiar URL"
                    >
                      {copiedId === media.id ? "✅ URL copiada!" : "Copiar URL"}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-14 text-center text-muted-foreground">
                {search
                  ? `Nenhuma imagem encontrada para "${search}".`
                  : "Nenhuma imagem enviada. Arraste arquivos ou clique em Upload."}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* ── Modal preview ── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.altText || selectedImage.filename}
              className="w-full max-h-[60vh] object-contain bg-muted"
            />
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: NAVY }}>{selectedImage.filename}</p>
                <p className="text-xs text-muted-foreground truncate">{selectedImage.url}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={() => copyUrl(selectedImage.url, selectedImage.id)}
                >
                  {copiedId === selectedImage.id ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedId === selectedImage.id ? "Copiado!" : "Copiar URL"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedImage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
