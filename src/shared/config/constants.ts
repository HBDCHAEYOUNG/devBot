export const TEMPLATE_LABELS = {
  tutorial: "튜토리얼",
  til: "TIL (Today I Learned)",
  troubleshooting: "트러블슈팅",
} as const;

export const DIFFICULTY_LABELS = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
} as const;

export const LENGTH_LABELS = {
  short: "짧음",
  medium: "중간",
  long: "김",
} as const;

export const LENGTH_RANGES = {
  short: { min: 1000, max: 1500 },
  medium: { min: 2000, max: 3000 },
  long: { min: 4000, max: 5000 },
} as const;
