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
        <DocumentsList />
      </SidebarContent>
    </Sidebar>
  );
}
