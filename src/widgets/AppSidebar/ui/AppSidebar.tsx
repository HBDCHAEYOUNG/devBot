"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/ui/_shadcn/sidebar";
import MainIcon from "@/icons/logo.svg";
import CloseIcon from "@/icons/close.svg";
import Link from "next/link";
import { DocumentsList, useDocuments } from "@/entities/document";
import DocumentIcon from "@/icons/document-add.svg";
import { useInputModal } from "@/hooks/useInputModal";
import { InputModal } from "@/ui/index";
import type { GeneratedDocument } from "@/types/document.types";

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const { documents, refresh, delete: deleteDoc, update } = useDocuments();
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

  useEffect(() => {
    const handleUpdate = () => refresh();
    window.addEventListener("documents-updated", handleUpdate);
    return () => window.removeEventListener("documents-updated", handleUpdate);
  }, [refresh]);

  const handleClose = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };

  const handleCloseRename = () => {
    setEditingDoc(null);
    renameModal.close();
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("정말 삭제하시겠습니까?")) return;
    const success = deleteDoc(id);
    if (success && pathname === `/document/${id}`) {
      router.push("/");
    }
  };

  const handleRename = (doc: GeneratedDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingDoc(doc);
    renameModal.open(doc.title);
  };

  const activeId =
    (pathname?.startsWith("/document/") && pathname.split("/")[2]) || null;

  return (
    <Sidebar className="overflow-y-scroll">
      <SidebarHeader className="fixed top-0 left-0 z-10 bg-sidebar w-[calc(var(--sidebar-width)-18px)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)-16px)]">
        <span className="flex items-center gap-2 small-padding-x small-padding-top">
          <Link
            href="/"
            className="cursor-pointer mr-auto"
            onClick={handleClose}
          >
            <MainIcon className="size-6 cursor-pointer" />
          </Link>
          <CloseIcon className="size-5 cursor-pointer" onClick={handleClose} />
        </span>
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md small-padding-x py-2 text-sm my-6"
          onClick={handleClose}
        >
          <DocumentIcon className="size-4" />
          새글 작성
        </Link>
        <h4 className="text-sm text-gray-600 small-padding-x">내 문서</h4>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-46 w-[calc(var(--sidebar-width)-18px)] group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)-16px)]">
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
        <DocumentsList
          documents={documents}
          activeId={activeId}
          onRename={handleRename}
          onDelete={handleDelete}
          onLinkClick={handleClose}
        />
      </SidebarContent>
    </Sidebar>
  );
}
