"use client";

import { useGenerateDocument } from "@/features/generate-document/model/useGenerateDocument";
import type { GenerateDocumentRequest } from "@/types/document.types";
import { LoadingOverlay } from "@/ui/index";
import { Toaster } from "@/ui/_shadcn/sonner";
import { GeneratorForm } from "@/widgets/GeneratorForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GeneratorPage() {
  const router = useRouter();

  const { generate, isGenerating, error, progress, clearError } =
    useGenerateDocument();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleGenerate = async (request: GenerateDocumentRequest) => {
    const doc = await generate(request);
    if (doc) {
      router.push(`/document/${doc.id}`);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4 items-center h-screen max-w-4xl mx-auto">
        <p className="text-4xl text-center mb-auto mt-auto">
          어떤 주제로 써볼까요?
        </p>

        <GeneratorForm onSubmit={handleGenerate} isLoading={isGenerating} />

        {isGenerating && <LoadingOverlay message={progress} />}
      </div>
      <Toaster position="top-center" />
    </>
  );
}
