import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

// Default settings for immediate render (no flash/spinner while loading)
const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: "Mauro Monção Advogados Associados",
  contact_email: "contato@mauromoncao.adv.br",
  phone_personal: "(86) 99948-4761",
  phone_office: "(86) 99519-8919",
  phone_whatsapp: "5586994820054",
  whatsapp_cta: "5586994820054",
  whatsapp_message: "Olá! Gostaria de mais informações sobre os serviços jurídicos.",
  instagram: "https://www.instagram.com/mauromoncao.adv/",
  address: "Parnaíba - PI",
  gtm_id: "GTM-MMKSHTQV",
};

export function useSettings() {
  const { data: settingsArray, isLoading } = trpc.settings.getAllPublic.useQuery(undefined, {
    staleTime: 5 * 60 * 1000, // 5 minutes — settings rarely change
    gcTime: 10 * 60 * 1000,   // keep in cache 10 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const settings = useMemo(() => {
    if (!settingsArray) return DEFAULT_SETTINGS;
    if (Array.isArray(settingsArray)) {
      const map: Record<string, string> = { ...DEFAULT_SETTINGS };
      for (const s of settingsArray) {
        if ((s as any).settingKey) {
          map[(s as any).settingKey] = (s as any).settingValue;
        }
      }
      return map;
    }
    if (typeof settingsArray === "object") {
      return { ...DEFAULT_SETTINGS, ...(settingsArray as Record<string, string>) };
    }
    return DEFAULT_SETTINGS;
  }, [settingsArray]);

  return { settings, isLoading };
}
