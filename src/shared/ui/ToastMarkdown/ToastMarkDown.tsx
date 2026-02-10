"use client";

import { useEffect, useRef } from "react";
import Editor from "@toast-ui/editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

type ToastMode = "view" | "edit";

interface ToastMarkdownProps {
  mode: ToastMode;
  value: string;
  onChange: (markdown: string) => void;
  height?: string;
}

export function ToastMarkdown({
  mode,
  value,
  onChange,
  height = "400px",
}: ToastMarkdownProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<Editor | Viewer | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (instanceRef.current) {
      instanceRef.current.destroy();
      instanceRef.current = null;
    }

    if (mode === "edit") {
      const editor = new Editor({
        el: containerRef.current,
        height,
        initialValue: value,
      });

      editor.on("change", () => {
        onChangeRef.current(editor.getMarkdown());
      });

      instanceRef.current = editor;
    } else {
      const viewer = new Viewer({
        el: containerRef.current,
        height,
        initialValue: value,
      });

      instanceRef.current = viewer;
    }

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, height]);

  useEffect(() => {
    if (!instanceRef.current) return;
    if (mode !== "edit") return;

    (instanceRef.current as Editor).setMarkdown(value);
  }, [value, mode]);

  return <div ref={containerRef} />;
}
