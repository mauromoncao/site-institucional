/**
 * VideoEmbed — componente reutilizável para as landing pages.
 * Suporta: YouTube, youtu.be, YouTube Shorts, Vimeo (público, privado, com hash),
 * URLs de embed direto, e qualquer link player.vimeo.com.
 */
import { Play } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

interface VideoEmbedProps {
  /** URL do YouTube/Vimeo ou já em formato embed */
  videoUrl?: string | null;
  /** Legenda exibida abaixo do player */
  caption?: string;
  /** Título do vídeo (acessibilidade / SEO) */
  title?: string;
}

/**
 * Converte qualquer URL Vimeo/YouTube em URL de embed.
 * Formatos Vimeo suportados:
 *   https://vimeo.com/123456789
 *   https://vimeo.com/video/123456789
 *   https://vimeo.com/123456789/abcdef1234          ← vídeo privado com hash
 *   https://player.vimeo.com/video/123456789        ← já é embed
 *   https://player.vimeo.com/video/123456789?h=xxx  ← embed privado
 */
function parseEmbed(url: string): string | null {
  if (!url?.trim()) return null;
  const u = url.trim();

  // ── YouTube ──
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;

  // ── Vimeo — player.vimeo.com já pronto ──
  if (u.includes("player.vimeo.com/video/")) return u;

  // ── Vimeo — privado com hash: vimeo.com/ID/HASH ──
  const vmPrivate = u.match(/vimeo\.com\/(\d+)\/([a-f0-9]+)/i);
  if (vmPrivate) {
    return `https://player.vimeo.com/video/${vmPrivate[1]}?h=${vmPrivate[2]}&badge=0&autopause=0`;
  }

  // ── Vimeo — público: vimeo.com/ID ou vimeo.com/video/ID ──
  const vmPublic = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vmPublic) {
    return `https://player.vimeo.com/video/${vmPublic[1]}?badge=0&autopause=0`;
  }

  return null;
}

export function VideoEmbed({
  videoUrl,
  caption,
  title = "Vídeo institucional",
}: VideoEmbedProps) {
  const embedUrl = videoUrl ? parseEmbed(videoUrl) : null;

  return (
    <div className="w-full">
      {/* Wrapper responsivo 16:9 */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{
          paddingBottom: "56.25%",
          background: `linear-gradient(135deg, #0f2340, ${NAVY})`,
          border: `2px solid ${GOLD}30`,
        }}
      >
        {embedUrl ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            allowFullScreen
          />
        ) : (
          /* Placeholder elegante enquanto o vídeo não está configurado */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
              style={{ background: GOLD }}
            >
              <Play className="w-8 h-8 ml-1" style={{ color: NAVY }} />
            </div>
            <p className="text-white/80 text-sm font-medium">
              Vídeo institucional · 60–90 segundos
            </p>
            <p className="text-white/40 text-xs">Vimeo · YouTube</p>
          </div>
        )}
      </div>

      {caption && (
        <p className="text-center text-gray-500 text-sm mt-4">{caption}</p>
      )}
    </div>
  );
}
