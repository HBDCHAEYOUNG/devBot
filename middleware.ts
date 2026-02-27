import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "my-documents";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const hasDocuments = Boolean(request.cookies.get(COOKIE_NAME)?.value);

  // "/" 진입 로직
  if (pathname === "/") {
    const fromLanding = url.searchParams.get("fromLanding");

    // 쿠키 없고, 랜딩에서 온 표시도 없으면 -> 기본적으로 랜딩으로 보냄
    if (!hasDocuments && fromLanding !== "1") {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/landing";
      redirectUrl.searchParams.delete("fromLanding");
      return NextResponse.redirect(redirectUrl);
    }

    // 쿠키가 있는데 쿼리로 들어온 경우, 깔끔하게 쿼리 제거
    if (hasDocuments && fromLanding === "1") {
      const cleanUrl = url.clone();
      cleanUrl.searchParams.delete("fromLanding");
      return NextResponse.redirect(cleanUrl);
    }

    // (쿠키 있음) 또는 (랜딩 버튼으로 처음 접근)인 경우 그대로 통과
    return NextResponse.next();
  }

  // "/landing"은 항상 진입 가능 (기본 랜딩 페이지)
  if (pathname === "/landing") {
    return NextResponse.next();
  }

  // 그 외 경로는 그대로 통과
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/landing"],
};

