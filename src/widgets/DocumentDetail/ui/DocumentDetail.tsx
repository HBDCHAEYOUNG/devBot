"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { GeneratedDocument } from "@/types/document.types";
import { TEMPLATE_LABELS } from "@/config/constants";
import {
  ToastMarkdown,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DeleteConfirmDialog,
} from "@/ui/index";
import { useState } from "react";
import CopyIcon from "@/icons/copy.svg";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";
import ExportIcon from "@/icons/download.svg";
import { useDeleteDocument } from "@/entities/document";
import { SeoSummaryAccordion } from "@/ui/index";

dayjs.locale("ko");

export interface DocumentDetailProps {
  document: GeneratedDocument;
}

export function DocumentDetail({ document }: DocumentDetailProps) {
  const deleteDocument = useDeleteDocument();

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [body, setBody] = useState(document.body);

  const onExport = (format: "markdown" | "html") => () => {
    void format;
  };
  const onCopy = () => {};
  const onEdit = () => setMode("edit");
  const onSave = () => setMode("view");
  const handleDelete = () => deleteDocument(document.id);

  return (
    <div className="flex flex-col gap-6  large-padding-y ">
      <header className="flex flex-col gap-6 border-b border-border common-padding">
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
              <DropdownMenu>
                <DropdownMenuTrigger
                  type="button"
                  className="cursor-pointer outline-none"
                  aria-label="내보내기"
                >
                  <ExportIcon className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onExport("markdown")}>
                    Markdown 다운로드
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onExport("html")}>
                    HTML 다운로드
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={onCopy} className="cursor-pointer">
                <CopyIcon className="size-4" />
              </button>
              <button onClick={onEdit} className="cursor-pointer">
                <PenIcon className="size-4" />
              </button>
              <DeleteConfirmDialog
                onConfirm={handleDelete}
                trigger={
                  <button
                    type="button"
                    aria-label="삭제"
                    className="cursor-pointer"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                }
              />
            </>
          ) : (
            <>
              <button
                onClick={onSave}
                className="cursor-pointer bg-primary text-white text-sm px-1 rounded-sm"
              >
                저장
              </button>
            </>
          )}
        </nav>
      </header>

      <section className="flex flex-col gap-10 common-padding-x">
        <SeoSummaryAccordion metaDescription={document.metaDescription} />
        <ToastMarkdown mode={mode} value={body} onChange={setBody} />
        <div>
          {document.hashtags.map((tag, i) => (
            <span key={i} className="text-sm text-gray-500">
              {`${tag} `}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
