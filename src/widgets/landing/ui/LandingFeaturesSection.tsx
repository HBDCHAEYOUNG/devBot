import { Card, CardContent } from "@/ui/index";
import { FileText, Code2, Zap, Globe, BookOpen, GitBranch } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "서론-본문-결론 구조",
    description:
      "AI가 체계적인 글 구조를 자동으로 설계합니다. 독자의 흐름을 고려한 논리적인 전개로 완성도 높은 기술 글을 생성합니다.",
  },
  {
    icon: Code2,
    title: "코드 예시 자동 생성",
    description:
      "주제에 맞는 실행 가능한 코드 예시를 자동으로 작성합니다. 구문 하이라이팅과 주석이 포함된 깔끔한 코드를 제공합니다.",
  },
  {
    icon: Zap,
    title: "30초 내 글 생성",
    description:
      "주제와 키워드만 입력하면 30초 이내에 2,000자 이상의 기술 블로그 글이 완성됩니다. 작성 시간을 90% 단축하세요.",
  },
  {
    icon: Globe,
    title: "다국어 지원",
    description:
      "한국어와 영어를 포함한 다양한 언어로 기술 글을 작성할 수 있습니다. 글로벌 독자를 위한 콘텐츠를 쉽게 만드세요.",
  },
  {
    icon: BookOpen,
    title: "SEO 최적화",
    description:
      "검색 엔진에 최적화된 메타 설명, 헤딩 구조, 키워드 배치로 블로그 글의 검색 노출을 극대화합니다.",
  },
  {
    icon: GitBranch,
    title: "버전 관리 & 편집",
    description:
      "생성된 글의 히스토리를 관리하고, 섹션별로 재생성하거나 수동으로 편집할 수 있습니다. Markdown 내보내기를 지원합니다.",
  },
];

export function LandingFeaturesSection() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {"Features"}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"기술 글 작성의 모든 것"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            {
              "개발자가 기술 블로그를 더 빠르고 효율적으로 작성할 수 있도록 설계된 핵심 기능들입니다."
            }
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group border-border/50 bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="pt-6">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
