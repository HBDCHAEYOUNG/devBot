import { Badge } from "@/ui/index";
import Sparkles from "@/icons/stars.svg";
import Arrow from "@/icons/arrow-up.svg";
import Link from "next/link";

export function LandingIntroSection() {
  return (
    <section
      id="intro"
      className="relative overflow-hidden pt-6 pb-20 md:pt-20 md:pb-32"
    >
      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <Badge
          variant="outline"
          className="mb-6 gap-1.5 border-primary/30 bg-primary/5 px-3 py-1 text-primary"
        >
          <Sparkles className="size-3.5" />
          {"AI 기반 기술 블로그 자동 생성"}
        </Badge>

        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          {"개발자를 위한"}
          <br />
          <span className="text-gradient-primary">{"기술 블로그 작성 AI"}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          {
            "주제와 키워드만 입력하면 서론-본문-결론 구조의 고품질 기술 글을 자동으로 작성합니다. 코드 예시가 포함된 튜토리얼부터 TIL, 트러블슈팅까지."
          }
        </p>

        <Link
          href="/?fromLanding=1"
          className="mt-10 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-primary px-8 text-base font-semibold text-primary-foreground hover:bg-gradient-primary/90 cursor-pointer"
        >
          {"무료로 시작하기"}
          <Arrow className="size-4 rotate-90" />
        </Link>

        {/* Code preview */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl shadow-primary/5">
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-border/60 bg-secondary/50 px-4 py-3">
              <div className="size-3 rounded-full bg-destructive/60" />
              <div className="size-3 rounded-full bg-chart-4/60" />
              <div className="size-3 rounded-full bg-primary/60" />
              <span className="ml-3 text-xs text-muted-foreground font-mono">
                {"devscribe generate"}
              </span>
            </div>
            {/* Terminal body */}
            <div className="p-6 text-left font-mono text-sm leading-relaxed">
              <div className="text-muted-foreground">
                <span className="text-primary">{"$"}</span>
                {" devscribe generate \\"}
              </div>
              <div className="text-muted-foreground pl-4">
                {"--topic "}
                <span className="text-chart-1">
                  {'"React useState 훅 사용법"'}
                </span>
                {" \\"}
              </div>
              <div className="text-muted-foreground pl-4">
                {"--keywords "}
                <span className="text-chart-1">
                  {'"상태관리, hooks, 함수형 컴포넌트"'}
                </span>
                {" \\"}
              </div>
              <div className="text-muted-foreground pl-4">
                {"--template "}
                <span className="text-chart-1">{'"tutorial"'}</span>
              </div>
              <div className="mt-4 text-muted-foreground">
                <span className="text-primary">{">"}</span>
                {" 블로그 글 생성 중..."}
              </div>
              <div className="mt-1 text-primary">{"✓ 서론 작성 완료"}</div>
              <div className="text-primary">
                {"✓ 본문 + 코드 예시 3개 작성 완료"}
              </div>
              <div className="text-primary">
                {"✓ 결론 및 참고 자료 작성 완료"}
              </div>
              <div className="mt-3 text-foreground">
                {"📄 output: react-usestate-tutorial.md (2,847 words)"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
