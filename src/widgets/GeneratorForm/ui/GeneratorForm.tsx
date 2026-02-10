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

interface GeneratorFormProps {
  onSubmit: (request: GenerateDocumentRequest) => void;
  isLoading?: boolean;
}

export function GeneratorForm({ onSubmit, isLoading }: GeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [templateType, setTemplateType] = useState<TemplateType>("tutorial");
  const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
  const [length, setLength] = useState<Length>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      topic,
      templateType,
      difficulty,
      length,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center w-screen common-padding"
    >
      <div className="flex gap-2 w-full">
        <Select
          value={templateType}
          onValueChange={(value) => setTemplateType(value as TemplateType)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger>
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
          <SelectTrigger>
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
          placeholder="React useState 훅 사용법"
          required
          disabled={isLoading}
          className="focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl text-xl pt-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center absolute right-4 bottom-3",
            isLoading ? "bg-gray-500" : "bg-black"
          )}
        >
          <ArrowUpIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </form>
  );
}
