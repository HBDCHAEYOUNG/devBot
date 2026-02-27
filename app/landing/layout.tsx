import { LandingHeader, LandingLiquidBackground } from "@/widgets/landing";

export const metadata = {
  title: "Devbot | 개발자를 위한 AI 기술 블로그 자동 작성",
  description:
    "주제와 키워드만 입력하면 서론·본문·결론 구조의 기술 글을 자동 생성하는 AI 도구. 튜토리얼, TIL, 트러블슈팅까지 코드 예시 포함 고품질 블로그 글을 무료로 작성해 보세요.",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <LandingLiquidBackground />
      <div className="relative z-10 flex flex-1 flex-col">
        <LandingHeader />
        <main className="flex flex-col min-h-svh flex-1 common-padding max-w-6xl mx-auto w-full space-y-16 py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
