# DevBot — AI 기술 블로그 글 생성기

개발자를 위한 AI 기반 기술 블로그 자동 생성 서비스입니다. 주제와 키워드만 입력하면 SEO 최적화된 마크다운 글을 생성합니다.

**서비스 체험:** [dev-bot-bay.vercel.app](https://dev-bot-bay.vercel.app/)

---

## 기능

- **AI 글 생성**: OpenAI GPT-4를 사용해 주제·난이도·길이에 맞는 기술 블로그 글 자동 생성
- **템플릿 타입**: TIL, 튜토리얼, 트러블슈팅 등 다양한 글 유형 지원
- **난이도·길이 설정**: 초급/중급/고급, 짧음/보통/긴 글 선택
- **내 문서 관리**: 생성된 글 목록 조회, 제목/본문/해시태그/메타설명 편집, 삭제
- **마크다운 에디터**: Toast UI Editor로 실시간 미리보기 및 편집
- **로컬 저장**: 브라우저 localStorage 기반 문서 저장 (서버 DB 없음)
- **설정 저장**: 템플릿·난이도·길이 등 생성 설정을 로컬에 저장해 다음에도 유지
- **랜딩 페이지**: 기능 소개, 템플릿 타입 안내 (`/landing`)
- **모바일 반응형**: 다양한 화면 크기에 맞춘 반응형 레이아웃

---

## 실행 방법

### 요구 사항

- Node.js 18+
- pnpm

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

```

브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

### 빌드 및 프로덕션 실행

```bash
pnpm build
pnpm start
```

### 기타 스크립트

| 명령어       | 설명                                               |
| ------------ | -------------------------------------------------- |
| `pnpm dev`   | 개발 서버 (Hot Reload)                             |
| `pnpm build` | 프로덕션 빌드                                      |
| `pnpm start` | 빌드된 앱 실행                                     |
| `pnpm lint`  | ESLint 실행                                        |
| `pnpm index` | barrelsby로 barrelsby로 barrel 파일(index.ts) 생성 |

---

## 환경 변수 (Env)

프로젝트 루트에 `.env.local` 파일을 만들고 아래 변수를 설정하세요.

| 변수명           | 필수 | 설명                                                        |
| ---------------- | ---- | ----------------------------------------------------------- |
| `OPENAI_API_KEY` | ✅   | OpenAI API 키. 글 생성 API(`/api/generate`)에서 사용합니다. |

### 예시

```bash
# .env.local
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ `.env.local`은 Git에 포함되지 않습니다. 배포 환경(Vercel 등)에서는 해당 플랫폼의 환경 변수 설정에 동일하게 추가하세요.

---

## 아키텍처

프로젝트는 **Feature-Sliced Design(FSD)** 스타일의 레이어 구조를 따릅니다.

### 레이어 구조

```
src/
├── app/                    # Next.js App Router (페이지, 레이아웃)
├── entities/               # 엔티티: 도메인 객체와 그 CRUD/상태
│   └── document/           # 문서 엔티티 (storage, hooks, UI)
├── features/               # 기능: 사용자 시나리오 단위
│   ├── generate-document/  # 글 생성 (API, 프롬프트, 훅)
│   └── generator-settings/ # 생성 설정 저장/불러오기
├── widgets/                # 위젯: 페이지를 구성하는 큰 블록
│   ├── AppHeader/
│   ├── AppSidebar/
│   ├── DocumentDetail/
│   ├── GeneratorForm/
│   └── landing/
└── shared/                 # 공유: UI, API 클라이언트, 유틸, 타입, 설정
    ├── ui/                 # shadcn/ui 기반 컴포넌트
    ├── api/                # fetch 래퍼 (get, post, put, patch, del)
    ├── lib/                # 유틸 (utils, downloadUtils 등)
    ├── config/             # 상수, 스키마 (documentSchema 등)
    ├── types/              # 공통 타입
    ├── hooks/              # 공통 훅
    └── (icons, styles)
```

### 경로 별칭 (tsconfig.json)

| 별칭           | 경로                  |
| -------------- | --------------------- |
| `@/app/*`      | `app/*`               |
| `@/widgets/*`  | `src/widgets/*`       |
| `@/features/*` | `src/features/*`      |
| `@/entities/*` | `src/entities/*`      |
| `@/ui/*`       | `src/shared/ui/*`     |
| `@/lib/*`      | `src/shared/lib/*`    |
| `@/api/*`      | `src/shared/api/*`    |
| `@/config/*`   | `src/shared/config/*` |
| `@/types/*`    | `src/shared/types/*`  |
| `@/icons/*`    | `src/shared/icons/*`  |
| `@/hooks/*`    | `src/shared/hooks/*`  |

### 데이터 흐름

1. **글 생성**

   - `GeneratorForm` → `useGenerateDocument` → `generateDocument()` (API) → `POST /api/generate`
   - API Route에서 `OPENAI_API_KEY`로 OpenAI Chat Completions 호출, JSON 스키마로 응답 제한
   - 응답을 `documentStorage.save()`로 localStorage에 저장 후 `documents-updated` 이벤트 발행

2. **문서 목록/상세**

   - `useDocuments`가 `documentStorage.getAll()` 및 이벤트 리스너로 목록 갱신
   - 문서 상세는 `documentStorage.getById(id)`로 조회, 편집 시 `documentStorage.update()` 호출

3. **설정**
   - `settingsStorage`(generator-settings)로 템플릿/난이도/길이를 localStorage에 저장·불러오기

### 라우팅

| 경로             | 설명                           |
| ---------------- | ------------------------------ |
| `/`              | 글 생성 폼 (Generator)         |
| `/document/[id]` | 생성된 문서 상세·편집          |
| `/landing`       | 랜딩 페이지 (기능·템플릿 소개) |

---

## 기술 스택

- **프레임워크**: Next.js 16 (App Router), React 19
- **스타일**: Tailwind CSS 4
- **UI**: Radix UI, shadcn/ui 스타일 컴포넌트
- **에디터**: @toast-ui/editor, Prism.js(코드 하이라이트)
- **AI**: OpenAI API (GPT-4), JSON Schema로 구조화된 응답
- **기타**: dayjs, Three.js(랜딩 배경 등)

---

## 라이선스

Private.
