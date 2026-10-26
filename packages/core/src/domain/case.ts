import { z } from 'zod';

export const disputeReasonSchema = z.enum([
  'MERCHANDISE_OR_SERVICE_NOT_RECEIVED',
  'MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED',
  'UNAUTHORISED',
  'CREDIT_NOT_PROCESSED',
  'DUPLICATE_TRANSACTION',
  'INCORRECT_AMOUNT',
  'PAYMENT_BY_OTHER_MEANS',
  'CANCELED_RECURRING_BILLING',
  'OTHER',
]);
export type DisputeReason = z.infer<typeof disputeReasonSchema>;

export const disputeStageSchema = z.enum([
  'INQUIRY',
  'CHARGEBACK',
  'PRE_ARBITRATION',
  'ARBITRATION',
]);
export type DisputeStage = z.infer<typeof disputeStageSchema>;

export const caseStatusSchema = z.enum([
  'DETECTED',
  'ANALYZING',
  'AWAITING_APPROVAL',
  'AUTO_APPROVED',
  'SUBMITTING',
  'SUBMITTED',
  'FAILED',
  'WON',
  'LOST',
  'EXPIRED',
  'CLOSED',
]);
export type CaseStatus = z.infer<typeof caseStatusSchema>;

export const evidenceTypeSchema = z.enum(['PROOF_OF_FULFILLMENT', 'PROOF_OF_REFUND', 'OTHER']);
export type EvidenceType = z.infer<typeof evidenceTypeSchema>;

export const allowedActionSchema = z.enum([
  'PROVIDE_EVIDENCE',
  'SEND_MESSAGE',
  'MAKE_OFFER',
  'ACCEPT_CLAIM',
  'ESCALATE',
]);
export type AllowedAction = z.infer<typeof allowedActionSchema>;

export const caseSchema = z.object({
  id: z.string().min(1),
  transactionId: z.string().min(1),
  reason: disputeReasonSchema,
  stage: disputeStageSchema,
  status: caseStatusSchema,
  paypalStatus: z.string(),
  amount: z.number().nonnegative(),
  currency: z.string().length(3),
  sellerProtectionEligible: z.boolean(),
  sellerResponseDueDate: z.string().datetime(),
  allowedActions: z.array(allowedActionSchema),
  requestedEvidence: z.array(evidenceTypeSchema),
  buyerMessage: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Case = z.infer<typeof caseSchema>;
