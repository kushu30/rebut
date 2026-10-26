import { z } from 'zod';

export const policySchema = z.object({
  autoFightEnabled: z.boolean().default(false),
  autoFightMaxAmount: z.number().nonnegative().default(50),
  requireCompleteness: z.number().min(0).max(1).default(1),
  foldBelowAmount: z.number().nonnegative().default(5),
  autoMessageBuyers: z.boolean().default(false),
  autoAcceptEnabled: z.boolean().default(false),
  autoAcceptMaxAmount: z.number().nonnegative().default(0),
  alertHoursBeforeDeadline: z.number().positive().default(24),
  killSwitch: z.boolean().default(false),
});
export type Policy = z.infer<typeof policySchema>;

export const defaultPolicy: Policy = {
  autoFightEnabled: false,
  autoFightMaxAmount: 50,
  requireCompleteness: 1,
  foldBelowAmount: 5,
  autoMessageBuyers: false,
  autoAcceptEnabled: false,
  autoAcceptMaxAmount: 0,
  alertHoursBeforeDeadline: 24,
  killSwitch: false,
};
