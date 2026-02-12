"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/ui/_shadcn/sidebar";
import MainIcon from "@/icons/logo.svg";
import CloseIcon from "@/icons/close.svg";
import Link from "next/link";
import { DocumentsList } from "@/entities/document";
import DocumentIcon from "@/icons/document-add.svg";

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const handleClose = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };
  return (
    <Sidebar>
      <SidebarHeader className="px-3 flex flex-row justify-between">
        <Link href="/" className="cursor-pointer" onClick={handleClose}>
          <MainIcon className="size-6 cursor-pointer" />
        </Link>
        <CloseIcon className="size-5 cursor-pointer" onClick={handleClose} />
      </SidebarHeader>
      <SidebarContent>
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md p-2 text-sm my-6"
          onClick={handleClose}
        >
          <DocumentIcon className="size-4" />
          새글 작성
        </Link>
        <h4 className="text-sm text-gray-600 px-2">내 문서</h4>
        <DocumentsList />
      </SidebarContent>
    </Sidebar>
  );
}
