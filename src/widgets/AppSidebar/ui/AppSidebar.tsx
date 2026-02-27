"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  DocumentsList,
  useDocuments,
  useDeleteDocument,
} from "@/entities/document";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/ui/_shadcn/sidebar";
import DocumentIcon from "@/icons/document-add.svg";
import CloseIcon from "@/icons/close.svg";
import MainIcon from "@/icons/logo.svg";

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const pathname = usePathname();
  const { documents, refresh } = useDocuments();
  const deleteDocument = useDeleteDocument();

  useEffect(() => {
    if (!isMobile) setOpen(true);

    const handleUpdate = () => refresh();
    window.addEventListener("documents-updated", handleUpdate);
    return () => window.removeEventListener("documents-updated", handleUpdate);
  }, [refresh, isMobile]);

  const handleClose = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };

  const activeId: string | null =
    pathname && pathname.startsWith("/document/")
      ? pathname.split("/")[2] ?? null
      : null;

  return (
    <Sidebar className="overflow-y-scroll">
      <SidebarHeader>
        <span className="flex items-center gap-2 pr-1 pl-2 small-padding-top">
          <Link
            href="/"
            className="cursor-pointer mr-auto"
            onClick={handleClose}
          >
            <MainIcon className="size-5 cursor-pointer" />
          </Link>
          <CloseIcon className="size-4 cursor-pointer" onClick={handleClose} />
        </span>
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md small-padding-x py-1 text-sm my-6"
          onClick={handleClose}
        >
          <DocumentIcon className="size-4" />
          새글 작성
        </Link>
        <h4 className="text-sm text-gray-600 small-padding-x">내 문서</h4>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <DocumentsList
          documents={documents}
          activeId={activeId}
          onDelete={deleteDocument}
        />
      </SidebarContent>
    </Sidebar>
  );
}
