"use client";

import type { GeneratedDocument } from "@/types/document.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/index";
import MenuDotsIcon from "@/icons/menu-dots.svg";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";

type DocumentItemMenuProps = {
  doc: GeneratedDocument;
  onRename: (doc: GeneratedDocument, e: React.MouseEvent) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
};

export function DocumentItemMenu({
  doc,
  onRename,
  onDelete,
}: DocumentItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        type="button"
        className="group p-1 cursor-pointer"
        aria-label="메뉴 열기"
        onClick={(e) => e.stopPropagation()}
      >
        <MenuDotsIcon className="size-4 invisible group-hover:visible cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onRename(doc, e);
          }}
        >
          <PenIcon className="size-4" />
          제목 수정
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(doc.id, e);
          }}
        >
          <TrashIcon className="size-4 [&_path]:fill-red-600" />
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
