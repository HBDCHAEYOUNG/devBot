"use client";

import { useState } from "react";
import { Button } from "@/ui/_shadcn/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/ui/_shadcn/dialog";

type DeleteConfirmDialogProps = {
  title?: string;
  description?: string;
  onConfirm: () => void;
  onAfterConfirm?: () => void;
  trigger: React.ReactNode;
};

export function DeleteConfirmDialog({
  title = "정말 삭제하시겠습니까?",
  onConfirm,
  onAfterConfirm,
  trigger,
}: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
    onAfterConfirm?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <DialogContent showCloseButton={false} className="max-w-64">
          <DialogHeader>
            <DialogTitle className="mt-4">{title}</DialogTitle>
          </DialogHeader>
          <DialogFooter className="flex flex-row mt-4 gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-sm"
            >
              취소
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleConfirm}
              className="flex-1 rounded-sm"
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
