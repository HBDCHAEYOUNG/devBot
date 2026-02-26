"use client";

import { useState, useEffect } from "react";
import type { TemplateType, Difficulty, Length } from "@/types/document.types";
import {
  TEMPLATE_LABELS,
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "@/ui/index";
import SettingsIcon from "@/icons/setting.svg";
import {
  settingsStorage,
  SETTINGS_SAVED_EVENT,
} from "../model/settingsStorage";

const NONE = "__none__";

const SETTINGS_FIELDS = [
  {
    id: "templateType" as const,
    label: "템플릿 유형",
    labels: TEMPLATE_LABELS,
  },
  {
    id: "difficulty" as const,
    label: "난이도",
    labels: DIFFICULTY_LABELS,
  },
  {
    id: "length" as const,
    label: "분량",
    labels: LENGTH_LABELS,
  },
] as const;

type SettingsState = {
  templateType: string;
  difficulty: string;
  length: string;
};

const INITIAL_SETTINGS: SettingsState = {
  templateType: NONE,
  difficulty: NONE,
  length: NONE,
};

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(INITIAL_SETTINGS);

  useEffect(() => {
    if (!open) return;
    const saved = settingsStorage.get();
    const id = setTimeout(() => {
      setSettings({
        templateType: saved.templateType ?? NONE,
        difficulty: saved.difficulty ?? NONE,
        length: saved.length ?? NONE,
      });
    }, 0);
    return () => clearTimeout(id);
  }, [open]);

  const handleSave = () => {
    const { templateType, difficulty, length } = settings;
    settingsStorage.set({
      ...(templateType !== NONE && {
        templateType: templateType as TemplateType,
      }),
      ...(difficulty !== NONE && { difficulty: difficulty as Difficulty }),
      ...(length !== NONE && { length: length as Length }),
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
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>기본 설정</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-2 items-center justify-center py-10">
          {SETTINGS_FIELDS.map((field) => (
            <div
              key={field.id}
              className="flex md:flex-col gap-20 md:gap-2 justify-between items-center md:justify-center w-full"
            >
              <label className="font-medium whitespace-nowrap">
                {field.label}
              </label>
              <Select
                value={settings[field.id]}
                onValueChange={(value) => updateSetting(field.id, value)}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="선택 안 함" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={NONE}>선택 안 함</SelectItem>
                    {Object.entries(field.labels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-between gap-2 flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            초기화
          </Button>
          <Button type="button" onClick={handleSave} className="flex-1">
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
