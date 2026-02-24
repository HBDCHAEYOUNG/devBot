"use client";

import type { GeneratedDocument } from "@/types/document.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  RenameDialog,
  DeleteConfirmDialog,
} from "@/ui/index";
import MenuDotsIcon from "@/icons/menu-dots.svg";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";

type DocumentItemMenuProps = {
  doc: GeneratedDocument;
  onDelete: (id: string) => void;
};

export function DocumentItemMenu({ doc, onDelete }: DocumentItemMenuProps) {
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
        <RenameDialog
          doc={doc}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <PenIcon className="size-4" />
              제목 수정
            </DropdownMenuItem>
          }
        />
        <DeleteConfirmDialog
          onConfirm={() => onDelete(doc.id)}
          trigger={
            <DropdownMenuItem
              variant="destructive"
              onSelect={(e) => e.preventDefault()}
              onClick={(e) => e.stopPropagation()}
            >
              <TrashIcon className="size-4 [&_path]:fill-red-600" />
              삭제
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
