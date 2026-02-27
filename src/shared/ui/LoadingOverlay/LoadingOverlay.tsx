"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LoadingOverlayProps {
  message?: string;
  className?: string;
}

export function LoadingOverlay({ message, className }: LoadingOverlayProps) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message ?? "로딩 중"}
      className={cn(
        "fixed inset-0 z-50 flex flex-col gap-4 items-center justify-center",
        "bg-background/80 backdrop-blur-sm",
        className
      )}
    >
      <div
        className="h-10 w-10 rounded-full spinner-gradient-ring animate-spin"
        aria-hidden
      />
      <p className="text-sm text-muted-foreground text-center max-w-[240px]">
        {time}초
      </p>
      {message && (
        <p className="text-sm text-muted-foreground text-center max-w-[240px]">
          {message}
        </p>
      )}
    </div>
  );
}
