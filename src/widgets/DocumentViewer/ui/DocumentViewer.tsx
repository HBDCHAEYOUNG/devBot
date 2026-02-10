"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { GeneratedDocument } from "@/types/document.types";
import { TEMPLATE_LABELS } from "@/config/constants";
import { useDocuments } from "@/entities/document";
import { ToastMarkdown } from "@/ui/index";
import { useState } from "react";
import CopyIcon from "@/icons/copy.svg";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";

dayjs.locale("ko");

interface DocumentViewerProps {
  id: string;
}

export function DocumentViewer({ id }: DocumentViewerProps) {
  const { getById } = useDocuments();
  const document: GeneratedDocument | null = getById(id);

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [body, setBody] = useState(document?.body || "");

  const onCopy = () => {};
  const onEdit = () => {
    setMode("edit");
  };
  const onDelete = () => {};

  if (!document) {
    return <div>Document not found</div>;
  }
  const onSave = () => {
    setMode("view");
  };

  return (
    <div className="flex flex-col gap-10 common-padding-y">
      <header className="flex flex-col gap-6 common-padding-x ">
        <div className="flex flex-col items-center gap-2">
          <span>{TEMPLATE_LABELS[document.templateType]}</span>
          <h1 className="text-2xl text-center">{document.title}</h1>
        </div>

        <nav className="flex items-center gap-2 w-full">
          <time className="text-sm text-gray-500 mr-auto">
            {dayjs(document.createdAt).format("YYYY년 M월 D일 A h:mm")}
          </time>

          {mode === "view" ? (
            <>
              {" "}
              <button onClick={onCopy}>
                <CopyIcon className="size-4" />
              </button>
              <button onClick={onEdit}>
                <PenIcon className="size-4" />
              </button>
              <button onClick={onDelete}>
                <TrashIcon className="size-4" />
              </button>
            </>
          ) : (
            <>
              <button onClick={onSave}>저장</button>
            </>
          )}
        </nav>
      </header>

      <section className="flex flex-col gap-10 common-padding-x">
        <ToastMarkdown mode={mode} value={body} onChange={setBody} />
        <div>
          {document.hashtags.map((tag, i) => (
            <span key={i} className="text-sm text-gray-500">
              {`#${tag} `}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
