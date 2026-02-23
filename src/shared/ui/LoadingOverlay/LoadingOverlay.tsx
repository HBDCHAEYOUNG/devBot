"use client";

import { cn } from "@/lib/utils";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export function LoadingOverlay({ message, className }: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message ?? "로딩 중"}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div
        className="h-10 w-10 rounded-full border-2 border-muted-foreground/30 border-t-foreground animate-spin"
        aria-hidden
      />
      {message && (
        <p className="text-sm text-muted-foreground text-center max-w-[240px]">
          {message}
        </p>
      )}
    </div>
  );
}
