"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/_shadcn/accordion";

export interface SeoSummaryAccordionProps {
  metaDescription: string;
}

export function SeoSummaryAccordion({
  metaDescription,
}: SeoSummaryAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="seo-summary" className="bg-gray-100 rounded-sm">
        <AccordionTrigger className="cursor-pointer bg-gray-200 rounded-sm px-2 py-3">
          생성된 SEO 메타 설명 확인하기
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 px-2 py-4">
          <p className="text-sm">{metaDescription}</p>
          <p className="text-green-800 text-xs">
            HTML 다운로드 시 meta 태그의 content 안에 들어가며, 검색 결과·링크
            공유 미리보기에 사용됩니다.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
