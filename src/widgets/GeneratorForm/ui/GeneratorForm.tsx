"use client";

import { useState, useEffect } from "react";
import type {
  GenerateDocumentRequest,
  TemplateType,
  Difficulty,
  Length,
} from "@/types/document.types";
import {
  TEMPLATE_LABELS,
  DIFFICULTY_LABELS,
  LENGTH_LABELS,
} from "@/config/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/ui/index";
import ArrowUpIcon from "@/icons/arrow-up.svg";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  settingsStorage,
  SETTINGS_SAVED_EVENT,
} from "@/features/generator-settings";
import { useIsMobile } from "@/hooks/use-mobile";

interface GeneratorFormProps {
  onSubmit: (request: GenerateDocumentRequest) => void;
  isLoading?: boolean;
}

export function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const isMobile = useIsMobile();

  const [topic, setTopic] = useState("");
  const [templateType, setTemplateType] = useState<TemplateType | "">("til");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("beginner");
  const [length, setLength] = useState<Length | "">("medium");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  useEffect(() => {
    const s = settingsStorage.get();
    const id = setTimeout(() => {
      if (s.templateType) setTemplateType(s.templateType);
      if (s.difficulty) setDifficulty(s.difficulty);
      if (s.length) setLength(s.length);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const applyDefaults = () => {
      const s = settingsStorage.get();
      setTemplateType(s.templateType ?? "");
      setDifficulty(s.difficulty ?? "");
      setLength(s.length ?? "");
    };
    window.addEventListener(SETTINGS_SAVED_EVENT, applyDefaults);
    return () =>
      window.removeEventListener(SETTINGS_SAVED_EVENT, applyDefaults);
  }, []);

  const isFormValid = topic.trim() && templateType && difficulty && length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      const missing: string[] = [];
      if (!topic.trim()) missing.push("주제");
      if (!templateType) missing.push("템플릿 유형");
      if (!difficulty) missing.push("난이도");
      if (!length) missing.push("분량");
      toast.error(`${missing.join(", ")}을(를) 입력해 주세요.`);
      return;
    }

    onSubmit({
      topic,
      templateType: templateType as TemplateType,
      difficulty: difficulty as Difficulty,
      length: length as Length,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-2 items-center w-full common-padding bg-white",
        isMobile && ""
      )}
    >
      <div className="flex w-full items-center ">
        <p
          className={cn(
            "text-sm text-muted-foreground pl-2",
            isMobile && "hidden"
          )}
        >
          글 형식은
        </p>
        <Select
          value={templateType}
          onValueChange={(value) => setTemplateType(value as TemplateType)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-fit border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black! ">
            <SelectValue placeholder="템플릿 유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(TEMPLATE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p
          className={cn(
            "text-sm text-muted-foreground pl-2",
            isMobile && "hidden"
          )}
        >
          난이도는
        </p>
        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as Difficulty)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-fit border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black!">
            <SelectValue placeholder="난이도" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <p
          className={cn(
            "text-sm text-muted-foreground pl-2",
            isMobile && "hidden"
          )}
        >
          분량은
        </p>
        <Select
          value={length}
          onValueChange={(value) => setLength(value as Length)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-fit border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black!">
            <SelectValue placeholder="선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {Object.entries(LENGTH_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p
          className={cn(
            "text-sm text-muted-foreground pl-2",
            isMobile && "hidden"
          )}
        >
          {" "}
          생성할래요.
        </p>
      </div>
      <div className="flex gap-2 w-full relative">
        <Textarea
          id="textarea-message"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onFocus={() => setIsTextareaFocused(true)}
          onBlur={() => setIsTextareaFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              e.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder={isTextareaFocused ? "" : "React useState 훅 사용법"}
          required
          disabled={isLoading}
          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl text-xl! pt-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center absolute right-4 bottom-3 cursor-pointer",
            isLoading || !isFormValid ? "bg-gray-500" : "bg-black"
          )}
        >
          <ArrowUpIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
}
