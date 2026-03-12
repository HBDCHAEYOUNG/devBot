import { post } from "@/api/client";
import type {
  GenerateDocumentRequest,
  GenerateDocumentResponse,
} from "@/types/document.types";

export async function generateDocument(
  request: GenerateDocumentRequest
): Promise<GenerateDocumentResponse> {
  return post<GenerateDocumentResponse>("/api/generate", request);
}
