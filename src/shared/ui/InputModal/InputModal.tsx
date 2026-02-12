"use client";

import { Input } from "@/ui/_shadcn/input";
import { Button } from "@/ui/_shadcn/button";
import { cn } from "@/lib/utils";

type InputModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
};

export function InputModal({
  isOpen,
  onClose,
  title,
  placeholder = "",
  value,
  onChange,
  error,
  onSubmit,
  submitLabel = "확인",
  cancelLabel = "취소",
}: InputModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative z-10 w-full max-w-sm rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="input-modal-title"
      >
        <h2
          id="input-modal-title"
          className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
          {title}
        </h2>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500/50"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? "input-modal-error" : undefined}
          autoFocus
        />
        {error && (
          <p
            id="input-modal-error"
            className="mt-2 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button type="button" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
