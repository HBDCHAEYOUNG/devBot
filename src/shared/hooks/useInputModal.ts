import { useState, useCallback } from "react";

type UseInputModalOptions = {
  initialValue?: string;
  validate?: (value: string) => string | null;
  onSubmit: (value: string) => void;
};

export function useInputModal(options: UseInputModalOptions) {
  const { initialValue = "", validate, onSubmit } = options;

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback((prefill = "") => {
    setValue(prefill);
    setError(null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setValue("");
    setError(null);
  }, []);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    const errorMessage =
      validate?.(trimmed) ?? (trimmed ? null : "값을 입력해주세요.");
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    onSubmit(trimmed);
    close();
  }, [value, validate, onSubmit, close]);

  return {
    isOpen,
    open,
    close,
    value,
    setValue,
    error,
    setError,
    handleSubmit,
  };
}
