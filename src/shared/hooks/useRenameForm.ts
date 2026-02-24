import { useState, useCallback } from "react";

type UseRenameFormOptions = {
  initialValue: string;
  validate?: (value: string) => string | null;
  onSubmit: (value: string) => void;
};

export function useRenameForm({
  initialValue,
  validate,
  onSubmit,
}: UseRenameFormOptions) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    const errorMessage =
      validate?.(trimmed) ?? (trimmed ? null : "값을 입력해주세요.");
    if (errorMessage) {
      setError(errorMessage);
      return false;
    }
    onSubmit(trimmed);
    return true;
  }, [value, validate, onSubmit]);

  return { value, setValue, error, handleSubmit };
}
