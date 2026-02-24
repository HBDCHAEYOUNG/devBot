"use client";

import { useDocuments } from "@/entities/document";
import { DocumentDetail } from "@/widgets/DocumentDetail";
import { Toaster } from "@/ui/_shadcn/sonner";

interface DocumentPageClientProps {
  id: string;
}

export function DocumentPageClient({ id }: DocumentPageClientProps) {
  const { getById, isLoading } = useDocuments();
  const document = getById(id);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if (!document) {
    return <div>Document not found</div>;
  }
  return (
    <>
      <DocumentDetail document={document} />
      <Toaster position="top-center" />
    </>
  );
}
