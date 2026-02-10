export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Length = "short" | "medium" | "long";
export type TemplateType = "tutorial" | "til" | "troubleshooting";

export interface GenerateDocumentRequest {
  topic: string;
  keywords: string[];
  length: Length;
  difficulty: Difficulty;
  templateType: TemplateType;
}

// 응답 타입
export interface GenerateDocumentResponse {
  title: string;
  body: string;
  hashtags: string[];
}

// 저장소 타입
export interface GeneratedDocument {
  id: string;
  title: string;
  body: string;
  hashtags: string[];
  // 생성 메타데이터
  templateType: TemplateType;
  topic: string;
  keywords: string[];
  difficulty: Difficulty;
  length: Length;
  createdAt: string;
  updatedAt: string;
}
