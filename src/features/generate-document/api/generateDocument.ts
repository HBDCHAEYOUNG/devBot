import { post } from "@/api/client";
import { DOCUMENT_PROMPTS } from "@/features/generate-document/config/prompts";
import type {
  GenerateDocumentRequest,
  GenerateDocumentResponse,
} from "@/types/document.types";

export async function generateDocument(
  request: GenerateDocumentRequest
): Promise<GenerateDocumentResponse> {
  const prompt = DOCUMENT_PROMPTS[request.templateType](
    request.topic,
    request.difficulty,
    request.length
  );
  return post<GenerateDocumentResponse>("/api/generate", { prompt });
}
