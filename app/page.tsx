"use client";

import { useGenerateDocument } from "@/features/generate-document/model/useGenerateDocument";
import type { GenerateDocumentRequest } from "@/types/document.types";
import { SidebarTrigger } from "@/ui/index";
import { GeneratorForm } from "@/widgets/GeneratorForm";
import Link from "next/link";
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
      <header className="p-4 fixed top-0 left-0 common-padding flex items-center gap-2">
        <SidebarTrigger className="z-50 cursor-pointer" />
        <Link href="/" className="cursor-pointer text-xl font-light">
          Devbot
        </Link>
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
