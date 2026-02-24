"use client";

import { Input } from "@/ui/_shadcn/input";
import { Button } from "@/ui/_shadcn/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/_shadcn/dialog";
import { cn } from "@/lib/utils";
import { useRenameForm } from "@/hooks/useRenameForm";

type RenameDialogContentProps = {
  title: string;
  initialValue: string;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
  validate?: (value: string) => string | null;
  onSubmit: (value: string) => void;
  onClose: () => void;
};

export function RenameDialogContent({
  title,
  initialValue,
  placeholder = "",
  submitLabel = "저장",
  cancelLabel = "취소",
  validate,
  onSubmit,
  onClose,
}: RenameDialogContentProps) {
  const { value, setValue, error, handleSubmit } = useRenameForm({
    initialValue,
    validate,
    onSubmit,
  });

  const handleSubmitClick = () => {
    if (handleSubmit()) onClose();
  };

  return (
    <DialogContent
      showCloseButton={false}
      className="w-full max-w-sm"
      onPointerDownOutside={onClose}
      onEscapeKeyDown={onClose}
    >
      <DialogHeader>
        <DialogTitle className="text-gray-900 dark:text-gray-100">
          {title}
        </DialogTitle>
      </DialogHeader>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={cn(error && "border-red-500 focus-visible:ring-red-500/50")}
        aria-invalid={!!error}
        autoFocus
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      <DialogFooter className="mt-6 gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button type="button" onClick={handleSubmitClick}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
