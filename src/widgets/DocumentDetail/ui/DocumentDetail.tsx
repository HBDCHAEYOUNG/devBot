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
import { useIsMobile } from "@/hooks/use-mobile";
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
import { cn } from "@/lib/utils";

dayjs.locale("ko");

/** 본문 텍스트에서 #단어 형태를 추출해 해시태그 배열로 반환 */
function parseHashtagsFromBody(text: string): string[] {
  const matches = text.match(/#(\w+)/g);
  return matches ? [...new Set(matches.map((s) => s.slice(1)))] : [];
}

export interface DocumentDetailProps {
  document: GeneratedDocument;
}

export function DocumentDetail({ document }: DocumentDetailProps) {
  const deleteDocument = useDeleteDocument();
  const { update } = useDocuments();
  const isMobile = useIsMobile();

  const [mode, setMode] = useState<"view" | "edit">("view");
  const [title, setTitle] = useState(document.title);
  const [metaDescription, setMetaDescription] = useState(
    document.metaDescription
  );
  const [body, setBody] = useState(document.body);

  /** 본문 + 해시태그를 한 문자열로 (보기/편집용). 저장 후 body에 해시태그가 있으면 붙이지 않음 */
  const getBodyWithHashtags = () =>
    document.hashtags.length > 0 &&
    document.hashtags.some((t) => !document.body.includes("#" + t))
      ? document.body + "\n\n" + document.hashtags.map((t) => "#" + t).join(" ")
      : document.body;

  const getExportPayload = () => ({
    title: (mode === "edit" ? title : document.title).trim(),
    metaDescription: (mode === "edit"
      ? metaDescription
      : document.metaDescription
    ).trim(),
    body: mode === "edit" ? body : document.body,
    hashtags: mode === "edit" ? parseHashtagsFromBody(body) : document.hashtags,
  });

  const onEdit = () => {
    setTitle(document.title);
    setMetaDescription(document.metaDescription);
    setBody(getBodyWithHashtags());
    setMode("edit");
  };
  const onSave = () => {
    const fullBody = body ?? document.body;
    const payload = {
      title: (title ?? document.title).trim(),
      metaDescription: (metaDescription ?? document.metaDescription).trim(),
      body: fullBody,
      hashtags: parseHashtagsFromBody(fullBody),
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
    <div className="flex flex-col large-padding-top">
      <header
        className={cn(
          "flex flex-col common-padding-x common-padding-y max-w-6xl mx-auto w-full",
          mode === "edit" && "p-0!"
        )}
      >
        <div className="flex flex-col items-center max-w-6xl mx-auto">
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
            onChange={(e) => setTitle(e.target.value)}
            readOnly={mode === "view"}
            className="text-2xl! text-center w-full rounded bg-background outline-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
            placeholder="제목"
          />
        </div>

        {mode === "view" && (
          <nav className="flex items-center pt-6 gap-2 w-full max-w-6xl mx-auto ">
            <time className="text-sm text-gray-500 mr-auto">
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
                      toast.success("HTML 형식으로 클립보드에 복사되었습니다.");
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
          </nav>
        )}
      </header>

      <hr />

      <section className="flex flex-col gap-4 common-padding-x max-w-6xl  w-full mx-auto">
        <SeoSummaryAccordion
          metaDescription={
            mode === "edit" ? metaDescription : document.metaDescription
          }
          mode={mode}
          onMetaDescriptionChange={setMetaDescription}
        />
        <ToastMarkdown
          mode={mode}
          value={mode === "edit" ? body : getBodyWithHashtags()}
          onChange={setBody}
          previewStyle={isMobile ? "tab" : "vertical"}
        />
      </section>
    </div>
  );
}
