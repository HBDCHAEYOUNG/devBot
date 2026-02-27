export const TEMPLATE_LABELS = {
  tutorial: "튜토리얼",
  til: "TIL",
  troubleshooting: "트러블슈팅",
} as const;

export const TEMPLATE_DESCRIPTIONS: Record<
  keyof typeof TEMPLATE_LABELS,
  string
> = {
  tutorial: "단계별로 따라 할 수 있는 학습 가이드",
  til: "오늘 배운 내용을 정리하는 Today I Learned 형식",
  troubleshooting: "문제 원인과 해결 과정을 기록하는 형식",
};

export const DIFFICULTY_LABELS = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
} as const;

export const LENGTH_LABELS = {
  short: "짧게",
  medium: "적당히",
  long: "길게",
} as const;

export const LENGTH_RANGES = {
  short: { min: 1000, max: 1500 },
  medium: { min: 2000, max: 3000 },
  long: { min: 4000, max: 5000 },
} as const;
