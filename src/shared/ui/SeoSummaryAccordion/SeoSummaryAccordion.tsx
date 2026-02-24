"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/_shadcn/accordion";
import { Textarea } from "@/ui/index";

export interface SeoSummaryAccordionProps {
  metaDescription: string;
  mode?: "view" | "edit";
  onMetaDescriptionChange?: (value: string) => void;
}

export function SeoSummaryAccordion({
  metaDescription,
  mode = "view",
  onMetaDescriptionChange,
}: SeoSummaryAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="seo-summary" className="bg-gray-100 rounded-sm">
        <AccordionTrigger className="cursor-pointer bg-gray-200 rounded-sm px-2 py-3">
          {mode === "view"
            ? "생성된 SEO 메타 설명 확인하기"
            : "SEO 메타 설명 수정하기"}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 px-2 py-4">
          <Textarea
            value={metaDescription}
            readOnly={mode === "view"}
            onChange={(e) => onMetaDescriptionChange?.(e.target.value)}
            className="w-full text-sm rounded px-2 py-2 outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            placeholder="SEO 메타 설명"
          />
          {mode === "view" && (
            <p className="text-green-800 text-xs">
              HTML 다운로드 시 meta 태그의 content 안에 들어가며, 검색 결과·링크
              공유 미리보기에 사용됩니다.
            </p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
