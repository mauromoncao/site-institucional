import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save, Phone, Globe, MapPin, BarChart2, Bot, Scale } from "lucide-react";

const GOLD = "#E8B84B";
const NAVY = "#19385C";

export default function AdminSettings() {
  const { data: settings, isLoading } = trpc.settings.getAll.useQuery();
  const utils = trpc.useUtils();
  const updateMutation = trpc.settings.set.useMutation({
    onSuccess: () => { utils.settings.getAll.invalidate(); toast.success("Configurações salvas!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) setForm(settings as Record<string, string>);
  }, [settings]);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const handleSave = () => updateMutation.mutate({ settings: form });

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" style={{ color: GOLD }} /></div>;
  }

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>Configurações</h1>
          <p className="text-muted-foreground mt-1">Contato, redes sociais, rastreamento e integrações.</p>
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
          Salvar Tudo
        </Button>
      </div>

      <Tabs defaultValue="contact" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="contact"><Phone className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />Contato</TabsTrigger>
          <TabsTrigger value="social"><Globe className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />Social</TabsTrigger>
          <TabsTrigger value="address"><MapPin className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />Endereço</TabsTrigger>
          <TabsTrigger value="tracking"><BarChart2 className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />Tracking</TabsTrigger>
          <TabsTrigger value="advanced"><Bot className="h-3.5 w-3.5 mr-1.5 hidden sm:inline" />Avançado</TabsTrigger>
        </TabsList>

        {/* ── CONTATO ── */}
        <TabsContent value="contact" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4" style={{ color: GOLD }} />Informações de Contato
              </CardTitle>
              <CardDescription>Telefones e WhatsApp exibidos no site e nos CTAs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>E-mail de Contato</Label>
                <Input value={form.contact_email || ""} onChange={(e) => update("contact_email", e.target.value)} placeholder="contato@mauromoncao.adv.br" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone Pessoal</Label>
                  <Input value={form.phone_personal || ""} onChange={(e) => update("phone_personal", e.target.value)} placeholder="(86) 99948-4761" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone do Escritório</Label>
                  <Input value={form.phone_office || ""} onChange={(e) => update("phone_office", e.target.value)} placeholder="(86) 99519-8919" />
                </div>
              </div>

              <div className="p-4 rounded-xl border space-y-3" style={{ borderColor: `${GOLD}40`, background: `${GOLD}08` }}>
                <Label className="font-semibold" style={{ color: NAVY }}>
                  📲 WhatsApp Central de Atendimento
                </Label>
                <Input
                  value={form.phone_whatsapp || ""}
                  onChange={(e) => update("phone_whatsapp", e.target.value)}
                  placeholder="5586994820054"
                />
                <p className="text-xs text-muted-foreground">
                  Formato internacional sem espaços: <code>55 + DDD + número</code>.
                  Este número é usado em todos os botões "Fale Conosco" e CTAs do site.
                </p>
                <div className="space-y-2">
                  <Label>Mensagem padrão do WhatsApp</Label>
                  <Textarea
                    value={form.whatsapp_message || ""}
                    onChange={(e) => update("whatsapp_message", e.target.value)}
                    rows={2}
                    placeholder="Olá! Gostaria de mais informações..."
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl border space-y-3" style={{ borderColor: "rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.05)" }}>
                <Label className="font-semibold flex items-center gap-2">
                  <Bot className="h-4 w-4 text-green-600" />
                  WhatsApp do Dr. Ben (Assistente IA)
                </Label>
                <Input
                  value={form.drben_whatsapp || ""}
                  onChange={(e) => update("drben_whatsapp", e.target.value)}
                  placeholder="5586994820054"
                />
                <p className="text-xs text-muted-foreground">
                  Número específico para o atendimento pelo Dr. Ben. Se vazio, usa o WhatsApp central.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── REDES SOCIAIS ── */}
        <TabsContent value="social" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: GOLD }} />Redes Sociais
              </CardTitle>
              <CardDescription>Links exibidos no header e footer do site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/mauromoncao.adv" },
                { key: "facebook",  label: "Facebook",  placeholder: "https://facebook.com/mauromoncao" },
                { key: "linkedin",  label: "LinkedIn",  placeholder: "https://linkedin.com/in/mauromoncao" },
                { key: "youtube",   label: "YouTube",   placeholder: "https://youtube.com/@mauromoncao" },
                { key: "tiktok",    label: "TikTok",    placeholder: "https://tiktok.com/@mauromoncao.adv" },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input value={form[key] || ""} onChange={(e) => update(key, e.target.value)} placeholder={placeholder} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── ENDEREÇO ── */}
        <TabsContent value="address" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" style={{ color: GOLD }} />Endereços do Escritório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Endereço Principal</Label>
                <Textarea value={form.address_main || ""} onChange={(e) => update("address_main", e.target.value)} rows={3} placeholder="Rua, número, bairro, cidade — PI" />
              </div>
              <div className="space-y-2">
                <Label>Endereço Secundário (opcional)</Label>
                <Textarea value={form.address_secondary || ""} onChange={(e) => update("address_secondary", e.target.value)} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Google Maps Embed URL</Label>
                <Input value={form.maps_url || ""} onChange={(e) => update("maps_url", e.target.value)} placeholder="https://maps.google.com/maps?..." />
                <p className="text-xs text-muted-foreground">
                  No Google Maps, clique em "Compartilhar → Incorporar mapa" e cole o link src do iframe.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TRACKING ── */}
        <TabsContent value="tracking" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart2 className="h-4 w-4" style={{ color: GOLD }} />Google Analytics & Tag Manager
              </CardTitle>
              <CardDescription>Configure o rastreamento de visitas e conversões.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Tag Manager ID</Label>
                <Input
                  value={form.gtm_id || ""}
                  onChange={(e) => update("gtm_id", e.target.value)}
                  placeholder="GTM-XXXXXXX"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Encontre em: <strong>tagmanager.google.com</strong> → sua conta → ID do contêiner (GTM-XXXXXXX)
                </p>
              </div>
              <div className="space-y-2">
                <Label>Google Analytics 4 (Measurement ID)</Label>
                <Input
                  value={form.ga_id || ""}
                  onChange={(e) => update("ga_id", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Encontre em: <strong>analytics.google.com</strong> → Admin → Fluxos de dados → ID de medição
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Meta Pixel (Facebook / Instagram Ads)</CardTitle>
              <CardDescription>Rastreamento de conversões para campanhas pagas no Meta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Pixel ID</Label>
                <Input
                  value={form.meta_pixel_id || ""}
                  onChange={(e) => update("meta_pixel_id", e.target.value)}
                  placeholder="1234567890123456"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Encontre em: <strong>business.facebook.com</strong> → Events Manager → Pixel → ID do Pixel
                </p>
              </div>
              <div className="space-y-2">
                <Label>Meta Access Token (Conversions API — opcional)</Label>
                <Input
                  value={form.meta_access_token || ""}
                  onChange={(e) => update("meta_access_token", e.target.value)}
                  placeholder="EAAxxxxxxxx..."
                  type="password"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  Para envio server-side de eventos (maior precisão). Opcional.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── AVANÇADO ── */}
        <TabsContent value="advanced" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Scale className="h-4 w-4" style={{ color: GOLD }} />Identidade do Escritório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Escritório</Label>
                <Input value={form.site_name || ""} onChange={(e) => update("site_name", e.target.value)} placeholder="Mauro Monção Advogados Associados" />
              </div>
              <div className="space-y-2">
                <Label>Registro OAB</Label>
                <Input value={form.oab_number || ""} onChange={(e) => update("oab_number", e.target.value)} placeholder="OAB/PI 0000 · OAB/CE 0000 · OAB/MA 0000" />
                <p className="text-xs text-muted-foreground">Aparece no rodapé de todas as landing pages.</p>
              </div>
              <div className="space-y-2">
                <Label>Slogan / Tagline</Label>
                <Input value={form.tagline || ""} onChange={(e) => update("tagline", e.target.value)} placeholder="Advocacia Estratégica · Resultados Reais" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Logotipo & Favicon</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL do Logo</Label>
                <Input value={form.logo_url || ""} onChange={(e) => update("logo_url", e.target.value)} placeholder="/logo-mm-crop.png" />
                {form.logo_url && (
                  <img src={form.logo_url} alt="Logo preview" className="h-10 object-contain mt-1" />
                )}
              </div>
              <div className="space-y-2">
                <Label>URL do Favicon</Label>
                <Input value={form.favicon_url || ""} onChange={(e) => update("favicon_url", e.target.value)} placeholder="/favicon.ico" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-4 w-4" style={{ color: GOLD }} />Dr. Ben — Configurações do Agente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>URL do Embed do Agente (quando disponível)</Label>
                <Input
                  value={form.drben_embed_url || ""}
                  onChange={(e) => update("drben_embed_url", e.target.value)}
                  placeholder="https://typebot.io/drben ou https://drben.mauromoncao.adv.br"
                />
                <p className="text-xs text-muted-foreground">
                  Quando o agente Dr. Ben estiver configurado, cole o URL do embed aqui.
                  Ele será exibido automaticamente na página /assistente-juridico.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Embed</Label>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm"
                  value={form.drben_embed_type || "whatsapp"}
                  onChange={(e) => update("drben_embed_type", e.target.value)}
                >
                  <option value="whatsapp">WhatsApp (atual — link direto)</option>
                  <option value="iframe">iFrame (incorporado na página)</option>
                  <option value="widget">Widget flutuante (pop-up)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ── Botão salvar bottom ── */}
      <div className="flex justify-end pt-2">
        <Button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          style={{ background: GOLD, color: NAVY }}
          className="font-bold hover:brightness-110"
        >
          {updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
}
