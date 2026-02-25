"use client";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { GeneratedDocument } from "@/types/document.types";
import { TEMPLATE_LABELS } from "@/config/constants";
import {
  ToastMarkdown,
  DeleteConfirmDialog,
  ActionDropdown,
  Textarea,
} from "@/ui/index";
import { useState } from "react";
import CopyIcon from "@/icons/copy.svg";
import PenIcon from "@/icons/pen.svg";
import TrashIcon from "@/icons/trash.svg";
import ExportIcon from "@/icons/download.svg";
import { useDeleteDocument, useDocuments } from "@/entities/document";
import { SeoSummaryAccordion } from "@/ui/index";
import { toast } from "sonner";
import {
  exportDocumentAsMarkdown,
  exportDocumentAsHTML,
  buildMarkdownExportContent,
  buildHTMLExportContent,
} from "@/lib/downloadUtils";

dayjs.locale("ko");

export interface DocumentDetailProps {
  document: GeneratedDocument;
}

export function DocumentDetail({ document }: DocumentDetailProps) {
  const deleteDocument = useDeleteDocument();
  const { update } = useDocuments();

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [title, setTitle] = useState(document.title);
  const [metaDescription, setMetaDescription] = useState(
    document.metaDescription
  );
  const [body, setBody] = useState(document.body);

  const getExportPayload = () => ({
    title: mode === "edit" ? title : document.title,
    metaDescription:
      mode === "edit" ? metaDescription : document.metaDescription,
    body: mode === "edit" ? body : document.body,
    hashtags: document.hashtags,
  });

  const onEdit = () => {
    setTitle(document.title);
    setMetaDescription(document.metaDescription);
    setBody(document.body);
    setMode("edit");
  };
  const onSave = () => {
    const payload = {
      title: title ?? document.title,
      metaDescription: metaDescription ?? document.metaDescription,
      body: body ?? document.body,
    };
    const updated = update(document.id, payload);
    if (updated) {
      setMode("view");
      toast.success("저장되었습니다.");
    } else {
      toast.error("저장에 실패했습니다.");
    }
  };
  const handleDelete = () => deleteDocument(document.id);

  return (
    <div className="flex flex-col large-padding-y">
      <header className="flex flex-col common-padding-x common-padding-y max-w-4xl mx-auto w-full">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {mode === "edit" && (
            <nav className="flex items-center gap-2 w-fit justify-end fixed top-5 z-20 pointer-events-auto right-8">
              <button
                onClick={() => setMode("view")}
                className="cursor-pointer border border-gray-300 text-sm px-1 rounded-xs"
              >
                취소
              </button>
              <button
                onClick={onSave}
                className="cursor-pointer bg-primary text-primary-foreground text-sm px-1 rounded-xs"
              >
                저장
              </button>
            </nav>
          )}
          {mode === "view" && (
            <span>{TEMPLATE_LABELS[document.templateType]}</span>
          )}
          <Textarea
            value={mode === "edit" ? title : document.title}
            onChange={(e) => setTitle(e.target.value.replace(/\s+$/, ""))}
            readOnly={mode === "view"}
            className="text-2xl! text-center w-full rounded bg-background outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            placeholder="제목"
          />
        </div>

        <nav className="flex items-center gap-2 w-full max-w-4xl mx-auto">
          {mode === "view" && (
            <>
              <time className="pt-6 text-sm text-gray-500 mr-auto">
                {dayjs(document.createdAt).format("YYYY년 M월 D일 A h:mm")}
              </time>

              <ActionDropdown
                ariaLabel="내보내기"
                trigger={<ExportIcon className="size-4" />}
                items={[
                  {
                    label: "Markdown 다운로드",
                    onClick: () => {
                      const payload = getExportPayload();
                      exportDocumentAsMarkdown(payload);
                      toast.success("Markdown 파일로 다운로드되었습니다.");
                    },
                  },
                  {
                    label: "HTML 다운로드",
                    onClick: () => {
                      exportDocumentAsHTML(getExportPayload()).then(() => {
                        toast.success("HTML 파일로 다운로드되었습니다.");
                      });
                    },
                  },
                ]}
              />
              <ActionDropdown
                ariaLabel="클립보드에 복사"
                trigger={<CopyIcon className="size-4" />}
                items={[
                  {
                    label: "Markdown 복사",
                    onClick: async () => {
                      try {
                        await navigator.clipboard.writeText(
                          buildMarkdownExportContent(getExportPayload())
                        );
                        toast.success(
                          "마크다운 형식으로 클립보드에 복사되었습니다."
                        );
                      } catch {
                        toast.error("복사에 실패했습니다.");
                      }
                    },
                  },
                  {
                    label: "HTML 복사",
                    onClick: async () => {
                      try {
                        const html = await buildHTMLExportContent(
                          getExportPayload()
                        );
                        await navigator.clipboard.writeText(html);
                        toast.success(
                          "HTML 형식으로 클립보드에 복사되었습니다."
                        );
                      } catch {
                        toast.error("복사에 실패했습니다.");
                      }
                    },
                  },
                ]}
              />
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
          )}
        </nav>
      </header>

      <hr />

      <section className="flex flex-col gap-10 common-padding-x max-w-4xl common-padding-y w-full mx-auto">
        <SeoSummaryAccordion
          metaDescription={
            mode === "edit" ? metaDescription : document.metaDescription
          }
          mode={mode}
          onMetaDescriptionChange={setMetaDescription}
        />
        <ToastMarkdown
          mode={mode}
          value={mode === "edit" ? body : document.body}
          onChange={setBody}
        />
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
