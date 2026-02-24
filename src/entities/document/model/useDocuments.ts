"use client";
import { useState, useEffect, useCallback } from "react";
import { documentStorage } from "./documentStorage";
import type { GeneratedDocument, TemplateType } from "@/types/document.types";

export function useDocuments() {
  const [documents, setDocuments] = useState<GeneratedDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(() => {
    setIsLoading(true);
    try {
      setDocuments(documentStorage.getAll());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getById = useCallback((id: string) => {
    return documentStorage.getById(id);
  }, []);

  const getByTemplate = useCallback(
    (templateType: TemplateType) => {
      return documents.filter((doc) => doc.templateType === templateType);
    },
    [documents]
  );

  const getRecent = useCallback((limit: number = 10) => {
    return documentStorage.getRecent(limit);
  }, []);

  const search = useCallback((query: string) => {
    return documentStorage.search(query);
  }, []);

  const update = useCallback(
    (
      id: string,
      updates: Partial<
        Pick<
          GeneratedDocument,
          "title" | "body" | "hashtags" | "metaDescription"
        >
      >
    ) => {
      const updated = documentStorage.update(id, updates);
      if (updated) refresh();
      return updated;
    },
    [refresh]
  );

  const deleteDoc = useCallback(
    (id: string) => {
      const success = documentStorage.delete(id);
      if (success) refresh();
      return success;
    },
    [refresh]
  );

  const deleteMultiple = useCallback(
    (ids: string[]) => {
      const result = documentStorage.deleteMultiple(ids);
      refresh();
      return result;
    },
    [refresh]
  );

  return {
    documents,
    isLoading,
    refresh,
    getById,
    getByTemplate,
    getRecent,
    search,
    update,
    delete: deleteDoc,
    deleteMultiple,
  };
}
