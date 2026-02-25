import type { Difficulty, Length } from "@/types/document.types";

/** 모든 블로그 글에 공통 적용되는 전문 작성 규칙 및 구조 (API 생성 품질 향상) */
const BLOG_WRITING_RULES = `
[글 작성 규칙 (필수 준수)]
1. 서론에서 독자의 관심을 끌어야 합니다 — 훅(hook) 문장, 공통 고민/질문, 또는 구체적 시나리오로 시작하세요.
2. 본문에는 반드시 코드 예시를 포함합니다 — 설명만 있는 섹션은 피하고, 실행 가능하거나 이해하기 쉬운 코드를 넣으세요.
3. 코드 블록은 적절한 언어 태그를 붙입니다 (예: \`\`\`javascript, \`\`\`typescript, \`\`\`bash).
4. 전문 용어는 쉽게 풀어서 설명합니다 — 처음 등장 시 한 줄 정의나 비유를 넣고, 독자 수준에 맞게 조절하세요.
5. 결론에서 핵심 내용을 요약합니다 — 3~5개 불릿으로 정리하고, 다음에 읽을 만한 주제나 실습 방향을 제시하세요.

[글 구조 (전체 흐름)]
1. 제목: SEO에 최적화된 매력적인 제목 (키워드 포함, 클릭 유도)
2. 서론: 주제 소개 및 학습 동기 (2-3문단)
3. 본문: 핵심 내용 설명, 코드 예시 포함 (3-5섹션)
4. 결론: 요약 및 추가 학습 방향
`;

const getDifficultyDescription = (difficulty: Difficulty): string => {
  const descriptions = {
    beginner: "입문자 대상 (기본 개념 상세 설명 필요)",
    intermediate: "중급자 대상 (실무 활용 중심)",
    advanced: "고급자 대상 (심화 개념, 아키텍처 설계)",
  };
  return descriptions[difficulty];
};

const getLengthDescription = (length: Length): string => {
  const descriptions = {
    short: "1000-1500자 (핵심만 간결하게)",
    medium: "2000-3000자 (적당한 깊이)",
    long: "4000-5000자 (상세한 설명)",
  };
  return descriptions[length];
};

export const DOCUMENT_PROMPTS = {
  tutorial: (topic: string, difficulty: Difficulty, length: Length) => `
${BLOG_WRITING_RULES}

당신은 개발자를 위한 기술 블로그 작성 전문가입니다.
다음 조건에 맞는 **튜토리얼** 형식의 블로그 글을 작성해주세요.

**주제**: ${topic}
**대상 독자**: ${getDifficultyDescription(difficulty)}
**목표 분량**: ${getLengthDescription(length)}

**튜토리얼 구조 (반드시 포함):**
1. 📌 소개
   - 무엇을 배우는지
   - 왜 중요한지
   - 어떤 문제를 해결하는지

2. 🔧 사전 준비
   - 필요한 도구/라이브러리
   - 설치 방법
   - 기본 지식 요구사항

3. 📝 단계별 구현
   - 번호를 매긴 명확한 단계
   - 각 단계마다 "왜" 그렇게 하는지 설명
   - 주의사항 및 팁

4. 💻 코드 예제
   - 실행 가능한 전체 코드
   - 코드 주석으로 상세 설명
   - Before/After 비교 (필요시)

5. ✅ 결과 확인
   - 예상 결과물
   - 테스트 방법
   - 문제 해결 (Troubleshooting)

6. 🚀 다음 단계
   - 추가 학습 자료
   - 실무 적용 팁
   - 관련 주제

**작성 가이드:**
- 마크다운 형식 사용 (헤딩, 코드블록, 리스트 등)
- 코드는 \`\`\`언어명 형식으로 감싸기
- 실무에서 바로 적용 가능한 실용적인 내용
${difficulty === "beginner" ? "- 전문 용어 사용 시 반드시 설명 추가" : ""}
- 명확하고 간결한 문장 사용

**SEO 메타 설명 (metaDescription):**
- 검색 결과용 요약 문장 (100-160자). 반드시 일반 문장 형태로만 작성.
- 핵심 키워드(기술명, 주제)를 문장 안에 자연스럽게 녹여서 넣기. 예: "React와 TypeScript로 ~하는 방법을 단계별로 소개합니다."
- #해시태그 형식(#React, #TypeScript 등)은 사용하지 말 것! metaDescription에는 해시 기호(#)를 넣지 않는다.

**해시태그:**
- 주제와 직접 관련된 기술 스택, 개념 위주
- 3-7개 제공
- 예시: React, TypeScript, API, 성능최적화, 웹개발
`,

  til: (topic: string, difficulty: Difficulty, length: Length) => `
${BLOG_WRITING_RULES}

당신은 개발자를 위한 기술 블로그 작성 전문가입니다.
다음 조건에 맞는 **TIL(Today I Learned)** 형식의 블로그 글을 작성해주세요.

**주제**: ${topic}
**대상 독자**: ${getDifficultyDescription(difficulty)}
**목표 분량**: ${getLengthDescription(length)}

**TIL 구조 (반드시 포함):**
1. 🎯 오늘 배운 것
   - 한 줄 요약
   - 핵심 개념

2. 🤔 배경/동기
   - 어떤 상황에서 마주쳤는지
   - 왜 이것을 배우게 되었는지
   - 기존에 몰랐던 점

3. 💡 핵심 내용
   - 배운 개념 상세 설명
   - 왜 중요한지
   - 어떻게 동작하는지

4. 💻 코드 예제
   - Before (몰랐을 때 코드)
   - After (배운 후 개선된 코드)
   - 차이점 설명

5. 📚 참고 자료
   - 공식 문서 링크
   - 관련 블로그/아티클
   - 추가 학습 자료

6. 🔖 정리
   - 핵심 포인트 3-5개
   - 앞으로 적용할 점
   - 추가로 공부할 점

**작성 가이드:**
- 개인적인 학습 경험이 느껴지는 톤
- 구체적이고 실용적인 내용
- "오늘 ~를 배웠다", "~를 알게 되었다" 같은 표현 사용
- 마크다운 형식 활용

**SEO 메타 설명 (metaDescription):**
- 검색 결과용 요약 문장 (120-160자). 반드시 일반 문장 형태로만 작성.
- 핵심 키워드(기술명, 주제)를 문장 안에 자연스럽게 녹여서 넣기.
- #해시태그 형식(#React 등)은 사용하지 말 것. metaDescription에는 해시 기호(#)를 넣지 않는다.

**해시태그:**
- 학습한 기술/개념 중심
- 3-7개 제공
`,

  troubleshooting: (topic: string, difficulty: Difficulty, length: Length) => `
${BLOG_WRITING_RULES}

당신은 개발자를 위한 기술 블로그 작성 전문가입니다.
다음 조건에 맞는 **트러블슈팅** 형식의 블로그 글을 작성해주세요.

**주제**: ${topic}
**대상 독자**: ${getDifficultyDescription(difficulty)}
**목표 분량**: ${getLengthDescription(length)}

**트러블슈팅 구조 (반드시 포함):**
1. 🚨 문제 상황
   - 언제, 어떻게 발생했는지
   - 어떤 작업 중이었는지
   - 증상 상세 설명

2. ❌ 에러 메시지
   - 정확한 에러 로그
   - 스택 트레이스 (필요시)
   - 에러 발생 빈도/조건

3. 🔍 원인 분석
   - 디버깅 과정
   - 왜 발생했는지
   - 근본 원인

4. 🛠️ 해결 과정
   - 시도한 방법들 (실패한 것 포함)
   - 각 시도의 결과
   - 왜 실패했는지 or 성공했는지

5. ✅ 최종 해결책
   - 성공한 해결 방법
   - Before/After 코드 비교
   - 왜 이 방법이 효과적인지

6. 🔐 예방 및 베스트 프랙티스
   - 같은 문제 재발 방지 방법
   - 권장 사항
   - 참고할 만한 리소스

**작성 가이드:**
- 에러 메시지는 코드블록으로 표시
- Before/After 코드 비교 필수
- 실제 겪은 경험처럼 구체적으로
- 다른 개발자가 같은 문제를 겪었을 때 도움이 되도록

**SEO 메타 설명 (metaDescription):**
- 검색 결과용 요약 문장 (120-160자). 반드시 일반 문장 형태로만 작성.
- 핵심 키워드(에러/기술명, 주제)를 문장 안에 자연스럽게 녹여서 넣기.
- #해시태그 형식은 사용하지 말 것. metaDescription에는 해시 기호(#)를 넣지 않는다.

**해시태그:**
- 에러/문제와 관련된 기술 스택
- 3-7개 제공
- 예시: 디버깅, 에러해결, React, TypeScript 등
`,
};
