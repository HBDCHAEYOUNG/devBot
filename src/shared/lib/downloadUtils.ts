export interface DocumentExportPayload {
  title: string;
  metaDescription: string;
  body: string;
  hashtags: string[];
}

function sanitizeFilename(name: string): string {
  return name.replace(/[<>:"/\\|?*]/g, "").trim() || "document";
}

/** 제목, 본문, 해시태그를 포함한 마크다운 문자열 생성 */
export function buildMarkdownExportContent(
  payload: DocumentExportPayload
): string {
  const { body, hashtags } = payload;
  const parts: string[] = [body];
  if (hashtags.length > 0) {
    parts.push("", hashtags.join(" "));
  }
  return parts.join("\n");
}

/** 마크다운 → HTML 변환 후, 제목(타이틀), 메타(메타), 본문, 해시태그를 포함한 전체 HTML 문서 문자열 생성 */
export async function buildHTMLExportContent(
  payload: DocumentExportPayload
): Promise<string> {
  const { marked } = await import("marked");
  const { title, metaDescription, body, hashtags } = payload;
  const bodyHtml = await marked.parse(body);
  const hashtagsHtml =
    hashtags.length > 0
      ? `<p class="hashtags">${hashtags
          .map((t) => `<span>${escapeHtmlAttr(t)}</span>`)
          .join(" ")}</p>`
      : "";
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtmlAttr(metaDescription)}">
  <title>${escapeHtmlAttr(title)}</title>
</head>
<body>
  <article>
    <div class="content">${bodyHtml}</div>
    ${hashtagsHtml}
  </article>
</body>
</html>`;
}

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function downloadMarkdown(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadHTML(htmlContent: string, filename: string): void {
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** 문서를 마크다운(.md)으로 내보내기 — Blob 생성 후 download 속성으로 다운로드 (제목, 메타, 본문, 해시태그 포함) */
export function exportDocumentAsMarkdown(
  payload: DocumentExportPayload,
  filename?: string
): void {
  const content = buildMarkdownExportContent(payload);
  const baseName = filename ?? sanitizeFilename(payload.title);
  downloadMarkdown(content, baseName);
}

/** 문서를 HTML(.html)으로 내보내기 — 마크다운→HTML 변환 후 Blob 다운로드 (제목→타이틀, 메타→메타, 본문, 해시태그 포함) */
export async function exportDocumentAsHTML(
  payload: DocumentExportPayload,
  filename?: string
): Promise<void> {
  const content = await buildHTMLExportContent(payload);
  const baseName = filename ?? sanitizeFilename(payload.title);
  downloadHTML(content, baseName);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("복사 실패:", err);
    return false;
  }
}
