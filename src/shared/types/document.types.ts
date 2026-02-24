export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Length = "short" | "medium" | "long";
export type TemplateType = "tutorial" | "til" | "troubleshooting";

export interface GenerateDocumentRequest {
  topic: string;
  length: Length;
  difficulty: Difficulty;
  templateType: TemplateType;
}

// 응답 타입
export interface GenerateDocumentResponse {
  title: string;
  body: string;
  hashtags: string[];
  metaDescription: string;
}

// 저장소 타입
export interface GeneratedDocument {
  id: string;
  title: string;
  body: string;
  hashtags: string[];
  metaDescription: string;
  templateType: TemplateType;
  topic: string;
  difficulty: Difficulty;
  length: Length;
  createdAt: string;
  updatedAt: string;
}
