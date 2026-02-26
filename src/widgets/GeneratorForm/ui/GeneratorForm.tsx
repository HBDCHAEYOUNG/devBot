"use client";

import { useState } from "react";
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

interface GeneratorFormProps {
  onSubmit: (request: GenerateDocumentRequest) => void;
  isLoading?: boolean;
}

export function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [templateType, setTemplateType] = useState<TemplateType | "">("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");
  const [length, setLength] = useState<Length | "">("");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

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
      className="flex flex-col gap-4 items-center w-full common-padding bg-white"
    >
      <div className="flex gap-2 w-full">
        <Select
          value={templateType}
          onValueChange={(value) => setTemplateType(value as TemplateType)}
          disabled={isLoading}
        >
          <SelectTrigger className="max-w-[200px] flex-1">
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

        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value as Difficulty)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-22">
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

        <Select
          value={length}
          onValueChange={(value) => setLength(value as Length)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-22">
            <SelectValue placeholder="분량" />
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
