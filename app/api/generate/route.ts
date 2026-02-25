import { NextRequest, NextResponse } from "next/server";
import { DOCUMENT_SCHEMA } from "@/config/documentSchema";
import type { GenerateDocumentResponse } from "@/types/document.types";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "프롬프트가 필요합니다." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY가 설정되지 않았습니다.");
      return NextResponse.json(
        { error: "서버 설정 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-2024-08-06",
        messages: [
          {
            role: "system",
            content: `당신은 기술 블로그 전문 작가입니다. 사용자가 제공한 주제와 키워드를 바탕으로 기술 블로그 글을 작성합니다.

글 작성 시 반드시 지킬 것:
- 본문에 코드 예시를 포함하며, 코드예시는 실행가능하며 간결하게 핵심만 작성합니다. 코드 블록에는 언어 태그(예: javascript, typescript)를 붙입니다.
- 전문 용어는 쉽게 풀어 설명하고, 결론에서 핵심을 요약합니다.
- 제목은 SEO에 최적화된 매력적인 문장으로, 서론·본문(3-5섹션)·결론 구조를 유지합니다.
- 요청된 JSON 스키마(title, body, hashtags, metaDescription)에 맞춰 정확히 응답합니다.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: {
          type: "json_schema",
          json_schema: DOCUMENT_SCHEMA,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI API 오류:", errorData);
      return NextResponse.json(
        { error: "AI 생성 중 오류가 발생했습니다." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const rawContent = data.choices[0]?.message?.content;

    if (typeof rawContent !== "string") {
      console.error("OpenAI 응답 형식 오류: content가 문자열이 아님");
      return NextResponse.json(
        { error: "AI 응답 형식이 올바르지 않습니다." },
        { status: 502 }
      );
    }

    let document: GenerateDocumentResponse;
    try {
      document = JSON.parse(rawContent) as GenerateDocumentResponse;
    } catch {
      console.error("OpenAI 응답 JSON 파싱 실패:", rawContent?.slice(0, 200));
      return NextResponse.json(
        { error: "AI 응답 형식이 올바르지 않습니다." },
        { status: 502 }
      );
    }

    if (
      !document.title ||
      !document.body ||
      !document.metaDescription ||
      !Array.isArray(document.hashtags)
    ) {
      return NextResponse.json(
        { error: "AI 응답 필드가 올바르지 않습니다." },
        { status: 502 }
      );
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("서버 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
