import { z } from 'zod';

export const recommendedActionSchema = z.enum(['FIGHT', 'OFFER_REFUND', 'NEEDS_INFO', 'ACCEPT']);
export type RecommendedAction = z.infer<typeof recommendedActionSchema>;

export const tierSchema = z.enum(['HIGH', 'MEDIUM', 'LOW']);
export type Tier = z.infer<typeof tierSchema>;

export const reasonSchema = z.object({
  rule: z.string().min(1),
  message: z.string().min(1),
  factIds: z.array(z.string()),
});
export type Reason = z.infer<typeof reasonSchema>;

export const recommendationSchema = z.object({
  caseId: z.string().min(1),
  action: recommendedActionSchema,
  tier: tierSchema,
  reasons: z.array(reasonSchema),
  needs: z.array(z.string()),
  completeness: z.number().min(0).max(1),
  urgent: z.boolean(),
});
export type Recommendation = z.infer<typeof recommendationSchema>;

export const draftParagraphSchema = z.object({
  text: z.string().min(1),
  factIds: z.array(z.string()).min(1),
});

export const draftSchema = z.object({
  paragraphs: z.array(draftParagraphSchema).min(1),
});
export type Draft = z.infer<typeof draftSchema>;
