"use client";

import type { RefObject } from "react";
import type { GeneratedDocument } from "@/types/document.types";
import type { DropdownMenuItem } from "@/ui/DropdownMenu";
import { DropdownMenu } from "@/ui/DropdownMenu";

type DocumentItemMenuProps = {
  doc: GeneratedDocument;
  isOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggle: (id: string, e: React.MouseEvent) => void;
  items: DropdownMenuItem[];
};

export function DocumentItemMenu({
  doc,
  isOpen,
  menuRef,
  onToggle,
  items,
}: DocumentItemMenuProps) {
  return (
    <DropdownMenu
      isOpen={isOpen}
      menuRef={menuRef}
      onToggle={(e) => onToggle(doc.id, e)}
      items={items}
    />
  );
}
