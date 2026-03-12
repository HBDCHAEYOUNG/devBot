import { z } from "zod";

const TOPIC_MIN_LENGTH = 1;
const TOPIC_MAX_LENGTH = 500;

const lengthEnum = z.enum(["short", "medium", "long"], {
  message: "length는 short, medium, long 중 하나여야 합니다.",
});

const difficultyEnum = z.enum(["beginner", "intermediate", "advanced"], {
  message: "difficulty는 beginner, intermediate, advanced 중 하나여야 합니다.",
});

const templateTypeEnum = z.enum(["tutorial", "til", "troubleshooting"], {
  message: "templateType은 tutorial, til, troubleshooting 중 하나여야 합니다.",
});

/** POST /api/generate 요청 body 스키마 (topic, length, difficulty, templateType) */
export const generateRequestBodySchema = z.object({
  topic: z
    .string({ message: "topic이 필요하며 문자열이어야 합니다." })
    .trim()
    .min(TOPIC_MIN_LENGTH, "주제를 입력해주세요.")
    .max(TOPIC_MAX_LENGTH, `주제는 ${TOPIC_MAX_LENGTH}자 이하여야 합니다.`),
  length: lengthEnum,
  difficulty: difficultyEnum,
  templateType: templateTypeEnum,
});

export type GenerateRequestBody = z.infer<typeof generateRequestBodySchema>;
