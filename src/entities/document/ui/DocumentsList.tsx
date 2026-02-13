"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDocuments } from "../model/useDocuments";
import type { GeneratedDocument } from "@/types/document.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useInputModal } from "@/hooks/useInputModal";
import { useDropdownMenu } from "@/hooks/useDropdownMenu";
import { InputModal } from "@/ui/index";
import { DocumentItemMenu } from "./DocumentItemMenu";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";

export function DocumentsList() {
  const router = useRouter();
  const pathname = usePathname();
  const { documents, refresh, delete: deleteDoc, update } = useDocuments();
  const { openMenuId, menuRef, toggle, close } = useDropdownMenu();
  const [editingDoc, setEditingDoc] = useState<GeneratedDocument | null>(null);

  const renameModal = useInputModal({
    validate: (v) => (!v.trim() ? "제목을 입력해주세요." : null),
    onSubmit: (newTitle) => {
      if (!editingDoc) return;
      const updated = update(editingDoc.id, { title: newTitle });
      if (updated) {
        window.dispatchEvent(new Event("documents-updated"));
      }
    },
  });

  const handleCloseRename = () => {
    setEditingDoc(null);
    renameModal.close();
  };

  useEffect(() => {
    const handleUpdate = () => refresh();
    window.addEventListener("documents-updated", handleUpdate);
    return () => window.removeEventListener("documents-updated", handleUpdate);
  }, [refresh]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    const success = deleteDoc(id);
    if (success) {
      close();

      if (pathname === `/document/${id}`) {
        router.push("/");
      }
    }
  };

  const handleRename = (doc: GeneratedDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    close();
    setEditingDoc(doc);
    renameModal.open(doc.title);
  };

  const isActive = (id: string) => pathname === `/document/${id}`;

  if (documents.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm">
        <p className="mb-2 ">아직 생성된 문서가 없습니다.</p>
        <p>새로운 글을 생성해보세요!</p>
      </div>
    );
  }

  return (
    <>
      <InputModal
        isOpen={renameModal.isOpen}
        onClose={handleCloseRename}
        title="제목 수정"
        placeholder="새 제목을 입력하세요"
        value={renameModal.value}
        onChange={renameModal.setValue}
        error={renameModal.error}
        onSubmit={renameModal.handleSubmit}
        submitLabel="저장"
      />
      <ul className="flex-1">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className={cn(
              "flex items-center justify-between cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md small-padding-x small-padding-x py-1",
              isActive(doc.id) && "bg-blue-50 border-l-4 border-blue-500"
            )}
          >
            <Link
              className="flex-1 min-w-0 cursor-pointer text-sm font-medium text-gray-800 truncate"
              href={`/document/${doc.id}`}
            >
              {doc.title}
            </Link>

            <DocumentItemMenu
              doc={doc}
              isOpen={openMenuId === doc.id}
              menuRef={menuRef}
              onToggle={toggle}
              items={[
                {
                  label: "제목 수정",
                  icon: <PenIcon className="size-4" />,
                  onClick: (e) => handleRename(doc, e),
                },
                {
                  label: "삭제",
                  icon: <TrashIcon className="size-4 [&_path]:fill-red-600" />,
                  variant: "danger",
                  onClick: (e) => handleDelete(doc.id, e),
                },
              ]}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
