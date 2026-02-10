import { useState } from "react";
import { generateDocument } from "@/features/generate-document";
import { documentStorage } from "@/entities/document/model/documentStorage";
import type {
  GenerateDocumentRequest,
  GeneratedDocument,
} from "@/types/document.types";

export function useGenerateDocument() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const generate = async (
    request: GenerateDocumentRequest
  ): Promise<GeneratedDocument | null> => {
    if (!request.topic.trim()) {
      setError("주제를 입력해주세요.");
      return null;
    }

    setIsGenerating(true);
    setError(null);
    setProgress("");

    try {
      setProgress("AI가 글을 생성하고 있습니다...");
      const response = await generateDocument(request);

      setProgress("생성된 글을 저장하고 있습니다...");
      const savedDocument = documentStorage.save(response, request);

      setProgress("완료!");
      return savedDocument;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setError(message);
      return null;
    } finally {
      setIsGenerating(false);
      setTimeout(() => setProgress(""), 1000);
    }
  };

  const clearError = () => setError(null);

  return {
    generate,
    isGenerating,
    error,
    progress,
    clearError,
  };
}
