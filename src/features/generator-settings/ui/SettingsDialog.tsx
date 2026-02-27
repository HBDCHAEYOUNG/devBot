"use client";

import { useState, useEffect } from "react";
import type { TemplateType, Difficulty, Length } from "@/types/document.types";
import {
  TEMPLATE_LABELS,
  TEMPLATE_DESCRIPTIONS,
  DIFFICULTY_LABELS,
  LENGTH_LABELS,
} from "@/config/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Button,
} from "@/ui/index";
import { cn } from "@/lib/utils";
import SettingsIcon from "@/icons/setting.svg";
import {
  settingsStorage,
  SETTINGS_SAVED_EVENT,
} from "../model/settingsStorage";

const DEFAULT_TEMPLATE = "til";
const DEFAULT_DIFFICULTY = "beginner";
const DEFAULT_LENGTH = "medium";

type SettingsState = {
  templateType: string;
  difficulty: string;
  length: string;
};

const INITIAL_SETTINGS: SettingsState = {
  templateType: DEFAULT_TEMPLATE,
  difficulty: DEFAULT_DIFFICULTY,
  length: DEFAULT_LENGTH,
};

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(INITIAL_SETTINGS);

  useEffect(() => {
    if (!open) return;
    const saved = settingsStorage.get();
    const id = setTimeout(() => {
      setSettings({
        templateType: saved.templateType ?? DEFAULT_TEMPLATE,
        difficulty: saved.difficulty ?? DEFAULT_DIFFICULTY,
        length: saved.length ?? DEFAULT_LENGTH,
      });
    }, 0);
    return () => clearTimeout(id);
  }, [open]);

  const handleSave = () => {
    const { templateType, difficulty, length } = settings;
    settingsStorage.set({
      templateType: templateType as TemplateType,
      difficulty: difficulty as Difficulty,
      length: length as Length,
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(SETTINGS_SAVED_EVENT));
    }
    setOpen(false);
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
  };

  const updateSetting = (id: keyof SettingsState, value: string) => {
    setSettings((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm">
          <SettingsIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>기본 설정</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 py-6">
          {/* 템플릿 유형: 카드 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium">템플릿 유형</label>
            <div className="flex flex-col md:flex-row gap-3">
              {(
                Object.entries(TEMPLATE_LABELS) as [
                  keyof typeof TEMPLATE_LABELS,
                  string
                ][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSetting("templateType", value)}
                  className={cn(
                    "flex-1 min-w-0 flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-colors",
                    settings.templateType === value
                      ? "border-gradient-primary bg-primary/5"
                      : "border-input bg-muted/30 hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "font-medium text-center",
                      settings.templateType === value && "text-primary"
                    )}
                  >
                    {label}
                  </span>
                  <span className="text-xs text-muted-foreground break-keep">
                    {TEMPLATE_DESCRIPTIONS[value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 난이도: 카드 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium">난이도</label>
            <div className="flex flex-row gap-3">
              {(
                Object.entries(DIFFICULTY_LABELS) as [
                  keyof typeof DIFFICULTY_LABELS,
                  string
                ][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSetting("difficulty", value)}
                  className={cn(
                    "flex-1 min-w-0 flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-colors",
                    settings.difficulty === value
                      ? "border-gradient-primary bg-primary/5"
                      : "border-input bg-muted/30 hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "font-medium text-center",
                      settings.difficulty === value && "text-primary"
                    )}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 분량: 카드 */}
          <div className="flex flex-col gap-3">
            <label className="font-medium">분량</label>
            <div className="flex flex-row gap-3">
              {(
                Object.entries(LENGTH_LABELS) as [
                  keyof typeof LENGTH_LABELS,
                  string
                ][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSetting("length", value)}
                  className={cn(
                    "flex-1 min-w-0 flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-colors",
                    settings.length === value
                      ? "border-gradient-primary bg-primary/5"
                      : "border-input bg-muted/30 hover:border-muted-foreground/30 hover:bg-muted/50"
                  )}
                >
                  <span
                    className={cn(
                      "font-medium text-center",
                      settings.length === value && "text-primary"
                    )}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between gap-2 flex-row h-12">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1 h-full"
          >
            초기화
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="flex-1 h-full bg-gradient-primary text-white border-0 shadow--neon-glow hover:opacity-90"
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
