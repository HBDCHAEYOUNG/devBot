import type { TemplateType, Difficulty, Length } from "@/types/document.types";

export interface GeneratorDefaultSettings {
  templateType?: TemplateType;
  difficulty?: Difficulty;
  length?: Length;
}

const STORAGE_KEY = "devbot-generator-defaults";

export const SETTINGS_SAVED_EVENT = "devbot-settings-saved";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export const settingsStorage = {
  get(): GeneratorDefaultSettings {
    const storage = getStorage();
    if (!storage) return {};
    const data = storage.getItem(STORAGE_KEY);
    if (!data) return {};
    try {
      return JSON.parse(data) as GeneratorDefaultSettings;
    } catch {
      return {};
    }
  },

  set(settings: GeneratorDefaultSettings): void {
    getStorage()?.setItem(STORAGE_KEY, JSON.stringify(settings));
  },

  clear(): void {
    getStorage()?.removeItem(STORAGE_KEY);
  },
};
