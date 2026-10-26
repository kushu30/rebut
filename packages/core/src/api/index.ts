import { z } from 'zod';
import { caseSchema } from '../domain/case.js';
import { evidenceFactSchema } from '../domain/evidence.js';
import { policySchema } from '../domain/policy.js';
import { draftSchema, recommendationSchema } from '../domain/recommendation.js';

export const healthResponseSchema = z.object({ status: z.literal('ok') });
export type HealthResponse = z.infer<typeof healthResponseSchema>;

export const webhookAckResponseSchema = z.object({ received: z.literal(true) });
export type WebhookAckResponse = z.infer<typeof webhookAckResponseSchema>;

export const caseSummarySchema = z.object({
  case: caseSchema,
  recommendation: recommendationSchema.nullable(),
});
export type CaseSummary = z.infer<typeof caseSummarySchema>;

export const listCasesResponseSchema = z.object({ cases: z.array(caseSummarySchema) });
export type ListCasesResponse = z.infer<typeof listCasesResponseSchema>;

export const activityEventSchema = z.object({
  id: z.string().min(1),
  caseId: z.string().nullable(),
  actor: z.string().min(1),
  type: z.string().min(1),
  message: z.string(),
  paypalResponseId: z.string().nullable(),
  createdAt: z.string().datetime(),
});
export type ActivityEvent = z.infer<typeof activityEventSchema>;

export const caseDetailResponseSchema = z.object({
  case: caseSchema,
  facts: z.array(evidenceFactSchema),
  recommendation: recommendationSchema.nullable(),
  draft: draftSchema.nullable(),
  events: z.array(activityEventSchema),
});
export type CaseDetailResponse = z.infer<typeof caseDetailResponseSchema>;

export const approveRequestSchema = z.object({
  draft: draftSchema.optional(),
});
export type ApproveRequest = z.infer<typeof approveRequestSchema>;

export const rejectRequestSchema = z.object({
  note: z.string().optional(),
});
export type RejectRequest = z.infer<typeof rejectRequestSchema>;

export const policyResponseSchema = policySchema;
export const updatePolicyRequestSchema = policySchema.partial();
export type UpdatePolicyRequest = z.infer<typeof updatePolicyRequestSchema>;

export const activityResponseSchema = z.object({ events: z.array(activityEventSchema) });
export type ActivityResponse = z.infer<typeof activityResponseSchema>;

export const demoResetResponseSchema = z.object({ ok: z.literal(true) });
export type DemoResetResponse = z.infer<typeof demoResetResponseSchema>;
