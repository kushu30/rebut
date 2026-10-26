import { z } from 'zod';
import type { Case } from '../domain/case.js';
import type { EvidenceFact } from '../domain/evidence.js';
import type { Draft, Recommendation } from '../domain/recommendation.js';

export const shipmentEventSchema = z.object({
  status: z.enum(['LABEL_CREATED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED']),
  occurredAt: z.string().datetime(),
  location: z.string().nullable(),
});
export type ShipmentEvent = z.infer<typeof shipmentEventSchema>;

export const storeOrderSchema = z.object({
  orderId: z.string().min(1),
  paypalTransactionId: z.string().min(1),
  placedAt: z.string().datetime(),
  items: z.array(
    z.object({ sku: z.string(), name: z.string(), quantity: z.number().int().positive() }),
  ),
  shippingAddress: z.string(),
  billingAddress: z.string(),
  shipment: z
    .object({
      carrier: z.string(),
      trackingNumber: z.string(),
      events: z.array(shipmentEventSchema),
    })
    .nullable(),
  policyText: z.string(),
});
export type StoreOrder = z.infer<typeof storeOrderSchema>;

export interface StoreClient {
  getOrderByTransactionId(transactionId: string): Promise<StoreOrder | null>;
}

export interface PdfRenderInput {
  case: Case;
  order: StoreOrder;
  facts: EvidenceFact[];
}

export interface PdfRenderer {
  render(input: PdfRenderInput): Promise<Uint8Array>;
}

export interface DraftInput {
  case: Case;
  facts: EvidenceFact[];
  recommendation: Recommendation;
}

export interface Drafter {
  draftEvidenceNotes(input: DraftInput): Promise<Draft>;
  draftInquiryMessage(input: DraftInput): Promise<Draft>;
}
