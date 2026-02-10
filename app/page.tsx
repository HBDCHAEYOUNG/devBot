"use client";

import { useGenerateDocument } from "@/features/generate-document/model/useGenerateDocument";
import type { GenerateDocumentRequest } from "@/types/document.types";
import { GeneratorForm } from "@/widgets/GeneratorForm";
import { useRouter } from "next/navigation";

export default function GeneratorPage() {
  const router = useRouter();

  const { generate, isGenerating, error, progress, clearError } =
    useGenerateDocument();

  const handleGenerate = async (request: GenerateDocumentRequest) => {
    const doc = await generate(request);
    if (doc) {
      router.push(`/document/${doc.id}`);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 items-center h-screen">
      <header className="p-4 fixed top-0 left-0">
        <h1>AI 기술 블로그 글 생성기</h1>
      </header>

      <p className="text-4xl text-center mb-auto mt-auto">
        어떤 주제로 써볼까요?
      </p>

      <GeneratorForm onSubmit={handleGenerate} isLoading={isGenerating} />

      {/* TODO: 진행 상태 표시 UI 추가 */}
      {progress && <div>{progress}</div>}

      {error && (
        <div>
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
    </div>
  );
}
