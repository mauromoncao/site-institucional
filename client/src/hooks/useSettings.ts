import { trpc } from "@/lib/trpc";
import { useMemo } from "react";

export function useSettings() {
  const { data: settingsArray, isLoading } = trpc.settings.getAllPublic.useQuery();

  const settings = useMemo(() => {
    if (!settingsArray) return {} as Record<string, string>;
    if (Array.isArray(settingsArray)) {
      const map: Record<string, string> = {};
      for (const s of settingsArray) {
        map[(s as any).settingKey] = (s as any).settingValue;
      }
      return map;
    }
    return settingsArray as Record<string, string>;
  }, [settingsArray]);

  return { settings, isLoading };
}
