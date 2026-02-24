export const DOCUMENT_SCHEMA = {
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
        description: "마크다운 형식의 본문 내용 (최소 100자)",
        minLength: 100,
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
