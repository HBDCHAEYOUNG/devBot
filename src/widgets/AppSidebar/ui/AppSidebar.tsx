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

export function AppSidebar() {
  const { setOpen, setOpenMobile, isMobile } = useSidebar();
  const handleClose = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };
  return (
    <Sidebar>
      <SidebarHeader className="px-4 flex flex-row justify-between">
        <Link href="/" className="cursor-pointer" onClick={handleClose}>
          <MainIcon className="size-7 cursor-pointer" />
        </Link>
        <CloseIcon className="size-6 cursor-pointer" onClick={handleClose} />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <DocumentsList />
      </SidebarContent>
    </Sidebar>
  );
}
