"use client";

import { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism-tomorrow.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import { cn } from "@/lib/utils";

type ToastMode = "view" | "edit";

/** edit 모드에서만 사용. 'vertical'이면 Write/Preview 탭 없이 세로 분할(좁은 화면용) */
export type ToastPreviewStyle = "tab" | "vertical";

interface ToastMarkdownProps {
  mode: ToastMode;
  value: string;
  onChange: (markdown: string) => void;
  height?: string;
  /** edit 모드일 때 미리보기 스타일. 미지정 시 "tab" */
  previewStyle?: ToastPreviewStyle;
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
  height,
  previewStyle: previewStyleProp = "tab",
}: ToastMarkdownProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<ToastInstance | null>(null);
  const onChangeRef = useRef(onChange);

  const resolvedHeight = height ?? (mode === "edit" ? "580px" : undefined);

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
          height: resolvedHeight,
          initialValue: value,
          initialEditType: "markdown",
          hideModeSwitch: true,
          toolbarItems: [],
          previewStyle: previewStyleProp,
        });
        editor.on("change", () => {
          onChangeRef.current(editor.getMarkdown());
        });
        instanceRef.current = editor as ToastInstance;
      } else {
        const { default: Viewer } = await import(
          "@toast-ui/editor/dist/toastui-editor-viewer"
        );
        const { default: codeSyntaxHighlight } = await import(
          "@toast-ui/editor-plugin-code-syntax-highlight"
        );

        if (cancelled || !containerRef.current) return;
        const viewer = new Viewer({
          el: containerRef.current,
          initialValue: value,
          plugins: [[codeSyntaxHighlight, { highlighter: Prism }]],
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
  }, [mode, resolvedHeight, previewStyleProp]);

  useEffect(() => {
    const instance = instanceRef.current;
    if (!instance?.setMarkdown || !instance?.getMarkdown || mode !== "edit")
      return;

    const currentMarkdown = instance.getMarkdown();
    if (currentMarkdown !== value) {
      instance.setMarkdown(value);
    }
  }, [value, mode]);

  return (
    <div
      key={mode}
      ref={containerRef}
      className={cn(
        "w-full",
        mode === "view"
          ? "toast-markdown-view-mode"
          : mode === "edit"
          ? "toast-markdown-edit-mode"
          : undefined
      )}
    />
  );
}
