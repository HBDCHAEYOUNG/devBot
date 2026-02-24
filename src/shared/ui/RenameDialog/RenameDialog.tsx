"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/ui/_shadcn/dialog";
import { RenameDialogContent } from "./RenameDialogContent";
import { useDocuments } from "@/entities/document";
import type { GeneratedDocument } from "@/types/document.types";

type RenameDialogProps = {
  doc: GeneratedDocument;
  trigger: React.ReactNode;
};

export function RenameDialog({ doc, trigger }: RenameDialogProps) {
  const [open, setOpen] = useState(false);
  const { update } = useDocuments();

  const handleSubmit = (newTitle: string) => {
    const updated = update(doc.id, { title: newTitle });
    if (updated) {
      window.dispatchEvent(new Event("documents-updated"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <RenameDialogContent
          title="제목 수정"
          initialValue={doc.title}
          placeholder="새 제목을 입력하세요"
          submitLabel="저장"
          cancelLabel="취소"
          validate={(v) => (!v.trim() ? "제목을 입력해주세요." : null)}
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      )}
    </Dialog>
  );
}
