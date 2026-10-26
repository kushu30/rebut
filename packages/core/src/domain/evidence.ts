import { z } from 'zod';

export const evidenceFactSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  value: z.string(),
  source: z.string().min(1),
});
export type EvidenceFact = z.infer<typeof evidenceFactSchema>;
