"use client";

import type { GeneratedDocument } from "@/types/document.types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DocumentItemMenu } from "./DocumentItemMenu";

export type DocumentsListProps = {
  documents: GeneratedDocument[];
  activeId: string | null;
  onDelete: (id: string) => void;
  onLinkClick?: () => void;
};

export function DocumentsList({
  documents,
  activeId,
  onDelete,
  onLinkClick,
}: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm">
        <p className="mb-2">아직 생성된 문서가 없습니다.</p>
        <p>새로운 글을 생성해보세요!</p>
      </div>
    );
  }

  return (
    <ul className="flex-1">
      {documents.map((doc) => (
        <li
          key={doc.id}
          className={cn(
            "flex items-center justify-between cursor-pointer transition-colors relative hover:bg-gray-200 rounded-md small-padding-x small-padding-x py-1",
            activeId === doc.id && "bg-gray-200"
          )}
        >
          <Link
            className="flex-1 min-w-0 cursor-pointer text-sm font-medium text-gray-800 truncate"
            href={`/document/${doc.id}`}
            onClick={onLinkClick}
          >
            {doc.title}
          </Link>

          <DocumentItemMenu doc={doc} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
