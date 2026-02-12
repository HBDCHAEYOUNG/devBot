"use client";

import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

type ToastMode = "view" | "edit";

interface ToastMarkdownProps {
  mode: ToastMode;
  value: string;
  onChange: (markdown: string) => void;
  height?: string;
}

type ToastInstance = {
  destroy: () => void;
  getMarkdown?: () => string;
  setMarkdown?: (markdown: string) => void;
  on?: (event: string, callback: () => void) => void;
};

export function ToastMarkdown({
  mode,
  value,
  onChange,
  height = "400px",
}: ToastMarkdownProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<ToastInstance | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    const init = async () => {
      if (mode === "edit") {
        const { default: Editor } = await import("@toast-ui/editor");
        if (cancelled || !containerRef.current) return;
        const editor = new Editor({
          el: containerRef.current,
          height,
          initialValue: value,
        });
        editor.on("change", () => {
          onChangeRef.current(editor.getMarkdown());
        });
        instanceRef.current = editor as ToastInstance;
      } else {
        const { default: Viewer } = await import(
          "@toast-ui/editor/dist/toastui-editor-viewer"
        );
        if (cancelled || !containerRef.current) return;
        const viewer = new Viewer({
          el: containerRef.current,
          height,
          initialValue: value,
        });
        instanceRef.current = viewer as ToastInstance;
      }
    };

    init();

    return () => {
      cancelled = true;
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, height]);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance?.setMarkdown || mode !== "edit") return;
    instance.setMarkdown(value);
  }, [value, mode]);

  return <div ref={containerRef} />;
}
