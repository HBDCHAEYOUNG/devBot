"use client";

import { useEffect } from "react";
import { useDocuments } from "@/entities/document";
import { DocumentDetail } from "@/widgets/DocumentDetail";
import { Toaster } from "@/ui/_shadcn/sonner";

interface DocumentPageClientProps {
  id: string;
}

export function DocumentPageClient({ id }: DocumentPageClientProps) {
  const { getById, isLoading, refresh } = useDocuments();
  const document = getById(id);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("documents-updated", handler);
    return () => window.removeEventListener("documents-updated", handler);
  }, [refresh]);

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
