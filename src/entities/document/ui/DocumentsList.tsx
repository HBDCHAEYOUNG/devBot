"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDocuments } from "../model/useDocuments";
import type { GeneratedDocument } from "@/types/document.types";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useInputModal } from "@/hooks/useInputModal";
import { InputModal } from "@/ui/InputModal";

export function DocumentsList() {
  const router = useRouter();
  const pathname = usePathname();
  const { documents, refresh, delete: deleteDoc, update } = useDocuments();

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState<GeneratedDocument | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm("정말 삭제하시겠습니까?")) return;

    const success = deleteDoc(id);
    if (success) {
      setOpenMenuId(null);

      if (pathname === `/document/${id}`) {
        router.push("/");
      }
    }
  };

  const handleRename = (doc: GeneratedDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setEditingDoc(doc);
    renameModal.open(doc.title);
  };

  const isActive = (id: string) => pathname === `/document/${id}`;

  if (documents.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p className="mb-2">아직 생성된 문서가 없습니다.</p>
        <p className="text-sm">새로운 글을 생성해보세요!</p>
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
      <ul className="flex-1 overflow-y-auto ">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className={cn(
              "flex items-center cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md px-2",
              isActive(doc.id) && "bg-blue-50 border-l-4 border-blue-500"
            )}
          >
            <Link
              className="flex-1 min-w-0 cursor-pointer text-sm font-medium text-gray-800 truncate mb-1"
              href={`/document/${doc.id}`}
            >
              {doc.title}
            </Link>

            <div
              className="relative"
              ref={openMenuId === doc.id ? menuRef : null}
            >
              <button
                onClick={(e) => handleMenuToggle(doc.id, e)}
                className="p-1 cursor-pointer"
                aria-label="메뉴 열기"
              >
                ⋮
              </button>

              {openMenuId === doc.id && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[140px]">
                  <button
                    onClick={(e) => handleRename(doc, e)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <PenIcon className="size-4" />
                    제목 수정
                  </button>
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <TrashIcon className="size-4 [&_path]:fill-red-600" />
                    삭제
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
