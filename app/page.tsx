"use client";

import { useGenerateDocument } from "@/features/generate-document/model/useGenerateDocument";
import type { GenerateDocumentRequest } from "@/types/document.types";
import { LoadingOverlay } from "@/ui/index";
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
      <p className="text-4xl text-center mb-auto mt-auto">
        어떤 주제로 써볼까요?
      </p>

      <GeneratorForm onSubmit={handleGenerate} isLoading={isGenerating} />

      {isGenerating && <LoadingOverlay message={progress} />}

      {error && (
        <div>
          {error}
          <button onClick={clearError}>×</button>
        </div>
      )}
    </div>
  );
}
