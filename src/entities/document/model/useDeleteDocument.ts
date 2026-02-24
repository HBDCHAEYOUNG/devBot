"use client";

import { useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDocuments } from "./useDocuments";

export function useDeleteDocument() {
  const router = useRouter();
  const pathname = usePathname();
  const { delete: deleteDoc } = useDocuments();

  const deleteDocument = useCallback(
    (id: string) => {
      deleteDoc(id);
      if (pathname === `/document/${id}`) {
        router.push("/");
      }
    },
    [deleteDoc, pathname, router]
  );

  return deleteDocument;
}
