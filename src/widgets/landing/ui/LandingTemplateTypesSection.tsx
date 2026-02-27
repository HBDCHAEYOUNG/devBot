"use client";

import {
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToastMarkdown,
} from "@/ui/index";
import { BookOpen, Lightbulb, Bug } from "lucide-react";

const templates = [
  {
    id: "tutorial",
    label: "튜토리얼",
    icon: BookOpen,
    badge: "인기",
    title: "React useState 훅 사용법",
    intro:
      "React의 함수형 컴포넌트에서 상태를 관리하는 가장 기본적인 훅인 useState에 대해 알아보겠습니다. 이 글에서는 기본 개념부터 실전 활용까지 단계별로 설명합니다.",
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>현재 카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        증가
      </button>
    </div>
  );
}`,
    conclusion:
      "useState는 React에서 가장 기본적이면서도 강력한 상태 관리 도구입니다. 간단한 상태부터 복잡한 객체 상태까지 다양하게 활용할 수 있습니다.",
  },
  {
    id: "til",
    label: "TIL",
    icon: Lightbulb,
    badge: null,
    title: "TIL: TypeScript의 satisfies 연산자",
    intro:
      "오늘 TypeScript의 satisfies 연산자를 처음 사용해 봤습니다. 객체 타입을 미리 정해 두고, 실제 값이 그 타입을 만족하는지만 검사할 수 있어 편했습니다.",
    code: `type Status = "success" | "error";
type StatusConfig = {
  label: string;
  color: string;
};

const statusConfig = {
  success: { label: "성공", color: "green" },
  error: { label: "실패", color: "red" },
} satisfies Record<Status, StatusConfig>;

// statusConfig.success는 StatusConfig로 안전하게 추론됨`,
    conclusion:
      "앞으로 설정 객체나 라우트 맵을 정의할 때 satisfies를 함께 써서 타입을 더 안전하게 관리해 보려고 합니다.",
  },
  {
    id: "troubleshooting",
    label: "트러블슈팅",
    icon: Bug,
    badge: null,
    title: "Next.js 하이드레이션 오류 해결",
    intro:
      "Next.js에서 'Hydration failed because the server rendered HTML didn\\'t match the client' 오류가 발생하는 원인과 해결 방법을 정리합니다.",
    code: `// 문제 코드
function MyComponent() {
  // 서버와 클라이언트의 렌더링 불일치
  return <p>{new Date().toLocaleString()}</p>;
}

// 해결 방법
'use client';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(new Date().toLocaleString());
  }, []);

  return <p>{dateStr || 'Loading...'}</p>;
}`,
    conclusion:
      "하이드레이션 오류는 서버와 클라이언트의 렌더링 결과가 다를 때 발생합니다. useEffect를 활용해 클라이언트 전용 로직을 분리하면 해결할 수 있습니다.",
  },
];

export function LandingTemplateTypesSection() {
  return (
    <section id="templates" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {"Templates"}
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold text-foreground md:text-4xl">
            {"목적에 맞는 템플릿을 선택하세요"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            {
              "튜토리얼, TIL, 트러블슈팅 등 다양한 기술 글 형식에 최적화된 템플릿을 제공합니다."
            }
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="tutorial" className="w-full">
            <TabsList className="mx-auto mb-8 flex w-fit bg-secondary">
              {templates.map((t) => (
                <TabsTrigger
                  key={t.id}
                  value={t.id}
                  className="gap-2 px-4 data-[state=active]:bg-background data-[state=active]:text-foreground"
                >
                  <t.icon className="size-4" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {templates.map((t) => (
              <TabsContent key={t.id} value={t.id}>
                <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
                  {/* Template header */}
                  <div className="flex items-center gap-3 border-b border-border/60 px-6 py-4">
                    <t.icon className="size-5 text-primary" />
                    <h3 className="font-semibold text-primary">{t.title}</h3>
                    {t.badge && (
                      <Badge className="bg-primary text-gradient-primary border-primary/20 text-xs">
                        {t.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-2">
                    {/* Left: Article preview */}
                    <div className="flex flex-col gap-4 border-b border-border/60 p-6 lg:border-b-0 lg:border-r">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gradient-primary">
                          {"서론"}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t.intro}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gradient-primary">
                          {"결론"}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {t.conclusion}
                        </p>
                      </div>
                    </div>

                    {/* Right: Code preview (Markdown viewer + syntax highlight) */}
                    <div className="bg-secondary/30 p-6">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gradient-primary">
                        {"코드 예시"}
                      </p>
                      <ToastMarkdown
                        mode="view"
                        value={`\`\`\`tsx\n${t.code}\n\`\`\``}
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
