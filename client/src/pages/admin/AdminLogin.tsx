import { useState, useEffect, useRef } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

// Google Client ID — definido via variável de ambiente VITE_GOOGLE_CLIENT_ID
// Se não estiver definida, o botão Google não aparece (degradação graciosa)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function AdminLogin() {
  const { login, loginWithGoogle } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);

  // Carrega o script do Google Identity Services e renderiza o botão
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !googleBtnRef.current) return;

    const scriptId = "google-gsi-script";
    if (document.getElementById(scriptId)) {
      initGoogle();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.head.appendChild(script);

    function initGoogle() {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        ux_mode: "popup",
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "filled_black",
        size: "large",
        shape: "pill",
        text: "signin_with",
        locale: "pt-BR",
        width: "100%",
      });
    }
  }, []);

  async function handleGoogleCallback(response: { credential: string }) {
    setGoogleLoading(true);
    try {
      await loginWithGoogle(response.credential);
      toast.success("Login com Google realizado!");
    } catch (err: any) {
      toast.error(err?.message || "Conta Google não autorizada para este painel.");
    } finally {
      setGoogleLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Login realizado com sucesso!");
    } catch (err: any) {
      toast.error(err?.message || "E-mail ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: `linear-gradient(135deg, #0b1e35 0%, ${NAVY} 60%, #1e4a7a 100%)` }}
    >
      {/* Padrão de fundo sutil */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-sm">

        {/* ── Logo / Marca ── */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mx-auto mb-5">
            <img
              src="/logo-brand-gold.png"
              alt="Mauro Monção Advogados Associados"
              className="h-24 w-auto object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 4px 24px rgba(232,184,75,0.25))" }}
            />
          </div>
          <h1
            className="font-serif text-2xl font-bold tracking-tight"
            style={{ color: GOLD }}
          >
            Painel Admin
          </h1>
          <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>
            Área restrita
          </p>
        </div>

        {/* ── Card de login ── */}
        <div
          className="rounded-2xl shadow-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.04)", border: `1.5px solid rgba(232,184,75,0.2)` }}
        >
          <div
            className="px-6 py-4 border-b flex items-center gap-2"
            style={{ borderColor: "rgba(232,184,75,0.15)", background: "rgba(232,184,75,0.06)" }}
          >
            <Lock className="h-4 w-4" style={{ color: GOLD }} />
            <span className="text-sm font-semibold" style={{ color: GOLD }}>
              Acesso Restrito
            </span>
          </div>

          <div className="p-6 space-y-5">

            {/* ── Botão Google (se VITE_GOOGLE_CLIENT_ID estiver configurado) ── */}
            {GOOGLE_CLIENT_ID && (
              <>
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-center" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Login rápido
                  </p>
                  {googleLoading ? (
                    <div className="flex items-center justify-center h-10">
                      <Loader2 className="h-5 w-5 animate-spin" style={{ color: GOLD }} />
                    </div>
                  ) : (
                    <div ref={googleBtnRef} className="flex justify-center" />
                  )}
                </div>

                {/* Divisor */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>ou entre com e-mail</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
                </div>
              </>
            )}

            {/* ── Formulário e-mail + senha ── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* E-mail */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus={!GOOGLE_CLIENT_ID}
                  className="h-11 text-white placeholder:text-white/30 border-0 focus-visible:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderBottom: `1.5px solid rgba(232,184,75,0.25)`,
                    "--tw-ring-color": GOLD,
                  } as any}
                />
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 text-white placeholder:text-white/30 border-0 focus-visible:ring-1"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    borderBottom: `1.5px solid rgba(232,184,75,0.25)`,
                    "--tw-ring-color": GOLD,
                  } as any}
                />
              </div>

              {/* Botão entrar */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl font-bold text-base tracking-wide transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
                style={{ background: GOLD, color: NAVY }}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                {loading ? "Entrando..." : "Entrar no Painel"}
              </button>
            </form>
          </div>
        </div>

        {/* Rodapé */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Acesso restrito a administradores autorizados.
        </p>
      </div>
    </div>
  );
}
