import { generateWithAPI } from "@/api/client";
import { DOCUMENT_PROMPTS } from "@/features/generate-document/config/prompts";
import type {
  GenerateDocumentRequest,
  GenerateDocumentResponse,
} from "@/types/document.types";

export async function generateDocument(
  request: GenerateDocumentRequest
): Promise<GenerateDocumentResponse> {
  const promptGenerator = DOCUMENT_PROMPTS[request.templateType];
  const prompt = promptGenerator(
    request.topic,
    request.keywords,
    request.difficulty,
    request.length
  );

  const responseText = await generateWithAPI(prompt);
  try {
    const parsed = JSON.parse(responseText) as GenerateDocumentResponse;

    const isValid =
      parsed.title &&
      parsed.body &&
      Array.isArray(parsed.hashtags) &&
      parsed.title.length >= 5 &&
      parsed.body.length >= 100 &&
      parsed.hashtags.length >= 3;

    if (!isValid) {
      throw new Error(
        "글 생성 결과를 확인하는 중 문제가 발생했습니다. 다시 시도해주세요."
      );
    }

    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("JSON 파싱 실패:", responseText);
      throw new Error("AI 응답 형식이 올바르지 않습니다. 다시 시도해주세요.");
    }
    throw error;
  }
}
