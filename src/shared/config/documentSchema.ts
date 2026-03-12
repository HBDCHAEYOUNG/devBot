import type { Length } from "@/types/document.types";

/** length별 본문 분량: short 1000-1500자, medium 2000-3000자, long 4000-5000자 (prompts와 동일) */
const BODY_LENGTH_BY_TYPE: Record<
  Length,
  { minLength: number; maxLength: number; description: string }
> = {
  short: {
    minLength: 1000,
    maxLength: 2000,
    description: "마크다운 형식의 본문 내용 (1000-2000자, short)",
  },
  medium: {
    minLength: 2000,
    maxLength: 3500,
    description: "마크다운 형식의 본문 내용 (2000-3500자, medium)",
  },
  long: {
    minLength: 4000,
    maxLength: 5500,
    description: "마크다운 형식의 본문 내용 (4000-5500자, long)",
  },
};

/**
 * 요청 시 length에 따라 body minLength/maxLength가 다른 스키마를 반환합니다.
 * OpenAI Structured Outputs 호출 시 사용.
 */
export function getDocumentSchema(length: Length) {
  const bodyConstraint = BODY_LENGTH_BY_TYPE[length];
  return {
    name: "generated_document_response",
    strict: true,
    schema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "블로그 글의 제목 (5-100자)",
          minLength: 5,
          maxLength: 100,
        },
        body: {
          type: "string",
          description: bodyConstraint.description,
          minLength: bodyConstraint.minLength,
          maxLength: bodyConstraint.maxLength,
        },
        hashtags: {
          type: "array",
          description: "주제 관련 해시태그 배열 (3-7개)",
          items: {
            type: "string",
            minLength: 1,
            maxLength: 30,
          },
          minItems: 3,
          maxItems: 7,
        },
        metaDescription: {
          type: "string",
          description: "SEO 메타 설명 (검색 결과용, 100-160자, 핵심 키워드 포함)",
          minLength: 120,
          maxLength: 160,
        },
      },
      required: ["title", "body", "hashtags", "metaDescription"],
      additionalProperties: false,
    },
  } as const;
}
